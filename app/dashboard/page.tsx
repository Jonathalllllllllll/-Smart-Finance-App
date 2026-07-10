"use client";

import { useEffect, useState } from "react";
import GraficoCategorias from "../components/GraficoCategorias";
import GraficoMedia from "../components/GraficoMedia";


type Transacao = {
  id: number;
  nome: string;
  valor: number;

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
      }),
    });

    const novaTransacao = await res.json();

    setDados([...dados, novaTransacao]);

    setNome("");
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
    <div>
      <h1>Dashboard</h1>

      {dados.map((item) => (
        <div key={item.id}>
          <p>
  {item.nome} -
  R$ {item.valor} -
  {item.categoria?.nome}
</p>

          <button
            onClick={() => deletar(item.id)}
          >
            Excluir
          </button>

          <button
            onClick={() => {
              const novoNome =
                prompt("Novo nome");

              if (novoNome) {
                editar(item.id, novoNome);
              }
            }}
          >
            Editar
          </button>
        </div>
      ))}

      <br />

      <input
        type="text"
        placeholder="Nova transação"
        value={nome}
        onChange={(e) =>
          setNome(e.target.value)
        }
      />

      <br />
      <br />

      <select
        value={categoriaId}
        onChange={(e) =>
          setCategoriaId(
            Number(e.target.value)
          )
        }
      >
        <option value="1">
          Alimentação
        </option>

        <option value="2">
          Transporte
        </option>

        <option value="3">
          Moradia
        </option>

        <option value="4">
          Investimentos
        </option>

        <option value="5">
          Lazer
        </option>
      </select>

      <br />
      <br />

      <input
  type="number"
  placeholder="Valor"
  value={valor}
        onChange={(e) =>
          setValor(
            Number(e.target.value)
          )
        }
/>

      <button onClick={adicionar}>
        Adicionar
      </button>


<hr />

<h2>Gastos por Categoria</h2>

<GraficoCategorias />

<hr />

<h2>Média por Categoria</h2>

<GraficoMedia />    </div>
  );
}

/*

export default function Dashboard() {

 type Transacao = {
  id: number;
  nome: string;

  categoria: {
    id: number;
    nome: string;
  };
}; // tipando a variavel transação

const [dados, setDados] = useState<Transacao[]>([]);
  const [nome, setNome] = useState(""); // 👈 FALTAVA

  useEffect(() => {
    const token = localStorage.getItem("token");
    const [categoriaId, setCategoriaId] = useState(1);
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


    const res = await fetch("/api/transacoes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    body: JSON.stringify({
      nome,
      categoriaId,
    }),    
});
    

    // atualiza tela sem recarregar
    const novaTransacao = await res.json();
    setDados([...dados, novaTransacao]);
    setNome(""); // limpa input
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

  setDados(dados.filter(item => item.id !== id));
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
    dados.map(item =>
      item.id === id
        ? { ...item, nome: novoNome }
        : item
    )
  );
};


  return (
    <div>
      <h1>Dashboard</h1>

      {dados.map((item, i) => (
        <div key={i}>
          <p>{item.nome}</p>
                <button onClick={() => deletar(item.id)}>Excluir</button>

                <button
  onClick={() => {
    const novoNome = prompt("Novo nome");

    if (novoNome) {
      editar(item.id, novoNome);
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



<select>
  <option value="1">Alimentação</option>
  <option value="2">Transporte</option>
  <option value="3">Moradia</option>
  <option value="4">Investimentos</option>
  <option value="5">Lazer</option>


</select>
    </div>

    
  );
  
}
  */
