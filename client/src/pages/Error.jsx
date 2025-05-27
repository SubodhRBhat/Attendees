import React from "react";

export const Error = () => {
  return (
    <>
      <body class="bg-gray-100 h-screen flex items-center justify-center">
        <div class="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg text-center">
          <h1 class="text-6xl font-bold text-gray-800">404</h1>
          <p class="text-xl text-gray-600 mt-4">
            Oops! The page you're looking for doesn't exist.
          </p>
          <p class="text-md text-gray-500 mt-2">
            It looks like the page you are trying to reach doesn't exist, or has
            been moved.
          </p>
          <a
            href="/dashboard"
            class="mt-6 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
          >
            Go to Homepage
          </a>
        </div>
      </body>
    </>
  );
};
