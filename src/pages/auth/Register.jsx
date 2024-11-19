import React, { useState } from "react";
import { useAuth } from "../../provider/AuthProvider";
import { registerUser } from "../../services/api";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Circles } from "react-loader-spinner"; // Importing the loader component

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [purpose, setPurpose] = useState("Personal");
  const [loading, setLoading] = useState(false); // New loading state
  const { login } = useAuth(); // Optional: Log in immediately after registration
  const handleRegister = async (e) => {
    e.preventDefault();
    const userData = { name, email, password, phone, purpose };
    setLoading(true); // Start the loader

    try {
      const { data } = await registerUser(userData);
      toast.success("Registration successful!");

      // Log in the user after successful registration
      login(data.token, userData.email);
    } catch (error) {
      console.error("Registration error", error);

      // Extract the error message from the backend response
      const errorMessage =
        error.response?.data?.message ||
        "Failed to register. Please try again.";
      toast.error(errorMessage);
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
        {loading ? ( // Show loader when loading
          <div className="flex justify-center">
            <Circles
              height="80"
              width="80"
              color="#06b6d4"
              ariaLabel="loading"
            />
          </div>
        ) : (
          <form onSubmit={handleRegister} className="space-y-6">
            <div className="md:flex gap-2 space-y-6 md:space-y-0 w-full">
              <div className="w-full">
                <label
                  htmlFor="name"
                  className="block text-sm/6 font-semibold text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:outline-none focus:ring-inset focus:ring-cyan-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div className="w-full">
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
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:outline-none focus:ring-inset focus:ring-cyan-600 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

            <div className="md:flex gap-2 space-y-6 md:space-y-0">
              <div className="flex-1">
                <label
                  htmlFor="purpose"
                  className="block text-sm/6 font-semibold text-gray-900"
                >
                  Purpose
                </label>
                <div className="mt-2 block w-full rounded-md border-0 text-gray-900 ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm/6">
                  <select
                    id="purpose"
                    name="purpose"
                    value={purpose}
                    required
                    onChange={(e) => setPurpose(e.target.value)}
                    className="py-[8px] px-1 w-full block rounded-md border-0 bg-transparent focus:outline-none ring-inset text-gray-500 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm"
                  >
                    <option value="Personal">Personal</option>
                    <option value="Business">Business</option>
                  </select>
                </div>
              </div>
              <div className="flex-1">
                <label
                  htmlFor="phone"
                  className="block text-sm/6 font-semibold text-gray-900"
                >
                  Phone number
                </label>
                <div className="mt-2 flex">
                  <div className="w-max rounded-s-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:outline-none focus:ring-inset focus:ring-cyan-600 sm:text-sm/6">
                    +91
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    autoComplete="phone"
                    className="block w-full rounded-e-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:outline-none focus:ring-inset focus:ring-cyan-600 sm:text-sm/6"
                  />
                </div>
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
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                Sign up
              </button>
            </div>
          </form>
        )}

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="font-semibold text-cyan-600 hover:text-cyan-500"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
