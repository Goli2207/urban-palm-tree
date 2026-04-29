export const generateBookingId = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const randomSuffix = Math.random().toString(36).slice(2, 7).toUpperCase();

  return `BK-${timestamp}-${randomSuffix}`;
};
