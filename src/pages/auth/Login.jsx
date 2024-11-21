import React, { useState, useEffect } from "react";
import { useAuth } from "../../provider/AuthProvider";
import { loginUser } from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { Button, Input, Typography } from "@material-tailwind/react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      toast.error("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const { data } = await loginUser(email, password);
      login(data.token, email);
      localStorage.setItem("email", email);
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      toast.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <Typography variant="h3" className="font-black text-gray-900">
            Go2
          </Typography>
          <Typography
            variant="paragraph"
            className="uppercase text-sm font-bold text-gray-500"
          >
            URL Shortener
          </Typography>
          <Typography variant="small" className="text-gray-600 mt-2">
            Login to access your account
          </Typography>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Input */}
          <div>
            <Input
              type="email"
              variant="standard"
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              className="outline-none"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              label="Password"
              value={password}
              variant="standard"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              className="outline-none"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-2/4 transform -translate-y-1/2 text-gray-400 hover:text-black focus:outline-none focus:text-black"
              aria-label={showPassword ? "Hide Password" : "Show Password"}
            >
              {showPassword ? <LuEyeOff size={18} /> : <LuEye size={18} />}
            </button>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            fullWidth
            color="black"
            className="mt-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        {/* Footer */}
        <Typography variant="small" className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/auth/register" className="text-black hover:underline">
            Create a now
          </Link>
        </Typography>
      </div>
    </div>
  );
}

export default Login;
