
export const validateUser = (formData) => {
  const errors = {};

  if (!formData.name || !formData.name.trim()) {
    errors.name = 'Name is required';
  } else if (formData.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!formData.email || !formData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!emailRegex.test(formData.email.trim())) {
    errors.email = 'Please enter a valid email address';
  }

  if (!formData.phone || !formData.phone.trim()) {
    errors.phone = 'Phone number is required';
  }

  if (!formData.company?.name || !formData.company.name.trim()) {
    errors.companyName = 'Company name is required';
  }

  if (!formData.address?.street || !formData.address.street.trim()) {
    errors.street = 'Street address is required';
  }
  if (!formData.address?.city || !formData.address.city.trim()) {
    errors.city = 'City is required';
  }
  if (!formData.address?.zipcode || !formData.address.zipcode.trim()) {
    errors.zipcode = 'Zipcode is required';
  }

  const lat = formData.address?.geo?.lat;
  if (lat !== undefined && lat !== null && lat !== '') {
    const latNum = Number(lat);
    if (isNaN(latNum) || latNum < -90 || latNum > 90) {
      errors.latitude = 'Latitude must be between -90 and 90';
    }
  }

  const lng = formData.address?.geo?.lng;
  if (lng !== undefined && lng !== null && lng !== '') {
    const lngNum = Number(lng);
    if (isNaN(lngNum) || lngNum < -180 || lngNum > 180) {
      errors.longitude = 'Longitude must be between -180 and 180';
    }
  }

  return errors;
};
