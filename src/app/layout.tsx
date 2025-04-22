import "@/utils/fontAwsomeLibrary";
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar"; //=> @/ repersent the src/
import { outfit } from "@/utils/font";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import Footer from "@/components/Footer";
import AppContextProvider from "@/context/AppContext";
import { SessionProviderWrapper } from "@/context/SessionProviderWrapper";
import { getAuthContext } from "@/library/action";
import { AuthContextProvider } from "@/context/AuthContext";
import { ToastContainer } from "react-toastify";
config.autoAddCss = false;


export const metadata: Metadata = {
  title: "Make your appointment to your dotor",
  description: "A healthcare management system",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const baseContaxt = await getAuthContext();

  return (
    <html lang="en">
      <body className={`${outfit.className}  antialiased relative`}>
        <ToastContainer />
        <AuthContextProvider value={baseContaxt}>
        <SessionProviderWrapper>
        <Navbar />
        <AppContextProvider>
        {children}
        </AppContextProvider>
        </SessionProviderWrapper>
        </AuthContextProvider>
        <Footer />
      </body>
    </html>
  );
}
