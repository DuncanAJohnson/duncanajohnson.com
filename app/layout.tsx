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
  description: "Duncan Johnson — working at teacher.dev, solving one teacher’s problem per day.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`antialiased min-h-screen bg-dotted text-slate-900 dark:text-slate-50 ${inter.className}`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="mx-auto w-full min-h-screen px-4 py-5 sm:px-5 max-w-5xl flex flex-col">
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
            <main className="flex-1">{children}</main>
            <footer className="mt-4 p-4 text-center">
              <p className="inline-block rounded-full bg-background px-3 py-1 text-sm text-muted-foreground">
                © 2026 Duncan Johnson. Website template by <a href="https://elliotbroe.com" className="underline">Elliot Roe</a>.
              </p>
            </footer>
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
