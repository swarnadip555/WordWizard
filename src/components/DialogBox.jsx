import React from "react";

const DialogBox = ({
  question,
  setDialogBoxOpen,
  setText,
  showAlert,
  theme,
}) => {
  const handleClear = () => {
    setText("");
    setDialogBoxOpen(false);
    if (showAlert) {
      showAlert("Cleared the text.", "success");
    }
  };

  const handleCancel = () => {
    setDialogBoxOpen(false);
  };

  const modalContentStyle = {
    backgroundColor: theme === "light" ? "white" : "#313131",
    color: theme === "light" ? "black" : "white",
    border: theme === "light" ? "0px solid black" : "0px solid grey",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    width: "90%",
    marginTop: "200px",
    // marginBottom: '90%'
  };

  return (
    <div
      className="modal-overlay"
      style={{
        position: "fixed",
        top: -135,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        minHeight: "130vh",
        height: "fit-content",
        overflow: "visible",
        backgroundColor:
          theme === "light" ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        zIndex: 9999,
      }}
    >
      <div className="modal-content" style={modalContentStyle}>
        <h5 className="modal-title mb-3">Clear Text</h5>
        <p className="mb-4">{question}</p>
        <div className="d-flex justify-content-end gap-2">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default DialogBox;
