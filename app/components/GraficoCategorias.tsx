"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function GraficoCategorias() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/grafico/categorias");
      const json = await res.json();
      setData(json);
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