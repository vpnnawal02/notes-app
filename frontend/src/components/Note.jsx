import React from "react";

function Note({ note, onDelete }) {
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US")
    return (
        <>
            <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200 mb-4">
                <p className="text-xl font-semibold text-gray-800 mb-2">
                    {note.title}
                </p>

                <p className="text-gray-700 whitespace-pre-wrap mb-4">
                    {note.content}
                </p>

                <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                    <p>{/* If you plan to add date later */}</p>
                </div>

                <button
                    onClick={() => onDelete(note.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all shadow-sm"
                >
                    Delete
                </button>
            </div>
        </>

    )
}

export default Note