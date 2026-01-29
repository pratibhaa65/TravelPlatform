import React from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaTicketAlt, FaHeadset, FaGlobeAsia, FaUndo } from "react-icons/fa";

const About = () => {
    return (
        <section id="about" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className=" text-center text-4xl font-bold text-gray-900 mb-8">
                    About Us
                </h2>
                <div className="flex flex-col  gap-12 ">
                    <div>
                        <h3 className="text-2xl font-semibold text-center text-gray-900 mb-8">
                            We offer top travel features just for you
                        </h3>
                       
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50">
                                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-orange-500 text-white text-xl">
                                    <FaMapMarkerAlt />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">
                                        Expert Travel Guides
                                    </h4>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50">
                                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-yellow-400 text-white text-xl">
                                    <FaCalendarAlt />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">
                                        Fast & Secure Reservations
                                    </h4>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50">
                                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-blue-600 text-white text-xl">
                                    <FaTicketAlt />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">
                                        Exclusive Travel Discounts
                                    </h4>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50">
                                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-green-600 text-white text-xl">
                                    <FaHeadset />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">
                                        24/7 Customer Support
                                    </h4>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50">
                                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-purple-600 text-white text-xl">
                                    <FaGlobeAsia />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">
                                        Handpicked Destinations
                                    </h4>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50">
                                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-red-500 text-white text-xl">
                                    <FaUndo />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">
                                        Flexible Cancellation
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
