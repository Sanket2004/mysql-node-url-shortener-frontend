import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOriginalUrlDetails } from "../services/api";
import { ThreeDots } from "react-loader-spinner";
import { Card, Typography, Button, Chip } from "@material-tailwind/react";

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
        const errorMessage =
          error.response?.data?.message ||
          "Failed to retrieve the link. Redirecting...";
        setError(errorMessage);
        setTimeout(() => navigate("/"), 3000); // Redirect after 3 seconds
      } finally {
        setLoading(false);
      }
    };

    fetchUrlDetails();
  }, [shortCode, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 p-4">
      <Card className="w-full max-w-md p-8 bg-white shadow-lg text-center">
        <div className="mb-6 flex items-center justify-center">
          <ThreeDots height="80" width="80" color="#000000" />
        </div>
        {error ? (
          <>
            <Typography variant="h4" className="font-black mb-2 text-red-600">
              {error}
            </Typography>
            <Typography variant="small" color="gray" className="mb-4">
              You will be redirected shortly. If not, click the button below.
            </Typography>
            <Button size="md" onClick={() => navigate("/")} className="w-full">
              Go to Home
            </Button>
          </>
        ) : (
          <Typography
            variant="h5"
            color="gray"
            className="font-black mb-2 text-black"
          >
            Redirecting...
          </Typography>
        )}
      </Card>
    </div>
  );
};

export default RedirectPage;
