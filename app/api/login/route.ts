import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

const SECRET = "segredo";

export async function POST(req: Request) {
  const { email } = await req.json();

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

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    SECRET,
    { expiresIn: "1h" }
  );
console.log(user);
  return Response.json({ token });
}