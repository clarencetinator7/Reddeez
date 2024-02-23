import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");

  if (token && request.url.includes("/login")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
