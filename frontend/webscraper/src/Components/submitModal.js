import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { postAnswers } from "../redux/actions";
//this page is just for closure purposes, to make the website flow better
//nothing as of now is being done with the answers
export const SubmitModal = ({
  show,
  handleClose,
  answers,
  questions,
  category,
}) => {
  const dispatch = useDispatch();

  console.log("category", category);

  const handleConfirm = async (e) => {
    // Add your confirmation logic here
    e.preventDefault();
    if (questions) {
      try {
        Object.keys(answers).map((question, index) => {
          console.log("Question", questions[index], "Answer", answers[index]);
          dispatch(postAnswers(category, questions[index], answers[index]));
          handleClose();
        });
      } catch (error) {
        console.error("Error posting answers:", error);
      }
    }
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Your Answers</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Review Your Answers:</h5>
        <ul>
          {Object.keys(answers).map((index) => (
            <li key={index}>
              Question {parseInt(index) + 1}: {answers[index]}
            </li>
          ))}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleConfirm}
          style={{ background: "#e8a0c3", borderColor: "#e8a0c3" }}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
