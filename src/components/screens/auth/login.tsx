import { useState } from "react";
import Button from "../../button";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "../../../utils/mutations";
import { LoginSchema } from "../../../utils/validation/auth";
import { toast } from "react-toastify";
import apiRequest from "../../../utils/api-request";

export interface AuthProps {
  isVisible: boolean;
  closeModal: () => void;
}

export const Login = (props: AuthProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isVisible, closeModal } = props;

  const signInMutation = useMutation({
    mutationFn: signIn,
  });

  const displayErrors = (errors?: string[]) => {
    if (!errors?.length) return;
    errors.map((err) => {
      toast.error(err);
    });
  };

  const handleSignIn = () => {
    const validate = LoginSchema.safeParse({ email, password });

    if (validate.error) {
      const errors = validate.error.format();
      displayErrors(errors.email?._errors);
      displayErrors(errors.password?._errors);
      return;
    }

    signInMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          toast.success("Sign in successful");
          closeModal();
        },
        onError: (err) => {
          const msg = apiRequest.formatApiErrorMessage(err);
          toast.error(msg);
        },
      }
    );
  };

  return (
    <div className={`modal-backdrop ${isVisible ? "" : "hidden"}`}>
      <div className="checkout">
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <Button content={"X"} onClick={closeModal} />
          <h2 style={{ textAlign: "center", color: "white" }}>
            Welcome back! 😎
          </h2>
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

          <div
            style={{ display: "flex", color: "white", justifyContent: "end" }}
          >
            <a href="/auth/signup" style={{ color: "white" }}>
              I don't have an account? Sign Up
            </a>
          </div>

          <Button
            content={"Login"}
            variant="full"
            onClick={handleSignIn}
            executing={signInMutation.isPending}
          />
        </div>
      </div>
    </div>
  );
};
