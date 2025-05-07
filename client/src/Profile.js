import React, { useEffect, useState } from 'react';
import axios from './axios';

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get('/profile');
        setProfile(data);
      } catch (err) {
        console.error('Error fetching profile', err);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div>
      {profile ? (
        <div>
          <h2>{profile.name}</h2>
          <p>{profile.email}</p>
          {/* Add form to edit profile */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
