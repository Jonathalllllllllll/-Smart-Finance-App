import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const body = await req.json();

  const existe = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (existe) {
    return Response.json(
      { error: "Email já cadastrado" },
      { status: 400 }
    );
  }

  const hash = await bcrypt.hash(
    body.senha,
    10
  );

  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: hash,
    },
  });

  return Response.json(user);
}