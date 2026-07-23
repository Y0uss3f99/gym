import React from 'react'
import { useState, useMemo } from "react";
import { Plus, Trash2, Flame, Trophy, Dumbbell, ChevronRight, Fullscreen } from "lucide-react";
import ForgeBar from "./ForgeBar";
import Stepper from "./Stepper";
 
const MUSCLE_GROUPS = [
  { id: "chest", label: "Chest", exercises: ["Bench press", "Incline dumbbell press", "Cable fly", "Dips"] },
  { id: "back", label: "Back", exercises: ["Deadlift", "Pull-up", "Barbell row", "Lat pulldown"] },
  { id: "legs", label: "Legs", exercises: ["Back squat", "Leg press", "Romanian deadlift", "Walking lunge"] },
  { id: "shoulders", label: "Shoulders", exercises: ["Overhead press", "Lateral raise", "Face pull", "Arnold press"] },
  { id: "arms", label: "Arms", exercises: ["Barbell curl", "Skull crusher", "Hammer curl", "Rope pushdown"] },
  { id: "core", label: "Core", exercises: ["Hanging leg raise", "Cable crunch", "Plank", "Ab wheel rollout"] },
];
 
export default function GemBodyBuilder() {
  const [activeGroup, setActiveGroup] = useState("chest");
  const [exercise, setExercise] = useState(MUSCLE_GROUPS[0].exercises[0]);
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(10);
  const [weight, setWeight] = useState(40);
  const [log, setLog] = useState([
    { id: 1, group: "chest", exercise: "Bench press", sets: 4, reps: 8, weight: 70 },
    { id: 2, group: "back", exercise: "Deadlift", sets: 3, reps: 5, weight: 120 },
  ]);
 
  const currentGroup = MUSCLE_GROUPS.find((g) => g.id === activeGroup);
 
  const todayVolume = useMemo(
    () => log.reduce((sum, item) => sum + item.sets * item.reps * item.weight, 0),
    [log]
  );
 
  const prLift = useMemo(() => {
    if (log.length === 0) return null;
    return log.reduce((max, item) => (item.weight > max.weight ? item : max), log[0]);
  }, [log]);
 
  function handleGroupChange(id) {
    setActiveGroup(id);
    const group = MUSCLE_GROUPS.find((g) => g.id === id);
    setExercise(group.exercises[0]);
  }
 
  function addEntry() {
    setLog((prev) => [
      ...prev,
      { id: Date.now(), group: activeGroup, exercise, sets, reps, weight },
    ]);
  }
 
  function removeEntry(id) {
    setLog((prev) => prev.filter((item) => item.id !== id));
  }
 
  return (
    <div style={{ background: "#1E1C1A", minHeight: "100vh", padding: "20px 14px", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap');
        * { box-sizing: border-box; }
        select, input[type="text"] { font-family: 'Inter', sans-serif; }
        .gem-hero { grid-template-columns: 1fr; }
        .gem-form { grid-template-columns: 1fr 1fr; }
        .gem-form .gem-exercise-field { grid-column: 1 / -1; }
        .gem-form .gem-add-btn { grid-column: 1 / -1; justify-content: center; }
        .gem-tabs { overflow-x: auto; -webkit-overflow-scrolling: touch; flex-wrap: nowrap !important; padding-bottom: 4px; }
        .gem-tabs::-webkit-scrollbar { display: none; }
        .gem-log-row { flex-direction: column; align-items: flex-start !important; gap: 8px; }
        .gem-log-row .gem-log-right { width: 100%; justify-content: space-between; }
        @media (min-width: 640px) {
          .gem-hero { grid-template-columns: 1.3fr 1fr; }
          .gem-form { grid-template-columns: 2fr 1fr 1fr 1fr auto; }
          .gem-form .gem-exercise-field { grid-column: auto; }
          .gem-form .gem-add-btn { grid-column: auto; justify-content: center; }
          .gem-log-row { flex-direction: row; align-items: center !important; }
          .gem-log-row .gem-log-right { width: auto; }
        }
      `}</style>
 
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <header style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 28 }}>
          <div>
            <h1
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 38,
                letterSpacing: "0.03em",
                color: "#F2EEE6",
                margin: 0,
                lineHeight: 1,
              }}
            >
              GEM
            </h1>
            <p style={{ margin: "4px 0 0", fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "#8a8783" }}>
              Gym Exercise Manager
            </p>
          </div>
          <Dumbbell size={28} color="#E2572B" />
        </header>
 
        <section
          className="gem-hero"
          style={{
            background: "#26231F",
            border: "1px solid #3a3733",
            borderRadius: 14,
            padding: 18,
            marginBottom: 16,
            display: "grid",
            gap: 20,
          }}
        >
          <div>
            <span style={{ fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "#8a8783" }}>
              Today's volume
            </span>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6, margin: "4px 0 16px" }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 34, color: "#F2EEE6", fontWeight: 700 }}>
                {todayVolume.toLocaleString()}
              </span>
              <span style={{ color: "#8a8783", fontSize: 15 }}>kg lifted</span>
            </div>
            <ForgeBar volume={todayVolume} />
          </div>
 
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ background: "#2f2b26", borderRadius: 10, padding: "12px 14px", display: "flex", alignItems: "center", gap: 10 }}>
              <Flame size={18} color="#E2572B" />
              <div>
                <div style={{ fontSize: 12, color: "#8a8783" }}>Streak</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 16, color: "#F2EEE6" }}>6 days</div>
              </div>
            </div>
            <div style={{ background: "#2f2b26", borderRadius: 10, padding: "12px 14px", display: "flex", alignItems: "center", gap: 10 }}>
              <Trophy size={18} color="#C9A227" />
              <div>
                <div style={{ fontSize: 12, color: "#8a8783" }}>Heaviest today</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 16, color: "#F2EEE6" }}>
                  {prLift ? `${prLift.exercise} · ${prLift.weight}kg` : "—"}
                </div>
              </div>
            </div>
          </div>
        </section>
 
        <nav className="gem-tabs" style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
          {MUSCLE_GROUPS.map((g) => (
            <button
              key={g.id}
              onClick={() => handleGroupChange(g.id)}
              style={{
                padding: "8px 16px",
                borderRadius: 999,
                border: activeGroup === g.id ? "1px solid #E2572B" : "1px solid #3a3733",
                background: activeGroup === g.id ? "#3a2620" : "#26231F",
                color: activeGroup === g.id ? "#F0997B" : "#c9c5bd",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              {g.label}
            </button>
          ))}
        </nav>
 
        <section style={{ background: "#26231F", border: "1px solid #3a3733", borderRadius: 14, padding: 16, marginBottom: 16 }}>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, letterSpacing: "0.03em", color: "#F2EEE6", margin: "0 0 14px" }}>
            Log a set — {currentGroup.label}
          </h2>
          <div className="gem-form" style={{ display: "grid", gap: 16, alignItems: "end" }}>
            <div className="gem-exercise-field" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "#8a8783" }}>Exercise</span>
              <select
                value={exercise}
                onChange={(e) => setExercise(e.target.value)}
                style={{
                  background: "#1E1C1A",
                  color: "#F2EEE6",
                  border: "1px solid #4a4640",
                  borderRadius: 8,
                  padding: "10px 10px",
                  fontSize: 14,
                  width: "100%",
                  height: 42,
                }}
              >
                {currentGroup.exercises.map((ex) => (
                  <option key={ex} value={ex}>{ex}</option>
                ))}
              </select>
            </div>
            <Stepper label="Sets" value={sets} onChange={setSets} min={1} />
            <Stepper label="Reps" value={reps} onChange={setReps} min={1} />
            <Stepper label="Weight" value={weight} onChange={setWeight} step={2.5} min={0} suffix="kg" />
            <button
              onClick={addEntry}
              className="gem-add-btn"
              style={{
                background: "#E2572B",
                color: "#1E1C1A",
                border: "none",
                borderRadius: 8,
                padding: "12px 18px",
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                height: 44,
              }}
            >
              <Plus size={16} /> Add set
            </button>
          </div>
        </section>
 
        <section style={{ background: "#26231F", border: "1px solid #3a3733", borderRadius: 14, padding: 22 }}>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: "0.03em", color: "#F2EEE6", margin: "0 0 16px" }}>
            Today's log
          </h2>
          {log.length === 0 ? (
            <p style={{ color: "#8a8783", fontSize: 14 }}>No sets logged yet. Add your first lift above.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {log.map((item) => (
                <div
                  key={item.id}
                  className="gem-log-row"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    background: "#2f2b26",
                    borderRadius: 10,
                    padding: "12px 14px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                    <ChevronRight size={14} color="#E2572B" />
                    <span style={{ color: "#F2EEE6", fontWeight: 600, fontSize: 14 }}>{item.exercise}</span>
                    <span
                      style={{
                        fontSize: 11,
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                        color: "#8a8783",
                        border: "1px solid #4a4640",
                        borderRadius: 999,
                        padding: "2px 8px",
                      }}
                    >
                      {MUSCLE_GROUPS.find((g) => g.id === item.group)?.label}
                    </span>
                  </div>
                  <div className="gem-log-right" style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "#c9c5bd" }}>
                      {item.sets} × {item.reps} @ {item.weight}kg
                    </span>
                    <button
                      onClick={() => removeEntry(item.id)}
                      aria-label={`remove ${item.exercise}`}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#8a8783",
                        cursor: "pointer",
                        display: "flex",
                        padding: 8,
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
 