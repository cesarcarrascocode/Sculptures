import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { sculptureList } from "./data.js";
import Layout from "./pages/Layout.jsx";
import NoPage from "./pages/NoPage.jsx";
import SculptureDetailPage from "./pages/SculptureDetailPage.jsx";
import SculptureFormPage from "./pages/SculptureFormPage.jsx";
import SculptureListPage from "./pages/SculptureListPage.jsx";
import SculptureUpdatePage from "./pages/SculptureUpdatePage.jsx";
import SculptureDeletePage from "./pages/SculptureDeletePage.jsx";

function App() {
  const [sculptures, setSculptures] = useState(sculptureList);

  function addSculpture(sculpture) {
    const newId = Math.max(...sculptures.map((item) => item.id), 0) + 1;
    setSculptures([...sculptures, { ...sculpture, id: newId }]);
  }

  function updateSculpture(updatedSculpture) {
    setSculptures(
      sculptures.map((sculpture) =>
        sculpture.id === updatedSculpture.id ? updatedSculpture : sculpture,
      ),
    );
  }

  function deleteSculpture(id) {
    setSculptures(sculptures.filter((sculpture) => sculpture.id !== id));
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              context={{ sculptures, addSculpture, updateSculpture, deleteSculpture }}
            />
          }
        >
          {/* Cada operación CRUD tiene una ruta principal para la barra de navegación. */}
          <Route index element={<Navigate to="read" replace />} />
          <Route path="create" element={<SculptureFormPage />} />
          <Route path="read" element={<SculptureListPage />} />
          <Route path="read/:id" element={<SculptureDetailPage />} />
          <Route path="update" element={<SculptureUpdatePage />} />
          <Route path="update/:id" element={<SculptureFormPage />} />
          <Route path="delete" element={<SculptureDeletePage />} />

          {/* Estas rutas conservan los enlaces de la práctica original. */}
          <Route path="sculptures/new" element={<Navigate to="/create" replace />} />
          <Route path="sculptures/:id" element={<SculptureDetailPage />} />
          <Route path="sculptures/:id/edit" element={<SculptureFormPage />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
