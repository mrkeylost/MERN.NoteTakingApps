import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { formatDate } from "../utils/utils";
import api from "../utils/axios";
import toast from "react-hot-toast";

export default function NoteCard({ note, setNotes }) {
  const navigate = useNavigate();

  const handleDelete = async (e, id) => {
    e.preventDefault();

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((item) => item._id !== id));
      toast.success("Data Deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete note");
    }
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className="
        group block break-inside-avoid mb-4
        relative rounded-xl p-[18px]
        bg-[#161616] border border-white/[0.08]
        hover:border-[#00FF9D]/35 hover:-translate-y-0.5
        transition-all duration-300 ease-out cursor-pointer
      "
    >
      <span
        className="
        absolute top-0 left-[20%] right-[20%] h-px rounded-full
        bg-gradient-to-r from-transparent via-[#00FF9D]/55 to-transparent
        opacity-0 group-hover:opacity-100 transition-opacity duration-300
      "
      />

      <div className="flex items-center justify-between mb-2.5">
        <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-white/22">
          {formatDate(new Date(note.createdAt))}
        </span>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => navigate("/create")}
            className="w-[26px] h-[26px] rounded-md flex items-center justify-center text-white/30 hover:text-[#00FF9D] hover:bg-[#00FF9D]/10 transition-colors"
          >
            <PenSquareIcon className="size-3.5" />
          </button>
          <button
            onClick={(e) => handleDelete(e, note._id)}
            className="w-[26px] h-[26px] rounded-md flex items-center justify-center text-white/30 hover:text-red-400 hover:bg-red-400/10 transition-colors"
          >
            <Trash2Icon className="size-3.5" />
          </button>
        </div>
      </div>
      <h3 className="text-sm font-medium text-white/88 mb-2 leading-snug group-hover:text-white transition-colors">
        {note.title}
      </h3>
      <p className="text-[13px] text-white/50 line-clamp-4 leading-relaxed">
        {note.description}
      </p>
    </Link>
  );
}
