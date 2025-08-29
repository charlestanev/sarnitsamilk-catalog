import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
    title: "Sarnitsa Milk - Admin Panel",
};

export default function AdminRootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}