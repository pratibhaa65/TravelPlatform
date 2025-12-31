import React from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaTicketAlt } from "react-icons/fa";

const About = () => {
    return (
        <section id="about" className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6">

                <h2 className=" text-center text-4xl font-bold text-gray-900 mb-12">
                    About Us
                </h2>

                <div className="flex flex-col  gap-12">

                    <div>
                        <p className="text-black mb-6 leading-relaxed">
                            At <span className="text-green-500 font-semibold">DeshTrip</span>, we believe
                            that travel should be easy, affordable, and truly memorable for everyone.
                            Built by travelers for travelers, we understand the excitement of exploring
                            new destinations as well as the challenges that come with planning a trip.
                            That’s why our goal is to simplify every step of your journey and help you
                            travel with complete confidence.
                        </p>

                        <p className="text-black mb-8 leading-relaxed">
                            From carefully handpicked trips and thoughtfully designed itineraries to
                            transparent pricing and round-the-clock customer support, we are committed
                            to delivering a seamless travel experience. Trusted by over 10,000 happy
                            travelers worldwide, DeshTrip focuses on offering authentic experiences,
                            smooth bookings, and reliable service—so you can spend less time worrying
                            about the details and more time enjoying what truly matters: the journey
                            itself.
                        </p>


                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            We offer top travel features just for you
                        </h3>

                        <p className="text-black mb-10">
                            From personalized trip planning and expert travel guidance to fast, secure
                            reservations and exclusive deals, we take care of every detail so you can
                            enjoy a smooth, stress-free, and memorable journey.

                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div className="flex items-center gap-4">
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

                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-blue-600 text-white text-xl">
                                    <FaTicketAlt />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">
                                        Exclusive Travel Discounts
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
