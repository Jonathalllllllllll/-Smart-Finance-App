
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const imagem = formData.get("imagem");

    if (!(imagem instanceof File)) {
      return NextResponse.json(
        { erro: "Nenhuma imagem enviada" },
        { status: 400 }
      );
    }

    // ==============================
    // 1. Enviar imagem para OCR.space
    // ==============================

    const ocrForm = new FormData();

    ocrForm.append("file", imagem);
    ocrForm.append("language", "por");
    ocrForm.append("isOverlayRequired", "false");
    ocrForm.append("OCREngine", "2");
    ocrForm.append("scale", "true");
    ocrForm.append("detectOrientation", "true");

    const ocrResponse = await fetch(
      "https://api.ocr.space/parse/image",
      {
        method: "POST",
        headers: {
          apikey: process.env.OCR_SPACE_API_KEY || "",
        },
        body: ocrForm,
      }
    );

    if (!ocrResponse.ok) {
      const erroOcr = await ocrResponse.text();

      console.error(
        "Erro HTTP OCR.space:",
        erroOcr
      );

      return NextResponse.json(
        {
          erro: "Erro ao acessar serviço de OCR",
        },
        { status: 502 }
      );
    }

    const ocrData = await ocrResponse.json();

    console.log(
      "Resposta OCR:",
      JSON.stringify(ocrData, null, 2)
    );

    // ==============================
    // 2. Verificar resultado do OCR
    // ==============================

    if (ocrData.IsErroredOnProcessing) {
      console.error(
        "OCR retornou erro:",
        ocrData.ErrorMessage
      );

      return NextResponse.json(
        {
          erro: "Não foi possível ler a imagem",
          detalhe: ocrData.ErrorMessage,
        },
        { status: 422 }
      );
    }

    const texto =
      ocrData.ParsedResults
        ?.map(
          (resultado: { ParsedText?: string }) =>
            resultado.ParsedText || ""
        )
        .join("\n") || "";

    if (!texto.trim()) {
      return NextResponse.json(
        {
          erro: "Nenhum texto foi encontrado na imagem",
        },
        { status: 422 }
      );
    }

    // ==============================
    // 3. Extrair estabelecimento
    // ==============================

    const estabelecimento = texto
      .split("\n")
      .find(
        (linha: string) =>
          linha.trim() !== ""
      )
      ?.trim() || "Comprovante";

    // ==============================
    // 4. Extrair valor
    // ==============================

    const valorEncontrado = texto.match(
      /\d{1,3}(?:\.\d{3})*,\d{2}|\d+,\d{2}/
    );

    let valor = 0;

    if (valorEncontrado) {
      valor = parseFloat(
        valorEncontrado[0]
          .replace(/\./g, "")
          .replace(",", ".")
      );
    }

    // ==============================
    // 5. Extrair data
    // ==============================

    const dataEncontrada = texto.match(
      /\d{2}\/\d{2}\/\d{4}/
    );

    const dataCupom = dataEncontrada
      ? dataEncontrada[0]
      : null;

    // ==============================
    // 6. Salvar no PostgreSQL
    // ==============================

    const transacao =
      await prisma.transacao.create({
        data: {
          nome: estabelecimento,
          valor,
          categoriaId: 1,

          // Temporariamente mantendo
          // seu usuário 1
          userId: 1,
        },

        include: {
          categoria: true,
        },
      });

    // ==============================
    // 7. Retornar resultado
    // ==============================

    return NextResponse.json({
      sucesso: true,
      texto,
      estabelecimento,
      valor,
      dataCupom,
      transacao,
    });

  } catch (error) {
    console.error(
      "ERRO API COMPROVANTE:",
      error
    );

    return NextResponse.json(
      {
        erro: "Erro interno ao processar comprovante",
        detalhe:
          error instanceof Error
            ? error.message
            : String(error),
      },
      { status: 500 }
    );
  }
}
/*

// do dia 11/08
import { NextResponse } from "next/server";
//import tesseract from "node-tesseract-ocr";
//import { writeFile } from "fs/promises";
//import path from "path";
//import os from "os";
import prisma from "@/lib/prisma";



export async function POST(req: Request) {

 try {
  
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

  } catch (error) {
    console.error("ERRO API COMPROVANTE:", error);

    return NextResponse.json(
      {
        erro: "Erro ao processar comprovante",
        detalhe:
          error instanceof Error
            ? error.message
            : String(error),
      },
      { status: 500 }
    );
  }

  
}
  */