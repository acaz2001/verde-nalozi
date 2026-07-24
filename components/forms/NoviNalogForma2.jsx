'use client'
import React from 'react'
import { useState } from 'react';
import { useForm , Controller, useFieldArray} from "react-hook-form";
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  SelectGroup
} from "@/components/ui/select"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet ,
  FieldLegend 
} from "@/components/ui/field"
import { id } from 'zod/locales';

const proizvodi = [
  { id:1, label: "Flot 2mm", value: "flot2mm", obrade: [{ime: "Seceno na meru", value:"flot2mm-seceno2mm"},{ime: "KP Obrada", value: "flot2mm-obradaKp2mm"}] },
  { id:2, label: "Flot 3mm", value: "flot3mm" ,obrade: [{ime: "Seceno na meru", value:"flot3mm-seceno3mm"},{ime: "KP Obrada", value: "flot3mm-obradaKp3mm"}] },
  { id:3, label: "Flot 4mm", value: "flot4mm" ,obrade: [{ime: "Seceno na meru", value:"flot4mm-seceno4mm"},{ime: "KP Obrada", value: "flot4mm-obradaKp4mm"}] },
  { id:4, label: "Flot 5mm", value: "flot5mm" ,obrade: [{ime: "Seceno na meru", value:"flot5mm-seceno5mm"},{ime: "KP Obrada", value: "flot5mm-obradaKp5mm"}] },
  { id:5, label: "Flot 6mm", value: "flot6mm" ,obrade: [{ime: "Seceno na meru", value:"flot6mm-seceno6mm"},{ime: "KP Obrada", value: "flot6mm-obradaKp6mm"}] },
  { id:6, label: "Flot 8mm", value: "flot8mm" ,obrade: [{ime: "Seceno na meru", value:"flot8mm-seceno8mm"},{ime: "KP Obrada", value: "flot8mm-obradaKp8mm"}] },
  { id:7, label: "Flot 10mm", value: "flot10mm" ,obrade: [{ime: "Seceno na meru", value:"flot10mm-seceno10mm"},{ime: "KP Obrada", value: "flot10mm-obradaKp10mm"}] },
] 

const obrada = [
  { label: "Seceno na meru", value: "seceno" },
  { label: "KP Obrada", value: "obradaKp" },
  { label: "Fazeta 5mm", value: "fazeta-5" },
  { label: "Fazeta 10mm", value: "fazeta-10" },
] 

const rupe = [
  { label: "⌀8mm", value: "rupa-8mm" },
  { label: "⌀10mm", value: "rupa-10mm" },
  { label: "⌀12mm", value: "rupa-12mm" },
] 


export default function NoviNalogForma2() {
  const {
    register,
    onSubmit,
    handleSubmit,
    control,
    submissionId,
    formState: {
      errors,
      isSubmitting,
    }
  } = useForm({
    formId: "307db41f-e0c3-42db-8ada-39d20186f815",
    defaultValues: {
      "ime": "",
      "proizvod": "",
      "sirina": "",
      "duzina": "",
      "rupe": [],
      "broj-rupa": []
    }
  });
  const rupe = useFieldArray({ 
    control, 
    name: "rupe"
  });
  const brojRupa = useFieldArray({ 
    control, 
    name: "broj-rupa"
  });

  if (submissionId) {
    return <p>Thank you! Submission Id: {submissionId}</p>;
  }

  return (
    <form onSubmit={onSubmit}>
      <h1>proizvod</h1>

      {errors.root?.serverError && <p>Something went wrong, and please try again.</p>}

      <div>
        <label>
          <span>Ime</span>
          <input
            {...register("ime", {
              required: "Ime je obavezno uneti",
            })}
            aria-invalid={errors["ime"] ? "true" : "false"}
            placeholder="Unesi ime"
            type="text"
          />
        </label>
        {errors["ime"] && <p role="alert">{errors["ime"]?.message}</p>}
      </div>

      <div>
        <label>
          <select
            {...register("proizvod", {
              required: "Proizvod je obavezno izabrati",
            })}
            aria-invalid={errors["proizvod"] ? "true" : "false"}
          >
            
          </select>
          {errors["proizvod"] && <p role="alert">{errors["proizvod"]?.message}</p>}
        </label>
      </div>

      <div>
        <label>
          <span>Sirina</span>
          <input
            {...register("sirina", {
              required: "Obavezno je uneti sirinu",
            })}
            aria-invalid={errors["sirina"] ? "true" : "false"}
            placeholder="Unesi sirinu u centimetrima"
            type="number"
          />
        </label>
        {errors["sirina"] && <p role="alert">{errors["sirina"]?.message}</p>}
      </div>

      <div>
        <label>
          <span>Duzina</span>
          <input
            {...register("duzina", {
              required: "Obavezno je uneti duzinu",
            })}
            aria-invalid={errors["duzina"] ? "true" : "false"}
            placeholder="Unesi duzinu u centimetrima"
            type="number"
          />
        </label>
        {errors["duzina"] && <p role="alert">{errors["duzina"]?.message}</p>}
      </div>

      <div>
        {rupe.fields.map((field, index) => {
          return (
            <div key={field.id}>
              <div>
                <label>
                  <span>Fi rupe</span>
                  <input
                    {...register(`rupe.${index}.fi-rupe`)}
                    placeholder="Fi rupe"
                    step="1"
                    type="number"
                  />
                </label>
              </div>
              <button type="button" onClick={() => rupe.remove(index)}>Delete</button>
            </div>
          )
        })}
        <button 
          type="button" 
          onClick={() => 
            rupe.append({
              ["fi-rupe"]: "",
            })
          }
        >
          Append
        </button>
      </div>

      <div>
        {brojRupa.fields.map((field, index) => {
          return (
            <div key={field.id}>
              <div>
                <label>
                  <span>Broj rupa</span>
                  <input
                    {...register(`broj-rupa.${index}.broj-rupa`)}
                    placeholder="Broj rupa"
                    step="1"
                    type="number"
                  />
                </label>
              </div>
              <button type="button" onClick={() => brojRupa.remove(index)}>Delete</button>
            </div>
          )
        })}
        <button 
          type="button" 
          onClick={() => 
            brojRupa.append({
              ["broj-rupa"]: "",
            })
          }
        >
          Append
        </button>
      </div>

      <button disabled={isSubmitting}>Submit</button>
    </form>
  );
}
