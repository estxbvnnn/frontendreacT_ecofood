import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence
} from "firebase/auth";
import { auth } from "../services/firebase";
import Swal from "sweetalert2";
import { getUserData } from "../services/userService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await setPersistence(auth, browserLocalPersistence);
      const cred = await signInWithEmailAndPassword(auth, email, password);
      if (!cred.user.emailVerified) {
        Swal.fire(
          "Verifica tu correo",
          "Debes verificar tu correo electrónico antes de iniciar sesión.",
          "warning"
        );
        return;
      }
      const datos = await getUserData(cred.user.uid);
      Swal.fire("Bienvenido", `Hola ${datos.nombre} (${datos.tipo})`, "success");
      navigate("/home");
    } catch (error) {
      Swal.fire("Error", "Credenciales incorrectas o fallo de red", "error");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Correo Electrónico</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Iniciar Sesión
        </button>
      </form>
      <div className="mt-3">
        <a href="/recuperar">¿Olvidaste tu contraseña?</a>
      </div>
      <div className="mt-2">
        ¿No tienes cuenta? <a href="/registro">Regístrate aquí</a>
      </div>
    </div>
  );
}