'use client'
import React from 'react'
import { Check, X, Pencil  } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item"
import Link from 'next/link'
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { redirect } from 'next/navigation'
import { toast } from 'sonner'


export default function NalogKabinaCardZaObjekat({nalog}) {
  //console.log("NALOG KARTICA DATA JE:",nalog)

  const deleteNalog = async (nalog) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}api/tus-kabine-nalozi/${nalog}`, {
      method: 'DELETE',
    })
    
    const data = await response.json()
    toast("Nalog za tuš kabinu je uspešno obrisan.", { position: "bottom-right" });
    redirect('/tus-kabine-nalozi')
  }


  return (
      <ItemGroup className="w-full flex flex-col gap-5 ">
            <Item key={nalog._id} variant="outline" className="w-full rounded-2xl
             mb-5 bg-linear-to-r from-slate-200 via-gray-300 to-gray-400">
           
            <ItemContent className="gap-1">
                <div className='flex flex-row gap-4 items-center'>
                  <ItemTitle className='text-[18px]'>{nalog.imeProizvoda}</ItemTitle>
                  <ItemTitle className='text-[18px]'>{nalog.telefon}</ItemTitle>
                </div>
                  <ItemDescription className='text-xl text-black font-bold'>
                    {`Model Kabine:${nalog.modelKabine.toUpperCase()}
                    ${nalog.sirina != 0 ? `Širina:${nalog.sirina}cm` : '' }
                    ${nalog.duzina != 0 ? `Duzina:${nalog.duzina}cm` : '' }
                    Visina:${nalog.visina}cm`
                    }
                  </ItemDescription>
         
               
                <ItemDescription className='text-lg text-black font-bold'>
                  {`Okov: ${nalog.bojaOkova}`}
                </ItemDescription>
                <ItemDescription className='text-lg text-black font-bold'>
                  {`Staklo: ${nalog.bojaStakla}`}
                </ItemDescription>
                <ItemDescription className='text-lg text-black font-bold'>
                  {nalog.montaza == "da" ? "Montira se" : "Bez montaže" }
                </ItemDescription>
                <ItemDescription className='text-sm text-black font-normal pr-5'>
                  {nalog.napomena != '' ? `Napomena: ${nalog.napomena}` : null}
                </ItemDescription>
                <ItemTitle>{nalog.datum}</ItemTitle>
            </ItemContent>
            <ItemActions>
                <Link href={`/tus-kabine-nalog/${nalog._id}`} target="_blank">
                  <Button variant="ghost" size="icon" className="rounded-full cursor-pointer">
                      <Pencil />
                  </Button>
                </Link>
                <Button variant="ghost" size="icon" className="rounded-full cursor-pointer">
                    <Check />
                </Button>
                <Button onClick={()=> deleteNalog(nalog._id)} variant="ghost" size="icon" className="rounded-full cursor-pointer">
                    <X />
                </Button>

           
            </ItemActions>
            </Item>
       
        </ItemGroup>
  )
}