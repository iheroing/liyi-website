import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = "/poetry-dice/";
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: "/poetry-dice",
};
