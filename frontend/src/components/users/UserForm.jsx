import React, { useState, useEffect } from 'react';
import { validateUser } from '../../utils/validation';
import Input from '../common/Input';
import Button from '../common/Button';
import { AlertCircle } from 'lucide-react';

const UserForm = ({
  initialData = null,
  onSubmit,
  isLoading = false,
  submitText = 'Save User',
  apiError = null,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: { name: '' },
    address: {
      street: '',
      city: '',
      zipcode: '',
      geo: { lat: '', lng: '' }
    }
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        company: {
          name: initialData.company?.name || ''
        },
        address: {
          street: initialData.address?.street || '',
          city: initialData.address?.city || '',
          zipcode: initialData.address?.zipcode || '',
          geo: {
            lat: initialData.address?.geo?.lat ?? '',
            lng: initialData.address?.geo?.lng ?? ''
          }
        }
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }

    if (name === 'companyName') {
      setFormData((prev) => ({
        ...prev,
        company: { ...prev.company, name: value }
      }));
      if (errors.companyName) {
        setErrors((prev) => ({ ...prev, companyName: null }));
      }
    } else if (['street', 'city', 'zipcode'].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [name]: value }
      }));
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: null }));
      }
    } else if (['lat', 'lng'].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          geo: { ...prev.address.geo, [name]: value }
        }
      }));
      const geoErrKey = name === 'lat' ? 'latitude' : 'longitude';
      if (errors[geoErrKey]) {
        setErrors((prev) => ({ ...prev, [geoErrKey]: null }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      address: {
        ...formData.address,
        geo: {
          lat: formData.address.geo.lat !== '' ? Number(formData.address.geo.lat) : undefined,
          lng: formData.address.geo.lng !== '' ? Number(formData.address.geo.lng) : undefined
        }
      }
    };

    const validationErrors = validateUser(payload);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstErrorKey = Object.keys(validationErrors)[0];
      const element = document.getElementById(firstErrorKey === 'companyName' ? 'companyName' : firstErrorKey);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {apiError && (
        <div className="alert alert-danger d-flex align-items-center gap-2 mb-4 py-3" role="alert">
          <AlertCircle size={18} className="flex-shrink-0" />
          <div>
            <span className="fw-semibold">Error:</span> {apiError.message || 'Unable to save user data.'}
            {apiError.details && (
              <ul className="mb-0 mt-1 small ps-3">
                {Object.entries(apiError.details).map(([key, msg]) => (
                  <li key={key}>{msg}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      <div className="row g-4">
        <div className="col-12 col-lg-6">
          <div className="uh-card h-100">
            <h5 className="fs-6 fw-bold border-bottom pb-2 mb-3">Personal & Company Information</h5>

            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              placeholder="e.g. Arjun Menon"
              required
              disabled={isLoading}
            />

            <Input
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="e.g. arjun.menon@northstar.com"
              required
              disabled={isLoading}
            />

            <Input
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              placeholder="e.g. +91-944-712-3456"
              required
              disabled={isLoading}
            />

            <Input
              label="Company Name"
              name="companyName"
              value={formData.company.name}
              onChange={handleChange}
              error={errors.companyName}
              placeholder="e.g. Northstar Technologies"
              required
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="uh-card h-100">
            <h5 className="fs-6 fw-bold border-bottom pb-2 mb-3">Address & Coordinates</h5>

            <Input
              label="Street Address"
              name="street"
              value={formData.address.street}
              onChange={handleChange}
              error={errors.street}
              placeholder="e.g. 12 Old Mahabalipuram Road"
              required
              disabled={isLoading}
            />

            <div className="row">
              <div className="col-md-7">
                <Input
                  label="City"
                  name="city"
                  value={formData.address.city}
                  onChange={handleChange}
                  error={errors.city}
                  placeholder="e.g. Chennai"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="col-md-5">
                <Input
                  label="Zipcode"
                  name="zipcode"
                  value={formData.address.zipcode}
                  onChange={handleChange}
                  error={errors.zipcode}
                  placeholder="e.g. 600096"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <Input
                  label="Latitude (Optional)"
                  name="lat"
                  type="number"
                  step="any"
                  value={formData.address.geo.lat}
                  onChange={handleChange}
                  error={errors.latitude}
                  placeholder="e.g. 12.9716"
                  disabled={isLoading}
                />
              </div>
              <div className="col-md-6">
                <Input
                  label="Longitude (Optional)"
                  name="lng"
                  type="number"
                  step="any"
                  value={formData.address.geo.lng}
                  onChange={handleChange}
                  error={errors.longitude}
                  placeholder="e.g. 80.2454"
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 border-top pt-3 d-flex justify-content-end gap-2">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
        >
          {submitText}
        </Button>
      </div>
    </form>
  );
};

export default UserForm;
