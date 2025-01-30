import "./App.css";
import Routes from "../Routes";
import SideNav from "./layout/side-bar";
import Header from "./layout/header";

function App() {
  return (
    <div className="flex flex-col">
      <Header />

      <Routes></Routes>
    </div>
  );
}

export default App;
