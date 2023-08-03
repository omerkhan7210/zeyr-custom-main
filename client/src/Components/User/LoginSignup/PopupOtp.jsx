import React from 'react'

const OtpPopup = ({ show, handleClose, handleVerifyOtp, otpCode, handleChange }) => {
  if (!show) return null;

  return (
    <div className="otp-popup-overlay">
      <div className="otp-popup-container">
        <button className="otp-popup-close-btn" onClick={handleClose}>
          &times;
        </button>
        <h4>Enter OTP</h4>
        <input
          type="text"
          className="otp-input"
          placeholder="Enter the OTP code sent to your email.."
          defaultValue=""
          onChange={handleChange}
          required
        />
        <button className="otp-verify-btn" onClick={handleVerifyOtp}>
          Verify OTP
        </button>
      </div>
    </div>
  );
};

export default OtpPopup;

