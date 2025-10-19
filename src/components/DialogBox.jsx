import React from 'react';

const DialogBox = ({question, setDialogBoxOpen, setText, showAlert}) => {
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

  return (
    <div className="modal-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div className="modal-content" style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        width: '90%'
      }}>
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
  )
}

export default DialogBox;
