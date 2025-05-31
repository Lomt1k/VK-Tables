import './InputField.scss';
import type { FormField } from "@/types";
import type { FieldValues, UseFormRegister } from "react-hook-form";

type InputFieldProps<T extends FieldValues> = {
  field: FormField<T>,
  register: UseFormRegister<T>
}

export const InputField =
  <T extends FieldValues>({ field, register }: InputFieldProps<T>) => {
    const handleValue = (value: string) => {
      if (field.type === 'number') {
        return value.length ? Number(value) : undefined
      };
      return value;
    }

    return (
      <div className="input-field">
        <label className="input-field__label" htmlFor={field.name}>
          {field.label}
        </label>
        <input
          className="input-field__input"
          type={field.type}
          id={field.name}
          step={field.type === 'number' ? '1' : undefined}
          {...register(field.name, { setValueAs: handleValue })}
        />
      </div>
    )
  }