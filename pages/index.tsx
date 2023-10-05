import HookForm from "@/components/HookForm";
import { Inter } from "next/font/google";
import TableUi from "@/components/Table";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      {/* <HookForm /> */}
      <TableUi />
    </>
  );
}
