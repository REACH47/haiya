import React, { useState } from "react";
import emailjs from "emailjs-com";
import { Modal, Button, Image } from "react-bootstrap";
import logo from "../../Assets/images/logo.svg";
import "../Emailer/Emailer.scss";

export default function Emailer() {
  const [open, setOpen] = useState(false);
  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  function handleSend(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "gmail",
        "template_z8axtla",
        e.target,
        "user_5WVupcNM4zKweyBj3fHC1"
      )
      .then(
        (result) => {
          openModal();
        },
        (error) => {
          alert("error");
        }
      );
    e.target.reset();
  }

  return (
    <>
      <form className="contact-form" onSubmit={handleSend}>
        <label>email to </label>
        <input
          className="contact-form__input"
          type="email"
          required
          name="to_email"
          placeholder="email of recipient"
        />

        <label>from </label>
        <input
          className="contact-form__input"
          type="text"
          name="from_name"
          placeholder="sender's name"
        />

        <label>haiya! card </label>
        <input
          className="contact-form__input"
          type="url"
          name="image"
          placeholder="haiya! card link here"
        />

        <textarea
          className="contact-form__input"
          name="message"
          placeholder="leave a note!"
        />
        <button
          className="say-haiya"
          type="submit"
          value="Send"
          onClick={openModal}
        >
          SAY HAIYA!
        </button>
        <Modal show={open} onHide={closeModal}>
          <Modal.Body>
            <h1 className="text-center mb-5 modal-sent">
              Your HAIYA! has been sent!
            </h1>
            <h2 className="text-center modal-thanks">Thanks for using</h2>
            <Image className="mt-5 ml-5 logo-image" src={logo} alt="" fluid />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="dark" onClick={closeModal}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
    </>
  );
}
