import { useEffect, useState } from "react";

export default function App() {
  const [score, setScore] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [shopOpen, setShopOpen] = useState(false);
  const [upgraded, setUpgraded] = useState(false);
  const [confetti, setConfetti] = useState(false);

  function addCoin() {
    setScore((prev) => prev + (upgraded ? 2 : 1));
    setClicks((prev) => prev + 1);
  }

  // 100 кліків → відкриття магазину + конфеті
  useEffect(() => {
    if (clicks === 100) {
      setShopOpen(true);
      setConfetti(true);

      setTimeout(() => {
        setConfetti(false);
      }, 3000);
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

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1>🪙 Coin Clicker</h1>

        <div>Монети: {score}</div>
        <div>Кліки: {clicks}/100</div>

        <button onClick={addCoin} style={styles.coin}>
          🪙
        </button>

        {shopOpen && (
          <div style={styles.shop}>
            <h3>🛒 Магазин</h3>

            <button onClick={buyUpgrade} style={styles.button}>
              Покращення (+2 за клік) — 250 🪙
            </button>

            {upgraded && <p>🔥 Покращення активне!</p>}
          </div>
        )}

        <button onClick={reset} style={styles.reset}>
          Скинути
        </button>
      </div>

      {confetti && <div style={styles.confetti}>🎉🎉🎉</div>}
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
    flexDirection: "column",
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
  reset: {
    marginTop: "20px",
    padding: "10px 20px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
  },
  shop: {
    marginTop: "20px",
    padding: "15px",
    borderRadius: "10px",
    background: "rgba(0,0,0,0.3)",
  },
  button: {
    padding: "10px",
    marginTop: "10px",
    cursor: "pointer",
  },
  confetti: {
    position: "absolute",
    top: "20%",
    fontSize: "40px",
    animation: "pop 1s infinite",
  },
};