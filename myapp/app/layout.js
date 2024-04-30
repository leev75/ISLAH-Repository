import { Inter } from "next/font/google";
import "@/public/css/all.css/style.css";
import BootstrapClient from "@/components/BootstrapClient";
import Nav from "@/components/Nav";
import { AuthProvider } from "./hook/useAuth";
import { ManagerAuthProvider } from "./hook/useAuthManager";

export const metadata = {
  title: "islah web site",
  description: "reporting system for citizens",
};

export default function Layout({ children }) {
  return (
    <html>
      <head>
        {/* Add any head elements here, such as meta tags or links to CSS files */}
      </head>
      <body>
        <ManagerAuthProvider>
          <AuthProvider>
            <Nav />
            <div>{children}</div>
          </AuthProvider>
        </ManagerAuthProvider>
      </body>
    </html>
  );
}
