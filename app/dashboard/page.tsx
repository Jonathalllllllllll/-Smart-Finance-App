"use client";

import { useEffect, useState } from "react";
import GraficoCategorias from "../components/GraficoCategorias";
import GraficoMedia from "../components/GraficoMedia";
import GraficoGastosMeses from "../components/GraficoGastosMeses";
import UploadComprovante from "../components/UploadComprovante";

type Transacao = {
  id: number;
  nome: string;
  valor: number;
  data: string;

  categoria: {
    id: number;
    nome: string;
  };
};

export default function Dashboard() {
  const [dados, setDados] = useState<Transacao[]>([]);
  const [nome, setNome] = useState("");
  const [categoriaId, setCategoriaId] = useState(1);
const [valor, setValor] = useState<number>(0);
const [data, setData] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("/api/transacoes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setDados(data.transacoes);
      });
  }, []);

  const adicionar = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("/api/transacoes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        nome,
        categoriaId,
        valor,//obs: incluir para na API post transacoes ele recebr a avriavel valor
        data
      }),
    });

    const novaTransacao = await res.json();

    setDados([...dados, novaTransacao]);

    setNome("");
    setData("");
  };

  const deletar = async (id: number) => {
    const token = localStorage.getItem("token");

    await fetch("/api/transacoes", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });

    setDados(
      dados.filter((item) => item.id !== id)
    );
  };

  const editar = async (
    id: number,
    novoNome: string
  ) => {
    const token = localStorage.getItem("token");

    await fetch("/api/transacoes", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id,
        novoNome,
      }),
    });

    setDados(
      dados.map((item) =>
        item.id === id
          ? { ...item, nome: novoNome }
          : item
      )
    );
  };

  return (
  <main className="container">
    <h1>💰 Controle Financeiro Inteligente</h1>

    <div className="card">
      <h2>Nova Transação</h2>

      <div className="grid grid-2">
        <input
          type="text"
          placeholder="Nome da transação"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <select
          value={categoriaId}
          onChange={(e) =>
            setCategoriaId(Number(e.target.value))
          }
        >
          <option value="1">Alimentação</option>
          <option value="2">Transporte</option>
          <option value="3">Moradia</option>
          <option value="4">Investimentos</option>
          <option value="5">Lazer</option>
        </select>

        <input
          type="number"
          placeholder="Valor"
          value={valor}
          onChange={(e) =>
            setValor(Number(e.target.value))
          }
        />

        <input
          type="date"
          value={data}
          onChange={(e) =>
            setData(e.target.value)
          }
        />
      </div>

      <button
        style={{ marginTop: 20 }}
        onClick={adicionar}
      >
        Adicionar Transação
      </button>
    </div>

    <div className="card">
      <h2>Transações</h2>

      {dados.length === 0 && (
        <p>Nenhuma transação cadastrada.</p>
      )}

      {dados.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "15px 0",
            borderBottom: "1px solid #ddd",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <div>
            <strong>{item.nome}</strong>

            <br />

            <span className="valor">
              R$ {item.valor.toFixed(2)}
            </span>

            {" • "}

            {item.categoria?.nome}

            {" • "}

            {new Date(item.data).toLocaleDateString(
              "pt-BR"
            )}
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <button
              className="editar"
              onClick={() => {
                const novoNome =
                  prompt("Novo nome");

                if (novoNome)
                  editar(item.id, novoNome);
              }}
            >
              Editar
            </button>

            <button
              className="excluir"
              onClick={() => deletar(item.id)}
            >
              Excluir
            </button>
          </div>
        </div>
      ))}
    </div>

    <div className="grid grid-2">

      <div className="card">
        <h2>Gastos por Categoria</h2>

        <GraficoCategorias />
      </div>

      <div className="card">
        <h2>Média por Categoria</h2>

        <GraficoMedia />
      </div>

    </div>

    <div className="card">
      <h2>Distribuição dos Gastos por Mês</h2>

      <GraficoGastosMeses />
    </div>

    <div className="card">
      <h2>
        Total Gasto
      </h2>

      <h1
        style={{
          color: "#2E7C68",
        }}
      >
        R$
        {" "}
        {dados
          .reduce(
            (acc, item) =>
              acc + (item.valor ?? 0),
            0
          )
          .toFixed(2)}
      </h1>
    </div>

    <div className="card">
      <UploadComprovante />
    </div>
  </main>
);
}
