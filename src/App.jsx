import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { sculptureList } from "./data.js";
import Layout from "./pages/Layout.jsx";
import NoPage from "./pages/NoPage.jsx";
import SculptureDetailPage from "./pages/SculptureDetailPage.jsx";
import SculptureFormPage from "./pages/SculptureFormPage.jsx";
import SculptureListPage from "./pages/SculptureListPage.jsx";

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
          <Route index element={<SculptureListPage />} />
          <Route path="sculptures/new" element={<SculptureFormPage />} />
          <Route path="sculptures/:id" element={<SculptureDetailPage />} />
          <Route path="sculptures/:id/edit" element={<SculptureFormPage />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
