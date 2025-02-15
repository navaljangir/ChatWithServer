/* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-unused-vars */
"use server";
import { SignInType, SignUpType } from "./types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import axios from "axios";

export async function loginUserService(userData: SignInType) {
  const url = new URL("/api/auth/local", process.env.BASE_URL_BACKEND);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userData }),
    });
    const res = await response.json();
    return res;
  } catch (e) {
    console.log('Errow while logging in', e);
    return {
      success: false,
      message: "Error while Signing In",
    };
  }
}

export async function registerUserService(userData: SignUpType) {
  const url = new URL("/api/auth/local/register", process.env.BASE_URL_BACKEND);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userData }),
    });
    const res = await response.json()
    return res;
  } catch (e ) {
      return e
  }
}

export default async function SignUpCall({
  username,
  email,
  password,
}: SignUpType) {
  const res = await registerUserService({ username, email, password });
  if(!res.user) {
    return {
      success: false,
      message: res.message,
    };
  }
  const cookieSet = await cookies();
  cookieSet.set("jwt", res.jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  });
  return {
    success :true,
    message : 'Signed In'
  }
}

export async function onSignInCall({ identifier, password }: SignInType) {
  const res = await loginUserService({ identifier, password });
  if (res.error) {
    console.log('yhaayta')
    return {
      success: false,
      message: res.error?.message,
    };
  }
  const cookieSet = await cookies();
  cookieSet.set("jwt", res.jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  });
  return {
    success :true,
    message : 'Signed In'
  }
}
