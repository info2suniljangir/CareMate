"use client";
import Image from "next/image";
import React, { useActionState, useState } from "react";
import { contactImageUrl } from "@/library/imageurl";
import { submitContactForm } from "@/library/action";



const ContactUs:React.FC = () => {

  const [message, formAction, isPending] = useActionState(submitContactForm, undefined);

  const [formValues, setFormValues] = useState<{fName: string, lName: string, email: string, mobileNumber: string, message: string}>({
    fName: "",
    lName: "",
    email: "",
    mobileNumber: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormValues(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };



  return (
    <form action={formAction} >
      <div className="wrapper " id="contactUs">
        <div className="flex sm:p-6 ">
          {/* Contact form */}
          <div className="w-full md:w-1/2 p-10 flex flex-col gap-4 bg-gray-50 md:rounded-l-lg rounded-lg text-sm md:pr-28">
          <div className="mb-8">
          <div className="font-medium text-2xl">Get in touch</div>
          <div className="text-gray-600">Lets chat about how over expert team can help</div>
          </div>
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="inline-block sm:w-1/2 w-full">
                <label htmlFor="fName" className="block">
                  First name
                </label>
                <input
                  type="text"
                  id="fName"
                  name="fName"
                  placeholder="First name"
                  className="outline-none border  border-gray-300 rounded px-2 py-1 w-full"
                  required
                  onChange={handleChange}
                  value={formValues.fName}
                />
              </div>

              <div className="inline-block sm:w-1/2 w-full">
                <label htmlFor="lName" className="block">
                  Last name
                </label>
                <input
                  type="text"
                  id="lName"
                  name="lName"
                  placeholder="Last name"
                  className="outline-none border  border-gray-300 rounded px-2 py-1 w-full"
                  required
                  onChange={handleChange}
                  value={formValues.lName}
                />
              </div>
            </div>

          
            <div className="">
              <label htmlFor="email" className="block">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                className="w-full outline-none border  border-gray-300 rounded px-2 py-1"
                required
                onChange={handleChange}
                value={formValues.email}
              />
            </div>

            <div className="">
              <label htmlFor="mobileNumber" className="block">
                Mobile number
              </label>
              <input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                placeholder="Mobile number"
                className="w-full outline-none border  border-gray-300 rounded px-2 py-1"
                required
                onChange={handleChange}
                value={formValues.mobileNumber}
              />
            </div>

            <div className="">
              <label htmlFor="message" className="block">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                placeholder="Type your message Here"
                className="w-full outline-none border  border-gray-300 rounded px-2 py-1"
                required
                onChange={handleChange}
                value={formValues.message}
              />
            </div>
            {message && <p className="text-red-700">{message}</p>}
            <button
            disabled={isPending}
            type="submit" className={`p-2 rounded ${isPending ? "bg-blue-200" : "bg-blue-500"} text-white`}>Submit</button>
          </div>
          {/* Image */}
          <div className="md:w-1/2  hidden md:block relative">
            <Image
              src={contactImageUrl}
              alt="contact.png"
              // height={400}
              // width={550}
              fill
              sizes="(min-width: 768px) 100vw"
              loading="lazy"
              className="rounded-r-lg"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default ContactUs;
