import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style.css";

export default function EditProfile() {
  const navigate = useNavigate();

  const storedCustomer = localStorage.getItem("customer");
  const customer = storedCustomer ? JSON.parse(storedCustomer) : null;
  const customerId = customer?.id;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  useEffect(() => {
    if (customerId) {
      axios
        .get(`http://localhost:3000/customer/${customerId}`)
        .then((response) => {
          const { name, email, contact, address } = response.data;
          setFormData({
            name: name || "",
            email: email || "",
            phone: contact || "",
            address: address || "",
            password: "",
          });
        })
        .catch((error) => {
          console.error("Error loading profile data:", error);
        });
    }
  }, [customerId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(`http://localhost:3000/customer/${customerId}`, {
        name: formData.name,
        contact: formData.phone,
        email: formData.email,
        address: formData.address,
        password: formData.password,
      });

      // Armazena o cliente atualizado no localStorage
      localStorage.setItem("customer", JSON.stringify(response.data));

      alert("Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile", error);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="edit-profile-container">
      <h1>Edit Your Profile</h1>
      <form className="edit-profile-form" onSubmit={handleFormSubmit}>
        <label>
          Full Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Email Address:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Phone Number:
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </label>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            Save Changes
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate("/profile")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
