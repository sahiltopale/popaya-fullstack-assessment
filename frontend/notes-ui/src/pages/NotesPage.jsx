import { useCallback, useEffect, useState } from "react";

import NoteCard from "../components/NoteCard";
import NoteForm from "../components/NoteForm";
import SearchBar from "../components/SearchBar";

import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  searchNotes,
} from "../services/noteService";

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchNotes = useCallback(async (query = "") => {
    try {
      setLoading(true);
      const res = query.trim()
        ? await searchNotes(query.trim())
        : await getNotes();
      setNotes(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => fetchNotes(search), search ? 250 : 0);
    return () => clearTimeout(t);
  }, [search, fetchNotes]);

  const handleSave = async (data) => {
    try {
      if (selected) {
        await updateNote(selected._id, data);
      } else {
        await createNote(data);
      }
      setSelected(null);
      await fetchNotes(search);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this note?")) return;
    try {
      await deleteNote(id);
      if (selected?._id === id) setSelected(null);
      await fetchNotes(search);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1 className="app-title">Notes</h1>
          <p className="app-subtitle">
            {notes.length} {notes.length === 1 ? "note" : "notes"}
            {search && ` matching "${search}"`}
          </p>
        </div>
      </header>

      <div className="layout">
        <section>
          <SearchBar search={search} setSearch={setSearch} />

          {loading ? (
            <div className="skeleton-grid">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="skeleton" />
              ))}
            </div>
          ) : notes.length === 0 ? (
            <div className="panel state">
              <p className="state-title">
                {search ? "No matching notes" : "No notes yet"}
              </p>
              <p>
                {search
                  ? "Try a different search term."
                  : "Create your first note using the form."}
              </p>
            </div>
          ) : (
            <div className="notes-grid">
              {notes.map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  onDelete={handleDelete}
                  onEdit={setSelected}
                  isActive={selected?._id === note._id}
                />
              ))}
            </div>
          )}
        </section>

        <aside>
          <NoteForm
            selected={selected}
            save={handleSave}
            onCancel={() => setSelected(null)}
          />
        </aside>
      </div>
    </div>
  );
}
