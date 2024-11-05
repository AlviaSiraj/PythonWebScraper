import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getQuestions } from "../redux/actions";
import { ProgressBar } from "react-bootstrap"; // Import ProgressBar
import { SubmitModal } from "./submitModal";

export const Questions = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.scrapeReducer);
  const [questions, setQuestions] = useState([]);
  const [questionsLoading, setQuestionsLoading] = useState(false); // State for questions loading
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [loadError, setLoadError] = useState(false); // State for handling load failure
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [curatedQuestions, setCuratedQuestions] = useState({});

  //  Does not do anything, just for completion purposes
  const handleShowModal = () => setShowModal(true); // Show modal
  const handleCloseModal = () => setShowModal(false); // Hide modal

  useEffect(() => {
    if (!loading && data) {
      const content = data.content.join(" ");
      let headings = "";
      Object.values(data.headings).forEach((headingArray) => {
        headingArray.forEach((heading) => {
          headings += heading + " ";
        });
      });
      //console.log(data.category);
      const fetchQuestions = async () => {
        try {
          setQuestionsLoading(true);
          setLoadError(false); // Reset error state before fetching
          const result = await dispatch(getQuestions(content, headings));
          console.log("Fetched questions:", result);
          if (result.error) {
            console.log("ERRORORROOROR");
            return (
              <div className="text-center">
                <p>Failed to scrape site, try again in a minute</p>;
              </div>
            );
          }
          if (result && result.questions) {
            setQuestions(result);

            result.questions.forEach((question, index) => {
              setCuratedQuestions((prevQuestions) => ({
                ...prevQuestions,
                [index]: question.question,
              }));
            });
          }
        } catch (error) {
          console.error("Error fetching questions:", error);
          setLoadError(true); // Set error state if fetching fails
        } finally {
          setQuestionsLoading(false);
        }
      };

      fetchQuestions();
    }
  }, [loading, data, dispatch]); // Dependencies include loading and data

  const handleAnswerChange = (index, option) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [index]: option,
    }));
    console.log(index);
  };

  if (loading || questionsLoading) {
    return (
      <div className="text-center">
        <ProgressBar animated now={100} />
        <p>Loading questions...</p>
      </div>
    );
  }

  if (loadError || error) {
    return (
      <div className="text-center mt-4">
        <p style={{ color: "red" }}>
          This url is not supported, please try another one, or try again later
        </p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <>
      <div className="container">
        {questions?.questions?.map((question, index) => (
          <div className="mt-2" key={index}>
            <p>
              {index + 1}. {question.question}
            </p>
            {question.options.map((option, i) => (
              <div key={i}>
                <label>
                  <input
                    type="radio"
                    name={`question_${index}`} // Unique name for each question
                    value={option} // Value to identify the selected option
                    style={{ marginRight: "5px" }}
                    onChange={() => handleAnswerChange(index, option)}
                  />
                  {option} {/* Display option text */}
                </label>
              </div>
            ))}
          </div>
        ))}
        {/* {questions.questions.length > 0 && ( */}

        <button
          className="btn btn-primary mt-4"
          type="button"
          style={{ background: "#e8a0c3", borderColor: "#e8a0c3" }}
          onClick={handleShowModal}
        >
          Submit
        </button>
        {/* )} */}
      </div>
      <SubmitModal
        show={showModal}
        handleClose={handleCloseModal}
        answers={selectedAnswers}
        questions={curatedQuestions}
        category={data.category}
      />
    </>
  );
};
