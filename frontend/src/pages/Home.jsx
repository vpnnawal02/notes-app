import React from "react"
import { useState, useEffect } from "react"
import api from "../api"
import Note from "../components/Note"
import Navbar from "../components/NavigationBar"

function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")

    useEffect(() => {
        getNote();
    }, [])

    const getNote = () => {
        api.get("/api/notes/")
            .then((res) => res.data)
            .then((data) => { setNotes(data); console.log(data) })
            .catch((err) => alert(err));
    };

    const deleteNote = (id) => {
        api.delete(`/api/notes/${id}/`).then((res) => {
            if (res.status === 204) alert("Note deleted!")
            else alert("Failed to delete note.")
            getNote();
        }).catch((error) => alert(error))

    };

    const createNote = (e) => {
        e.preventDefault();
        api.post("/api/notes/", { title, content }).then((res) => {
            if (res.status === 201) alert("Note created!")
            else alert("Failed to create note.")
            getNote();
        }).catch((error) => alert(error))

    };

    return (
        <>
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg mt-24 border border-gray-200">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                        Notes
                    </h2>
                </div>

                {/* Create Section */}
                <div className="mb-10">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Create a New Note
                    </h3>

                    <form
                        onSubmit={createNote}
                        className="space-y-5 bg-gray-50 p-5 rounded-xl border border-gray-200"
                    >
                        {/* Title */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Title
                            </label>
                            <input
                                type="text"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-indigo-600 outline-none"
                                placeholder="Enter note title..."
                            />
                        </div>

                        {/* Content */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Content
                            </label>
                            <textarea
                                required
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg bg-white shadow-sm resize-none focus:ring-2 focus:ring-indigo-600 outline-none"
                                placeholder="Write your note here..."
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold text-lg shadow hover:bg-indigo-700 transition-all"
                        >
                            Save Note
                        </button>
                    </form>
                </div>

                {/* Notes List */}
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Your Notes</h3>

                    {notes.length === 0 && (
                        <p className="text-gray-500 italic">No notes yet. Create your first note!</p>
                    )}

                    {notes.map((note) => (
                        <Note note={note} onDelete={deleteNote} key={note.id} />
                    ))}
                </div>

            </div>
        </>

    )

}

export default Home