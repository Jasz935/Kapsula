import { useState } from "react";
import "../index.css";

export default function Gastos() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    const newItem = {
      title: form.title.value,
      value: Number(form.value.value),
      description: form.description.value,
      image: form.image.files[0]
        ? URL.createObjectURL(form.image.files[0])
        : null,
      date: new Date().toLocaleDateString("es-CO"),
    };

    setItems([...items, newItem]);
    form.reset();
    setIsModalOpen(false);
  };

  return (
    <>
      {/* HEADER */}
      <header className="header-top">
        <div className="brand">Kapsula</div>
        <div className="header-topright">
          <button className="help">Ayuda</button>
          <button className="help">Gastos</button>
          <button className="help">Descargar Historial</button>
        </div>
      </header>

      {/* MAIN */}
      <div className="page">
        <main className="container">
          <button className="btn" onClick={() => setIsModalOpen(true)}>
            Agregar
          </button>

          {/* ITEMS */}
          {items.length > 0 && (
            <section className="items">
              {items.map((item, index) => (
                <div className="item-card horizontal" key={index}>
                  {/* IMAGEN */}
                  {item.image && (
                    <div className="item-image">
                      <img src={item.image} alt="adjunto" />
                    </div>
                  )}

                  {/* CONTENIDO */}
                  <div className="item-content">
                    <h3 className="item-title">{item.title}</h3>

                    <div className="item-value">
                      ${item.value.toLocaleString("es-CO")}
                    </div>

                    <p className="item-description">{item.description}</p>

                    <div className="item-date">Creado: {item.date}</div>
                  </div>
                </div>
              ))}
            </section>
          )}
        </main>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="modals">
          <div className="modals-content">
            <h3>Agregar registro</h3>

            <form onSubmit={handleSubmit}>
              <input name="title" type="text" placeholder="Título" required />
              <input name="value" type="number" placeholder="Valor" required />
              <textarea name="description" placeholder="Descripción"></textarea>
              <input name="image" type="file" accept="image/*" />

              <button type="submit" className="btn">
                Guardar
              </button>
              <button
                type="button"
                className="btn-close"
                onClick={() => setIsModalOpen(false)}
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
