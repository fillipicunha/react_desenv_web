import { Navigate, useLocation } from "react-router-dom";
import Layout from "./Layout";
import useUsuarioStore from "../util/UsuarioStore";
 

const PrivateRoutes = () => {
  const { usuario, status } = useUsuarioStore();
  const location = useLocation();

  if (status === 'PENDENTE') {
    return <div className="d-flex justify-content-center align-items-center vh-100"><div className="spinner-border text-light" role="status"><span className="visually-hidden">Carregando...</span></div></div>;
  }

  if (status === 'DESLOGADO' || !usuario) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  
  return <Layout />;
};
export default PrivateRoutes;