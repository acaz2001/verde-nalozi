'use client'
import React, { Suspense, useEffect } from 'react'
import { useState } from 'react'
import { Controller, useForm, useWatch } from "react-hook-form"
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
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldContent,
  FieldSet,
  FieldLegend,
  FieldTitle 
} from "@/components/ui/field"
import { Input } from "../../components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import { fi } from 'zod/locales'
import Image from 'next/image'
import { toast } from "sonner"
import { redirect } from 'next/navigation'
//import { useRouter } from 'next/compat/router'
import moment from 'moment';
import { DevTool } from '@hookform/devtools'
import {Skeleton} from '../ui/skeleton'

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

//let now = new Date();
moment.locale('sr')
let date = moment();
let now = date.format("MMMM DD YYYY")
let mesec = date.format("MMMM")

console.log("Datum JE:",now);



function TusKabineNoviNalog() {
  //const router = useRouter()

  const [seleccedValue1,setSelectedValue1]=useState('v01');
  const [selectedItem, setSelectedItem]=useState('v01');
  const [duzina, setDuzina] = useState(0);
  const [sirina, setSirina] = useState(0);
  const [visina, setVisina] = useState(0);
  const [bojaStaklaState,setBojaStaklaState]=useState('');
  const [bojaOkovaState,setBojaOkovaState]=useState('');
  const [montazaState,setMontazaState]=useState('');
  const [dodatniTrosak, setDodatniTrosak] = useState(0);
  const [brojKabinaState, setBrojKabinaState] = useState(1)



  console.log('selectedItem', selectedItem);
  

  const objectInArray = modeliKabina.filter(obj => {  //variable koji cuva podatke izabranog proizvoda
    return obj.value === selectedItem 
  })
  const obj = objectInArray.map((m)=> m);

  let cenaKabine = montazaState == 'da' ? 
    objectInArray[0].cenaSaMontazom * (((sirina/100) * (visina/100)) + ((duzina/100) * (visina/100))) :
    objectInArray[0].cenaBezMontaze * (((sirina/100) * (visina/100)) + ((duzina/100) * (visina/100)));

  let cenaKabineBoja = montazaState == 'da' ? 
    objectInArray[0].cenaStaklaBojaMontaza * (((sirina/100) * (visina/100)) + ((duzina/100) * (visina/100))) :
    objectInArray[0].cenaStaklaBojaBezMontaze * (((sirina/100) * (visina/100)) + ((duzina/100) * (visina/100))); 
    
    let ukupnaCena = (bojaStaklaState == 'providno' ? cenaKabine :
      cenaKabineBoja
    ) 
    
    let ukupnaCenaKabine = bojaOkovaState == 'sivo' || bojaOkovaState == '' ? 
      ((ukupnaCena + objectInArray[0].cenaOkova +dodatniTrosak ) * brojKabinaState) :
     ((ukupnaCena + objectInArray[0].cenaOkovaBoja+ dodatniTrosak) * brojKabinaState)

     const [cenaState, setCenaState] = useState(ukupnaCenaKabine)

     console.log("ukupnaCenaKabine",objectInArray[0].image);
     


  //const map = modeliKabina.map((m) => m.value);
  //const res = map.filter((f) => f.includes('v03'))
  //console.log("M JE:" + obj[0].image )

    const form = useForm ({ defaultValues: {
        ime: "",
        telefon: "",
        modelKabine: "v01",
        sirina: 0,
        duzina: 0,
        visina: 200,
        brojKabina: 1,
        bojaStakla: "providno",
        bojaOkova: "sivo",
        montaza: "da",
        napomena: "",
        datum: now,
        cena: ukupnaCenaKabine,
        dodatniTroskovi: 0,
        dodatniTroskoviNapomena: '',
        stanjeNaloga: 'nijeUradjen'

    }})
    const {
      register,
      watch,
      formState: { errors },
      handleSubmit,
      reset,
      setValue
    } = useForm()

    const watchCena = form.watch("cena")
    console.log("Watch je:",watchCena)
    
    const watchBrojKabina = parseInt(form.watch("brojKabina"))
    console.log("watchBrojKabina:", brojKabinaState );


    const onSubmit = async (data) => {
      
      const res = await fetch("api/tus-kabine-nalozi", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
        
      } );
  
      const result = await res.json();
      const obj = JSON.stringify(result)
      if (!res.ok) {
        // response status is not 2xx
        alert("Submitting form failed!");
        return;
      }
      
      //setValue("cena", ukupnaCenaKabine)
      toast("Nalog za tus kabinu je uspesno napravljen.", { position: "bottom-right" });
      //revalidatePath('/tus-kabine-nalozi')
      redirect(`/tus-kabine-nalozi?query=${mesec}`)
      //form.reset()
      console.log("DATAS JE:" + obj)
    }

    //console.log("FORMA JE", form.setValue("cena", cenaState))
    useEffect(()=>{
      setCenaState(ukupnaCenaKabine)
      form.setValue("cena", ukupnaCenaKabine)  
        
    },[ukupnaCenaKabine])

    useEffect(() => {
      setVisina(200)
    },[])

    const watchDodatniTroskovi = parseInt(form.watch('dodatniTroskovi'))

    

  
    console.log('dodatniTrosak', dodatniTrosak);
    console.log('selectedItem', selectedItem);
        

    return (
      <>
        <form onSubmit={form.handleSubmit(onSubmit)} 
        className='w-full flex flex-col items-start gap-5'>
            <FieldGroup>
            <Controller
              name="ime"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-ime">
                    Ime:
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-ime"
                    aria-invalid={fieldState.invalid}
                    placeholder="Unesi ime:"
                    autoComplete="off"
                    required
                  />
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
                    type="text"
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
                    name={field.name}
                    value={field.value}
                    onValueChange = {(value) => {
                      field.onChange(value)
                      setSelectedItem(value)
                    }
                    }
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
                  <ModelKabine fieldValue={selectedItem} 
                  image={selectedItem}
                  />
                {}
                </Field>
                
              )}
            />
            <Controller
              name="sirina"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-sirina">
                    Širina:
                  </FieldLabel>
                  <FieldDescription>
                      Unesi dimenziju u centimetrima.
                  </FieldDescription>
                  <Input
                    {...field}
                    id="form-rhf-sirina"
                    aria-invalid={fieldState.invalid}
                    placeholder="Unesi sirina:"
                    autoComplete="off"
                    type = "number"
                    onChange={(e) => {
                      field.onChange(e.target.value)
                      setSirina(parseInt(e.target.value))
                    }}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                  {}
                </Field>
              )}
            />
            <Controller
              name="duzina"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-duzina">
                    Dužina:
                  </FieldLabel>
                  <FieldDescription>
                      Unesi dimenziju u centimetrima.
                  </FieldDescription>
                  <Input
                    {...field}
                    id="form-rhf-duzina"
                    aria-invalid={fieldState.invalid}
                    placeholder="Unesi duzina:"
                    autoComplete="off"
                    type = "number"
                    onChange={(e) => {
                      field.onChange(e.target.value)
                      setDuzina(parseInt(e.target.value))
                    }}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
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
                    id="form-rhf-visina"
                    aria-invalid={fieldState.invalid}
                    placeholder="Unesi visina:"
                    autoComplete="off"
                    type = "number"
                    onChange={(e) => {
                      field.onChange(e.target.value)
                      setVisina(parseInt(e.target.value))
                    }}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
                
              )}
            />
            <Controller
              name="brojKabina"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-brojKabina">
                    Količina kabina:
                  </FieldLabel>
                  <FieldDescription>
                      Unesi određen broj kabina po komadu.
                  </FieldDescription>
                  <Input
                    {...field}
                    id="form-rhf-brojKabina"
                    aria-invalid={fieldState.invalid}
                    placeholder="Unesi brojKabina:"
                    autoComplete="off"
                    type = "number"
                    onChange={(e) => {
                      field.onChange(e.target.value)
                       setBrojKabinaState(parseInt(e.target.value))
                    }}
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
                    onValueChange={(value) => {
                      field.onChange(value)
                      setBojaStaklaState(value)
                    }}
                  >
                    <SelectTrigger
                      id="form-rhf-select-bojaStakla"
                      aria-invalid={fieldState.invalid}
                      className="min-w-[120px]"
                    >
                      <SelectValue placeholder="Izaberi" />
                    </SelectTrigger>
                    <SelectContent position="item-aligned">
                      <SelectItem value="auto">Auto</SelectItem>
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
                    onValueChange={(value) => {
                      field.onChange(value)
                      setBojaOkovaState(value)
                    }}
                  >
                    <SelectTrigger
                      id="form-rhf-select-bojaOkova"
                      aria-invalid={fieldState.invalid}
                      className="min-w-[120px]"
                    >
                      <SelectValue placeholder="Izaberi" />
                    </SelectTrigger>
                    <SelectContent position="item-aligned">
                      <SelectItem value="auto">Auto</SelectItem>
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
                        onValueChange={(value) => {
                          field.onChange(value)
                          setMontazaState(value)
                        }}
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
                  <FieldDescription>
                    Ukoliko imate dodatnih napomena za proizvod ili sličnih 
                    zapisa, napišite u ovo polje.
                  </FieldDescription>
                  <Textarea
                    {...field}
                    id="form-rhf-textarea-napomena"
                    aria-invalid={fieldState.invalid}
                    placeholder="Napiši napomenu ovde..."
                    type="text"
                    className="min-h-[120px]"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )} </Field>
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
                    defaultValue={now}
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

            <div>
              <Controller
              name="dodatniTroskovi"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-dodatniTroskovi" className=''>
                    Dodatni troškovi
                  </FieldLabel>
                  <FieldDescription className=''>
                      Unesite ako imate neke dodatne stvari da naplatite na kabini(npr. plastifikacija, iznošenje na neki sprat...)
                  </FieldDescription>
                  <Input
                    {...field}
                    //{...register("cena")}
                    id="form-rhf-dodatniTroskovi"
                    aria-invalid={fieldState.invalid}
                    placeholder="Unesi dodatnu cenu:"
                    autoComplete="off"
                    type = "number"
                    onChange={(e) => {
                      field.onChange(e.target.value);
                        setDodatniTrosak(parseInt(e.target.value))
                      
                    }}
                    className=''
                    //defaultValue={ukupnaCenaKabine}
                    
                  />
                  {/* {setCenaState(field.value)} */}
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                  
                </Field>
              )}/>
              
            </div>

            {watchDodatniTroskovi <= 0 ? null : 
          
              <div>
                <Controller
                name="dodatniTroskoviNapomena"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-textarea-dodatniTroskoviNapomena">
                      Napomena za dodatne troškove:
                    </FieldLabel>
                    <Textarea
                      {...field}
                      id="form-rhf-textarea-dodatniTroskoviNapomena"
                      aria-invalid={fieldState.invalid}
                      placeholder="Napiši napomenu ovde..."
                      type="text"
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
              </div>
            }

            <div className=''>
            <Controller
              name="cena"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-cena" className='hidden'>
                    cena:
                  </FieldLabel>
                  <FieldDescription className='hidden'>
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
                    className='hidden'
                    //defaultValue={ukupnaCenaKabine}
                    value={ukupnaCenaKabine}
                  />
                  {/* {setCenaState(field.value)} */}
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                  
                </Field>
                
              )}
            />
            <div>
            {montazaState == 'da' ? 
              <p>Cena je:{ukupnaCenaKabine}€ sa montažom.</p> : 
              <p>Cena je :{ukupnaCenaKabine}€ bez montaže.</p>}
              {/* <p>CEna state:{ukupnaCenaKabine}</p> */}
              
            </div>
          </div>
          </FieldGroup>
          <div className='flex flex-row gap-2'>
            <Button type="submit" className="cursor-pointer">Napravi Nalog</Button>
            <Button type="button" className="cursor-pointer" variant="outline" onClick={() => form.reset()}>
              Resetuj
            </Button>
          </div>
          
        
        </form>
        <DevTool control={form.control}/>
       </> 
    )
}


function ModelKabine({fieldValue,image}) {
  //const map = modeliKabina.map((m) => m.value);
  //const map2 = modeliKabina.map((m) => m.image);
  //console.log("M JE:" + map)

  //const res = map.filter((f) => f.includes(fieldValue))
  
  

  return(
    <Suspense fallback={<Skeleton className="aspect-video w-full"/>}>
      <div>
        <Image src={`/${image}.jpg`} alt='image' width={500} height={500} className='rounded-2xl'/>
      </div>
    </Suspense>
  )
}

export default TusKabineNoviNalog
