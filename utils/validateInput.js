export const validateRegisterInput = ({ name, email, password }) => {
  if (!name || !email || !password) return false;
  return true;
};

export const validateLoginInput = ({ email, password }) => {
  if (!email || !password) return false;
  return true;
};
