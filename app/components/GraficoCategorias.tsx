"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, Legend } from "recharts";

type Grafico = { name: string; value: number; }; 
export default function GraficoCategorias() { const [data, setData] = useState<Grafico[]>([]);


 useEffect(() => {
  async function load() {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const res = await fetch("/api/grafico/categorias", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        localStorage.removeItem("token");
        return;
      }

      if (!res.ok) {
        console.error("Erro ao carregar gráfico.");
        return;
      }

      const json = await res.json();

      if (Array.isArray(json)) {
        setData(json);
      }
    } catch (error) {
      console.error("Erro ao carregar gráfico:", error);
    }
  }

  load();
}, []);

  return (
    <PieChart width={400} height={300}>
      <Pie data={data} dataKey="value" nameKey="name" outerRadius={100} />

      <Tooltip />
      <Legend />
    </PieChart>
  );
}

/*"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "Alimentação",
    value: 400,
  },
  {
    name: "Transporte",
    value: 300,
  },
  {
    name: "Moradia",
    value: 800,
  },
];

export default function GraficoCategorias() {
  return (
    <PieChart width={400} height={300}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        outerRadius={100}
      />

      <Tooltip />
      <Legend />
    </PieChart>
  );
}
  */