export default function Coin({ onClick, skin }) {
  return (
    <div
      onClick={onClick}
      style={{
        width: 170,
        height: 170,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${skin.color}, #000)`,
        boxShadow: `0 0 40px ${skin.color}`,
        cursor: "pointer",
        transition: "0.1s",
      }}
    />
  );
}