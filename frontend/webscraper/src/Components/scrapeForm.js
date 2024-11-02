import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { scrapeWebsite } from "../redux/actions";
// this form takes a URL input and sends it to the server to scrape the website
export const ScrapeForm = () => {
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (url) {
      try {
        await dispatch(scrapeWebsite(url));
      } catch (error) {
        console.error("Error scraping website:", error);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </form>
      <button
        onClick={handleSubmit}
        class="btn btn-primary mt-2"
        type="submit"
        style={{ background: "#e8a0c3", borderColor: "#e8a0c3" }}
      >
        Scrape
      </button>
    </>
  );
};
