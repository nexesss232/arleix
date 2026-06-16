import { useEffect, useState } from "react";

export default function App() {
  const [score, setScore] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("score");
    if (saved) setScore(Number(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("score", score);
  }, [score]);

  function addCoin() {
    setScore(score + 1);
  }

  function reset() {
    setScore(0);
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1>🪙 Coin Clicker</h1>

        <div style={styles.score}>{score} монет</div>

        <button onClick={addCoin} style={styles.coin}>
          🪙
        </button>

        <button onClick={reset} style={styles.reset}>
          Скинути
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #1e1e2f, #2c2c54)",
    color: "white",
    fontFamily: "Arial",
  },
  card: {
    textAlign: "center",
    padding: "40px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.05)",
    boxShadow: "0 0 20px rgba(0,0,0,0.3)",
  },
  score: {
    fontSize: "28px",
    margin: "20px 0",
  },
  coin: {
    fontSize: "60px",
    padding: "20px",
    borderRadius: "50%",
    cursor: "pointer",
    border: "none",
    background: "transparent",
  },
  reset: {
    marginTop: "20px",
    padding: "10px 20px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
  },
};