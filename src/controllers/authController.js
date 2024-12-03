const handleAuthRedirect = (req, res) => {
  const user = req.user;

  if (!user.isProfileComplete) {
    res.redirect(`/profile/complete?userId=${user.id}`);
  } else {
    res.redirect('/dashboard');
  }
};

module.exports = {
  handleAuthRedirect,
};
