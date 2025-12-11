import { jwtDecode } from "jwt-decode";

const decode = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  const decoded = jwtDecode(token);
  return decoded;
};

export default decode;
