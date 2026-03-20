"use client"

import { useState } from "react";

import { useRouter } from "next/navigation";

import { Button, Card, CardContent, Typography } from "@mui/material"
import { useForm } from "react-hook-form"

import InputCustomized from "@/@pv/components/form/InputCustomized";

// import { regEmail, regNoBlankspace } from "@/@pv/utils/validation";
// import { AuthConfig } from "@/configs/authConfig";
// import { APP_URL } from "@/data/internal/app-route";
import { api } from "@/utils/api";

type TRequest = {
  email: string;
  password: string;
}

function Login() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const { control, handleSubmit } = useForm<TRequest>({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  // const onSubmit = (value: TRequest) => {
  //   localStorage.setItem(AuthConfig.tokenKey, "123");
  //   localStorage.setItem(AuthConfig.refreshKey, "123");
  //   localStorage.setItem(AuthConfig.roles.admin, "1");
  //   router.push(APP_URL.ADMIN_HOME.INDEX);
  //   console.log(value);
  // }

  // temp
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    setLoading(true);

    try {
      await api({
        method: "POST",
        urlKey: "/api/auth/login",
        data: {
          email: "superuser@aryacakra.id",
          password: "qwe123asd"
        },
        usingLocalApi: true,
      });

      setLoading(false);
      router.push("/user/home");
    } catch (err) {
      setLoading(false);
      console.log("Something Went Wrong");
    }
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
                <Button fullWidth variant="contained" type="submit">
                  {loading ? "Loading..." : "Login"}
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
