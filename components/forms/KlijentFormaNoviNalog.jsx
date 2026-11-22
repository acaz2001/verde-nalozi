'use client'
import React from 'react'
import { useForm, Controller, useFieldArray } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from '../ui/button';
import { toast } from "sonner"
import { redirect } from 'next/navigation'
import { DevTool } from '@hookform/devtools';

const items = [
  { label: "Fizičko lice", value: "fizickoLice" },
  { label: "Firma", value: "firma" }
]

function KlijentFormaNoviNalog() {
const form = useForm({
    //resolver: zodResolver(formSchema),
    defaultValues: {
        ime: '',
        telefon: undefined,
        vrstaNaloga: '',
        pibFirme: undefined,
        adresaFirme: ''
        //nalozi: {}
    },
    })

  let watchVrstaNaloga =  form.watch('vrstaNaloga')  
  console.log('watchVrstaNaloga', watchVrstaNaloga);
  


    const onSubmit = async (data) => {
      
      const res = await fetch("api/novi-klijent", {
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
      toast("Novi klijent uspesno kreiran.", { position: "bottom-right" });
      //revalidatePath('/tus-kabine-nalozi')
      redirect(`/klijenti`)
      //form.reset()
      //console.log("DATAS JE:" + obj)
    }

  return (
    <div className='max-w-[1650px] mx-auto'>
      <Card className="w-full">
        <CardHeader>
            <CardTitle>Novi klijent.</CardTitle>
            <CardDescription>Popuni podatke ispod</CardDescription>
        </CardHeader>
        <CardContent>
            <form
            id="form-rhf-input"
            className='space-y-3'
            onSubmit={form.handleSubmit(onSubmit)}
            >
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
                            type="text"
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
                            required
                            type="number"
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
                      name="vrstaNaloga"
                      control={form.control}
                      render={({ field, fieldState }) => (
                      
                        <Field
                          data-invalid={fieldState.invalid}
                        >
                          <FieldContent>
                            <FieldLabel htmlFor="form-rhf-select-vrstaNaloga">
                              Vrsta klijenta:
                            </FieldLabel>
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </FieldContent>
                          <Select
                            name={field.name}
                            value={field.value}
                            onValueChange = {field.onChange}
                            required
                            //onValueChange={(value) => {setSelectedValue1(String(value))}}
                            // defaultValue="v01"
                          >
                            <SelectTrigger
                              id="form-rhf-select-vrstaNaloga"
                              aria-invalid={fieldState.invalid}
                              className="min-w-[120px]"
                            >
                              <SelectValue placeholder="Izaberi" />
                            </SelectTrigger>
                            <SelectContent position="item-aligned">
                              <SelectSeparator />
                              {items.map((model) => (
                                <SelectItem key={model.value} value={model.value} >
                                  {model.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </Field>
                        
                      )}
                    />
                    {watchVrstaNaloga === 'firma' ?                
                      <Controller
                          name="pibFirme"
                          control={form.control}
                          render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor="form-rhf-input-pibFirme">
                              Pib firme
                              </FieldLabel>
                              <Input
                              {...field}
                              id="form-rhf-input-pibFirme"
                              aria-invalid={fieldState.invalid}
                              placeholder="Unesi pib firme"
                              autoComplete="pibFirme"
                              type="number"
                              />
                              <FieldDescription>
                              
                              </FieldDescription>
                              {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                              )}
                          </Field>
                          )}
                      />
                    : null}
                    {watchVrstaNaloga === 'firma' ? 
                    <Controller
                        name="adresaFirme"
                        control={form.control}
                        render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-rhf-adresaFirme">
                            Adresa Firme
                            </FieldLabel>
                            <Input
                            {...field}
                            id="form-rhf-adresaFirme"
                            aria-invalid={fieldState.invalid}
                            placeholder="Unesi adresu firme:"
                            autoComplete="off"
                            type="text"
                            />
                            {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                        )}
                    />
                    : null}
                </FieldGroup>
                <Button type='submit'>Napravi klijenta</Button>
            </form>
            <DevTool control={form.control}/>
        </CardContent>
      </Card>
    </div>
  )
}

export default KlijentFormaNoviNalog
