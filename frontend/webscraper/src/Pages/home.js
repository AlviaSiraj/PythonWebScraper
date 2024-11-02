import React from "react";
import { ScrapeForm } from "../Components/scrapeForm";
import { ScrapeDisplay } from "../Components/scrapeDisplay";
import { Questions } from "../Components/questions";

function Home() {
  return (
    <>
      <div className="container-fluid d-flex mt-5" style={{ height: "85vh" }}>
        {/* Left side */}
        <div className="col-md-4 d-flex flex-column align-items-center justify-content-center bg-white text-center p-4">
          <h2 className="w3-lobster mt"> Enter a Website URL to scrape</h2>
          <span className="mt-4">
            <ScrapeForm />
          </span>
        </div>
        {/* Right side */}
        <div
          className="col-md-8 d-flex flex-column bg-light p-4"
          style={{ height: "85vh", overflowY: "auto" }}
        >
          <h1
            className="display-4 w3-lobster mb-4"
            style={{ alignSelf: "flex-start" }}
          >
            AI Content Generation Challenge
          </h1>
          <div className="text-left">
            {" "}
            {/* Container for Questions */}
            <Questions />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
