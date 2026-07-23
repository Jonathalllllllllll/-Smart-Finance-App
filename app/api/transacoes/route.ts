import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";

const SECRET = "segredo";

type TokenPayload = {
  id: number;
  email: string;
};

// GET
export async function GET(req: Request) {
  const auth = req.headers.get("authorization");

  if (!auth) {
    return Response.json({ error: "Sem token" }, { status: 401 });
  }

  const token = auth.split(" ")[1];

  try {
const decoded = jwt.verify(
      token,
      SECRET
    ) as TokenPayload;
    
const transacoes = await prisma.transacao.findMany({
  where: {
    userId: decoded.id,
  },
  include: {
    categoria: true,
  },
});
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
    type TokenPayload = {
  id: number;
  email: string;
};

const decoded = jwt.verify(token, SECRET) as TokenPayload;

const transacao = await prisma.transacao.create({
  data: {
    nome: body.nome,
    userId: decoded.id,
    valor: body.valor,
    categoriaId: body.categoriaId,
    data: new Date(body.data),


  },
  include: {
    categoria: true,
  },
});

   

    return Response.json(transacao);

  } catch {
    return Response.json({ error: "Token inválido" }, { status: 401 });
  }
}


// DELETE
export async function DELETE(req: Request) {
  const auth = req.headers.get("authorization");

  if (!auth) {
    return Response.json(
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

    const body = await req.json();

    const transacao = await prisma.transacao.findUnique({
      where: {
        id: body.id,
      },
    });

    if (!transacao) {
      return Response.json(
        { error: "Transação não encontrada" },
        { status: 404 }
      );
    }

    if (transacao.userId !== decoded.id) {
      return Response.json(
        { error: "Acesso negado" },
        { status: 403 }
      );
    }

    await prisma.transacao.delete({
      where: {
        id: body.id,
      },
    });

    return Response.json({
      ok: true,
    });
  } catch {
    return Response.json(
      { error: "Token inválido" },
      { status: 401 }
    );
  }
}


// PUT
export async function PUT(req: Request) {
  const auth = req.headers.get("authorization");

  if (!auth) {
    return Response.json(
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

    const body = await req.json();

    const transacao = await prisma.transacao.findUnique({
      where: {
        id: body.id,
      },
    });

    if (!transacao) {
      return Response.json(
        { error: "Transação não encontrada" },
        { status: 404 }
      );
    }

    if (transacao.userId !== decoded.id) {
      return Response.json(
        { error: "Acesso negado" },
        { status: 403 }
      );
    }

    const atualizada = await prisma.transacao.update({
      where: {
        id: body.id,
      },
      data: {
        nome: body.novoNome,
      },
    });

    return Response.json(atualizada);

  } catch {
    return Response.json(
      { error: "Token inválido" },
      { status: 401 }
    );
  }
}