import prisma from "@/lib/prisma";

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

  const user = await prisma.user.create({
    data: {
      email: body.email,
    },
  });

  return Response.json(user);
}