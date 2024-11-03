import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="bg-gray-50">
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="flex justify-center text-teal-600 sm:justify-start">
                        <Link className="text-sky-600 flex flex-col items-center lg:items-start justify-center hover:text-sky-600/75" to="/">
                            <span className="text-3xl font-bold">Go2</span>
                            <span className="font-normal text-gray-400">URL Shortener
                            </span>
                        </Link>
                    </div>

                    <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
                        Copyright &copy; {new Date().getFullYear()}. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer