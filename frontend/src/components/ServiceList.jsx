import { createFallbackImage, getServiceImage } from "../utils/serviceImages";

export const ServiceList = ({ services }) => {
  return (
    <section className="panel">
      <div className="panel-head">
        <span className="badge">Services</span>
        <h2>Available home solutions</h2>
      </div>

      <div className="service-grid">
        {services.map((service) => (
          <article key={service._id} className="service-card">
            <img
              className="service-image"
              src={getServiceImage(service)}
              alt={service.name}
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = createFallbackImage(service.name);
              }}
            />
            <div>
              <div className="service-title-row">
                <div className="service-icon">{service.name.slice(0, 1)}</div>
                <h3>{service.name}</h3>
              </div>
              <p>{service.description}</p>
              <strong>Starting at Rs. {service.basePrice}</strong>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
