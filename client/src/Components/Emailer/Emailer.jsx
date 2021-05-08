import React, { useState } from "react";
import axios from "axios";

export default function Emailer() {
  const [sent, setSent] = useState(false);
  const [text, setText] = useState("");

  const handleSend = async () => {
    setSent(true);
    try {
      await axios.post("https://localhost:4000/send_mail", {
        text,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        {!sent ? (
          <form onSubmit={handleSend}>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <button type="submit">send email</button>
          </form>
        ) : (
          <h1>email sent</h1>
        )}
      </div>
    </>
  );
}
