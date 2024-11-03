import React, { useEffect, useState } from 'react';
import { getAllUrls, updateUrlStatus, deleteUrl } from '../services/api';
import toast from 'react-hot-toast';
import NavBar from '../components/NavBar';
import { useUser } from '../context/UserContext';
import { Bar, Pie, Radar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import Footer from '../components/Footer';

// Register necessary components
Chart.register(...registerables);

function DashBoard() {
  const { user } = useUser();
  const [shortLinks, setShortLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchShortLinks = async () => {
    try {
      const linksResponse = await getAllUrls();
      setShortLinks(Array.isArray(linksResponse.data) ? linksResponse.data : []);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while fetching data.');
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
      toast.success('Status updated successfully');
      fetchShortLinks();
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to update status';
      toast.error(errorMessage);
    }
  };


  const handleDelete = async (shortCode) => {
    try {
      const response = await deleteUrl(shortCode);
      // Optionally, handle the response if needed
      console.log(response.data.message); // Log success message
      // Optionally, refresh the list of URLs or remove the deleted URL from the UI
      fetchShortLinks();
      // show toast message
      toast.success('URL deleted successfully');
    } catch (error) {
      console.error("Error deleting URL:", error);
      // Handle the error, e.g., show a notification to the user
      toast.error("Error deleting URL")
    }
  };

  const copyToClipBoard = async ({ shortCode }) => {
    try {
      const textToCopy = `${import.meta.env.VITE_API_BASE_URL}/url/${shortCode}`;
      await navigator.clipboard.writeText(textToCopy);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy link.");
      console.error("Error copying to clipboard:", err);
    }
  };



  // Prepare data for the Bar chart
  const visitChartData = {
    labels: shortLinks.map(link => link.shortCode), // Use short codes as labels
    datasets: [
      {
        label: 'Visit Counts',
        data: shortLinks.map(link => link.visits), // Use visits as data
        backgroundColor: '#0285c793', // Color for visit bars
        borderColor: '#0284c7', // Border color for visit bars
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for the Active/Inactive Links chart
  const activeChartData = {
    labels: shortLinks.map(link => link.shortCode), // Use short codes as labels
    datasets: [
      {
        label: 'Active Links',
        data: shortLinks.map(link => link.status === 1 ? 1 : 0), // Count active links (1 for active, 0 for inactive)
        backgroundColor: '#16a34a89', // Color for active bars (green)
        borderColor: '#16a34a', // Border color for active bars
        borderWidth: 1,
      },
      {
        label: 'Inactive Links',
        data: shortLinks.map(link => link.status !== 1 ? 1 : 0), // Count inactive links (1 for inactive, 0 for active)
        backgroundColor: '#ef444489', // Color for inactive bars (red)
        borderColor: '#ef4444', // Border color for inactive bars
        borderWidth: 1,
      },
    ],
  };

  if (loading) {
    return <div className='h-screen w-full text-center justify-center flex items-center'>Loading...</div>;
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
              <h3 className="text-xl font-bold mb-2">Shortened Links</h3>
              <div className="overflow-x-auto rounded-lg border border-gray-200 mt-4">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                  <thead className="ltr:text-left rtl:text-right">
                    <tr>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-start">Short Code</th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-start">Original URL</th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-start">Visits</th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-start">Date</th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-start">Status</th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-start">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {shortLinks.length > 0 ? (
                      shortLinks.map((link) => (
                        <tr key={link.shortCode}>
                          <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{link.shortCode}</td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">{link.originalUrl}</td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">{link.visits}</td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">{new Date(link.createdAt).toLocaleString()}</td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            <select
                              value={link.status != null ? link.status : ''} // Use empty string if status is null/undefined
                              onChange={(e) => handleStatusChange(link.shortCode, parseInt(e.target.value))}
                              className="border border-gray-300 rounded-md px-2 py-1"
                            >
                              <option value={1}>Active</option>
                              <option value={0}>Inactive</option>
                            </select>
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            <div className="space-x-2">
                              <a href={`${import.meta.env.VITE_API_BASE_URL}/url/${link.shortCode}`} target='_blank' className='bg-sky-600 text-white px-4 py-1.5 rounded-md hover:bg-sky-600/75 text-sm'>Visit</a>
                              <a onClick={() => copyToClipBoard({ shortCode: link.shortCode })} className='bg-gray-100 text-sky-600 px-4 py-1.5 rounded-md hover:bg-gray-100/75 text-sm cursor-pointer'>Share</a>
                              <a onClick={() => handleDelete(link.shortCode)} className='bg-red-600 text-white px-4 py-1.5 rounded-md hover:bg-red-600/75 text-sm cursor-pointer'>Delete</a>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center py-4 text-gray-500">No links available.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            {shortLinks.length > 0 ?
              <div className="py-12">
                <div className="flex flex-wrap gap-10">
                  <div className="w-full lg:w-[65%]">
                    <h3 className="text-xl font-bold mb-2">Visit Counts</h3>
                    <Bar data={visitChartData} />
                  </div>
                  <div className="w-full lg:w-[30%]">
                    <h3 className="text-xl font-bold mb-2">Active Links</h3>
                    <Radar data={activeChartData} />
                  </div>
                </div>
              </div>
              : ''}

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DashBoard;
