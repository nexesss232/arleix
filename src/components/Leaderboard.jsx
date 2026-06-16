export default function Leaderboard() {
  const fake = [
    { name: "Andrii", score: 12000 },
    { name: "Player2", score: 8000 },
    { name: "Guest", score: 4000 },
  ];

  return (
    <div style={styles.box}>
      <h3>Leaderboard</h3>

      {fake.map((p, i) => (
        <div key={i} style={styles.row}>
          <span>{p.name}</span>
          <span>{p.score}</span>
        </div>
      ))}
    </div>
  );
}

const styles = {
  box: {
    position: "absolute",
    right: 20,
    bottom: 20,
    background: "#111827",
    padding: 15,
    borderRadius: 10,
    color: "white",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    width: 150,
  },
};