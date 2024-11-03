import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../provider/AuthProvider"

function NavBar() {
    const [toggle, setToggle] = useState(false);
    const { logout } = useAuth();


    const handleToggle = () => {
        setToggle(!toggle);
    };

    const handleLogout = () => {
        logout();
    }

    return (
        <header className="bg-white sticky top-0">
            <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
                <Link className="block text-sky-600 hover:text-sky-600/75" to="/">
                    <span className="text-3xl font-bold">Go2</span>
                </Link>

                <div className="flex flex-1 items-center justify-end md:justify-between">
                    <nav aria-label="Global" className={`md:block hidden`}>
                        <ul className="flex flex-row items-center gap-6 text-sm">
                            <li>
                                <a className="text-gray-500 transition hover:text-gray-500/75" href="#">About</a>
                            </li>
                            <li>
                                <a className="text-gray-500 transition hover:text-gray-500/75" href="#">Privicy Policy</a>
                            </li>
                            {/* <li>
                                <a className="text-gray-500 transition hover:text-gray-500/75" href="#">Careers</a>
                            </li>
                            <li>
                                <a className="text-gray-500 transition hover:text-gray-500/75" href="#">History</a>
                            </li>
                            <li>
                                <a className="text-gray-500 transition hover:text-gray-500/75" href="#">Services</a>
                            </li>
                            <li>
                                <a className="text-gray-500 transition hover:text-gray-500/75" href="#">Projects</a>
                            </li>
                            <li>
                                <a className="text-gray-500 transition hover:text-gray-500/75" href="#">Blog</a>
                            </li> */}
                        </ul>
                    </nav>

                    <div className="flex items-center gap-4">
                        <div className="sm:flex sm:gap-4">
                            <Link
                                className="block rounded-md bg-sky-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-sky-700"
                                to={'/shorten'}
                            >
                                Shorten Link
                            </Link>
                            <button
                                className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-sky-600 transition hover:text-sky-600/75 sm:block"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>

                        <button
                            className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
                            onClick={handleToggle}
                        >
                            <span className="sr-only">Toggle menu</span>
                            {toggle ?
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill='currentColor'
                                    viewBox="0 0 24 24"><path d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4" /></svg>


                                :
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            }
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {toggle && (
                <div className="md:hidden p-4 bg-[#ffffffc1] backdrop-blur-sm absolute w-full shadow-md">
                    <ul className="space-y-4 text-sm">
                        <li>
                            <a className="text-gray-500 transition hover:text-gray-500/75" href="#">About</a>
                        </li>
                        <li>
                            <a className="text-gray-500 transition hover:text-gray-500/75" href="#">Privicy Policy</a>
                        </li>
                        {/* <li>
                            <a className="text-gray-500 transition hover:text-gray-500/75" href="#">Careers</a>
                        </li>
                        <li>
                            <a className="text-gray-500 transition hover:text-gray-500/75" href="#">History</a>
                        </li>
                        <li>
                            <a className="text-gray-500 transition hover:text-gray-500/75" href="#">Services</a>
                        </li>
                        <li>
                            <a className="text-gray-500 transition hover:text-gray-500/75" href="#">Projects</a>
                        </li> */}
                        <li>
                            <p
                                className="font-medium text-sky-600 transition hover:text-sky-600/75 sm:block"
                                onClick={handleLogout}
                            >
                                Logout
                            </p>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    );
}

export default NavBar;
