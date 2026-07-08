import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const userId = 1;

  const transacoes = await prisma.transacao.findMany({
    where: {
      userId,
    },
    include: {
      categoria: true,
    },
  });

  const agrupado: Record<
    string,
    {
      soma: number;
      quantidade: number;
    }
  > = {};

  transacoes.forEach((t) => {
    const nome = t.categoria.nome;

    if (!agrupado[nome]) {
      agrupado[nome] = {
        soma: 0,
        quantidade: 0,
      };
    }

    agrupado[nome].soma += t.valor ?? 0;
    agrupado[nome].quantidade++;
  });

  const resultado = Object.entries(agrupado).map(
    ([name, dados]) => ({
      name,
      value: dados.soma / dados.quantidade,
    })
  );

  return NextResponse.json(resultado);
}