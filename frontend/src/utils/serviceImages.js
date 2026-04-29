export const createFallbackImage = (serviceName = "Service") => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#16324f" />
          <stop offset="100%" stop-color="#ef8d32" />
        </linearGradient>
      </defs>
      <rect width="640" height="360" rx="36" fill="url(#bg)" />
      <circle cx="540" cy="84" r="72" fill="rgba(255,255,255,0.14)" />
      <circle cx="102" cy="290" r="92" fill="rgba(255,255,255,0.08)" />
      <text x="50%" y="49%" text-anchor="middle" font-size="42" font-family="Trebuchet MS, Segoe UI, sans-serif" fill="#ffffff" font-weight="700">
        ${serviceName}
      </text>
      <text x="50%" y="63%" text-anchor="middle" font-size="20" font-family="Trebuchet MS, Segoe UI, sans-serif" fill="#fef3e5">
        Home Service
      </text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

export const getServiceImage = (service) =>
  service?.image || createFallbackImage(service?.name || "Service");
