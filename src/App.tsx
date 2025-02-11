import "./App.css";
import Routes from "../Routes";
import SideNav from "./layout/side-bar";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "./layout/header";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="flex flex-col gap-4">
        <Header />

        <div className="px-4">
          <Routes />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
