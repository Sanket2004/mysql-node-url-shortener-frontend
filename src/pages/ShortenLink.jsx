import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import { shortenUrl } from '../services/api'; // Import your API function for shortening the URL
import Footer from '../components/Footer';

const ShortenLink = () => {
    const [url, setUrl] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!url) {
            setMessage('Please enter a valid URL.');
            return;
        }

        try {
            const response = await shortenUrl(url); // Call your API to shorten the URL
            setMessage(`Shortened URL: ${response.data.shortUrl}`); // Show the shortened URL or any success message
            setUrl(''); // Clear the input field
        } catch (error) {
            console.error('Error shortening URL:', error);
            setMessage('Failed to shorten the URL. Please try again.'); // Show error message
        }
    };

    return (
        <>
            <NavBar />
            <div className="min-h-[80vh] max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                <div className="w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-2 text-center">Shorten Your URL</h2>
                    <p className='text-gray-400 text-center mb-4'>Try shorten your long URLs</p>
                    <form onSubmit={handleSubmit} className="bg-white rounded px-8 py-6">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="url">
                                Enter URL
                            </label>
                            <input
                                type="url"
                                id="url"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="https://example.com"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                className="bg-sky-600 hover:bg-sky-600/75 text-white text-sm py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                            >
                                Shorten
                            </button>
                        </div>
                        {message && <p className="mt-4 text-start text-red-500">{message}</p>}
                    </form>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default ShortenLink;
