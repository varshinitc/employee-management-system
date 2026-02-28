import React, { useState, useEffect } from 'react';
import { employeeAPI } from '../services/api';
import Navbar from '../components/Navbar';

const EmployeeDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await employeeAPI.getProfile();
      setProfile(data);
      setFormData({
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone,
      });
    } catch (err) {
      console.error('Failed to fetch profile', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await employeeAPI.updateProfile(formData);
      fetchProfile();
      setEditing(false);
      alert('Profile updated successfully');
    } catch (err) {
      alert('Update failed');
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="profile-card">
          <h2>My Profile</h2>
          {!editing ? (
            <>
              <div className="profile-info">
                <div className="info-row">
                  <span className="info-label">Name:</span>
                  <span className="info-value">{profile.first_name} {profile.last_name}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Email:</span>
                  <span className="info-value">{profile.email}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Phone:</span>
                  <span className="info-value">{profile.phone || 'N/A'}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Department:</span>
                  <span className="info-value">{profile.department || 'N/A'}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Position:</span>
                  <span className="info-value">{profile.position || 'N/A'}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Role:</span>
                  <span className="info-value">{profile.role}</span>
                </div>
              </div>
              <button className="btn" onClick={() => setEditing(true)}>Edit Profile</button>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  value={formData.first_name}
                  onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  value={formData.last_name}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <button type="submit" className="btn">Save Changes</button>
              <button type="button" className="btn btn-danger" onClick={() => setEditing(false)}>
                Cancel
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default EmployeeDashboard;
