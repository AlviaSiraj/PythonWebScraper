import React from "react";
import { useSelector } from "react-redux";

export const ScrapeDisplay = () => {
  const { loading, data, error } = useSelector((state) => state.reducer);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return null;

  return (
    <div>
      <h2>Scrape Results:</h2>
      <h3>Title: {data.title}</h3>
      <h4>Category: {data.category}</h4>

      <div>
        <h4>Headings: </h4>
        {Object.entries(data.headings).map(([key, value]) => (
          <div key={key}>
            <h5>{key.toUpperCase()}:</h5>
            <ul>
              {value.map((heading, index) => (
                <li key={index}>{heading}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div>
        <h4>Content:</h4>
        {data.content.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
};
