import './CheckboxField.scss';
import type { FormField } from "@/types";
import type { FieldValues, UseFormRegister } from "react-hook-form";

type CheckboxFieldProps<T extends FieldValues> = {
  field: FormField<T>,
  register: UseFormRegister<T>
}

export const CheckboxField =
  <T extends FieldValues>({ field, register }: CheckboxFieldProps<T>) => {
    return (
      <div className="checkbox-field">
        <label className="checkbox-field__label" htmlFor={field.name}>
          {field.label}
        </label>
        <input
          className="checkbox-field__input"
          type="checkbox"
          id={field.name}
          {...register(field.name)}
        />
      </div>
    )
  }