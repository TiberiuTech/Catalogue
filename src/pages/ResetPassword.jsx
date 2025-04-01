import React, { useState } from "react";

function ResetPassword() {
  const [email, setEmail] = useState("");

  return (
    <div>
      <h2>Reset Password</h2>
      <input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button>Send Reset Link</button>
    </div>
  );
}

export default ResetPassword;
