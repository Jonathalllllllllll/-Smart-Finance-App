import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();

  const imagem = formData.get("imagem") as File;

  if (!imagem) {
    return NextResponse.json(
      {
        erro: "Nenhuma imagem enviada",
      },
      {
        status: 400,
      }
    );
  }

  console.log(imagem.name);
  console.log(imagem.type);
  console.log(imagem.size);

  return NextResponse.json({
    mensagem: "Imagem recebida com sucesso!",
  });
}