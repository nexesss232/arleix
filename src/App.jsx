import { useEffect, useState } from "react";
import Coin from "./components/Coin";

const SHOP_ITEMS = [
  { id: "250", price: 250, bonus: 2 },
  { id: "500", price: 500, bonus: 1 },
  { id: "1000", price: 1000, bonus: 3 },
];

export default function App() {
  const [score, setScore] = useState(0);
  const [mult, setMult] = useState(1);
  const [shopOpen, setShopOpen] = useState(false);
  const [items, setItems] = useState(SHOP_ITEMS);

  // 💾 LOAD SAVE
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("game"));

    if (saved) {
      setScore(saved.score);
      setMult(saved.mult);
      setItems(saved.items ?? SHOP_ITEMS);
    }
  }, []);

  // 💾 SAVE
  useEffect(() => {
    localStorage.setItem(
      "game",
      JSON.stringify({ score, mult, items })
    );
  }, [score, mult, items]);

  function addCoin() {
    setScore((p) => p + mult);
  }

  function buy(item) {
    if (score < item.price) return;

    setScore((p) => p - item.price);
    setMult((p) => p + item.bonus);

    // 🧠 прибрати куплений апгрейд
    setItems((prev) => prev.filter((i) => i.id !== item.id));
  }

  function closeShop() {
    const el = document.getElementById("shop");
    if (!el) return;

    el.classList.add("shopClose");

    setTimeout(() => {
      setShopOpen(false);
    }, 350);
  }

  return (
    <div style={styles.page}>

      {/* 🌌 background */}
      <div style={styles.background}>
        <div style={styles.blob1}></div>
        <div style={styles.blob2}></div>
        <div style={styles.blob3}></div>
      </div>

      {/* 🧱 game */}
      <div style={styles.card}>

        <button style={styles.shopBtn} onClick={() => setShopOpen(true)}>
          🛒
        </button>

        <div style={styles.score}>{score}</div>

        <div style={styles.center}>
          <Coin onClick={addCoin} />
        </div>

      </div>

      {/* 🛍️ SHOP */}
      {shopOpen && (
        <div id="shop" style={styles.shop}>
          <button style={styles.close} onClick={closeShop}>
            ←
          </button>

          <h2>Магазин</h2>

          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => buy(item)}
              style={styles.shopItem}
            >
              +{item.bonus} за клік — {item.price}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {

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

  background: {
    position: "absolute",
    inset: 0,
  },

  blob1: {
    position: "absolute",
    width: 300,
    height: 300,
    background: "radial-gradient(circle, #60a5fa, transparent)",
    top: "10%",
    left: "10%",
    filter: "blur(40px)",
  },

  blob2: {
    position: "absolute",
    width: 250,
    height: 250,
    background: "radial-gradient(circle, #a78bfa, transparent)",
    bottom: "10%",
    right: "10%",
    filter: "blur(50px)",
  },

  blob3: {
    position: "absolute",
    width: 200,
    height: 200,
    background: "radial-gradient(circle, #34d399, transparent)",
    top: "50%",
    left: "60%",
    filter: "blur(60px)",
  },

  card: {
    width: 360,
    height: 520,
    background: "rgba(255,255,255,0.05)",
    borderRadius: 25,
    border: "1px solid rgba(255,255,255,0.1)",
    backdropFilter: "blur(12px)",
    position: "relative",
    zIndex: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  center: {
    position: "absolute",
    top: "55%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },

  score: {
    position: "absolute",
    top: 15,
    right: 15,
    fontSize: 32,
    fontWeight: "bold",
  },

  shopBtn: {
    position: "absolute",
    top: 15,
    left: 15,
    fontSize: 26,
    background: "transparent",
    border: "none",
    color: "white",
    cursor: "pointer",
  },

  shop: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "300px",
    height: "100%",
    background: "#111827",
    display: "flex",
    flexDirection: "column",
    padding: 20,
    gap: 10,
    animation: "shopOpen 0.35s ease",
  },

  shopItem: {
    padding: 10,
    background: "#1f2937",
    border: "none",
    color: "white",
    cursor: "pointer",
  },

  close: {
    fontSize: 28,
    background: "transparent",
    border: "none",
    color: "white",
    cursor: "pointer",
    textAlign: "left",
  },
};