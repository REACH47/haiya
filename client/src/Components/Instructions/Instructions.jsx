import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import "../../Components/Instructions/Instructions.scss";

export default function Instructions() {
  const [open, setOpen] = useState(true);

  function closeModal() {
    setOpen(false);
  }

  return (
    <div>
      <Modal
        show={open}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <h2 className="mt-5 link-text text-center">welcome to haiya!</h2>
          <h4 className="mt-4">how to haiya!</h4>
          <ul className="mt-2">
            <li>start drawing! use the toolbox and try different things!</li>
            <li>click the save button to save the card to your device!</li>
            <li>click the generate card link and follow the prompt!</li>
            <li>fill out the rest of the form and say haiya!</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            got it!
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
