"use client";
import { forwardRef, HTMLProps, useState } from "react";
import css from "./BookingForm.module.css";
import { toast } from "react-toastify";
import { formatId } from "@/lib/utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loader from "../Loader/Loader";

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
      readOnly
      ref={ref}
      className={css.input}
      required={required}
      inputMode="none"
    />
  ),
);

CustomDateInput.displayName = "CustomDateInput";

export const BookingForm = ({ carId }: { carId: string }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bookingDate: "",
    comment: "",
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.bookingDate) {
      toast.error("Please select a booking date!", {
        theme: "colored",
      });
      return;
    }
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success(
        `Success! Car (ID: ${formatId(carId)}) has been booked for ${formData.name}.`,
        {
          theme: "colored",
        },
      );
      setFormData({ name: "", email: "", bookingDate: "", comment: "" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className={css.formCard}>
      {isSubmitting && <Loader />}
      <h3 className={css.title}>Book your car now</h3>
      <p className={css.subtitle}>
        Stay connected! We are always ready to help you.
      </p>
      <form
        onSubmit={handleSubmit}
        className={css.form}
        style={{
          opacity: isSubmitting ? 0.3 : 1,
          pointerEvents: isSubmitting ? "none" : "all",
        }}
      >
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
            popperPlacement="bottom-end"
            showPopperArrow={true}
            shouldCloseOnSelect={false}
            customInput={<CustomDateInput required={true} />}
            portalId="root-portal"
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
        <button type="submit" className={css.sendBtn} disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
};
