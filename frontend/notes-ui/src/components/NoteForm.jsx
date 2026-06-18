import { useEffect, useState } from "react";

const EMPTY = { title: "", content: "" };

export default function NoteForm({ selected, save, onCancel }) {
  const [values, setValues] = useState(EMPTY);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const isEditing = Boolean(selected);

  useEffect(() => {
    setValues(
      selected
        ? { title: selected.title ?? "", content: selected.content ?? "" }
        : EMPTY,
    );
    setError("");
  }, [selected]);

  const update = (key) => (e) =>
    setValues((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values.title.trim()) {
      setError("Title is required");
      return;
    }
    try {
      setSaving(true);
      await save({ title: values.title.trim(), content: values.content });
      setValues(EMPTY);
      setError("");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="panel panel-sticky" onSubmit={handleSubmit}>
      <h2 className="panel-title">{isEditing ? "Edit note" : "New note"}</h2>

      <div className="field">
        <label className="field-label" htmlFor="note-title">
          Title
        </label>
        <input
          id="note-title"
          className={`input${error ? " is-invalid" : ""}`}
          placeholder="Give your note a name"
          value={values.title}
          onChange={update("title")}
        />
        {error && <span className="field-error">{error}</span>}
      </div>

      <div className="field">
        <label className="field-label" htmlFor="note-content">
          Content
        </label>
        <textarea
          id="note-content"
          className="textarea"
          placeholder="Start writing..."
          value={values.content}
          onChange={update("content")}
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving
            ? isEditing
              ? "Updating..."
              : "Saving..."
            : isEditing
              ? "Update note"
              : "Save note"}
        </button>
        {isEditing && (
          <button
            type="button"
            className="btn btn-ghost"
            onClick={onCancel}
            disabled={saving}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
