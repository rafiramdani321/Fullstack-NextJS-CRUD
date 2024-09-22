import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Product } from "@prisma/client";
import { handleErrorResponse, handleSuccessReponse } from "../../helpers/responses";
import { validateProductData } from "../../validators/productValidator";
const prisma = new PrismaClient();

export const DELETE = async (request: Request, {params}: {params: {id: string}}) => {
  const product = await prisma.product.delete({
    where: {
      id: Number(params.id)
    }
  });
  return handleSuccessReponse(product, "Product has been deleted!", 200)
}

export const PUT = async (request: Request, {params}: {params: {id: string}}) => {
  try {
    const body: Product = await request.json();

    const validatorErrors = validateProductData(body);
    if(validatorErrors?.length > 0){
      return handleErrorResponse("Validation failed", validatorErrors, 400);
    }

    const product = await prisma.product.update({
      where: {id: Number(params.id)},
      data: {
        title: body.title,
        price: body.price,
        brandId: body.brandId,
      }
    })
    return handleSuccessReponse(product, "Product updated successfully", 200)
  } catch (error) {
    return handleErrorResponse("Internal server error", error, 500)
  }
}