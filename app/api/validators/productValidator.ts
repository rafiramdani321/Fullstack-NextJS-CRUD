import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface ProductData {
  id: number;
  title: string;
  price: number;
  brandId: number
}

export const validateProductData = (data: ProductData) => {
  const errors: string[] = [];

  if(!data.title || data.title.trim() === ''){
    errors.push('Title is required!')
  }
  if(data.price === undefined || data.price <= 0){
    errors.push("Price is required and must be greater than 0!")
  }
  if(data.brandId === undefined || data.brandId <= 0){
    errors.push("Brand is required")
  }

  return errors;
}