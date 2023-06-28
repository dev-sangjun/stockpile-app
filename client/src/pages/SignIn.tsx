import { FC } from "react";
import UserForm from "../components/UserForm";

const SignIn: FC = () => {
  return (
    <div className="flex justify-center items-center h-full p-2">
      <UserForm />
    </div>
  );
};

export default SignIn;
