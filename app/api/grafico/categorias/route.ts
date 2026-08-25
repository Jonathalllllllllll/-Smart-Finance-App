import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const SECRET = "segredo";

type TokenPayload = {
  id: number;
  email: string;
};

export async function GET(req: Request) {
  const auth = req.headers.get("authorization");

  if (!auth) {
    return NextResponse.json(
      { error: "Sem token" },
      { status: 401 }
    );
  }

  const token = auth.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      SECRET
    ) as TokenPayload;

    const transacoes = await prisma.transacao.findMany({
      
      include: {
        categoria: true,
      },
    });

    // Agrupar por categoria
    const agrupado: Record<string, number> = {};

    transacoes.forEach((t) => {
      const nome = t.categoria.nome;

      if (!agrupado[nome]) {
        agrupado[nome] = 0;
      }

      agrupado[nome] += t.valor ?? 0;
    });

    const resultado = Object.entries(agrupado).map(
      ([name, value]) => ({
        name,
        value,
      })
    );

    return NextResponse.json(resultado);

  } catch {
    return NextResponse.json(
      { error: "Token inválido" },
      { status: 401 }
    );
  }
}

/*import prisma from "@/lib/prisma";
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
}*/