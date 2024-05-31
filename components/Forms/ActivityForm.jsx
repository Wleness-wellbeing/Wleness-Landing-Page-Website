import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { GENERAL_ENQUIRY_URI } from "@data/api";

export default function ActivityForm({ isOpen, onClose, purpose }) {
  if (!isOpen) return null;

  const router = useRouter();

  // Handle Joining Form
  const [formInfo, setFormData] = useState({
    full_name: "",
    email: "",
    number: "",
    location: "",
  });
  const [successMessage, setSuccessMessage] = useState({
    status: "",
    message: "",
  });

  // Close assessment modal on clicking outside of the box
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isOpen && !event.target.closest(".enquiry-form")) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  // ========== Handle Form Submission ==========
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formInfo, [name]: value });
  };

  // Handle Post Request
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate if form is filled
    if (
      formInfo["full_name"] &&
      formInfo["email"] &&
      formInfo["number"] &&
      formInfo["location"]
    ) {
      let formData = new FormData();
      // Append form fields to the FormData object
      for (const key in formInfo) {
        formData.append(key, formInfo[key]);
      }
      formData.append("purpose", purpose);

      axios
        .post(GENERAL_ENQUIRY_URI, formData)
        .then((response) => {
          setSuccessMessage({
            status: response.data.status,
            message: response.data.message,
          });

          if (response.data.status == "success") {
            setFormData({
              full_name: "",
              email: "",
              number: "",
              location: "",
            });
            onClose();
            router.push("/thank-you");
          }
        })
        .catch((error) => {
          console.error(error);
          setSuccessMessage({
            status: "error",
            message: "Internal Server Error! Please Try Again later",
          });
        });
    } else {
      setSuccessMessage({
        status: "error",
        message: "Please fill your details properly!",
      });
    }
  };

  return (
    <section className="fixed inset-0 z-50 grid animate-fadeIn place-items-center bg-primary-two/40 transition-all">
      <div className="enquiry-form w-4/5 animate-scaleIn rounded-2xl bg-slate-900 p-6 transition-all lg:w-[420px] border border-primary-one">
        <div className="text-center">
          <h2 className="subheading text-white">Enquire Now</h2>
        </div>

        <form onSubmit={handleSubmit} className="lg:py-2">
          <p
            className={`mb-2 text-center font-semibold ${
              successMessage.status == "success"
                ? " text-green-500 "
                : " text-red-500 "
            }`}
          >
            {successMessage.message}
          </p>

          <label htmlFor="full_name">
            <input
              type="text"
              name="full_name"
              id="full_name"
              placeholder="Full Name *"
              className="form-input"
              value={formInfo.full_name}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="number">
            <input
              type="text"
              name="number"
              id="number"
              placeholder="Phone Number *"
              className="form-input"
              value={formInfo.number}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="email">
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email *"
              className="form-input"
              value={formInfo.email}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="location">
            <input
              type="text"
              name="location"
              id="location"
              placeholder="Location *"
              className="form-input"
              value={formInfo.location}
              onChange={handleChange}
            />
          </label>
          <div className="grid grid-cols-2 justify-center lg:flex">
            <button
              type="reset"
              onClick={onClose}
              className="mr-2 rounded-2xl border-2 border-primary-one px-5 py-2 font-semibold text-primary-one transition-all hover:bg-primary-one hover:text-black"
            >
              Close
            </button>
            <button
              type="submit"
              className="rounded-2xl bg-primary-one px-5 py-2 font-semibold text-black  transition-all hover:border-primary-one"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
