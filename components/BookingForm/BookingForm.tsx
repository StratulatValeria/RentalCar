"use client";
import { forwardRef, HTMLProps, useState } from "react";
import css from "./BookingForm.module.css";
import { toast } from "react-toastify";
import { formatId } from "@/lib/utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface CustomInputProps extends HTMLProps<HTMLInputElement> {
  value?: string;
  onClick?: () => void;
  placeholder?: string;
  required?: boolean;
}

const CustomDateInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ value, onClick, placeholder, required }, ref) => (
    <input
      value={value}
      onClick={onClick}
      placeholder={placeholder}
      onChange={() => {}}
      ref={ref}
      className={css.input}
      required={required}
      inputMode="none"
    />
  ),
);

CustomDateInput.displayName = "CustomDateInput";
export const BookingForm = ({ carId }: { carId: string }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bookingDate: "",
    comment: "",
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.bookingDate) {
      toast.error("Please select a booking date!", {
        theme: "colored",
      });
      return;
    }

    toast.success(
      `Success! Car (ID: ${formatId(carId)}) has been booked for ${formData.name}.`,
      {
        theme: "colored",
      },
    );
    setFormData({ name: "", email: "", bookingDate: "", comment: "" });
  };
  return (
    <div className={css.formCard}>
      <h3 className={css.title}>Book your car now</h3>
      <p className={css.subtitle}>
        Stay connected! We are always ready to help you.
      </p>
      <form onSubmit={handleSubmit} className={css.form}>
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

        <div className={css.datePickerWrapper}>
          <DatePicker
            selected={
              formData.bookingDate ? new Date(formData.bookingDate) : null
            }
            onChange={(date: Date | null) =>
              setFormData({
                ...formData,
                bookingDate: date ? date.toISOString() : "",
              })
            }
            minDate={new Date()}
            calendarStartDay={1}
            formatWeekDay={(name) => name.substring(0, 3).toUpperCase()}
            placeholderText="Booking date*"
            dateFormat="dd.MM.yyyy"
            showPopperArrow={true}
            customInput={<CustomDateInput required={true} />}
            required
          />
        </div>

        <textarea
          placeholder="Comment"
          value={formData.comment}
          onChange={(e) =>
            setFormData({ ...formData, comment: e.target.value })
          }
          className={css.textarea}
        />
        <button type="submit" className={css.sendBtn}>
          Send
        </button>
      </form>
    </div>
  );
};
