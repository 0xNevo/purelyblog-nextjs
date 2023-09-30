import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LeftSideBar from "@/components/shared/LeftSideBar";
import RightSideBar from "@/components/shared/RightSideBar";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PurelyBlog",
  description: "Blog application using NextJS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className}>
          <main className="flex flex-row min-h-screen">
            <LeftSideBar />
            <section className="flex w-full">
              <Toaster position="top-center" reverseOrder={false} />
              <div className="m-16 w-full">{children}</div>
            </section>
            <RightSideBar />
          </main>
        </body>
      </AuthProvider>
    </html>
  );
}
