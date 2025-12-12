// components/LoginPromptModal.jsx
import React from 'react';
import { UserPlus, LogIn, X } from 'lucide-react'; // Example icons

const LoginPromptModal = ({ isOpen, onClose, onLogin, courseTitle }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/75 p-4">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Login Required</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-md"
                        aria-label="Close modal"
                    >
                        <X size={24} />
                    </button>
                </div>
                <p className="mb-6 text-gray-700">
                    You need to be logged in to enroll in <strong>{courseTitle}</strong>
                    <br />
                    Would you like to log in now?
                </p>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onLogin}
                        className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        <LogIn size={18} className="inline mr-1" /> Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPromptModal;