"use client";

import { useEffect, useState } from "react";



export default function Dashboard() {

  type Transacao = {
  nome: string;
}; // tipando a variavel transação

const [dados, setDados] = useState<Transacao[]>([]);
  const [nome, setNome] = useState(""); // 👈 FALTAVA

  useEffect(() => {
    const token = localStorage.getItem("token");

      // 🔹CHAMA   FUNÇÃO GET

    fetch("/api/transacoes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setDados(data.transacoes); // depende do seu backend
      });
  }, []);




  const adicionar = async () => {
    const token = localStorage.getItem("token");
console.log(token);
  // 🔹 CHAMA FUNÇÃO POST


    await fetch("/api/transacoes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ nome }),
    });
    

    // atualiza tela sem recarregar
    setDados([...dados, { nome }]);
    setNome(""); // limpa input
  };


const deletar = async (nome: string) => {
  const token = localStorage.getItem("token");

  await fetch("/api/transacoes", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ nome }),
  });

  // atualiza tela
  setDados(dados.filter(item => item.nome !== nome));
};


const editar = async (nomeAntigo: string, novoNome: string) => {
  const token = localStorage.getItem("token");

  await fetch("/api/transacoes", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ nomeAntigo, novoNome }),
  });

  setDados(dados.map(item =>
    item.nome === nomeAntigo ? { nome: novoNome } : item
  ));
};


  return (
    <div>
      <h1>Dashboard</h1>

      {dados.map((item, i) => (
        <div key={i}>
          <p>{item.nome}</p>
                <button onClick={() => deletar(item.nome)}>Excluir</button>

                <button
  onClick={() => {
    const novoNome = prompt("Novo nome");

    if (novoNome) {
      editar(item.nome, novoNome);
    }
  }}
>
  Editar2
</button>
        </div>

        
      ))}

      <input
        type="text"
        placeholder="Nova transação"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <button onClick={adicionar}>Adicionar</button>


    </div>
  );
}