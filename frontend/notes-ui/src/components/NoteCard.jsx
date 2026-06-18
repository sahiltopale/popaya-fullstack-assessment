import { useState } from "react";

const PREVIEW_LENGTH = 140;

const formatDate = (value) => {
  if (!value) return "—";

  return new Date(value).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function NoteCard({ note, onDelete, onEdit, isActive }) {
  const [expanded, setExpanded] = useState(false);

  const content = note.content || "";

  const isLong = content.length > PREVIEW_LENGTH;

  const displayContent = expanded
    ? content
    : isLong
      ? content.slice(0, PREVIEW_LENGTH) + "..."
      : content;

  return (
    <article className={`note-card ${isActive ? "is-active" : ""}`}>
      <h3 className="note-title">{note.title}</h3>

      <p className={`note-content ${expanded ? "expanded" : ""}`}>
        {displayContent}
      </p>

      <div className="note-meta">
        <span>Created · {formatDate(note.createdAt)}</span>

        <span>Updated · {formatDate(note.updatedAt)}</span>
      </div>

      <div className="note-actions">
        {isLong && (
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setExpanded((prev) => !prev)}
          >
            {expanded ? "View Less" : "View Full"}
          </button>
        )}

        <button className="btn btn-ghost btn-sm" onClick={() => onEdit(note)}>
          Edit
        </button>

        <button
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(note._id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}
