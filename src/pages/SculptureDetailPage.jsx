import { Link, useOutletContext, useParams } from "react-router-dom";

export default function SculptureDetailPage() {
  const { id } = useParams();
  const { sculptures } = useOutletContext();
  const sculpture = sculptures.find((item) => item.id === Number(id));

  if (!sculpture) {
    return <p>Sculpture not found.</p>;
  }

  return (
    <>
      <h1>{sculpture.name}</h1>
      <img src={sculpture.url} alt={sculpture.alt} />
      <p><strong>Artist:</strong> {sculpture.artist}</p>
      <p><strong>Year:</strong> {sculpture.year}</p>
      {sculpture.location && <p><strong>Location:</strong> {sculpture.location}</p>}
      <p>{sculpture.description}</p>
      <p><strong>Image description:</strong> {sculpture.alt}</p>
      <Link to="/">Back to list</Link>
    </>
  );
}
