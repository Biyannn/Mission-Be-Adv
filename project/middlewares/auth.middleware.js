const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ success: false, message: "Token tidak ditemukan" });

  const [type, token] = header.split(" ");
  if (type !== "Bearer" || !token) {
    return res.status(401).json({ success: false, message: "Format token salah" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // sekarang controller bisa memakai req.user
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Token invalid" });
  }
};
