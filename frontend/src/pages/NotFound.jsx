import React from 'react'
function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6">
            <h1 className="text-9xl font-extrabold text-gray-800 animate-bounce">
                404
            </h1>
            <p className="text-xl text-gray-600 mt-2 text-center">
                Oops! The page you're looking for doesn't exist.
            </p>

            <a
                href="/"
                className="mt-6 px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg shadow hover:bg-gray-700 transition-all duration-300"
            >
                Go Back Home
            </a>
        </div>
    )

}

export default NotFound