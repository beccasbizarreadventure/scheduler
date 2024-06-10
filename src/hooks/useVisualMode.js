import { useState } from "react";

// export default function useVisualMode(initial) {
//   const [history, setHistory] = useState([initial]);

//   const transition = (newMode, replace = false) => {
//     if (replace === true && history !== initial) {
//       setHistory(history => [...history.slice(0, history.length - 1), newMode]);
//     } else {
//       setHistory(history => [...history, newMode]);
//     }
//   };
//   const back = () => {
//     if (history.length > 1) {
//       setHistory(history => [...history.slice(0, history.length - 1)]);
//     }
//   };

//   return { mode: history[history.length - 1], transition, back };
// }

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (replace) {
      // Replace the last mode. This simplification assumes you always have at least the initial mode in your history.
      setHistory(history => [...history.slice(0, history.length - 1), newMode]);
    } else {
      setHistory(history => [...history, newMode]);
    }
  };
  const back = () => {
    if (history.length > 1) {
      setHistory(history => [...history.slice(0, history.length - 1)]);
    }
  };

  return { mode: history[history.length - 1], transition, back };
}