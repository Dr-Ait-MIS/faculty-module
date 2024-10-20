import { get } from "lodash";
import { useFormContext } from "@/hooks/FormProvider";

interface FormFieldProps {
  label: string;
  stepsReference: string;
  disabled?: boolean;
  options: string[];
  className?: string;
}

const FormFieldSelect: React.FC<FormFieldProps> = ({
  label,
  stepsReference,
  options,
  className = "",
  disabled = false,
}) => {
  const { register, errors } = useFormContext();
  const errorMessage = get(errors, stepsReference);
  return (
    <div className={className}>
      <label
        htmlFor={stepsReference}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <select
        id={stepsReference}
        {...register(stepsReference)}
        className="mt-1 block w-full p-1 py-2.5 rounded-md border bg-gray-50 border-gray-300 shadow-sm"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {errorMessage && (
        <p className="mt-2 text-sm text-red-600">{errorMessage.message}</p>
      )}
    </div>
  );
};

export default FormFieldSelect;
