import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOriginalUrlDetails } from "../services/api";
import { ThreeDots } from "react-loader-spinner";

const RedirectPage = () => {
  const { shortCode } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUrlDetails = async () => {
      try {
        const response = await getOriginalUrlDetails(shortCode);
        const { originalUrl, status } = response.data;

        if (status === 0) {
          setError("This link is inactive.");
          setTimeout(() => navigate("/"), 3000); // Redirect after 3 seconds
        } else {
          window.location.href = originalUrl;
        }
      } catch (error) {
        // Check if the error response contains a message from the backend
        const errorMessage =
          error.response?.data?.message ||
          "Failed to retrieve the link. Redirecting...";
        setError(errorMessage); // Set the error message from the backend
        setTimeout(() => navigate("/"), 3000); // Redirect after 3 seconds
      } finally {
        setLoading(false);
      }
    };

    fetchUrlDetails();
  }, [shortCode, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen flex-col">
      <ThreeDots color="#06b6d4"/>
      <div className="text-center">
        {loading ? (
          <p className="text-lg font-medium text-gray-700">Redirecting...</p>
        ) : (
          <p className="text-lg font-medium text-gray-700">
            {error || "Redirecting..."}
          </p>
        )}
      </div>
    </div>
  );
};

export default RedirectPage;
