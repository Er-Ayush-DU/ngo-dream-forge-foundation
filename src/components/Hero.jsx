"use client";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-purple-50 via-white to-blue-50 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center justify-between gap-10">

        {/* Left Content */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-purple-700 mb-6">
            Connecting Helpers, Protecting Homes
          </h1>

          <p className="text-gray-800 leading-relaxed text-justify mb-8">
            <strong>SAMIP:</strong> The Integrated Solution — At the heart of LUP's operations is
            SAMIP (Society All-in-one Management Integrated Platform), an innovative
            software platform designed to streamline various services and manage community
            issues effectively. SAMIP caters to two main user groups: residents and workers,
            offering a comprehensive suite of features including Attendance Management,
            Garbage Collection Management, Vehicle Management, Vendor Management, Complaint
            Management System, and SOS Alerts for emergencies. QR-based systems enable
            attendance tracking and transparency through smartphone apps, ensuring ease of
            access to information.
          </p>

          {/* Learn More Button */}
          <Link
            href="/about"
            className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Learn More
          </Link>
        </div>

        {/* Right Image */}
        <div className="lg:w-1/2 flex justify-center">
          <img
            src="/hero_image.png" // make sure this file is inside /public folder
            alt="Helping Hands Illustration"
            className="w-full max-w-md lg:max-w-lg object-contain"
          />
        </div>

      </div>
    </section>
  );
}
