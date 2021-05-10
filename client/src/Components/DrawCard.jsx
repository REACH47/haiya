import React, { useEffect, useState, useRef } from "react";
import Excalidraw from "@excalidraw/excalidraw";
import { storage } from "../firebase";
import { Form, Button, Modal, Image } from "react-bootstrap";
import InitialData from "./initialData.js";
import Sidebar from "../Components/Sidebar/Sidebar";
import "./DrawCard.scss";
import { useAuth } from "../Contexts/AuthContext";
import { io } from "socket.io-client";
import logo from "../Assets/images/logo-white.svg";
import Emailer from "../Components/Emailer/Emailer";

export default function App({ currentFile }) {
  const excalidrawRef = useRef(null);
  const [viewModeEnabled, setViewModeEnabled] = useState(false);
  const [zenModeEnabled, setZenModeEnabled] = useState(false);
  const [gridModeEnabled, setGridModeEnabled] = useState(false);
  const [exportWithDarkMode, setExportWithDarkMode] = useState(false);
  const [theme, setTheme] = useState("light");
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [url, setURL] = useState("");
  const { currentUser } = useAuth();
  const [s, setSocket] = useState();

  useEffect(() => {
    const s = io("http://localhost:8080");
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  function handleUpload(e) {
    e.preventDefault();
    const uploadTask = storage.ref(`/images/${file.name}`).put(file);
    uploadTask.on("state_changed", console.log, console.error, () => {
      storage
        .ref("images")
        .child(file.name)
        .getDownloadURL()
        .then((url) => {
          setFile(null);
          setURL(url);
        });
    });
  }

  return (
    <div className="App">
      <div className="App__logo-container">
        <img className="App__logo" src={logo} alt="haiya!" />
      </div>

      <div className="button-wrapper">
        <button
          className="reset-scene"
          onClick={() => {
            excalidrawRef.current.resetScene();
          }}
        >
          reset card
        </button>
        <label className="App__option">
          <input
            className="checkbox"
            type="checkbox"
            checked={viewModeEnabled}
            onChange={() => setViewModeEnabled(!viewModeEnabled)}
          />
          clear toolbox
        </label>
        <label className="App__option">
          <input
            className="checkbox"
            type="checkbox"
            checked={zenModeEnabled}
            onChange={() => setZenModeEnabled(!zenModeEnabled)}
          />
          free draw
        </label>
        <label className="App__option">
          <input
            className="checkbox"
            type="checkbox"
            checked={gridModeEnabled}
            onChange={() => setGridModeEnabled(!gridModeEnabled)}
          />
          grid mode
        </label>
        <label className="App__option">
          <input
            className="checkbox"
            type="checkbox"
            checked={theme === "dark"}
            onChange={() => {
              let newTheme = "light";
              if (theme === "light") {
                newTheme = "dark";
              }
              setTheme(newTheme);
            }}
          />
          chalkboard
        </label>
      </div>

      <Sidebar>
        <div className="excalidraw-wrapper">
          <Excalidraw
            ref={excalidrawRef}
            initialData={InitialData}
            onChange={(elements, state) =>
              console.log("Elements :", elements, "State : ", state)
            }
            onPointerUpdate={(payload) => console.log(payload)}
            onCollabButtonClick={() =>
              window.alert("You clicked on collab button")
            }
            viewModeEnabled={viewModeEnabled}
            zenModeEnabled={zenModeEnabled}
            gridModeEnabled={gridModeEnabled}
            theme={theme}
            name="Custom name of drawing"
            UIOptions={{ canvasActions: { loadScene: false } }}
          />
        </div>

        <div className="export-wrapper button-wrapper">
          <button className="generate" type="submit" onClick={openModal}>
            generate haiya!
          </button>
          <Emailer />
          <Modal show={open} onHide={closeModal}>
            <Form onSubmit={handleUpload}>
              <Modal.Body>
                <Form.Group>
                  <Form.Label>Card Name</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={handleChange}
                    variant="dark"
                  />
                </Form.Group>
                <Image className="temp-image" src={url} alt="" fluid />
                <h4 className="mt-5 link-text">haiya! card link:</h4>
                <p className="url-link">{url}</p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                  no thanks
                </Button>
                <Button disabled={!file} variant="dark" type="submit">
                  make my haiya!
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </div>
      </Sidebar>
    </div>
  );
}
