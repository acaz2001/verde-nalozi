"use client";

import React, { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import { Input } from "../../components/ui/input"
import {InputGroup,InputGroupInput,InputGroupAddon,InputGroupButton  } from "../../components/ui/input-group"
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
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { X } from 'lucide-react';
import { fi, id } from "zod/locales";
import { DevTool } from "@hookform/devtools";



const proizvodi = [
  { label: "Flot 2mm", value: "flot2mm", obrade: [{ime: "Seceno na meru", value:"flot2mm-seceno2mm"},{ime: "KP Obrada", value: "flot2mm-obradaKp2mm"}] },
  { label: "Flot 3mm", value: "flot3mm" ,obrade: [{ime: "Seceno na meru", value:"flot3mm-seceno3mm"},{ime: "KP Obrada", value: "flot3mm-obradaKp3mm"}] },
  { label: "Flot 4mm", value: "flot4mm" ,obrade: [{ime: "Seceno na meru", value:"flot4mm-seceno4mm"},{ime: "KP Obrada", value: "flot4mm-obradaKp4mm"}] },
  { label: "Flot 5mm", value: "flot5mm" ,obrade: [{ime: "Seceno na meru", value:"flot5mm-seceno5mm"},{ime: "KP Obrada", value: "flot5mm-obradaKp5mm"}] },
  { label: "Flot 6mm", value: "flot6mm" ,obrade: [{ime: "Seceno na meru", value:"flot6mm-seceno6mm"},{ime: "KP Obrada", value: "flot6mm-obradaKp6mm"}] },
  { label: "Flot 8mm", value: "flot8mm" ,obrade: [{ime: "Seceno na meru", value:"flot8mm-seceno8mm"},{ime: "KP Obrada", value: "flot8mm-obradaKp8mm"}] },
  { label: "Flot 10mm", value: "flot10mm" ,obrade: [{ime: "Seceno na meru", value:"flot10mm-seceno10mm"},{ime: "KP Obrada", value: "flot10mm-obradaKp10mm"}] },
] 

const obrada = [
  { label: "Seceno na meru", value: "seceno" },
  { label: "KP Obrada", value: "obradaKp" },
  { label: "Kaljeno", value: "kaljeno" },
  { label: "Fazeta 5mm", value: "fazeta-5" },
  { label: "Fazeta 10mm", value: "fazeta-10" },
] 

const rupe = [
  { label: "⌀8mm", value: "rupa-8mm" },
  { label: "⌀10mm", value: "rupa-10mm" },
  { label: "⌀12mm", value: "rupa-12mm" },
] 


{/* 
const formSchema = z.object({
  ime: z
    .string()
    .min(3, "Ime must be at least 3 characters.")
    //.regex(
    //  /^[a-zA-Z0-9_]+$/,
    //  "Ime mogu biti samo slova ne i brojevi."
    //)
    ,
    proizvod: z
        .string()
        .min(1, "Obavezno je izabrati proizvod!")
        .refine((val) => val !== "auto", {
        message:
            "Obavezno je izabrati proizvod!",
    }),
    obrada: z
        .string()
        .min(1, "Obavezno je izabrati obradu!")
        .refine((val) => val !== "auto", {
        message:
            "Obavezno je izabrati obradu!",
    }),
    sirina: z
    .coerce.number().refine((val) => val !== 0, {
        message:
            "Obavezno je uneti sirinu!",
    })

    ,
    duzina: z
    .coerce.number()
    .refine((val) => val !== 0, {
        message:
            "Obavezno je uneti duzinu!",
    })
    ,

    rupa: z.array(
        z.object({
        fiRupe: z
            .string()
            .min(1, "Izaberi fi rupe")
            .refine((val) => val !== "auto", {
            message: "Izaberi konkretnu opciju",
            }),
        })
    ),

    brojRupa: z
    .coerce.number()
})
*/}

export function NoviNalogForma() {
  const form = useForm({
    //resolver: zodResolver(formSchema),
    defaultValues: {
      ime: "",
      telefon: "",
      proizvod: [{imeProizvoda:"",obradaProizvoda: "", sirinaProizvoda: 0, duzinaProizvoda: 0,
        rupeProizvoda: [{fiRupeProizvoda: "", brojRupaProizvoda: 0}]}],
    },
  })
  const { control, register, handleSubmit, reset, watch, formState: { errors, isSubmitting } } = form;
  
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    name: "proizvod",
    control
  })
  const [izabraniProizvod, setizabraniProizvod] = useState({
    id: null
  });

  const handleProizvod = ({ target }) => {
    const { name, value } = target;
    setizabraniProizvod((prev) => ({
      ...prev,
      [name]: value
    }));
   
  };
  

  


  // function onSubmit(data) {
  //   console.log("data je:",data)
  // }


    
    const onSubmit = async (data) => {
      const res = await fetch("api/nalozi", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
        
      } );
  
      const result = await res.json();
      if (!res.ok) {
        // response status is not 2xx
        alert("Submitting form failed!");
        return;
      }
  
      console.log("DATA JE: "+ data)
    }


  const rupaValues = watch(form);
  console.log("FIELDSSS" , fields[0].rupeProizvoda)


  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Napravi novi nalog</CardTitle>
        <CardDescription>
          Popuni podatke ispod
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-input" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="ime"
              rules={{
                required: true,
              }}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-input-ime">
                    Ime
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-input-ime"
                    aria-invalid={fieldState.invalid}
                    placeholder="Unesi neko ime"
                    autoComplete="ime"
                  />
                  <FieldDescription>
                    
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="telefon"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-input-telefon">
                    Broj telefona
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-input-telefon"
                    aria-invalid={fieldState.invalid}
                    placeholder="Unesi broj telefona"
                    autoComplete="telefon"
                  />
                  <FieldDescription>
                    
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {/*PROIZVOD2 */}
            <FieldGroup>
              
              {fields.map((field, index) => (
                <div key={field.id} className="flex flex-col items-start w-full gap-5 border-b-amber-400 border-b-1 pb-5">
                  <h1 className="text-xl font-medium">Proizvod: {index+1}</h1>
                  <section className="flex flex-row w-full justify-between w-full gap-3 ">
                    <Controller
                    control={form.control}
                    name={`proizvod.${index}.imeProizvoda`}
                    render={({ field, fieldState  }) => (
                      <div className="flex flex-col gap-2 w-full">
                        <FieldLabel htmlFor={`form-rhf-input-proizvod.${index}-imeProizvoda`}>
                          {`Proizvod ${index+1}`}
                        </FieldLabel>
                        <Select
                          name = {field.name}
                          value={field.value}
                          onValueChange={field.onChange}
                          
                        >
                          <SelectTrigger aria-invalid={fieldState.invalid ? true : undefined}>
                            <SelectValue placeholder="Izaberi proizvod" />
                          </SelectTrigger>
                          <SelectContent>
                          {proizvodi.map((p) => (
                              <SelectItem key={p.value} value={p.value}>
                              {p.label}
                              </SelectItem>
                          ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}/>
                    <Controller
                    control={form.control}
                    name={`proizvod.${index}.obradaProizvoda`}
                    render={({ field, fieldState  }) => (
                      <div className="flex flex-col gap-2 w-full">
                        <FieldLabel htmlFor={`form-rhf-input-proizvod.${index}-obradaProizvoda`}>
                          {`Obrada za ${index+1}. proizvod`}
                        </FieldLabel>
                        <Select
                          name = {field.name}
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                        <SelectTrigger aria-invalid={fieldState.invalid ? true : undefined}>
                          <SelectValue placeholder="Izaberi obradu." />
                        </SelectTrigger>
                        <SelectContent>
                        {obrada.map((p) => (
                            <SelectItem key={p.value} value={p.value}>
                            {p.label}
                            </SelectItem>
                        ))}
                        </SelectContent>
                          </Select>
                      </div>
                    )}/>
                    <Controller
                    control={form.control}
                    name={`proizvod.${index}.sirinaProizvoda`}
                    render={({ field, fieldState  }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-input-proizvod-sirinaProizvoda">
                             {`Širina za ${index+1} proizvod`}
                        </FieldLabel>
                        <Input
                            {...field}
                            id="form-rhf-input-proizvod-sirinaProizvoda"
                            aria-invalid={fieldState.invalid}
                            placeholder="Unesi širinu"
                            autoComplete="sirina"
                            type="number"
                          />
                        <FieldDescription>
                            Unesi dimenziju u centimetrima
                          </FieldDescription>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}/>
                    <Controller
                    control={form.control}
                    name={`proizvod.${index}.duzinaProizvoda`}
                    render={({ field, fieldState  }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-input-proizvod-duzinaProizvoda">
                             {`Dužina za ${index+1} proizvod`}
                        </FieldLabel>
                        <Input
                            {...field}
                            id="form-rhf-input-proizvod-duzinaProizvoda"
                            aria-invalid={fieldState.invalid}
                            placeholder="Unesi širinu"
                            autoComplete="duzina"
                            type="number"
                          />
                        <FieldDescription>
                            Unesi dimenziju u centimetrima
                          </FieldDescription>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}/>

                  </section>

                  <div className="flex flex-row justify-between w-full gap-3 ">
                      <section  className="flex flex-row justify-between w-full gap-3 ">
                        <Controller
                        control={form.control}
                        name={`proizvod.${index}.rupeProizvoda`}
                        render={({ field, fieldState  }) => (
                          <></>
                        )}/>
                        <Controller
                        control={form.control}
                        name={`proizvod.${index}.rupeProizvoda.fiRupeProizvoda`}
                        render={({ field, fieldState  }) => (
                        <div className="flex flex-col">
                          <FieldLabel htmlFor="form-rhf-input-proizvod-brojRupaProizvoda">
                                {`Fi Rupa za ${index+1} proizvod za Rupe`}
                            </FieldLabel>
                          <Select
                            name = {field.name}
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                          <SelectTrigger aria-invalid={fieldState.invalid ? true : undefined}>
                            <SelectValue placeholder="Izaberi proizvod" />
                          </SelectTrigger>
                          <SelectContent>
                          {rupe.map((p) => (
                              <SelectItem key={p.value} value={p.value}>
                              {p.label}
                              </SelectItem>
                          ))}
                          </SelectContent>
                          
                            </Select>
                        </div> 
                        )}/>
                        <Controller
                        control={form.control}
                        name={`proizvod.${index}.rupeProizvoda.brojRupaProizvoda`}
                        render={({ field, fieldState  }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-rhf-input-proizvod-brojRupaProizvoda">
                                {`Broj Rupa za ${index+1} proizvod za Rupe`}
                            </FieldLabel>
                            <Input
                                {...field}
                                id="form-rhf-input-proizvod-brojRupaProizvoda"
                                aria-invalid={fieldState.invalid}
                                placeholder="Unesi broj rupa."
                                autoComplete="brojRupa"
                                type="number"
                              />
                            <FieldDescription>
                                Unesi broj rupa po kolicini.
                              </FieldDescription>
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                             
                          </Field>
                          
                        )}/>
                      </section>

                  </div>
                 <Button
                type="button"
                variant="outline"
                onClick={() => append ({proizvod:[]})}
                >
                Dodaj proizvod
            </Button> 
                </div>
              ))}
            </FieldGroup>
            
          
            
            
          </FieldGroup>
        </form>
        <DevTool control={form.control}/>
      </CardContent>


      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-rhf-input">
            Save
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}



export default NoviNalogForma