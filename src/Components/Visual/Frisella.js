import React from "react";
import styles from "./Frisella.module.css";

function Frisella() {
  return (
      <aside className={styles.frisella}>
        <p>
          “It’s not luck, it’s not magic, it’s not circumstances. It’s
          developing a great plan and executing on it, day in and day out until
          the visions in your head become your reality.”
        </p>
        <h3>Andy Frisella</h3>
      </aside>
  );
}

export default Frisella;
