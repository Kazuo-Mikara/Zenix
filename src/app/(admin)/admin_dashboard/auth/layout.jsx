import React from 'react'

const AdminAuthLayout = ({ children }) => {
    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-hidden font-nunito">
            <div className="layout-container flex h-full grow flex-col">
                <div className="flex flex-1">
                    {children}
                    <div className="hidden lg:flex flex-1 items-center justify-center bg-slate-100 dark:bg-black/20 p-12">
                        <div className="w-full max-w-lg h-full bg-cover bg-center rounded-xl" data-alt="Abstract blue and purple wave patterns on a dark background" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCYPLemMm_bqSgu32NzREZsrpP6675D656wiZPsw-I-j9JXyVurcFpA1cXO5UcJj5KaoiVX1QncfD-7o-2k5-bc_00g11YiW6CR3pWmO5OhwhomHSHZSSuuw-4Uw0ZQT0LhxwBD2gPat8dlOT-tXDzxf_cWEKE85U_Xgwz1vDfwTuq6s1BPZDGis_O7QFPtWLPjPm2e_veqfeSOWRiLEzJFDBWczK5dWOSuBsx5_YQKJSOio00CIuK3dVrjIYSVqWeefV-If0fUJLbC')" }}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminAuthLayout
