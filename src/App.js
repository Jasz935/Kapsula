import { Routes, Route } from "react-router-dom";
import Presupuesto from "./pages/Presupuesto";
import Gastos from "./pages/Gastos";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Presupuesto />} />
      <Route path="/gastos" element={<Gastos />} />
    </Routes>
  );
}

export default App;
