import { useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function SculptureListPage() {
  const { sculptures } = useOutletContext();
  // null significa que Read muestra la lista; un número muestra el detalle de esa obra.
  const [currentIndex, setCurrentIndex] = useState(null);
  // Guardamos los id con like para que el like no cambie la obra que estamos viendo.
  const [likedSculptureIds, setLikedSculptureIds] = useState([]);

  if (sculptures.length === 0) {
    return <p>There are no sculptures to read.</p>;
  }

  // Esta variable hace más fácil saber qué vista debemos mostrar abajo.
  const isShowingDetails = currentIndex !== null;
  const sculpture = isShowingDetails ? sculptures[currentIndex] : null;

  function showNextSculpture() {
    // Desde la lista, Next empieza el recorrido mostrando la primera obra.
    setCurrentIndex(0);
  }

  function showPreviousSculpture() {
    // Desde la primera obra volvemos a la lista completa, como pide el recorrido.
    if (currentIndex === 0) {
      setCurrentIndex(null);
      return;
    }

    // En las demás obras, Previous muestra la obra anterior.
    setCurrentIndex(currentIndex - 1);
  }

  function showNextDetail() {
    // Este botón solo aparece antes de la última obra, por eso podemos sumar uno.
    setCurrentIndex(currentIndex + 1);
  }

  function toggleLike(id) {
    // Si el id ya está guardado, lo quitamos; si no, lo añadimos como like.
    setLikedSculptureIds((likedIds) => {
      if (likedIds.includes(id)) {
        return likedIds.filter((likedId) => likedId !== id);
      }

      return [...likedIds, id];
    });
  }

  return (
    <>
      {/* Al entrar en Read, currentIndex es null y se ve la lista completa. */}
      {!isShowingDetails && (
        <>
          <p>Read: choose a sculpture to see all its information.</p>
          <button onClick={showNextSculpture}>Next</button>

          {sculptures.map((item, index) => {
            // Comprobamos el like de cada obra por su id, que no cambia al recorrer la lista.
            const hasLike = likedSculptureIds.includes(item.id);

            return (
              <article className="sculpture-card" key={item.id}>
                <img src={item.url} alt={item.alt} width="80" />
                <div>
                  <h2>{item.name}</h2>
                  <h3>
                    {item.artist}, {item.year}
                  </h3>
                  {/* Este botón cambia el índice sin salir de Read, para conservar el recorrido. */}
                  <button onClick={() => setCurrentIndex(index)}>
                    View details
                  </button>
                  {/* Like solo modifica el estado de esta obra; no modifica currentIndex. */}
                  <button onClick={() => toggleLike(item.id)}>
                    {hasLike ? "Unlike" : "Like"}
                  </button>
                  {/* El aviso solo existe mientras esta obra tenga el like activado. */}
                  {hasLike && <p>You liked this sculpture.</p>}
                </div>
              </article>
            );
          })}
        </>
      )}

      {/* Con un índice, Read muestra solo una obra y permite recorrerla. */}
      {isShowingDetails && (
        <>
          <p>
            Read: sculpture {currentIndex + 1} of {sculptures.length}.
          </p>
          <article className="sculpture-detail" key={sculpture.id}>
            <h2>{sculpture.name}</h2>
            <img src={sculpture.url} alt={sculpture.alt} />
            <p><strong>Artist:</strong> {sculpture.artist}</p>
            <p><strong>Year:</strong> {sculpture.year}</p>
            {sculpture.location && <p><strong>Location:</strong> {sculpture.location}</p>}
            <p>{sculpture.description}</p>
            <p><strong>Image description:</strong> {sculpture.alt}</p>
          </article>
          <div className="sculpture-actions">
            {/* Este botón añade o quita el like de la obra que se está viendo. */}
            <button onClick={() => toggleLike(sculpture.id)}>
              {likedSculptureIds.includes(sculpture.id) ? "Unlike" : "Like"}
            </button>
            {/* Next desaparece al llegar a la última obra. */}
            {currentIndex < sculptures.length - 1 && (
              <button onClick={showNextDetail}>Next</button>
            )}
            <button onClick={showPreviousSculpture}>Back</button>
          </div>
          {/* El mensaje desaparece automáticamente cuando toggleLike quita el id. */}
          {likedSculptureIds.includes(sculpture.id) && <p>You liked this sculpture.</p>}
        </>
      )}
    </>
  );
}
