import { FC, useEffect, useState } from "react";
import { getUserFormTexts } from "./user-form.utils";
import {
  renderAlertErrorMessages,
  renderFieldErrorMessages,
  renderSuccessMessage,
} from "./renderers";
import useFormWrapper from "./useFormWrapper";
import { createUser, signInUser } from "../../api/auth.api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../states/store";
import { asyncFetchUser } from "../../states/user.reducer";
import {
  PrismaError,
  getPrismaErrorAlertMessages,
  isPrismaError,
} from "../../utils/error.utils";
import useToast from "../../hooks/useToast";

const UserForm: FC = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [isSignUpSuccessful, setIsSignUpSuccessful] = useState(false);
  const [alertErrorMessages, setAlertErrorMessages] = useState<string[]>([]);
  const { isVisible } = useToast(isSignUpSuccessful);
  const dispatch = useDispatch<AppDispatch>();
  const { registerers, handleSubmit, errors, clearErrors } =
    useFormWrapper(isSignIn);
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
      setIsSignUpSuccessful(true);
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
    <div className="card flex flex-col gap-4 bg-base-100 p-12 w-full max-w-lg">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">{title}</h2>
        <span className="">{greetings}</span>
      </div>
      {renderAlertErrorMessages(alertErrorMessages)}
      {renderSuccessMessage("Signed up successfully", isVisible)}
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
