import { NextResponse } from "next/server";
import tesseract from "node-tesseract-ocr";
import { writeFile } from "fs/promises";
import path from "path";
import os from "os";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const formData = await req.formData();

  const imagem = formData.get("imagem") as File;

  if (!imagem) {
    return NextResponse.json(
      { erro: "Nenhuma imagem enviada" },
      { status: 400 }
    );
  }

  const bytes = await imagem.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const nomeArquivo = `comprovante-${Date.now()}.png`;

  const caminho = path.join(
    os.tmpdir(),
    nomeArquivo
  );

  await writeFile(caminho, buffer);

  const config = {
    lang: "por",
  };

  const texto = await tesseract.recognize(
    caminho,
    config
  );

  const estabelecimento = texto
    .split("\n")
    .find((linha) => linha.trim() !== "")
    ?.trim();

  const valorEncontrado =
    texto.match(/\d+,\d{2}/);

  const valor = valorEncontrado
    ? parseFloat(
        valorEncontrado[0].replace(",", ".")
      )
    : 0;

  const dataEncontrada =
    texto.match(/\d{2}\/\d{2}\/\d{4}/);

  const dataCupom = dataEncontrada
    ? dataEncontrada[0]
    : null;

  const transacao =
    await prisma.transacao.create({
      data: {
        nome:
          estabelecimento || "Comprovante",

        valor,

        categoriaId: 1,

        userId: 1,
      },

      include: {
        categoria: true,
      },
    });

  return NextResponse.json({
    sucesso: true,

    texto,

    estabelecimento,

    valor,

    dataCupom,

    transacao,
  });
}