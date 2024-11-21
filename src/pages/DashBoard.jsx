import React, { useEffect, useState } from "react";
import { getAllUrls, updateUrlStatus, deleteUrl } from "../services/api";
import toast from "react-hot-toast";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useUser } from "../context/UserContext";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  Select,
  Option,
  IconButton,
  Input,
  Chip,
  ButtonGroup,
  Spinner,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { LuShare, LuQrCode, LuTrash2, LuX } from "react-icons/lu";
import QRCode from "react-qr-code";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
import {
  FaFax,
  FaHamburger,
  FaQrcode,
  FaRegUserCircle,
  FaShare,
  FaShareAlt,
  FaTrashAlt,
  FaUserCircle,
  FaXbox,
} from "react-icons/fa";
import { ProgressBar } from "react-loader-spinner";

function AreaChart({ data }) {
  return (
    <Chart
      type="area"
      height={90}
      series={[
        {
          name: "Visits",
          data: data, // Pass dynamic data here
        },
      ]}
      options={{
        chart: { toolbar: { show: false }, zoom: { enabled: false } },
        stroke: { curve: "smooth", width: 2 },
        grid: { show: false },
        xaxis: {
          labels: { show: false },
          axisTicks: { show: false },
          axisBorder: { show: false },
        },
        yaxis: {
          labels: {
            formatter: (value) => value.toFixed(0),
          },
        },
        tooltip: {
          y: {
            formatter: (value) => value.toFixed(0),
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.5,
            opacityTo: 0.2,
          },
        },
        colors: ["#000"],
      }}
    />
  );
}

function DashBoard() {
  const { user } = useUser();
  const [shortLinks, setShortLinks] = useState([]);
  const [filteredLinks, setFilteredLinks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qrLink, setQrLink] = useState("");

  // Fetch shortened URLs
  const fetchShortLinks = async () => {
    try {
      const linksResponse = await getAllUrls();
      setShortLinks(linksResponse.data || []);
      setFilteredLinks(linksResponse.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred while fetching data."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShortLinks();
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Handle status change
  const handleStatusChange = async (shortCode, newStatus) => {
    try {
      await updateUrlStatus(shortCode, newStatus);
      setShortLinks((prevLinks) =>
        prevLinks.map((link) =>
          link.shortCode === shortCode ? { ...link, status: newStatus } : link
        )
      );
      setFilteredLinks((prevLinks) =>
        prevLinks.map((link) =>
          link.shortCode === shortCode ? { ...link, status: newStatus } : link
        )
      );
      toast.success("Status updated successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status");
    }
  };

  // Delete a short link
  const handleDelete = async (shortCode) => {
    try {
      await deleteUrl(shortCode);
      setShortLinks((prevLinks) =>
        prevLinks.filter((link) => link.shortCode !== shortCode)
      );
      setFilteredLinks((prevLinks) =>
        prevLinks.filter((link) => link.shortCode !== shortCode)
      );
      toast.success("URL deleted successfully");
    } catch (error) {
      toast.error("Error deleting URL");
    }
  };

  // Copy URL to clipboard
  const copyToClipBoard = async (shortCode) => {
    const textToCopy = `${window.location.protocol}//${window.location.host}/${shortCode}`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy link.");
    }
  };

  // Open QR modal
  const openQrModal = (shortCode) => {
    const link = `${window.location.protocol}//${window.location.host}/${shortCode}`;
    setQrLink(link);
  };

  // Filter links based on search query
  const handleSearch = (query) => {
    setSearchQuery(query);
    const lowerQuery = query.toLowerCase();
    const filtered = shortLinks.filter(
      (link) =>
        link.shortCode.toLowerCase().includes(lowerQuery) ||
        link.originalUrl.toLowerCase().includes(lowerQuery)
    );
    setFilteredLinks(filtered);
  };

  const extractDomain = (url) => {
    try {
      return new URL(url).hostname;
    } catch {
      return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <NavBar />
      <div className="w-full container mx-auto px-4 py-8 min-h-[70vh]">
        <div className="bg-gradient-to-r from-black to-gray-800 p-8 rounded-lg shadow-lg mb-8">
          <Typography
            variant="h3"
            className="font-black text-white mb-1 text-start tracking-wide"
          >
            Dashboard
          </Typography>
          <div className="flex flex-col items-start">
            <Typography variant="small" className="text-gray-200 text-start">
              Here you can manage your links, check your stats, and explore the
              full potential of your URL shortener.
            </Typography>
          </div>
          {user && (
            <Chip
              variant="filled"
              size="md"
              className="text-white w-max rounded-full mt-4 font-normal -z-0"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    clipRule="evenodd"
                  />
                </svg>
              }
              value={user && user.name}
            />
          )}
        </div>

        <Card className="rounded-lg">
          <CardHeader
            floated={false}
            shadow={false}
            className=" flex flex-wrap justify-between mb-4 gap-y-4"
          >
            <div className="">
              <Typography variant="h6" className="font-bold text-gray-800">
                Shortened Links Overview
              </Typography>
              <Typography
                variant="small"
                className="text-gray-600 font-normal mt-1"
              >
                Manage your shortened URLs efficiently.
              </Typography>
            </div>
            <div className="w-full md:w-72 py-1">
              <Input
                label="Search"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardBody className="overflow-x-scroll overflow-y-hidden p-4">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                {/* <Typography>Loading...</Typography> */}
                <Spinner />
              </div>
            ) : filteredLinks.length > 0 ? (
              <table className="w-full min-w-max table-auto">
                <thead>
                  <tr>
                    {[
                      "Icon",
                      "Original URL",
                      "Short URL",
                      "Visits",
                      "Status",
                      "Chart",
                      "Actions",
                    ].map((heading) => (
                      <th
                        key={heading}
                        className="border-b border-gray-300 !p-4 pb-8 text-left"
                      >
                        <Typography className="!font-bold uppercase text-xs text-black">
                          {heading}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredLinks.map((link) => (
                    <tr key={link.shortCode}>
                      <td className="!p-4 border-b border-gray-300 max-w-96">
                        <div className="border-2 w-max rounded-xl border-gray-300">
                          <img
                            src={`https://www.google.com/s2/favicons?sz=64&domain_url=${extractDomain(
                              link.originalUrl
                            )}`}
                            alt="favicon"
                            className="w-10 h-10 p-1 bg-contain"
                          />
                        </div>
                      </td>
                      <td className="!p-4 border-b border-gray-300 max-w-96">
                        <Link
                          to={link.originalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-wrap whitespace-normal break-words text-sm cursor-pointer hover:text-black transition-all"
                        >
                          {link.originalUrl}
                        </Link>
                      </td>
                      <td className="!p-4 border-b border-gray-300">
                        <Link
                          to={`${window.location.protocol}//${window.location.host}/${link.shortCode}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cursor-pointer text-sm hover:text-black transition-all"
                        >
                          {`${window.location.protocol}//${window.location.host}/${link.shortCode}`}
                        </Link>
                      </td>
                      <td className="!p-4 border-b border-gray-300 text-right">
                        <Typography variant="small" color="gray">
                          {link.visits}
                        </Typography>
                      </td>
                      <td className="!p-4 border-b border-gray-300 text-center">
                        <select
                          value={link.status}
                          onChange={(e) =>
                            handleStatusChange(
                              link.shortCode,
                              parseInt(e.target.value, 10)
                            )
                          }
                          className="border-[1.5px] px-4 py-2.5 border-gray-400 rounded-lg uppercase text-xs font-semibold appearance-none"
                        >
                          <option value={1}>Active</option>
                          <option value={0}>Inactive</option>
                        </select>
                      </td>

                      <td className="!p-4 border-b border-gray-300 text-right">
                        <div className="max-w-[12rem] ml-auto h-12 -translate-y-6">
                          {" "}
                          <AreaChart data={[0, link.visits]} />
                        </div>
                      </td>
                      <td className="!p-4 border-b border-gray-300 text-right">
                        <div className="flex justify-end">
                          <ButtonGroup variant="outlined">
                            <Button
                              size="sm"
                              variant="outlined"
                              onClick={() => copyToClipBoard(link.shortCode)}
                              className="p-3 flex gap-1 items-center justify-center"
                            >
                              <FaShareAlt className="text-black" />
                              SHARE
                            </Button>
                            <Button
                              size="sm"
                              variant="outlined"
                              onClick={() => openQrModal(link.shortCode)}
                              className="p-3 flex gap-1 items-center justify-center"
                            >
                              <FaQrcode className="text-black" />
                              QR
                            </Button>
                            <Button
                              size="sm"
                              variant="outlined"
                              onClick={() => handleDelete(link.shortCode)}
                              className="p-3 flex gap-1 items-center justify-center"
                            >
                              <FaTrashAlt className="text-black" />
                              DELETE
                            </Button>
                          </ButtonGroup>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table>
                <tbody>
                  <tr>
                    <Typography variant="small" className="font-normal">
                      No URLs found.
                    </Typography>
                  </tr>
                </tbody>
              </table>
            )}
          </CardBody>
        </Card>

        {qrLink && (
          <Dialog
            open={Boolean(qrLink)}
            onClose={() => setQrLink("")}
            size="sm"
          >
            <DialogHeader className="text-center flex justify-between">
              <div className="items-start flex flex-col text-start">
                <Typography variant="lead" className="font-black">
                  QR Code
                </Typography>
                <Typography variant="small" className="font-normal">
                  Scan the qr code to visit the site
                </Typography>
              </div>
              <button
                onClick={() => setQrLink("")}
                className="bg-gray-200 hover:ring-2 ring-gray-300 w-8 h-8 flex items-center justify-center rounded-md"
              >
                <LuX size={16} />
              </button>
            </DialogHeader>
            <DialogBody className="flex flex-col items-center">
              <QRCode value={qrLink} size={200} />
            </DialogBody>
            <DialogFooter className="flex justify-center">
              <Typography variant="small" className="font-normal text-gray-700">
                {qrLink}
              </Typography>
            </DialogFooter>
          </Dialog>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default DashBoard;
