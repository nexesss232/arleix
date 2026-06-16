import { useEffect, useState } from "react";
import Coin from "./components/Coin";

const SHOP = [
  { id: "1", name: "+1 tap", price: 100, type: "tap", value: 1 },
  { id: "2", name: "+5 tap", price: 500, type: "tap", value: 5 },
  { id: "3", name: "+1 auto/sec", price: 800, type: "auto", value: 1 },
  { id: "4", name: "x2 power", price: 1500, type: "multi", value: 2 },
  { id: "5", name: "+crit 10%", price: 2000, type: "crit", value: 0.1 },
];

export default function App() {
  const [score, setScore] = useState(0);
  const [tap, setTap] = useState(1);
  const [auto, setAuto] = useState(0);
  const [crit, setCrit] = useState(0.05);

  const [shopOpen, setShopOpen] = useState(false);
  const [items, setItems] = useState(SHOP);

  const [float, setFloat] = useState([]);

  // LOAD
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("game"));
    if (data) {
      setScore(data.score || 0);
      setTap(data.tap || 1);
      setAuto(data.auto || 0);
      setCrit(data.crit || 0.05);
      setItems(data.items || SHOP);
    }
  }, []);

  // SAVE
  useEffect(() => {
    localStorage.setItem(
      "game",
      JSON.stringify({ score, tap, auto, crit, items })
    );
  }, [score, tap, auto, crit, items]);

  // AUTO
  useEffect(() => {
    const i = setInterval(() => {
      if (auto > 0) setScore((p) => p + auto);
    }, 1000);
    return () => clearInterval(i);
  }, [auto]);

  function click() {
    let gain = tap;

    if (Math.random() < crit) gain *= 3;

    setScore((p) => p + gain);

    const id = Date.now();
    setFloat((p) => [...p, { id, value: gain }]);

    setTimeout(() => {
      setFloat((p) => p.filter((x) => x.id !== id));
    }, 500);
  }

  function buy(item) {
    if (score < item.price) return;

    setScore((p) => p - item.price);

    if (item.type === "tap") setTap((p) => p + item.value);
    if (item.type === "auto") setAuto((p) => p + item.value);
    if (item.type === "multi") setTap((p) => p * item.value);
    if (item.type === "crit") setCrit((p) => p + item.value);

    setItems((p) => p.filter((i) => i.id !== item.id));
  }

  return (
    <div style={styles.page}>

      {/* HUD */}
      <div style={styles.hud}>
        💰 {score} | ⚡ x{tap}
      </div>

      {/* COIN */}
      <div style={styles.center}>
        <Coin onClick={click} skin={{ color: "#facc15" }} />
      </div>

      {/* SHOP BUTTON */}
      <button style={styles.shopBtn} onClick={() => setShopOpen(true)}>
        SHOP
      </button>

      {/* SHOP */}
      {shopOpen && (
        <div style={styles.shop}>
          <div style={styles.shopTop}>
            <div>SHOP</div>
            <div>💰 {score}</div>
            <button onClick={() => setShopOpen(false)}>✕</button>
          </div>

          {items.map((i) => (
            <button key={i.id} style={styles.item} onClick={() => buy(i)}>
              <span>{i.name}</span>
              <span>{i.price}💰</span>
            </button>
          ))}
        </div>
      )}

      {/* FLOAT TEXT */}
      {float.map((f) => (
        <div key={f.id} style={styles.float}>
          +{f.value}
        </div>
      ))}
    </div>
  );
}

const styles = {

  page: {
    height: "100vh",
    background: "#050816",
    color: "white",
    overflow: "hidden",
    fontFamily: "Arial",
  },

  hud: {
    position: "absolute",
    top: 15,
    left: 15,
    fontSize: 18,
    fontWeight: "bold",
  },

  center: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  },

  shopBtn: {
    position: "absolute",
    bottom: 20,
    left: "50%",
    transform: "translateX(-50%)",
    padding: "12px 22px",
    borderRadius: 12,
    border: "none",
    background: "#2563eb",
    color: "white",
    fontWeight: "bold",
  },

  shop: {
    position: "absolute",
    inset: 0,
    background: "#0b1220",
    padding: 20,
    zIndex: 100,
  },

  shopTop: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 20,
    fontSize: 20,
  },

  item: {
    width: "100%",
    padding: 16,
    marginBottom: 10,
    background: "#111827",
    borderRadius: 12,
    border: "1px solid #1f2937",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    cursor: "pointer",
  },

  float: {
    position: "absolute",
    top: "45%",
    left: "50%",
    transform: "translate(-50%, 0)",
    fontSize: 34,
    fontWeight: "bold",
    color: "#22c55e",
    textShadow: "0 0 10px rgba(34,197,94,0.8)",
    animation: "floatUp 0.5s ease forwards",
    pointerEvents: "none",
  },
};