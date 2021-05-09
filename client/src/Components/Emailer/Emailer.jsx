import React, { useState } from "react";
import emailjs from "emailjs-com";

export default function Emailer() {
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
          alert("email sent");
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
        <label>email to</label>
        <input
          type="email"
          required
          name="to_email"
          placeholder="email of recipient"
        />

        <label>from</label>
        <input type="text" name="from_name" placeholder="sender's name" />

        <label>haiya! card</label>
        <input type="url" name="image" placeholder="haiya! card" />

        <textarea name="message" placeholder="leave a note!" />
        <button type="submit" value="Send">
          SAY HAIYA!
        </button>
      </form>
    </>
  );
}
