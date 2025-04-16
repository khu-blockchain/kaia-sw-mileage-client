import { ISignUpForm } from "@/features/student";
import { Input, Label } from "@/shared/ui";
import { Path, UseFormRegister } from "react-hook-form";

interface SignUpInputProps {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  register: UseFormRegister<ISignUpForm>;
  name: Path<ISignUpForm>;
  autoComplete?: string;
  required?: boolean;
}

function SignUpInput({
  label,
  id,
  type,
  placeholder,
  register,
  name,
  autoComplete,
  required,
}: SignUpInputProps) {
  return (
    <div className="flex gap-2">
      <Label htmlFor={id} className="w-25">
        {label}
      </Label>
      <div className="relative flex flex-1 w-full">
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          {...register(name)}
        />
      </div>
    </div>
  );
}

export default SignUpInput;
