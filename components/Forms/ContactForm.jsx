"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { requestCallback } from "@public";
import { CONTACT_URI } from "@data/api";

function ContactForm() {
  const [formInfo, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState({
    status: "",
    message: "",
  });
  const router = useRouter();

  // Set alert message
  const setMessage = (status, message) => {
    setSuccessMessage({
      status: status,
      message: message,
    });
  };

  // Change form values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formInfo, [name]: value });
  };

  // Handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate if form is filled
    if (
      formInfo["name"] &&
      formInfo["email"] &&
      formInfo["number"] &&
      formInfo["message"]
    ) {
      let formData = new FormData();
      for (const key in formInfo) {
        formData.append(key, formInfo[key]);
      }
      axios
        .post(CONTACT_URI, formData)
        .then((response) => {
          setMessage(response.data.status, response.data.message);
          // Empty form after successfully sending data
          if (response.data.status == "success") {
            setFormData({
              name: "",
              email: "",
              number: "",
              message: "",
            });
            router.push("/thank-you");
          }
        })
        .catch((error) => {
          console.error("Error sending data:", error);
          setMessage("error", "Internal Server Error! Please Try Again later");
        });
    } else {
      setMessage("error", "Please fill your details!");
    }
  };

  return (
    <section className="container mx-auto mb-6 grid rounded-3xl bg-slate-900 px-8 py-12 md:grid-cols-2 lg:px-8 ">
      <div className="md:flex md:h-full md:flex-col md:px-6">
        <div>
          <h3 className="font-medium text-primary-one opacity-80 lg:text-lg">
            Need an expert&apos;s consulting?
          </h3>
          <h1 className="font-quicksand text-4xl font-bold leading-tight tracking-tight text-white opacity-90 xl:text-4xl">
            Request a Call Back
          </h1>

          <p className="pt-2 text-slate-400 opacity-90 lg:text-xl">
            Talk to your mental health professional.
          </p>
        </div>

        <div className="mt-5 items-center sm:flex">
          <Image
            className="mb-2 w-24 object-cover sm:mr-6"
            src={requestCallback}
            alt="contact"
          />
          <p className="font-medium leading-5 text-slate-400">
            Our Soul Healers are waiting
            <br />
            for your service.
          </p>
        </div>
      </div>

      <form
        className="flex flex-col pt-10 md:px-6 md:pt-0"
        onSubmit={handleSubmit}
      >
        <label className="mb-3">
          <input
            type="text"
            placeholder="Enter Your Name"
            value={formInfo.name}
            name="name"
            onChange={handleChange}
            className="block w-full rounded-md px-6 py-4 shadow-md bg-transparent text-white outline-none border border-slate-500"
          />
        </label>
        <label className="mb-3">
          <input
            type="tel" // Use "tel" for phone numbers
            placeholder="Your number"
            name="number"
            value={formInfo.number}
            onChange={handleChange}
            className="block w-full rounded-md px-6 py-4 shadow-md bg-transparent text-white outline-none border border-slate-500"
          />
        </label>
        <label className="mb-3">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formInfo.email}
            onChange={handleChange}
            className="block w-full rounded-md px-6 py-4 shadow-md bg-transparent text-white outline-none border border-slate-500"
          />
        </label>
        <label className="mb-3">
          <input
            type="text"
            placeholder="Message"
            name="message"
            value={formInfo.message}
            onChange={handleChange}
            className="block w-full rounded-md px-6 py-4 shadow-md bg-transparent text-white outline-none border border-slate-500"
          />
        </label>
        <p
          className={`text-center font-semibold ${
            successMessage.status == "success"
              ? " text-green-500 "
              : " text-red-500 "
          }`}
        >
          {successMessage.message}
        </p>
        <button type="submit" className="btn-one mx-auto mt-4">
          Submit
        </button>
      </form>
    </section>
  );
}

export default ContactForm;
