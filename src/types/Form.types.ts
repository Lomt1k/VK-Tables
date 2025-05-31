import type {
  UseFormRegister,
  FieldErrors,
  FieldPath,
  FieldValues,
} from 'react-hook-form';

export type FormField<T extends FieldValues> = {
  name: FieldPath<T>;
  label: string;
  type?: 'text' | 'number' | 'checkbox' | 'select';
  options?: { value: string; label: string }[];
};

export type DynamicFormFieldsProps<T extends FieldValues> = {
  fields: FormField<T>[];
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
};