"use client"

import { useState } from "react";

import { Button, Card, CardContent, Typography } from "@mui/material"
import { useForm } from "react-hook-form"

import InputCustomized from "@/@pv/components/form/InputCustomized";
import { api } from "@/utils/api";

// import { regEmail, regNoBlankspace } from "@/@pv/utils/validation";
// import { AuthConfig } from "@/configs/authConfig";
// import { APP_URL } from "@/data/internal/app-route";

type TRequest = {
  email: string;
  password: string;
}

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const { control, handleSubmit } = useForm<TRequest>({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onLogin = () => {
    api({
      method: "POST",
      urlKey: "/auth/login/",
      data: {
        username: "superuser",
        password: "qwe123asd"
      }
    });
  }

  return (
    <>
      <div className="w-screen h-screen fixed flex items-center justify-center">
        <Card>
          <CardContent>
            <Typography className="mb-4">Login Here</Typography>
            <form onSubmit={handleSubmit(onLogin)} className="flex flex-col gap-4">
              <InputCustomized
                control={control}
                name="email"
                label="Email"

              // rules={{
              //   required: {
              //     value: true,
              //     message: "This field is required"
              //   },
              //   validate: {
              //     noBlankSpace: value => regNoBlankspace.test(value) || "You must fill with no blankspace",
              //     isEmail: value => regEmail.test(value) || "Invalid Email",
              //   }
              // }}
              />

              <InputCustomized
                control={control}
                name="password"
                isPassword
                type={showPassword ? "text" : "password"}
                onPasswordTypeChange={() => {
                  setShowPassword(prev => !prev);
                }}
                label="Password"
              />

              <div className="flex items-center gap-2">
                <Button fullWidth variant="contained" type="submit" onClick={() => {
                  onLogin();
                }}>
                  Login
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default Login
