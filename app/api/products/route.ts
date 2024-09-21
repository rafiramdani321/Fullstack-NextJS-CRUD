import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Product } from "@prisma/client";
import { handleErrorResponse, handleSuccessReponse } from "../helpers/responses";
import { validateProductData } from "../validators/productValidator";
import { ValidationError } from "../validators/validationError";
const prisma = new PrismaClient();

export const POST = async (request: Request) => {
  try {
    const body: Product = await request.json();
    
    validateProductData(body)
    
    const product = await prisma.product.create({
      data: {
        title: body.title,
        price: body.price,
        brandId: body.brandId
      }
    })
    return handleSuccessReponse(product, "Product successfully added", 201)
  } catch (error) {
    if(error instanceof ValidationError){
      return handleErrorResponse("Validation failed", error.errors, 400)
    }
    return handleErrorResponse("Product creation failed", error, 500)
  }
}