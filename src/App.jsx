import { useEffect, useState } from "react";
import Coin from "./components/Coin";

export default function App() {
  const [score, setScore] = useState(0);
  const [shopOpen, setShopOpen] = useState(false);

  // 🚫 прибрати виділення і сині обводки
  useEffect(() => {
    document.body.style.userSelect = "none";
    document.body.style.webkitTapHighlightColor = "transparent";
  }, []);

  // ➕ клік по монеті
  function addCoin() {
    setScore((prev) => prev + 1);
  }

  return (
    <div style={styles.page}>
      {/* 🛒 кнопка магазину */}
      <button onClick={() => setShopOpen(true)} style={styles.shopBtn}>
        🛒
      </button>

      {/* 💰 баланс */}
      <div style={styles.score}>{score}</div>

      {/* 🪙 монета */}
      <Coin onClick={addCoin} />

      {/* 🛍️ простий магазин (поки заглушка) */}
      {shopOpen && (
        <div style={styles.shop}>
          <button onClick={() => setShopOpen(false)} style={styles.close}>
            ← Назад
          </button>

          <h2>Магазин</h2>
          <p>Тут будуть апгрейди</p>

          <button
            onClick={() => {
              if (score >= 250) setScore(score - 250);
            }}
          >
            +2 за клік (250)
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
    background: "linear-gradient(135deg,#0f172a,#1e293b)",
    color: "white",
    position: "relative",
  },

  score: {
    fontSize: 48,
    marginBottom: 20,
    fontWeight: "bold",
  },

  shopBtn: {
    position: "absolute",
    top: 15,
    left: 15,
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
  },

  close: {
    position: "absolute",
    top: 20,
    left: 20,
    fontSize: 20,
    background: "transparent",
    border: "none",
    color: "white",
    cursor: "pointer",
  },
};