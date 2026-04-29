import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { api } from "./api";
import { useAuth } from "./context/AuthContext";
import { DashboardLayout } from "./components/DashboardLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { ServicePage } from "./pages/ServicePage";
import { BookingFormPage } from "./pages/BookingFormPage";
import { BookingHistoryPage } from "./pages/BookingHistoryPage";
import { MapViewPage } from "./pages/MapViewPage";
import { ProfilePage } from "./pages/ProfilePage";
import { LandingPage } from "./pages/LandingPage";

function App() {
  const { token, loading: authLoading } = useAuth();
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [submittingBooking, setSubmittingBooking] = useState(false);
  const [updatingBookingId, setUpdatingBookingId] = useState("");
  const [bookingResult, setBookingResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.getServices();
        setServices(response);
      } catch (serviceError) {
        setError(serviceError.message);
      } finally {
        setLoadingServices(false);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!token) {
        setBookings([]);
        return;
      }

      setLoadingBookings(true);

      try {
        const response = await api.getBookings(token);
        setBookings(response);
      } catch (bookingError) {
        setError(bookingError.message);
      } finally {
        setLoadingBookings(false);
      }
    };

    fetchBookings();
  }, [token]);

  const handleBooking = async (payload) => {
    setSubmittingBooking(true);
    setError("");

    try {
      const response = await api.createBooking(payload, token);
      const createdBooking = response.booking || response;
      setBookingResult(createdBooking);
      setBookings((current) => [createdBooking, ...current]);
    } catch (bookingError) {
      setError(bookingError.message);
    } finally {
      setSubmittingBooking(false);
    }
  };

  const handleBookingStatusUpdate = async (bookingId, status) => {
    setUpdatingBookingId(bookingId);
    setError("");

    try {
      const response = await api.updateBookingStatus(bookingId, status, token);
      const updatedBooking = response.booking || response;
      setBookings((current) =>
        current.map((booking) => (booking._id === updatedBooking._id ? updatedBooking : booking))
      );

      if (bookingResult?._id === updatedBooking._id) {
        setBookingResult(updatedBooking);
      }
    } catch (bookingError) {
      setError(bookingError.message);
    } finally {
      setUpdatingBookingId("");
    }
  };

  if (authLoading) {
    return <div className="screen-loader">Loading your workspace...</div>;
  }

  return (
    <>
      {error && <div className="floating-error">{error}</div>}
      <Routes>
        <Route path="/" element={<LandingPage services={services} loading={loadingServices} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/services"
            element={<ServicePage services={services} loading={loadingServices} />}
          />
          <Route
            path="/book"
            element={
              <BookingFormPage
                services={services}
                onBook={handleBooking}
                bookingResult={bookingResult}
                loading={submittingBooking}
                servicesLoading={loadingServices}
              />
            }
          />
          <Route
            path="/history"
            element={
              <BookingHistoryPage
                bookings={bookings}
                loading={loadingBookings}
                onUpdateStatus={handleBookingStatusUpdate}
                updatingBookingId={updatingBookingId}
              />
            }
          />
          <Route path="/map" element={<MapViewPage bookings={bookings} />} />
          <Route path="/profile" element={<ProfilePage bookings={bookings} />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
