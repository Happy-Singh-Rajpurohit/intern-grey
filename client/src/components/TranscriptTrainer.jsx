import React, { useState, useEffect } from 'react';
import { Video, Plus, Search, Trash2, CheckCircle2, Sparkles, BookOpen, ExternalLink } from 'lucide-react';

export default function TranscriptTrainer() {
  const [transcripts, setTranscripts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successNote, setSuccessNote] = useState('');

  // Form State
  const [title, setTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [category, setCategory] = useState('Objection Handling Methodology');
  const [content, setContent] = useState('');

  // Test Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [searching, setSearching] = useState(false);

  const fetchTranscripts = async () => {
    try {
      const res = await fetch('/api/transcripts');
      if (res.ok) {
        const data = await res.json();
        setTranscripts(data.transcripts || []);
      }
    } catch (err) {
      console.error('Error fetching transcripts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTranscripts();
  }, []);

  const handleAddTranscript = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setSubmitting(true);
    setSuccessNote('');

    try {
      const res = await fetch('/api/transcripts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          videoUrl,
          category,
          content
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to index transcript');

      setSuccessNote(data.message || 'Transcript successfully indexed into knowledge base!');
      setTitle('');
      setVideoUrl('');
      setContent('');
      await fetchTranscripts();
    } catch (err) {
      alert(err.message || 'Error indexing transcript');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to remove this video transcript from the RAG knowledge base?')) return;

    try {
      const res = await fetch(`/api/transcripts/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await fetchTranscripts();
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleTestSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setSearching(true);
    try {
      const res = await fetch('/api/transcripts/test-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery })
      });

      if (res.ok) {
        const data = await res.json();
        setSearchResults(data.matches || []);
      }
    } catch (err) {
      console.error('Search test error:', err);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      
      {/* Overview Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
        <div>
          <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-flex items-center gap-1.5 mb-2">
            <Video className="w-3.5 h-3.5 text-emerald-600" />
            Video Transcript RAG Training Engine
          </span>
          <h2 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
            Train the AI on Coach Manuj Bajaj's Video Content
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl leading-relaxed">
            Upload your webinars, YouTube lectures, or coaching session transcripts. The RAG engine chunks, indexes, and semantically injects your authentic words and objections into every AI generation.
          </p>
        </div>

        <div className="bg-slate-50 px-4 sm:px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl border border-slate-200 text-center shrink-0 self-start md:self-auto">
          <span className="text-2xl sm:text-3xl font-black text-emerald-700 font-mono block">
            {transcripts.length}
          </span>
          <span className="text-[10px] sm:text-[11px] text-slate-500 uppercase font-bold">Active Lessons Indexed</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        
        {/* Left Column: Upload / Add Form */}
        <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-sm space-y-5 sm:space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <Plus className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900">Ingest New Video Transcript</h3>
          </div>

          {successNote && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successNote}</span>
            </div>
          )}

          <form onSubmit={handleAddTranscript} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-bold uppercase tracking-wider mb-1.5">
                Video Lesson Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Masterclass on Closing ₹50 Lakh Industrial Contracts"
                className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-600 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-bold uppercase tracking-wider mb-1.5">
                  Video / Webinar URL
                </label>
                <input
                  type="url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                  className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-600 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold uppercase tracking-wider mb-1.5">
                  Category / Topic
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-600 rounded-xl px-4 py-3 text-slate-900 outline-none"
                >
                  <option value="Objection Handling Methodology">Objection Handling Methodology</option>
                  <option value="6KLH Calculation Framework">6KLH Calculation Framework</option>
                  <option value="Timing & Delay Rebuttals">Timing & Delay Rebuttals</option>
                  <option value="Competitive Rebuttals">Competitive Rebuttals</option>
                  <option value="High-Ticket Mindset">High-Ticket Mindset</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-bold uppercase tracking-wider mb-1.5">
                Full Video Transcript or Spoken Notes *
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="6"
                placeholder="Paste the spoken transcript from your YouTube video or coaching recording. The engine will automatically chunk and embed the advice for the AI..."
                className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-600 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 outline-none resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {submitting ? (
                <span>Chunking & Indexing Transcript...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Index Transcript into AI Knowledge Base</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Semantic Test Sandbox */}
        <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-sm space-y-5 sm:space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <Search className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900">Semantic RAG Retrieval Sandbox</h3>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            Test how the AI retrieves your video knowledge. Type any buyer objection or situation to see which exact lesson snippets get pulled into the prompt.
          </p>

          <form onSubmit={handleTestSearch} className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g. Diwali baad dekhenge, local vendor sasta hai..."
              className="flex-1 bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-600 rounded-xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 outline-none"
            />
            <button
              type="submit"
              disabled={searching}
              className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-xl text-xs font-bold transition-colors min-h-[42px]"
            >
              {searching ? 'Testing...' : 'Test'}
            </button>
          </form>

          {searchResults && (
            <div className="space-y-3 mt-4">
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                Top Grounded Snippets ({searchResults.length} matched):
              </span>
              {searchResults.length === 0 ? (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-500">
                  No matching transcript lessons found for this test query.
                </div>
              ) : (
                searchResults.map((m, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <strong className="text-slate-900">{m.video_title}</strong>
                      <span className="text-[10px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded font-mono font-semibold">
                        Chunk #{m.chunk_index + 1}
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed line-clamp-3">
                      "{m.content}"
                    </p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

      </div>

      {/* Currently Indexed Lessons List */}
      <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 mb-6 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-600" />
          Indexed Video Library ({transcripts.length} Lessons Grounding AI)
        </h3>

        {transcripts.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs">
            No video transcripts indexed yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {transcripts.map((t) => (
              <div key={t.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between gap-4">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-bold text-slate-900">{t.title}</h4>
                    <button
                      onClick={() => handleDelete(t.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 rounded transition-colors"
                      title="Delete transcript"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[10px] text-emerald-800 bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded font-semibold">
                      {t.category}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">
                      {t.chunk_count} {t.chunk_count === 1 ? 'chunk' : 'chunks'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
                    {t.preview}...
                  </p>
                </div>

                {t.video_url && (
                  <a
                    href={t.video_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-slate-500 hover:text-emerald-700 flex items-center gap-1 font-medium"
                  >
                    <span>Source Video</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
