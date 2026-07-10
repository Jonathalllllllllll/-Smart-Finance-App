"use client";

import { useState } from "react";

export default function UploadComprovante() {
  const [arquivo, setArquivo] = useState<File | null>(null);

  async function enviarImagem() {
    if (!arquivo) {
      alert("Selecione uma imagem.");
      return;
    }

    const formData = new FormData();
    formData.append("imagem", arquivo);

    const res = await fetch("/api/comprovante", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    console.log(data);

    alert(data.mensagem);
  }

  return (
    <div>
      <h2>Adicionar comprovante</h2>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files) {
            setArquivo(e.target.files[0]);
          }
        }}
      />

      <br />
      <br />

      <button onClick={enviarImagem}>
        Enviar comprovante
      </button>
    </div>
  );
}