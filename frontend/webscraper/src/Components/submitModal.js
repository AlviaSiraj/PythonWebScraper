import React, { useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
//this page is just for closure purposes, to make the website flow better
//nothing as of now is being done with the answers
export const SubmitModal = ({
  show,
  handleClose,
  handleConfirm,
  answers,
  questions,
  category,
}) => {
  // const { loading, data, error } = useSelector(
  //   (state) => state.questionReducer
  // );
  console.log("category", category);

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
