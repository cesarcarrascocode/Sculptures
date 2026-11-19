import { useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

const emptySculpture = {
  name: "",
  artist: "",
  year: "",
  location: "",
  url: "",
  alt: "",
  description: "",
};

export default function SculptureFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { sculptures, addSculpture, updateSculpture } = useOutletContext();
  const sculptureToEdit = sculptures.find((sculpture) => sculpture.id === Number(id));
  const [formData, setFormData] = useState(sculptureToEdit || emptySculpture);

  if (isEdit && !sculptureToEdit) {
    return <p>Sculpture not found.</p>;
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const sculpture = {
      ...formData,
      year: Number(formData.year),
      location: formData.location.trim(),
    };

    if (isEdit) {
      updateSculpture({ ...sculpture, id: sculptureToEdit.id });
    } else {
      addSculpture(sculpture);
    }

    navigate("/");
  }

  return (
    <>
      <h1>{isEdit ? "Edit sculpture" : "Add sculpture"}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input name="name" value={formData.name} onChange={handleChange} />
        </label>
        <label>
          Artist
          <input name="artist" value={formData.artist} onChange={handleChange} />
        </label>
        <label>
          Year
          <input name="year" type="number" value={formData.year} onChange={handleChange} />
        </label>
        <label>
          Location
          <input name="location" value={formData.location} onChange={handleChange} />
        </label>
        <label>
          Image URL
          <input name="url" type="url" value={formData.url} onChange={handleChange} />
        </label>
        <label>
          Image description
          <input name="alt" value={formData.alt} onChange={handleChange} />
        </label>
        <label>
          Description
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </label>
        <button type="submit">
          {isEdit ? "Save changes" : "Create sculpture"}
        </button>
      </form>
    </>
  );
}
