// components/EnrollmentConfirmationModal.jsx
import React from 'react';
import { MessageCircle, X, Loader2 } from 'lucide-react';
const EnrollmentConfirmationModal = ({ isOpen, onClose, onConfirm, courseTitle }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/80 p-4">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Confirm Enrollment</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-md"
                        aria-label="Close modal"
                    >
                        <X size={24} />
                    </button>
                </div>
                <p className="mb-6 text-gray-700">
                    Are you sure you want to enroll in the course: <strong>{courseTitle}</strong>?
                </p>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Enroll
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EnrollmentConfirmationModal;