"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useToken from "@utils/useToken";
import AuthLayout from "@components/Authentication/AuthLayout";
import AuthHeading from "@components/Authentication/AuthHeading";
import useLogin from "./useLogin";
import { EXPERTS_LOGIN } from "@data/urls";

export default function page() {
  const router = useRouter();
  const { token, setToken } = useToken();

  // Redirect user if loggedin
  useEffect(() => {
    if (token && token !== "" && token !== undefined) {
      // Navigate to login
      router.push("/");
    }
  }, []);

  const {
    successMessage,
    formInfo,
    handleSubmit,
    handleChange,
    handleGoogleSignIn,
    handleFacebookSignIn,
  } = useLogin({ setToken });

  // Handle Redirect Messsages
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paramValue = urlParams.get("source");

    if (paramValue == "passwordReset") {
      setMessages("success", "Password reset successfully! Please Login");
    }
  }, []);

  return (
    <AuthLayout name={"login"}>
      <div className="text-center">
        <AuthHeading
          title="Sign in to Wleness"
          google={handleGoogleSignIn}
          facebook={handleFacebookSignIn}
        />

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="mx-auto mb-4 lg:w-96">
          {successMessage.status == "" ? (
            location.state &&
            location.state.successMessage && (
              <p className="mb-3 text-center font-semibold text-red-500">
                {location.state.successMessage}
              </p>
            )
          ) : (
            <p
              className={`mb-3 text-center font-semibold ${
                successMessage.status == "success"
                  ? " text-green-500 "
                  : " text-red-500 "
              }`}
            >
              {successMessage.message}
            </p>
          )}
          <div className="mb-4 flex items-center rounded-md bg-slate-100">
            <label htmlFor="username">
              <FontAwesomeIcon icon={faUser} className="px-4 text-slate-400" />
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Email or Mobile Number"
              value={formInfo.username}
              onChange={handleChange}
              className="w-full bg-transparent py-2.5 pr-4 outline-none xl:py-3.5"
            />
          </div>
          <div className="mb-2 flex items-center rounded-md bg-slate-100">
            <label htmlFor="password">
              <FontAwesomeIcon icon={faLock} className="px-4 text-slate-400" />
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={formInfo.password}
              onChange={handleChange}
              className="w-full bg-transparent py-2.5 pr-4 outline-none xl:py-3.5"
            />
          </div>
          <div className="mb-6 text-right">
            <Link
              href="/forgot-password"
              className="inline-block text-sm font-semibold text-primary-one"
            >
              Forgot Password?
            </Link>
          </div>
          <button className="rounded-full border-2 border-primary-one px-5 py-2 text-sm font-bold text-primary-one xl:px-12 xl:py-3">
            SIGN IN
          </button>
        </form>
        <div className="font-semibold text-slate-400">
          <Link
            href={EXPERTS_LOGIN}
            className="inline-block text-primary-one underline underline-offset-2"
          >
            Login
          </Link>
          <span> as an Expert</span>
        </div>
      </div>
    </AuthLayout>
  );
}
