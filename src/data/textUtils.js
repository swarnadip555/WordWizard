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

  const handleRemovePunctuation = () => {
    const newText = text.replace(/[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/g, "");
    setText(newText);
    props.showAlert("Punctuation removed.", "success");
  };

  const handleSmartCapitalization = () => {
    let newText = text.toLowerCase(); // Start with everything lowercase

    // Capitalize first letter after full stops (and beginning of text)
    newText = newText.replace(
      /(^|\.)\s*([a-z])/g,
      (match, punctuation, letter) => {
        return (
          punctuation +
          match.substring(punctuation.length, match.length - 1) +
          letter.toUpperCase()
        );
      }
    );

    newText = newText.replace(/\bi\b/g, "I");

    setText(newText);
    props.showAlert("Smart capitalization applied.", "success");
  };

  const handleExportText = () => {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "exported_text.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    props.showAlert("Text exported.", "success");
  };

  const obj = [
    { func: handleUpClick, label: "Convert to uppercase" },
    { func: handleLoClick, label: "Convert to lowercase" },
    { func: handleExtraSpaces, label: "Remove extra spaces" },
    { func: handleCopyClick, label: "Copy text" },
    { func: handleClearText, label: "Clear text" },
    { func: handleRemovePunctuation, label: "Remove punctuation" },
    { func: handleSmartCapitalization, label: "Smart Capitalization" },
    { func: handleExportText, label: "Export text" },
  ];

  return obj;
};
