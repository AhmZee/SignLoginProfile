"use client";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface Props {
  onClose: () => void;
}

const ResetPasswordModal: React.FC<Props> = ({ onClose }) => {
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (
      !passwords.oldPassword ||
      !passwords.newPassword ||
      !passwords.confirmPassword
    ) {
      return toast.error("All fields are required");
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      const res = await axios.post("/api/users/reset-password", {
        oldPassword: passwords.oldPassword,
        newPassword: passwords.newPassword,
      });

      toast.success(res.data.message || "Password updated");

      onClose();
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-87.5">
        <h2 className="text-xl font-bold mb-4">Reset Password</h2>

        <input
          type="password"
          placeholder="Old Password"
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) =>
            setPasswords({ ...passwords, oldPassword: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="New Password"
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) =>
            setPasswords({ ...passwords, newPassword: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          className="w-full mb-4 p-2 border rounded"
          onChange={(e) =>
            setPasswords({ ...passwords, confirmPassword: e.target.value })
          }
        />

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-400 px-4 py-2 rounded text-white"
          >
            Cancel
          </button>

          <button
            onClick={handleReset}
            className="bg-blue-600 px-4 py-2 rounded text-white"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordModal;
