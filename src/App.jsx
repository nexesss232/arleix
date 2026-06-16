import { useEffect, useState } from "react";

export default function App() {
  const [score, setScore] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [shopOpen, setShopOpen] = useState(false);
  const [upgraded, setUpgraded] = useState(false);

  function addCoin() {
    setScore((prev) => prev + (upgraded ? 2 : 1));
    setClicks((prev) => prev + 1);
  }

  // Відкриття магазину після 50 кліків
  useEffect(() => {
    if (clicks >= 50) {
      setShopOpen(true);
    }
  }, [clicks]);

  function buyUpgrade() {
    if (score >= 250) {
      setScore((prev) => prev - 250);
      setUpgraded(true);
    }
  }

  function reset() {
    setScore(0);
    setClicks(0);
    setShopOpen(false);
    setUpgraded(false);
  }

  // 🛒 МАГАЗИН (ОКРЕМЕ ВІКНО)
  if (shopOpen) {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <h1>🛒 Магазин</h1>

          <p>Монети: {score}</p>

          <button onClick={buyUpgrade} style={styles.button}>
            🔥 +2 за клік (250 🪙)
          </button>

          {upgraded && <p>✔ Покращення активне</p>}

          <button onClick={() => setShopOpen(false)} style={styles.button}>
            ⬅ Повернутись в гру
          </button>
        </div>
      </div>
    );
  }

  // 🎮 ГРА
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1>🪙 Coin Clicker</h1>

        <div style={styles.score}>{score} монет</div>

        <button onClick={addCoin} style={styles.coin}>
          🪙
        </button>

        {clicks >= 50 && (
          <button onClick={() => setShopOpen(true)} style={styles.button}>
            🛒 Відкрити магазин
          </button>
        )}

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
  score: {
    fontSize: "28px",
    margin: "20px 0",
  },
};