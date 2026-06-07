"use client";

import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    alert("Enviado!");
  };
  

  return (
    <div>
      <h1>Cadastro</h1>

      <input
        type="text"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={handleSubmit}>Cadastrar</button>
    </div>
  );
}