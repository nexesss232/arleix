import { useEffect, useState } from "react";

export default function App() {
  const [score, setScore] = useState(0);
  const [upgraded, setUpgraded] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);

  function addCoin() {
    setScore((prev) => prev + (upgraded ? 2 : 1));
  }

  function buyUpgrade() {
    if (score >= 250) {
      setScore((prev) => prev - 250);
      setUpgraded(true);
    }
  }

  function reset() {
    setScore(0);
    setUpgraded(false);
  }

  // 🛒 SHOP SCREEN
  if (shopOpen) {
    return (
      <div style={styles.page}>
        <div style={styles.card}>

          {/* back button */}
          <button onClick={() => setShopOpen(false)} style={styles.back}>
            ←
          </button>

          <h1>🛒 shop</h1>

          <p>Coins: {score}</p>

          <button onClick={buyUpgrade} style={styles.button}>
            🔥 +2 per click (250 🪙)
          </button>

          {upgraded && <p>✔ Upgrade active</p>}
        </div>
      </div>
    );
  }

  // 🎮 GAME SCREEN
  return (
    <div style={styles.page}>
      <div style={styles.card}>

        {/* 🛒 shop button always visible */}
        <button onClick={() => setShopOpen(true)} style={styles.shopBtn}>
          🛒 shop
        </button>

        <h1>🪙 Coin Clicker</h1>

        <div style={styles.score}>{score} монет</div>

        <button onClick={addCoin} style={styles.coin}>
          🪙
        </button>

        <button onClick={reset} style={styles.button}>
          🔄 Скинути
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
    position: "relative",
    width: "320px",
  },

  shopBtn: {
    position: "absolute",
    top: "10px",
    left: "10px",
    padding: "8px 12px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    background: "#ffcc00",
    fontWeight: "bold",
  },

  back: {
    position: "absolute",
    top: "10px",
    left: "10px",
    fontSize: "20px",
    border: "none",
    background: "transparent",
    color: "white",
    cursor: "pointer",
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

  button: {
    marginTop: "15px",
    padding: "10px 20px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
  },
};