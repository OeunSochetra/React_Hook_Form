import HookForm from "@/components/HookForm";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <HookForm />
    </>
  );
}
