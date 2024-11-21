import React, { useState } from "react";
import { useAuth } from "../../provider/AuthProvider";
import { registerUser } from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { FaCheckCircle } from "react-icons/fa";
import {
  Button,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    purpose: "Personal",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      label: "Name",
      name: "name",
      type: "text",
      placeholder: "Enter your name",
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Enter your email",
    },
    {
      label: "Purpose",
      name: "purpose",
      type: "select",
      options: ["Personal", "Business"],
    },
    {
      label: "Phone",
      name: "phone",
      type: "tel",
      placeholder: "Enter your phone number",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Enter your password",
      isPassword: true,
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    if (loading) return; // Prevent next steps during loading

    const currentField = steps[activeStep];
    const value = formData[currentField.name]?.trim();

    if (!value) {
      toast.error(`${currentField.label} cannot be empty.`);
      return;
    }

    if (currentField.name === "phone" && !/^\d{10}$/.test(value)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }

    setActiveStep((prev) => prev + 1);
  };

  const handlePreviousStep = () => {
    if (loading) return; // Prevent going back during loading
    setActiveStep((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await registerUser(formData);
      toast.success("Registration successful!");
      login(data.token, formData.email);
      navigate("/");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to register. Please try again.";
      toast.error(errorMessage);
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
        {/* Header */}
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
            Create your account
          </Typography>
        </div>

        {/* Steps */}
        <div className="flex items-center justify-between mt-6 mb-8">
          {steps.map((step, index) => (
            <div key={step.name} className="flex items-center space-x-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activeStep >= index
                    ? "bg-black text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                {activeStep > index ? <FaCheckCircle /> : index + 1}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-1 w-6 ${
                    activeStep > index ? "bg-black" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-6">
          {steps.map(
            (step, index) =>
              activeStep === index && (
                <div key={step.name}>
                  {step.type === "select" ? (
                    <Select
                      id={step.name}
                      name={step.name}
                      label={step.label}
                      variant="standard"
                      value={formData[step.name]}
                      onChange={handleChange}
                      required
                    >
                      {step.options.map((option) => (
                        <Option key={option} value={option}>
                          {option}
                        </Option>
                      ))}
                    </Select>
                  ) : (
                    <div className="relative mt-2">
                      <Input
                        id={step.name}
                        name={step.name}
                        label={step.label}
                        variant="standard"
                        type={
                          step.isPassword
                            ? showPassword
                              ? "text"
                              : "password"
                            : step.type
                        }
                        placeholder={step.placeholder}
                        value={formData[step.name]}
                        onChange={handleChange}
                        required
                      />
                      {step.isPassword && (
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute right-3 top-2/4 transform -translate-y-1/2 text-gray-400 hover:text-black focus:outline-none focus:text-black"
                          aria-label={
                            showPassword ? "Hide Password" : "Show Password"
                          }
                        >
                          {showPassword ? <LuEyeOff /> : <LuEye />}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )
          )}

          {/* Buttons */}
          <div
            className={`${
              activeStep > 0 ? "gap-4" : "gap-0"
            } flex justify-between items-center`}
          >
            {activeStep > 0 && (
              <Button
                type="button"
                onClick={handlePreviousStep}
                className="w-full rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                disabled={loading}
              >
                Previous
              </Button>
            )}
            {activeStep < steps.length - 1 ? (
              <Button
                type="button"
                onClick={handleNextStep}
                className="w-full rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                disabled={loading}
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                disabled={loading}
              >
                {loading ? "Registering..." : "Sign Up"}
              </Button>
            )}
          </div>
        </form>

        {/* Footer */}
        <Typography variant="small" className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link to={"/auth/login"} className="text-black hover:underline">
            Login
          </Link>
        </Typography>
      </div>
    </div>
  );
}

export default Register;
