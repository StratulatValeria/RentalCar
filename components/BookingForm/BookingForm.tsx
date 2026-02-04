"use client";
import { useState } from "react";
import css from "./BookingForm.module.css";
import { toast } from "react-toastify";

export const BookingForm = ({ carId }: { carId: string }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bookingDate: "",
    comment: "",
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    toast.success(
      `Success! Car (ID: ${carId}) has been booked for ${formData.name}.`,
      {
        theme: "colored",
      },
    );
    setFormData({ name: "", email: "", bookingDate: "", comment: "" });
  };
  return <div className={css.formCard}>
    <h3 className={css.title}>Book your car now</h3>
<p className={css.subtitle}>Stay connected! We are always ready to help you.</p>
  <form  onSubmit={handleSubmit} className={css.form}>
    <input
      type="text"
      placeholder=" Name*"
      required
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className={css.input}
    />

    <input
    type="email"
    placeholder=" Email*"
    required
    value={formData.email}
    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
    className={css.input}
    />

    <input 
    type="date"
    placeholder=" Booking Date*"
    required
    value={formData.bookingDate}
    onChange={(e) => setFormData({ ...formData, bookingDate: e.target.value })}
    className={css.input}
    />

    <textarea
    placeholder="Comment"
    value={formData.comment}
    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
    className={css.textarea}
    />
    <button type="submit" className={css.sendBtn}>Send</button>
</form>
  </div>;
};
