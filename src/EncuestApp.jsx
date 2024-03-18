import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import {
  ABMPage,
  AuthProvider,
  Categorias,
  CategoriasForm,
  CategoriasProvider,
  Encuestas,
  EncuestasProvider,
  Errors,
  Footer,
  HomeV1,
  Login,
  EncuestasForm,
  Register,
  NavbarTest,
} from "./pages/index.js";
import { ResponderEncuesta } from "./components/encuestas/responderEncuesta/ResponderEncuesta.jsx";
import { VerResultados } from "./components/encuestas/verResultados/VerResultados.jsx";

export const EncuestApp = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <BrowserRouter>
        <AuthProvider>
          <NavbarTest />
          <Routes>
            <Route path="/" element={<HomeV1 />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              element={
                <EncuestasProvider>
                  <Outlet />
                </EncuestasProvider>
              }
            >
              <Route path="/abm" element={<ABMPage />} />
              <Route path="/encuestas/categoria/:id" element={<Encuestas />} />
              <Route path="/administrar-encuesta" element={<EncuestasForm />} />
              <Route
                path="/administrar-encuesta/:id"
                element={<EncuestasForm />}
              />
              <Route
                path="/responder-encuesta/:id"
                element={<ResponderEncuesta />}
              />
              <Route
                path="/ver-resultados/:encuestarealizadaid"
                element={<VerResultados />}
              />
            </Route>

            <Route path="*" element={<Errors />} />

            <Route
              element={
                <CategoriasProvider>
                  <Outlet />
                </CategoriasProvider>
              }
            >
              <Route
                path="/administrar-categoria"
                element={<CategoriasForm />}
              />
              <Route
                path="/administrar-categoria/:id"
                element={<CategoriasForm />}
              />
              <Route path="/categorias" element={<Categorias />} />
            </Route>
          </Routes>
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
};
