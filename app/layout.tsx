import type { Metadata } from "next";
import "./globals.css";
import { kanit } from "./styles/font";

export const metadata: Metadata = {
  title: "Tenant Portal",
  description: "Tenant Portal Backoffice",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={`${kanit.className} antialiased w-max`}>
        {children}
      </body>
    </html>
  );
}
