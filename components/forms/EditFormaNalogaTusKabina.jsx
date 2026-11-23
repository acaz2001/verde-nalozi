'use client'
import React, { useState,useEffect } from 'react'
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
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldContent,
  FieldSet,
  FieldLegend,
  FieldTitle
} from "@/components/ui/field"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {InputGroup,InputGroupInput,InputGroupAddon,InputGroupButton  } from "../ui/input-group"
import { Input } from "../ui/input"
import { rupe } from '../../lib/constants'
import Image from 'next/image'
import { Textarea } from "@/components/ui/textarea"
import { useSearchParams } from 'next/navigation';
import { useParams } from 'next/navigation'
import moment from 'moment';
import { toast } from "sonner"
import { redirect } from 'next/navigation'


moment.locale('sr')
let date = moment();
let datum = date.format("MMMM DD YYYY")
let tacanDatum = date.format("MMMM DD YYYY").charAt(0).toLocaleUpperCase()+datum.slice(1)
let mesec = date.format("MMMM")
let tacanMesec = mesec.charAt(0).toLocaleUpperCase()+mesec.slice(1)
console.log("DATE JE search:",tacanMesec);

const modeliKabina = [
  { label: "Model V01", value: "v01", image:"/Tus Kabina 3.jpg", cenaBezMontaze: 60, cenaSaMontazom: 90, cenaStaklaBojaBezMontaze: 90, cenaStaklaBojaMontaza: 120, cenaOkova: 100, cenaOkovaBoja: 120 },
  { label: "Model V02", value: "v02", image:"/Tus Kabina 3.jpg", cenaBezMontaze: 60, cenaSaMontazom: 90, cenaStaklaBojaBezMontaze: 90, cenaStaklaBojaMontaza: 120, cenaOkova: 100, cenaOkovaBoja: 120 },
  { label: "Model V03", value: "v03", image:"/Tus Kabina 1.jpg", cenaBezMontaze: 60, cenaSaMontazom: 90, cenaStaklaBojaBezMontaze: 90, cenaStaklaBojaMontaza: 120, cenaOkova: 100, cenaOkovaBoja: 120 },
  { label: "Model V04", value: "v04", image:"/Tus Kabina 4.jpg", cenaBezMontaze: 60, cenaSaMontazom: 90, cenaStaklaBojaBezMontaze: 90, cenaStaklaBojaMontaza: 120, cenaOkova: 100, cenaOkovaBoja: 120 },
  { label: "Model V05", value: "v05", image:"/Tus Kabina 5.jpg", cenaBezMontaze: 60, cenaSaMontazom: 90, cenaStaklaBojaBezMontaze: 90, cenaStaklaBojaMontaza: 120, cenaOkova: 100, cenaOkovaBoja: 120 },
  { label: "Model V07", value: "v07", image:"/Tus kabina v020 sivo.jpg", cenaBezMontaze: 60, cenaSaMontazom: 90, cenaStaklaBojaBezMontaze: 90, cenaStaklaBojaMontaza: 120, cenaOkova: 100, cenaOkovaBoja: 120 },
  { label: "Model V08", value: "v08", image:"/Tus kabina v21 sivo.jpg", cenaBezMontaze: 60, cenaSaMontazom: 90, cenaStaklaBojaBezMontaze: 90, cenaStaklaBojaMontaza: 120, cenaOkova: 100, cenaOkovaBoja: 120},
  { label: "Model V09", value: "v09", image:"/Tus kabina v22 sivo.jpg", cenaBezMontaze: 60, cenaSaMontazom: 90, cenaStaklaBojaBezMontaze: 90, cenaStaklaBojaMontaza: 120, cenaOkova: 100, cenaOkovaBoja: 120},
  { label: "Model V10", value: "v10", image:"/Tus kabina v4 sivo.jpg", cenaBezMontaze: 60, cenaSaMontazom: 90, cenaStaklaBojaBezMontaze: 90, cenaStaklaBojaMontaza: 120, cenaOkova: 100, cenaOkovaBoja: 120},
  { label: "Model V25", value: "v25", image:"/Tus kabina v25 sivo.jpg" ,cenaBezMontaze: 60, cenaSaMontazom: 90, cenaStaklaBojaBezMontaze: 90, cenaStaklaBojaMontaza: 120, cenaOkova: 100, cenaOkovaBoja: 120},
  { label: "Model V27", value: "v27", image:"/Tus kabina v27 sivo.jpg" ,cenaBezMontaze: 60, cenaSaMontazom: 90, cenaStaklaBojaBezMontaze: 90, cenaStaklaBojaMontaza: 120, cenaOkova: 100, cenaOkovaBoja: 120},
  { label: "Model V30", value: "v30", image:"/Tus kabina v030 sivo.jpg",cenaBezMontaze: 60, cenaSaMontazom: 90, cenaStaklaBojaBezMontaze: 90, cenaStaklaBojaMontaza: 120, cenaOkova: 100, cenaOkovaBoja: 120 }
]
const bojaStakla = [
  { label: "Providno", value: "providno" },
  { label: "Braon", value: "braon" },
  { label: "Sivo", value: "sivo" },
  { label: "Matirano", value: "matirano" },
]
const bojaOkova = [
  { label: "Sivo", value: "sivo" },
  { label: "Crni mat", value: "crniMat" },
  { label: "Crni sjaj", value: "crniSjaj" },
  { label: "Zlatni mat", value: "zlatniMat" },
  { label: "Zlatni sjaj", value: "zlatniSjaj" }
]
const montaza = [
  {
    id: "da",
    title: "Da",
    description: "Izaberite ako se kabina montira.",
  },
  {
    id: "ne",
    title: "Ne",
    description: "Izaberite ako se kabina ne montira.",
  }
]




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






function EditFormaNalogaTusKabina({nalog}) {
    const proizvodiLabel = proizvodi.map((p) => p.label);
    const [defProizvod, setDefProizvod] = useState(proizvodiLabel)
    const [seleccedValue1,setSelectedValue1]=useState('v01');
    const [selectedItem, setSelectedItem]=useState('v01');
    const [duzina, setDuzina] = useState(0);
    const [sirina, setSirina] = useState(0);
    const [visina, setVisina] = useState(0);
    const [bojaStaklaState,setBojaStaklaState]=useState('');
    const [bojaOkovaState,setBojaOkovaState]=useState('');
    const [montazaState,setMontazaState]=useState('');

    const params = useParams();
    console.log("PARAMS JE" + params.id)

    const objectInArray = modeliKabina.filter(obj => {  //variable koji cuva podatke izabranog proizvoda
    return obj.value === selectedItem
  })
  const obj = objectInArray.map((m)=> m);


  const cenaKabine = montazaState == 'da' ?
    objectInArray[0].cenaSaMontazom * (((sirina/100) * (visina/100)) + ((duzina/100) * (visina/100))) :
    objectInArray[0].cenaBezMontaze * (((sirina/100) * (visina/100)) + ((duzina/100) * (visina/100)));


  const cenaKabineBoja = montazaState == 'da' ?
    objectInArray[0].cenaStaklaBojaMontaza * (((sirina/100) * (visina/100)) + ((duzina/100) * (visina/100))) :
    objectInArray[0].cenaStaklaBojaBezMontaze * (((sirina/100) * (visina/100)) + ((duzina/100) * (visina/100)));
   
    const ukupnaCena = (bojaStaklaState == 'providno' ? cenaKabine :
      cenaKabineBoja
    )
   
    const ukupnaCenaKabine = bojaOkovaState == 'sivo' || bojaOkovaState == '' ?
      (ukupnaCena + objectInArray[0].cenaOkova) :
     (ukupnaCena + objectInArray[0].cenaOkovaBoja)
    
     const [cenaState, setCenaState] = useState(ukupnaCenaKabine)

    const form = useForm({
        //resolver: zodResolver(formSchema),
        defaultValues: {
            ime: nalog.ime,
            telefon: nalog.telefon,
            modelKabine: nalog.modelKabine,
            sirina: nalog.sirina,
            duzina: nalog.duzina,
            visina: nalog.visina,
            bojaStakla: nalog.bojaStakla,
            bojaOkova: nalog.bojaOkova,
            montaza: nalog.montaza,
            napomena: nalog.napomena,
            datum: nalog.datum,
            cena: nalog.cena,
            stanjeNaloga: nalog.stanjeNaloga
         
        },
      })


    const {
        register,
        handleSubmit,
        watch,
        getValues,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm()


    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "rupa",
      })


    //const onSubmit = (data) => console.log(data)
    const onSubmit = async (data) => {
        console.log("FORM DATA:", data)
  console.log("MODEL KABINE:", data.modelKabine)
      const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}api/tus-kabine-nalozi/${params.id}`, {
        method: "PUT",
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
    toast("Nalog za tus kabinu je uspesno napravljen.", { position: "bottom-right" });
    redirect(`/tus-kabine-nalozi?query=${tacanMesec}`)

  
      console.log("DATA JE: "+ nalog.id) // result je objekat sa podacima korisnika sa id
    }


    console.log(watch("example")) // watch input value by passing the name of it

    const modelKabine = form.watch("modelKabine")
    console.log("SELECT:", modelKabine)


    useEffect(() => {
  if (!nalog) return

  form.reset({
    ime: nalog.ime ?? "",
    modelKabine: nalog.modelKabine ?? "",
    visina: nalog.visina ?? "",
  })
}, [nalog, form])




    return (
        <form id="form-rhf" onSubmit={form.handleSubmit(onSubmit)} className='px-5'>
            <h1 className='mt-20'>Promenite formu naloga za tus kabinu.</h1>
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
                            {...field}
                            //{...register("ime")}
                            id="form-rhf-input-ime"
                            aria-invalid={fieldState.invalid}
                            placeholder="Unesi neko ime"
                            //defaultValue={nalog.ime}
                            autoComplete="ime"
                            type='text'
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
                            {...field}
                           
                            id="form-rhf-input-telefon"
                            aria-invalid={fieldState.invalid}
                            placeholder="Unesi broj telefona"
                            //defaultValue={nalog.telefon}
                            autoComplete="telefon"
                            type='text'
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
                    name="modelKabine"
                    control={form.control}
                    render={({ field, fieldState }) => (
                   
                    <Field
                        data-invalid={fieldState.invalid}
                    >
                        <FieldContent>
                        <FieldLabel htmlFor="form-rhf-select-modelKabine">
                            Model Kabine:
                        </FieldLabel>
                        <FieldDescription>
                            Izaberi model kabine.
                        </FieldDescription>
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                        </FieldContent>
                        <Select
                        //name={field.name}
                        value={field.value}
                        //defaultValue={nalog.modelKabine}
                        onValueChange = {field.onChange}
                        //onValueChange={(value) => {setSelectedValue1(String(value))}}
                        
                        >
                        <SelectTrigger
                            id="form-rhf-select-modelKabine"
                            aria-invalid={fieldState.invalid}
                            className="min-w-[120px]"
                        >
                            <SelectValue placeholder="Izaberi" />
                        </SelectTrigger>
                        <SelectContent position="item-aligned">
                            <SelectSeparator />
                            {modeliKabina.map((model) => (
                            <SelectItem key={model.value} value={model.value} >
                                {model.label}
                            </SelectItem>
                            ))}
                        </SelectContent>
                        </Select>
                        <ModelKabine fieldValue={field.value}
                        image={field.value}
                        />                 
                    </Field>
                   
                    )}
                />
                {nalog.sirina != "" || 0 ?
                <Controller
                    name="sirina"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-input-sirina">
                            Širina
                        </FieldLabel>
                        <Input
                            {...field}
                            id="form-rhf-input-sirina"
                            aria-invalid={fieldState.invalid}
                            placeholder="Unesi širinu"
                            //defaultValue={nalog.sirina}
                            autoComplete="sirina"
                            type='number'
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
                : null}
                {nalog.duzina != "" || 0 ?
                <Controller
                    name="duzina"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-input-duzina">
                            Dužina
                        </FieldLabel>
                        <Input
                            {...field}
                            //{...register("duzina")}
                            id="form-rhf-input-duzina"
                            aria-invalid={fieldState.invalid}
                            placeholder="Unesi dužinu"
                            defaultValue={nalog.duzina}
                            autoComplete="duzina"
                            type='number'
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
                /> : null}
                <Controller
                    name="visina"
                    control={form.control}
                    render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-visina">
                        Visina:
                        </FieldLabel>
                        <FieldDescription>
                            Unesi dimenziju u centimetrima.
                        </FieldDescription>
                        <Input
                        {...field}
                        //{...register("visina")}
                        id="form-rhf-visina"
                        aria-invalid={fieldState.invalid}
                        placeholder="Unesi visina:"
                        autoComplete="off"
                        type = "number"
                        //defaultValue={nalog.visina}
                        
                        />
                        {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                        )}
                       
                    </Field>
                   
                    )}
                />
                <Controller
                    name="bojaStakla"
                    control={form.control}
                    render={({ field, fieldState }) => (
                    <Field
                        data-invalid={fieldState.invalid}
                    >
                        <FieldContent>
                        <FieldLabel htmlFor="form-rhf-select-bojaStakla">
                            Boja Stakla:
                        </FieldLabel>
                        <FieldDescription>
                            Izaberi boju stakla.
                        </FieldDescription>
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                        </FieldContent>
                        <Select
                        
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                        defaultValue={nalog.bojaStakla}
                        >
                        <SelectTrigger
                            id="form-rhf-select-bojaStakla"
                            aria-invalid={fieldState.invalid}
                            className="min-w-[120px]"
                        >
                            <SelectValue placeholder="Izaberi" />
                        </SelectTrigger>
                        <SelectContent position="item-aligned">
                            <SelectSeparator />
                            {bojaStakla.map((boja) => (
                            <SelectItem key={boja.value} value={boja.value}>
                                {boja.label}
                            </SelectItem>
                            ))}
                        </SelectContent>
                        </Select>
                       
                    </Field>
                    )}
                />
                <Controller
                    name="bojaOkova"
                    control={form.control}
                    render={({ field, fieldState }) => (
                    <Field
                        data-invalid={fieldState.invalid}
                    >
                        <FieldContent>
                        <FieldLabel htmlFor="form-rhf-select-bojaOkova">
                            Boja okova:
                        </FieldLabel>
                        <FieldDescription>
                            Izaberi boju okova.
                        </FieldDescription>
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                        </FieldContent>
                        <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                        defaultValue={nalog.bojaOkova}
                        >
                        <SelectTrigger
                            id="form-rhf-select-bojaOkova"
                            aria-invalid={fieldState.invalid}
                            className="min-w-[120px]"
                        >
                            <SelectValue placeholder="Izaberi" />
                        </SelectTrigger>
                        <SelectContent position="item-aligned">
                            <SelectSeparator />
                            {bojaOkova.map((boja) => (
                            <SelectItem key={boja.value} value={boja.value}>
                                {boja.label}
                            </SelectItem>
                            ))}
                        </SelectContent>
                        </Select>
                       
                    </Field>
                    )}
                />
                <Controller
                    name="montaza"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <FieldSet>
                        <FieldLegend>Montaža:</FieldLegend>
                        <FieldDescription>
                            Da li se kabina montira ili ne.
                        </FieldDescription>
                        <RadioGroup
                            name={field.name}
                            value={field.value}
                            defaultValue={nalog.montaza}
                            onValueChange={field.onChange}
                            className='cursor-pointer'
                        >
                            {montaza.map((m) => (
                            <FieldLabel key={m.id} htmlFor={`form-rhf-radiogroup-${m.id}`} className='cursor-pointer'>
                                <Field orientation="horizontal" data-invalid={fieldState.invalid}>
                                <FieldContent>
                                    <FieldTitle>{m.title}</FieldTitle>
                                    <FieldDescription>{m.description}</FieldDescription>
                                </FieldContent>
                                <RadioGroupItem
                                    value={m.id}
                                    id={`form-rhf-radiogroup-${m.id}`}
                                    aria-invalid={fieldState.invalid}
                                    className='cursor-pointer'
                                />
                                </Field>
                            </FieldLabel>
                            ))}
                        </RadioGroup>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                       
                        </FieldSet>
                    )}
                />
                <Controller
                    name="napomena"
                    control={form.control}
                    render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-textarea-napomena">
                        Dodaj napomenu:
                        </FieldLabel>
                        <Textarea
                        {...field}
                        id="form-rhf-textarea-napomena"
                        aria-invalid={fieldState.invalid}
                        //defaultValue={nalog.napomena}
                        placeholder="Napiši napomenu ovde..."
                        type='number'
                        className="min-h-[120px]"
                        />
                        <FieldDescription>
                        Ukoliko imate dodatnih napomena za proizvod ili sličnih
                        zapisa, napišite u ovo polje.
                        </FieldDescription>
                        {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                        )} </Field>
                    )}
                />
            <div className=''>
                        <Controller
                          name="datum"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor="form-rhf-datum">
                                datum:
                              </FieldLabel>
                              <FieldDescription>
                                  Unesi dimenziju u centimetrima.
                              </FieldDescription>
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
                      <div className=''>
                        <Controller
                          name="cena"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor="form-rhf-cena">
                                cena:
                              </FieldLabel>
                              <FieldDescription>
                                  Unesi dimenziju u centimetrima.
                              </FieldDescription>
                              <Input
                                {...field}
                                //{...register("cena")}
                                id="form-rhf-cena"
                                aria-invalid={fieldState.invalid}
                                placeholder="Unesi cena:"
                                autoComplete="off"
                                type = "number"
                                //defaultValue={cenaState}
                                //value={cenaState}
                              />
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                              
                            </Field>
                            
                          )}
                        />
                      </div>
                      <div className='hidden'>
                      <Controller
                          name="stanjeNaloga"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field
                              data-invalid={fieldState.invalid}
                            >
                              <FieldContent>
                                <FieldLabel htmlFor="form-rhf-select-stanjeNaloga">
                                  Boja okova:
                                </FieldLabel>
                                <FieldDescription>
                                  Izaberi boju okova.
                                </FieldDescription>
                                {fieldState.invalid && (
                                  <FieldError errors={[fieldState.error]} />
                                )}
                              </FieldContent>
                              <Select
                                name={field.name}
                                value={'nijeUradjen'}
                                onValueChange={field.onChange}
                              >
                                <SelectTrigger
                                  id="form-rhf-select-stanjeNaloga"
                                  aria-invalid={fieldState.invalid}
                                  className="min-w-[120px]"
                                >
                                  <SelectValue placeholder="Izaberi" />
                                </SelectTrigger>
                                <SelectContent position="item-aligned">
                                  <SelectItem value="nijeUradjen">Nije Uradjen</SelectItem>
                                  <SelectSeparator />
                                  
                                </SelectContent>
                              </Select>
                            </Field>
                          )}
                        />
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


function ModelKabine({fieldValue,image}) {
  //const map = modeliKabina.map((m) => m.value);
  //const map2 = modeliKabina.map((m) => m.image);
  //console.log("M JE:" + map)


  //const res = map.filter((f) => f.includes(fieldValue))
 
 


  return(
    <div>
      <Image src={`/${image}.jpg`} alt='image' width={500} height={500} className='rounded-2xl'/>
    </div>
  )
}


export default EditFormaNalogaTusKabina





