import axios from "axios";

const api = axios.create({
  // **IMPORTANTE**: Ajuste esta URL para a porta da sua API Spring Boot
  baseURL: "http://localhost:8080", 
  
  // ESSENCIAL: Permite que o navegador envie e receba cookies de sessão
  withCredentials: true, 
});

export default api;