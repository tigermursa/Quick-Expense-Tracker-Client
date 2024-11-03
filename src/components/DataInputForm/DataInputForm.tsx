"use client";

import { IExpenseData } from "@/types/ExpenseData";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import SummaryView from "../SummaryView/SummaryView";
import { useMaininputapiMutation } from "@/redux/features/data/dataApi";

const DataInputForm: React.FC = () => {
  const { user } = useAuth();
  const userID = user?.data?._id;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IExpenseData>();

  // Use the RTK mutation hook
  const [addExpense, { isLoading }] = useMaininputapiMutation();

  const onSubmit: SubmitHandler<IExpenseData> = async (data) => {
    try {
      // Add userID to the data
      const dataWithUserID = { ...data, userId: userID };

      // Call the mutation
      await addExpense(dataWithUserID).unwrap();

      // Show success toast notification
      toast.success("Expense added successfully!");

      // Reset the form fields after successful submission
      reset();
    } catch (error) {
      // Show error toast notification
      console.error(error);
      toast.error("Error adding expense.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen pt-2 container-style-design">
      <SummaryView />
      <div className="w-full max-w-md p-8 rounded-lg">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-100">
          What was the Expense today?
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-200 font-semibold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              placeholder="Write item name"
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
              className="block text-gray-200 font-semibold mb-2"
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
              <option value="Bazar">Bazar</option>
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
              className="block text-gray-200 font-semibold mb-2"
            >
              Amount
            </label>
            <input
              type="number"
              id="amount"
              placeholder="How much was that"
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
            className={`w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-800 transition duration-300 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Expense"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DataInputForm;
