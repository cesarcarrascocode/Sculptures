import { useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function SculptureListPage() {
  const { sculptures } = useOutletContext();
  const [currentIndex, setCurrentIndex] = useState(0);

  if (sculptures.length === 0) {
    return <p>There are no sculptures to read.</p>;
  }

  const sculpture = sculptures[currentIndex] || sculptures[0];

  function showNextSculpture() {
    // El resto (%) vuelve a la primera obra después de mostrar la última.
    setCurrentIndex((index) => (index + 1) % sculptures.length);
  }

  return (
    <>
      <h1>SculptureList Eli & Cesar</h1>
      <p>
        Read: sculpture {currentIndex + 1} of {sculptures.length}.
      </p>

      {/* Solo mostramos la obra seleccionada, con todos sus datos de detalle. */}
      <article className="sculpture-detail" key={sculpture.id}>
        <h2>{sculpture.name}</h2>
        <img src={sculpture.url} alt={sculpture.alt} />
        <p><strong>Artist:</strong> {sculpture.artist}</p>
        <p><strong>Year:</strong> {sculpture.year}</p>
        {sculpture.location && <p><strong>Location:</strong> {sculpture.location}</p>}
        <p>{sculpture.description}</p>
        <p><strong>Image description:</strong> {sculpture.alt}</p>
      </article>

      <button onClick={showNextSculpture}>Next</button>
    </>
  );
}
