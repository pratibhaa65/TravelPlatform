import React from 'react'

const partners = () => {

    const partners = [
        { name: "Everest Hotel", logo: "/everest.png" },
        { name: "Marriot Hotel", logo: "/marriot.png" },
        { name: "Pauwa Hotel", logo: "/pauwa.jpg" },
        { name: "Tiger Palace Resort", logo: "/tigerpalace.jpg" },
        { name: "Yeti Airlines", logo: "/yeti.png" },
        { name: "Bus Sewa", logo: "/bussewa.png" },
        { name: "Nepal Airlines", logo: "/nepalairlines.png" },
    ];

    return (
        <>


            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto ">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Our Travel Partners
                    </h2>
                    <div className="flex items-center justify-between gap-8 overflow-x-auto">
                        {partners.map((partner, index) => (
                            <div key={index} className="flex flex-col items-center min-w-3">
                                <img
                                    src={partner.logo}
                                    alt={partner.name}
                                    className="w-32 h-auto object-contain opacity-100 hover:opacity-80 transition"
                                />
                                <p className="mt-4 text-gray-700 font-medium">{partner.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section></>
    )
}

export default partners;