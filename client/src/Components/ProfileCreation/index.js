import './index.scss';
import React, { useState } from 'react';

const ProfileCreation = () => {

        const [formData, setFormData] = useState({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          reenterPassword: '',
        });
        const [passwordMatchError, setPasswordMatchError] = useState(false);
        const [passwordRequirementsMet, setPasswordRequirementsMet] = useState(true);
      
        const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData((prevData) => ({
            ...prevData,
            [name]: value,
          }));

          if (name === 'password' || name === 'reenterPassword') {
            setPasswordMatchError(false);
            validatePassword(value);
          }
        };

        const validatePassword = (password) => {
            const requirementsMet =
              password.length >= 8 &&
              /[A-Z]/.test(password) &&
              /[!@#$%^&*(),.?":{}|<>]/.test(password);
        
            setPasswordRequirementsMet(requirementsMet);
        };
      
        const handleSubmit = (e) => {
            e.preventDefault();
        
            if (formData.password !== formData.reenterPassword) {
              setPasswordMatchError(true);
              return;
            }
        
            console.log('Form data submitted:', formData);
        };
        

    return (
        <div className='profileCreation-page'>
            <form className='form' onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                <label>
                    <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    <input
                    type="password"
                    name="reenterPassword"
                    placeholder="Re-Enter Password"
                    value={formData.reenterPassword}
                    onChange={handleChange}
                    />
                </label>
                <br />
                <small>
                    Password requirements:
                    <ul>
                    <li>8 characters long</li>
                    <li>At least one uppercase letter</li>
                    <li>At least one special character</li>
                    </ul>
                </small>
                {passwordMatchError && <p style={{ color: 'red' }}>Passwords do not match</p>}
                {!passwordRequirementsMet && (
                    <p style={{ color: 'red' }}>Password requirements are not met</p>
                )}
                <br />
                <button type="submit">Create Profile</button>
            </form>
        </div>
    );

}

export default ProfileCreation