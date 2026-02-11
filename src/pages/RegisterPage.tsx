// Register Page
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { apiService } from "../services/api";
import type { Group } from "../types";

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [groupId, setGroupId] = useState<number>(0);
  const [groups, setGroups] = useState<Group[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const groupsData = await apiService.getGroups();
        setGroups(groupsData);
      } catch (err) {
        console.error("Failed to fetch groups:", err);
      }
    };
    fetchGroups();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (groupId === 0) {
      setError("Please select a group");
      return;
    }

    setLoading(true);

    try {
      await register({ username, password, firstName, lastName, groupId });
      navigate("/dashboard");
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ACBAC4] to-[#30364F] flex items-center justify-center p-8">
      <div
        className="w-full max-w-lg"
        style={{ display: "flex", flexDirection: "column", gap: "32px" }}
      >
        <div
          className="text-center"
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          <h1 className="text-6xl font-bold text-white drop-shadow-lg">
            VIKO Lectures
          </h1>
          <p className="text-2xl text-[#E1D9BC]">Create your account</p>
        </div>

        {error && (
          <div className="p-5 bg-red-50 border-2 border-red-300 text-red-700 rounded-lg">
            <p className="text-base font-medium">{error}</p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label
              htmlFor="username"
              className="block text-xl font-bold text-white"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-7 py-6 bg-white border-2 border-[#30364F] rounded-lg focus:ring-2 focus:ring-[#E1D9BC] focus:border-[#30364F] outline-none transition-all duration-200 text-gray-900 placeholder-gray-400 text-xl"
              placeholder="Choose a username"
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <label
                htmlFor="firstName"
                className="block text-xl font-bold text-white"
              >
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full px-7 py-6 bg-white border-2 border-[#30364F] rounded-lg focus:ring-2 focus:ring-[#E1D9BC] focus:border-[#30364F] outline-none transition-all duration-200 text-gray-900 placeholder-gray-400 text-xl"
                placeholder="First name"
              />
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <label
                htmlFor="lastName"
                className="block text-xl font-bold text-white"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full px-7 py-6 bg-white border-2 border-[#30364F] rounded-lg focus:ring-2 focus:ring-[#E1D9BC] focus:border-[#30364F] outline-none transition-all duration-200 text-gray-900 placeholder-gray-400 text-xl"
                placeholder="Last name"
              />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label
              htmlFor="group"
              className="block text-xl font-bold text-white"
            >
              Student Group
            </label>
            <select
              id="group"
              value={groupId}
              onChange={(e) => setGroupId(Number(e.target.value))}
              required
              className="w-full px-7 py-6 bg-white border-2 border-[#30364F] rounded-lg focus:ring-2 focus:ring-[#E1D9BC] focus:border-[#30364F] outline-none transition-all duration-200 text-gray-900 cursor-pointer text-xl"
            >
              <option value={0}>Select your group</option>
              {groups.map((group) => (
                <option key={group.ID} value={group.ID}>
                  {group.Name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label
              htmlFor="password"
              className="block text-xl font-bold text-white"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-7 py-6 bg-white border-2 border-[#30364F] rounded-lg focus:ring-2 focus:ring-[#E1D9BC] focus:border-[#30364F] outline-none transition-all duration-200 text-gray-900 placeholder-gray-400 pr-16 text-xl"
                placeholder="Choose a password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#30364F] hover:text-[#ACBAC4] transition-colors duration-200"
              >
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {showPassword ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  ) : (
                    <>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label
              htmlFor="confirmPassword"
              className="block text-xl font-bold text-white"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-7 py-6 bg-white border-2 border-[#30364F] rounded-lg focus:ring-2 focus:ring-[#E1D9BC] focus:border-[#30364F] outline-none transition-all duration-200 text-gray-900 placeholder-gray-400 text-xl"
              placeholder="Confirm your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ marginTop: "24px" }}
            className="w-full py-6 bg-[#30364F] text-white rounded-lg font-bold text-2xl hover:bg-opacity-90 transition-all duration-200 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-6 w-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Creating account...
              </span>
            ) : (
              "Get started"
            )}
          </button>
        </form>

        <div
          className="text-center"
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          <p className="text-lg text-white">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-[#E1D9BC] hover:text-white transition-colors underline"
            >
              Log in
            </Link>
          </p>
          <Link
            to="/"
            className="block text-lg text-[#E1D9BC] hover:text-white transition-colors font-semibold"
          >
            Back to welcome page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
