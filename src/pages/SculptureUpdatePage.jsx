import { Link, useOutletContext } from "react-router-dom";

export default function SculptureUpdatePage() {
  const { sculptures } = useOutletContext();

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
            {/* Abre el formulario reutilizado con los datos de esta escultura. */}
            <Link to={`/update/${sculpture.id}`}>Edit this sculpture</Link>
          </div>
        </article>
      ))}
    </>
  );
}
