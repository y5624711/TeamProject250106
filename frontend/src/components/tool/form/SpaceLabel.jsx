import React from "react";

export function SpacedLabel({ text, req = false }) {
  return (
    <span
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "space-between",
        marginRight: req ? "1px" : "10.5px",
      }}
    >
      {text.split("").map((c, index) => (
        <span key={index}>{c}</span>
      ))}
    </span>
  );
}
