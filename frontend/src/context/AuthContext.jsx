import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("service_booking_token"));
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("service_booking_user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(Boolean(token));

  useEffect(() => {
    const restoreSession = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.getProfile(token);
        setUser(response.user);
        localStorage.setItem("service_booking_user", JSON.stringify(response.user));
      } catch (error) {
        localStorage.removeItem("service_booking_token");
        localStorage.removeItem("service_booking_user");
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, [token]);

  const persistAuth = (payload) => {
    setToken(payload.token);
    setUser(payload.user);
    localStorage.setItem("service_booking_token", payload.token);
    localStorage.setItem("service_booking_user", JSON.stringify(payload.user));
  };

  const register = async (values) => {
    const response = await api.register(values);
    persistAuth(response);
  };

  const login = async (values) => {
    const response = await api.login(values);
    persistAuth(response);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("service_booking_token");
    localStorage.removeItem("service_booking_user");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        register,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
