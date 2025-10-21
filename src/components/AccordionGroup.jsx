import React, { useState } from "react";

const AccordionGroup = ({ title, children, theme }) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    <div className="mb-4 rounded-lg overflow-hidden border shadow-sm">
      {/* Accordion Header */}
      <button
        onClick={toggleOpen}
        className={`w-full px-4 py-2 text-left font-semibold transition-all duration-200 focus:outline-none ${
          theme === "light"
            ? "bg-yellow-200 text-gray-800 hover:bg-yellow-300"
            : "bg-gray-800 text-gray-100 hover:bg-gray-700"
        }`}
      >
        {title} {open ? "▲" : "▼"}
      </button>

      {/* Accordion Body */}
      {open && (
        <div
          className={`p-3 flex flex-wrap gap-2 transition-all duration-300 ${
            theme === "light" ? "bg-yellow-50" : "bg-gray-900"
          }`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default AccordionGroup;
