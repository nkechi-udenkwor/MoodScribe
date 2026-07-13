import { Controller, FieldError, UseControllerProps } from 'react-hook-form';
import DatePicker, { DatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React from 'react';
import clsx from 'clsx';

import { ErrorMessage } from './ErrorMessage';

type ReactDatePickPropsWithoutOnChange = Omit<
  DatePickerProps,
  'onChange' | 'selectsMultiple' | 'selectsRange'
>;

type InputDateFieldProps = {
  name: string;
  label?: string;
  className?: string;
  placeholder?: string;
  errorMessage?: string;
  hasError: FieldError | undefined;
  value?: Date;
  isRequired?: boolean;
} & ReactDatePickPropsWithoutOnChange &
  UseControllerProps;

export const InputDateField: React.FC<InputDateFieldProps> = ({
  name,
  label,
  hasError,
  className,
  placeholder = 'Select date',
  isRequired,
  control,
  errorMessage,
  ...props
}) => {
  return (
    <>
      <label htmlFor={name} id={name} className={clsx('mt-5 block')}>
        {label}
        {isRequired && <span className='ml-1 hidden text-red-600'>*</span>}
      </label>
      <Controller
        control={control || undefined}
        name={name}
        render={({ field }) => (
          <div className='customDatePickerWidth flex-1'>
            <DatePicker
              calendarClassName='moodscribe-datepicker-dark'
              className={clsx(
                'font-WorkSans border-1 border-gray-700 focus:border-cyan-700 h-10 w-full px-2 bg-gray-700 bg-opacity-40 outline-none placeholder:text-sm disabled:bg-gray-100 rounded-sm',
                hasError && 'border-red-500',
                className,
              )}
              placeholderText={placeholder}
              closeOnScroll={true}
              selected={
                field.value
                  ? field.value instanceof Date
                    ? field.value
                    : new Date(field.value)
                  : null
              }
              dateFormat='MMMM d, yyyy HH:mm:ss'
              name={name}
              onChange={(date: Date | null) => field.onChange(date)}
              showMonthDropdown
              autoComplete='off'
              showYearDropdown
              dropdownMode='select'
              timeInputLabel='Time:'
              showTimeInput
              // showTimeSelect
              // timeIntervals={1}
              isClearable
              ref={(elem) => {
                elem &&
                  field.ref(
                    (elem as unknown as { input: HTMLInputElement }).input,
                  );
              }}
              {...props}
            />
          </div>
        )}
      />

      {errorMessage && (
        <ErrorMessage className='ml-2'>{errorMessage}</ErrorMessage>
      )}
    </>
  );
};
