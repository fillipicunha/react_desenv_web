/*import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div>
      <header><h1>Meu Site de Filmes</h1></header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
*/
/*
import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";
 

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <Outlet />
      </div>
    </>
  );
}*/

import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useEffect } from "react";
import useUsuarioStore from "../util/UsuarioStore";
 

const Layout = () => {
  const verificarStatus = useUsuarioStore(state => state.verificarStatus);

  // Roda APENAS UMA VEZ quando a aplicação carrega.
  // A única responsabilidade do Layout é iniciar a cadeia de eventos.
  useEffect(() => {
    verificarStatus();
  }, [verificarStatus]);

  return (
    <>
      <NavBar />
      <main>
        <div className="container my-3">
            <Outlet />
        </div>
      </main>
    </>
  );
};
export default Layout;