import { Save } from 'lucide-react';
import { useState } from 'react';

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  address: ''
};

function validate(values) {
  const errors = {};

  if (values.name.trim().length < 2) errors.name = 'Name must be at least 2 characters';
  if (!/^\S+@\S+\.\S+$/.test(values.email)) errors.email = 'Enter a valid email address';
  if (!/^[0-9+\-\s()]{7,20}$/.test(values.phone)) errors.phone = 'Enter a valid phone number';
  if (values.address.trim().length < 5) errors.address = 'Address must be at least 5 characters';

  return errors;
}

function RecordForm({ initialValues = emptyForm, onSubmit, submitLabel = 'Save Record', loading }) {
  const [values, setValues] = useState({ ...emptyForm, ...initialValues });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    onSubmit({
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      address: values.address.trim()
    });
  };

  return (
    <form className="record-form" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <label>
          <span>Name</span>
          <input name="name" value={values.name} onChange={handleChange} placeholder="Aarav Sharma" />
          {errors.name && <small>{errors.name}</small>}
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" value={values.email} onChange={handleChange} placeholder="aarav@example.com" />
          {errors.email && <small>{errors.email}</small>}
        </label>
        <label>
          <span>Phone</span>
          <input name="phone" value={values.phone} onChange={handleChange} placeholder="+91 98765 43210" />
          {errors.phone && <small>{errors.phone}</small>}
        </label>
        <label className="full">
          <span>Address</span>
          <textarea name="address" rows="5" value={values.address} onChange={handleChange} placeholder="Street, city, state" />
          {errors.address && <small>{errors.address}</small>}
        </label>
      </div>
      <div className="form-actions">
        <button type="submit" className="btn primary" disabled={loading}>
          <Save size={17} />
          {loading ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  );
}

export default RecordForm;
