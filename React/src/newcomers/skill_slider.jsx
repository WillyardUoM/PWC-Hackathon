import { Slider } from "primereact/slider";
import { useState } from "react";
import "./primereactMod.css";

function Skill_slider() {
  const [range, setRange] = useState(0);

  return (
    <>
      <div
        style={{
          fontSize: "16px",
          fontWeight: "600",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <input
          name="skillRate"
          id="skillRate"
          style={{
            fontSize: "inherit",
            fontWeight: "inherit",
            marginBottom: "10px",
            backgroundColor: "transparent",
          }}
          disabled
          value={range}
        />
        10
      </div>
      <Slider
        max={10}
        value={range}
        onChange={(e) => setRange(e.value)}
        style={{ width: "100%" }}
      />
    </>
  );
}

export default Skill_slider;
