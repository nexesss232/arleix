export default function Shop({ items, buy, close }) {
  return (
    <div style={styles.shop}>
      <button onClick={close} style={styles.close}>←</button>

      {items.map((i) => (
        <button key={i.id} style={styles.item} onClick={() => buy(i)}>
          <span>{i.name}</span>
          <span>{i.price} 💰</span>
        </button>
      ))}
    </div>
  );
}

const styles = {
  shop: {
    position: "absolute",
    inset: 0,
    background: "#0b1220",
    padding: 20,
    zIndex: 20,
  },
  item: {
    width: "100%",
    marginTop: 10,
    padding: 15,
    background: "#111827",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
  },
  close: {
    fontSize: 26,
    background: "none",
    border: "none",
    color: "white",
  },
};