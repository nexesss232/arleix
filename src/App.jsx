import { useEffect, useState } from "react";
import { supabase } from "./supabase";

// 🧠 тимчасовий user id (пізніше замінимо на Telegram)
const getUserId = () => {
  let id = localStorage.getItem("user_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("user_id", id);
  }
  return id;
};

export default function App() {
  const userId = getUserId();

  const [score, setScore] = useState(0);
  const [mult, setMult] = useState(1);
  const [shopOpen, setShopOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [upg, setUpg] = useState({
    u250: false,
    u500: false,
    u1000: false,
  });

  // 🚫 remove blue highlight
  useEffect(() => {
    document.body.style.userSelect = "none";
    document.body.style.webkitTapHighlightColor = "transparent";
  }, []);

  // 📥 LOAD PLAYER
  useEffect(() => {
    loadPlayer();
  }, []);

  async function loadPlayer() {
    const { data } = await supabase
      .from("players")
      .select("*")
      .eq("id", userId)
      .single();

    if (data) {
      setScore(data.score || 0);
      setMult(data.multiplier || 1);
      setUpg(data.upgrades || {});
    } else {
      await supabase.from("players").insert({
        id: userId,
        score: 0,
        multiplier: 1,
        upgrades: {},
      });
    }

    setLoading(false);
  }

  // 💾 SAVE PLAYER
  async function savePlayer(newScore, newMult, newUpg) {
    await supabase.from("players").update({
      score: newScore,
      multiplier: newMult,
      upgrades: newUpg,
    }).eq("id", userId);
  }

  function addCoin() {
    const newScore = score + mult;
    setScore(newScore);
    savePlayer(newScore, mult, upg);
  }

  function buy(type) {
    let newScore = score;
    let newMult = mult;
    let newUpg = { ...upg };

    if (type === "u250" && score >= 250 && !upg.u250) {
      newScore -= 250;
      newMult += 2;
      newUpg.u250 = true;
    }

    if (type === "u500" && score >= 500 && !upg.u500) {
      newScore -= 500;
      newMult += 1;
      newUpg.u500 = true;
    }

    if (type === "u1000" && score >= 1000 && !upg.u1000) {
      newScore -= 1000;
      newMult += 3;
      newUpg.u1000 = true;
    }

    setScore(newScore);
    setMult(newMult);
    setUpg(newUpg);

    savePlayer(newScore, newMult, newUpg);
  }

  if (loading) {
    return (
      <div style={styles.page}>
        <h2>Loading...</h2>
      </div>
    );
  }

  // 🛒 SHOP
  if (shopOpen) {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <button onClick={() => setShopOpen(false)} style={styles.back}>
            ←
          </button>

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
        </div>
      </div>
    );
  }

  // 🎮 GAME
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
    border: "none",
    cursor: "pointer",
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

  balance: {
    position: "absolute",
    top: 10,
    right: 10,
  },

  score: {
    fontSize: 40,
    marginBottom: 20,
  },

  coin: {
    fontSize: 60,
    background: "transparent",
    border: "none",
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