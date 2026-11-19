import { NavLink, Outlet } from "react-router-dom";

export default function Layout({ context }) {
  return (
    <>
      <nav className="topbar">
        <NavLink to="/" end>
          List
        </NavLink>
        <NavLink to="/sculptures/new">Add</NavLink>
      </nav>
      <main>
        <Outlet context={context} />
      </main>
    </>
  );
}
