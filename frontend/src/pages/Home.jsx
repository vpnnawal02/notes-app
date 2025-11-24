import React from "react"
import { useState, useEffect } from "react"
import api from "../api"

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
        api.delete(`/api/notes.delete/${id}/`).then((res) => {
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
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-8">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Notes</h2>
            </div>

            <h2 className="text-xl font-semibold text-gray-700 mb-4">Create a Note</h2>

            <form onSubmit={createNote} className="space-y-4">

                <div>
                    <label htmlFor="title" className="block text-gray-600 font-medium mb-1">
                        Title:
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-gray-700"
                    />
                </div>

                <div>
                    <label htmlFor="content" className="block text-gray-600 font-medium mb-1">
                        Content:
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        required
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full h-32 px-4 py-2 border rounded-lg outline-none resize-none focus:ring-2 focus:ring-gray-700"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full bg-gray-800 text-white py-2 rounded-lg font-semibold hover:bg-gray-700 transition-all"
                >
                    Submit
                </button>

            </form>
        </div>
    )

}

export default Home