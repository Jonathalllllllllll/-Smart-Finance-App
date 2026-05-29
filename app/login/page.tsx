"use client";

import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");

  const handleLogin = async () => {
    console.log("clicou");

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
console.log(data);

    localStorage.setItem("token", data.token);

    alert("Login feito!");
  };

  return (
    <div>
      <h1>Login</h1>

      <input
        type="text"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={handleLogin}>Entrar</button>
      
    </div>
  );
}