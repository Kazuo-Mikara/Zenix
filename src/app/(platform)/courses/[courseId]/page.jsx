'use client'
import React, { useState, useEffect } from 'react'
import { use } from 'react'
import axios from 'axios'
const course = ({ searchParams }) => {
    const [course, setCourse] = useState([]);
    const [loading, setLoading] = useState(false);
    const { courseId } = use(searchParams);
    const fetchCourse = async () => {
        setLoading(true);
        try {

            const response = await axios.get(`/api/getOneCourse?courseId=${courseId}`);
            setLoading(false);
            const data = await response.data
            setCourse(data)
        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchCourse()
    }, [])

    return (
        <main class="flex w-full flex-col items-center py-8 sm:py-12 lg:py-16">
            {
                !loading && (
                    <div class="flex w-full max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
                        <div class="flex flex-col gap-4">
                            <h1 class="text-primary text-3xl md:text-4xl font-poppins lg:text-5xl font-black leading-tight tracking-tight max-w-4xl">{course.title}</h1>
                            <p class="text-slate-600 dark:text-slate-400 text-base md:text-lg font-normal leading-normal">{course.instructor}</p>
                            <div class="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                                <span class="font-nunito">Duration</span>
                                <p class="text-base font-medium">{course.duration}</p>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 xl:gap-12">

                            <div class="lg:col-span-2 flex flex-col gap-8">

                                <div class="border-b border-border-light dark:border-border-dark">
                                    <div class="flex gap-6 sm:gap-8">
                                        <a class="flex flex-col items-center justify-center border-b-[3px] border-primary text-primary pb-3 pt-1" href="#">
                                            <p class="text-sm sm:text-base font-bold">About</p>
                                        </a>
                                        <a class="flex flex-col items-center justify-center border-b-[3px] border-transparent text-slate-500 dark:text-slate-400 hover:text-primary pb-3 pt-1" href="#">
                                            <p class="text-sm sm:text-base font-bold">Curriculum</p>
                                        </a>
                                        <a class="flex flex-col items-center justify-center border-b-[3px] border-transparent text-slate-500 dark:text-slate-400 hover:text-primary pb-3 pt-1" href="#">
                                            <p class="text-sm sm:text-base font-bold">Instructors</p>
                                        </a>
                                        <a class="flex flex-col items-center justify-center border-b-[3px] border-transparent text-slate-500 dark:text-slate-400 hover:text-primary pb-3 pt-1" href="#">
                                            <p class="text-sm sm:text-base font-bold">FAQs</p>
                                        </a>
                                    </div>
                                </div>

                                <div class="flex flex-col gap-6">
                                    <h2 class="text-2xl font-bold text-text-light dark:text-text-dark">About this Course</h2>
                                    <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
                                        This comprehensive program is designed to equip you with the advanced skills needed to excel in the rapidly growing fields of Deep Learning, Computer Vision, and Extended Reality (XR). Through a blend of theoretical foundations and hands-on projects, you will learn to build and deploy cutting-edge AI models for real-world applications. The curriculum is crafted by leading academics from IIT Guwahati and industry experts, ensuring you gain both rigorous academic knowledge and practical industry insights.
                                    </p>
                                    <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
                                        Whether you're a software developer looking to specialize, a data scientist aiming to expand your skillset, or a tech enthusiast eager to enter the AI domain, this certificate will provide you with a robust pathway to career advancement. Join us to become a pioneer in creating immersive experiences and intelligent visual systems.
                                    </p>
                                </div>

                                <div class="flex flex-col gap-4">
                                    <h3 class="text-2xl font-bold text-text-light dark:text-text-dark">Curriculum</h3>
                                    <div class="flex flex-col gap-3">

                                        <details class="group rounded-lg bg-white dark:bg-slate-800 border border-border-light dark:border-border-dark p-4">
                                            <summary class="flex cursor-pointer items-center justify-between font-semibold text-text-light dark:text-text-dark">
                                                Module 1: Foundations of Deep Learning
                                                <span class="material-symbols-outlined transition-transform duration-300 group-open:rotate-180">expand_more</span>
                                            </summary>
                                            <p class="mt-3 text-slate-600 dark:text-slate-400">
                                                Introduction to neural networks, backpropagation, and optimization algorithms. Hands-on with TensorFlow and PyTorch.
                                            </p>
                                        </details>

                                        <details class="group rounded-lg bg-white dark:bg-slate-800 border border-border-light dark:border-border-dark p-4">
                                            <summary class="flex cursor-pointer items-center justify-between font-semibold text-text-light dark:text-text-dark">
                                                Module 2: Advanced Computer Vision
                                                <span class="material-symbols-outlined transition-transform duration-300 group-open:rotate-180">expand_more</span>
                                            </summary>
                                            <p class="mt-3 text-slate-600 dark:text-slate-400">
                                                Deep dive into Convolutional Neural Networks (CNNs), object detection, image segmentation, and facial recognition models.
                                            </p>
                                        </details>

                                        <details class="group rounded-lg bg-white dark:bg-slate-800 border border-border-light dark:border-border-dark p-4">
                                            <summary class="flex cursor-pointer items-center justify-between font-semibold text-text-light dark:text-text-dark">
                                                Module 3: Introduction to Extended Reality (XR)
                                                <span class="material-symbols-outlined transition-transform duration-300 group-open:rotate-180">expand_more</span>
                                            </summary>
                                            <p class="mt-3 text-slate-600 dark:text-slate-400">
                                                Understanding the fundamentals of VR, AR, and MR. Developing basic applications using Unity or Unreal Engine.
                                            </p>
                                        </details>
                                    </div>
                                </div>
                            </div>

                            <div class="lg:sticky top-28 h-fit flex flex-col gap-6">
                                <div class="rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-slate-800 p-6 flex flex-col gap-5 shadow-sm">
                                    <button class="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-base font-bold leading-normal transition-colors hover:bg-primary/90">
                                        <span>Enroll Now</span>
                                    </button>
                                    <button class="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-accent text-primary hover:underline text-base font-bold leading-normal transition-colors hover:bg-accent/90">
                                        <span>Download Program Brochure</span>
                                    </button>
                                    <div class="border-t border-border-light dark:border-border-dark pt-5 flex flex-col gap-4">
                                        <h4 class="font-bold text-lg text-text-light dark:text-text-dark">Course Highlights</h4>
                                        <ul class="flex flex-col gap-3">
                                            <li class="flex items-start gap-3">
                                                <span class="material-symbols-outlined text-accent mt-0.5">check_circle</span>
                                                <span class="text-slate-600 dark:text-slate-400">Live interactive sessions with IIT Guwahati faculty</span>
                                            </li>
                                            <li class="flex items-start gap-3">
                                                <span class="material-symbols-outlined text-accent mt-0.5">check_circle</span>
                                                <span class="text-slate-600 dark:text-slate-400">Hands-on projects with industry-relevant datasets</span>
                                            </li>
                                            <li class="flex items-start gap-3">
                                                <span class="material-symbols-outlined text-accent mt-0.5">check_circle</span>
                                                <span class="text-slate-600 dark:text-slate-400">Dedicated career support and placement assistance</span>
                                            </li>
                                            <li class="flex items-start gap-3">
                                                <span class="material-symbols-outlined text-accent mt-0.5">check_circle</span>
                                                <span class="text-slate-600 dark:text-slate-400">Earn a prestigious certificate from a top-tier university</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="border-t border-border-light dark:border-border-dark pt-5 flex flex-col gap-3">
                                        <h4 class="font-bold text-lg text-text-light dark:text-text-dark">Next Cohort Starts</h4>
                                        <p class="text-slate-600 dark:text-slate-400">August 25, 2024</p>
                                        <a class="text-sm font-semibold text-primary hover:underline" href="#">Contact Advisor</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </main>
    )
}
export default course