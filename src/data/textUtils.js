
import { checkGrammar } from "../utils";

export const getTextOperations = (
  text,
  setText,
  setDialogBoxOpen,
  props,
  setGrammarResults,
  setLoadingGrammar
) => {

  const { isBold, setIsBold, isItalic, setIsItalic, isUnderline, setIsUnderline } = styles;


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

  // ✅ NEW: Grammar check button logic
  const handleGrammarCheck = async () => {
    if (!text.trim()) return;
    setLoadingGrammar(true);
    try {
      const results = await checkGrammar(text);
      setGrammarResults(results);
      if (results.length === 0) {
        props.showAlert("No grammar issues found!", "success");
      } else {
        props.showAlert(
          `${results.length} grammar issues found.`,
          "warning"
        );
      }
    } catch (err) {
      console.error(err);
      props.showAlert("Failed to check grammar.", "error");
    } finally {
      setLoadingGrammar(false);
    }
  };

  const handleBold = () => {
    setIsBold(!isBold);
    props.showAlert(isBold ? "Bold removed." : "Bold applied.", "success");
  };

  const handleItalic = () => {
    setIsItalic(!isItalic);
    props.showAlert(isItalic ? "Italic removed." : "Italic applied.", "success");
  };

  const handleUnderline = () => {
    setIsUnderline(!isUnderline);
    props.showAlert(isUnderline ? "Underline removed." : "Underline applied.", "success");
  };


  const obj = [
    { func: handleUpClick, label: "Convert to uppercase" },
    { func: handleLoClick, label: "Convert to lowercase" },
    { func: handleExtraSpaces, label: "Remove extra spaces" },
    { func: handleCopyClick, label: "Copy text" },
    { func: handleClearText, label: "Clear text" },
    { func: handleGrammarCheck, label: "Check Grammar" },
    { func: handleRemovePunctuation, label: "Remove punctuation" },
    { func: handleSmartCapitalization, label: "Smart Capitalization" },
    { func: handleExportText, label: "Export text" },
    { func: handleBold, label: "Bold" },       
    { func: handleItalic, label: "Italic" },   
    { func: handleUnderline, label: "Underline" },
  ];

  return obj;
};
