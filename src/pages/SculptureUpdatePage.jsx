import { useNavigate, useOutletContext } from "react-router-dom";

export default function SculptureUpdatePage() {
  const { sculptures } = useOutletContext();
  const navigate = useNavigate();

  function openEditForm(id) {
    // Navegamos a la ruta con id para que el formulario cargue esa escultura.
    navigate(`/update/${id}`);
  }

  return (
    <>
      <h1>Update sculpture</h1>
      <p>Choose the sculpture whose information you want to change.</p>

      {sculptures.map((sculpture) => (
        <article className="sculpture-card" key={sculpture.id}>
          <img src={sculpture.url} alt={sculpture.alt} width="80" />
          <div>
            <h2>{sculpture.name}</h2>
            <p>{sculpture.artist}</p>
            {/* Un botón usa onClick porque la propiedad to solo funciona en un Link. */}
            <button onClick={() => openEditForm(sculpture.id)}>
              Edit this sculpture
            </button>
          </div>
        </article>
      ))}
    </>
  );
}
