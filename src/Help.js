import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import "./Help.css";

const Help = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [successPhoneMessage, setSuccessPhoneMessage] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [successEmailMessage, setSuccessEmailMessage] = useState("");
  const [issueDescription, setIssueDescription] = useState("");

  const topics = [
    { value: "", label: "Select a topic", disabled: true },
    { value: "Cancellation", label: "Cancellation" },
    { value: "Design Information", label: "Design Information" },
    { value: "Order Status", label: "Order Status" },
    { value: "General Inquiry", label: "General Inquiry" },
    { value: "Billing", label: "Billing" },
    { value: "Technical Support", label: "Technical Support" },
    { value: "Other", label: "Other" },
  ];

  const openModal = (modalType) => {
    if (modalType === "callback") {
      setIsModalOpen(true);
    } else if (modalType === "email") {
      setIsEmailModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };
  const resetForm = () => {
    setPhone("");
    setPhoneError("");
    setSuccessPhoneMessage("");
    setError("");
    setSuccessMessage("");
    setSelectedTopic("");
    setFirstName("");
    setLastName("");
  };

  const closeEmailModal = () => {
    setIsEmailModalOpen(false);
    resetEmailForm();
    setFirstName("");
    setLastName("");
    setIssueDescription("");
  };

  const resetEmailForm = () => {
    setEmailError("");
    setSuccessEmailMessage("");
  };

  const validatePhoneNumberWithAPI = async (phone) => {
    try {
      const formattedPhone = `+1${phone}`;
      const response = await axios.get(
        `https://phonevalidation.abstractapi.com/v1/?api_key=${process.env.REACT_APP_ABSTRACT_PHONE_API_KEY}&phone=${formattedPhone}`
      );

      if (
        response.data &&
        response.data.valid &&
        response.data.country.code === "US"
      ) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Phone number validation API error:", error);
      return false;
    }
  };

  const handlePhoneChange = (event) => {
    let input = event.target.value;
    input = input.replace(/^\+1|\+/, "");
    setPhone(input);
    setPhoneError("");
  };

  const handleTopicChange = (event) => {
    setSelectedTopic(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPhoneError("");
    setSuccessPhoneMessage("");

    if (selectedTopic === "" || selectedTopic === "Select a topic") {
      setError("Please select a topic for your call.");
      return;
    }
    const isValid = await validatePhoneNumberWithAPI(phone);

    if (!isValid) {
      setPhoneError("Please enter a valid United States phone number.");
      return;
    }
    const formData = new FormData();
    formData.append("first-name", firstName);
    formData.append("last-name", lastName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("topic", selectedTopic);

    try {
      const response = await fetch("https://formspree.io/f/mpwzwwlj", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.status === 200) {
        setSuccessPhoneMessage(
          `We’ll call you back at this number: +1 ${phone} regarding ${selectedTopic}`
        );
        setPhone("");
        setError("");
        setTimeout(() => {
          closeModal();
        }, 5000);
      }
    } catch (error) {
      setPhoneError(
        "There was an error submitting your phone number. Please try again."
      );
      setSuccessMessage("");
    }
  };

  const validateEmailWithAPI = async (email) => {
    try {
      const response = await axios.get(
        `https://emailvalidation.abstractapi.com/v1/?api_key=${process.env.REACT_APP_ABSTRACT_API_KEY}&email=${email}`
      );

      console.log("Email validation response:", response.data);

      if (
        response.data &&
        response.data.is_valid_format &&
        response.data.is_valid_format.value &&
        response.data.is_smtp_valid &&
        response.data.is_smtp_valid.value
      ) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Email validation API error:", error);
      return false;
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setSuccessEmailMessage("");

    const isValid = await validateEmailWithAPI(email);

    if (!isValid) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("first-name", firstName);
    formData.append("last-name", lastName);
    formData.append("issue", issueDescription);

    try {
      const response = await fetch("https://formspree.io/f/xrbgbbjo", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.status === 200) {
        setSuccessEmailMessage("Your email has been submitted successfully.");
        setEmail("");
        setEmailError("");
        setTimeout(() => {
          closeEmailModal();
        }, 5000);
      }
    } catch (error) {
      setEmailError(
        "There was an error submitting your email. Please try again."
      );
    }
  };

  return (
    <div className="help">
      <Navbar />
      <div className="tracking-section">
        <h1>
          Need help tracking an order?{" "}
          <a href="./order">Find and Track your Order</a>
        </h1>
      </div>
      <div className="help-section">
        <h1 className="contacts">Contact Us</h1>
        <div className="Phone">
          <h2>Phone</h2>
          <p>
            Availability: <br />
            Mon-Sun from 11:00AM - 11:00PM EST
          </p>
          <p>
            Please complete a call request, and we’ll get back to you within a
            minute.
          </p>
          <button id="requestCallbackBtn" onClick={() => openModal("callback")}>
            Request Callback
          </button>

          {isModalOpen && (
            <div id="callbackModal" className="modal">
              <div className="modal-content">
                <span className="close" onClick={closeModal}>
                  &times;
                </span>
                <h2>Request a Callback</h2>
                <p>Fill out this form and we'll get back to you.</p>
                <form id="callbackForm" onSubmit={handleSubmit}>
                  <label htmlFor="first-name">First Name*</label>
                  <input
                    type="text"
                    id="first-name"
                    name="first-name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                  <br />
                  <br />
                  <label htmlFor="last-name">Last Name*</label>
                  <input
                    type="text"
                    id="last-name"
                    name="last-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                  <br />
                  <br />
                  <label htmlFor="phone">Phone Number*</label>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span>+1</span>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder="1234567890"
                      required
                      style={{ marginLeft: "5px" }}
                    />
                  </div>

                  {phoneError && (
                    <p style={{ color: "red", margin: "0", padding: "0" }}>
                      {phoneError}
                    </p>
                  )}
                  {successPhoneMessage && (
                    <p style={{ color: "green", margin: "0", padding: "0" }}>
                      {successPhoneMessage}
                    </p>
                  )}

                  <br />
                  <label htmlFor="time">Preferred Call Time</label>
                  <input type="time" id="time" name="time" />
                  <br />
                  <br />
                  <label htmlFor="topic">Reason for Call*</label>
                  <select
                    id="topic"
                    name="topic"
                    value={selectedTopic}
                    onChange={handleTopicChange}
                    required>
                    {topics.map((topic, index) => (
                      <option
                        key={index}
                        value={topic.value}
                        disabled={topic.disabled}>
                        {topic.label}
                      </option>
                    ))}
                  </select>

                  {error && (
                    <p style={{ color: "red", margin: "0", padding: "0" }}>
                      {error}
                    </p>
                  )}

                  <button type="submit">Submit</button>

                  {successMessage && (
                    <p style={{ color: "green", margin: "0", padding: "0" }}>
                      {successMessage}
                    </p>
                  )}
                </form>
              </div>
            </div>
          )}
        </div>

        <div className="email">
          <h2>Email</h2>
          <p>
            Please email us at:{" "}
            <a href="mailto:letsprint003@gmail.com" className="emailLink">
              letsprint003@gmail.com
            </a>
            <br /> or <br />
            Fill out the email form, and we’ll get back to you within 24 hours.
          </p>
          <button id="requestEmailBtn" onClick={() => openModal("email")}>
            Email Us
          </button>
          {isEmailModalOpen && (
            <div id="emailModal" className="modal">
              <div className="modal-content">
                <span className="close" onClick={closeEmailModal}>
                  &times;
                </span>
                <h2>Email Form</h2>
                <p>
                  Fill out this form and we'll get back to you within 24 hours.
                </p>
                <form id="emailForm" onSubmit={handleEmailSubmit}>
                  <label htmlFor="first-name">First Name*</label>
                  <input
                    type="text"
                    id="first-name"
                    name="first-name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                  <br />
                  <br />
                  <label htmlFor="last-name">Last Name*</label>
                  <input
                    type="text"
                    id="last-name"
                    name="last-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                  <br />
                  <br />
                  <label htmlFor="email">Email*</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                  {emailError && (
                    <p style={{ color: "red", marginTop: "5px" }}>
                      {emailError}
                    </p>
                  )}
                  {successEmailMessage && (
                    <p style={{ color: "green", marginTop: "5px" }}>
                      {successEmailMessage}
                    </p>
                  )}
                  <br />
                  <br />
                  <label htmlFor="issue">Describe the Issue*</label>
                  <input
                    type="text"
                    id="issue"
                    name="issue"
                    value={issueDescription}
                    onChange={(e) => setIssueDescription(e.target.value)}
                    required
                  />
                  <br />
                  <br />
                  <button type="submit">Submit</button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="FAQ-section"></div>
      <Footer />
    </div>
  );
};

export default Help;
