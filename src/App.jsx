import { useEffect, useState } from "react";
import Coin from "./components/Coin";

const SHOP = [
  { id: "1", name: "+1 tap", price: 100, type: "tap", value: 1 },
  { id: "2", name: "+5 tap", price: 500, type: "tap", value: 5 },
  { id: "3", name: "+1 auto/sec", price: 800, type: "auto", value: 1 },
  { id: "4", name: "x2 power", price: 1500, type: "multi", value: 2 },
  { id: "5", name: "+10% crit", price: 2000, type: "crit", value: 0.1 },
];

export default function App() {
  const [score, setScore] = useState(0);
  const [tap, setTap] = useState(1);
  const [auto, setAuto] = useState(0);
  const [crit, setCrit] = useState(0.05);

  const [shopOpen, setShopOpen] = useState(false);
  const [items, setItems] = useState(SHOP);

  const [float, setFloat] = useState([]);

  // load
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

  // save
  useEffect(() => {
    localStorage.setItem(
      "game",
      JSON.stringify({ score, tap, auto, crit, items })
    );
  }, [score, tap, auto, crit, items]);

  // auto income
  useEffect(() => {
    const i = setInterval(() => {
      if (auto > 0) setScore((p) => p + auto);
    }, 1000);
    return () => clearInterval(i);
  }, [auto]);

  // CLICK
  function click(e) {
    let gain = tap;

    if (Math.random() < crit) gain *= 3;

    setScore((p) => p + gain);

    const rect = e?.target?.getBoundingClientRect();

    const id = Date.now();

    const x = rect
      ? rect.left + rect.width / 2
      : window.innerWidth / 2;

    const y = rect
      ? rect.top + rect.height / 2
      : window.innerHeight / 2;

    setFloat((p) => [...p, { id, value: gain, x, y }]);

    setTimeout(() => {
      setFloat((p) => p.filter((f) => f.id !== id));
    }, 500);
  }

  // BUY
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
    <div className="page">

      {/* HUD */}
      <div className="hud">
        💰 {score} | ⚡ x{tap}
      </div>

      {/* COIN */}
      <div className="center">
        <div onClick={click}>
          <Coin skin={{ color: "#facc15" }} />
        </div>
      </div>

      {/* SHOP BUTTON */}
      <button className="shopBtn" onClick={() => setShopOpen(true)}>
        SHOP
      </button>

      {/* SHOP */}
      {shopOpen && (
        <div className="shop">
          <div className="shopTop">
            <div>SHOP</div>
            <div>💰 {score}</div>
            <button onClick={() => setShopOpen(false)}>✕</button>
          </div>

          {items.map((i) => (
            <button key={i.id} className="item" onClick={() => buy(i)}>
              <div>
                <div className="itemName">{i.name}</div>
                <div className="itemDesc">
                  {i.type === "tap" && `+${i.value} до кліку`}
                  {i.type === "auto" && `+${i.value}/сек`}
                  {i.type === "multi" && `x${i.value} множник`}
                  {i.type === "crit" && `+${i.value * 100}% крит`}
                </div>
              </div>

              <div className="price">{i.price}💰</div>
            </button>
          ))}
        </div>
      )}

      {/* FLOAT */}
      {float.map((f) => (
        <div
          key={f.id}
          className="float"
          style={{ left: f.x, top: f.y }}
        >
          +{f.value}
        </div>
      ))}
    </div>
  );
}