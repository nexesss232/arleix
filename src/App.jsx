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

      {/* 🌌 BACKGROUND EFFECTS */}
      <div style={styles.background}>
        <div style={styles.blob1}></div>
        <div style={styles.blob2}></div>
        <div style={styles.blob3}></div>
      </div>

      {/* 🧱 GAME CARD */}
      <div style={styles.card}>

        {/* 🛒 shop button */}
        <button style={styles.shopBtn} onClick={() => setShopOpen(true)}>
          🛒
        </button>

        {/* 💰 score */}
        <div style={styles.score}>{score}</div>

        {/* 🪙 coin */}
        <div style={styles.center}>
          <Coin onClick={addCoin} />
        </div>

      </div>

      {/* 🛍️ SHOP */}
      {shopOpen && (
        <div style={styles.shop}>
          <button style={styles.close} onClick={() => setShopOpen(false)}>
            ←
          </button>

          <h2>Магазин</h2>

          <button onClick={() => buy("250")}>+2 за клік — 250</button>
          <button onClick={() => buy("500")}>+1 за клік — 500</button>
          <button onClick={() => buy("1000")}>+3 за клік — 1000</button>
        </div>
      )}

    </div>
  );
}

const styles = {

  // 🧠 основа
  page: {
    height: "100vh",
    background: "#0f172a",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    position: "relative",
    color: "white",
  },

  // 🌌 фон
  background: {
    position: "absolute",
    inset: 0,
    overflow: "hidden",
  },

  blob1: {
    position: "absolute",
    width: 300,
    height: 300,
    background: "radial-gradient(circle, #60a5fa, transparent 60%)",
    top: "10%",
    left: "10%",
    filter: "blur(40px)",
    animation: "float1 6s ease-in-out infinite",
  },

  blob2: {
    position: "absolute",
    width: 250,
    height: 250,
    background: "radial-gradient(circle, #a78bfa, transparent 60%)",
    bottom: "10%",
    right: "10%",
    filter: "blur(50px)",
    animation: "float2 8s ease-in-out infinite",
  },

  blob3: {
    position: "absolute",
    width: 200,
    height: 200,
    background: "radial-gradient(circle, #34d399, transparent 60%)",
    top: "50%",
    left: "60%",
    filter: "blur(60px)",
    animation: "float3 10s ease-in-out infinite",
  },

  // 🧱 картка
  card: {
    width: 360,
    height: 520,
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 25,
    backdropFilter: "blur(12px)",
    position: "relative",
    zIndex: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  // 🪙 центр
  center: {
    position: "absolute",
    top: "55%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },

  // 💰 score
  score: {
    position: "absolute",
    top: 15,
    right: 15,
    fontSize: 32,
    fontWeight: "bold",
  },

  // 🛒 button
  shopBtn: {
    position: "absolute",
    top: 15,
    left: 15,
    fontSize: 26,
    background: "transparent",
    border: "none",
    cursor: "pointer",
    color: "white",
  },

  // 🛍️ shop
  shop: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.92)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    zIndex: 10,
  },

  close: {
    position: "absolute",
    top: 20,
    left: 20,
    fontSize: 28,
    background: "transparent",
    border: "none",
    color: "white",
    cursor: "pointer",
  },
};