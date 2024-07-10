import { useState } from "react";
import Button from "../../button";
import { AuthProps } from "./login";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../../utils/mutations";
import { toast } from "react-toastify";
import { SignUpSchema } from "../../../utils/validation/auth";
import apiRequest from "../../../utils/api-request";

export const Signup = (props: AuthProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const signupMutation = useMutation({
    mutationFn: signUp,
  });

  const handleSignUp = () => {
    const validate = SignUpSchema.safeParse({
      email,
      password,
      confirmPassword,
    });
    if (validate.error) {
      const errors = validate.error.format();
      displayErrors(errors.email?._errors);
      displayErrors(errors.password?._errors);
      displayErrors(errors.confirmPassword?._errors);
      return;
    }

    signupMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          toast.success("Sign up successful");
          closeModal();
        },
        onError: (err) => {
          const msg = apiRequest.formatApiErrorMessage(err);
          toast.error(msg);
        },
      }
    );
  };

  const displayErrors = (errors?: string[]) => {
    if (!errors?.length) return;
    errors.map((err) => {
      toast.error(err);
    });
  };

  const { isVisible, closeModal } = props;
  return (
    <div className={`modal-backdrop ${isVisible ? "" : "hidden"}`}>
      <div className="checkout">
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <Button content={"X"} onClick={closeModal} />
          <h2 style={{ textAlign: "center", color: "white" }}>Sign up</h2>
        </div>
        <div>
          <label htmlFor="email" className="input-lbl">
            Email
          </label>
          <input
            className="auth-input"
            style={{ borderRadius: "3px", border: "none" }}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            name="email_placeholder"
            value={email}
          />

          <label htmlFor="email" className="input-lbl">
            Password
          </label>
          <input
            className="auth-input"
            style={{ borderRadius: "3px", border: "none" }}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            name="email_placeholder"
            value={password}
          />
          <label htmlFor="email" className="input-lbl">
            Confirm Password
          </label>
          <input
            className="auth-input"
            style={{ borderRadius: "3px", border: "none" }}
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            name="password_placeholder"
            value={confirmPassword}
          />

          <Button
            content={"Sign Up"}
            variant="full"
            executing={signupMutation.isPending}
            onClick={handleSignUp}
          />
        </div>
      </div>
    </div>
  );
};
