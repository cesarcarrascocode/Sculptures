import { Link, useOutletContext } from "react-router-dom";

export default function SculptureListPage() {
  const { sculptures, deleteSculpture } = useOutletContext();

  return (
    <>
      <h1>SculptureList Eli & Cesar</h1>
      <button>Next</button>

      {sculptures.map((sculpture) => (
        <article className="sculpture-card" key={sculpture.id}>
          <img src={sculpture.url} alt={sculpture.alt} width="80" />
          <div>
            <h2>{sculpture.name}</h2>
            <h3>
              {sculpture.artist}, {sculpture.year}
            </h3>
            <Link to={`/sculptures/${sculpture.id}`}>View</Link>{" "}
            <Link to={`/sculptures/${sculpture.id}/edit`}>Edit</Link>
            <button onClick={() => deleteSculpture(sculpture.id)}>Delete</button>
          </div>
        </article>
      ))}
    </>
  );
}
