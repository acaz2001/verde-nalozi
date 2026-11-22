'use client'

import { useFormContextCreateCourse } from './forms'
import { useFieldArray, Controller, useForm } from 'react-hook-form'
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  SelectGroup
} from "@/components/ui/select"
import { Input } from "../../components/ui/input"
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
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DevTool } from "@hookform/devtools";
import moment from 'moment';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';
import {obrada, proizvodi, rupe} from '../../lib/constants'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';

moment.locale('sr')
let date = moment();
let datum = date.format("MMMM DD YYYY")
let tacanDatum = date.format("MMMM DD YYYY").charAt(0).toLocaleUpperCase()+datum.slice(1)
let mesec = date.format("MMMM")
let tacanMesec = mesec.charAt(0).toLocaleUpperCase()+mesec.slice(1)
console.log("DATE JE search:",datum);




//@ts-ignore
export default function EditFormaNaloga ({nalog}) {
  //@ts-ignore
  const imeProizvoda = nalog.proizvod.map((p) => p.imeProizvoda)
  //@ts-ignore
  
  console.log("NALOG EDIT:" , nalog.proizvod.map((p) => p));
  
  const schemaCreateRupe = z.object({
  // content: fiRupe
  fiRupe: z.string().min(3),
  brojRupa: z.coerce.number()
})

const schemaCreateProizvod = z.object({
  //title : imeProizvoda
  imeProizvoda: z.string().min(3).default(nalog.imeProizvoda),
  obradaProizvoda: z.string().min(3),
  sirinaProizvoda: z.coerce.number(),
  duzinaProizvoda: z.coerce.number(),
  // notes: rupe
  rupe: z
    .array(schemaCreateRupe)
    //.min(1, { message: 'Chapter must contain atleast one note.' }),
})

 const schemaCreateCourse = z.object({
  //title : ime
  ime: z.string().min(3),
  brojTelefona: z.coerce.number(),
  stanjeNaloga: z.string().default("nijeUradjen"),
  datum: z.string().default(datum),
  //chapters : proizvod: z
  proizvod: z
    // @ts-ignore
    .array(schemaCreateProizvod, { required_error: 'Chapters are required.' })
    .min(1, { message: 'Course must contain atleast one chapter.' }),
    
})

  const [selektovanProizvod, setSelektovanProizvod] = useState()
  


  // const {
  //   register,
  //   formState: { errors },
  //   watch,
  //   control,
  //   handleSubmit,
  // } = useForm({
  //   resolver: zodResolver(schemaCreateCourse)
  // })

  const form = useForm({
    resolver: zodResolver(schemaCreateCourse)
  })

  const proizvodForm = useForm({
    resolver: zodResolver(schemaCreateCourse),
    defaultValues: {

    }
  })

  // const { append, remove, fields } = useFieldArray({
  const proizvodFormArray = useFieldArray({
    name: 'proizvod',
    control: proizvodForm.control,
  })

  const formData = form.watch()
  //   console.log('formData', formData)
  //   console.log('errors', errors)
  

  //@ts-ignore
  const onSubmit = async (data) => {
      // const res = await fetch("api/nalozi", {
      //   method: "POST",
      //   body: JSON.stringify(data),
      //   headers: {
      //     "Content-Type": "application/json"
      //   }
        
      // } );
  
      // const result = await res.json();

      // if (!res.ok) {
      //   // response status is not 2xx
      //   alert("Submitting form failed!");
      //   return;
      // }
      
      // toast('Uspešno napravljen nalog.')
      // redirect('/nalozi')
      
  
      console.log("DATA JE: "+ JSON.stringify(data))
    }


  return (
    <Card className="max-w-[1650px] mx-auto">
        <CardHeader>
            <CardTitle>Napravi novi nalog</CardTitle>
                <CardDescription>
                Popuni podatke ispod
                </CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col'>
            <form
            id="form-rhf-input"
            className='space-y-3'
            onSubmit={form.handleSubmit(onSubmit)}
            >
            <FieldGroup className='flex flex-row'>
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
                        type='text'
                        defaultValue={nalog.ime}
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
                    name="brojTelefona"
                    control={form.control}
                    render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-input-brojTelefona">
                        Broj telefona
                        </FieldLabel>
                        <Input
                        {...field}
                        id="form-rhf-input-brojTelefona"
                        aria-invalid={fieldState.invalid}
                        placeholder="Unesi broj telefona"
                        autoComplete="brojTelefona"
                        type='number'
                        defaultValue={nalog.brojTelefona}
                        // onChange={(e) => (parseInt(e.target.value))}
                        />
                        <FieldDescription>
                        
                        </FieldDescription>
                        {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                    )}
                />
              <div className='hidden'>
              <Controller
                name="stanjeNaloga"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-stanjeNaloga">
                      stanjeNaloga:
                    </FieldLabel>
                    <FieldDescription>
                        Unesi dimenziju u centimetrima.
                    </FieldDescription>
                    <Input
                      {...field}
                      id="form-rhf-stanjeNaloga"
                      aria-invalid={fieldState.invalid}
                      placeholder="Unesi stanjeNaloga:"
                      autoComplete="off"
                      type = "string"
                      defaultValue={'nijeUradjen'}
                      //value={'nijeUradjen'}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                    
                  </Field>
                  
                )}
              />
              <div className='hidden'>
                <Controller
                  name="datum"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-datum">
                        datum:
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-rhf-datum"
                        aria-invalid={fieldState.invalid}
                        placeholder="Unesi datum:"
                        autoComplete="off"
                        type = "string"
                        defaultValue={datum}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                      
                    </Field>
                    
                  )}
                />
              </div>
            </div>
            </FieldGroup>
            <FieldGroup>
              {/* @ts-ignore */}
              {nalog.proizvod.map((p,i) => {
                return (
                  <div key={p.imeProizvoda}>
                      <section  className='bg-amber-600'>
                        <h1>{p.imeProizvoda}</h1>
                        <h1></h1>
                        <Controller
                            control={form.control}
                            name={`proizvod.${i}.sirinaProizvoda`}
                            render={({ field, fieldState  }) => (
                                <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-input-proizvod-sirinaProizvoda">
                                        {`Širina za ${i+1} proizvod`}
                                </FieldLabel>
                                {/* @ts-ignore */}
                                <Input
                                    {...field}
                                    id="form-rhf-input-proizvod-sirinaProizvoda"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Unesi širinu"
                                    autoComplete="sirina"
                                    type="number"
                                    defaultValue={p.sirinaProizvoda}
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
                            name={`proizvod.${i}.duzinaProizvoda`}
                            render={({ field, fieldState  }) => (
                                <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-input-proizvod-duzinaProizvoda">
                                        {`Dužina za ${i+1} proizvod`}
                                </FieldLabel>
                                {/* @ts-ignore */}
                                <Input
                                    {...field}
                                    id="form-rhf-input-proizvod-duzinaProizvoda"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Unesi duzinu"
                                    autoComplete="duzina"
                                    type="number"
                                    defaultValue={p.duzinaProizvoda}
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
                          name={`proizvod.${i}.obradaProizvoda`}
                          render={({ field, fieldState  }) => (
                              <div className="flex flex-col gap-2 w-full">
                              <FieldLabel htmlFor={`form-rhf-input-proizvod.${i}-obradaProizvoda`}>
                                  {`Obrada za ${i+1}. proizvod`}
                              </FieldLabel>
                              <Select
                                  name = {field.name}
                                  value={field.value}
                                  onValueChange={field.onChange}
                                  defaultValue={p.obradaProizvoda}
                              >
                              <SelectTrigger aria-invalid={fieldState.invalid ? true : undefined}>
                                  <SelectValue placeholder="Izaberi obradu." />
                              </SelectTrigger>
                              <SelectContent>
                              {obrada.map((o) => (
                                <SelectItem key={o.value} value={o.value}>
                                  {o.label}
                                </SelectItem>  
                              ))}
                              </SelectContent>
                                  </Select>
                              </div>
                        )}/>
                          {/* @ts-ignore */}
                        {p.rupe.map((r,rIndex) => {
                          return (
                            <div key={r.rIndex}>
                              <Controller
                                  control={form.control}
                                  name={`proizvod.${i+1}.rupe.${rIndex+1}.fiRupe`}
                                  render={({ field, fieldState  }) => (
                                  <div className="flex flex-col">
                                    <h1>Index Rupe: {rIndex+1}</h1>
                                  <FieldLabel htmlFor="form-rhf-input-proizvod-brojRupaProizvoda">
                                          {`Fi rupe ${rIndex+1}`}
                                      </FieldLabel>
                                  <Select
                                      name = {field.name}
                                      value={field.value}
                                      onValueChange={field.onChange}
                                      defaultValue={r.fiRupe}
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
                                    name={`proizvod.${i}.rupe.${rIndex}.brojRupa`}
                                    render={({ field, fieldState  }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-input-proizvod-brojRupaProizvoda">
                                            {`Broj Rupa za ${rIndex+1} proizvod za Rupe`}
                                        </FieldLabel>
                                        {/* @ts-ignore */}
                                        <Input
                                            {...field}
                                            id="form-rhf-input-proizvod-brojRupaProizvoda"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Unesi broj rupa."
                                            autoComplete="brojRupa"
                                            type="number"
                                            defaultValue={r.brojRupa}
                                        />
                                        <FieldDescription>
                                            Unesi broj rupa po kolicini.
                                        </FieldDescription>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                        
                                    </Field>
                                )}/>
                              <p>{r.fiRupe} - {r.brojRupa}kom</p>
                            </div>
                          )
                        })}
                        
                      </section>
                      
                  </div>
                )
              })}
            </FieldGroup>
            
                <Proizvod nalog={nalog}/>
            <FieldGroup>
            </FieldGroup>
            
            <div className='text-red-600 text-sm mt-1'>
                {/* Error: Course chapters */}
                {form.formState.errors.proizvod?.message}
            </div>
            <Button
                className='px-4 py-2 bg-blue-600 rounded-lg text-white'
                type='submit'
            >
                Submit
            </Button>
            </form>
            
        </CardContent>
    </Card>
  )
}

//@ts-ignore
const Proizvod = ({nalog}) => {
  const schemaCreateRupe = z.object({
  // content: fiRupe
  fiRupe: z.string().min(3),
  brojRupa: z.coerce.number().default
})

const schemaCreateProizvod = z.object({
  //title : imeProizvoda
  imeProizvoda: z.string().min(3).default(nalog.imeProizvoda),
  obradaProizvoda: z.string().min(3),
  sirinaProizvoda: z.coerce.number(),
  duzinaProizvoda: z.coerce.number(),
  // notes: rupe
  rupe: z
    .array(schemaCreateRupe)
    //.min(1, { message: 'Chapter must contain atleast one note.' }),
})

 const schemaCreateCourse = z.object({
  //title : ime
  ime: z.string().min(3),
  brojTelefona: z.coerce.number(),
  stanjeNaloga: z.string().default("nijeUradjen"),
  datum: z.string().default(datum),
  //chapters : proizvod: z
  proizvod: z
    // @ts-ignore
    .array(schemaCreateProizvod, { required_error: 'Chapters are required.' })
    .min(1, { message: 'Course must contain atleast one chapter.' }),
    
})
  const {
    register,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schemaCreateCourse)
  })

  const { append, remove, fields } = useFieldArray({
    name: 'proizvod',
    control,
  })
  return (
    <div className=' space-y-4 '>
      
      {/* Loop through chapter fields */}
      {fields.map((proizvod, proizvodIndex) => {
        return (
          <div
            className='p-6  shadow-lg rounded-lg space-y-3'
            key={proizvod.id}
          >
            <div className='flex justify-between'>
              <div className='text-lg mb-2 font-semibold'>Proizvod {proizvodIndex+1}</div>{' '}
              <Button
                type='button'
                onClick={() => {
                  // Remove: chapter index
                  remove(proizvodIndex)
                }}
                className='text-red-400 text-xs cursor-pointer bg-amber-100'
              >
                Izbriši proizvod
              </Button>
            </div>
            
            <FieldGroup className='flex flex-row'>
                <Controller
                    control={control}
                    name={`proizvod.${proizvodIndex}.imeProizvoda`}
                    render={({ field, fieldState  }) => (
                        <div className="flex flex-col gap-2 w-full">
                        <FieldLabel htmlFor={`form-rhf-input-proizvod.${proizvodIndex}.imeProizvoda`}>
                            {`Proizvod ${proizvodIndex+1}`}
                        </FieldLabel>
                        <Select
                            name = {field.name}
                            value={field.value}
                            onValueChange={field.onChange}
                            defaultValue={nalog.imeProizvoda}
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
                    control={control}
                    name={`proizvod.${proizvodIndex}.obradaProizvoda`}
                    render={({ field, fieldState  }) => (
                        <div className="flex flex-col gap-2 w-full">
                        <FieldLabel htmlFor={`form-rhf-input-proizvod.${proizvodIndex}-obradaProizvoda`}>
                            {`Obrada za ${proizvodIndex+1}. proizvod`}
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
                    control={control}
                    name={`proizvod.${proizvodIndex}.sirinaProizvoda`}
                    render={({ field, fieldState  }) => (
                        <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-input-proizvod-sirinaProizvoda">
                                {`Širina za ${proizvodIndex+1} proizvod`}
                        </FieldLabel>
                        {/* @ts-ignore */}
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
                    control={control}
                    name={`proizvod.${proizvodIndex}.duzinaProizvoda`}
                    render={({ field, fieldState  }) => (
                        <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-input-proizvod-duzinaProizvoda">
                                {`Dužina za ${proizvodIndex+1} proizvod`}
                        </FieldLabel>
                        {/* @ts-ignore */}
                        <Input
                            {...field}
                            id="form-rhf-input-proizvod-duzinaProizvoda"
                            aria-invalid={fieldState.invalid}
                            placeholder="Unesi duzinu"
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
            </FieldGroup>
            <ManageNotes proizvodIndex={proizvodIndex} />
            <div className='text-red-600 text-sm mt-1'>
              {/* Error: Chapter notes */}
              {errors.proizvod?.[proizvodIndex]?.rupe?.message}
            </div>

            
          </div>
        )
      })}

      <Button
        type='button'
        onClick={() => {
          // Append: notes
          append({ rupe: [], imeProizvoda: '', duzinaProizvoda:0, obradaProizvoda:'',sirinaProizvoda:0 })
        }}
        className=' text-white text-center w-full py-5 cursor-pointer rounded-3xl'
      >
        Dodaj Proizvod
      </Button>
    </div>
  )
}

const ManageNotes = ({ proizvodIndex }: { proizvodIndex: number }) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContextCreateCourse()

  const { append, remove, fields } = useFieldArray({
    name: `proizvod.${proizvodIndex}.rupe`,
    control,
  })
  return (
    <div className=' space-y-4'>
      {/* Loop through notes fields  */}
      {fields.map((rupa, rupaIndex) => {
        return (
          <div key={rupa.id} className='py-4 bg-white px-3 rounded-lg shadow-xl'>
            <div>
              <div className='flex justify-between'>
                <div className='mb-2 font-semibold'>Rupe {rupaIndex+1}</div>
                <Button
                type='button'
                onClick={() => {
                  // Remove: chapter index
                  remove(rupaIndex)
                }}
                className='text-red-400 text-xs cursor-pointer bg-amber-100'
              >
                Izbriši rupu {rupaIndex+1}
              </Button>
              </div>
              <FieldGroup className='flex flex-row items-start'>
                <Controller
                    control={control}
                    name={`proizvod.${proizvodIndex}.rupe.${rupaIndex}.fiRupe`}
                    render={({ field, fieldState  }) => (
                    <div className="flex flex-col">
                    <FieldLabel htmlFor="form-rhf-input-proizvod-brojRupaProizvoda">
                            {`Fi rupe ${rupaIndex+1}`}
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
                    control={control}
                    name={`proizvod.${proizvodIndex}.rupe.${rupaIndex}.brojRupa`}
                    render={({ field, fieldState  }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-input-proizvod-brojRupaProizvoda">
                            {`Broj Rupa za ${rupaIndex+1} proizvod za Rupe`}
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
              </FieldGroup>
            </div>
          </div>
        )
      })}

      <Button
        type='button'
        onClick={() => {
          // Append: Notes content
          append({ fiRupe: '', brojRupa:0 })
        }}
        className=' text-white text-center w-full py-5 cursor-pointer rounded-3xl'
      >
        Dodaj rupe
      </Button>
    </div>
  )
}
