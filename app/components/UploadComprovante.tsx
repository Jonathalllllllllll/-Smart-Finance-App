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


    try {
    const res = await fetch("/api/comprovante", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      alert(
        data.erro ||
        "Não foi possível processar o comprovante."
      );

      console.error(data);

      return;
    }

    alert("Comprovante processado com sucesso!");

    console.log(data);

  } catch (error) {
    console.error("Erro ao enviar comprovante:", error);

    alert(
      "Não foi possível processar o comprovante."
    );
  }


  /*
  const res = await fetch("/api/comprovante", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

console.log(data);

alert(JSON.stringify(data));
*/
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