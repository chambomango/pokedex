import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../components/themeProvider";
import { Navbar } from "../components/navBar";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Pokedex",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={nunito.variable}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <div className="mx-auto flex max-w-6xl flex-col px-4 pt-6">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
