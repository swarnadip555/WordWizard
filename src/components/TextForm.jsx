import React, { useEffect, useState, useRef } from "react";
import { getTextOperations } from "../data/textUtils";
import DialogBox from "./DialogBox";
import Toolbar from "./Toolbar";
import Aos from "aos";

const TextForm = (props) => {
  const {
    text,
    setText,
    onFileImport,
    onExport,
    showAlert,
    theme,
    colorTheme,
    heading,
  } = props;

  const [previewText, setPreviewText] = useState(text || "");
  const [dialogBoxOpen, setDialogBoxOpen] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrike, setIsStrike] = useState(false);
  const [grammarResults, setGrammarResults] = useState([]);
  const [loadingGrammar, setLoadingGrammar] = useState(false);
  const fileInputRef = useRef();
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    setPreviewText(text);
  }, [text]);

  useEffect(() => {
    Aos.refresh();
  }, [theme]);

  const handleChange = (e) => {
    setText(e.target.value);
    setPreviewText(e.target.value);
  };

  const handleFileInputClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileSelected = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file && onFileImport) {
      onFileImport(file);
      e.target.value = null;
    }
  };

  const textOperations = getTextOperations(
    text,
    setText,
    previewText,
    setPreviewText,
    setDialogBoxOpen,
    props,
    setGrammarResults,
    setLoadingGrammar,
    {
      isBold,
      setIsBold,
      isItalic,
      setIsItalic,
      isUnderline,
      setIsUnderline,
      isStrike,
      setIsStrike,
    },
    handleFileInputClick,
    onExport // Pass export handler so you can use it inside operations if needed
  );

  const buttonStyle = {
    color: theme === "light" ? "black" : "white",
    backgroundImage:
      theme === "light"
        ? "linear-gradient(135deg, #faffa3 0%, #f0f0a8 100%)"
        : colorTheme,
    filter: theme === "light" ? "none" : "brightness(140%)",
    fontWeight: theme === "light" ? 400 : 300,
    boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.15)",
  };

  // Helper for top words
  const getTopWords = (text) => {
    const words = text
      .toLowerCase()
      .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")
      .split(/\s+/)
      .filter((word) => word.length > 0);

    const freq = {};
    words.forEach((word) => {
      freq[word] = (freq[word] || 0) + 1;
    });

    const sortedWords = Object.entries(freq).sort((a, b) => b[1] - a[1]);
    return sortedWords.slice(0, 3);
  };

  const topWords = getTopWords(text);
  const textDecoration =
    [isUnderline ? "underline" : null, isStrike ? "line-through" : null]
      .filter(Boolean)
      .join(" ") || "none";

  return (
    <section
      className={`min-h-screen py-8 ${
        theme === "light" ? "text-gray-900" : "text-white"
      }`}
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-6" data-aos="fade-down" data-aos-duration="800">
          <h1 className="text-3xl font-bold mb-6">{heading}</h1>

          {/* Toolbar */}
          <Toolbar
            textOperations={textOperations}
            theme={theme}
            colorTheme={colorTheme}
            loadingGrammar={loadingGrammar}
            text={text}
            activeStyles={{
              Bold: isBold,
              Italic: isItalic,
              Underline: isUnderline,
              Strikethrough: isStrike,
            }}
          />

          <textarea
            className={`w-full p-4 rounded-lg border-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              theme === "light"
                ? "bg-white border-gray-300 text-gray-900"
                : "bg-gray-700 border-gray-500 text-white"
            }`}
            rows="10"
            value={text}
            onChange={handleChange}
            placeholder="Enter your text here..."
          ></textarea>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt"
            className="hidden"
            onChange={handleFileSelected}
          />

          {/* Grammar results (if any) */}
          {grammarResults.length > 0 && (
            <div
              className={`mt-4 p-4 rounded-lg ${
                theme === "light" ? "bg-yellow-50" : "bg-gray-800"
              }`}
            >
              {/* Render grammar results here */}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div
          className="flex flex-wrap gap-2 my-6"
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="800"
        >
          {textOperations.map((op, i) => {
            // Disable logic
            const isDisabled =
              (!(text && text.trim().length > 0) && !op.allowEmpty) ||
              (op.label === "Check Grammar" && loadingGrammar);
            const isActive = activeIndex === i;
            return (
              <button
                key={i}
                disabled={isDisabled}
                onClick={() => {
                  setActiveIndex(i); // Set active index on click
                  op.func(); // Run operation
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200
                    ${
                      isDisabled
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:scale-105 active:scale-95"
                    }
                      ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : theme === "light"
                          ? "bg-yellow-200 text-black"
                          : "bg-gray-700 text-gray-200"
                      }
                    `}
              >
                {op.label === "Check Grammar" && loadingGrammar
                  ? "Checking..."
                  : op.label}
              </button>
            );
          })}

          {/* Export button - if not already included in textOperations */}
          {onExport && (
            <button
              onClick={onExport}
              style={buttonStyle}
              className="px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95"
            >
              Export
            </button>
          )}
        </div>
      </div>

      <div
        className={`my-8 mx-4 max-w-4xl sm:mx-auto px-4 sm:px-6 py-8 rounded-2xl shadow-lg transition-all duration-300 ${
          props.theme === "light"
            ? "bg-gradient-to-br from-yellow-100 via-75% via-yellow-400/90 to-yellow-200 border border-yellow-400"
            : "bg-gray-900 text-gray-100 shadow-xl shadow-gray-800/60"
        }`}
      >
        {/* Animate the summary header separately */}
        <h2
          className={`text-2xl sm:text-3xl font-bold mb-8 text-center tracking-tight ${
            props.theme === "light" ? "text-gray-800" : "text-gray-100"
          }`}
        >
          Summary of the Text
        </h2>

        {/* Summary Stats - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 text-center place-items-center">
          {/* Words */}
          <div
            className={`w-3/5 md:w-full p-4 rounded-xl border shadow-sm 
              transition-all duration-300 transform 
              hover:-translate-y-1 hover:scale-105 hover:shadow-lg 
              ${
                props.theme === "light"
                  ? "bg-gradient-to-r from-yellow-200 to-yellow-300 border-yellow-400"
                  : "bg-gradient-to-r from-gray-800 to-gray-700 border-gray-700"
              }`}
          >
            <p
              className={`text-sm font-medium ${
                props.theme === "light" ? "text-gray-600" : "text-gray-400"
              }`}
            >
              Words
            </p>
            <p className="text-2xl font-bold">
              {text.split(/\s+/).filter((el) => el.length !== 0).length}
            </p>
          </div>

          {/* Characters */}
          <div
            className={`w-3/5 md:w-full p-4 rounded-xl border shadow-sm 
              transition-all duration-300 transform 
              hover:-translate-y-1 hover:scale-105 hover:shadow-lg 
              ${
                props.theme === "light"
                  ? "bg-gradient-to-r from-yellow-200 to-yellow-300 border-yellow-400"
                  : "bg-gradient-to-r from-gray-800 to-gray-700 border-gray-700"
              }`}
          >
            <p
              className={`text-sm font-medium ${
                props.theme === "light" ? "text-gray-600" : "text-gray-400"
              }`}
            >
              Characters
            </p>
            <p className="text-2xl font-bold">{text.length}</p>
          </div>

          {/* Reading Time */}
          <div
            className={`w-3/5 md:w-full p-4 rounded-xl border shadow-sm 
              transition-all duration-300 transform 
              hover:-translate-y-1 hover:scale-105 hover:shadow-lg 
              ${
                props.theme === "light"
                  ? "bg-gradient-to-r from-yellow-200 to-yellow-300 border-yellow-400"
                  : "bg-gradient-to-r from-gray-800 to-gray-700 border-gray-700"
              }`}
          >
            <p
              className={`text-sm font-medium ${
                props.theme === "light" ? "text-gray-600" : "text-gray-400"
              }`}
            >
              Reading Time
            </p>
            <p className="text-2xl font-bold">
              {(
                0.008 * text.split(/\s+/).filter((el) => el.length !== 0).length
              ).toFixed(2)}{" "}
              min
            </p>
          </div>
        </div>

        {/* Animate the Top Words section */}
        {topWords.length > 0 && (
          <div className="mb-8 text-center">
            <h3
              className={`text-xl font-semibold mb-4 ${
                props.theme === "light" ? "text-gray-800" : "text-gray-100"
              }`}
            >
              Top Words
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {topWords.slice(0, 5).map(([word, count], index) => (
                <span
                  key={index}
                  className={`px-3 py-1 text-sm font-medium rounded-full border transition-transform duration-200 hover:scale-110 ${
                    props.theme === "light"
                      ? "bg-yellow-200 text-yellow-800 border-yellow-300"
                      : "bg-gray-700 text-gray-200 border-gray-600"
                  }`}
                >
                  {word} ({count})
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Divider */}
        <div
          className={`border-t-2 my-8 ${
            props.theme === "light" ? "border-yellow-500/50" : "border-gray-700"
          }`}
        ></div>

        {/* Preview Section */}
        <h2
          className={`text-2xl font-bold mb-4 ${
            props.theme === "light" ? "text-gray-800" : "text-gray-100"
          }`}
        >
          Preview of the Text
        </h2>
        <p
          className={`text-lg leading-relaxed whitespace-pre-wrap break-words rounded-xl p-6 min-h-[100px] transition-all duration-300 hover:shadow-md ${
            props.theme === "light"
              ? "bg-yellow-50 border border-yellow-400 text-gray-800"
              : "bg-gray-800 border border-gray-700 text-gray-100"
          }`}
          style={{
            fontWeight: isBold ? "bold" : "normal",
            fontStyle: isItalic ? "italic" : "normal",
            textDecoration: textDecoration,
          }}
        >
          {previewText && previewText.length > 0
            ? previewText
            : "Nothing to preview!"}
        </p>
      </div>

      {dialogBoxOpen && (
        <DialogBox
          // question="Are you sure you want to clear the text?"
          setDialogBoxOpen={setDialogBoxOpen}
          setText={setText}
          setPreviewText={setPreviewText}
          showAlert={props.showAlert}
          theme={props.theme}
        />
      )}
    </section>
  );
};

export default TextForm;
