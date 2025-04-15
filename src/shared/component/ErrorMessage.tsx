import { cn } from "@/shared/utils";
const ErrorMessage = ({
  errors,
  fields,
  className,
}: {
  errors: any;
  fields: Array<{
    field: string;
    label: string;
  }>;
  className?: string;
}) => {
  return (
    <ul className={cn("list-disc", className)}>
      {fields.map(
        (field) =>
          errors[field.field]?.message && (
            <li
              key={field.field}
              className="text-xs text-destructive whitespace-pre-wrap"
            >
              {field.label}
              : {errors[field.field]?.message}
            </li>
          )
      )}
    </ul>
  );
};

export default ErrorMessage;