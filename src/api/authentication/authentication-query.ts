import { useMutation } from "@tanstack/react-query";
import {
  add_admin,
  login,
  request_reset_password,
  reset_password,
} from "./authentication-api";
import { toast } from "sonner";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";

export const loginQuery = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("token", data.data.JWT);
      navigate("/");
      toast("Login Successfully");
    },
    onError: () => {
      toast("Error");
    },
  });
};

export const addAdminQuery = () => {
  return useMutation({
    mutationKey: ["add-admin"],
    mutationFn: add_admin,
    onSuccess: () => {
      toast("Admin Added Successfully");
    },
    onError: () => {
      toast("Error");
    },
  });
};

export const requestPasswordResetQuery = () => {
  const navigate = useNavigate();

  const queryResults = useMutation({
    mutationFn: request_reset_password,
    onSuccess: (data) => {
      toast(data.message);
      navigate("/reset-password");
    },
  });

  return queryResults;
};
export const resetPasswordQuery = () => {
  const navigate = useNavigate();

  const queryResults = useMutation({
    mutationFn: reset_password,
    onSuccess: () => {
      toast(t("form.form_success"));
      navigate("/");
    },
    onError(error: any) {
      toast(error.response.data.result);
    },
  });

  return queryResults;
};
