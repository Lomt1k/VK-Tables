import './SelectField.scss';
import type { FormField } from "@/types";
import type { FieldValues, UseFormRegister } from "react-hook-form";

type SelectFieldProps<T extends FieldValues> = {
  field: FormField<T>,
  register: UseFormRegister<T>
}

export const SelectField =
  <T extends FieldValues>({ field, register }: SelectFieldProps<T>) => {
    return (
      <div className="select-field">
        <label className="select-field__label" htmlFor={field.name}>
          {field.label}
        </label>
        <select id={field.name} {...register(field.name)}>
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    )
  }