import React from 'react'

const page = () => {
    return (
        <div class="font-display bg-background-light dark:bg-background-dark">
            <div class="flex min-h-screen w-full">
                <main class="flex-1 p-8">
                    <div class="mx-auto max-w-7xl">

                        <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
                            <div class="flex flex-col gap-1">
                                <p class="text-gray-900 dark:text-white text-3xl font-bold leading-tight tracking-tight">User Management</p>
                                <p class="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">Manage all users, their roles, and statuses on the platform.</p>
                            </div>
                            <button class="flex min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors">
                                <span class="material-symbols-outlined">add</span>
                                <span class="truncate">Add New User</span>
                            </button>
                        </div>

                        <div class="bg-white dark:bg-[#1C242C] p-4 rounded-xl border border-gray-200 dark:border-gray-700/60">
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

                                <div class="md:col-span-1">
                                    <label class="flex flex-col w-full">
                                        <div class="flex w-full flex-1 items-stretch rounded-lg h-10">
                                            <div class="text-gray-500 dark:text-gray-400 flex bg-gray-100 dark:bg-[#28313c] items-center justify-center pl-3 rounded-l-lg border-r-0">
                                                <span class="material-symbols-outlined">search</span>
                                            </div>
                                            <input class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border-none bg-gray-100 dark:bg-[#28313c] h-full placeholder:text-gray-400 dark:placeholder:text-gray-500 px-3 pl-2 text-sm font-normal leading-normal" placeholder="Search users by name or email..." value="" />
                                        </div>
                                    </label>
                                </div>

                                <div class="flex gap-3 items-center md:col-span-2 justify-start md:justify-end">
                                    <button class="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-gray-100 dark:bg-[#28313c] pl-3 pr-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#3a4451] transition-colors">
                                        <p class="text-sm font-medium leading-normal">Role: All</p>
                                        <span class="material-symbols-outlined text-base">expand_more</span>
                                    </button>
                                    <button class="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-gray-100 dark:bg-[#28313c] pl-3 pr-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#3a4451] transition-colors">
                                        <p class="text-sm font-medium leading-normal">Status: All</p>
                                        <span class="material-symbols-outlined text-base">expand_more</span>
                                    </button>
                                </div>
                            </div>

                            <div class="mt-4 @container">
                                <div class="flex overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700/60">
                                    <table class="w-full">
                                        <thead class="bg-gray-50 dark:bg-[#28313c]/50">
                                            <tr>
                                                <th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 w-[45%]">User</th>
                                                <th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Role</th>
                                                <th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Status</th>
                                                <th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Date Joined</th>
                                                <th class="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody class="divide-y divide-gray-200 dark:divide-gray-700/60 bg-white dark:bg-[#1C242C]">
                                            <tr class="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                                <td class="px-4 py-3 whitespace-nowrap">
                                                    <div class="flex items-center gap-3">
                                                        <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-9" data-alt="User Olivia Martin's avatar" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDI4JqCBtDVCcL-b_nJ38mv5lvORQrzY7Pgr88yLB3oJIBOluc5_LUXwCs_otQ0s-jdCNMzMq3Xohy3sv0stDDfiLuz04p9uiHcpIM6pSQ1r2UpuEtcCIoFmCWUl437IaiFHt-ZGlWMZuqBoQPeFxOLz1ZSHTMJWik8vvKGQaXdhBi9jeawnimGUsWhmR_rrFJ_HBnlmDuX56Q-7pHStIepgrBVEleoVD4JNxVGskPl2zgjRSqo58ZAl1bqfhIhyUxDQA8OAWcB-_UR")' }}></div>
                                                        <div>
                                                            <div class="text-sm font-medium text-gray-900 dark:text-white">Olivia Martin</div>
                                                            <div class="text-sm text-gray-500 dark:text-gray-400">olivia.martin@email.com</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Student</td>
                                                <td class="px-4 py-3 whitespace-nowrap">
                                                    <span class="inline-flex items-center gap-1.5 rounded-full bg-green-100 dark:bg-green-500/20 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:text-green-300">
                                                        <span class="size-1.5 rounded-full bg-green-500"></span>
                                                        Active
                                                    </span>
                                                </td>
                                                <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">2023-10-25</td>
                                                <td class="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                                                    <div class="flex justify-end gap-2">
                                                        <button class="p-1.5 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-gray-700 dark:hover:text-white transition-colors"><span class="material-symbols-outlined text-xl">edit</span></button>
                                                        <button class="p-1.5 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-red-600 dark:hover:text-red-400 transition-colors"><span class="material-symbols-outlined text-xl">delete</span></button>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr class="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                                <td class="px-4 py-3 whitespace-nowrap">
                                                    <div class="flex items-center gap-3">
                                                        <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-9" data-alt="User Liam Garcia's avatar" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCHV8A8B6nCNPZ1-pGHdLLV6KoDgM5hs4mrbivZ3jaH_4l81LLBGvI3n7xzuoLrkWSGVsNqWFE_BiPX85wvvnHs7282tQSYquDzD1zyD5b995zS2RNnk3lMfeHZWia0oKuSlIDzE7jt2nyEXSK9MIHdIgi4eVaPp5xDPO6ZhQ-SCH7QxnMsQtwXDk7Vk-mhlJZyVRuND4YiUd-OKhLjF7Dy51IcVcJl9jp-FSjBae8Yyom0iq-UR8WhamCe21Qc0n7y0SEgvP9jd9Mk")' }}></div>
                                                        <div>
                                                            <div class="text-sm font-medium text-gray-900 dark:text-white">Liam Garcia</div>
                                                            <div class="text-sm text-gray-500 dark:text-gray-400">liam.garcia@email.com</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Instructor</td>
                                                <td class="px-4 py-3 whitespace-nowrap">
                                                    <span class="inline-flex items-center gap-1.5 rounded-full bg-green-100 dark:bg-green-500/20 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:text-green-300">
                                                        <span class="size-1.5 rounded-full bg-green-500"></span>
                                                        Active
                                                    </span>
                                                </td>
                                                <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">2023-09-15</td>
                                                <td class="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                                                    <div class="flex justify-end gap-2">
                                                        <button class="p-1.5 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-gray-700 dark:hover:text-white transition-colors"><span class="material-symbols-outlined text-xl">edit</span></button>
                                                        <button class="p-1.5 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-red-600 dark:hover:text-red-400 transition-colors"><span class="material-symbols-outlined text-xl">delete</span></button>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr class="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                                <td class="px-4 py-3 whitespace-nowrap">
                                                    <div class="flex items-center gap-3">
                                                        <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-9" data-alt="User Ava Rodriguez's avatar" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCC5vRTYGB8udueVJc54g9B_nPfzilzm1I__wAcABXNoHCuI_AslZ1fWSaD5MPlDG_KMgEIiDouYg0ilKjFnAtDqBDqc7IxoU8sEmhrrvnd9-mOWPDTqcj1ndIU4NhxZzykF2S4wUEHhRaZ98FHSrNpCjbtSg8hKoLakW-UROqw52VHvWjUW4qeFvSaOku_icF3KEBAyMksGMxVWk99ST8cVvggHi8451fPAZKeAXB79p_8m2scwro4FFcQlKWWw2QpyoSLtY0i1niY")' }}></div>
                                                        <div>
                                                            <div class="text-sm font-medium text-gray-900 dark:text-white">Ava Rodriguez</div>
                                                            <div class="text-sm text-gray-500 dark:text-gray-400">ava.rodriguez@email.com</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Admin</td>
                                                <td class="px-4 py-3 whitespace-nowrap">
                                                    <span class="inline-flex items-center gap-1.5 rounded-full bg-green-100 dark:bg-green-500/20 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:text-green-300">
                                                        <span class="size-1.5 rounded-full bg-green-500"></span>
                                                        Active
                                                    </span>
                                                </td>
                                                <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">2023-08-01</td>
                                                <td class="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                                                    <div class="flex justify-end gap-2">
                                                        <button class="p-1.5 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-gray-700 dark:hover:text-white transition-colors"><span class="material-symbols-outlined text-xl">edit</span></button>
                                                        <button class="p-1.5 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-red-600 dark:hover:text-red-400 transition-colors"><span class="material-symbols-outlined text-xl">delete</span></button>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr class="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                                <td class="px-4 py-3 whitespace-nowrap">
                                                    <div class="flex items-center gap-3">
                                                        <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-9" data-alt="User Noah Martinez's avatar" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBvE-4QMtZgEAJ0rtJM3_sC4AFWXlUDwMgfZPYozz236Ph421JkRv17WnA20-s9FYVJpMmHpQhUr95BIQ4UTvJ4S6ulhC_aPEsyuByqN9U03o9Qch5ll6Grn5egKhOli8-7Od37z33Zn3b7dTJUank_h2ijDr5j6k6Bgsg0d-V9iDV47atMy2uzvTd1bLzzJEd9ABQUrooo4vXJJEllufQg3eXunJHdN1lP78_h3ZeVbLQLdY4eVEAbAr7vhEFOXXMRtJ40fst8gq_P")' }}></div>
                                                        <div>
                                                            <div class="text-sm font-medium text-gray-900 dark:text-white">Noah Martinez</div>
                                                            <div class="text-sm text-gray-500 dark:text-gray-400">noah.martinez@email.com</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Student</td>
                                                <td class="px-4 py-3 whitespace-nowrap">
                                                    <span class="inline-flex items-center gap-1.5 rounded-full bg-yellow-100 dark:bg-yellow-500/20 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:text-yellow-300">
                                                        <span class="size-1.5 rounded-full bg-yellow-500"></span>
                                                        Pending
                                                    </span>
                                                </td>
                                                <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">2023-11-01</td>
                                                <td class="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                                                    <div class="flex justify-end gap-2">
                                                        <button class="p-1.5 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-gray-700 dark:hover:text-white transition-colors"><span class="material-symbols-outlined text-xl">edit</span></button>
                                                        <button class="p-1.5 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-red-600 dark:hover:text-red-400 transition-colors"><span class="material-symbols-outlined text-xl">delete</span></button>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr class="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                                <td class="px-4 py-3 whitespace-nowrap">
                                                    <div class="flex items-center gap-3">
                                                        <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-9" data-alt="User Emma Hernandez's avatar" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCetBHAjOB3-9DecRHD3WUeYReKkxrI3f9cigZVDNzEOTjNIGrLKaZyxNZnImJ1FUPXY4q-CHWzKHmsfFKcx6Uv1UHctXlYagWyDj-sxG8D_0VS9Fqij200Ty6QpJxuhQhBi4-vYGFQIkkKIKQsj9SzLh-21QRMP2_dNs1A-tOFjxqP-ACX9adPJ_G8EkMk4GU-97c8Hc-JCswPiHwUVfWdvV6mD6QSMlYuGqKvDTLHRBynVQP7PUNSqecfYGYxQM8xfn3xpmLsIi2c")' }}></div>
                                                        <div>
                                                            <div class="text-sm font-medium text-gray-900 dark:text-white">Emma Hernandez</div>
                                                            <div class="text-sm text-gray-500 dark:text-gray-400">emma.hernandez@email.com</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Student</td>
                                                <td class="px-4 py-3 whitespace-nowrap">
                                                    <span class="inline-flex items-center gap-1.5 rounded-full bg-gray-100 dark:bg-gray-500/20 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:text-gray-300">
                                                        <span class="size-1.5 rounded-full bg-gray-500"></span>
                                                        Inactive
                                                    </span>
                                                </td>
                                                <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">2023-05-20</td>
                                                <td class="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                                                    <div class="flex justify-end gap-2">
                                                        <button class="p-1.5 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-gray-700 dark:hover:text-white transition-colors"><span class="material-symbols-outlined text-xl">edit</span></button>
                                                        <button class="p-1.5 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-red-600 dark:hover:text-red-400 transition-colors"><span class="material-symbols-outlined text-xl">delete</span></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div class="mt-6 flex items-center justify-between">
                            <p class="text-sm text-gray-600 dark:text-gray-400">Showing <span class="font-medium text-gray-800 dark:text-white">1</span> to <span class="font-medium text-gray-800 dark:text-white">5</span> of <span class="font-medium text-gray-800 dark:text-white">128</span> results</p>
                            <div class="flex items-center gap-2">
                                <button class="flex items-center justify-center h-9 px-3 rounded-lg border border-gray-200 dark:border-gray-700/60 bg-white dark:bg-[#1C242C] text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed">
                                    Previous
                                </button>
                                <button class="flex items-center justify-center h-9 px-3 rounded-lg border border-gray-200 dark:border-gray-700/60 bg-white dark:bg-[#1C242C] text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default page