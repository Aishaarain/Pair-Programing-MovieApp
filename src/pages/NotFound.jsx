import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className=" flex h-screen items-center bg-[#1d0f0f] justify-center text-white px-6 py-0 sm:py-32 lg:px-8">
      <div className="text-cente  text-white bg-[#1d0f0f]">
        <p className="text-base font-semibold text-white">404</p>
        <h1 className="mt-4 text-5xl font-bold tracking-tight text-white sm:text-7xl">
          Page not found
        </h1>
        <p className="mt-6 text-lg text-white">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 transition duration-300"
          >
            Go back home
          </Link>
          
        </div>
      </div>
    </div>
  );
}
