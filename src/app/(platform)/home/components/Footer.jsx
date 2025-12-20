import React from 'react'
// import logo from "../../../assets/logo.png";

// import { FaPhoneAlt } from "react-icons/fa"
const Footer = () => {
    return (
        <footer className="bg-gray-100 dark:bg-gray-800 p-8">
            <div className="grid md:grid-cols-4 gap-8">
                <div>
                    <div className="flex items-center space-x-2">
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Zenix</h1>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mt-4">A modern learning platform designed for everyone.</p>
                    <div className="flex space-x-4 mt-4 text-gray-600 dark:text-gray-400">
                        <a className="hover:text-primary" href="#"><svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path clipRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" fillRule="evenodd"></path></svg></a>
                        <a className="hover:text-primary" href="#"><svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg></a>
                        <a className="hover:text-primary" href="#"><svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.237 2.636 7.855 6.356 9.312-.062-.327-.019-1.03.048-1.514.056-.411.355-.705.355-.705s-.098.39-.098.84c0 .76.47 1.33.987 1.33.917 0 1.258-1.042.853-1.631-.247-.362-.63-.918-.63-1.953 0-1.458 1.04-2.71 2.923-2.71 1.543 0 2.59 1.156 2.59 2.518 0 .975-.333 1.953-.78 2.85-.362.74-.954 1.396-1.944 1.396-.556 0-1.05-.286-1.229-.623 0 0-.256-1.03-.32-1.291-.09-.37-.506-.99-.506-1.442 0-.96.533-1.809 1.631-1.809.878 0 1.55.766 1.55 1.838 0 .618-.114 1.234-.306 1.732-.153.407-.153.84 0 1.243.203.546.577 1.096 1.159 1.096.917 0 1.758-.996 1.758-2.983 0-1.644-1.159-2.883-3.261-2.883-2.22 0-3.696 1.672-3.696 3.498 0 .684.223 1.18.223 1.18s-.696 2.94-1.03 4.223C5.106 20.347 4.19 18.067 4.19 15.655 4.19 9.874 7.632 6 12.313 6c3.12 0 5.161 2.21 5.161 5.111 0 3.322-2.025 5.56-4.945 5.56-.996 0-1.896-.533-1.896-1.18" fillRule="evenodd"></path></svg></a>
                    </div>
                </div>
                <div>
                    <h5 className="font-bold text-gray-800 dark:text-white">About</h5>
                    <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-400">
                        <li><a className="hover:text-primary" href="#">About Us</a></li>
                        <li><a className="hover:text-primary" href="#">Careers</a></li>
                        <li><a className="hover:text-primary" href="#">Press &amp; Blogs</a></li>
                        <li><a className="hover:text-primary" href="#">Become an Instructor</a></li>
                    </ul>
                </div>
                <div>
                    <h5 className="font-bold text-gray-800 dark:text-white">Support</h5>
                    <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-400">
                        <li><a className="hover:text-primary" href="#">Help Center</a></li>
                        <li><a className="hover:text-primary" href="#">Terms of Service</a></li>
                        <li><a className="hover:text-primary" href="#">Privacy Policy</a></li>
                    </ul>
                </div>
                <div>
                    <h5 className="font-bold text-gray-800 dark:text-white">Contact</h5>
                    <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-400">
                        <li>
                            <a href="tel:+670 773 72 728"> <span className='font-bold text-primary'>Phone:</span> +670 773 72 728</a>
                        </li>
                        <li>
                            <a href='mailto:hello@zened.com'><span className='font-bold text-primary'>Email:</span > hello@zened.com</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6 text-center text-gray-500 dark:text-gray-400 text-sm">
                <p>© 2025 Zenix. <span className='font-bold text-primary'>All Rights Reserved</span></p>
            </div>
        </footer>
    )
}

export default Footer