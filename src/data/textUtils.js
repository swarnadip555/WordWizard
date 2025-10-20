import { checkGrammar } from "../utils";

export const getTextOperations = (text, setText, setDialogBoxOpen, props, setGrammarResults,
  setLoadingGrammar,styles) => {
  const { isBold, setIsBold, isItalic, setIsItalic, isUnderline, setIsUnderline, isStrikeThrough, setStrikeThrough } = styles;

  const handleUpClick = () => {
    setText(text.toUpperCase());
    props.showAlert("Converted to uppercase.", "success");
  };

  const handleLoClick = () => {
    setText(text.toLowerCase());
    props.showAlert("Converted to lowercase.", "success");
  };

  const handleRemoveLineBreaks = () => {
    const newText = text.replace(/[\r\n]+/g, " "); // replace all line breaks with space
    setText(newText);
    props.showAlert("Line breaks removed.", "success");
  };

  const handleTrimSpaces = () => {
    const newText = text.trim(); // removes leading and trailing spaces
    setText(newText);
    props.showAlert("Leading and trailing spaces removed.", "success");
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

  const handleRemoveDuplicateLines = () => {
    // Split text into lines, remove duplicates, and join back
    const lines = text.split(/\r?\n/); // handle \n or \r\n
    const uniqueLines = [...new Set(lines)];
    const newText = uniqueLines.join("\n");
    setText(newText);
    props.showAlert("Duplicate lines removed.", "success");
  };

  const handleGenerateLoremIpsum = () => {
    const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`;

    setText(text+lorem);
    props.showAlert("Random text generated.", "success");
  };

  const handleImportTextFile = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".txt";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setText(event.target.result);
          props.showAlert("Text file imported successfully.", "success");
        };
        reader.readAsText(file);
      }
    };
    input.click();
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
  const handleStrikeThrough = () => {
    setStrikeThrough(!isStrikeThrough);
    props.showAlert(isStrikeThrough ? "Strike Through removed." : "Strike Through applied.", "success");
  };

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
    { func: handleStrikeThrough, label: "Strike Through" },
    { func: handleRemoveLineBreaks, label: "Remove Line Breaks" },
    { func: handleTrimSpaces, label: "Trim Spaces" },
    { func: handleRemoveDuplicateLines, label: "Remove Duplicate Lines" },
    { func: handleGenerateLoremIpsum, label: "Generate Random Text" },
    { func: handleImportTextFile, label: "Import Text File" },
  ];

  return obj;
};