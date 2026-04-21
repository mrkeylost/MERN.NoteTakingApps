import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimited from "../components/RateLimited";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import api from "../utils/axios";
import NotesNotFound from "../components/NotesNotFound";

export default function Home() {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data.data);
        setIsRateLimited(false);
      } catch (error) {
        if (error.response?.status === 429) setIsRateLimited(true);
        else toast.error("Failed to load notes");
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimited />}

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center gap-3 mb-8">
          <span className="block w-1 h-6 rounded-full bg-[#00FF9D]" />
          <h2 className="text-xs font-semibold tracking-[0.25em] uppercase text-[#00FF9D]/70">
            Your Notes
          </h2>
          {!loading && !isRateLimited && (
            <span className="ml-auto text-md font-bold font-mono">
              {notes.length} {notes.length === 1 ? "entry" : "entries"}
            </span>
          )}
        </div>

        {loading && (
          <div className="flex items-center justify-center gap-2 py-24 text-base-content/30">
            <span className="loading loading-dots loading-sm" />
            <span className="text-sm font-mono tracking-widest">Loading…</span>
          </div>
        )}

        {!loading && notes.length === 0 && !isRateLimited && <NotesNotFound />}

        {notes.length > 0 && !isRateLimited && (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
