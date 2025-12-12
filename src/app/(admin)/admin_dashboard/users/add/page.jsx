'use client'
import React, { useState } from 'react';
import { X } from 'lucide-react';
import createUser from '@/helpers/(admin)/users/createUsers';
import CancelModalComponent from '@/app/(admin)/components/CancelModalComponent';
import { useRouter } from 'next/navigation';
// Defines the initial state for the user form
const initialFormData = {
    firstName: '',
    lastName: '',
    email: '',
    passwordHash: '', // **Changed from 'password' to match schema**
    role: 'student', // Default role
    gender: '',
    mentorId: '',
    status: 'active', // Default status
    plan: 'free' // Default plan
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
    disableAutofill = false
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
            required={required}
            className={`w-full p-3 border rounded-lg focus:ring-primary-500 focus:border-primary-500 transition duration-150 ${error ? 'border-red-500' : 'border-gray-300'
                }`}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
);

const page = () => {
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [submissionStatus, setSubmissionStatus] = useState(null); // 'success' | 'error' | 'loading' | null
    const [openCancelModule, setOpenCancelModule] = useState(false);
    const [closeCancelModule, setCloseCancelModule] = useState(false);
    const router = useRouter()
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
    }
    const handleCancel = () => {
        router.back();
    }
    const validateForm = () => {
        const newErrors = {};
        const { firstName, lastName, email, passwordHash, role, mentorId, gender } = formData;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const objectIdRegex = /^[0-9a-fA-F]{24}$/; // **MongoDB ObjectId validation**

        // **Required field validations**
        if (!firstName.trim()) newErrors.firstName = 'First Name is required.';
        if (!lastName.trim()) newErrors.lastName = 'Last Name is required.';
        if (!email.trim() || !emailRegex.test(email)) newErrors.email = 'A valid email is required.';
        if (passwordHash.length < 8) newErrors.passwordHash = 'Password must be at least 8 characters long.';
        if (!ROLES.includes(role)) newErrors.role = 'Invalid role selected.';
        if (!GENDERS.includes(gender)) newErrors.gender = 'Invalid gender selected.';
        if (!STATUS_OPTIONS.includes(formData.status)) newErrors.status = 'Invalid status selected.';
        if (!PLAN_OPTIONS.includes(formData.plan)) newErrors.plan = 'Invalid plan selected.';
        // **Mentor ID validation (only if provided)**
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

        const userToCreate = { ...formData };

        if (!userToCreate.mentorId || !userToCreate.mentorId.trim()) {
            delete userToCreate.mentorId;
        } else {
            userToCreate.mentorId = userToCreate.mentorId.trim();
        }

        userToCreate.email = userToCreate.email.trim().toLowerCase();
        userToCreate.firstName = userToCreate.firstName.trim();
        userToCreate.lastName = userToCreate.lastName.trim();

        try {
            const result = await createUser(userToCreate);
            // console.log(userToCreate)
            setSubmissionStatus('success');

            setTimeout(() => {
                setFormData(initialFormData);
                setSubmissionStatus(null);
            }, 2000);

        } catch (error) {
            console.error('Submission failed:', error);
            setSubmissionStatus('error');

            if (error.errors) {
                setErrors(error.errors);
            } else {
                setErrors({ general: error.message || 'Failed to create user. Please try again.' });
            }
        }
    };
    return (
        <div className="min-h-screen w-full bg-gray-100 p-4 sm:p-8 font-inter">
            <div className="mx-auto bg-white p-6 sm:p-10 rounded-2xl shadow-2xl">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">Create New User</h1>
                <p className="text-sm text-gray-500 mb-6">Fields marked with <span className="text-red-500">*</span> are required.</p>
                <CancelModalComponent open={openCancelModule} setOpen={setOpenCancelModule} handleCancel={handleCancel} message='Are you sure you want to cancel this operation?' />
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

                    {/* Email & Password */}
                    <FormInput
                        label="Email Address"
                        name="email"
                        type="email"
                        style={{ display: 'none' }}
                        placeholder="e.g., jane.doe@example.com"
                        value={formData.email}
                        error={errors.email}
                        onChange={handleChange}
                        autoComplete="new-email"

                    />
                    <FormInput
                        label="Password"
                        name="passwordHash"
                        type="password"
                        placeholder="Must be at least 8 characters"
                        value={formData.passwordHash}
                        error={errors.passwordHash}
                        onChange={handleChange}
                        autoComplete="new-password"
                    />

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
                            <option value="" disabled>Select Gender</option>
                            {GENDERS.map(gender => (
                                <option key={gender} value={gender}>
                                    {gender.charAt(0).toUpperCase() + gender.slice(1)}
                                </option>
                            ))}
                        </select>
                        {errors.gender && <p className="mt-1 text-sm text-red-500">{errors.gender}</p>}
                    </div>

                    {/* Optional Mentor ID */}
                    <FormInput
                        label="Mentor ID"
                        name="mentorId"
                        isOptional={true}
                        required={false}
                        placeholder="e.g., 507f1f77bcf86cd799439011 (24-character MongoDB ObjectId)"
                        value={formData.mentorId}
                        error={errors.mentorId}
                        onChange={handleChange}
                    />

                    {/* Submission Messages */}
                    {submissionStatus === 'success' && (
                        <div className="p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
                            <span className="font-medium">Success!</span> User created successfully.
                        </div>
                    )}
                    {submissionStatus === 'error' && (
                        <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                            <span className="font-medium">Error!</span> Failed to submit form. Please check the fields.
                        </div>
                    )}
                    {errors.general && (
                        <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                            <span className="font-medium">API Error:</span> {errors.general}
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className='flex gap-2 justify-end w-full'>
                        <button
                            type="button"
                            className="bg-red-600 text-white p-3 mt-4 rounded-lg font-semibold hover:bg-red-700 transition duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            onClick={() => {
                                setFormData(initialFormData);
                                setErrors({});
                                setSubmissionStatus(null);
                                openCancelModal()
                            }}
                        >
                            <X size={22} className='inline mr-2' />
                            Cancel
                        </button>

                        <button
                            type="submit"

                            className="bg-primary-500 text-white p-3 mt-4 rounded-lg font-semibold hover:bg-primary-600 transition duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:bg-primary-400"
                            disabled={submissionStatus === 'loading'}
                        >
                            {submissionStatus === 'loading' ? (
                                <>
                                    <Loader2 className="animate-spin inline mr-2 h-5 w-5" />
                                    Creating User...
                                </>
                            ) : (
                                'Add New User'
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

export default page;