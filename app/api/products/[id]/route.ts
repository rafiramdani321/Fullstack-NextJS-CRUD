import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Product } from "@prisma/client";
const prisma = new PrismaClient();

export const DELETE = async (request: Request, {params}: {params: {id: string}}) => {
  const product = await prisma.product.delete({
    where: {
      id: Number(params.id)
    }
  });
  return NextResponse.json(product, {status: 200});
}

export const PUT = async (request: Request, {params}: {params: {id: string}}) => {
  try {
    const body: Product = await request.json();
    await prisma.product.update({
      where: {id: Number(params.id)},
      data: {
        title: body.title,
        price: body.price,
        brandId: body.brandId,
      }
    })
    return NextResponse.json({status: 200})
  } catch (error) {
    console.log(error)
  }
}