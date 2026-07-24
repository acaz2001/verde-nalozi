'use client'
import React, { useState } from 'react'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item"
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { PlusIcon, Check, X, Pencil  } from "lucide-react"
import { useForm, Controller,useFieldArray } from "react-hook-form"
import {proizvodi} from "../../lib/constants"
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
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {InputGroup,InputGroupInput,InputGroupAddon,InputGroupButton  } from "../../components/ui/input-group"
import { Input } from "../../components/ui/input"
import { rupe } from '../../lib/constants'


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



function EditFormaNaloga({nalog}) {
    const proizvodiLabel = proizvodi.map((p) => p.label);
    const [defProizvod, setDefProizvod] = useState(proizvodiLabel)
    console.log("NALOG JE:",nalog.rupe)

    //const defaultProizvod = () => {
    //    if (proizvodiLabel.includes(nalog.proizvod)) {
    //        return 
    //    }
    //}

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          ime: "",
          proizvod: "",
          obrada: "",
          obrada2: "",
          sirina: 0,
          duzina: 0,
          rupa: nalog.rupe,
          brojRupa:0,
          
        },
      })

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm()

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "rupa",
      })

    const onSubmit = (data) => console.log(data)

    console.log(watch("example")) // watch input value by passing the name of it


    return (
        <form id="form-rhf-input" onSubmit={handleSubmit(onSubmit)} className='px-5'>
            <h1 className='mt-20'>EditForma</h1>
            <FieldGroup>
                <Controller
                    name="ime"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-input-ime">
                            Ime
                        </FieldLabel>
                        <Input
                            //{...field}
                            {...register("ime")}
                            id="form-rhf-input-ime"
                            aria-invalid={fieldState.invalid}
                            placeholder="Unesi neko ime"
                            defaultValue={nalog.ime}
                            autoComplete="ime"
                        />
                        <FieldDescription>
                            This is your public display name. Must be between 3 and 10
                            characters
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
                            //{...field}
                            {...register("telefon")}
                            id="form-rhf-input-telefon"
                            aria-invalid={fieldState.invalid}
                            placeholder="Unesi broj telefona"
                            defaultValue={nalog.telefon}
                            autoComplete="telefon"
                        />
                        <FieldDescription>
                            This is your public display name. Must be between 3 and 10
                            characters
                        </FieldDescription>
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                        </Field>
                    )}
                />
                <Controller
                name="proizvod"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field>
                    <FieldContent>
                        <FieldLabel htmlFor="form-rhf-input-proizvod">
                            Izaberi proizvod
                        </FieldLabel>
                        <FieldDescription>
                            Opadajući prozor za proizvode na stanju.
                        </FieldDescription>
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </FieldContent>
                        <Select 
                        name={field.name}
                        //value={field.value}
                        onValueChange={field.onChange}
                        defaultValue={nalog.proizvod}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent
                            
                        >
                            <SelectGroup>
                            {proizvodi.map((proizvod) => (
                            <div>

                                
                                <SelectItem key={proizvod.value} value={proizvod.label} >
                                {proizvod.label}
                                </SelectItem>
                            </div>
                        ))}
                            </SelectGroup>
                        </SelectContent>
                        </Select>
                    </Field>
                )}
                />
    
                <Controller
                    name="sirina"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-input-sirina">
                            Širina
                        </FieldLabel>
                        <Input
                            //{...field}
                            {...register("sirina")}
                            id="form-rhf-input-sirina"
                            aria-invalid={fieldState.invalid}
                            placeholder="Unesi širinu"
                            defaultValue={nalog.sirina}
                            autoComplete="sirina"
                        />
                        <FieldDescription>
                            This is your public display name. Must be between 3 and 10
                            characters
                        </FieldDescription>
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                        </Field>
                    )}
                />
                <Controller
                    name="duzina"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-input-duzina">
                            Dužina
                        </FieldLabel>
                        <Input
                            //{...field}
                            {...register("duzina")}
                            id="form-rhf-input-duzina"
                            aria-invalid={fieldState.invalid}
                            placeholder="Unesi dužinu"
                            defaultValue={nalog.duzina}
                            autoComplete="duzina"
                        />
                        <FieldDescription>
                            This is your public display name. Must be between 3 and 10
                            characters
                        </FieldDescription>
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                        </Field>
                    )}
                />

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-base font-semibold">Rupe</h3>

                        <Button
                        type="button"
                        variant="outline"
                        onClick={() => append({ fiRupe: "" })}
                        >
                        Dodaj rupu
                        </Button>
                    </div>

                    <FieldGroup>
                        {fields.map((item, index) => {
                            console.log("OVO JE FIELS" + item)
                        const fieldError = errors.rupa?.[index]?.fiRupe

                        return (
                            <div
                            key={item.id}
                            className="flex items-start gap-3 rounded-xl border p-4"
                            >
                            <div className="flex-1">
                                <Controller
                                control={form.control}
                                name={`rupa.${index}.fiRupe`}
                                render={({ field }) => (
                                    <Field data-invalid={fieldError ? true : undefined}>
                                    <FieldLabel>Fi rupe #{index + 1}</FieldLabel>

                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger aria-invalid={fieldError ? true : undefined}>
                                        <SelectValue placeholder="Izaberi rupu" />
                                        </SelectTrigger>

                                        <SelectContent>
                                        {rupe.map((rupa) => (
                                            <SelectItem key={rupa.value} value={rupa.value}>
                                            {rupa.label}
                                            </SelectItem>
                                        ))}
                                        </SelectContent>
                                    </Select>

                                    {fieldError && <FieldError>{fieldError.message}</FieldError>}
                                    </Field>
                                )}
                                />
                            </div>

                            <Button
                                type="button"
                                variant="destructive"
                                onClick={() => remove(index)}
                                //disabled={fields.length === 1}
                                disabled={isSubmitting || fields.length === 1}
                                className="mt-7"
                            >
                                Obriši
                            </Button>
                            </div>
                        )
                        })}
                    </FieldGroup>
                </div>
            </FieldGroup>

        {/*<ItemGroup className="w-full">
            
                <Item key={nalog.ime} variant="outline" className="w-full">
                
                <ItemContent className="gap-1">
                    <ItemTitle className='text-[18px]'>{nalog.ime}</ItemTitle>
                    <ItemTitle>{nalog.telefon}</ItemTitle>
                    <ItemDescription className='text-xl text-black font-bold'>
                    {`${nalog.proizvod} Širina:${nalog.sirina}cm Dužina:${nalog.duzina}cm`}
                    </ItemDescription>
                    <ItemDescription className='text-xl text-black font-bold'>
                    {nalog.obrada}
                    </ItemDescription>
                    <ItemTitle>{nalog.datum}</ItemTitle>
                </ItemContent>
                <ItemActions>
                    <Link href={`/nalozi/${nalog.id}`} target="_blank">
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <Pencil />
                    </Button>
                    </Link>
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <Check />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <X />
                    </Button>
                
                </ItemActions>
                </Item>
            
            </ItemGroup>*/}

            <Button type="submit" className="cursor-pointer mt-5">
                Sačuvaj
            </Button>
        </form>
    )
}

export default EditFormaNaloga
