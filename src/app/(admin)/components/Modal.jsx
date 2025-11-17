import { FileExclamationPointIcon } from "lucide-react";
// Mock the Dialog components
const Dialog = ({ open, onClose, children, className }) =>
    open ? <div className={`fixed inset-0 overflow-y-auto ${className}`}>{children}</div> : null;
const DialogBackdrop = ({ transition, className, children }) =>
    <div className={`fixed inset-0 ${className} bg-opacity-75`} aria-hidden="true" />;
const DialogPanel = ({ transition, className, children }) =>
    <div className={`relative bg-white rounded-lg shadow-xl ${className}`}>{children}</div>;
const DialogTitle = ({ as, children, className }) =>
    <h3 className={className}>{children}</h3>;


const CancelModalComponent = ({ open, setOpen, handleCancel }) => {


    return (
        <div>
            {/* The open button is moved to the parent App for state control, 
                but keeping the original logic for demonstration: */}

            <Dialog open={open} onClose={() => setOpen(false)} className="relative z-[99]"> {/* Higher z-index for visibility */}

                {/* Backdrop with Transition Classes */}
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        {/* Dialog Panel with Transition Classes */}
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-2xl transition-all 
                                        data-closed:translate-y-4 data-closed:opacity-0 
                                        data-enter:duration-300 data-enter:ease-out 
                                        data-leave:duration-200 data-leave:ease-in 
                                        sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                        >
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    {/* Icon Container */}
                                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                                        <FileExclamationPointIcon aria-hidden="true" className="size-6 text-red-600" />
                                    </div>

                                    {/* Content Area */}
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <DialogTitle as="h3" className="text-xl font-semibold text-gray-900">
                                            Cancel
                                        </DialogTitle>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-600">
                                                Are you sure you want to go back without adding Course?
                                                <br />
                                                {/* <strong className="text-red-700">This action cannot be undone.</strong> */}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 rounded-b-lg">
                                <button
                                    type="button"
                                    onClick={handleCancel}// Typically this would trigger the actual deactivation logic
                                    className="inline-flex w-full justify-center rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-red-700 transition duration-150 ease-in-out sm:ml-3 sm:w-auto"
                                >
                                    Confirm
                                </button>
                                <button
                                    type="button"
                                    data-autofocus
                                    onClick={() => setOpen(false)}
                                    className="mt-3 inline-flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow-sm hover:bg-gray-100 transition duration-150 ease-in-out sm:mt-0 sm:w-auto"
                                >
                                    Cancel
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}


export default CancelModalComponent