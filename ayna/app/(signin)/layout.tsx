import { ReactNode } from "react";

export default function SigninLayout({children} : {children: ReactNode}){
    return <div className="h-screen">
        {children}
    </div>
}