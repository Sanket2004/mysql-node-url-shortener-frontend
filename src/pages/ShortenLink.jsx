import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { shortenUrl } from "../services/api";
import {
  Card,
  CardBody,
  Typography,
  Button,
  Input,
  Chip,
  CardHeader,
} from "@material-tailwind/react";
import { RiLink } from "react-icons/ri";
import { toast } from "react-hot-toast";

const ShortenLink = () => {
  const [url, setUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) {
      setMessage("Please enter a valid URL.");
      return;
    }

    try {
      const response = await shortenUrl(url, customSlug);
      const backendMessage =
        response.data.message || "URL shortened successfully!";
      const shortenedUrl = `${window.location.protocol}//${window.location.host}/${response.data.shortUrl}`;
      toast.success(backendMessage);
      setMessage(`Shortened URL: ${shortenedUrl}`);
      setUrl("");
      setCustomSlug("");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setMessage(`Error: ${error.response.data.message}`);
      } else {
        setMessage("Failed to shorten the URL. Please try again.");
      }
      console.error("Error shortening URL:", error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-8">
        {/* Left Section */}
        <div className="lg:w-1/2 flex items-start h-full justify-center">
          <div className="bg-gradient-to-r from-black to-gray-800 p-12 rounded-lg shadow-lg text-white w-full min-h-[300px] lg:min-h-[400px] flex flex-col justify-start">
            <Typography
              variant="h2"
              className="font-black mb-4 text-start tracking-wide"
            >
              Supercharge Your URLs
            </Typography>
            <Typography variant="small" className="text-gray-300 text-start">
              Create shortened, trackable, and branded URLs with ease. Enhance
              your marketing with detailed analytics and custom slugs.
            </Typography>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Chip
                value="Custom Slugs"
                variant="filled"
                className="bg-gray-800"
              />
              <Chip
                value="Analytics"
                variant="filled"
                className="bg-gray-800"
              />
              <Chip
                value="Free Forever"
                variant="filled"
                className="bg-gray-800"
              />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:w-1/2 flex items-center h-full">
          <Card className="p-6 w-full min-h-[300px] lg:min-h-[400px] shadow-lg flex flex-col justify-center">
            <CardHeader className="shadow-none mt-2">
              <Typography
                variant="h4"
                className="font-black text-gray-800 text-start"
              >
                Shorten Your URL
              </Typography>
              <Typography variant="small" className="mb-4">
                Beautify your long ugly URLs.
              </Typography>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <Input
                    type="url"
                    label="Enter URL"
                    variant="standard"
                    color="gray"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com"
                    required
                    icon={<RiLink />}
                  />
                </div>
                <div className="mb-4">
                  <Input
                    type="text"
                    variant="standard"
                    color="gray"
                    label="Custom Slug (optional)"
                    value={customSlug}
                    onChange={(e) => setCustomSlug(e.target.value)}
                    placeholder="custom-slug"
                  />
                </div>
                <Button type="submit" size="lg" className="w-full">
                  Shorten Link
                </Button>
              </form>
              {message && (
                <Typography
                  variant="small"
                  className="mt-4 text-center font-bold"
                >
                  {message}
                </Typography>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShortenLink;
