import { useState, useEffect } from 'react';

/**
 * UserForm Component
 * Demonstrates: Props, useState hook, useEffect hook, Controlled components
 * 
 * @param {object} initialData - Initial form data { name, email }
 * @param {number|null} editingId - ID of user being edited (null for new user)
 * @param {function} onSubmit - Callback function when form is submitted
 * @param {function} onCancel - Callback function when cancel is clicked
 */
function UserForm({ initialData = { name: '', email: '' }, editingId, onSubmit, onCancel }) {
  // useState hook to manage form state
  const [formData, setFormData] = useState(initialData);

  // useEffect hook to update form when initialData or editingId changes
  useEffect(() => {
    setFormData(initialData);
  }, [initialData, editingId]);

  // Handle input changes using controlled components
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Handle cancel action
  const handleCancel = () => {
    setFormData({ name: '', email: '' });
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-actions">
        <button type="submit">
          {editingId ? 'Update' : 'Add'} User
        </button>
        {editingId && (
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default UserForm;

