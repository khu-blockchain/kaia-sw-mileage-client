import { Input, Label } from "@/shared/ui";
import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type RowLabelFormInputProps = InputHTMLAttributes<HTMLInputElement> &
  UseFormRegisterReturn & {
    label: string;
  };

function RowLabelFormInput({
  label,
  id,
  type,
  placeholder,
  autoComplete,
  required,
  ...registerField
}: RowLabelFormInputProps) {
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
          {...registerField}
        />
      </div>
    </div>
  );
}

export default RowLabelFormInput;
