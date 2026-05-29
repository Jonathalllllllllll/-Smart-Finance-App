export async function GET() {
  return Response.json({ msg: "API funcionando" });
}

export async function POST(req: Request) {
  const body = await req.json();

  console.log(body);

  return Response.json({ ok: true });
}