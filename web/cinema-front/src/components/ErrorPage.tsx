import { isRouteErrorResponse, useRouteError } from "react-router-dom"
import NavBar from "../components/NavBar"

const ErrorPage = () => {
  
  const error = useRouteError();

  return (
    <>
    <NavBar /> 
    <div className="container mt-3">
        {isRouteErrorResponse(error) ? "Página requisitada inválida." :
        error instanceof Error ? error.message : "Erro desconhecido."}
    </div>
    </>
  )
}
export default ErrorPage