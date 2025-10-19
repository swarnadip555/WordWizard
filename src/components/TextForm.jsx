import React, { useState } from "react";
import DialogBox from "./DialogBox";
import { getTextOperations } from "../data/textUtils";

const TextForm = (props) => {
  const [text, setText] = useState("");
  const [dialogBoxOpen, setDialogBoxOpen] = useState(false);
  const [grammarResults, setGrammarResults] = useState([]);
  const [loadingGrammar, setLoadingGrammar] = useState(false);

  const handleChange = (e) => setText(e.target.value);

  const textOperations = getTextOperations(
   text,
  setText,
  setDialogBoxOpen,
  props,            
  setGrammarResults,
  setLoadingGrammar
  );

  const buttonStyle = {
    color: props.theme === "light" ? "black" : "white",
    backgroundImage:
      props.theme === "light"
        ? "linear-gradient(135deg, #faffa3 0%, #f0f0a8 100%)"
        : props.colorTheme,
    filter: props.theme === "light" ? "none" : "brightness(140%)",
    fontWeight: props.theme === "light" ? 400 : 300,
    boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.15)",
  };

  const getTopWords = (text) => {
    const words = text
      .toLowerCase()
      .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")
      .split(/\s+/)
      .filter((w) => w.length > 0);
    const freq = {};
    for (const word of words) freq[word] = (freq[word] || 0) + 1;
    return Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 3);
  };

  const topWords = getTopWords(text);

  return (
    <section
      data-aos="fade-up"
      className={`min-h-screen py-8 ${
        props.theme === "light" ? "text-gray-900" : "text-white"
      }`}
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">{props.heading}</h1>
        <textarea
          className={`w-full p-4 rounded-lg border-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            props.theme === "light"
              ? "bg-white border-gray-300 text-gray-900"
              : "bg-gray-700 border-gray-500 text-white"
          }`}
          rows="10"
          value={text}
          onChange={handleChange}
          placeholder="Enter your text here..."
          />
          
                {grammarResults.length > 0 && (
                  <div
                    className={`mt-4 p-4 rounded-lg ${
                      props.theme === "light" ? "bg-yellow-50" : "bg-gray-800"
                    }`}
                  >
                    <h3 className="font-semibold mb-2">Grammar Suggestions:</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {grammarResults.map((issue, i) => (
                        <li key={i}>
                          <strong>
                            {text.slice(issue.offset, issue.offset + issue.length)}
                          </strong>{" "}
                          →{" "}
                          {issue.replacements.length > 0
                            ? issue.replacements[0].value
                            : "No suggestion"}{" "}
                          <span className="text-gray-500">({issue.message})</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
      <div className="flex flex-wrap gap-2 my-6">
        {textOperations.map((op, i) => (
          <button
            key={i}
            disabled={text.length === 0 || (op.label === "Check Grammar" && loadingGrammar)}
            onClick={op.func}
            style={buttonStyle}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              text.length === 0 ||
              (op.label === "Check Grammar" && loadingGrammar)
                ? "opacity-50 cursor-not-allowed"
                : "hover:scale-105 active:scale-95"
            }`}
          >
            {op.label === "Check Grammar" && loadingGrammar
              ? "Checking..."
              : op.label}
          </button>
        ))}
      </div>
      </div>

      {/* Buttons */}

      <div
        className={`container mx-auto px-4 max-w-4xl rounded-lg p-6 ${
          props.theme === "light"
            ? "bg-gradient-to-br from-gray-50 to-gray-100"
            : "bg-gradient-to-br from-gray-800 to-gray-900"
        }`}
      >
        <h2 className="text-2xl font-bold mb-4">Summary</h2>
        <p className="text-lg">
          <span className="font-semibold">
            {text.split(/\s+/).filter((w) => w.length !== 0).length}
          </span>{" "}
          words, <span className="font-semibold">{text.length}</span>{" "}
          characters
        </p>
        <p className="text-lg">
          Reading time:{" "}
          <span className="font-semibold">
            {(
              0.008 * text.split(" ").filter((w) => w.length !== 0).length
            ).toFixed(2)}
          </span>{" "}
          minutes
        </p>
        {topWords.length > 0 && (
          <p className="text-lg mt-2">
            <span className="font-semibold">Top Words: </span>
            {topWords
              .map(([word, count]) => `${word} (${count})`)
              .join(", ")}
          </p>
        )}

        <h2 className="text-2xl font-bold mt-6 mb-2">Preview</h2>
        <p
          className={`text-lg p-4 rounded-lg border ${
            props.theme === "light"
              ? "bg-white border-gray-200"
              : "bg-gray-700 border-gray-600"
          }`}
        >
          {text || "Nothing to preview!"}
        </p>
      </div>

      {dialogBoxOpen && (
        <DialogBox
          question="Are you sure you want to clear the text?"
          setDialogBoxOpen={setDialogBoxOpen}
          setText={setText}
          showAlert={props.showAlert}
          theme={props.theme}
        />
      )}
    </section>
  );
};

export default TextForm;
