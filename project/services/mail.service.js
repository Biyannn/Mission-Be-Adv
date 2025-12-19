const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_PORT == 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// cek koneksi smtp saat startup
transporter
  .verify()
  .then(() => console.log("SMTP ready"))
  .catch((err) => console.error("SMTP error:", err));

async function sendVerificationEmail(toEmail, name, token) {
  const verifyUrl = `${
    process.env.APP_URL || "http://localhost:3000"
  }/auth/verify?token=${token}`;
  const html = `
    <p>Hi, ${name}</p>
    <p>Silakan klik link berikut untuk verifikasi akun kamu:</p>
    <p><a href="${verifyUrl}">${verifyUrl}</a></p>
    <p>Jika kamu tidak membuat akun ini, abaikan.</p>
  `;

  const info = await transporter.sendMail({
    from: `"No Reply" <${process.env.SMTP_USER}>`,
    to: toEmail,
    subject: "Verify Your Account",
    html,
  });
  return info;
}

module.exports = {
  sendVerificationEmail,
};
