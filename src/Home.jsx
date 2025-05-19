import React, { useEffect, useState } from "react";
import { getUserData } from "./services/userService";
import { useAuth } from "./context/AuthContext";
import CerrarSesion from "../components/CerrarSesion";
import { Link } from "react-router-dom";

export default function Home() {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      if (!user) return;
      try {
        const datos = await getUserData(user.uid);
        setUserData(datos);
      } catch (error) {
        setUserData(null);
      }
    };
    fetch();
  }, [user]);

  // PRUEBA: Muestra siempre este texto para descartar problemas de render
  if (!user) return <div>No hay usuario en contexto</div>;

  return (
    <div>
      <h2>¡React está funcionando!</h2>
      <header>
        <nav className="menu-superior">
          <ul>
            <li>
              <Link to="/" className="boton-verde">Inicio</Link>
            </li>
            <li>
              <a href="/contacto" className="boton-verde">Contacto</a>
            </li>
            <li>
              <Link to="/registro" className="boton-verde">Registrarse</Link>
            </li>
            <li>
              <Link to="/login" className="boton-verde">Iniciar Sesión</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <p>Este es el Home. Si ves esto, React y el router funcionan.</p>
        {userData && <div>Datos de usuario cargados.</div>}
        {!userData && <div>No hay datos de usuario o están cargando.</div>}
      </main>
      <footer>
        <p>&copy; 2025 EcoFood. Todos los derechos reservados.</p>
      </footer>
      {user && <CerrarSesion />}
    </div>
  );
}