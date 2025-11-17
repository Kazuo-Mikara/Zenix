'use client'

import React, { useState, useMemo, useEffect } from 'react';
import CancelModalComponent from '../../../components/Modal';
import { toast, Toaster } from "react-hot-toast"
import createCourse from '../../../../../helpers/(admin)/courses/createCourse';
import FormCard from '@/app/(admin)/components/FormCard';
import { useRouter } from 'next/navigation';

// Utility function to calculate module duration in minutes
const calculateModuleMinutes = (module) => {
    const weeks = parseFloat(module.durationWeek) || 0;
    const days = parseFloat(module.durationDays) || 0;
    const hours = parseFloat(module.durationHours) || 0;
    const minutes = parseFloat(module.durationMinutes) || 0;

    // Conversion factors to minutes:
    const minutesInWeek = 7 * 24 * 60; // 10,080 minutes
    const minutesInDay = 24 * 60;     // 1,440 minutes
    const minutesInHour = 60;
    return (
        weeks * minutesInWeek +
        days * minutesInDay +
        hours * minutesInHour +
        minutes
    );
};


const initialModuleState = {
    moduleId: crypto.randomUUID(),
    title: '',
    lessonCount: '',
    // These separate fields are for the form state only
    durationWeek: 0,
    durationDays: 0,
    durationHours: 1,
    durationMinutes: 30,
};


// Start of Page

const Page = () => {
    const router = useRouter();
    const Initial_Form_State = {
        title: '',
        description: '',
        instructor: '',
        difficulty: 'Beginner',
        tags: '', // Comma-separated string
        modules: [initialModuleState],
    }
    const [formData, setFormData] = useState(Initial_Form_State);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [cancelModal, setCancelModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    // New state for detailed validation errors
    const [validationErrors, setValidationErrors] = useState({});

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
        // Clear specific validation error when field is edited
        setValidationErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[name];
            return newErrors;
        });
    };
    const openCancelModal = () => {
        setCancelModal(true);
    }
    const openConfirmModal = () => {
        setConfirmModal(true)
    }
    const handleGoBack = () => {
        router.back();
    }
    const handleModuleChange = (index, e) => {
        const { name, value, type } = e.target;
        // Use parseFloat and ensure numbers are non-negative
        let newValue = type === 'number' ? parseFloat(value) : value;
        if (type === 'number' && (isNaN(newValue) || newValue < 0)) {
            newValue = 0;
        }

        const newModules = formData.modules.map((module, i) => {
            if (i === index) {
                return { ...module, [name]: newValue };
            }
            return module;
        });

        setFormData(prev => ({ ...prev, modules: newModules }));
    };

    const addModule = () => {
        setFormData(prev => ({
            ...prev,
            modules: [...prev.modules, { ...initialModuleState, moduleId: crypto.randomUUID() }],
        }));
    };

    const removeModule = (index) => {
        const newModules = formData.modules.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, modules: newModules }));
    };

    const totalDurationMinutes = useMemo(() => {
        return formData.modules.reduce((total, module) => {
            return total + calculateModuleMinutes(module);
        }, 0);
    }, [formData.modules]);

    useEffect(() => {
        if (message) {
            handleToastMessage(message, validationErrors);

            // Clear message after showing toast
            const timer = setTimeout(() => {
                setMessage(null);
                setValidationErrors({});
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [message, validationErrors]);

    const handleToastMessage = (msg, errors) => {
        if (msg.type === 'success') {
            toast.success(msg.text, {
                duration: 3000,
                position: 'top-right',
            });
        } else if (msg.type === 'error') {
            toast.error(msg.text, {
                duration: 4000,
                position: 'top-right',
            });

            // Show validation errors
            if (Object.keys(errors).length > 0) {
                setTimeout(() => {
                    Object.entries(errors).forEach(([field, errorText]) => {
                        const fieldName = field.replace('detailedDuration.', '').split('.').pop();
                        toast.error(`${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}: ${errorText}`, {
                            duration: 6000,
                            id: `validation-${field}`,
                        });
                    });
                }, 300);
            }
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        setValidationErrors({}); // Clear old errors

        try {
            // 1. Process Modules to match Mongoose Schema
            const processedModules = formData.modules.map(module => {
                const moduleTotalMinutes = calculateModuleMinutes(module);

                // Extract temporary form state duration fields
                const { durationWeek, durationDays, durationHours, durationMinutes, ...rest } = module;

                return {
                    ...rest,
                    // Modules do not contain lessons in this form, so use empty array
                    lessons: [],
                    lessonCount: parseFloat(module.lessonCount) || 0,

                    // Denormalized duration field for MongoDB sorting
                    moduleDurationMinutes: moduleTotalMinutes,

                    // Structured detailed duration object for display data
                    detailedDuration: {
                        weeks: durationWeek || 0,
                        days: durationDays || 0,
                        hours: durationHours || 0,
                        minutes: durationMinutes || 0
                    }
                };
            });

            // 2. Final Data Transformation to match Course Schema
            const dataToSubmit = {
                ...formData,
                // Convert comma-separated string tags into an array
                tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
                totalModules: processedModules.length,
                // CRITICAL: Course-level denormalized field for top-level sorting
                totalDurationMinutes: totalDurationMinutes,
                modules: processedModules,
            };

            // Assuming createCourse now handles the API call and throws if !response.ok
            await createCourse(dataToSubmit);
            setMessage({ type: 'success', text: 'Course created successfully!' });

        } catch (error) {
            console.error("Submission Error:", error);

            // Check for detailed errors returned from the server
            if (error.errors && Object.keys(error.errors).length > 0) {
                setValidationErrors(error.errors);
                setMessage({ type: 'error', text: 'Validation errors found. See details below.' });
            } else {
                setMessage({ type: 'error', text: `Error: ${error.message}` });
            }

        } finally {
            setLoading(false);
            setFormData(Initial_Form_State)
        }
    };

    // Helper to format total minutes into Weeks/Days/Hours/Minutes for display
    const formatTotalDuration = (totalMinutes) => {
        if (totalMinutes === 0) return '0m';

        let remainingMinutes = totalMinutes;

        const minutesInWeek = 10080;
        const minutesInDay = 1440;
        const minutesInHour = 60;

        const weeks = Math.floor(remainingMinutes / minutesInWeek);
        remainingMinutes %= minutesInWeek;

        const days = Math.floor(remainingMinutes / minutesInDay);
        remainingMinutes %= minutesInDay;

        const hours = Math.floor(remainingMinutes / minutesInHour);
        remainingMinutes %= minutesInHour;

        const minutes = remainingMinutes;

        const parts = [];
        if (weeks > 0) parts.push(`${weeks}w`);
        if (days > 0) parts.push(`${days}d`);
        if (hours > 0) parts.push(`${hours}h`);
        if (minutes > 0 || parts.length === 0) parts.push(`${minutes}m`);

        return parts.join(' ');
    };


    return (
        <div className="min-h-screen w-full p-4 sm:p-8 font-inter">

            <div className=" mx-aut shadow-2xl rounded-xl p-6 md:p-10">
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                    gutter={8}
                    containerClassName=""
                    containerStyle={{}}
                    toastOptions={{
                        // Define default options
                        className: 'text-sm',
                        duration: 4000,
                        style: {
                            background: '#fff',
                            color: '#363636',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        },
                        success: {
                            iconTheme: {
                                primary: '#10B981',
                                secondary: '#fff',
                            },
                        },
                        error: {
                            iconTheme: {
                                primary: '#EF4444',
                                secondary: '#fff',
                            },
                        },
                    }}
                />
                <CancelModalComponent open={cancelModal} setOpen={setCancelModal} handleCancel={handleGoBack} />
                <FormCard formData={formData}
                    handleSubmit={handleSubmit}
                    openCancelModal={openCancelModal}
                    openConfirmModal={openConfirmModal}
                    handleFormChange={handleFormChange} validationErrors={validationErrors}
                    formatTotalDuration={formatTotalDuration} totalDurationMinutes={totalDurationMinutes} addModule={addModule}
                    removeModule={removeModule}
                    loading={loading} handleModuleChange={handleModuleChange}
                />
            </div>
        </div >
    );
};

export default Page;


// {
//     message && (
//         <div className={`p-4 mb-4 absolute rounded-lg font-medium ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//             {message.text}
//             {/* Display list of detailed errors if available */}
//             {message.type === 'error' && Object.keys(validationErrors).length > 0 && (
//                 <ul className="mt-2 list-disc list-inside space-y-1">
//                     {Object.entries(validationErrors).map(([field, errorText]) => (
//                         // // toast.error(errorText)
//                         // < Toaster key = { field } />
//                         <li key={field} className="text-sm" >
//                             <span className="font-semibold capitalize">{field.replace('detailedDuration.', '').split('.').pop()}:</span> {errorText}
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>


//     )
// }