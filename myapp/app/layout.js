import "@/public/css/all.css/style.css";
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
      <head></head>
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
