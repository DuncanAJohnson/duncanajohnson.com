import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@/components/analytics";
import { ModeToggle } from "@/components/mode-toggle";
import { MainMenu } from "@/components/MainMenu/component";
import { GithubButton, LinkedInButton } from "@/components/social-button";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Duncan Johnson",
  description: "Made with <3",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`antialiased min-h-screen bg-dotted dark:bg-slate-950 text-slate-900 dark:text-slate-50 ${inter.className}`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="mx-auto w-screen h-screen p-5 max-w-5xl">
            <header>
              <div className="flex items-center justify-between">
                <div className="flex flex-row">
                  <ModeToggle />
                  <GithubButton />
                  <LinkedInButton />
                </div>
                <MainMenu />
              </div>
            </header>
            <main>{children}</main>
            <footer className="mt-4 p-4 dark:bg-gray-800 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                © 2024 Duncan Johnson. Website template by my partner in crime <a href="https://elliotbroe.com" className="underline">Elliot Roe</a>.
              </p>
            </footer>
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
