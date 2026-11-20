import { NavLink, Outlet } from "react-router-dom";

export default function Layout({ context }) {
  return (
    <>
    <header>
    <h1>Web SculptureList Eli i Cesar - Java FullStack 2026</h1>
    </header>
      <nav className="topbar">
        {/* NavLink marca la página CRUD actual con la clase active. */}
        <NavLink to="/create">Create
        </NavLink>
        <NavLink to="/read">
        Read</NavLink>
        <NavLink to="/update">
        Update</NavLink>
        <NavLink to="/delete">
        Delete</NavLink>
      </nav>
      <main>
        <Outlet context={context} />
      </main>
    </>
  );
}
