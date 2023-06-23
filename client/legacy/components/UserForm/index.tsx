import { FC, useEffect, useState } from "react";
import { getUserFormTexts } from "./user-form.utils";
import { renderAlertErrorMessages } from "./renderers";
import useUserForm from "./useUserForm";
import { createUser, signInUser } from "../../api/auth.api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../states/store";
import { asyncFetchUser } from "../../states/user.reducer";
import {
  PrismaError,
  getPrismaErrorAlertMessages,
  isPrismaError,
} from "../../utils/error.utils";
import { notify } from "../../utils/toast.utils";
import { renderFieldErrorMessages } from "../../utils/renderers.utils";

const UserForm: FC = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [alertErrorMessages, setAlertErrorMessages] = useState<string[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const { registerers, handleSubmit, errors, clearErrors } =
    useUserForm(isSignIn);
  const onSubmit = handleSubmit(async data => {
    if (isSignIn) {
      try {
        await signInUser(data);
        dispatch(asyncFetchUser());
      } catch (e) {
        setAlertErrorMessages(["Sign in failed."]);
      }
    } else {
      const res = await createUser(data);
      if (isPrismaError(res)) {
        const err = res as PrismaError;
        const alertMessages = getPrismaErrorAlertMessages(err);
        setAlertErrorMessages(alertMessages);
        return;
      }
      // handle successful sign up
      notify("Successfully signed up!");
      setIsSignIn(true);
    }
  });
  const { title, greetings, action, transition, transitionButton } =
    getUserFormTexts(isSignIn);
  useEffect(() => {
    // reset states upon change form mode
    clearErrors();
    setAlertErrorMessages([]);
  }, [isSignIn, clearErrors]);
  return (
    <div className="card flex flex-col gap-4 bg-slate-100 p-12 w-full max-w-lg">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">{title}</h2>
        <span className="">{greetings}</span>
      </div>
      {renderAlertErrorMessages(alertErrorMessages)}
      <form className="flex flex-col w-full" onSubmit={onSubmit}>
        {!isSignIn && (
          <>
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              className="input input-bordered w-full"
              type="text"
              placeholder="Username"
              {...registerers.username}
            />
            {renderFieldErrorMessages(errors.username)}
          </>
        )}
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          className="input input-bordered w-full"
          type="text"
          placeholder="Email"
          autoComplete={isSignIn ? "on" : "off"}
          {...registerers.email}
        />
        {renderFieldErrorMessages(errors.email)}
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          className="input input-bordered w-full"
          type="password"
          placeholder="Password"
          autoComplete={isSignIn ? "on" : "off"}
          {...registerers.password}
        />
        {renderFieldErrorMessages(errors.password)}
        <button className="btn btn-primary normal-case text-base-100 mt-4">
          {action}
        </button>
      </form>
      <div className="flex justify-center items-center w-full">
        <span>{transition}</span>
        <button
          className="btn btn-link normal-case no-underline hover:no-underline"
          onClick={() => setIsSignIn(prev => !prev)}
        >
          {transitionButton}
        </button>
      </div>
    </div>
  );
};

export default UserForm;
