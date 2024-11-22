import React, {CSSProperties, useState} from "react";
import {api} from "../tools";

export const Home = () => {
  const [msg, setMsg] = useState("");

  const onSubmit = () => api.ping.$get().then(async resp => {
    if (resp.ok) {
      const data = await resp.text();
      setMsg(data);
    }
  });

  return (
    <div style={styles.container}>
      <img src={'/header.png'} alt="vite-react-hono-bun"/>
      <h1 style={styles.text}>Welcome!</h1>
      <h3 style={styles.text}>This is just a litte placeholder. Replace it with your amazing content!</h3>

      <p>Ping ... {msg}</p>
      <button onClick={() => onSubmit()}>Call the API</button>
    </div>
  );
};

const styles: { [_: string]: CSSProperties } = {
  container: {
    position: "fixed",
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
    fontFamily: "Verdana, sans-serif",
    overflow: "auto",
  },
  text: {
    margin: 0,
    padding: 0,
  }
};