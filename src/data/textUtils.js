export const getTextOperations = (text, setText, setDialogBoxOpen, props) => {
  const handleUpClick = () => {
    setText(text.toUpperCase());
    props.showAlert("Converted to uppercase.", "success");
  };

  const handleLoClick = () => {
    setText(text.toLowerCase());
    props.showAlert("Converted to lowercase.", "success");
  };

  const handleExtraSpaces = () => {
    const newText = text.split(/[ ]+/).join(" ");
    setText(newText);
    props.showAlert("Removed extra spaces.", "success");
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(text);
    props.showAlert("Copied to clipboard.", "success");
  };

  const handleClearText = () => {
    setDialogBoxOpen(true);
  };

  const obj = [
    { func: handleUpClick, label: "Convert to uppercase" },
    { func: handleLoClick, label: "Convert to lowercase" },
    { func: handleExtraSpaces, label: "Remove extra spaces" },
    { func: handleCopyClick, label: "Copy text" },
    { func: handleClearText, label: "Clear text" }
  ];

  return obj;
};
