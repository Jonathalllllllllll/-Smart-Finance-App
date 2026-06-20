"use client";

import { useState } from "react";

export default function Register() {
  
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = async () => {
    await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        senha,
      }),
    });

    alert("Enviado!");
  };

  return (
    <div>
      <h1>Cadastro</h1>

      <input
        type="email"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="senha"
        onChange={(e) => setSenha(e.target.value)}
      />

      <button onClick={handleSubmit}>
        Cadastrar
      </button>
    </div>
  );
}


