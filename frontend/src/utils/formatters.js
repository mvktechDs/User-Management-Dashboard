
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'N/A';

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export const formatCoordinates = (lat, lng) => {
  if (lat === undefined || lat === null || lat === '' || lng === undefined || lng === null || lng === '') {
    return 'Not specified';
  }

  const latNum = Number(lat);
  const lngNum = Number(lng);

  if (isNaN(latNum) || isNaN(lngNum)) {
    return 'Invalid coordinates';
  }

  const latDirection = latNum >= 0 ? 'N' : 'S';
  const lngDirection = lngNum >= 0 ? 'E' : 'W';

  return `${Math.abs(latNum).toFixed(4)}° ${latDirection}, ${Math.abs(lngNum).toFixed(4)}° ${lngDirection}`;
};
