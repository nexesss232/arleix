import { useState } from "react";
import coinImg from "../assets/pngwing.com.png";

export default function Coin({ onClick }) {
  const [anim, setAnim] = useState(false);

  function handleClick() {
    setAnim(true);
    setTimeout(() => setAnim(false), 100);

    onClick();
  }

  return (
    <img
      src={coinImg}
      onClick={handleClick}
      style={{
        width: 160,
        cursor: "pointer",
        transform: anim ? "scale(1.2)" : "scale(1)",
        transition: "0.1s",
      }}
    />
  );
}