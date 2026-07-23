import React from 'react'
import { Plus, Minus } from "lucide-react";
 
const btnCircle = {
  width: 34,
  height: 34,
  borderRadius: "50%",
  border: "1px solid #4a4640",
  background: "#2a2825",
  color: "#F2EEE6",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  flexShrink: 0,
};
 

export default function Stepper({ label, value, onChange, step = 1, min = 0, suffix = "" }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "#8a8783" }}>{label}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - step))}
          style={btnCircle}
          aria-label={`decrease ${label}`}
        >
          <Minus size={14} />
        </button>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18, minWidth: 46, textAlign: "center", color: "#F2EEE6" }}>
          {value}{suffix}
        </span>
        <button type="button" onClick={() => onChange(value + step)} style={btnCircle} aria-label={`increase ${label}`}>
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
}