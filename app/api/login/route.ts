import jwt from "jsonwebtoken";

const SECRET = "segredo"; // depois melhora isso

export async function POST(req: Request) {
  const { email } = await req.json();

  // aqui depois vai validar no banco
  if (!email) {
    return Response.json({ error: "Email obrigatório" }, { status: 400 });
  }

  const token = jwt.sign({ email }, SECRET, {
    expiresIn: "1h",
  });

  return Response.json({ token });
}