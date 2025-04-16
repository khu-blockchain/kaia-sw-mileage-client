import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ISignUpForm, signUpSchema } from "./form";

const useSignUpForm = () => {
  return useForm<ISignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      id: "",
      password: "",
      confirm_password: "",
      name: "",
      department: "",
      email: "",
      phone_number: "",
      wallet_address: "",
      bank_account_number: "",
      bank_code: "",
    },
  });
};

export { useSignUpForm };
