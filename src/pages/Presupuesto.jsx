import "../index.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Presupuesto() {
  const navigate = useNavigate();

  const [salary, setSalary] = useState("");
  const [gastos, setGastos] = useState("");
  const [ahorro, setAhorro] = useState("");
  const [libre, setLibre] = useState("");
  const [showModal, setShowModal] = useState(false);

  // 🔢 Utils
  const parse = (v) => Number(v.replace(/\D/g, "")) || 0;
  const format = (v) => (v === "" ? "" : parse(v).toLocaleString("es-CO"));

  const salarioNum = parse(salary);
  const gastosNum = parse(gastos);
  const ahorroNum = parse(ahorro);
  const libreNum = parse(libre);

  const total = gastosNum + ahorroNum + libreNum;
  const isValid = salarioNum > 0 && total === salarioNum;

  return (
    <main className="container">
      <div className="page">
        <header className="top">
          <div className="brand">Kapsula</div>
          <button className="help" type="button">
            Ayuda
          </button>
        </header>

        <h1 id="title">Creación de Presupuesto</h1>

        <form
          className="card"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            if (isValid) setShowModal(true);
          }}
        >
          {/* SALARIO */}
          <div>
            <label htmlFor="salary">Ingrese su salario total</label>
            <div className="input-row" style={{ gap: "10px" }}>
              <div className="currency-prefix">$</div>
              <input
                id="salary"
                type="text"
                placeholder="Ej: 2500000"
                value={salary}
                onChange={(e) => setSalary(format(e.target.value))}
              />
            </div>
            <div className="hint">
              Ingrese el ingreso mensual neto (sin puntos ni comas si usa
              número).
            </div>
          </div>

          {/* CATEGORÍAS */}
          <div>
            <label>Ingrese la cantidad a usar por categoría</label>

            <div style={{ display: "grid", gap: "10px" }}>
              {/* GASTOS */}
              <div className="row-2col">
                <div>Gastos mensuales</div>
                <div className="percent-box">
                  <input
                    className="number-input"
                    type="text"
                    placeholder="$"
                    value={gastos}
                    onChange={(e) => setGastos(format(e.target.value))}
                  />
                  <div
                    className="hint"
                    style={{ marginTop: "6px", color: "var(--muted)" }}
                  >
                    $COP
                  </div>
                </div>
              </div>

              {/* AHORRO */}
              <div className="row-2col">
                <div>Ahorro / Inversión</div>
                <div className="percent-box">
                  <input
                    className="number-input"
                    type="text"
                    placeholder="$"
                    value={ahorro}
                    onChange={(e) => setAhorro(format(e.target.value))}
                  />
                  <div
                    className="hint"
                    style={{ marginTop: "6px", color: "var(--muted)" }}
                  >
                    $COP
                  </div>
                </div>
              </div>

              {/* LIBRE */}
              <div className="row-2col">
                <div>Libre</div>
                <div className="percent-box">
                  <input
                    className="number-input"
                    type="text"
                    placeholder="$"
                    value={libre}
                    onChange={(e) => setLibre(format(e.target.value))}
                  />
                  <div
                    className="hint"
                    style={{ marginTop: "6px", color: "var(--muted)" }}
                  >
                    $COP
                  </div>
                </div>
              </div>
            </div>

            {/* SUMA */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "12px",
                alignItems: "center",
              }}
            >
              {!isValid ? (
                <div className="note">
                  La suma de montos debe ser igual al salario base ingresado.
                </div>
              ) : (
                <div className="sum-ok">
                  Total = {total.toLocaleString("es-CO")}$
                </div>
              )}
            </div>
          </div>

          {/* ACCIONES */}
          <div className="actions" style={{ marginTop: "6px" }}>
            <button className="btn" type="submit" disabled={!isValid}>
              Crear Presupuesto
            </button>
          </div>
        </form>

        {/* MODAL */}
        {showModal && (
          <div className="modal" onClick={() => navigate("/gastos")}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <span className="close-btn" onClick={() => setShowModal(false)}>
                ×
              </span>

              <h2>Presupuesto creado correctamente</h2>

              <p>
                <strong>Salario: </strong>
                {salarioNum.toLocaleString("es-CO")}
              </p>
              <p>
                <strong>Gastos mensuales: </strong>
                {gastosNum.toLocaleString("es-CO")}
              </p>
              <p>
                <strong>Ahorro / Inversión: </strong>
                {ahorroNum.toLocaleString("es-CO")}
              </p>
              <p>
                <strong>Libre: </strong>
                {libreNum.toLocaleString("es-CO")}
              </p>

              <div className="modal-actions">
                <button
                  className="btn-close"
                  onClick={() => navigate("/gastos")}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
