import { Link } from "react-router-dom";
import { ServiceList } from "../components/ServiceList";

export const ServicePage = ({ services, loading }) => {
  return (
    <section className="page-stack">
      <div className="page-header">
        <div>
          <span className="badge">ServicePage</span>
          <h2>Choose the service you need today</h2>
          <p>Browse the available categories and continue to the booking form when you are ready.</p>
        </div>
        <Link to="/book" className="primary-link">
          Proceed to BookingForm
        </Link>
      </div>

      {loading ? <div className="screen-loader">Loading services...</div> : <ServiceList services={services} />}
    </section>
  );
};
