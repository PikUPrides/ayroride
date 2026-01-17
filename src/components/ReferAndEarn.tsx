"use client";

import { useState } from "react";
import styles from "../app/page.module.css";

export default function ReferAndEarn() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+1",
    phone: "",
    userType: "Rider",
  });

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          phone: `${formData.countryCode}${formData.phone}`,
          name: formData.name,
          userType: formData.userType,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          countryCode: "+1",
          userType: "Rider",
        });
      } else {
        console.error("Submission failed:", data);
        setStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
    }
  };

  return (
    <section className={styles.referSection}>
      <div className={styles.referContent}>
        <div className={styles.referText}>
          <h2>
            Refer and <span style={{ color: "#423DF9" }}>Earn</span>
          </h2>
          <p>Join the waitlist now and get your unique referral link</p>
        </div>
        <div className={styles.referFormWrapper}>
          <form className={styles.referForm} onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className={styles.referInput}
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className={styles.referInput}
              value={formData.email}
              onChange={handleChange}
              required
            />
            <div className={styles.phoneRow}>
              <select
                name="countryCode"
                className={styles.countrySelect}
                value={formData.countryCode}
                onChange={handleChange}
              >
                <option value="+1">+1 (US)</option>

                {/* Add more codes as needed */}
              </select>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                className={styles.phoneInput}
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            {/* Radio Buttons for User Type */}
            <div className={styles.userTypeSection}>
              <label className={styles.userTypeLabel}>
                Are you interested in signing up as?
              </label>
              <div className={styles.radioGroup}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="userType"
                    value="Rider"
                    checked={formData.userType === "Rider"}
                    onChange={handleChange}
                    className={styles.radioInput}
                  />
                  <span>Rider</span>
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="userType"
                    value="Driver"
                    checked={formData.userType === "Driver"}
                    onChange={handleChange}
                    className={styles.radioInput}
                  />
                  <span>Driver</span>
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="userType"
                    value="Rider & Driver"
                    checked={formData.userType === "Rider & Driver"}
                    onChange={handleChange}
                    className={styles.radioInput}
                  />
                  <span>Both</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className={styles.referSubmitBtn}
              disabled={status === "loading"}
            >
              {status === "loading" ? "Joining..." : "Join Waitlist"}
            </button>

            {status === "success" && (
              <p
                style={{
                  color: "#08D9C4",
                  marginTop: "10px",
                  textAlign: "center",
                  fontWeight: "600",
                }}
              >
                ✓ Thank you for joining!
              </p>
            )}
            {status === "error" && (
              <p
                style={{ color: "red", marginTop: "10px", textAlign: "center" }}
              >
                Something went wrong. Please try again.
              </p>
            )}

            <p className={styles.referDisclaimer}>
              By clicking, you agree to our <a href="#">Terms & Conditions</a>{" "}
              and <a href="#">Privacy Policy</a>.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
