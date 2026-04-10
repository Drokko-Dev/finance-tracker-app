import axios from "axios";
import type { AxiosError, AxiosResponse } from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // ESTO ES CLAVE: Le dice a Axios que envíe la cookie segura en cada petición
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// ¡Adiós interceptor de request! El navegador hace el trabajo por ti.

// El interceptor de respuesta se queda casi igual, para proteger tus rutas en React
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,

  (error: AxiosError) => {
    const isLoginRequest = error.config?.url?.includes("/login");
    // Si el backend responde 401 (cookie expirada o inexistente)
    if (error.response?.status === 401 && !isLoginRequest) {
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default apiClient;
