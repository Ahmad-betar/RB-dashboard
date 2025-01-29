import "./App.css";
import Routes from "../Routes";
import SideNav from "./layout/side-bar";

function App() {
  return (
    <div className="flex gap-4">
      <SideNav />

      <Routes></Routes>
    </div>
  );
}

export default App;
