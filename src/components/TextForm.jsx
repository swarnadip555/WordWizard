import React, { useEffect, useState } from "react";
import { getTextOperations } from "../data/textUtils";
import DialogBox from "./DialogBox";
import Toolbar from "./Toolbar";
import Aos from "aos";
import { useTranslation } from "react-i18next";

const TextForm = (props) => {
  const [text, setText] = useState("");
  const [previewText, setPreviewText] = useState("");
  const [dialogBoxOpen, setDialogBoxOpen] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrike, setIsStrike] = useState(false);
  const [grammarResults, setGrammarResults] = useState([]);
  const [loadingGrammar, setLoadingGrammar] = useState(false);
  const fileInputRef = React.useRef();

  const { t } = useTranslation();

  useEffect(() => {
    Aos.refresh();
  }, [props.theme]);

  const handleChange = (e) => {
    setText(e.target.value);
    setPreviewText(e.target.value);
  };

  const handleFileImport = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const content = ev.target.result;
      setText(content);
      setPreviewText(content);
      props.showAlert(t("alerts.fileImported"), "success");
    };
    reader.onerror = () => {
      props.showAlert(t("alerts.fileError"), "error");
    };
    reader.readAsText(file, "utf-8");
  };

  const handleFileInputClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
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
    { isBold, setIsBold, isItalic, setIsItalic, isUnderline, setIsUnderline, isStrike, setIsStrike },
    handleFileInputClick
  );

  const buttonStyle = {
    color: props.theme === "light" ? "black" : "white",
    backgroundImage:
      props.theme === "light"
        ? "linear-gradient(135deg, #faffa3 0%, #f0f0a8 100%)"
        : `${props.colorTheme}`,
    filter: props.theme === "light" ? "none" : "brightness(140%)",
    fontWeight: props.theme === "light" ? 400 : 300,
    boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.15)",
  };

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

  return (
    <section
      className={`min-h-screen py-8 ${
        props.theme === "light" ? "text-gray-900" : "text-white"
      }`}
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-6" data-aos="fade-down" data-aos-duration="800">
          <h1 className="text-3xl font-bold mb-6">{t("textForm.title")}</h1>

          <Toolbar
            textOperations={textOperations}
            theme={props.theme}
            colorTheme={props.colorTheme}
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
              props.theme === "light"
                ? "bg-white border-gray-300 text-gray-900"
                : "bg-gray-700 border-gray-500 text-white"
            }`}
            rows="10"
            value={text}
            onChange={handleChange}
            placeholder={t("textForm.placeholder")}
          ></textarea>

          <input
            ref={fileInputRef}
            type="file"
            accept=".txt"
            className="hidden"
            onChange={(e) =>
              handleFileImport(e.target.files && e.target.files[0])
            }
          />
        </div>

        {/* FUNCTION BUTTONS (keep English labels) */}
        <div
          className="flex flex-wrap gap-2 my-6"
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="800"
        >
          {textOperations.map((op, i) => (
            <button
              key={i}
              disabled={
                (!(text && text.trim().length > 0) && !op.allowEmpty) ||
                (op.label === "Check Grammar" && loadingGrammar)
              }
              onClick={op.func}
              style={buttonStyle}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                (!(text && text.trim().length > 0) && !op.allowEmpty) ||
                (op.label === "Check Grammar" && loadingGrammar)
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:scale-105 active:scale-95"
              }`}
            >
              {op.label === "Check Grammar" && loadingGrammar
                ? t("textForm.checking")
                : op.label}
            </button>
          ))}
        </div>
      </div>

      {/* SUMMARY CARD */}
      <div
        className={`container mx-auto px-6 py-8 max-w-4xl rounded-2xl shadow-lg transition-all duration-300 ${
          props.theme === "light"
            ? "bg-yellow-100 text-gray-800"
            : "bg-gray-900 text-gray-100"
        }`}
        data-aos="zoom-in-up"
        data-aos-delay="400"
        data-aos-duration="800"
      >
        <h2
          className="text-3xl font-bold mb-6 text-center"
          data-aos="fade-right"
          data-aos-delay="500"
        >
          {t("textForm.summary")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-center">
          <div className="p-4 rounded-xl border shadow-sm" data-aos="fade-up" data-aos-delay="600">
            <p className="text-sm font-medium">{t("textForm.words")}</p>
            <p className="text-2xl font-semibold">
              {text.split(/\s+/).filter((el) => el.length !== 0).length}
            </p>
          </div>
          <div className="p-4 rounded-xl border shadow-sm" data-aos="fade-up" data-aos-delay="700">
            <p className="text-sm font-medium">{t("textForm.characters")}</p>
            <p className="text-2xl font-semibold">{text.length}</p>
          </div>
          <div className="p-4 rounded-xl border shadow-sm" data-aos="fade-up" data-aos-delay="800">
            <p className="text-sm font-medium">{t("textForm.readingTime")}</p>
            <p className="text-2xl font-semibold">
              {(0.008 * text.split(" ").filter((el) => el.length !== 0).length).toFixed(2)}{" "}
              {t("textForm.minutes")}
            </p>
          </div>
        </div>

        <div data-aos="fade-up" data-aos-delay="1000">
          <h2 className="text-2xl font-bold mb-4">{t("textForm.preview")}</h2>
          <p className="text-lg leading-relaxed">
            {previewText && previewText.length > 0
              ? previewText
              : t("textForm.noPreview")}
          </p>
        </div>
      </div>

      {dialogBoxOpen && (
        <DialogBox
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
