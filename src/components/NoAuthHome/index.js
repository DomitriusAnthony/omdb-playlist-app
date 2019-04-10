import React from "react";
import RegistrationForm from "../RegistrationForm";
import LoginForm from "../LoginForm";

const NoAuthHome = () => {
  return (
    <div>
      <RegistrationForm />
      <LoginForm />
    </div>
  );
};

export default NoAuthHome;
