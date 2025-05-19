import { useEffect, useState } from "react";
import { getUserData } from "./services/userService";
import { useAuth } from "./context/AuthContext";
import CerrarSesion from "../components/CerrarSesion";

export default function Home() {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const datos = await getUserData(user.uid);
      setUserData(datos);
    };
    if (user) fetch();
  }, [user]);

  return (
    <div>
      <h2>Bienvenido a EcoFood</h2>
      {userData && (
        <div>
          <p>
            <strong>Nombre:</strong> {userData.nombre}
          </p>
          <p>
            <strong>Tipo:</strong> {userData.tipo}
          </p>
        </div>
      )}
      <CerrarSesion />
    </div>
  );
}