'use client'

import { useFormContextCreateCourse } from './forms'
import { useFieldArray, Controller } from 'react-hook-form'
import React, { useEffect, useReducer, useState } from "react";
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
import { proizvodi,obrada,rupe, paspatuBoja, ramSifra, ramStaklo, uslugaProizvoda } from '@/lib/constants'; 
import { log } from 'console';
import { MyUploadButton } from '../uploadThingImage/MyUploadButton';
import Link from 'next/link';
import { UploadButton } from '@/lib/uploadthing/uploadthing';
import Image from 'next/image';
import { Textarea } from '../ui/textarea';
import { BookmarkIcon } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"


moment.locale('sr')
let date = moment();
let datum = date.format("MMMM DD YYYY")
let tacanDatum = date.format("MMMM DD YYYY").charAt(0).toLocaleUpperCase()+datum.slice(1)
let mesec = date.format("MMMM")
let tacanMesec = mesec.charAt(0).toLocaleUpperCase()+mesec.slice(1)
console.log("DATE JE search:",datum);



export const NoviNalog2 = ({klijenti} ) => {
  const [izabraniProizvod, setIzabraniProizvod] = useState({})
  const [izabranoImeProizvoda, setIzabranoImeProizvoda] = useState('')
  const [izabranaRupa, setIzabranaRupa] = useState('')
  const [selectKlijent, setSelectKlijent] = useState('');
  const [brojTelefona, setBrojTelefona] = useState(0);
  

  //@ts-ignore
  const objectInArray = proizvodi.filter(obj => {  //variable koji cuva podatke izabranog proizvoda
    return obj.value === izabraniProizvod 
  })

  console.log("M",objectInArray)

  const {
    register,
    setValue,
    formState: { errors },
    watch,
    control,
    resetField,
    handleSubmit,
  } = useFormContextCreateCourse()
  const formData = watch()
  //   console.log('formData', formData)
  //   console.log('errors', errors)

  //@ts-ignore
  const onSubmit = async (data) => {
      const res = await fetch("/api/nalozi", {
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
      
      toast('Uspešno napravljen nalog.')
      redirect(`/nalozi?query=${mesec}`)
      
  
      console.log("Form data: "+ JSON.stringify(data))
    }
    
    const [izabraniProizvodi, setIzabraniProizvodi] = useState({});

    const watchProizvod = watch('proizvod')
    const watchRam = watch('ram')
    const watchIme = watch('ime')

    const sviKlijentiBrojTelefona = klijenti.map((k) => k.telefon)
    
    const findBrojTelefona = klijenti.find((el) => el.ime === (watchIme || ''))
    

    console.log('sviKlijenti', findBrojTelefona);

    const noviArray = Object.values(izabraniProizvodi).map(
      //@ts-ignore
      ({ imeProizvoda, obradaProizvoda }) =>
        `${imeProizvoda}-${obradaProizvoda}`
    );

    const izabraniProizvodiArray = Object.values(izabraniProizvodi).map(
      (m) => m
    )

    const sveObrade = proizvodi.flatMap((p) => p.obrade ?? []);

    // Pronađi cenu za svaku vrednost
    const ceneProizvoda = noviArray.map((value) => {
      const pronadjenaObrada = sveObrade.find(
        (obrada) => obrada.value === value
      );

      return {
        value: value,
        cena: pronadjenaObrada?.cena ?? null,
      };
    });

    const a = noviArray.map((m) => m)
    const string = a.toString()
    const find = proizvodi.map((m) => m.obrade.find((element) => element.value === string))
    

    let sveCeneProizvoda = watchProizvod?.map((p) => p.cena) // sve cene proizvoda pr. [4300, 675]
    // let ukupneCeneProizvoda = sveCeneProizvoda?.reduce((accumulator, currentValue) => accumulator+currentValue,0);
    let ukupneCeneProizvoda = sveCeneProizvoda?.reduce((accumulator, currentValue) => (accumulator || 0) + (currentValue || 0),0)

    let sveCeneRamova = watchRam?.map((p) => p.cenaRama) // sve cene ramova pr. [4300, 675]
    let ukupneCeneRamova = sveCeneRamova?.reduce((accumulator, currentValue) => accumulator+currentValue,0);
    

    let ukupnoZaNaplatu = (ukupneCeneRamova || 0) + (ukupneCeneProizvoda || 0)
    
    console.log("watchIme", brojTelefona);

    

    const handleSelectKlijent = () => {
      if (selectKlijent === '') {
        setSelectKlijent('selektovan')
      }
      else {
        setSelectKlijent('')
        resetField('brojTelefona')
        resetField('ime')
      }
      //console.log('handleSelectKlijent', selectKlijent);
      
    }

    useEffect(() => {
      setValue('datum', datum)
      setValue('stanjeNaloga', 'nijeUradjen')
    },[])

    useEffect(() => {
      if (selectKlijent === 'selektovan') {
        setValue('brojTelefona',findBrojTelefona?.telefon )
      }
      else resetField('brojTelefona')

    }, [findBrojTelefona?.telefon != undefined]);

    useEffect(()=>{
      setValue("ukupnaCena", ukupnoZaNaplatu)  
        
    },[ukupnoZaNaplatu])

    // useEffect(() => {
    //   if (selectKlijent === '') {
    //     resetField('brojTelefona' )
    //   }

    // }, [findBrojTelefona?.telefon === undefined]);

    console.log('findBrojTelefona?.telefon', findBrojTelefona?.telefon);
    
    

  return (
    <Card className="max-w-[1650px] mx-auto">
        <CardHeader>
            <CardTitle>Napravi novi nalog</CardTitle>
                <CardDescription>
                Popuni podatke ispod
                </CardDescription>
        </CardHeader>
        <CardContent>
            <form
            id="form-rhf-input"
            className='space-y-3'
            onSubmit={handleSubmit(onSubmit)}
            >
            <FieldGroup className='flex md:flex-row flex-col md:gap-10 gap-2'>
                <Controller
                    name="ime"
                    rules={{
                    required: true,
                    }}
                    control={control}
                    render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        
                      
                      {selectKlijent === '' ? 
                      <div className='flex flex-col items-start gap-1.5'>
                        <FieldLabel htmlFor="form-rhf-input-ime">
                            Ime
                        </FieldLabel>
                        <FieldDescription>
                            Unesi ime i prezime kupca
                          </FieldDescription>
                        <Input
                        {...field}
                        id="form-rhf-input-ime"
                        aria-invalid={fieldState.invalid}
                        placeholder="Unesi neko ime"
                        autoComplete="ime"
                        type='text'
                        />
                      </div>
                        : 
                        <div className='flex flex-col items-start gap-1.5'>
                          <FieldLabel htmlFor="form-rhf-input-ime">
                            Ime/ Klijenta
                          </FieldLabel>
                          <FieldDescription>
                            Izaberi svog sačuvanog klijenta.
                          </FieldDescription>
                          <Select
                              name={field.name}
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                                <SelectTrigger className='w-full' aria-invalid={fieldState.invalid ? true : undefined}>
                                <SelectValue placeholder="Izaberi klijenta" />
                                </SelectTrigger>
                                <SelectContent>
                                {klijenti.map((p) => (
                                    <SelectItem key={p._id} value={p.ime} 
                                    >
                                    {p.ime}
                                    </SelectItem>
                                ))}
                                </SelectContent>
                          </Select>    
                        </div>
                      }
                      <Toggle className='cursor-pointer'
                      aria-label="Toggle bookmark" size="sm" variant="outline" onClick={handleSelectKlijent}>
                        <BookmarkIcon className="group-aria-pressed/toggle:fill-foreground" />
                        Izaberi klijenta
                      </Toggle>
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
                    control={control}
                    render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className='flex flex-col gap-1'>
                        <FieldLabel htmlFor="form-rhf-input-brojTelefona">
                        Broj telefona
                        </FieldLabel>
                        <FieldDescription>
                            Unesi broj telefona kupca.
                          </FieldDescription>
                        {selectKlijent === '' ? 
                          <Input
                          {...field}
                          id="form-rhf-input-brojTelefona"
                          aria-invalid={fieldState.invalid}
                          placeholder="Broj telefona"
                          autoComplete="brojTelefona"
                          type='number'
                          // onChange={(e) => (parseInt(e.target.value))}
                          />
                        : 
                        <Input
                          {...field}
                          id="form-rhf-input-brojTelefona"
                          aria-invalid={fieldState.invalid}
                          placeholder="Broj telefona"
                          autoComplete="brojTelefona"
                          type='number'
                          //defaultValue={findBrojTelefona?.telefon || 1}
                          //value={findBrojTelefona?.telefon || 1}
                          // onChange={(e) => {
                          //   field.onChange;
                          //   setValue('brojTelefona', field.value)
                          //   setBrojTelefona(parseInt(e.target.value))
                            
                          // }}
                          />
                        }
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
                control={control}
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
              <div>
                <Controller
                    name="ukupnaCena"
                    control={control}
                    render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className='flex flex-col gap-1'>
                        <FieldLabel htmlFor="form-rhf-input-ukupnaCena">
                        Ukupna cena
                        </FieldLabel>
                          <Input
                          {...field}
                          id="form-rhf-input-ukupnaCena"
                          aria-invalid={fieldState.invalid}
                          placeholder="Broj telefona"
                          autoComplete="ukupnaCena"
                          type='number'
                          value={ukupnoZaNaplatu}
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
              </div>
              <div className=''>
                <Controller
                  name="datum"
                  control={control}
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
                        value={datum}
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
                <Proizvod izabraniProizvodi={izabraniProizvodiArray} setIzabraniProizvodi={setIzabraniProizvodi}/>
            </FieldGroup>

            <FieldGroup>
              <Ram izabraniProizvodi={izabraniProizvodi} setIzabraniProizvodi={setIzabraniProizvodi}/>
            </FieldGroup>

            <h1 className='text-base'>
              Ukupna cena za naplatiti: <span className='text-xl font-medium'>{new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'RSD',
            }).format(ukupnoZaNaplatu)}</span>
            </h1>

            
            
            <div className='text-red-600 text-sm mt-1'>
                {/* Error: Course chapters */}
                {errors.proizvod?.message}
            </div>
            <Button
                className='px-4 py-2 bg-blue-600 rounded-lg text-white cursor-pointer'
                type='submit'
            >
                Napravi nalog
            </Button>
            </form>
            <DevTool control={control}/>
        </CardContent>
    </Card>
  )
}


// ---------------------------PROIZVOD ------------------------------------
//@ts-ignore
const Proizvod = ({izabraniProizvodi, setIzabraniProizvodi}) => {
  const {
    register,
    control,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useFormContextCreateCourse()

  const { append, remove, fields } = useFieldArray({
    name: 'proizvod',
    control,
  })

   

   const sveObrade = proizvodi.flatMap((p) => p.obrade ?? []);
    
    const rupeProizvoda = rupe.flatMap((p) => p ?? []);

    //@ts-ignore
    const cenaRupe = izabraniProizvodi.map(({fiRupe}) => {
      const pronadjenaRupa = rupeProizvoda.find(
        (rupa) => rupa.value === fiRupe
      );

      return {
        value: fiRupe,
        cena: pronadjenaRupa?.cena ?? null,
      };
    })

    
    
    //@ts-ignore
    const brojRupa = izabraniProizvodi.map(({brojRupa}) => brojRupa);
    //@ts-ignore
    const fiRupa = izabraniProizvodi.flatMap((p) => p.rupe ?? []); // drzi array u kojima su vrednosti svih rupa u formi

    const proizvodRupeForma = izabraniProizvodi.map((m) => m.rupe); // array of arrays, 0 : (2) [{…}, {…}] , 1 : [{…}], 

    const noviArray = Object.values(izabraniProizvodi).map(
      //@ts-ignore
      ({ imeProizvoda, obradaProizvoda }) =>
        `${imeProizvoda}-${obradaProizvoda}`
    );
    
    const izabraniProizvodiArray = Object.values(izabraniProizvodi)

    const testRupe = izabraniProizvodiArray[0]?.rupe?.map(({fiRupe, brojRupa}) => {
      const sveRupe = rupe.find(
        (r) => r.value === fiRupe
      )
      return {
        value: fiRupe,
        cena: sveRupe?.cena,
        brojRupa: brojRupa
      }
    })

    let testCenaRupa = testRupe?.map(({cena,brojRupa}) => cena * brojRupa)
    let sum = testCenaRupa?.reduce((accumulator, currentValue) => accumulator+currentValue,0);
    

    console.log("TEST", (izabraniProizvodi[0]?.duzinaProizvoda /100) * (izabraniProizvodi[0]?.sirinaProizvoda /100) * 2600);
    
    const proizvodWatch = watch("proizvod");
   
    const getUslugaProizvoda = function(index: number) {
      const proizvod = proizvodWatch[index].imeProizvoda;

      return `${proizvod}-${proizvodWatch[index].uslugaProizvoda}`
    }
    const sveUslugeProizvoda = proizvodi.flatMap((p) => p.uslugeProizvoda ?? []);
    const watchBrojProuizvoda = fields.map((_,index) => proizvodWatch[index].brojKomadaProizvoda)
    const watchDodatnoZaNaplatu = fields.map((_, index) => izabraniProizvodi[index]?.dodatnoZaNaplatuProizvod)

    function cenaProizvoda(index: number): number | undefined {
      const proizvod = izabraniProizvodi[index];
      const ceneProizvoda = noviArray.map((value) => {
        const pronadjenaObrada = sveObrade.find(
          (obrada) => obrada.value === value
        );
        
        return {
          value: value,
          cena: pronadjenaObrada?.cena ?? null,
        };
      });

       //rupeProizvoda return array of objects
      const rupeProizvoda = izabraniProizvodiArray[index]?.rupe?.map(({fiRupe, brojRupa}) => {
          const sveRupe = rupe.find(
            (r) => r.value === fiRupe
          )
          return {
            value: fiRupe,
            cena: sveRupe?.cena,
            brojRupa: brojRupa
          }
      }) 
      let ceneRupa = rupeProizvoda?.map(({cena,brojRupa}) => cena * brojRupa)
      let ukupnaCenaRupa = ceneRupa?.reduce((accumulator, currentValue) => accumulator+currentValue,0);

      const cenaObrade = ceneProizvoda[index]?.cena;
      const duzina = Number(proizvod?.duzinaProizvoda);
      const sirina = Number(proizvod?.sirinaProizvoda);

      //Usluga
      //@ts-ignore
      const usluga = sveUslugeProizvoda.find((element) => element.value === getUslugaProizvoda(index));
      let cenaUsluge = (duzina/100) * (sirina/100) * usluga?.cena

      console.log('cenaUsluge', cenaUsluge);
      

      //End Usluga

      if (
        !Number.isFinite(duzina) ||
        !Number.isFinite(sirina) ||
        cenaObrade == null ||
        !Number.isFinite(Number(cenaObrade)) ||
        !Number.isFinite(ukupnaCenaRupa ?? 0)
      ) {
        return undefined;
      }

      const cena =
        ((duzina / 100) * (sirina / 100) * Number(cenaObrade) +
        (ukupnaCenaRupa || 0) + (cenaUsluge || 0) + (watchDodatnoZaNaplatu[index] || 0)) * (watchBrojProuizvoda[index] || 1);

      return Number.isFinite(cena) ? Number(cena.toFixed(2)) : undefined;

    }

    const cenePoProizvodu = fields.map((_, index) => cenaProizvoda(index));
    const slikaProizvodaString2 = fields.map((_,index) => izabraniProizvodi[index]?.slikaProizvoda)
    const slikaProizvodaString = izabraniProizvodi[0]?.slikaProizvoda ?? '';

    

    useEffect(() => {
      cenePoProizvodu.forEach((cena, index) => {
        const cenaZaFormu = cena ?? Number.NaN;
        const poljeCene = `proizvod.${index}.cena` as const;

        if (!Object.is(getValues(poljeCene), cenaZaFormu)) {
          setValue(poljeCene, cenaZaFormu, { shouldValidate: true });
        }
        
      });
    }, [cenePoProizvodu, getValues, setValue]);

    
    useEffect(()=> {
      slikaProizvodaString2.forEach((slika,index) => {
        //const slikaJe = slika ?? '';
        const slikaString = `proizvod.${index}.slikaProizvoda` as const;
        setValue(slikaString, slikaProizvodaString)

      })
      
    },[slikaProizvodaString, setValue])


    //const watchProizvod = watch('proizvod')
    
    console.log("Izabrani Pr",slikaProizvodaString)

    
  return (
    <div className=' space-y-4 '>
      {/* Loop through chapter fields */}
      {/* <MyUploadButton /> */}
      
      {fields.map((proizvod, proizvodIndex) => {
        const cena = cenePoProizvodu[proizvodIndex] === undefined ? 0 : cenePoProizvodu[proizvodIndex];

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
            
            <FieldGroup className='flex flex-col'>
              <section className='flex flex-col'>
                <div className='flex flex-col gap-1'>
                  <FieldLabel>Slika za proizvod {proizvodIndex+1}: *</FieldLabel>
                  <FieldDescription>Nacrt za određeni proizvod</FieldDescription>
                </div>
                <UploadButton
                  // className="mt-4 flex flex-col w-full bg-amber-300 ut-button:bg-black ut-button:ut-readying:bg-red-500/50"
                  endpoint="imageUploader"
                  appearance={{
                    button:
                      "px-5 ut-ready:bg-green-500 ut-uploading:cursor-not-allowed rounded-r-none bg-red-500 bg-none after:bg-orange-400",
                    container: "w-max flex-row rounded-md border-cyan-300 bg-slate-800",
                    allowedContent:
                      "flex h-8 flex-col items-center justify-center px-2 text-white",
                  }}
                  onClientUploadComplete={(res : any) => {
                    //console.log("Files: ",  res[0]?.ufsUrl);
                    setIzabraniProizvodi((prev) => ({
                      ...prev,
                      [proizvodIndex]: {
                        // @ts-ignore
                        ...prev[proizvodIndex],
                        slikaProizvoda: res[0]?.ufsUrl,
                      },
                    }));
                    toast('Slika je učitana.')  
                    
                  }}
                  onUploadError={(error: Error) => {
                    toast('Slika nije učitana.')
                    alert(`ERROR! ${error.message}`);
                  }}
                />
                {izabraniProizvodi[proizvodIndex]?.slikaProizvoda ? 
                <Image src={izabraniProizvodi[proizvodIndex]?.slikaProizvoda ?? null} width={600} height={600} alt='ll'/>
                : null
                }
              </section>

              
            <section className='flex flex-col md:gap-5 gap-10'>
              <div className='flex md:flex-row flex-col md:gap-5 gap-3'>
                <Controller
                    control={control}
                    name={`proizvod.${proizvodIndex}.imeProizvoda`}
                    render={({ field, fieldState  }) => (
                      <>
                      
                        <div className="flex flex-col gap-2 w-full">
                          <FieldLabel htmlFor={`form-rhf-input-proizvod.${proizvodIndex}.imeProizvoda`}>
                              {`Proizvod ${proizvodIndex+1}`}
                          </FieldLabel>
                          <Select
                            name={field.name}
                            value={field.value}
                            onValueChange={(value) => {
                              // Ažurira React Hook Form
                              field.onChange(value);

                              // Čuva vrednost u posebnom state-u
                              setIzabraniProizvodi((prev) => ({
                                ...prev,
                                [proizvodIndex]: {
                                  // @ts-ignore
                                  ...prev[proizvodIndex],
                                  imeProizvoda: value,
                                },
                              }));
                            }}
                          >
                              <SelectTrigger className='w-full' aria-invalid={fieldState.invalid ? true : undefined}>
                              <SelectValue placeholder="Izaberi proizvod" />
                              </SelectTrigger>
                              <SelectContent>
                              {proizvodi.map((p) => (
                                  <SelectItem key={p.value} value={p.value} 
                                  >
                                  {p.label}
                                  </SelectItem>
                              ))}
                              </SelectContent>
                          </Select>               
                        </div>
                      </>
                      
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
                          name={field.name}
                          value={field.value}
                          onValueChange={(value) => {
                            field.onChange(value);

                            setIzabraniProizvodi((prev) => ({
                              ...prev,
                              [proizvodIndex]: {
                                // @ts-ignore
                                ...prev[proizvodIndex],
                                obradaProizvoda: value,
                              },
                            }));
                          }}
                        >
                        <SelectTrigger className='w-full' aria-invalid={fieldState.invalid ? true : undefined}>
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
                <Controller
                    control={control}
                    name={`proizvod.${proizvodIndex}.uslugaProizvoda`}
                    render={({ field, fieldState  }) => (
                        <div className="flex flex-col gap-2 w-full">
                        <FieldLabel htmlFor={`form-rhf-input-proizvod.${proizvodIndex}-uslugaProizvoda`}>
                            {`Usluga za ${proizvodIndex+1}. proizvod`}
                        </FieldLabel>
                        <Select
                          name={field.name}
                          value={field.value}
                          onValueChange={(value) => {
                            field.onChange(value);

                            setIzabraniProizvodi((prev) => ({
                              ...prev,
                              [proizvodIndex]: {
                                // @ts-ignore
                                ...prev[proizvodIndex],
                                uslugaProizvoda: value,
                              },
                            }));
                          }}
                        >
                        <SelectTrigger className='w-full' aria-invalid={fieldState.invalid ? true : undefined}>
                            <SelectValue placeholder="Izaberi obradu." />
                        </SelectTrigger>
                        <SelectContent>
                        {uslugaProizvoda.map((o) => (
                          <SelectItem key={o.value} value={o.value}>
                            {o.label}
                          </SelectItem>  
                        ))}
                        </SelectContent>
                      </Select>
                        </div>
                )}/>
              </div>
              <div className='flex md:flex-row flex-col gap-5'>
                <Controller
                    control={control}
                    name={`proizvod.${proizvodIndex}.sirinaProizvoda`}
                    render={({ field, fieldState  }) => (
                        <Field data-invalid={fieldState.invalid} className='md:gap-3 gap-1'>
                        <FieldLabel htmlFor="form-rhf-input-proizvod-sirinaProizvoda">
                                {`Širina za ${proizvodIndex+1} proizvod`}
                        </FieldLabel>
                        <Input
                            {...field}
                            id="form-rhf-input-proizvod-sirinaProizvoda"
                            aria-invalid={fieldState.invalid}
                            placeholder="Unesi širinu"
                            autoComplete="sirina"
                            type="number"
                            onChange={(e) => {
                              field.onChange(e.target.value);

                              setIzabraniProizvodi((prev) => ({
                                ...prev,
                                [proizvodIndex]: {
                                  ...prev[proizvodIndex],
                                  sirinaProizvoda: parseInt(e.target.value)
                                }
                              }))
                            }}
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
                        <Field data-invalid={fieldState.invalid} className='md:gap-3 gap-1'>
                        <FieldLabel htmlFor="form-rhf-input-proizvod-duzinaProizvoda">
                                {`Dužina za ${proizvodIndex+1} proizvod`}
                        </FieldLabel>
                        <Input
                            {...field}
                            id="form-rhf-input-proizvod-duzinaProizvoda"
                            aria-invalid={fieldState.invalid}
                            placeholder="Unesi duzinu"
                            autoComplete="duzina"
                            type="number"
                            onChange={(e) => {
                              field.onChange(e.target.value);

                              setIzabraniProizvodi((prev) => ({
                                ...prev,
                                [proizvodIndex]: {
                                  ...prev[proizvodIndex],
                                  duzinaProizvoda: parseInt(e.target.value)
                                }
                              }))
                            }}
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
                    name={`proizvod.${proizvodIndex}.brojKomadaProizvoda`}
                    render={({ field, fieldState  }) => (
                        <Field data-invalid={fieldState.invalid} className='md:gap-3 gap-1'>
                        <FieldLabel htmlFor="form-rhf-input-proizvod-brojKomadaProizvoda">
                                {`Unesi broj komada za proizvod ${proizvodIndex+1}: `}
                        </FieldLabel>
                        <Input
                            {...field}
                            id="form-rhf-input-proizvod-brojKomadaProizvoda"
                            aria-invalid={fieldState.invalid}
                            placeholder="Unesi broj komada"
                            autoComplete="duzina"
                            type="number"
                            onChange={(e) => {
                              field.onChange(e.target.value);

                              setIzabraniProizvodi((prev) => ({
                                ...prev,
                                [proizvodIndex]: {
                                  ...prev[proizvodIndex],
                                  brojKomadaProizvoda: parseInt(e.target.value)
                                }
                              }))
                            }}
                            />
                        <FieldDescription>
                            Unesi broj komada.
                            </FieldDescription>
                            {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                        </Field>
                )}/>
              </div>
            </section>

            {/* Slika proizvoda contoler hidden je */}
            <section className='hidden'>            
                <Controller
                    control={control}
                    name={`proizvod.${proizvodIndex}.slikaProizvoda`}
                    render={({ field, fieldState  }) => (
                        <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-input-proizvod-slikaProizvoda">
                                {`slikaProizvoda za ${proizvodIndex+1} proizvod`}
                        </FieldLabel>
                        <Input
                            {...field}
                            id="form-rhf-input-proizvod-slikaProizvoda"
                            aria-invalid={fieldState.invalid}
                            placeholder="Unesi duzinu"
                            autoComplete="slikaProizvoda"
                            readOnly
                            type="text"
                            value={izabraniProizvodi[proizvodIndex]?.slikaProizvoda || '/fdsfsd'}
                            />
                        <FieldDescription>
                            Slika kao string
                            </FieldDescription>
                            {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                        </Field>
                )}/>
            </section>
            {/* END Slika proizvoda contoler hidden je */}
                
            <section>
                  <div>
                  <div className='flex flex-col gap-5'>
                    <Controller
                    control={control}
                    name={`proizvod.${proizvodIndex}.napomenaProizvoda`}
                    render={({ field, fieldState  }) => (
                      
                        <div className="flex flex-col gap-2 w-full">
                        <FieldLabel htmlFor={`form-rhf-input-proizvod.${proizvodIndex}.napomenaProizvoda`}>
                            {`Napomena za proizvod ${proizvodIndex+1 }`}
                        </FieldLabel>
                        <FieldDescription>
                          Upišite napomene ispod.
                        </FieldDescription>
                        <Textarea
                            {...field}
                            id="form-rhf-input-proizvod-napomenaProizvoda"
                            aria-invalid={fieldState.invalid}
                            placeholder="..."
                            autoComplete="napomenaProizvoda" 
                        />
                        </div>
                    )}/>

                    <Controller
                    control={control}
                    name={`proizvod.${proizvodIndex}.dodatnoZaNaplatuProizvod`}
                    render={({ field, fieldState  }) => (
                      
                        <div className="flex flex-col gap-2 w-full">
                        <FieldLabel htmlFor={`form-rhf-input-proizvod.${proizvodIndex}.dodatnoZaNaplatuProizvod`}>
                            {`Dodatna cena za Proizvod ${proizvodIndex+1 }`}
                        </FieldLabel>
                        <FieldDescription>
                          Upišite iznos za dodatnu cenu.
                        </FieldDescription>
                        <Input
                            {...field}
                            id="form-rhf-input-proizvod-dodatnoZaNaplatuProizvod"
                            aria-invalid={fieldState.invalid}
                            placeholder="Iznos u RSD"
                            autoComplete="dodatnoZaNaplatuProizvod"
                            type='number'
                            onChange={(e) => {
                              field.onChange(e.target.value);

                              setIzabraniProizvodi((prev) => ({
                                ...prev,
                                [proizvodIndex]: {
                                  ...prev[proizvodIndex],
                                  dodatnoZaNaplatuProizvod: parseInt(e.target.value)
                                }
                              }))
                            }}
                        />
                        </div>
                    )}/>
                    {watchDodatnoZaNaplatu[proizvodIndex] != 0 || undefined ? 
                      <Controller
                      control={control}
                      name={`proizvod.${proizvodIndex}.napomenaZaDodatnuCenuProizvoda`}
                      render={({ field, fieldState  }) => (
                        
                          <div className="flex flex-col gap-2 w-full">
                          <FieldLabel htmlFor={`form-rhf-input-proizvod.${proizvodIndex}.napomenaZaDodatnuCenuProizvoda`}>
                              {`Napomena dodatne cene za proizvod ${proizvodIndex+1 }`}
                          </FieldLabel>
                          <FieldDescription>
                            Ovde upišite razlog dodatne cene za određeni proizvod.
                          </FieldDescription>
                          <Textarea
                              {...field}
                              id="form-rhf-input-proizvod-napomenaZaDodatnuCenuProizvoda"
                              aria-invalid={fieldState.invalid}
                              placeholder="..."
                              autoComplete="napomenaZaDodatnuCenuProizvoda" 
                          />
                          </div>
                      )}/>
                    : null}
                    
                  </div>
                  <h1 className='md:mt-0 mt-5'>
                    Cena proizvoda {proizvodIndex+1}: <span className='text-xl font-medium'>{cena == null
                      ? ''
                      : new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'RSD',
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }).format(cena)}</span>
                  </h1>
                  <div className='hidden'>
                    <Controller
                      name={`proizvod.${proizvodIndex}.cena`}
                      control={control}
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
                            type="number"
                            readOnly
                            className=''
                            value={cena}
                          />
                          {/* {setCenaState(field.value)} */}
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                          
                        </Field>
                        
                      )}
                    />
                  </div>
                  
                </div>
            </section>
                
                {/* <p>Imes:{izabraniProizvodi[proizvodIndex].imeProizvoda}</p> */}
                
                {/* {izabraniProizvodi[proizvodIndex].map((m,proizvodIndex) => {
                  return (
                    <div key={proizvodIndex}>
                      {m.ImeProizvoda}
                    </div>
                  )
                })} */}

                
            </FieldGroup>
            <ManageNotes proizvodIndex={proizvodIndex} setIzabraniProizvodi={setIzabraniProizvodi} izabraniProizvodi={izabraniProizvodi}/>
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
          append({ rupe: [], imeProizvoda: '', duzinaProizvoda:0, obradaProizvoda:'',
            sirinaProizvoda:0, cena: 0, slikaProizvoda: '', uslugaProizvoda: '', 
            brojKomadaProizvoda: 1, napomenaProizvoda: '', dodatnoZaNaplatuProizvod: 0,
            napomenaZaDodatnuCenuProizvoda: '' })
          
        }}
        className=' text-white text-center w-full py-5 cursor-pointer rounded-3xl'
      >
        Dodaj Proizvod
      </Button>

      
    </div>
  )
}

//@ts-ignore
const ManageNotes = ({ proizvodIndex,setIzabraniProizvodi,izabraniProizvodi }: { proizvodIndex: number }) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContextCreateCourse()

  //@ts-ignore
const azurirajRupu = (proizvodIndex, rupaIndex, promene) => {
  setIzabraniProizvodi((prev) => {
    const proizvod = prev[proizvodIndex] ?? {};
    // Kopiramo postojeće rupe
    //const rupe = [...(proizvod.rupe ?? [])];
    const rupe = [...(proizvod.rupe || [])];

    // Ažuriramo samo izabranu rupu
    rupe[rupaIndex] = {
      fiRupe: "",
      brojRupa: 0,
      ...rupe[rupaIndex],
      ...promene,
    };

    return {
      ...prev,
      [proizvodIndex]: {
        ...proizvod,
        rupe,
      },
    };
  });
};

  

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
                <h1 className='mb-2 font-semibold text-base'>
                  Rupe {rupaIndex+1} za proizvod {proizvodIndex+1}
                </h1>
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
              <FieldGroup className='flex md:flex-row flex-col items-start gap-3.5 md:gap-8'>
                <Controller
                    control={control}
                    name={`proizvod.${proizvodIndex}.rupe.${rupaIndex}.fiRupe`}
                    render={({ field, fieldState  }) => (
                    <div className="flex flex-col md:gap-3 gap-1 w-full md:mt-0 mt-2">
                    <FieldLabel htmlFor="form-rhf-input-proizvod-brojRupaProizvoda">
                            {`Fi rupe ${rupaIndex+1}`}
                      </FieldLabel>
                    <Select
                        name = {field.name}
                        value={field.value}
                        //onValueChange={field.onChange}
                        onValueChange={(value) => {
                        field.onChange(value);

                        azurirajRupu(proizvodIndex, rupaIndex, {
                          fiRupe: value,
                        });
                      }}
                    >
                      <SelectTrigger className='w-full' aria-invalid={fieldState.invalid ? true : undefined}>
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
                    <Field data-invalid={fieldState.invalid} className="flex flex-col md:gap-3 gap-1 w-full md:mt-0 mt-2">
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
                            onChange={(e) => {
                            const value = Number(e.target.value);

                            field.onChange(value);

                            azurirajRupu(proizvodIndex, rupaIndex, {
                              brojRupa: value,
                            });
                          }}
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



const Ram = ({izabraniProizvodi, setIzabraniProizvodi}) => {
  const {
    register,
    control,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContextCreateCourse()

  const { append, remove, fields } = useFieldArray({
    name: "ram",
    control,
  })

  //Izracunavanje cene za ram
  const watchRam = watch('ram'); // array of objects
  const cenaStakla = watchRam && watchRam?.map((value) => { // array of objects
    const r = ramStaklo.flatMap(({obrade}) => obrade)
    const cenaR = r.find((element) => 
      element.value === value.staklo
    )

    return {
      value: value.staklo,
      cena: cenaR?.cena
    }
  })
  const cenaRama = watchRam && watchRam?.map((value) => { // array of objects
    const r = ramSifra.find((el) => el.value === value.sifraRama)

    return {
      value: value.sifraRama,
      cena: r?.cena
    }
  })
  const cenaPaspatua = watchRam && watchRam?.map((value) => { // array of objects
    const r = paspatuBoja.find((el) => el.value === value.paspatuBoja)

    return {
      value: value.paspatuBoja,
      cena: r?.cena
    }
  })

  const watchDodatnaCenaRama = fields.map((_,index) => izabraniProizvodi[index]?.dodatnaCena)
  const watchBrojRamova = fields.map((_,index) => watchRam[index]?.brojKomadaRamova)

  function getCenaRama(index: number) {
    const ukupnaCenaRama = Number((((watchRam[index]?.sirina / 100) + (watchRam[index]?.duzina / 100)) * 2) * cenaRama[index]?.cena);
    const ukupnaCenaStakla = (((watchRam[index]?.sirina / 100) * (watchRam[index]?.duzina / 100)) * cenaStakla[index]?.cena) ;
    const ukupnaCenaPaspatua = (((watchRam[index]?.sirina / 100) * (watchRam[index]?.duzina / 100)) * cenaPaspatua[index]?.cena) ;


    const cena = ((ukupnaCenaRama + ukupnaCenaStakla + (ukupnaCenaPaspatua ? ukupnaCenaPaspatua : 0))  + (watchDodatnaCenaRama[index] ? watchDodatnaCenaRama[index] : 0)) * watchBrojRamova[index]

    
    return (cena ? cena  : 0) 
  }

  const cenaPoRamu = fields.map((_,index) => getCenaRama(index))
  
  console.log("CENA RAMAL:");
  
  

  useEffect(() => {
      cenaPoRamu.forEach((cena, index) => {
        const cenaZaFormu = cena ?? Number.NaN;
        const poljeCene = `ram.${index}.cenaRama` as const;

        if (!Object.is(getValues(poljeCene), cenaZaFormu)) {
          setValue(poljeCene, cenaZaFormu, { shouldValidate: true });
        }
      });
    }, [cenaPoRamu, getValues, setValue]);


  console.log("izabrani", watchBrojRamova[0]);
  
  
  return(
    <div className=' space-y-4 '>
      {fields.map((ram, ramIndex) => {
        const cena = cenaPoRamu[ramIndex]
        return (
          <div
            className='p-6  shadow-lg rounded-lg space-y-3'
            key={ram.id}
          >
            <div className='flex justify-between'>
              <div className='text-lg mb-2 font-semibold'>Ram {ramIndex+1}</div>{' '}
              <Button
                type='button'
                onClick={() => {
                  // Remove: chapter index
                  remove(ramIndex)
                }}
                className='text-red-400 text-xs cursor-pointer bg-amber-100'
              >
                Izbriši ram
              </Button>
            </div>


            <FieldGroup className='flex flex-col'>
              {/* <h1>CENA: {getCenaRama(ramIndex)}</h1> */}
              <section className='flex md:flex-row flex-col justify-between w-full md:gap-5 gap-4'>
                <Controller
                    control={control}
                    name={`ram.${ramIndex}.staklo`}
                    render={({ field, fieldState  }) => (
                      
                        <div className="flex flex-col gap-2 w-full">
                        <FieldLabel htmlFor={`form-rhf-input-ram.${ramIndex}.staklo`}>
                            {`Staklo/Ogledalo za ram ${ramIndex+1}`}
                        </FieldLabel>
                        
                        <Select
                          name={field.name}
                          value={field.value}
                          onValueChange={(value) => {
                            // Ažurira React Hook Form
                            field.onChange(value);

                            // Čuva vrednost u posebnom state-u
                            setIzabraniProizvodi((prev) => ({
                              ...prev,
                              [ramIndex]: {
                                // @ts-ignore
                                ...prev[ramIndex],
                                staklo: value,
                              },
                            }));
                          }}
                        >
                            <SelectTrigger className='w-full' aria-invalid={fieldState.invalid ? true : undefined}>
                            <SelectValue placeholder="Izaberi staklo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value='auto'>
                                Auto
                              </SelectItem>
                            {ramStaklo.map((p) => (
                                <SelectItem key={p.value} value={p.value} 
                                >
                                {p.label}
                                </SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                        <FieldDescription>
                          Izaberi debljinu i vrstu stakla ili ogledala za ram.
                        </FieldDescription>
                        </div>
                )}/>
                <Controller
                    control={control}
                    name={`ram.${ramIndex}.sifraRama`}
                    render={({ field, fieldState  }) => (
                      
                        <div className="flex flex-col gap-2 w-full">
                        <FieldLabel htmlFor={`form-rhf-input-ram.${ramIndex}.sifraRama`}>
                            {`Sifra rama ${ramIndex+1}: `}
                        </FieldLabel>
                        
                        <Select
                          name={field.name}
                          value={field.value}
                          onValueChange={(value) => {
                            // Ažurira React Hook Form
                            field.onChange(value);

                            // Čuva vrednost u posebnom state-u
                            setIzabraniProizvodi((prev) => ({
                              ...prev,
                              [ramIndex]: {
                                // @ts-ignore
                                ...prev[ramIndex],
                                sifraRama: value,
                              },
                            }));
                          }}
                        >
                            <SelectTrigger className='w-full' aria-invalid={fieldState.invalid ? true : undefined}>
                            <SelectValue placeholder="Izaberi sifru rama" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value='auto'>
                                Auto
                              </SelectItem>
                            {ramSifra.map((p) => (
                                <SelectItem key={p.value} value={p.value} 
                                >
                                {p.label}
                                </SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                        <FieldDescription>
                          Izaberi šifru rama.
                        </FieldDescription>
                        </div>
                )}/>
              </section>

              <section className='flex md:flex-row flex-col justify-between w-full md:gap-5 gap-4'>
                <Controller
                    control={control}
                    name={`ram.${ramIndex}.sirina`}
                    render={({ field, fieldState  }) => (
                      
                        <div className="flex flex-col gap-2 w-full">
                        <FieldLabel htmlFor={`form-rhf-input-ram.${ramIndex}.sirina`}>
                            {`Širina rama ${ramIndex+1}: `}
                        </FieldLabel>
                        <Input
                            {...field}
                            id="form-rhf-input-ram-sirina"
                            aria-invalid={fieldState.invalid}
                            placeholder="Unesi širinu rama"
                            autoComplete="sirina"
                            type="number"
                            onChange={(e) => {
                              field.onChange(e.target.value);

                              setIzabraniProizvodi((prev) => ({
                                ...prev,
                                [ramIndex]: {
                                  ...prev[ramIndex],
                                  sirina: parseInt(e.target.value)
                                }
                              }))
                            }}
                            />
                        <FieldDescription>
                          Unesi u centimetrima.
                        </FieldDescription>
                        </div>
                )}/>
                <Controller
                    control={control}
                    name={`ram.${ramIndex}.duzina`}
                    render={({ field, fieldState  }) => (
                      
                        <div className="flex flex-col gap-2 w-full">
                        <FieldLabel htmlFor={`form-rhf-input-ram.${ramIndex}.duzina`}>
                            {`Dužina rama ${ramIndex+1}:`}
                        </FieldLabel>
                        <Input
                            {...field}
                            id="form-rhf-input-ram-duzina"
                            aria-invalid={fieldState.invalid}
                            placeholder="Unesi širinu rama"
                            autoComplete="duzina"
                            type="number"
                            onChange={(e) => {
                              field.onChange(e.target.value);

                              setIzabraniProizvodi((prev) => ({
                                ...prev,
                                [ramIndex]: {
                                  ...prev[ramIndex],
                                  duzina: parseInt(e.target.value)
                                }
                              }))
                            }}
                            />
                        <FieldDescription>
                          Unesi u centimetrima.
                        </FieldDescription>
                        </div>
                )}/>
                <Controller
                    control={control}
                    name={`ram.${ramIndex}.brojKomadaRamova`}
                    render={({ field, fieldState  }) => (
                      
                        <div className="flex flex-col gap-2 w-full">
                        <FieldLabel htmlFor={`form-rhf-input-ram.${ramIndex}.brojKomadaRamova`}>
                            {`Broj komada ramova:`}
                        </FieldLabel>
                        <Input
                            {...field}
                            id="form-rhf-input-ram-brojKomadaRamova"
                            aria-invalid={fieldState.invalid}
                            placeholder="Unesi količinu ramova"
                            autoComplete="brojKomadaRamova"
                            type="number"
                            onChange={(e) => {
                              field.onChange(parseInt(e.target.value));

                              setIzabraniProizvodi((prev) => ({
                                ...prev,
                                [ramIndex]: {
                                  ...prev[ramIndex],
                                  brojKomadaRamova: parseInt(e.target.value)
                                }
                              }))
                            }}
                            />
                        <FieldDescription>
                          Unesi u centimetrima.
                        </FieldDescription>
                        
                        </div>
                )}/>
              </section>
                
                {watchRam[ramIndex]?.staklo === 'flot2mm-seceno' ? 
                <Controller
                    control={control}
                    name={`ram.${ramIndex}.paspatuBoja`}
                    render={({ field, fieldState  }) => (
                      
                        <div className="flex flex-col gap-2 w-full">
                        <FieldLabel htmlFor={`form-rhf-input-ram.${ramIndex}.paspatuBoja`}>
                            {`Paspatu Boja za ram ${ramIndex+1}: `}
                        </FieldLabel>
                        <Select
                          name={field.name}
                          value={field.value}
                          onValueChange={(value) => {
                            // Ažurira React Hook Form
                            field.onChange(value);

                            // Čuva vrednost u posebnom state-u
                            setIzabraniProizvodi((prev) => ({
                              ...prev,
                              [ramIndex]: {
                                // @ts-ignore
                                ...prev[ramIndex],
                                paspatuBoja: value,
                              },
                            }));
                          }}
                        >
                            <SelectTrigger aria-invalid={fieldState.invalid ? true : undefined} className='w-full'>
                            <SelectValue placeholder="Izaberi paspatu Boju" />
                            </SelectTrigger>
                            <SelectContent>
                            {paspatuBoja.map((p) => (
                                <SelectItem key={p.value} value={p.value} 
                                >
                                {p.label}
                                </SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                        
                        </div>
                  )}/>
              : watchRam[ramIndex]?.staklo === 'antirefleks2mm' ? 
            <Controller
                    control={control}
                    name={`ram.${ramIndex}.paspatuBoja`}
                    render={({ field, fieldState  }) => (
                      
                        <div className="flex flex-col gap-2 w-full">
                        <FieldLabel htmlFor={`form-rhf-input-ram.${ramIndex}.paspatuBoja`}>
                            {`Paspatu Boja za ram ${ramIndex+1}: `}
                        </FieldLabel>
                        <Select
                          name={field.name}
                          value={field.value}
                          onValueChange={(value) => {
                            // Ažurira React Hook Form
                            field.onChange(value);

                            // Čuva vrednost u posebnom state-u
                            setIzabraniProizvodi((prev) => ({
                              ...prev,
                              [ramIndex]: {
                                // @ts-ignore
                                ...prev[ramIndex],
                                paspatuBoja: value,
                              },
                            }));
                          }}
                        >
                            <SelectTrigger aria-invalid={fieldState.invalid ? true : undefined}>
                            <SelectValue placeholder="Izaberi paspatu Boju" />
                            </SelectTrigger>
                            <SelectContent>
                            {paspatuBoja.map((p) => (
                                <SelectItem key={p.value} value={p.value} 
                                >
                                {p.label}
                                </SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                        
                        </div>
                  )}/> : null}
                
               
                {/* <Controller
                    control={control}
                    name={`ram.${ramIndex}.paspatuCena`}
                    render={({ field, fieldState  }) => (
                      
                        <div className="flex flex-col gap-2 w-full">
                        <FieldLabel htmlFor={`form-rhf-input-ram.${ramIndex}.paspatuCena`}>
                            {`Paspatu cena za ram ${ramIndex+1}:`}
                        </FieldLabel>
                        <Input
                            {...field}
                            id="form-rhf-input-ram-paspatuCena"
                            aria-invalid={fieldState.invalid}
                            placeholder="Unesi paspatu Cena"
                            autoComplete="paspatuCena"
                            type="number"
                            onChange={(e) => {
                              field.onChange(e.target.value);

                              setIzabraniProizvodi((prev) => ({
                                ...prev,
                                [ramIndex]: {
                                  ...prev[ramIndex],
                                  paspatuCena: parseInt(e.target.value)
                                }
                              }))
                            }}
                            />
                        
                        
                        </div>
                )}/> */}
                <Controller
                    control={control}
                    name={`ram.${ramIndex}.napomena`}
                    render={({ field, fieldState  }) => (
                      
                        <div className="flex flex-col gap-2 w-full">
                        <FieldLabel htmlFor={`form-rhf-input-ram.${ramIndex}.napomena`}>
                            {`Napomena:`}
                        </FieldLabel>
                        <Textarea
                            {...field}
                            id="form-rhf-input-ram-napomena"
                            aria-invalid={fieldState.invalid}
                            placeholder={`Unesi napomenu za ram #${ramIndex+1}`}
                            autoComplete="napomena"
                            onChange={(e) => {
                              field.onChange(e.target.value);

                              setIzabraniProizvodi((prev) => ({
                                ...prev,
                                [ramIndex]: {
                                  ...prev[ramIndex],
                                  napomena: parseInt(e.target.value)
                                }
                              }))
                            }}
                  />
                        </div>
                )}/>
                 <Controller
                    control={control}
                    name={`ram.${ramIndex}.dodatnaCena`}
                    render={({ field, fieldState  }) => (
                      
                        <div className="flex flex-col gap-2 w-full">
                        <FieldLabel htmlFor={`form-rhf-input-ram.${ramIndex}.dodatnaCena`}>
                            {`Dodatna cena za ram ${ramIndex+1}: `}
                        </FieldLabel>
                        
                        <Input
                            {...field}
                            id="form-rhf-input-ram-dodatnaCena"
                            aria-invalid={fieldState.invalid}
                            placeholder="Unesi paspatu Cena"
                            autoComplete="dodatnaCena"
                            type="number"
                            onChange={(e) => {
                              field.onChange(e.target.value);

                              setIzabraniProizvodi((prev) => ({
                                ...prev,
                                [ramIndex]: {
                                  ...prev[ramIndex],
                                  dodatnaCena: parseInt(e.target.value)
                                }
                              }))
                            }}
                  />
                        <FieldDescription>
                          Ukoliko imate dodatnih troškova za naplatiti unesite ovde.
                        </FieldDescription>
                        </div>
                )}/>
                {watchDodatnaCenaRama[ramIndex] !=0 || undefined ? 
              
                <Controller
                    control={control}
                    name={`ram.${ramIndex}.dodatnaCenaNapomena`}
                    render={({ field, fieldState  }) => (
                      
                        <div className="flex flex-col gap-2 w-full">
                        <FieldLabel htmlFor={`form-rhf-input-ram.${ramIndex}.dodatnaCenaNapomena`}>
                            {`Dodatna cena napomena za ram ${ramIndex+1 }`}
                        </FieldLabel>
                        <Textarea
                            {...field}
                            id="form-rhf-input-ram-dodatnaCenaNapomena"
                            aria-invalid={fieldState.invalid}
                            placeholder="..."
                            autoComplete="dodatnaCenaNapomena"
                            onChange={(e) => {
                              field.onChange(e.target.value);

                              setIzabraniProizvodi((prev) => ({
                                ...prev,
                                [ramIndex]: {
                                  ...prev[ramIndex],
                                  dodatnaCenaNapomena: parseInt(e.target.value)
                                }
                              }))
                            }}
                        />
                        <FieldDescription>
                          Ukoliko imate dodatnih troškova za naplatiti unesite ovde.
                        </FieldDescription>
                        </div>
                )}/>
                : null}
                <div className='hidden'>
                <Controller
                    name={`ram.${ramIndex}.cenaRama`}
                    control={control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-cenaRama" className='hidden'>
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
                          type="number"
                          readOnly
                          className=''
                          //value={cena ?? 0}
                          value={cena ?? 0}
                        />
                        {/* {setCenaState(field.value)} */}
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                        
                      </Field>
                      
                    )}
                  />
                </div>
                <div>
                  <h1>
                    Cena rama {ramIndex+1}: <span className='text-xl font-medium'>{cena == null
                      ? ''
                      : new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'RSD',
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }).format(getCenaRama(ramIndex))}</span>
                  </h1>
                </div>
                
            </FieldGroup>

            </div>
          )
        })}
            <Button
              type='button'
              onClick={() => {
                // Append: notes
                append({ staklo: '', sifraRama: '', sirina: 0, duzina: 0, brojKomadaRamova: 1, paspatuBoja: 'nema',
                 napomena: '', dodatnaCena: 0, dodatnaCenaNapomena: '', cenaRama: 0
                })
                
              }}
              className=' text-white text-center w-full py-5 cursor-pointer rounded-3xl'
            >
              Dodaj Ram
            </Button>

    </div>
  )
}
