import { FC } from "react";
import UserForm from "../components/common/UserForm";

const SignIn: FC = () => {
  return (
    <div className="flex justify-center items-center h-full p-4">
      <UserForm />
    </div>
  );
};

export default SignIn;
