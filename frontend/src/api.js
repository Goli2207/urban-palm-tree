import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || "Request failed";
    return Promise.reject(new Error(message));
  }
);

export const api = {
  register: async (payload) => (await client.post("/auth/register", payload)).data,
  login: async (payload) => (await client.post("/auth/login", payload)).data,
  forgotPassword: async (payload) => (await client.post("/auth/forgot-password", payload)).data,
  getProfile: async (token) =>
    (
      await client.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    ).data,
  getServices: async () => (await client.get("/services")).data,
  createBooking: async (payload, token) =>
    (
      await client.post("/bookings", payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    ).data,
  getBookings: async (token) =>
    (
      await client.get("/bookings", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    ).data,
  updateBookingStatus: async (bookingId, status, token) =>
    (
      await client.patch(
        `/bookings/${bookingId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
    ).data
};
