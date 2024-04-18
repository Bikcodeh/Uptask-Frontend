import { NewPasswordForm, NewPasswordToken } from "@/components";
import { useState } from "react"

export const NewPasswordView: React.FC = () => {

  const [isTokenValid, setIsTokenValid] = useState(false);
  return (
    <>
      <h1 className="text-5xl font-black text-white">Reset Password</h1>
      <p className="text-2xl font-light text-white mt-5">
        Enter the code that we sent you {''}
        <span className=" text-fuchsia-500 font-bold"> by e-mail</span>
      </p>
      { !isTokenValid ? <NewPasswordToken /> : <NewPasswordForm />}
    </>
  )
}
