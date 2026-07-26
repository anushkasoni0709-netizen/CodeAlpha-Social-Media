import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "https://codealpha-social-media-7fon.onrender.com/api/users/login",
        formData
      );

      alert(res.data.message);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h1 className="text-3xl font-bold text-center mb-6">
          Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
        >
          Login
        </button>

        <p className="text-center mt-4">
          Don't have an account?
          <span
            className="text-blue-600 cursor-pointer ml-1"
            onClick={() => navigate("/signup")}
          >
            Signup
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;