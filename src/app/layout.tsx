import "@/utils/fontAwsomeLibrary";
import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";

// the global css must be imported inside the root layout to apply accross the application.
import "./globals.css";

// relative imports => relative to the current file => very tedious and confusing
// dots are level up to the current directory.
// the first dot lead to the src
// second dot lead to the root of the project
// import Navbar from "../ui/Navbar";

// These options allow you to alias project directories to absolute paths
// absolute imports => relative to the root of the project => easy to use, consistent and recommended
// "baseUrl": '.', this configuration is used for absolute imports
// import Navbar from "src/ui/Navbar";

// for modult aliases => module aliases are used to absolute imports of the modules.
// "baseUrl": '.',
// "paths": {
//   "@/*": ["src/*"]
// }
import Navbar from "@/components/Navbar"; //=> @/ repersent the src/
import { outfit } from "@/utils/font";

// @/ => absolute specifiar
// ./, ../, / are relative specifiar.

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// the icon is being rendered before the css is loaded, because of it, the icon fleshed
// and create but, the bellow code from stack overflow solve this but.
// autocss add some initial styles to the icons.
// by default it's true,
// that's the reason the icon flesh.
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import Footer from "@/components/Footer";
import AppContextProvider from "@/context/AppContext";
import { SessionProviderWrapper } from "@/context/SessionProviderWrapper";
import { getAuthContext } from "@/library/action";
import { AuthContextProvider } from "@/context/AuthContext";
config.autoAddCss = false;
//

export const metadata: Metadata = {
  title: "Make your appointment to your dotor",
  description: "A healthcare management system",
};

// Q1: what is layout, explain well.
// The layout component is used to share the same ui on diffrent pages.
// the pages inside the current directory have the same layout
// because of partial rendering the layout will be persisted and does not change
// between re-rendered, this way the the page will be optimized.
//
// benefit: consistent disign, imporved performance becuase of partial rendering, code resuabilty
// and better maintainance to handle global change.

// this layout will be shared between all the pages inside the app (/) route.

// all the routes will be difined inside the app directory. so this way it becomes app router

export default async function RootLayout({
  children,
}: Readonly<{
  // Here type React.ReactNode is used because child can be any defined type of react node, may be a string, null or undefined also
  children: React.ReactNode;
}>) {
  const baseContaxt = await getAuthContext();

  return (
    <html lang="en">
      <body className={`${outfit.className}  antialiased relative`}>
        <AuthContextProvider value={baseContaxt}>
        <SessionProviderWrapper>
        <Navbar />
        </SessionProviderWrapper>
        </AuthContextProvider>
        <AppContextProvider>
        {children}
        </AppContextProvider>
        <Footer />
      </body>
    </html>
  );
}
