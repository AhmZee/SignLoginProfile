"use client";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import ResetPasswordModal from "@/components/reset-password-modal.tsx";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const [showResetModal, setShowResetModal] = useState(false);

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    setData(res.data.data.username);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>

      <h2 className="p-1 rounded bg-green-500">
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>

      <button
        onClick={logout}
        className="bg-blue-500 mt-4 text-white py-2 px-4 rounded"
      >
        Logout
      </button>

      <button
        onClick={getUserDetails}
        className="bg-green-800 mt-4 text-white py-2 px-4 rounded"
      >
        Get user details
      </button>

      {/* ✅ Reset Password Button */}
      <button
        onClick={() => setShowResetModal(true)}
        className="bg-yellow-600 mt-4 text-white py-2 px-4 rounded"
      >
        Reset Password
      </button>

      {/* ✅ Modal */}
      {showResetModal && (
        <ResetPasswordModal onClose={() => setShowResetModal(false)} />
      )}
    </div>
  );
}
