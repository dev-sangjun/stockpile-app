import { FC, useState } from "react";
import useUserForm from "./useUserForm";

const UserForm: FC = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const { handleInputChange, handleSubmit } = useUserForm(isSignIn);
  const formActionText = isSignIn ? "Sign in" : "Sign up";
  return (
    <div className="card flex flex-col gap-4 bg-base-100 p-12 w-full max-w-lg">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">{formActionText}</h2>
        <span className="">
          {isSignIn
            ? "Welcome back! Let's verify your identity."
            : "Welcome! Please enter your details to sign up."}
        </span>
      </div>
      <form className="flex flex-col w-full" onSubmit={handleSubmit}>
        {!isSignIn && (
          <>
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              className="input input-bordered w-full"
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleInputChange}
            />
          </>
        )}
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          className="input input-bordered w-full"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleInputChange}
        />
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          className="input input-bordered w-full"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleInputChange}
        />
        <button className="btn btn-primary normal-case text-base-100 mt-4">
          {formActionText}
        </button>
      </form>
      <div className="flex justify-center items-center w-full">
        <span>
          {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
        </span>
        <button
          className="btn btn-link normal-case no-underline hover:no-underline"
          onClick={() => setIsSignIn(prev => !prev)}
        >
          {isSignIn ? "Sign up" : "Sign in"}
        </button>
      </div>
    </div>
  );
};

export default UserForm;
