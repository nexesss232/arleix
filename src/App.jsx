import { useState } from "react";
import Coin from "./components/Coin";

export default function App() {
  const [score, setScore] = useState(0);
  const [mult, setMult] = useState(1);
  const [shopOpen, setShopOpen] = useState(false);

  function addCoin() {
    setScore((prev) => prev + mult);
  }

  function buy(type) {
    if (type === "250" && score >= 250) {
      setScore(score - 250);
      setMult(mult + 2);
    }

    if (type === "500" && score >= 500) {
      setScore(score - 500);
      setMult(mult + 1);
    }

    if (type === "1000" && score >= 1000) {
      setScore(score - 1000);
      setMult(mult + 3);
    }
  }

  return (
    <div style={styles.page}>
      <button style={styles.shopBtn} onClick={() => setShopOpen(true)}>
        🛒
      </button>

      <div style={styles.score}>{score}</div>

      <Coin onClick={addCoin} />

      {shopOpen && (
        <div style={styles.shop}>
          <button style={styles.close} onClick={() => setShopOpen(false)}>
            ←
          </button>

          <h2>Магазин</h2>

          <button onClick={() => buy("250")}>
            +2 за клік — 250
          </button>

          <button onClick={() => buy("500")}>
            +1 за клік — 500
          </button>

          <button onClick={() => buy("1000")}>
            +3 за клік — 1000
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#111827",
    color: "white",
    position: "relative",
  },

  score: {
    fontSize: 48,
    marginBottom: 20,
  },

  shopBtn: {
    position: "absolute",
    top: 10,
    left: 10,
    fontSize: 24,
    background: "transparent",
    border: "none",
    cursor: "pointer",
    color: "white",
  },

  shop: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.9)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  close: {
    position: "absolute",
    top: 20,
    left: 20,
    fontSize: 24,
    background: "transparent",
    border: "none",
    color: "white",
    cursor: "pointer",
  },
};