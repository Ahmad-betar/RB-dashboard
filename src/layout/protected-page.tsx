import { ThemeProvider } from "@/components/theme-provider";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./header";

const ProtectedPage = () => {
  if (!localStorage.getItem("token")) return <Navigate to={"sign-in"} />;

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="flex flex-col gap-4">
        <Header />

        <div className="px-4">
          <Outlet />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default ProtectedPage;
