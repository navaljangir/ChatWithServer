'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { ThemeToggler } from "./Themetoggler"
import axios from "axios"
import { useAuthStore } from "@/app/lib/store/authStore"

export function AuthBar(){
    const router= useRouter()
    const {userId , setUser}= useAuthStore()
    const onLogoutHandle = async()=>{
        console.log(process.env.BASE_URL)
        await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/logout`)
        setUser(null)
        router.push('/')
    }
    return <div className="flex items-center gap-4">
         <ThemeToggler/>
        {!userId? 
            // Logged in
            <div className="flex gap-2">
                
                <Button className="dark:bg-blue-600 font-semibold" onClick={()=>{
                    router.push('/signin')
                }}>
                    Login
                </Button>
                <Button className="font-semibold" onClick={()=>{
                    router.push('/signup')
                }}>
                    Signup
                </Button>
            </div> : <Button onClick={()=> onLogoutHandle()}>
                    Logout
                    </Button>}
    </div>
}