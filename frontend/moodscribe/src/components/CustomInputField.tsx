import React, { FC } from 'react';
import { Controller, UseFormRegisterReturn } from 'react-hook-form';
import { Icon } from '@iconify/react';

import { ErrorMessage } from './ErrorMessage';
import clsx from 'clsx';

interface Props {
  label: string;
  labelClass?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  showStepTwo?: boolean;
  isRequired?: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;
  defaultValue?: string;
  placeholder?: string;
  errorMessage?: string;
  type?: string;
  registration: Partial<UseFormRegisterReturn>;
  handleShowPassword?: () => void;
  handleOnBlur?: (value: string) => void;
  disabled?: boolean;
  valid?: string | null;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
}

const CustomInputField: FC<Props> = (
  {
    valid,
    // handleOnBlur,
    disabled = false,
    type,
    label,
    labelClass,
    handleShowPassword,
    control,
    registration,
    defaultValue,
    isRequired,
    placeholder,
    errorMessage,
    className,
  },
  ref,
) => {
  const { name } = registration;

  return (
    <div className='relative space-y-1'>
      <label htmlFor={name} id={name} className={clsx('block', labelClass)}>
        {' '}
        {label}
        {isRequired && (
          <span className='ml-1 align-middle text-red-600'>*</span>
        )}
      </label>

      <Controller
        name={name as string}
        control={control}
        defaultValue={defaultValue}
        render={({ field, fieldState }) => (
          <div className='flex items-center relative'>
            <input
              type={type}
              ref={ref}
              id={field.name}
              value={field.value || ''}
              onChange={field.onChange}
              onBlur={field.onBlur}
              className={`focus-within:border-secondary focus:border-cyan-700  pb-3 w-full text-gray-400 outline-none border-1 border-gray-700 rounded-sm  disabled:bg-gray-100 ${
                fieldState.error ? 'border-red-500' : ''
              } ${className}`}
              placeholder={placeholder}
              disabled={disabled}
              {...registration}
            />
            {handleShowPassword && (
              <button
                type='button'
                onClick={handleShowPassword}
                title={type === 'text' ? 'Hide password' : 'Show password'}
                className='absolute right-3 mt-1'
              >
                {type === 'password' ? (
                  <Icon icon='bx:show' className='text-xl text-gray-400' />
                ) : (
                  <Icon icon='ci:hide' className='text-xl text-gray-400' />
                )}
              </button>
            )}
          </div>
        )}
      />

      {valid === 'success' && (name === 'password' || name === 'email') ? (
        <span className='text-xs text-teal-300'>Perfect!</span>
      ) : null}

      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </div>
  );
};

export default CustomInputField;
