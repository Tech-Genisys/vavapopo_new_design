import "./globals.css";
import { Inter } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import AosInit from "./components/aos";
import "aos/dist/aos.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Vavapopo",
    template: "%s | Vavapopo",
  },
  description:
    "Dive into cultural, and heritage tours. Experience the warmth of local hospitality, explore rich traditions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AosInit />
        {children}
      </body>
    </html>
  );
}
