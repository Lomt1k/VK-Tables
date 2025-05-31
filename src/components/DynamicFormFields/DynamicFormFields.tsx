import './DynamicField.scss';
import type { DynamicFormFieldsProps, FormField } from '@/types';
import type { FieldValues, UseFormRegister } from 'react-hook-form';
import { CheckboxField, InputField, SelectField } from '.';

const getInputByField =
  <T extends FieldValues>(field: FormField<T>, register: UseFormRegister<T>) => {
    switch (field.type) {
      case 'checkbox': return <CheckboxField field={field} register={register} />
      case 'select': return <SelectField field={field} register={register} />
      default: return <InputField field={field} register={register} />
    }
  };

export const DynamicFormFields = <T extends FieldValues>(
  { fields, register, errors }: DynamicFormFieldsProps<T>
) => {

  return (
    <>
      {fields.map((field) => (
        <div className='dynamic-field' key={field.name}>
          {getInputByField(field, register)}
          {errors[field.name] && (
            <span className="dynamic-field__error">
              {errors[field.name]?.message?.toString()}
            </span>
          )}
        </div>
      ))}
    </>


  );
};