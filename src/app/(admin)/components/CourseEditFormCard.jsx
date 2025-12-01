import React from 'react'
import { Plus, X, Loader2 } from 'lucide-react';

const FormEditCard = ({ formData, openCancelModal, openConfirmModal, handleSubmit, handleFormChange, validationErrors, formatTotalDuration, totalDurationMinutes, addModule, loading, handleModuleChange, removeModule }) => {
    return (
        <form onSubmit={handleSubmit}>
            {/* Course Details Section */}
            <div className="space-y-4 mb-8">
                <h2 className="text-xl font-semibold text-gray-700">Course Information</h2>

                <div className="relative">
                    <input
                        type="text"
                        name="title"
                        placeholder="Course Title (e.g., Advanced React Hooks)"
                        value={formData.title}
                        onChange={handleFormChange}
                        required
                        className={`w-full p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ${validationErrors.title ? 'border-red-500 ring-red-100' : 'border-gray-300'}`}
                    />
                    {validationErrors.title && <p className="text-red-500 text-sm mt-1">{validationErrors.title}</p>}
                </div>

                <div className="relative">
                    <textarea
                        name="description"
                        placeholder="Course Description"
                        value={formData.description}
                        onChange={handleFormChange}
                        required
                        rows="4"
                        className={`w-full p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ${validationErrors.description ? 'border-red-500 ring-red-100' : 'border-gray-300'}`}
                    />
                    {validationErrors.description && <p className="text-red-500 text-sm mt-1">{validationErrors.description}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            name="instructor"
                            placeholder="Instructor Name"
                            value={formData.instructor}
                            onChange={handleFormChange}
                            required
                            className={`w-full p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ${validationErrors.instructor ? 'border-red-500 ring-red-100' : 'border-gray-300'}`}
                        />
                        {validationErrors.instructor && <p className="text-red-500 text-sm mt-1">{validationErrors.instructor}</p>}
                    </div>

                    <div className="relative">
                        <select
                            name="difficulty"
                            value={formData.difficulty}
                            onChange={handleFormChange}
                            required
                            className={`w-full p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ${validationErrors.difficulty ? 'border-red-500 ring-red-100' : 'border-gray-300'}`}
                        >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                        {validationErrors.difficulty && <p className="text-red-500 text-sm mt-1">{validationErrors.difficulty}</p>}
                    </div>

                    <div className="relative">
                        <input
                            type="text"
                            name="tags"
                            placeholder="Tags (e.g., react, backend, separated by commas)"
                            value={formData.tags}
                            onChange={handleFormChange}
                            className={`w-full p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ${validationErrors.tags ? 'border-red-500 ring-red-100' : 'border-gray-300'}`}
                        />
                        {validationErrors.tags && <p className="text-red-500 text-sm mt-1">{validationErrors.tags}</p>}
                    </div>
                </div>
            </div>

            {/* Modules Section */}
            <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <span>Course Modules ({formData.modules.length})</span>
                    <span className='text-base font-medium text-indigo-500 mt-2 sm:mt-0'>
                        Total Duration: <span className='font-bold'>{formatTotalDuration(totalDurationMinutes)}</span>
                    </span>
                </h2>

                <button
                    type="button"
                    onClick={addModule}
                    className="flex items-center space-x-1 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition shadow-md"
                >
                    <Plus size={16} />
                    <span>Add New Module</span>
                </button>

                {formData.modules.map((module, index) => {
                    // Find module specific errors (e.g., modules.0.title)
                    const moduleErrorKeys = Object.keys(validationErrors).filter(key => key.startsWith(`modules.${index}.`));

                    return (
                        <div key={module.moduleId} className="p-4 border border-indigo-200 rounded-xl bg-indigo-50 shadow-inner relative">
                            <h3 className="font-semibold text-indigo-700 mb-3 border-b border-indigo-200 pb-2">Module {index + 1}</h3>

                            {formData.modules.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeModule(index)}
                                    className="absolute top-4 right-4 p-1 rounded-full text-red-500 bg-white hover:bg-red-100 transition shadow"
                                    aria-label={`Remove module ${index + 1}`}
                                >
                                    <X size={20} />
                                </button>
                            )}

                            <div className="space-y-3">
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="Module Title (e.g., Basics & Setup)"
                                        value={module.title}
                                        onChange={(e) => handleModuleChange(index, e)}
                                        required
                                        className={`w-full p-2 border rounded-md text-sm ${validationErrors[`modules.${index}.title`] ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                    {validationErrors[`modules.${index}.title`] && <p className="text-red-500 text-xs mt-1">{validationErrors[`modules.${index}.title`]}</p>}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="relative">
                                        <input
                                            type="number"
                                            name="lessonCount"
                                            placeholder="Total Lessons"
                                            value={module.lessonCount}
                                            onChange={(e) => handleModuleChange(index, e)}
                                            required
                                            min="0"
                                            className={`w-full p-2 border rounded-md text-sm ${validationErrors[`modules.${index}.lessonCount`] ? 'border-red-500' : 'border-gray-300'}`}
                                        />
                                        {validationErrors[`modules.${index}.lessonCount`] && <p className="text-red-500 text-xs mt-1">{validationErrors[`modules.${index}.lessonCount`]}</p>}
                                    </div>
                                </div>

                                {/* DURATION FIELDS */}
                                <h4 className="text-sm font-medium text-gray-600 pt-1">Estimated Module Duration:</h4>
                                <div className="grid grid-cols-4 gap-2">
                                    <input
                                        type="number"
                                        name="durationWeek"
                                        placeholder="Weeks"
                                        value={module.durationWeek}
                                        onChange={(e) => handleModuleChange(index, e)}
                                        min="0"
                                        className={`w-full p-2 border border-gray-300 rounded-md text-sm ${validationErrors[`modules.${index}.detailedDuration.weeks`] ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                    <input
                                        type="number"
                                        name="durationDays"
                                        placeholder="Days"
                                        value={module.durationDays}
                                        onChange={(e) => handleModuleChange(index, e)}
                                        min="0"
                                        className={`w-full p-2 border border-gray-300 rounded-md text-sm ${validationErrors[`modules.${index}.detailedDuration.days`] ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                    <input
                                        type="number"
                                        name="durationHours"
                                        placeholder="Hours"
                                        value={module.durationHours}
                                        onChange={(e) => handleModuleChange(index, e)}
                                        min="0"
                                        className={`w-full p-2 border border-gray-300 rounded-md text-sm ${validationErrors[`modules.${index}.detailedDuration.hours`] ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                    <input
                                        type="number"
                                        name="durationMinutes"
                                        placeholder="Minutes"
                                        value={module.durationMinutes}
                                        onChange={(e) => handleModuleChange(index, e)}
                                        required
                                        min="0"
                                        className={`w-full p-2 border border-gray-300 rounded-md text-sm ${validationErrors[`modules.${index}.detailedDuration.minutes`] ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Submit Button */}
            <div className='flex justify-end items-end gap-2'>

                <button
                    className="mt-8  py-3 px-4 bg-red-500  text-gray-100 font-bold rounded-lg hover:bg-red-600  hover:text-gray-200 hover:cursor-pointer hover:transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-md flex items-center justify-center space-x-2"
                    onClick={openCancelModal}
                >
                    <span>Cancel</span>
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="mt-8  py-3 px-4 bg-green-600 text-white font-bold rounded-lg  hover:cursor-pointer hover:bg-green-700 transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-xl flex items-center justify-center space-x-2"
                >
                    {loading && <Loader2 size={20} className="animate-spin" />}
                    <span>{loading ? 'Updating Course...' : 'Update Course'}</span>
                </button>
            </div>
        </form>
    )
}

export default FormEditCard