import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";

const SECRET = "segredo";


// GET
export async function GET(req: Request) {
  const auth = req.headers.get("authorization");

  if (!auth) {
    return Response.json({ error: "Sem token" }, { status: 401 });
  }

  const token = auth.split(" ")[1];

  try {
    jwt.verify(token, SECRET);

    const transacoes = await prisma.transacao.findMany();

    return Response.json({
      transacoes,
    });

  } catch {
    return Response.json({ error: "Token inválido" }, { status: 401 });
  }
}


// POST
export async function POST(req: Request) {
  const auth = req.headers.get("authorization");

  if (!auth) {
    return Response.json({ error: "Sem token" }, { status: 401 });
  }

  const token = auth.split(" ")[1];

  try {
    jwt.verify(token, SECRET);

    const body = await req.json();

    const transacao = await prisma.transacao.create({
      data: {
        nome: body.nome,
      },
    });

    return Response.json(transacao);

  } catch {
    return Response.json({ error: "Token inválido" }, { status: 401 });
  }
}


// DELETE
export async function DELETE(req: Request) {
  const body = await req.json();

  console.log("deletar:", body.nome);

  return Response.json({ ok: true });
}


// PUT
export async function PUT(req: Request) {
  const body = await req.json();

  console.log("editar:", body);

  return Response.json({ ok: true });
}