import { NextRequest, NextResponse } from "next/server";
import { getUserMeLoader } from "./app/lib/actions/validate-user";

export const config = {
  matcher: ["/dashboard", "/chat", "/signin", "/signup"],
};

export default async function middleware(request: NextRequest) {
  const token = request.cookies.get("jwt");
  const isAuthPage = ["/signin", "/signup"].includes(request.nextUrl.pathname);

  if (!token?.value) {
    if (isAuthPage) return NextResponse.next();
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/signin`);
  }

  const user = await getUserMeLoader();
  if (!user.ok) {
    if (isAuthPage) return NextResponse.next();
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/signin`);
  }

  if (isAuthPage) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`);
  }

  return NextResponse.next();
}
