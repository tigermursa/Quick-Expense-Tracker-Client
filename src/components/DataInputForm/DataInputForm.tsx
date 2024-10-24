"use client";

import { IExpenseData } from "@/types/ExpenseData";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";

const DataInputForm: React.FC = () => {
  // Use React Hook Form
  const {
    register,
    handleSubmit,
    reset, // Reset function to clear the form
    formState: { errors },
  } = useForm<IExpenseData>();

  // Form submission handler
  const onSubmit: SubmitHandler<IExpenseData> = async (data) => {
    try {
      const response = await fetch(`http://localhost:4000/api/v1/expenses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to add expense");
      }

      // Show success toast notification
      toast.success("Expense added successfully!");

      // Reset the form fields after successful submission
      reset();
    } catch (error) {
      // Show error toast notification
      console.log(error);
      toast.error("Error adding expense: ");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center">Add New Expense</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-semibold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors.name ? "border-red-500" : ""
              }`}
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Category */}
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-gray-700 font-semibold mb-2"
            >
              Category
            </label>
            <select
              id="category"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors.category ? "border-red-500" : ""
              }`}
              {...register("category", { required: "Category is required" })}
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Family">Family</option>
              <option value="Donate">Donate</option>
              <option value="Shopping">Shopping</option>
              <option value="Others">Others</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>

          {/* Amount */}
          <div className="mb-4">
            <label
              htmlFor="amount"
              className="block text-gray-700 font-semibold mb-2"
            >
              Amount
            </label>
            <input
              type="number"
              id="amount"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors.amount ? "border-red-500" : ""
              }`}
              {...register("amount", {
                required: "Amount is required",
                min: { value: 0, message: "Amount must be a positive number" },
              })}
              step="0.01"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm">{errors.amount.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default DataInputForm;
