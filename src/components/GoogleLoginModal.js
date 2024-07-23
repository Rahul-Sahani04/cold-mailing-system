import axios from "axios";
import { Button } from "../raw_components/CustomButtons";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../raw_components/DialogBox";

import { useGoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";

export const DialogExample = ({ setAuthCode, setUser, api ,setButton, setProfile }) => {

  const ExhangeCode = async (code) => {
    const response = await axios.post(api + "/exchange-code", {
      code: code,
    });
    console.log(response.data);

    localStorage.setItem("access_token", response.data.access_token);
    localStorage.setItem("refresh_token", response.data.refresh_token);

    localStorage.setItem("user", JSON.stringify(response.data.user));
  }
  
  const login = useGoogleLogin({
    scope: "https://www.googleapis.com/auth/gmail.send",
    onSuccess: (codeResponse) => {
      console.log("Login Success:", codeResponse);
      setAuthCode(codeResponse.access_token);
      setUser(codeResponse);
      localStorage.setItem("user", JSON.stringify(codeResponse));

      // ExhangeCode(codeResponse.code);
  
    },
    // flow: 'auth-code',
    onError: (error) => console.log("Login Failed:", error),
  });
  
  useEffect(() => {
    const openDialog = document.getElementById("open-dialog");
    setButton(openDialog);
  } ,[]);

  return (
    <>
      <div className="absolute">
        <Dialog>
          <DialogTrigger asChild>
            <Button style={{
                visibility: "hidden",
            }} id="open-dialog">Open Dialog</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Login</DialogTitle>
              <DialogDescription className="mt-1 text-sm leading-6">
                Please log in to continue.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-6">
              <DialogClose asChild>
                <Button
                  className="!m-0 w-full sm:mt-0 sm:w-fit"
                  variant="secondary"
                >
                  Go back
                </Button>
              </DialogClose>
              <DialogClose asChild>
                {/* <Button className="w-full sm:w-fit">Ok, got it!</Button> */}
                <button
                  type="button"
                  className="login-with-google-btn"
                  onClick={login}
                >
                  Sign in with Google
                </button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};
