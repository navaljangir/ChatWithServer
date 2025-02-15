'use server'
import { cookies } from "next/headers";

const cookie = await cookies()
export const getToken = cookie.get('jwt')?.value;