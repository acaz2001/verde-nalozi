'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReactNode } from 'react'
import { useForm, useFormContext } from 'react-hook-form'
import { FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { coerce } from 'zod'
import moment from 'moment'

moment.locale('sr')
let date = moment();
let datum = date.format("MMMM DD YYYY")
//let tacanDatum = date.format("MMMM DD YYYY").charAt(0).toLocaleUpperCase()+datum.slice(1)



/**
 * Schemas
 */

const schemaCreateRupe = z.object({
  // content: fiRupe
  fiRupe: z.string().min(3),
  brojRupa: z.coerce.number()
})

const schemaCreateProizvod = z.object({
  //title : imeProizvoda
  imeProizvoda: z.string().min(3),
  obradaProizvoda: z.string().min(3),
  sirinaProizvoda: z.coerce.number(),
  duzinaProizvoda: z.coerce.number(),
  // notes: rupe
  rupe: z
    .array(schemaCreateRupe)
    //.min(1, { message: 'Chapter must contain atleast one note.' }),
})

export const schemaCreateCourse = z.object({
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

/**
 * Hooks
 */

export type FormTypeCreateCourse = z.infer<typeof schemaCreateCourse>

export const useFormCreateCourse = () =>
  useForm<FormTypeCreateCourse>({
    //@ts-ignore
    resolver: zodResolver(schemaCreateCourse),
  })

/**
 * Context
 */
//@ts-ignore 
export const FormProviderCreateCourseNaloziEdit = ({children, nalog}: {
  children: ReactNode
},

) => {
  const methods = useFormCreateCourse()
  //return <FormProvider {...methods}>{children}</FormProvider>
  return <FormProvider {...methods}>{children}</FormProvider>
}

export const useFormContextCreateCourse = () =>
  useFormContext<FormTypeCreateCourse>()
