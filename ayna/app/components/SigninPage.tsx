"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {  useForm } from "react-hook-form";
import { CardWrapper } from "./CardWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "../lib/actions/signup/schema";
import { SignInType } from "../lib/actions/signup/types";
import { toast } from "sonner";
import { onSignInCall } from "../lib/actions/signup/signup";
import { useState } from "react";
import { useRouter } from "next/navigation";



export default function SigninPage() {
  const [isPending , setIsPending] = useState(false);
  const router= useRouter()
  const onSubmit=  async(values : SignInType)=>{
    setIsPending(true)
    const signInToast = toast.loading('Signing In...')
    const res = await onSignInCall({identifier  : values.identifier , password : values.password})
    console.log('res from signin' , res)
    if (!res?.success) {
      toast.error(res?.message, {
          duration: 2000,
          id : signInToast
      })
      setIsPending(false)
      return
  }
  toast.success('Signed In' , {
      duration : 2000,
      id : signInToast
  })
  setIsPending(false)
  router.push('/dashboard')
  }
  const form = useForm<SignInType>({
    resolver : zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: '',
    }
  });
  return (
    <CardWrapper title="Login" label="Login to get Access" href="/signup" hrefLabel="Create an Account? Signup">
      <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                    name="identifier"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Enter your Email/Username" type="text" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                >
                </FormField>
                <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="*******" type="password" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                >
                </FormField>
                <Button type="submit" variant='default' className="w-full" disabled={isPending}>
                    Login
                </Button>
            </form>
        </Form>
        </CardWrapper>
  );
}
