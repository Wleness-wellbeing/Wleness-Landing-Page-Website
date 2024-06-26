"use client";
import { useEffect } from "react";
import useToken from "@utils/useToken";
import { useRouter } from "next/navigation";
import ExpertsDashboard from "@components/Dashboard/Experts/ExpertsLayout";
import { expertsIconDp } from "@public";
import Image from "next/image";
import { getLocalItem } from "@utils";

export default function ExpertsPayment() {
  const { token } = useToken();
  const router = useRouter();

  // ======== Get user appointments and details ===========
  let wleness_user = JSON.parse(getLocalItem("wleness_user"));

  // Navigate to login
  useEffect(() => {
    if (
      token == null ||
      token == "" ||
      token == undefined ||
      wleness_user.type != "expert"
    ) {
      router.push("/experts/login", {
        state: {
          successMessage: "Please Login",
        },
      });
      return null;
    }
  });

  return (
    <ExpertsDashboard>
      <section>
        <div className="flex text-xl lg:text-3xl">
          <h1 className="py-2 font-bold text-teal-500 lg:mb-2 lg:py-6">
            <span>Payment Information </span>
          </h1>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-y-[1px] border-primary-300 bg-primary-10 text-left">
              <th className="py-4 pl-4 font-medium">Patient Name</th>
              <th className="py-4 font-medium">Issue</th>
              <th className="py-4 font-medium">Date</th>
              <th className="py-4 font-medium">Time</th>
              <th className="py-4 font-medium">Price</th>
              <th className="py-4 font-medium">Sessions</th>
              <th className="py-4 font-medium">Mode of Payment</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((value, i) => {
              let active;
              if (value % 2 == 0) {
                active = true;
              } else {
                active = false;
              }
              return (
                <tr
                  key={i}
                  className={
                    active
                      ? "border-y-[1px] border-primary-300 bg-primary-10"
                      : ""
                  }
                >
                  <td className="flex items-center py-2 pl-4 font-medium">
                    <Image
                      src={expertsIconDp}
                      alt=""
                      className="mr-2 h-10 w-10 object-cover"
                    />
                    Riya
                  </td>
                  <td className="py-2 font-medium">Anger</td>
                  <td className="py-2 font-medium">12-09-2023</td>
                  <td className="py-2 font-medium">12:00 PM</td>
                  <td className="py-2 font-medium">2500</td>
                  <td className="py-2 font-medium">01 Session</td>
                  <td className="py-2 font-medium">Card</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </ExpertsDashboard>
  );
}
