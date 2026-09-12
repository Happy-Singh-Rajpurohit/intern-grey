import db from '../config/database.js';

/**
 * RAG Service (Retrieval-Augmented Generation):
 * Dynamically retrieves relevant coaching transcripts from Manuj Bajaj's video library
 * based on the user's target product, industry, and buyer context.
 */

// Helper function to calculate keyword overlap score between query and chunk
function calculateRelevanceScore(queryText, chunkText) {
  const cleanQuery = queryText.toLowerCase().replace(/[^a-z0-9\s]/g, '');
  const cleanChunk = chunkText.toLowerCase().replace(/[^a-z0-9\s]/g, '');

  const queryTerms = new Set(cleanQuery.split(/\s+/).filter(w => w.length > 2));
  if (queryTerms.size === 0) return 0;

  let matches = 0;
  for (const term of queryTerms) {
    if (cleanChunk.includes(term)) {
      matches += 1;
    }
  }

  return matches / queryTerms.size;
}

/**
 * Retrieve the top matching coaching transcripts for a sales scenario
 * @param {string} query - Product, industry, or buyer objection context
 * @param {number} topK - Maximum number of transcript chunks to retrieve
 * @returns {Array} List of matched chunks with source metadata
 */
export function retrieveRelevantTranscripts(query, topK = 3) {
  try {
    const chunks = db.prepare(`
      SELECT 
        c.id, 
        c.content, 
        c.chunk_index,
        t.title as video_title,
        t.video_url,
        t.author,
        t.category
      FROM transcript_chunks c
      JOIN transcripts t ON c.transcript_id = t.id
    `).all();

    if (!chunks || chunks.length === 0) {
      return [];
    }

    // Score each chunk against the query
    const scoredChunks = chunks.map(chunk => ({
      ...chunk,
      score: calculateRelevanceScore(query, chunk.content)
    }));

    // Sort by highest relevance score
    scoredChunks.sort((a, b) => b.score - a.score);

    // Return top K chunks (if scores are 0, still return the foundational ones to ensure grounding)
    return scoredChunks.slice(0, topK);
  } catch (error) {
    console.error('Error in retrieveRelevantTranscripts:', error);
    return [];
  }
}

/**
 * Split raw video transcript into overlapping chunks for semantic indexing
 * @param {string} rawText - Full transcript text
 * @param {number} chunkSize - Words per chunk
 * @param {number} overlap - Overlapping words between chunks
 * @returns {Array<string>} Array of text chunks
 */
export function chunkTranscript(rawText, chunkSize = 150, overlap = 30) {
  if (!rawText || !rawText.trim()) return [];

  const words = rawText.trim().split(/\s+/);
  if (words.length <= chunkSize) {
    return [rawText.trim()];
  }

  const chunks = [];
  let i = 0;
  while (i < words.length) {
    const chunkWords = words.slice(i, i + chunkSize);
    chunks.push(chunkWords.join(' '));
    i += (chunkSize - overlap);
  }

  return chunks;
}
