import db from '../config/database.js';
import { chunkTranscript, retrieveRelevantTranscripts } from '../services/ragService.js';

/**
 * List all trained video transcripts
 */
export function getTranscripts(req, res) {
  try {
    const transcripts = db.prepare(`
      SELECT 
        id, 
        title, 
        video_url, 
        author, 
        category, 
        chunk_count,
        SUBSTR(raw_content, 1, 200) as preview,
        created_at
      FROM transcripts
      ORDER BY id DESC
    `).all();

    const totalChunks = db.prepare('SELECT COUNT(*) as count FROM transcript_chunks').get();

    res.json({
      transcripts,
      stats: {
        totalTranscripts: transcripts.length,
        totalChunks: totalChunks.count
      }
    });
  } catch (err) {
    console.error('getTranscripts error:', err);
    res.status(500).json({ error: 'Failed to retrieve transcripts.' });
  }
}

/**
 * Ingest and train a new video transcript
 */
export function addTranscript(req, res) {
  const { title, videoUrl, author = 'Manuj Bajaj', category = 'Sales Coaching', content } = req.body;

  if (!title || !content || !content.trim()) {
    return res.status(400).json({ error: 'Title and transcript content are required.' });
  }

  try {
    // Break the transcript into ~150 word semantic chunks
    const chunks = chunkTranscript(content, 150, 30);

    const insertTranscript = db.prepare(`
      INSERT INTO transcripts (title, video_url, author, category, raw_content, chunk_count)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const insertChunk = db.prepare(`
      INSERT INTO transcript_chunks (transcript_id, chunk_index, content, keywords)
      VALUES (?, ?, ?, ?)
    `);

    const result = insertTranscript.run(
      title,
      videoUrl || '',
      author,
      category,
      content.trim(),
      chunks.length
    );

    const transcriptId = result.lastInsertRowid;

    // Index every chunk
    for (let i = 0; i < chunks.length; i++) {
      const chunkText = chunks[i];
      const keywords = chunkText
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .split(/\s+/)
        .filter(w => w.length > 3)
        .slice(0, 30)
        .join(' ');

      insertChunk.run(transcriptId, i, chunkText, keywords);
    }

    res.status(201).json({
      success: true,
      message: `Transcript "${title}" successfully ingested and indexed into ${chunks.length} knowledge chunks!`,
      transcriptId,
      chunkCount: chunks.length
    });
  } catch (err) {
    console.error('addTranscript error:', err);
    res.status(500).json({ error: 'Failed to process and index transcript.' });
  }
}

/**
 * Delete a transcript
 */
export function deleteTranscript(req, res) {
  const { id } = req.params;

  try {
    db.prepare('DELETE FROM transcripts WHERE id = ?').run(id);
    db.prepare('DELETE FROM transcript_chunks WHERE transcript_id = ?').run(id);

    res.json({ success: true, message: 'Transcript deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete transcript.' });
  }
}

/**
 * Test semantic search against trained transcripts
 */
export function testTranscriptSearch(req, res) {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Search query is required.' });
  }

  try {
    const matches = retrieveRelevantTranscripts(query, 3);
    res.json({ matches });
  } catch (err) {
    res.status(500).json({ error: 'Search failed.' });
  }
}
