import { NextResponse } from "next/server";

export const handleSuccessReponse = (data: any = null, message: string, statusCode: number = 200) => {
  return NextResponse.json({ data, status: "success", message }, { status: statusCode });
};

export const handleErrorResponse = (message: string, errorDetail: any = null, statusCode: number = 500) => {
  return NextResponse.json({ message, status: "error", errorDetail }, { status: statusCode });
};