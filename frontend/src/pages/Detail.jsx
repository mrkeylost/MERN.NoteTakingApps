import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../utils/axios";
import toast from "react-hot-toast";
import {
  ArrowLeftIcon,
  LoaderIcon,
  PenSquareIcon,
  Trash2Icon,
} from "lucide-react";

export default function Detail() {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch note");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Data Deleted successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete note");
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.description.trim()) {
      toast.error("Please add a title or content");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note);
      toast.success("update data successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update data");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/35 hover:text-white/70 transition-colors duration-200 group"
          >
            <ArrowLeftIcon className="size-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase">
              Back to Notes
            </span>
          </Link>

          <button
            onClick={handleDelete}
            className="
            inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
            bg-red-400/8 text-red-400/70 border border-red-400/15
            hover:bg-red-400/14 hover:text-red-400 hover:border-red-400/30
            transition-all duration-200
          "
          >
            <Trash2Icon className="size-4" />
            Delete Note
          </button>
        </div>

        <div className="bg-[#161616] border border-white/[0.08] rounded-xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <span className="block w-1 h-5 rounded-full bg-[#00FF9D]" />
            <h2 className="text-base font-semibold text-white/80 tracking-wide">
              Edit Note
            </h2>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/30">
                Title
              </label>
              <input
                type="text"
                placeholder="Note title"
                className="
                w-full bg-[#0f0f0f] border border-white/[0.08] rounded-lg
                px-4 py-3 text-sm text-white/80 placeholder:text-white/18
                focus:outline-none focus:border-[#00FF9D]/40 focus:bg-[#111]
                transition-colors duration-200
              "
                value={note.title}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/30">
                Content
              </label>
              <textarea
                placeholder="Write your note here..."
                className="
                w-full bg-[#0f0f0f] border border-white/[0.08] rounded-lg
                px-4 py-3 text-sm text-white/80 placeholder:text-white/18
                focus:outline-none focus:border-[#00FF9D]/40 focus:bg-[#111]
                transition-colors duration-200 resize-none h-52 leading-relaxed
              "
                value={note.description}
                onChange={(e) =>
                  setNote({ ...note, description: e.target.value })
                }
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={handleSave}
                disabled={saving}
                className="
                inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium
                bg-[#00FF9D]/10 text-[#00FF9D] border border-[#00FF9D]/25
                hover:bg-[#00FF9D]/18 hover:border-[#00FF9D]/45
                disabled:opacity-40 disabled:cursor-not-allowed
                transition-all duration-200
              "
              >
                {saving ? (
                  <>
                    <span className="loading loading-spinner loading-xs" />
                    Saving...
                  </>
                ) : (
                  <>
                    <PenSquareIcon className="size-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
