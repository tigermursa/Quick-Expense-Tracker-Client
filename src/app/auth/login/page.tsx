"use client";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface ILoginFormInput {
  email: string;
  password: string;
}

interface IError {
  data: {
    message: string;
  };
}

const LoginPage: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ILoginFormInput>();
  const [loginUser, { isLoading }] = useLoginMutation();

  const onSubmit: SubmitHandler<ILoginFormInput> = async (data) => {
    try {
      // Extract the response from loginUser which includes the userId
      const response = await loginUser(data).unwrap();

      // Assuming response has a userId, store it in localStorage
      if (response && response.userId) {
        localStorage.setItem("userId", response.userId);
      }

      toast.success("Login successful!");
      reset(); // Clear form after successful login
      router.push("/");
    } catch (error) {
      const err = error as IError;
      toast.error(err.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen container-style">
      <div className="w-full max-w-md  p-6 ">
        <h2 className="text-2xl font-bold mb-6 text-gray-100 text-center">
          Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium text-gray-100"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500`}
              {...register("email", {
                required: "Email is required",
                
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
              })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-100"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500`}
              {...register("password", {
                required: "Password is required",
                
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-pink-600 text-white rounded-md shadow-sm hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
