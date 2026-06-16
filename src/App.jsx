import { useEffect, useState } from "react";

export default function App() {
  const [score, setScore] = useState(0);
  const [shopOpen, setShopOpen] = useState(false);

  const [mult, setMult] = useState(1);

  const [upg, setUpg] = useState({
    u250: false,
    u500: false,
    u1000: false,
  });

  // 🚫 remove blue tap highlight (mobile/telegram)
  useEffect(() => {
    document.body.style.userSelect = "none";
    document.body.style.webkitTapHighlightColor = "transparent";
    document.body.style.outline = "none";
  }, []);

  function addCoin() {
    setScore((s) => s + mult);
  }

  function buy(type) {
    if (type === "u250" && score >= 250 && !upg.u250) {
      setScore((s) => s - 250);
      setMult((m) => m + 2);
      setUpg((u) => ({ ...u, u250: true }));
    }

    if (type === "u500" && score >= 500 && !upg.u500) {
      setScore((s) => s - 500);
      setMult((m) => m + 1);
      setUpg((u) => ({ ...u, u500: true }));
    }

    if (type === "u1000" && score >= 1000 && !upg.u1000) {
      setScore((s) => s - 1000);
      setMult((m) => m + 3);
      setUpg((u) => ({ ...u, u1000: true }));
    }
  }

  // 🛒 SHOP SCREEN
  if (shopOpen) {
    return (
      <div style={styles.page}>
        <div style={styles.card}>

          {/* back */}
          <button onClick={() => setShopOpen(false)} style={styles.back}>
            ←
          </button>

          {/* balance top right */}
          <div style={styles.balance}>
            🪙 {score}
          </div>

          <h2>🛒 Магазин</h2>

          {!upg.u250 && (
            <button onClick={() => buy("u250")} style={styles.btn}>
              +2 за клік — 250
            </button>
          )}

          {!upg.u500 && (
            <button onClick={() => buy("u500")} style={styles.btn}>
              +1 за клік — 500
            </button>
          )}

          {!upg.u1000 && (
            <button onClick={() => buy("u1000")} style={styles.btn}>
              +3 за клік — 1000
            </button>
          )}

          {upg.u250 && upg.u500 && upg.u1000 && (
            <p>✔ всі покращення куплені</p>
          )}

        </div>
      </div>
    );
  }

  // 🎮 GAME SCREEN
  return (
    <div style={styles.page}>
      <div style={styles.card}>

        <button onClick={() => setShopOpen(true)} style={styles.shop}>
          🛒
        </button>

        <div style={styles.score}>{score}</div>

        <button onClick={addCoin} style={styles.coin}>
          🪙
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
    background: "linear-gradient(135deg,#1e1e2f,#2c2c54)",
    color: "white",
    fontFamily: "Arial",
  },

  card: {
    position: "relative",
    width: "320px",
    textAlign: "center",
    padding: "40px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.05)",
  },

  shop: {
    position: "absolute",
    top: 10,
    left: 10,
    padding: "6px 10px",
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
  },

  balance: {
    position: "absolute",
    top: 10,
    right: 10,
    fontSize: 16,
  },

  back: {
    position: "absolute",
    top: 10,
    left: 10,
    fontSize: 22,
    background: "transparent",
    border: "none",
    color: "white",
    cursor: "pointer",
  },

  score: {
    fontSize: 40,
    marginBottom: 20,
  },

  coin: {
    fontSize: 60,
    border: "none",
    background: "transparent",
    cursor: "pointer",
  },

  btn: {
    display: "block",
    width: "100%",
    margin: "10px 0",
    padding: 10,
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
  },
};