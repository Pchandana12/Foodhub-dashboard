
import { useEffect, useState } from "react";

function Settings() {
  const [profile, setProfile] = useState({
    name: "Chandana",
    email: "chandana@gmail.com",
    phone: "",
  });

  const [notifications, setNotifications] = useState(true);
  const [message, setMessage] = useState("");

  // Profile picture state
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage") || ""
  );

  // Password states
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");

  // Load saved settings
  useEffect(() => {
    const savedProfile = localStorage.getItem("profile");
    const savedNotifications = localStorage.getItem("notifications");

    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }

    if (savedNotifications !== null) {
      setNotifications(JSON.parse(savedNotifications));
    }
  }, []);

  // Handle profile changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  // Handle profile image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("Please select a valid image.");
      e.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setMessage("Image size should be less than 2 MB.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      if (reader.error) {
        setMessage("Unable to read this image.");
        return;
      }

      const imageData = reader.result;

      try {
        localStorage.setItem("profileImage", imageData);
        setProfileImage(imageData);
        setMessage("Profile picture updated successfully!");
      } catch (error) {
        setMessage("Unable to save image. Try a smaller image.");
      }
    };

    reader.readAsDataURL(file);
    e.target.value = "";
  };

  // Remove profile picture
  const handleRemoveImage = () => {
    localStorage.removeItem("profileImage");
    setProfileImage("");
    setMessage("Profile picture removed successfully!");
  };

  // Save settings
  const handleSave = (e) => {
    e.preventDefault();

    localStorage.setItem("profile", JSON.stringify(profile));
    localStorage.setItem(
      "notifications",
      JSON.stringify(notifications)
    );

    setMessage("Settings saved successfully!");
  };

  // Reset settings
  const handleReset = () => {
    const defaultProfile = {
      name: "Chandana",
      email: "chandana@gmail.com",
      phone: "",
    };

    setProfile(defaultProfile);
    setNotifications(true);

    localStorage.setItem("profile", JSON.stringify(defaultProfile));
    localStorage.setItem("notifications", JSON.stringify(true));

    setMessage("Settings reset successfully!");
  };

  // Handle password changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setPasswords((prevPasswords) => ({
      ...prevPasswords,
      [name]: value,
    }));

    setPasswordMessage("");
  };

  // Password strength checker
  const getPasswordStrength = (password) => {
    if (!password) return "";

    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return "Weak";
    if (score === 3) return "Medium";

    return "Strong";
  };

  const passwordStrength = getPasswordStrength(
    passwords.newPassword
  );

  // Update password
  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = passwords;

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordMessage("Please fill all password fields.");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordMessage("Password must contain at least 8 characters.");
      return;
    }

    if (
      !/[A-Z]/.test(newPassword) ||
      !/[0-9]/.test(newPassword) ||
      !/[^A-Za-z0-9]/.test(newPassword)
    ) {
      setPasswordMessage(
        "Include an uppercase letter, a number and a special character."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage(
        "New password and confirm password do not match."
      );
      return;
    }

    // Frontend demo only
    const savedPassword =
      localStorage.getItem("demoPassword") || "Foodhub@123";

    if (currentPassword !== savedPassword) {
      setPasswordMessage("Current password is incorrect.");
      return;
    }

    localStorage.setItem("demoPassword", newPassword);

    setPasswords({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setPasswordMessage("Password updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-3xl rounded-xl bg-white p-6 shadow-md">

        {/* Page Heading */}
        <h1 className="mb-2 text-2xl font-bold text-gray-800">
          Settings
        </h1>

        <p className="mb-6 text-gray-500">
          Manage your account and notification preferences.
        </p>

        {/* Profile Picture */}
        <div className="mb-6 rounded-lg bg-gray-50 p-5">

          <h2 className="mb-4 text-lg font-semibold text-gray-700">
            Profile Picture
          </h2>

          <div className="flex flex-wrap items-center gap-5">

            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="h-24 w-24 rounded-full border-2 border-gray-200 object-cover"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-3xl font-bold text-blue-600">
                C
              </div>
            )}

            <div>
              <label className="inline-block cursor-pointer rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700">
                Upload Picture

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              {profileImage && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="ml-3 rounded-lg border border-red-500 px-4 py-2 text-red-600 hover:bg-red-50"
                >
                  Remove
                </button>
              )}

              <p className="mt-3 text-xs text-gray-500">
                JPG, PNG or other image formats. Maximum 2 MB.
              </p>
            </div>

          </div>
        </div>

        {/* Profile Settings */}
        <form onSubmit={handleSave}>

          <h2 className="mb-4 text-lg font-semibold text-gray-700">
            Profile Information
          </h2>

          <div className="mb-4">
            <label className="mb-2 block font-medium text-gray-700">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-4">
            <label className="mb-2 block font-medium text-gray-700">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6">
            <label className="mb-2 block font-medium text-gray-700">
              Phone Number
            </label>

            <input
              type="tel"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
              placeholder="Enter your phone number"
            />
          </div>

          {/* Notification Settings */}
          <div className="mb-6 rounded-lg bg-gray-50 p-4">

            <h2 className="mb-3 font-semibold text-gray-700">
              Notification Settings
            </h2>

            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) =>
                  setNotifications(e.target.checked)
                }
                className="h-5 w-5 accent-blue-600"
              />

              <span className="text-gray-700">
                Enable notifications
              </span>
            </label>
          </div>

          {message && (
            <p className="mb-4 rounded-lg bg-green-100 p-3 text-sm text-green-700">
              {message}
            </p>
          )}

          {/* Action Buttons */}
          <div className="mb-8 flex flex-wrap gap-3">

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
            >
              Save Settings
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="rounded-lg border border-red-500 px-5 py-3 font-medium text-red-600 hover:bg-red-50"
            >
              Reset Settings
            </button>

          </div>
        </form>

        {/* Password & Security */}
        <div className="border-t border-gray-200 pt-6">

          <h2 className="mb-2 text-lg font-semibold text-gray-700">
            Password & Security
          </h2>

          <p className="mb-5 text-sm text-gray-500">
            Update your password to keep your account secure.
          </p>

          <form onSubmit={handlePasswordSubmit}>

            {/* Password Inputs */}
            {[
              {
                label: "Current Password",
                name: "currentPassword",
              },
              {
                label: "New Password",
                name: "newPassword",
              },
              {
                label: "Confirm New Password",
                name: "confirmPassword",
              },
            ].map((field) => (
              <div className="mb-4" key={field.name}>

                <label className="mb-2 block font-medium text-gray-700">
                  {field.label}
                </label>

                <input
                  type={showPassword ? "text" : "password"}
                  name={field.name}
                  value={passwords[field.name]}
                  onChange={handlePasswordChange}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
                />

                {/* Password Strength */}
                {field.name === "newPassword" &&
                  passwords.newPassword && (
                    <div className="mt-3">

                      <p className="mb-2 text-sm font-medium text-gray-700">
                        Password Strength:{" "}
                        <span
                          className={
                            passwordStrength === "Weak"
                              ? "text-red-600"
                              : passwordStrength === "Medium"
                              ? "text-yellow-600"
                              : "text-green-600"
                          }
                        >
                          {passwordStrength}
                        </span>
                      </p>

                      <div className="flex gap-2">

                        {[1, 2, 3, 4].map((item) => {
                          const score =
                            passwordStrength === "Weak"
                              ? 1
                              : passwordStrength === "Medium"
                              ? 3
                              : 4;

                          return (
                            <div
                              key={item}
                              className={`h-2 flex-1 rounded-full ${
                                item <= score
                                  ? passwordStrength === "Weak"
                                    ? "bg-red-500"
                                    : passwordStrength === "Medium"
                                    ? "bg-yellow-500"
                                    : "bg-green-500"
                                  : "bg-gray-200"
                              }`}
                            />
                          );
                        })}

                      </div>
                    </div>
                  )}

              </div>
            ))}

            {/* Show Password */}
            <label className="mb-4 flex cursor-pointer items-center gap-2 text-sm text-gray-600">

              <input
                type="checkbox"
                checked={showPassword}
                onChange={(e) =>
                  setShowPassword(e.target.checked)
                }
                className="h-4 w-4 accent-blue-600"
              />

              Show passwords
            </label>

            {/* Password Requirements */}
            <div className="mb-4 rounded-lg bg-gray-50 p-3 text-sm text-gray-600">

              <p className="mb-2 font-medium">
                Password requirements:
              </p>

              <ul className="list-inside list-disc space-y-1">
                <li>At least 8 characters</li>
                <li>One uppercase letter</li>
                <li>One number</li>
                <li>One special character</li>
              </ul>

            </div>

            {/* Password Message */}
            {passwordMessage && (
              <p
                className={`mb-4 rounded-lg p-3 text-sm ${
                  passwordMessage.includes("successfully")
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {passwordMessage}
              </p>
            )}

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
            >
              Update Password
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}

export default Settings;
