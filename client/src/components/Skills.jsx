// Skills.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');

  useEffect(() => {
    // Fetch existing skills from the backend
    axios.get('/api/skills')
      .then(response => setSkills(response.data))
      .catch(error => console.error('Error fetching skills:', error));
  }, []);

  const handleAddSkill = () => {
    if (!skillInput) return;
    axios.post('/api/skills', { name: skillInput })
      .then(response => {
        setSkills([...skills, response.data]);
        setSkillInput('');
      })
      .catch(error => console.error('Error adding skill:', error));
  };

  return (
    <div>
      <h2>Skills</h2>
      <input
        type="text"
        value={skillInput}
        onChange={e => setSkillInput(e.target.value)}
        placeholder="Enter a new skill"
      />
      <button onClick={handleAddSkill}>Add Skill</button>
      <ul>
        {skills.map(skill => (
          <li key={skill.id}>{skill.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Skills;
