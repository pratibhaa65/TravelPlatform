import React, { useState, useEffect } from "react";
import Header from "../components/Header";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleContact = (e) => {
    e.preventDefault();

    console.log({ name, email, message });

    setSuccess(true);
    setName("");
    setEmail("");
    setMessage("");

    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="px-28">
      < Header />
      <section
        id="contact" className="py-12">
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-full max-w-lg bg-gray-50 p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-blue-900 mb-6 text-center">
              Contact Us
            </h2>

            {success && (
              <p className="mb-4 text-green-600 text-center font-medium">
                Message sent successfully!
              </p>
            )}
            {success && (
              <p className="mb-4 text-green-600 text-center font-medium">
                Message sent successfully!
              </p>
            )}

            <form onSubmit={handleContact}>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

                  <textarea
                    placeholder="Your Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows="4"
                    required
                    className="w-full mb-6 px-4 py-2 border rounded-md"
                  />

              <button
                type="submit"
                className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
