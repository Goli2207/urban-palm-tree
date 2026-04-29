import { useEffect, useState } from "react";
import Map from "./Map";
import { createFallbackImage, getServiceImage } from "../utils/serviceImages";

const initialForm = {
  serviceIds: [],
  address: "",
  preferredDate: "",
  preferredTime: "",
  issueDescription: ""
};

const minDate = new Date().toISOString().split("T")[0];

export const BookingForm = ({ services, onBook, bookingResult, loading }) => {
  const [form, setForm] = useState(initialForm);
  const [geoError, setGeoError] = useState("");
  const [location, setLocation] = useState(null);
  const [fetchingLocation, setFetchingLocation] = useState(false);

  useEffect(() => {
    if (services.length && form.serviceIds.length === 0) {
      setForm((current) => ({ ...current, serviceIds: [services[0]._id] }));
    }
  }, [services, form.serviceIds.length]);

  const selectedServices = services.filter((service) => form.serviceIds.includes(service._id));
  const primarySelectedService = selectedServices[0] || services[0];
  const mapLocation = location
    ? {
        lat: location.latitude,
        lng: location.longitude
      }
    : null;
  const estimatedTotal = selectedServices.reduce(
    (total, service) => total + Number(service.basePrice || 0),
    0
  );

  const captureLocation = () =>
    new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported in this browser."));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        () => reject(new Error("Location access was denied or unavailable.")),
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0
        }
      );
    });

  const reverseGeocode = async ({ latitude, longitude }) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
      {
        headers: {
          Accept: "application/json"
        }
      }
    );

    if (!response.ok) {
      throw new Error("Unable to fetch address from your current location.");
    }

    const data = await response.json();
    return data.display_name || "";
  };

  const handleGetLocation = async () => {
    setGeoError("");
    setFetchingLocation(true);

    try {
      const coords = await captureLocation();
      const resolvedAddress = await reverseGeocode(coords);
      setLocation(coords);
      setForm((current) => ({
        ...current,
        address:
          resolvedAddress ||
          current.address ||
          `${coords.latitude.toFixed(5)}, ${coords.longitude.toFixed(5)}`
      }));
    } catch (error) {
      setGeoError(error.message);
    } finally {
      setFetchingLocation(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!location) {
      setGeoError("Please capture your live location before confirming the booking.");
      return;
    }

    await onBook({
      ...form,
      location
    });

    setForm((current) => ({
      ...initialForm,
      serviceIds: current.serviceIds
    }));
    setLocation(null);
  };

  const toggleService = (serviceId) => {
    setForm((current) => {
      const hasService = current.serviceIds.includes(serviceId);
      const nextServiceIds = hasService
        ? current.serviceIds.filter((currentServiceId) => currentServiceId !== serviceId)
        : [...current.serviceIds, serviceId];

      return {
        ...current,
        serviceIds: nextServiceIds.length ? nextServiceIds : current.serviceIds
      };
    });
  };

  return (
    <section className="panel">
      <div className="panel-head">
        <span className="badge">New Booking</span>
        <h2>Book a home service in minutes</h2>
      </div>

      <form className="booking-form" onSubmit={handleSubmit}>
        {primarySelectedService && (
          <div className="selected-service-card">
            <img
              className="selected-service-image"
              src={getServiceImage(primarySelectedService)}
              alt={primarySelectedService.name}
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = createFallbackImage(primarySelectedService.name);
              }}
            />
            <div className="selected-service-copy">
              <span className="badge">Selected Services</span>
              <h3>
                {selectedServices.length === 1
                  ? selectedServices[0].name
                  : `${selectedServices.length} services selected`}
              </h3>
              <p>
                {selectedServices.length
                  ? selectedServices.map((service) => service.name).join(", ")
                  : "Choose one or more services for this visit."}
              </p>
              <strong>Estimated starting total Rs. {estimatedTotal}</strong>
            </div>
          </div>
        )}

        <fieldset className="service-picker">
          <legend>Service Types</legend>
          <div className="service-option-grid">
            {services.map((service) => {
              const checked = form.serviceIds.includes(service._id);

              return (
                <label
                  key={service._id}
                  className={`service-option ${checked ? "selected" : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleService(service._id)}
                  />
                  <span>
                    <strong>{service.name}</strong>
                    <small>From Rs. {service.basePrice}</small>
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <label>
          Address
          <textarea
            rows="3"
            placeholder="Flat / house number, street, city, landmark"
            value={form.address}
            onChange={(event) => setForm((current) => ({ ...current, address: event.target.value }))}
            required
          />
        </label>

        <div className="form-grid">
          <label>
            Preferred Date
            <input
              type="date"
              min={minDate}
              value={form.preferredDate}
              onChange={(event) =>
                setForm((current) => ({ ...current, preferredDate: event.target.value }))
              }
              required
            />
          </label>

          <label>
            Preferred Time
            <input
              type="time"
              value={form.preferredTime}
              onChange={(event) =>
                setForm((current) => ({ ...current, preferredTime: event.target.value }))
              }
              required
            />
          </label>
        </div>

        <label>
          Describe the Issue
          <textarea
            rows="4"
            placeholder="Explain the issue so the assigned worker arrives prepared."
            value={form.issueDescription}
            onChange={(event) =>
              setForm((current) => ({ ...current, issueDescription: event.target.value }))
            }
            required
          />
        </label>

        <div className="location-box">
          <div>
            <strong>Current Location</strong>
            <p>
              {location
                ? `Address filled from location. Coordinates: ${location.latitude.toFixed(5)}, ${location.longitude.toFixed(5)}`
                : "Use your current location to auto-fill the address and attach coordinates to the booking."}
            </p>
          </div>
          <button type="button" className="secondary-button" onClick={handleGetLocation}>
            {fetchingLocation ? "Detecting..." : location ? "Refresh Address" : "Use Current Location"}
          </button>
        </div>

        {geoError && <p className="error-text">{geoError}</p>}

        {mapLocation && (
          <div className="booking-map-preview">
            <div className="map-meta">
              <h3>MapView</h3>
              <p>
                {location.latitude.toFixed(5)}, {location.longitude.toFixed(5)}
              </p>
            </div>
            <Map location={mapLocation} />
          </div>
        )}

        <button className="primary-button" type="submit" disabled={loading}>
          {loading ? "Confirming..." : "Confirm Booking"}
        </button>
      </form>

      {bookingResult && (
        <div className="confirmation-card">
          <img
            className="confirmation-image"
            src={getServiceImage(bookingResult.services?.[0] || bookingResult.service)}
            alt={bookingResult.services?.[0]?.name || bookingResult.service?.name || "Booked service"}
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = createFallbackImage(
                bookingResult.services?.[0]?.name || bookingResult.service?.name || "Service"
              );
            }}
          />
          <h3>Booking Confirmed</h3>
          <p>
            Services:{" "}
            <strong>
              {(bookingResult.services?.length ? bookingResult.services : [bookingResult.service])
                .filter(Boolean)
                .map((service) => service.name)
                .join(", ")}
            </strong>
          </p>
          <p>
            Booking ID: <strong>{bookingResult.bookingId}</strong>
          </p>
          <p>
            Service Code: <strong>{bookingResult.serviceOtp}</strong>
          </p>
          <p>Share this 4-digit code with the worker when they arrive to begin the service.</p>
          <p>
            Workers:{" "}
            <strong>
              {(bookingResult.workers?.length ? bookingResult.workers : [bookingResult.worker])
                .filter(Boolean)
                .map((worker) => worker.name)
                .join(", ")}
            </strong>
          </p>
        </div>
      )}
    </section>
  );
};
