export default function Shop({ score, buy, close, upg }) {
  return (
    <div style={styles.page}>
      <button onClick={close} style={styles.back}>←</button>

      <h2>Shop</h2>

      <div>🪙 {score}</div>

      {!upg[250] && (
        <button onClick={() => buy("250")}>+2 click — 250</button>
      )}

      {!upg[500] && (
        <button onClick={() => buy("500")}>+1 click — 500</button>
      )}

      {!upg[1000] && (
        <button onClick={() => buy("1000")}>+3 click — 1000</button>
      )}
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "#111",
    color: "white",
  },
  back: {
    position: "absolute",
    top: 10,
    left: 10,
  },
};