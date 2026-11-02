export function generateOtp(){
  return Math.floor(100000 + Math.random() * 900000);
}

export function getOtpHTML(otp){
  return `
    <div style="font-family: Arial, sans-serif; text-align: center;">
      <h2>Your OTP Code</h2>
      <p style="font-size: 24px; font-weight: bold;">${otp}</p>
      <p>Please use this code to complete your verification process.</p>
    </div>
  `;
}

