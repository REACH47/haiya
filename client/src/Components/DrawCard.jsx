import React, { useEffect, useState, useRef } from "react";
import Excalidraw from "@excalidraw/excalidraw";
import { database } from "../firebase";
import { Form, Button, Modal } from "react-bootstrap";
import InitialData from "./initialData.js";
import Sidebar from "../Components/Sidebar/Sidebar";
import "./DrawCard.scss";
import { useAuth } from "../Contexts/AuthContext";
import { io } from "socket.io-client";
import logo from "../Assets/images/logo.svg";
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

  function handleSubmit(e) {
    e.preventDefault();

    if (currentFile == null) return;

    database.files.add({
      file: name,
      parentId: currentFile.id,
      userId: currentUser.uid,
      // path,
      createdAt: database.getCurrentTimestamp(),
    });
    setName("");
    closeModal();
  }

  return (
    <div className="App">
      <img className="App__logo" src={logo} alt="haiya!" />
      <Sidebar>
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
              type="checkbox"
              checked={viewModeEnabled}
              onChange={() => setViewModeEnabled(!viewModeEnabled)}
            />
            clear toolbox
          </label>
          <label className="App__option">
            <input
              type="checkbox"
              checked={zenModeEnabled}
              onChange={() => setZenModeEnabled(!zenModeEnabled)}
            />
            free draw
          </label>
          <label className="App__option">
            <input
              type="checkbox"
              checked={gridModeEnabled}
              onChange={() => setGridModeEnabled(!gridModeEnabled)}
            />
            grid mode
          </label>
          <label className="App__option">
            <input
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
          <label className="export-wrapper__checkbox">
            <input
              type="checkbox"
              checked={exportWithDarkMode}
              onChange={() => setExportWithDarkMode(!exportWithDarkMode)}
            />
            Export with dark mode
          </label>
          <button type="submit" onClick={openModal}>
            SAVE CARD
          </button>
          <Emailer />
          <Modal show={open} onHide={closeModal}>
            <Form onSubmit={handleSubmit}>
              <Modal.Body>
                <Form.Group>
                  <Form.Label>Card Name</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                  No thanks
                </Button>
                <Button variant="success" type="submit">
                  Save it!
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </div>
      </Sidebar>
    </div>
  );
}
