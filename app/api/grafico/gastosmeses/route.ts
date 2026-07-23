import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const userId = 1; // depois você troca pelo usuário logado

  const transacoes = await prisma.transacao.findMany({
    where: { userId },
   
  });

  // agrupar por categoria

  transacoes.forEach((t) => {

    const meses = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez"
];
const mes = meses[
    new Date(t.data).getMonth()
];

const agrupado: Record<
string,
number
> = {};


    if(!agrupado[mes]){

        agrupado[mes]=0;

    }

    agrupado[mes]+=t.valor ?? 0;

 const resultado =
Object.entries(agrupado)
.map(([name,value])=>({

    name,
    value

}));

  return NextResponse.json(resultado);

});
}