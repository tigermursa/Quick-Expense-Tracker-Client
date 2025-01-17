"use client";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";
interface IRegisterFormInput {
  name: string;
  email: string;
  password: string;
}

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IRegisterFormInput>();
  const [registerUser, { isLoading }] = useRegisterMutation();

  const onSubmit: SubmitHandler<IRegisterFormInput> = async (data) => {
    try {
      await registerUser(data).unwrap();
      toast.success("Good job");
      reset(); // Clear form after successful submission
      router.push("/");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("NOOO!");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 container-style-design">
      <div className="w-full max-w-md  p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Register
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium text-gray-100"
              htmlFor="name"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500`}
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>

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
            className="w-full py-2 px-4 bg-pink-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
      <div className=" text-gray-300 flex mt-5">
        <p className="me-2">Already have account ? </p>{" "}
        <Link href={"/auth/login"} className="underline hover:text-blue-400">
          {" "}
          Login now
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
