import { useOutletContext } from "react-router-dom";

export default function SculptureDeletePage() {
  const { sculptures, deleteSculpture } = useOutletContext();

  function handleDelete(id, name) {
    // La confirmación evita borrar una escultura por accidente.
    const shouldDelete = window.confirm(`Delete "${name}"?`);

    if (shouldDelete) {
      deleteSculpture(id);
    }
  }

  return (
    <>
      <h1>Delete sculpture</h1>
      <p>Choose a sculpture to remove from the catalogue.</p>

      {sculptures.map((sculpture) => (
        <article className="sculpture-card" key={sculpture.id}>
          <img src={sculpture.url} alt={sculpture.alt} width="80" />
          <div>
            <h2>{sculpture.name}</h2>
            <p>{sculpture.artist}</p>
            <div className="sculpture-actions">
              <button onClick={() => handleDelete(sculpture.id, sculpture.name)}>
                Delete this sculpture
              </button>
            </div>
          </div>
        </article>
      ))}
    </>
  );
}
