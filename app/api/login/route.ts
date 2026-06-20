import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const SECRET = "segredo";

export async function POST(req: Request) {
  const { email, senha } = await req.json();

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return Response.json(
      { error: "Usuário não encontrado" },
      { status: 404 }
    );
  }

  const senhaValida = await bcrypt.compare(
    senha,
    user.password
  );

  if (!senhaValida) {
    return Response.json(
      { error: "Senha inválida" },
      { status: 401 }
    );
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    SECRET,
    { expiresIn: "1h" }
  );

  return Response.json({ token });
}