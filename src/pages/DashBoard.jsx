import React, { useEffect, useState } from "react";
import { getAllUrls, updateUrlStatus, deleteUrl } from "../services/api";
import toast from "react-hot-toast";
import NavBar from "../components/NavBar";
import { useUser } from "../context/UserContext";
import { Bar, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import Footer from "../components/Footer";
import {
  LuDelete,
  LuExternalLink,
  LuQrCode,
  LuShare,
  LuTrash2,
  LuX,
} from "react-icons/lu";
import QRCode from "react-qr-code";
import Modal from "react-modal";

// Register necessary components
Chart.register(...registerables);

Modal.setAppElement("#root"); // Set app root element for accessibility

function DashBoard() {
  const { user } = useUser();
  const [shortLinks, setShortLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qrModalIsOpen, setQrModalIsOpen] = useState(false);
  const [qrLink, setQrLink] = useState("");

  const fetchShortLinks = async () => {
    try {
      const linksResponse = await getAllUrls();
      setShortLinks(
        Array.isArray(linksResponse.data) ? linksResponse.data : []
      );
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

  const handleStatusChange = async (shortCode, newStatus) => {
    try {
      await updateUrlStatus(shortCode, newStatus);
      setShortLinks((prevLinks) =>
        prevLinks.map((link) =>
          link.shortCode === shortCode ? { ...link, status: newStatus } : link
        )
      );
      toast.success("Status updated successfully");
      fetchShortLinks();
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to update status";
      toast.error(errorMessage);
    }
  };

  const handleDelete = async (shortCode) => {
    try {
      const response = await deleteUrl(shortCode);
      console.log(response.data.message); // Log success message
      fetchShortLinks();
      toast.success("URL deleted successfully");
    } catch (error) {
      console.error("Error deleting URL:", error);
      toast.error("Error deleting URL");
    }
  };

  const copyToClipBoard = async ({ shortCode }) => {
    try {
      const textToCopy = `${window.location.protocol}//${window.location.host}/${shortCode}`;
      await navigator.clipboard.writeText(textToCopy);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy link.");
      console.error("Error copying to clipboard:", err);
    }
  };

  const openQrModal = (shortCode) => {
    const link = `${window.location.protocol}//${window.location.host}/${shortCode}`;
    setQrLink(link);
    setQrModalIsOpen(true);
  };

  const closeQrModal = () => {
    setQrModalIsOpen(false);
    setQrLink("");
  };

  // Prepare data for the Bar chart
  const visitChartData = {
    labels: shortLinks.map((link) => link.shortCode),
    datasets: [
      {
        label: "Visit Counts",
        data: shortLinks.map((link) => link.visits),
        backgroundColor: "#0891b29e",
        borderColor: "#06b6d4",
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for the Active/Inactive Links chart
  const activeChartData = {
    labels: shortLinks.map((link) => link.shortCode),
    datasets: [
      {
        label: "Active Links",
        data: shortLinks.map((link) => (link.status === 1 ? 1 : 0)),
        backgroundColor: "#16a34a89",
        borderColor: "#16a34a",
        borderWidth: 1,
      },
      {
        label: "Inactive Links",
        data: shortLinks.map((link) => (link.status !== 1 ? 1 : 0)),
        backgroundColor: "#ef444489",
        borderColor: "#ef4444",
        borderWidth: 1,
      },
    ],
  };

  if (loading) {
    return (
      <div className="h-screen w-full text-center justify-center flex items-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <div className="min-h-screen max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex-grow mt-8">
          <div className="mx-auto">
            {user && (
              <div className="flex items-center mb-4">
                <h2 className="text-2xl font-light">
                  Hello, {user.name.split(" ")[0]}
                  <span className="hover:cursor-none">👋</span>
                </h2>
              </div>
            )}

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-2">Shortened Links</h3>
              <div className="overflow-x-auto rounded-lg border border-gray-200 mt-4">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                  <thead className="ltr:text-left rtl:text-right">
                    <tr>
                      <th className="whitespace-nowrap px-4 py-2 text-gray-900 text-start uppercase font-semibold">
                        Short URL
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 text-gray-900 text-start uppercase font-semibold">
                        Original URL
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 text-gray-900 text-start uppercase font-semibold">
                        Visits
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 text-gray-900 text-start uppercase font-semibold">
                        Date
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 text-gray-900 text-start uppercase font-semibold">
                        Status
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 text-gray-900 text-start uppercase font-semibold">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {shortLinks.length > 0 ? (
                      shortLinks.map((link) => (
                        <tr key={link.shortCode}>
                          <td
                            className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 cursor-pointer"
                            onClick={() =>
                              copyToClipBoard({ shortCode: link.shortCode })
                            }
                          >
                            {`${window.location.protocol}//${window.location.host}/${link.shortCode}`}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            {link.originalUrl}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            {link.visits}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            {new Date(link.createdAt).toLocaleString()}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            <select
                              value={link.status != null ? link.status : ""}
                              onChange={(e) =>
                                handleStatusChange(
                                  link.shortCode,
                                  parseInt(e.target.value)
                                )
                              }
                              className="border border-gray-300 rounded-md px-2 py-1"
                            >
                              <option value={1}>Active</option>
                              <option value={0}>Inactive</option>
                            </select>
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            <div className="space-x-2 flex">
                              <a
                                href={`${window.location.protocol}//${window.location.host}/${link.shortCode}`}
                                target="_blank"
                                className="bg-cyan-600 px-2 py-1.5 rounded-md hover:bg-cyan-600/75"
                              >
                                <LuExternalLink className="text-white text-lg" />
                              </a>
                              <a
                                onClick={() =>
                                  copyToClipBoard({ shortCode: link.shortCode })
                                }
                                className="bg-gray-100 text-cyan-600 px-2 py-1.5 rounded-md hover:bg-gray-100/75 text-sm cursor-pointer"
                              >
                                <LuShare className="text-lg" />
                              </a>
                              <a
                                onClick={() => openQrModal(link.shortCode)}
                                className="bg-gray-100 text-green-600 px-2 py-1.5 rounded-md hover:bg-gray-100/75 text-sm cursor-pointer"
                              >
                                <LuQrCode className="text-lg"/>
                              </a>
                              <a
                                onClick={() => handleDelete(link.shortCode)}
                                className="bg-red-600 text-white px-2 py-1.5 rounded-md hover:bg-red-600/75 text-sm cursor-pointer"
                              >
                                <LuTrash2 className="text-lg" />
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="6"
                          className="text-center py-4 text-gray-500"
                        >
                          No links available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            {shortLinks.length > 0 ? (
              <div className="py-12">
                <div className="flex flex-wrap gap-10">
                  <div className="w-full lg:w-[65%]">
                    <h3 className="text-xl font-bold mb-2">Visit Counts</h3>
                    <Bar data={visitChartData} />
                  </div>
                  <div className="w-full lg:w-[30%]">
                    <h3 className="text-xl font-bold mb-2">Active Links</h3>
                    <Pie data={activeChartData} />
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <Footer />

      {/* QR Modal */}
      <Modal
        isOpen={qrModalIsOpen}
        onRequestClose={closeQrModal}
        contentLabel="QR Code Modal"
        className="w-screen bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold">Scan the QR Code</h2>
          <button onClick={closeQrModal} className="">
            <LuX className="text-xl" />
          </button>
        </div>
        {qrLink && (
          <div className="flex justify-center mb-4 flex-col items-center gap-3">
            <QRCode value={qrLink} size={200} className="rounded-xl"/>
            <p>{qrLink}</p>
          </div>
        )}
      </Modal>
    </>
  );
}

export default DashBoard;
