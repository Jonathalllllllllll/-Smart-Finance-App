"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, Legend } from "recharts";

type Grafico = { name: string; value: number; }; 
export default function GraficoGastosMeses() { const [data, setData] = useState<Grafico[]>([]);


 useEffect(() => {
  async function load() {
    const token = localStorage.getItem("token");

    const res = await fetch("/api/grafico/gastosmeses", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
