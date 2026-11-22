'use client'
import React from 'react'
import { useForm, useFieldArray, useWatch } from "react-hook-form"



function ProbaForma() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      test: [{ value: ""}]
    }
  })

  const { fields, append, update } = useFieldArray({
    control,
    name: "array",
  })
  
  const onSubmit = (data) => console.log(data)


  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      {fields.map((field, index) => (
        <Edit
          key={field.id}
          control={control}
          update={update}
          index={index}
          value={field}
        />
      ))}

      <button
        type="button"
        onClick={() => {
          append({ firstName: "" })
        }}
      >
        append
      </button>
      <input type="submit" />
    </form>
  )
}

const Display = ({ control, index }) => {
  const data = useWatch({
    control,
    name: `array.${index}`,
  })
  return <p>{data?.firstName}</p>
}

const Edit = ({ update, index, value, control }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: value,
  })}

export default ProbaForma
