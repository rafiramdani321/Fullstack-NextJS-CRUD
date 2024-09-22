import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Product } from "@prisma/client";
import { handleErrorResponse, handleSuccessReponse } from "../helpers/responses";
import { validateProductData } from "../validators/productValidator";
const prisma = new PrismaClient();

export const POST = async (request: Request) => {
  try {
    const body: Product = await request.json();

    const validatorErrors = validateProductData(body);
    if(validatorErrors?.length > 0){
      return handleErrorResponse("Validation failed", validatorErrors, 400);
    }

    const product = await prisma.product.create({
      data: {
        title: body.title,
        price: body.price,
        brandId: body.brandId
      }
    })
    
    return handleSuccessReponse(product, "Product successfully added", 201)
  } catch (error) {
    return handleErrorResponse("Internal server error", error, 500);
  }
}