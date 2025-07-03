export const isAdmin = (req, res, next) => {
  console.log("User dari token:", req.user); // Lihat apakah role ada
  if (req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ message: "Admin Only Access" });
};
