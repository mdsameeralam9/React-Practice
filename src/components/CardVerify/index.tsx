import React from 'react';
import './VerifyAccount.css';

const VerifyAccount = () => {
  return (
    <div className="verify-container">
      <h2>Verify Your Account</h2>
      <p>
        We sent a verification code to john..@gmail.com<br />
        Please check your email and paste the code below.
      </p>
      <div className="code-inputs">
        {[...Array(6)].map((_, index) => (
          <input key={index} type="text" maxLength="1" />
        ))}
      </div>
      <button className="verify-button">VERIFY</button>
      <p className="resend-text">
        Didn't receive the code? <a href="#">Resend</a>
      </p>
    </div>
  );
};

export default VerifyAccount;
