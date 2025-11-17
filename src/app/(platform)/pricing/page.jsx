export default function PricingPage() {
    return (
        <>
            <div class="px-40 flex flex-1 justify-center py-5 font-nunito">
                <div class="layout-content-container flex flex-col max-w-[920px] flex-1">
                    <div class="flex flex-wrap justify-between gap-3 p-4">
                        <p class="text-[#111418] tracking-light text-[32px] font-bold leading-tight min-w-72">Choose the plan that&apos;s right for you</p>
                    </div>
                    <div class="grid grid-cols-[repeat(auto-fit,minmax(228px,1fr))] gap-2.5 px-4 py-3 @3xl:grid-cols-4">
                        <div class="flex flex-1 flex-col gap-4 rounded-lg border border-solid border-[#dbe0e6] bg-white p-6">
                            <div class="flex flex-col gap-1">
                                <h1 class="text-[#111418] text-base font-bold leading-tight">Basic</h1>
                                <p class="flex items-baseline gap-1 text-[#111418]">
                                    <span class="text-[#111418] text-4xl font-black leading-tight tracking-[-0.033em]">Free</span>
                                    <span class="text-[#111418] text-base font-bold leading-tight">/month</span>
                                </p>
                            </div>
                            <button
                                class="flex min-w-[84px] hover:bg-primary hover:text-white text-text transition-colors bg-gray-300 max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4  text-sm font-bold leading-normal tracking-[0.015em]"

                            >
                                <span class="truncate ">Get Started</span>
                            </button>
                            <div class="flex flex-col gap-2">
                                <div class="text-[13px] font-normal leading-normal flex gap-3 text-[#111418]">
                                    <div class="text-[#111418]" data-icon="Check" data-size="20px" data-weight="regular">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                                            <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                                        </svg>
                                    </div>
                                    Access to basic courses
                                </div>
                                <div class="text-[13px] font-normal leading-normal flex gap-3 text-[#111418]">
                                    <div class="text-[#111418]" data-icon="Check" data-size="20px" data-weight="regular">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                                            <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                                        </svg>
                                    </div>
                                    Community support
                                </div>
                                <div class="text-[13px] font-normal leading-normal flex gap-3 text-[#111418]">
                                    <div class="text-[#111418]" data-icon="Check" data-size="20px" data-weight="regular">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                                            <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                                        </svg>
                                    </div>
                                    Personalized Learning
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-1 flex-col gap-4 rounded-lg border border-solid border-[#dbe0e6] bg-white p-6">
                            <div class="flex flex-col gap-1">
                                <h1 class="text-[#111418] text-base font-bold leading-tight">Pro</h1>
                                <p class="flex items-baseline gap-1 text-[#111418]">
                                    <span class="text-[#111418] text-4xl font-black leading-tight tracking-[-0.033em] ">$49</span>
                                    <span class="text-[#111418] text-base font-bold leading-tight">/month</span>
                                </p>
                            </div>
                            <button
                                class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden hover:animate- rounded-lg h-10 px-4  hover:bg-primary hover:text-white text-text transition-colors bg-gray-300 text-sm font-bold leading-normal tracking-[0.015em]"
                            >
                                <span class="truncate">Choose Plan</span>
                            </button>
                            <div class="flex flex-col gap-2">
                                <div class="text-[13px] font-normal leading-normal flex gap-3 text-[#111418]">
                                    <div class="text-[#111418]" data-icon="Check" data-size="20px" data-weight="regular">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                                            <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                                        </svg>
                                    </div>
                                    Unlimited courses
                                </div>
                                <div class="text-[13px] font-normal leading-normal flex gap-3 text-[#111418]">
                                    <div class="text-[#111418]" data-icon="Check" data-size="20px" data-weight="regular">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                                            <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                                        </svg>
                                    </div>
                                    Priority support
                                </div>
                                <div class="text-[13px] font-normal leading-normal flex gap-3 text-[#111418]">
                                    <div class="text-[#111418]" data-icon="Check" data-size="20px" data-weight="regular">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                                            <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                                        </svg>
                                    </div>
                                    Advanced analytics
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-1 flex-col gap-4 rounded-lg border border-solid border-[#dbe0e6] bg-white p-6">
                            <div class="flex flex-col gap-1">
                                <h1 class="text-[#111418] text-base font-bold leading-tight">Enterprise</h1>
                                <p class="flex items-baseline gap-1 text-[#111418]">
                                    <span class="text-[#111418] text-4xl font-black leading-tight tracking-[-0.033em] ">$99</span>
                                    <span class="text-[#111418] text-base font-bold leading-tight">/month</span>
                                </p>
                            </div>
                            <button
                                class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4  hover:bg-primary hover:text-white text-text transition-colors bg-gray-300  hover:bg-gray-300 text-sm font-bold leading-normal tracking-[0.015em]"
                            >
                                <span class="truncate">Contact Us</span>
                            </button>
                            <div class="flex flex-col gap-2">
                                <div class="text-[13px] font-normal leading-normal flex gap-3 text-[#111418]">
                                    <div class="text-[#111418]" data-icon="Check" data-size="20px" data-weight="regular">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                                            <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                                        </svg>
                                    </div>
                                    Customized training
                                </div>
                                <div class="text-[13px] font-normal leading-normal flex gap-3 text-[#111418]">
                                    <div class="text-[#111418]" data-icon="Check" data-size="20px" data-weight="regular">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                                            <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                                        </svg>
                                    </div>
                                    Dedicated account manager
                                </div>
                                <div class="text-[13px] font-normal leading-normal flex gap-3 text-[#111418]">
                                    <div class="text-[#111418]" data-icon="Check" data-size="20px" data-weight="regular">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                                            <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                                        </svg>
                                    </div>
                                    Scalable solutions
                                </div>
                            </div>
                        </div>
                    </div>
                    <h2 class="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Frequently Asked Questions</h2>
                    <div class="flex flex-col p-4 gap-3">
                        <details class="flex flex-col rounded-lg bg-[#f0f2f5] px-4 py-2 group" open="">
                            <summary class="flex cursor-pointer items-center justify-between gap-6 py-2">
                                <p class="text-[#111418] text-sm font-bold leading-normal">What payment methods do you accept?</p>
                                <div class="text-[#111418] group-open:rotate-180" data-icon="CaretDown" data-size="20px" data-weight="regular">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                                        <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
                                    </svg>
                                </div>
                            </summary>
                            <p class="text-[#60758a] text-sm font-normal leading-normal pb-2">
                                We accept all major credit cards, including Visa, MasterCard, and American Express. We also support payments through PayPal.
                            </p>
                        </details>
                        <details class="flex flex-col rounded-lg bg-[#f0f2f5] px-4 py-2 group">
                            <summary class="flex cursor-pointer items-center justify-between gap-6 py-2">
                                <p class="text-[#111418] text-sm font-bold leading-normal">Can I cancel my subscription?</p>
                                <div class="text-[#111418] group-open:rotate-180" data-icon="CaretDown" data-size="20px" data-weight="regular">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                                        <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
                                    </svg>
                                </div>
                            </summary>
                            <p class="text-[#60758a] text-sm font-normal leading-normal pb-2">
                                We accept all major credit cards, including Visa, MasterCard, and American Express. We also support payments through PayPal.
                            </p>
                        </details>
                        <details class="flex flex-col rounded-lg bg-[#f0f2f5] px-4 py-2 group">
                            <summary class="flex cursor-pointer items-center justify-between gap-6 py-2">
                                <p class="text-[#111418] text-sm font-bold leading-normal">Do you offer refunds?</p>
                                <div class="text-[#111418] group-open:rotate-180" data-icon="CaretDown" data-size="40px" data-weight="regular">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                                        <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
                                    </svg>
                                </div>
                            </summary>
                            <p class="text-[#60758a] text-sm font-normal leading-normal pb-2">
                                We accept all major credit cards, including Visa, MasterCard, and American Express. We also support payments through PayPal.
                            </p>
                        </details>
                    </div>
                </div>
            </div>


        </>
    )
}
