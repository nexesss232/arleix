import { useEffect, useState } from "react";
import Coin from "./components/Coin";
import { images } from "./theme";

const SHOP = [
  { id: "1", name: "+1 tap", price: 100, type: "tap", value: 1 },
  { id: "2", name: "+5 tap", price: 500, type: "tap", value: 5 },
  { id: "3", name: "+1 auto/sec", price: 800, type: "auto", value: 1 },
  { id: "4", name: "x2 power", price: 1500, type: "multi", value: 2 },
  { id: "5", name: "crit +10%", price: 2000, type: "crit", value: 0.1 },
];

export default function App() {
  const [score, setScore] = useState(0);
  const [tap, setTap] = useState(1);
  const [auto, setAuto] = useState(0);
  const [crit, setCrit] = useState(0.05);

  const [shop, setShop] = useState(false);
  const [items, setItems] = useState(SHOP);

  const [float, setFloat] = useState([]);

  // 💾 LOAD
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

  // 💾 SAVE
  useEffect(() => {
    localStorage.setItem(
      "game",
      JSON.stringify({ score, tap, auto, crit, items })
    );
  }, [score, tap, auto, crit, items]);

  // ⚡ auto income
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
    setFloat((p) => [...p, { id, text: "+" + gain }]);

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

      {/* TOP BAR */}
      <div style={styles.top}>
        💰 {score} | ⚡ x{tap}
      </div>

      {/* COIN */}
      <div style={styles.center}>
        <Coin onClick={click} skin={{ color: "#facc15" }} />
      </div>

      {/* SHOP BTN */}
      <button style={styles.shopBtn} onClick={() => setShop(true)}>
        SHOP
      </button>

      {/* SHOP */}
      {shop && (
        <div style={styles.shop}>
          <div style={styles.shopTop}>
            <button onClick={() => setShop(false)}>←</button>
            <div>SHOP</div>
            <div>💰 {score}</div>
          </div>

          {items.map((i) => (
            <button
              key={i.id}
              style={styles.item}
              onClick={() => buy(i)}
            >
              {i.name} — {i.price}
            </button>
          ))}
        </div>
      )}

      {/* FLOAT */}
      {float.map((f) => (
        <div key={f.id} style={styles.float}>
          {f.text}
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

  top: {
    position: "absolute",
    top: 20,
    left: 20,
    fontSize: 20,
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
    padding: "10px 20px",
    border: "none",
    borderRadius: 10,
    background: "#2563eb",
    color: "white",
  },

  shop: {
    position: "absolute",
    inset: 0,
    background: "#0b1220",
    zIndex: 10,
    padding: 20,
  },

  shopTop: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  item: {
    width: "100%",
    padding: 15,
    marginBottom: 10,
    background: "#111827",
    color: "white",
    border: "1px solid #1f2937",
  },

  float: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-60px)",
    animation: "float 0.5s ease",
    color: "#22c55e",
  },
};