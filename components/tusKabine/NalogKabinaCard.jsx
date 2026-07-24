import React from 'react'

import { PlusIcon, Check, X, Pencil  } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
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
import { maxLength } from 'zod'
import Link from 'next/link'

const people = [
  {
    ime: "Milos Milosevic",
    telefon: "0603170707",
    avatar: "https://github.com/shadcn.png",
    proizvod: "Flot 8mm Kaljeno 80x250",
  },
  {
    ime: "Slavica Djorovic",
    telefon: "0603170707",
    avatar: "https://github.com/maxleiter.png",
    proizvod: "Ogledalo 4mm Fazeta 5mm 50x250",
  },
  {
    ime: "Milica Todorovic",
    avatar: "https://github.com/evilrabbit.png",
    telefon: "0603170707",
    proizvod: "Tus kabina Dupla Klizna 90x90",
  },
]


function NalogKabinaCard({nalozi}) {


  return (
      <ItemGroup className="w-full flex flex-col gap-5 ">
            <Item key={nalozi.id} variant="outline" className="w-full rounded-2xl
             mb-5 bg-linear-to-r from-slate-200 via-gray-300 to-gray-400">
            
            <ItemContent className="gap-1">
                <div className='flex flex-row gap-4 items-center'>
                  <ItemTitle className='text-[18px]'>{nalozi.ime}</ItemTitle>
                  <ItemTitle className='text-[18px]'>{nalozi.telefon}</ItemTitle>
                </div>
                  <ItemDescription className='text-xl text-black font-bold'>
                    {`Model Kabine:${nalozi.modelKabine.toUpperCase()} 
                    ${nalozi.sirina != 0 ? `Širina:${nalozi.sirina}cm` : '' }
                    ${nalozi.duzina != 0 ? `Duzina:${nalozi.duzina}cm` : '' }
                    Visina:${nalozi.visina}cm`
                    }
                  </ItemDescription> 
          
                
                <ItemDescription className='text-lg text-black font-bold'>
                  {`Okov: ${nalozi.bojaOkova}`}
                </ItemDescription>
                <ItemDescription className='text-lg text-black font-bold'>
                  {`Staklo: ${nalozi.bojaStakla}`}
                </ItemDescription>
                <ItemDescription className='text-lg text-black font-bold'>
                  {nalozi.montaza == "da" ? "Montira se" : "Bez montaže" }
                </ItemDescription>
                <ItemDescription className='text-sm text-black font-normal pr-5'>
                  {nalozi.napomena != '' ? `Napomena: ${nalozi.napomena}` : null}
                </ItemDescription>
                <ItemTitle>{nalozi.datum}</ItemTitle>
            </ItemContent>
            <ItemActions>
                <Link href={`/nalozi/${nalozi.id}`} target="_blank">
                  <Button variant="ghost" size="icon" className="rounded-full cursor-pointer">
                      <Pencil />
                  </Button>
                </Link>
                <Button variant="ghost" size="icon" className="rounded-full cursor-pointer">
                    <Check />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full cursor-pointer">
                    <X />
                </Button>
            
            </ItemActions>
            </Item>
        
        </ItemGroup>
  )
}


export async function NalogKabinaCardZaObjekat({nalog}) {
  //console.log("NALOG KARTICA DATA JE:",nalozi.data)

  return (
    <div>
      <ItemGroup className="w-full">
        
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
        
        </ItemGroup>
    </div>
  )
}

export default NalogKabinaCard
