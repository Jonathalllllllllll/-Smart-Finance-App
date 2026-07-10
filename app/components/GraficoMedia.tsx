"use client";

import { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type Media = {
  name: string;
  value: number;
};

export default function GraficoMedia() {
  const [data, setData] = useState<Media[]>([]);

  useEffect(() => {
    fetch("/api/grafico/media")
      .then((res) => res.json())
      .then((dados) => {
        setData(dados);
      });
  }, []);

  return (
    <BarChart
      width={500}
      height={300}
      data={data}
    >
      <CartesianGrid strokeDasharray="3 3" />

      <XAxis dataKey="name" />

      <YAxis />

      <Tooltip />

      <Bar dataKey="value" />
    </BarChart>
  );
}