import { ArrowLeftIcon, PenSquareIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import api from "../utils/axios";

export default function Create() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes", {
        title,
        description,
      });
      toast.success("Note created successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.response?.error === 429) {
        toast.error("Rate limit activated, please do not spam");
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto px-6 py-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white/35 hover:text-white/70 transition-colors duration-200 mb-10 group"
        >
          <ArrowLeftIcon className="size-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase">
            Back to Notes
          </span>
        </Link>

        <div className="bg-[#161616] border border-white/[0.08] rounded-xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <span className="block w-1 h-5 rounded-full bg-[#00FF9D]" />
            <h2 className="text-base font-semibold text-white/80 tracking-wide">
              New Note
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/30">
                Title
              </label>
              <input
                type="text"
                placeholder="Give your note a title..."
                className="
                w-full bg-[#0f0f0f] border border-white/[0.08] rounded-lg
                px-4 py-3 text-sm text-white/80 placeholder:text-white/18
                focus:outline-none focus:border-[#00FF9D]/40 focus:bg-[#111]
                transition-colors duration-200
              "
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/30">
                Description
              </label>
              <textarea
                placeholder="Write your note here..."
                className="
                w-full bg-[#0f0f0f] border border-white/[0.08] rounded-lg
                px-4 py-3 text-sm text-white/80 placeholder:text-white/18
                focus:outline-none focus:border-[#00FF9D]/40 focus:bg-[#111]
                transition-colors duration-200 resize-none h-40 leading-relaxed
              "
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={loading}
                className="
                inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium
                bg-[#00FF9D]/10 text-[#00FF9D] border border-[#00FF9D]/25
                hover:bg-[#00FF9D]/18 hover:border-[#00FF9D]/45
                disabled:opacity-40 disabled:cursor-not-allowed
                transition-all duration-200
              "
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-xs" />
                    Creating...
                  </>
                ) : (
                  <>
                    <PenSquareIcon className="size-4" />
                    Create Note
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
