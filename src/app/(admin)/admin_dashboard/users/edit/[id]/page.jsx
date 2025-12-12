'use client'
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import updateUser from '@/helpers/(admin)/users/updateUser';
import CancelModalComponent from '@/app/(admin)/components/CancelModalComponent';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

// Defines the initial state for the user form
const initialFormData = {
    firstName: '',
    lastName: '',
    email: '',
    passwordHash: '',
    role: 'student',
    gender: '',
    mentorId: '',
    status: 'active', // **Added default value**
    plan: 'free' // **Added default value**
};

const ROLES = ['student', 'mentor', 'instructor'];
const GENDERS = ['male', 'female', 'bisexual', 'prefer not to say'];
const STATUS_OPTIONS = ['active', 'inactive', 'banned'];
const PLAN_OPTIONS = ['free', 'premium'];

const FormInput = ({
    label,
    name,
    type = 'text',
    required = true,
    isOptional = false,
    placeholder,
    value,
    error,
    onChange,
    disableAutofill = false,
    disable = false
}) => (
    <div className="mb-4">
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
            {isOptional && <span className="text-gray-400 text-xs ml-1">(Optional)</span>}
        </label>
        <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            autoComplete={disableAutofill ? "off" : "on"}
            disabled={disable}
            required={required}
            className={`w-full p-3 border rounded-lg focus:ring-primary-500 focus:border-primary-500 transition duration-150 ${error ? 'border-red-500' : 'border-gray-300'
                } ${disable ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
);

const Page = () => {
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [submissionStatus, setSubmissionStatus] = useState(null);
    const [openCancelModule, setOpenCancelModule] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // **Added loading state**
    const [changePassword, setChangePassword] = useState(false); // **New state for password change**
    const [newPassword, setNewPassword] = useState(''); // **New password field**

    const router = useRouter();
    const pathName = usePathname();
    const userId = pathName.split('/').pop();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setIsLoading(true);
                const result = await fetch(`/api/users/${userId}`);
                const data = await result.json();

                console.log('Fetched user data:', data); // **Debug log**

                setFormData({
                    firstName: data.firstName || '',
                    lastName: data.lastName || '',
                    email: data.email || '',
                    role: data.role || 'student',
                    gender: data.gender || '',
                    mentorId: data.mentorId || '',
                    status: data.status || 'active', // **Ensure lowercase**
                    plan: data.plan || 'free', // **Ensure lowercase**
                    passwordHash: '' // **Never show the hashed password**
                });
            } catch (error) {
                console.error('Error fetching user:', error);
                setErrors({ general: 'Failed to load user data' });
            } finally {
                setIsLoading(false);
            }
        };

        if (userId) {
            fetchUser();
        }
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const openCancelModal = () => {
        setOpenCancelModule(true);
    };

    const handleCancel = () => {
        router.back();
    };

    const validateForm = () => {
        const newErrors = {};
        const { firstName, lastName, email, role, mentorId, gender, status, plan } = formData;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const objectIdRegex = /^[0-9a-fA-F]{24}$/;

        if (!firstName.trim()) newErrors.firstName = 'First Name is required.';
        if (!lastName.trim()) newErrors.lastName = 'Last Name is required.';
        if (!email.trim() || !emailRegex.test(email)) newErrors.email = 'A valid email is required.';
        if (!ROLES.includes(role)) newErrors.role = 'Invalid role selected.';
        if (!GENDERS.includes(gender)) newErrors.gender = 'Invalid gender selected.';
        if (!STATUS_OPTIONS.includes(status)) newErrors.status = 'Invalid status selected.';
        if (!PLAN_OPTIONS.includes(plan)) newErrors.plan = 'Invalid plan selected.';

        // **Password validation only if changing password**
        if (changePassword && newPassword.trim().length < 8) {
            newErrors.newPassword = 'Password must be at least 8 characters.';
        }

        if (mentorId && mentorId.trim() && !objectIdRegex.test(mentorId.trim())) {
            newErrors.mentorId = 'Mentor ID must be a valid MongoDB ObjectId (24 characters).';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmissionStatus('loading');

        if (!validateForm()) {
            setSubmissionStatus('error');
            return;
        }

        const userToEdit = {
            firstName: formData.firstName.trim(),
            lastName: formData.lastName.trim(),
            email: formData.email.trim().toLowerCase(),
            role: formData.role,
            gender: formData.gender,
            status: formData.status, // **Already lowercase from dropdown**
            plan: formData.plan, // **Already lowercase from dropdown**
            userId: userId
        };

        // **Only include mentorId if it has a value**
        if (formData.mentorId && formData.mentorId.trim()) {
            userToEdit.mentorId = formData.mentorId.trim();
        }

        // **Only include new password if user wants to change it**
        if (changePassword && newPassword.trim()) {
            userToEdit.newPassword = newPassword.trim();
        }

        // **Debug log**

        try {
            const result = await updateUser(userToEdit);
            setSubmissionStatus('success');

            setTimeout(() => {
                router.push('/admin_dashboard/users'); // **Redirect after success**
            }, 1500);

        } catch (error) {
            console.error('Submission failed:', error);
            setSubmissionStatus('error');

            if (error.errors) {
                setErrors(error.errors);
            } else {
                setErrors({ general: error.message || 'Failed to update user. Please try again.' });
            }
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen w-full bg-gray-100 p-4 sm:p-8 font-inter flex items-center justify-center">
                <Loader2 className="animate-spin h-8 w-8 text-primary-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-gray-100 p-4 sm:p-8 font-inter">
            <div className="mx-auto bg-white p-6 sm:p-10 rounded-2xl shadow-2xl">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">Edit User</h1>
                <p className="text-sm text-gray-500 mb-6">Fields marked with <span className="text-red-500">*</span> are required.</p>

                <CancelModalComponent
                    open={openCancelModule}
                    setOpen={setOpenCancelModule}
                    handleCancel={handleCancel}
                    message='Are you sure you want to cancel this operation?'
                />

                <form onSubmit={handleSubmit} autoComplete="off">
                    {/* First Name & Last Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormInput
                            label="First Name"
                            name="firstName"
                            placeholder="e.g., Jane"
                            value={formData.firstName}
                            error={errors.firstName}
                            onChange={handleChange}
                        />
                        <FormInput
                            label="Last Name"
                            name="lastName"
                            placeholder="e.g., Doe"
                            value={formData.lastName}
                            error={errors.lastName}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Email */}
                    <FormInput
                        label="Email Address"
                        name="email"
                        type="email"
                        placeholder="e.g., jane.doe@example.com"
                        value={formData.email}
                        error={errors.email}
                        onChange={handleChange}
                        disable={true} // **Usually don't allow email changes**
                    />

                    {/* **Password Change Section - NEW** */}
                    <div className="mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                        <div className="flex items-center mb-3">
                            <input
                                type="checkbox"
                                id="changePassword"
                                checked={changePassword}
                                onChange={(e) => {
                                    setChangePassword(e.target.checked);
                                    if (!e.target.checked) {
                                        setNewPassword('');
                                        setErrors(prev => ({ ...prev, newPassword: '' }));
                                    }
                                }}
                                className="mr-2 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                            />
                            <label htmlFor="changePassword" className="text-sm font-medium text-gray-700">
                                Change Password
                            </label>
                        </div>

                        {changePassword && (
                            <div>
                                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                    New Password <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    value={newPassword}
                                    onChange={(e) => {
                                        setNewPassword(e.target.value);
                                        if (errors.newPassword) {
                                            setErrors(prev => ({ ...prev, newPassword: '' }));
                                        }
                                    }}
                                    placeholder="Enter new password (min 8 characters)"
                                    autoComplete="new-password"
                                    className={`w-full p-3 border rounded-lg focus:ring-primary-500 focus:border-primary-500 transition duration-150 ${errors.newPassword ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {errors.newPassword && <p className="mt-1 text-sm text-red-500">{errors.newPassword}</p>}
                            </div>
                        )}
                    </div>

                    {/* Role Selection */}
                    <div className="mb-4">
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                            Role <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                            className={`w-full p-3 border rounded-lg appearance-none bg-white focus:ring-primary-500 focus:border-primary-500 transition duration-150 ${errors.role ? 'border-red-500' : 'border-gray-300'
                                }`}
                        >
                            {ROLES.map(role => (
                                <option key={role} value={role}>
                                    {role.charAt(0).toUpperCase() + role.slice(1)}
                                </option>
                            ))}
                        </select>
                        {errors.role && <p className="mt-1 text-sm text-red-500">{errors.role}</p>}
                    </div>

                    {/* Gender Selection */}
                    <div className="mb-4">
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                            Gender <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                            className={`w-full p-3 border rounded-lg appearance-none bg-white focus:ring-primary-500 focus:border-primary-500 transition duration-150 ${errors.gender ? 'border-red-500' : 'border-gray-300'
                                }`}
                        >
                            <option value="">Select Gender</option>
                            {GENDERS.map(gender => (
                                <option key={gender} value={gender}>
                                    {gender.charAt(0).toUpperCase() + gender.slice(1)}
                                </option>
                            ))}
                        </select>
                        {errors.gender && <p className="mt-1 text-sm text-red-500">{errors.gender}</p>}
                    </div>

                    {/* Status Selection */}
                    <div className="mb-4">
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                            Status <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            required
                            className={`w-full p-3 border rounded-lg appearance-none bg-white focus:ring-primary-500 focus:border-primary-500 transition duration-150 ${errors.status ? 'border-red-500' : 'border-gray-300'
                                }`}
                        >
                            {STATUS_OPTIONS.map(statusOption => (
                                <option key={statusOption} value={statusOption}>
                                    {statusOption.charAt(0).toUpperCase() + statusOption.slice(1)}
                                </option>
                            ))}
                        </select>
                        {errors.status && <p className="mt-1 text-sm text-red-500">{errors.status}</p>}
                    </div>

                    {/* Plan Selection */}
                    <div className="mb-4">
                        <label htmlFor="plan" className="block text-sm font-medium text-gray-700 mb-1">
                            Plan <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="plan"
                            name="plan"
                            value={formData.plan}
                            onChange={handleChange}
                            required
                            className={`w-full p-3 border rounded-lg appearance-none bg-white focus:ring-primary-500 focus:border-primary-500 transition duration-150 ${errors.plan ? 'border-red-500' : 'border-gray-300'
                                }`}
                        >
                            {PLAN_OPTIONS.map(planOption => (
                                <option key={planOption} value={planOption}>
                                    {planOption.charAt(0).toUpperCase() + planOption.slice(1)}
                                </option>
                            ))}
                        </select>
                        {errors.plan && <p className="mt-1 text-sm text-red-500">{errors.plan}</p>}
                    </div>

                    {/* Optional Mentor ID */}
                    <FormInput
                        label="Mentor ID"
                        name="mentorId"
                        isOptional={true}
                        required={false}
                        placeholder="e.g., 507f1f77bcf86cd799439011"
                        value={formData.mentorId}
                        error={errors.mentorId}
                        onChange={handleChange}
                    />

                    {/* Submission Messages */}
                    {submissionStatus === 'success' && (
                        <div className="p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
                            <span className="font-medium">Success!</span> User updated successfully.
                        </div>
                    )}
                    {submissionStatus === 'error' && (
                        <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                            <span className="font-medium">Error!</span> Failed to update user. Please check the fields.
                        </div>
                    )}
                    {errors.general && (
                        <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                            <span className="font-medium">Error:</span> {errors.general}
                        </div>
                    )}

                    {/* Submit Buttons */}
                    <div className='flex gap-2 justify-end w-full'>
                        <button
                            type="button"
                            className="bg-red-600 text-white p-3 mt-4 rounded-lg font-semibold hover:bg-red-700 transition duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            onClick={openCancelModal}
                        >
                            <X size={22} className='inline mr-2' />
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="bg-green-500 text-white p-3 mt-4 rounded-lg font-semibold hover:bg-green-600 transition duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-green-400 disabled:cursor-not-allowed"
                            disabled={submissionStatus === 'loading'}
                        >
                            {submissionStatus === 'loading' ? (
                                <>
                                    <Loader2 className="animate-spin inline mr-2 h-5 w-5" />
                                    Updating User...
                                </>
                            ) : (
                                'Update User'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const Loader2 = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
);

export default Page;