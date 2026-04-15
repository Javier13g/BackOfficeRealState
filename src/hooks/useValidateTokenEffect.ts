import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import LoginService from "../services/login/AuthService";
import NotificationMessage from "../components/NotificationMessage";



export function useValidateTokenEffect() {
  const navigate = useNavigate();
  const notifiedRef = useRef(false);

  useEffect(() => {
    const validate = async () => {
      const isValid = await LoginService.isValidateToken();
      if (!isValid && !notifiedRef.current) {
        notifiedRef.current = true;
        NotificationMessage({
          type: "error",
          message: "Sesión expirada",
          description: "Serás redirigido al login en 5 segundos.",
          duration: 5,
        });
        setTimeout(() => {
          navigate("/");
        }, 5000);
      }
    };
    validate();
  }, [navigate]);
}