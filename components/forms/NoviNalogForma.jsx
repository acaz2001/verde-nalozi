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
import { id } from "zod/locales";



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
      proizvod2: [{imeProizvoda:"",obradaProizvoda: "", sirinaProizvoda: 0, duzinaProizvoda: 0,
        rupeProizvoda: [{fiRupeProizvoda: "", brojRupaProizvoda: 0}]}],
    },
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



 

  const { control, register, handleSubmit, reset, watch, formState: { errors, isSubmitting } } = form;


  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control: form.control,
    name: "rupa",
  })

  const proizvodiArray = useFieldArray({
    control: form.control,
    name: "proizvod2",
  })

  const proizvodiArrayRupe = useFieldArray({
    control: form.control,
    name: "rupeProizvoda",
    
  })

  console.log("OVO JE PROIZVODI ARRAY" + proizvodiArrayRupe.fields[0])
  

  


  //function onSubmit(data) {
    //console.log("data je:",data)
  //}


    
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
  const proizvod2Values = watch("proizvodiArray");


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
            {proizvodiArray.fields.map((item, index) => {
                      
                    const fieldError = errors.proizvod2?.[index]?.imeProizvoda 
            return (
              
              
              <div key={item.id} className="flex flex-col items-start w-full gap-5 border-b-amber-400 border-b-1 pb-5">   
                <div className="flex flex-row justify-between w-full gap-3 "> 
                  <Controller
                  
                    control={form.control}
                    name={`proizvod2.${index}.imeProizvoda`}
                    render={({ field }) => (
                      
                        <Field data-invalid={fieldError ? true : undefined}>
                        <FieldLabel>Proizvod {index + 1}</FieldLabel>

                        <Select
                            name = {field.name}
                            value={field.value}
                            onValueChange={field.onChange}
                        >
                            <SelectTrigger aria-invalid={fieldError ? true : undefined}>
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

                        {fieldError && <FieldError>{fieldError.message}</FieldError>}
                        </Field>
                    )}
                    />
                    <Controller
                      control={form.control}
                      name={`proizvod2.${index}.obradaProizvoda`}
                      render={({ field }) => (
                        
                          <Field data-invalid={fieldError ? true : undefined}>
                          <FieldLabel>Obrada za {index + 1} proizvod</FieldLabel>

                          <Select
                              name = {field.name}
                              value={field.value}
                              onValueChange={field.onChange}
                          >
                              <SelectTrigger aria-invalid={fieldError ? true : undefined}>
                              <SelectValue placeholder="Izaberi obradu" />
                              </SelectTrigger>

                              <SelectContent>
                              {obrada.map((o) => (
                                  <SelectItem key={o.value} value={o.value}>
                                  {o.label}
                                  </SelectItem>
                              ))}
                              </SelectContent>
                          </Select>

                          {fieldError && <FieldError>{fieldError.message}</FieldError>}
                          </Field>
                    )}
                    />
                    <Controller
                      //key={item.id}
                      name={`proizvod2.${index}.sirinaProizvoda`}
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="form-rhf-input-sirinaProizvoda">
                             {`Širina za ${index+1} proizvod`}
                          </FieldLabel>
                          <Input
                            {...field}
                            id="form-rhf-input-sirinaProizvoda"
                            aria-invalid={fieldState.invalid}
                            placeholder="Unesi širinu"
                            autoComplete="sirina"
                           
                          />
                          <FieldDescription>
                            Unesi dimenziju u centimetrima
                          </FieldDescription>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                    <Controller
                      name={`proizvod2.${index}.duzinaProizvoda`}
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="form-rhf-input-duzinaProizvoda">
                            {`Dužina za ${index+1} proizvod`}
                          </FieldLabel>
                          <Input
                            {...field}
                            id="form-rhf-input-duzinaProizvoda"
                            aria-invalid={fieldState.invalid}
                            placeholder="Unesi dužinu"
                            autoComplete="duzina"
                          />
                          <FieldDescription>
                            Unesi dimenziju u centimetrima
                          </FieldDescription>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                      <Button
                              type="button"
                              variant="destructive"
                              onClick={() => proizvodiArray.remove(index)}
                              //disabled={fields.length === 1}
                              disabled={isSubmitting || proizvodiArray.fields.length === 1}
                              className="mt-7"
                          >
                              Obriši
                      </Button>
                    </div>
                    <FieldGroup>

                      {proizvodiArrayRupe.fields.map((item2, index2) => {
                        return (
                          <div key={item2.id} className="flex flex-row">
                            <Controller
                            control={form.control}
                            name={`proizvod2.${index2}.rupeProizvoda.fiRupeProizvoda`}
                            render={({ field }) => (
                          
                            <Field data-invalid={fieldError ? true : undefined}>
                            <FieldLabel>Rupa za {index2 + 1} proizvod</FieldLabel>

                            <Select
                                name = {field.name}
                                value={field.value}
                                onValueChange={field.onChange}
                            >
                                <SelectTrigger aria-invalid={fieldError ? true : undefined}>
                                <SelectValue placeholder="Izaberi fi rupe" />
                                </SelectTrigger>

                                <SelectContent>
                                {rupe.map((r) => (
                                    <SelectItem key={r.value} value={r.value}>
                                    {r.label}
                                    </SelectItem>
                                ))}
                                </SelectContent>
                            </Select>

                            {fieldError && <FieldError>{fieldError.message}</FieldError>}
                            </Field>
                      )}
                      />
                      <Controller
                        name={`proizvod2.${index2}.rupeProizvoda.brojRupaProizvoda`}
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-rhf-input-brojRupaProizvoda">
                              Broj rupa za {index2 + 1} proizvod
                            </FieldLabel>
                            <Input
                              {...field}
                              id="form-rhf-input-rupeProizvoda.brojRupaProizvoda"
                              aria-invalid={fieldState.invalid}
                              placeholder="Unesi broj rupa"
                              autoComplete="sirina"
                            />
                            <FieldDescription>
                              
                            </FieldDescription>
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                      <Button
                          type="button"
                          variant="outline"
                          onClick={() => proizvodiArrayRupe.append ({rupeProizvoda: []})}
                          >
                          Dodaj rupu
                      </Button>
                          </div>
                        )
                      })}
                    </FieldGroup>
                      
                    
                    
                        
                    
               
                
              </div>
              
              
            )}
            
            )}
            <Button
                type="button"
                variant="outline"
                onClick={() => proizvodiArray.append ({imeProizvoda:"",obradaProizvoda: ""})}
                >
                Dodaj proizvod
            </Button>
          </FieldGroup>
            
            {/*KRAJ PROIZVOD2 */}
          </FieldGroup>
        </form>
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


export function Proizvod () {
  return (
    <div>
        <Controller
          control={form.control}
          name={`proizvod2.${index}.imeProizvod`}
          render={({ field }) => (
            
              <Field data-invalid={fieldError ? true : undefined}>
              <FieldLabel>Proizvod {index + 1}</FieldLabel>

              <Select
                  name = {field.name}
                  value={field.value}
                  onValueChange={field.onChange}
              >
                  <SelectTrigger aria-invalid={fieldError ? true : undefined}>
                  <SelectValue placeholder="Izaberi rupu" />
                  </SelectTrigger>

                  <SelectContent>
                  {proizvodi.map((p) => (
                      <SelectItem key={p.value} value={p.value}>
                      {p.label}
                      </SelectItem>
                  ))}
                  </SelectContent>
              </Select>

              {fieldError && <FieldError>{fieldError.message}</FieldError>}
              </Field>
          )}
          />
    </div>
  )
}

const ProizvodRupe = () => {
  const {
      register,
      control,
      formState: { errors },
    } = useForm()

  const { append, remove, fields } = useFieldArray({
    name: 'proizvodRupe',
    control,
  })

  return (
    <div>
      {fields.map((chapter, chapterIndex) => {
        return (
          <div key={chapter.id}>
              
          </div>
        )
      } )}
    </div>
  )
}

export default NoviNalogForma