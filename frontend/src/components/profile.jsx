// ProfilePage.js

import React, { useState, useContext,useEffect } from 'react';
import UserContext from "../context/userContext";
import './profile.css'; // Import CSS file

const Profile = () => {
  const [profileData, setProfileData] = useState(null); // State to store profile data
  const {authTokens}=useContext(UserContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    // Add more fields as needed
  });
  // var formdata = {};
  // formdata['firstName']=eskjdhgv;

  useEffect(() => {
    // Fetch profile data from backend when component mounts
    // Replace this with your actual API call to fetch profile data
    const fetchProfileData = async () => {
      try {
        // Example API call to fetch profile data
        console.log(" getting profile data");
        console.log(authTokens);
        console.log(authTokens.access);
        const response = await fetch('http://127.0.0.1:8000/api/v1/auth/profile/farmer/',{
          headers:{
            Authorization:"Bearer "+authTokens.access
          }
        });
        const data = await response.json();
        console.log(data);
        await setProfileData(data); // Set profile data received from the backend
      }
      catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData(); // Call the function to fetch profile data
    console.log(profileData);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Example API call to update profile data
      const response = await fetch('/api/profile/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        // Profile updated successfully
        console.log('Profile updated successfully');
        // Update profileData state with the updated profile data
        setProfileData(formData);
      } else {
        // Error updating profile
        console.error('Error updating profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="profile-page">
      <h1>My Profile</h1>
      {profileData ? (
        <>
          {/* <form onSubmit={handleSubmit}>
            <div className="profile-form">
              <h2>Update Profile</h2>
              <div>
                <label htmlFor="firstName">First Name:</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName || profileData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName || profileData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email || profileData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit">Update Profile</button>
            </div> 
          </form>*/}
          <div className="profile-details">
            <h2>Profile Details</h2>
            <div>
              <label>First Name:</label>
              <span>{profileData.first_name}</span>
            </div>
            <div>
              <label>Last Name:</label>
              <span>{profileData.last_name}</span>
            </div>
            <div>
              <label>Region:</label>
              <span>{profileData.region}</span>
            </div>
            {/* Add more fields as needed */}
          </div>
        </>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
