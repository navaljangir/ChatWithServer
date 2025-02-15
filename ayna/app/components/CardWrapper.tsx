import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { ReactNode } from "react";
import { motion } from "motion/react";

interface CardWrapperType {
  title: string;
  label: string;
  children: ReactNode;
  href: string;
  hrefLabel: string;
}
export function CardWrapper({
  title,
  label,
  children,
  href,
  hrefLabel,
}: CardWrapperType) {
  return (
    <motion.div
    initial ={{
        y : 40
    }}
    animate={{
        y : 0
    }}
    transition={{
        duration : 0.1
    }}
    >
      <Card className="lg:px-5 py-4 w-[350px] md:w-[500px] shadow-[0px_0px_100px_50px_rgba(0,0,0,0.1)] dark:shadow-[0px_0px_100px_50px_rgba(255,255,255,0.1)]" >
        <CardHeader className="flex flex-col ">
          <Link href={"/"} className="left-0">
            ← <span className="underline">Home</span>
          </Link>
          <CardTitle className="items-center flex flex-col">
            <span className="text-3xl">{title}</span>
            <span>{label}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Link
            href={href}
            className="flex justify-center w-full hover:underline"
          >
            {hrefLabel}
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
