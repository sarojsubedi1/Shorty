"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://api.rebrandly.com/v1/links",
        {
          destination: longUrl,
          domain: { fullName: "rebrand.ly" },
        },
        {
          headers: {
            "Content-Type": "application/json",
            apikey: "5b14cbe0b0f748d98158cf8a55548137",
          },
        },
      );

      setShortUrl(response.data.shortUrl);
    } catch (error) {
      console.error(error);
      setError("All 10 free links from rebrandly already used!");
    }
  };

  return (
    <>
      <div className="md:mt-20 mt-4">
        <h1 className="text-4xl text-center font-black text-lime-400">
          Shorty
        </h1>
        <p className="hidden md:block text-center justify text-gray-400">
          Shorty is a URL shortner allows you to take long unwidly URLs and turn{" "}
          <br />
          them into shorter and and more aesthecally pleasing URls.
        </p>
      </div>
      <div className="md:flex mx-4 md:mx-32 mt-20">
        <div className="md:w-1/2">
          <h2 className="text-lime-500 font-bold text-xl">
            How to use Shorty?
          </h2>
          <ol className="list-decimal mx-4 text-gray-400">
            <li>Enter long URL which you want to shorten in Input field.</li>
            <li>Press Shorten it Button.</li>
            <li>Copy short URL and enjoy.</li>
          </ol>
        </div>
        <div className="md:w-1/2 mt-20 md:mt-0">
          <form
            className={`${shortUrl ? "hidden" : "flex"}  flex-col gap-10`}
            onSubmit={handleSubmit}
          >
            {error && <p className="text-red-500">{error}</p>}
            <input
              id="long_url"
              type="url"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              placeholder="Enter Long URL"
              className="border-2  outline-lime-500 rounded p-3 md:w-1/2"
            ></input>
            <button className="font-semibold  bg-lime-500 hover:bg-lime-600 text-white w-48 p-2 rounded outline-gray-400">
              Shorten It
            </button>
          </form>
          <div className={`${shortUrl ? "flex" : "hidden"} flex flex-col`}>
            <h2 className="font-bold text-xl text-lime-500">
              Your URL has been shortned
            </h2>
            <p className="text-gray-400">
              <span className="text-lime-500 font-bold">Long URL: </span>
              {longUrl}
            </p>
            <p className="text-gray-400 mb-6">
              <span className="text-lime-500 font-bold">Short URL: </span>
              {shortUrl}
            </p>
            <p className="text-lime-500">Thanks for using Shorty!</p>
          </div>
        </div>
      </div>
    </>
  );
}
