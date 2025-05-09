import { useState, useEffect } from "react";
import axios from "axios";

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get('/auth/validate-session', { withCredentials: true });
        setIsLoggedIn(response.status === 200);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    checkSession();
  }, []);

  return { isLoggedIn };
}