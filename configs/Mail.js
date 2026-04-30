import nodemailer from "nodemailer";
import dotenv from "dotenv";
import juice from "juice"; // Make sure to install this: npm install juice

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

const sendMail = async (to, otp) => {
  const htmlTemplate = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset OTP</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet">
    <style>
      /* --- The core Tailwind CSS styles are pasted here --- */
      *,:after,:before{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji"}body{margin:0;line-height:inherit}h1,h2,p{margin:0}h1,h2{font-size:inherit;font-weight:inherit}.mx-auto{margin-left:auto;margin-right:auto}.mb-1{margin-bottom:.25rem}.mb-2{margin-bottom:.5rem}.mb-4{margin-bottom:1rem}.mb-6{margin-bottom:1.5rem}.mt-6{margin-top:1.5rem}.max-w-xl{max-width:36rem}.overflow-hidden{overflow:hidden}.rounded-xl{border-radius:.75rem}.rounded-lg{border-radius:.5rem}.border{border-width:1px}.border-dashed{border-style:dashed}.border-gray-200{--tw-border-opacity:1;border-color:rgb(229 231 235/var(--tw-border-opacity))}.border-gray-300{--tw-border-opacity:1;border-color:rgb(209 213 219/var(--tw-border-opacity))}.border-t{border-top-width:1px}.bg-black{--tw-bg-opacity:1;background-color:rgb(0 0 0/var(--tw-bg-opacity))}.bg-gray-100{--tw-bg-opacity:1;background-color:rgb(243 244 246/var(--tw-bg-opacity))}.bg-white{--tw-bg-opacity:1;background-color:rgb(255 255 255/var(--tw-bg-opacity))}.bg-gray-50{--tw-bg-opacity:1;background-color:rgb(249 250 251/var(--tw-bg-opacity))}.p-4{padding:.9rem}.p-6{padding:1.5rem}.text-center{text-align:center}.text-xs{font-size:.75rem;line-height:1rem}.text-sm{font-size:.875rem;line-height:1.25rem}.text-2xl{font-size:1.5rem;line-height:2rem}.text-3xl{font-size:1.875rem;line-height:2.25rem}.text-4xl{font-size:2.25rem;line-height:2.5rem}.font-bold{font-weight:700}.tracking-widest{letter-spacing:.1em}.text-black{--tw-text-opacity:1;color:rgb(0 0 0/var(--tw-text-opacity))}.text-gray-500{--tw-text-opacity:1;color:rgb(107 114 128/var(--tw-text-opacity))}.text-gray-700{--tw-text-opacity:1;color:rgb(55 65 81/var(--tw-text-opacity))}.text-gray-900{--tw-text-opacity:1;color:rgb(17 24 39/var(--tw-text-opacity))}.text-white{--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity))}.shadow-lg{--tw-shadow:0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -4px rgba(0,0,0,.1);--tw-shadow-colored:0 10px 15px -3px var(--tw-shadow-color),0 4px 6px -4px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}@media (min-width:640px){.sm\\:p-6{padding:1.5rem}.sm\\:p-10{padding:2.5rem}}
      /* Custom styles */
      body { font-family: 'Inter', sans-serif; }
    </style>
  </head>
  <body class="bg-gray-100 p-4 sm:p-6">
    <div class="max-w-xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div class="bg-black text-white text-center p-6">
        <h1 class="text-3xl font-bold">Expansify</h1>
      </div>
      <div class="p-6 sm:p-10 text-gray-700">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Password Reset Request</h2>
        <p class="mb-4">Hi there,</p>
        <p class="mb-6">We received a request to reset the password for your Expansify account. Please use the One-Time Password (OTP) below to proceed.</p>
        <div class="bg-gray-50 border-dashed border-gray-300 border rounded-lg p-6 text-center mt-6 mb-6">
          <p class="text-sm text-gray-500 mb-2">Your One-Time Password is:</p>
          <p class="text-4xl font-bold tracking-widest text-black">${otp}</p>
        </div>
        <p class="text-sm text-gray-500 text-center mb-6">This code is valid for 5 minutes.</p>
        <p class="mb-4">If you did not request a password reset, please ignore this email.</p>
        <p>Thanks,<br><strong>The Expansify Team</strong></p>
      </div>
      <div class="bg-gray-50 text-gray-500 text-center text-xs p-6 border-t border-gray-200">
        <p class="mb-1">© ${new Date().getFullYear()} Expansify. All rights reserved.</p>
        <p>123 Business Rd, Suite 100, Cityville</p>
      </div>
    </div>
  </body>
  </html>
  `;

  const inlinedHtml = juice(htmlTemplate);

  try {
    await transporter.sendMail({
      from: `Expansify <${process.env.EMAIL}>`,
      to: to,
      subject: "Reset Your Password",
      html: inlinedHtml, // Use the inlined version
    });
    console.log(`Email sent successfully to ${to}`);
  } catch (error) {
    console.error("Failed to send email:", error);
  }
};

export default sendMail;

