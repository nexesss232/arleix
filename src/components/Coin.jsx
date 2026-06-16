import coinImg from "../assets/pngwing.com.png";

export default function Coin({ onClick }) {
  return (
    <img
      src={coinImg}
      onClick={onClick}
      style={{
        width: 160,
        cursor: "pointer",
        userSelect: "none",
      }}
    />
  );
}