import { get } from "lodash";

interface FormFieldProps {
  label: string;
  stepsReference: string;
  type: string;
  disabled?: boolean;
  register: any;
  errors: any;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  stepsReference,
  type,
  disabled = false,
  register,
  errors,
}) => {
  const errorMessage = get(errors, stepsReference);
  return (
    <div>
      <label
        htmlFor={stepsReference}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        type={type}
        id={stepsReference}
        disabled={disabled}
        {...register(stepsReference)}
        className="mt-1 block w-full p-1 py-1.5 rounded-md border bg-gray-50 border-gray-300 shadow-sm"
      />
      {errorMessage && (
        <p className="mt-2 text-sm text-red-600">{errorMessage.message}</p>
      )}
    </div>
  );
};

export default FormField;
