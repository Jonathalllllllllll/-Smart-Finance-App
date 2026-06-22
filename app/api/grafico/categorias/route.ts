import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const userId = 1; // depois você troca pelo usuário logado

  const transacoes = await prisma.transacao.findMany({
    where: { userId },
    include: {
      categoria: true,
    },
  });

  // agrupar por categoria
  const agrupado: Record<string, number> = {};

  transacoes.forEach((t) => {
    const nome = t.categoria.nome;

    if (!agrupado[nome]) {
      agrupado[nome] = 0;
    }

    agrupado[nome] += t.valor ?? 0;
  });

  const resultado = Object.entries(agrupado).map(([name, value]) => ({
    name,
    value,
  }));

  return NextResponse.json(resultado);
}