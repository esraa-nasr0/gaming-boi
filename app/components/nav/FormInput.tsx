"use client";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React from 'react'
import { useFormContext } from 'react-hook-form';

const FormInput = ({name , label , type}:{name:string ; label:string ; type:string}) => {
    const form = useFormContext();
  return (
    <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              {label && <FormLabel className='text-white font-semibold'>{label}</FormLabel>}
              <FormControl>
                <Input className='text-base text-white h-12' type={type || "text"} placeholder={label || "Enter......."} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
  )
}

export default FormInput