import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SonBarber – Barbershop & Academy",
  description: "Hệ thống cắt tóc nam cao cấp & đào tạo nghề barber tại TP Vinh. Dịch vụ chuyên nghiệp, sản phẩm chính hãng.",
  keywords: "barber, cắt tóc nam, barbershop vinh, sonbarber, academy, đào tạo barber",
  openGraph: {
    title: "SonBarber – Barbershop & Academy",
    description: "Hệ thống cắt tóc nam cao cấp & đào tạo nghề barber số 1 Nghệ An",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        {children}
      </body>
    </html>
  );
}
