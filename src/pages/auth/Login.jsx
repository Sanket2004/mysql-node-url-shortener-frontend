import React, { useState } from "react";
import { useAuth } from "../../provider/AuthProvider";
import { loginUser } from "../../services/api";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Circles } from "react-loader-spinner"; // Import the loader

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Start the loader

    try {
      const { data } = await loginUser(email, password);
      console.log(data);

      login(data.token, email);
      toast.success("Login successful!");
    } catch (error) {
      console.error("Login error", error);
      toast.error("Invalid credentials");
    } finally {
      setLoading(false); // Stop the loader
    }
  };

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm sticky top-0 bg-[#ffffffe6] pb-4">
        <h2 className="mt-10 text-center text-3xl/9 font-black tracking-tight text-cyan-600">
          Go2
        </h2>
        <h4 className="text-center mt-2 text-gray-500">URL Shortener</h4>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {loading ? ( // Show the loader when loading
          <div className="flex justify-center">
            <Circles
              height="80"
              width="80"
              color="#06b6d4"
              ariaLabel="loading"
            />
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-semibold text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:outline-none focus:ring-inset focus:ring-cyan-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-semibold text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-cyan-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
              >
                Sign in
              </button>
            </div>
          </form>
        )}

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Don't have an account?{" "}
          <Link
            to={"/register"}
            className="font-semibold text-cyan-600 hover:text-cyan-500"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
