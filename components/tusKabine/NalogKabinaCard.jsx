'use client'
import React, { useState } from 'react'
import { BanknoteArrowUp, Check, X, Pencil, Ban, CircleUserRound,ChevronDownIcon, MirrorRectangular, PencilRuler  } from "lucide-react"

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
import { promenaStanjaNaloga, promenaStanjaNalogaNijeUradjen } from '../../actions/action'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible"


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
  const [open, setOpen] = useState(false)


  const deleteNalog = async (nalogId) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}api/tus-kabine-nalozi/${nalogId}`, {
      method: 'DELETE',
    })
    const data = await response.json()
    console.log("DELETE DATA:",  data)

  }

  const handlePromenaStanjaNaloga = async(id) => {
    await promenaStanjaNaloga(id)
  }

  const handlePromenaStanjaNalogaNijeUradjen = async(id) => {
    await promenaStanjaNalogaNijeUradjen(id)
  }

  //const gotovNalog = async()

  console.log("NALOZIII,",nalozi.stanjeNaloga)


  return (
        <ItemGroup className="w-full  flex flex-col gap-5 relative hover:scale-101 overflow-visible 
              transition-all duration-200 cursor-pointer border border-gray-400 my-5 rounded-2xl"
              key={nalozi._id}>    
            <Collapsible open={open} onOpenChange={setOpen} 
            className=" rounded-md  w-full md:p-5 p-2" >
              <CollapsibleTrigger className='w-full '> 
              <Button variant="ghost" className="w-full cursor-pointer">
                <div className='flex flex-row gap-2 items-center'>
                  <ItemTitle className='md:text-2xl text-xl text-gray-500'>
                    <span><CircleUserRound/></span>
                    {nalozi.ime}
                  </ItemTitle>
                  <ItemTitle className='md:text-2xl text-xl text-gray-500'>
                    / {nalozi.telefon}
                  </ItemTitle>
                  <ItemTitle className='text-2xl text-gray-500 md:block hidden'>
                    / Ukupna cena tuš kabine: {nalozi.cena} €
                  </ItemTitle>
                  {/* <ItemTitle className='text-[18px]'>{nalozi.stanjeNaloga}</ItemTitle> */}
                </div>
                <ChevronDownIcon className="ml-auto group-data-panel-open/button:rotate-180" />
              </Button>
            </CollapsibleTrigger>   
            <CollapsibleContent> 
              <Item className="md:w-full w-full rounded-3xl relative mb-5 bg-transparent p-0">
              <main className={`md:gap-5 gap-2 flex md:flex-row flex-col flex-col-reverse w-full rounded-3xl relative md:mt-0 mt-3`}>
              
              <ItemContent className={`w-full md:p-5 p-3 md:gap-8 gap-5 rounded-2xl ${nalozi.stanjeNaloga === 'nijeUradjen' ? 'bg-[#f0f0f06f]' : 'bg-green-200' }`}>
                <section className='md:text-4xl text-2xl font-semibold tracking-wide bg-amber-400
                rounded-2xl p-3 md:mb-8 mb-0 flex flex-row justify-between w-full'>
                  <h1 className='flex flex-row justify-between'>
                    Kabina {nalozi.modelKabine}:
                  </h1>
                  <h1>
                    {nalozi.cena} €
                  </h1>
                </section>

                <section className='flex flex-col items-start gap-1.5'>
                  <div className='flex flex-row gap-1.5'>
                    <PencilRuler  className='md:text-lg text-base'/>
                    <ItemDescription className='font-medium md:text-xl text-lg text-wrap text-black'>
                    {`${nalozi.sirina != 0 ? `Širina:${nalozi.sirina}cm` : '' } 
                    / ${nalozi.duzina != 0 ? `Duzina:${nalozi.duzina}cm` : '' }
                    Visina:${nalozi.visina}cm`}
                    </ItemDescription>
                  </div>
                  {nalozi.brojKabina && 
                    <div>
                      <ItemTitle className='font-bold md:text-xl text-base text-nowrap'>
                        Broj kabina: <span className='font-medium'>{nalozi.brojKabina} kom.</span>
                      </ItemTitle>
                    </div>
                  }
                </section>
          
                  <div className='flex flex-col gap-0'>
                    <ItemDescription className='font-medium md:text-xl text-base text-nowrap text-black'>
                      {`Okov: ${nalozi.bojaOkova}`}
                    </ItemDescription>
                    <ItemDescription className='font-medium md:text-xl text-base text-nowrap text-black'>
                      {`Staklo: ${nalozi.bojaStakla}`}
                    </ItemDescription>
                    <ItemDescription className='mt-2 text-lg text-black font-bold'>
                      {nalozi.montaza == "da" ? "Montira se" : "Bez montaže" }
                    </ItemDescription>
                  </div>

                  <section className='bg-blue-100 rounded-xl p-3 flex flex-col gap-2'>
                    <ItemTitle className='font-medium md:text-xl text-base text-nowrap'>
                      Napomena*
                    </ItemTitle>
                    <ItemDescription className='md:text-base text-sm h-auto'>
                      {nalozi.napomena}
                    </ItemDescription>
                  </section>

                  <section className='flex flex-col items-start gap-1.5 w-full'>
                    {nalozi.dodatniTroskovi != 0 ?
                    <>
                      <div className='flex flex-row items-center gap-1.5 w-full'>
                        <div className='flex flex-row items-center gap-1.5'>
                          <BanknoteArrowUp/> 
                          <ItemTitle className='font-medium md:text-xl text-base text-nowrap'>
                            Dodatno za naplatu:
                          </ItemTitle>
                        </div>
                        <ItemDescription className='text-xl text-black font-bold'>
                          {nalozi.dodatniTroskovi}€
                        </ItemDescription> 
                      </div>
                    
                    <div className='w-full bg-blue-100 rounded-xl p-3 flex flex-col gap-2'>
                      <ItemTitle className='text-xl text-black font-medium'>
                        Opis dodatne naplate za proizvod*
                      </ItemTitle>
                      <ItemDescription className='md:text-base text-sm h-auto'>
                        {nalozi.dodatniTroskoviNapomena}
                      </ItemDescription>
                    </div>
                    </>
                    :null}
                  </section>


                  <section className='flex flex-col gap-1 mt-2'>
                    <div className='flex gap-2'>
                      {nalozi.stanjeNaloga === 'uradjen' ? 
                      <ItemTitle>Nalog je urađen.</ItemTitle> 
                      : <ItemTitle>Nalog nije urađen.</ItemTitle> 
                      }

                      <ItemTitle>/ {nalozi.datum}</ItemTitle>
                      
                    </div>
                  </section>
              </ItemContent>

              <ItemActions className='bg-[#f6f1ff] rounded-2xl px-5 flex flex-row items-center justify-center'>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href={`/tus-kabine-nalozi/${nalozi._id}`} target="_blank">
                        <Button variant="ghost" size="icon" className="rounded-full cursor-pointer hover:bg-gray-300">
                            <Pencil />
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Promeni nalog</p>
                    </TooltipContent>
                  </Tooltip>

                  {nalozi.stanjeNaloga === 'nijeUradjen' 
                  ? <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full cursor-pointer hover:bg-gray-300"
                        onClick={()=> handlePromenaStanjaNaloga(nalozi._id)}>
                            <Check />
                            
                      </Button>
                      
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Uradjen nalog</p>
                    </TooltipContent>
                  </Tooltip> 
                  : <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full cursor-pointer hover:bg-gray-300"
                        onClick={()=> handlePromenaStanjaNalogaNijeUradjen(nalozi._id)}>
                            <Ban />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Promeni u ne uradjen nalog</p>
                    </TooltipContent>
                  </Tooltip> }

                  

                  <Tooltip>
                  <TooltipTrigger asChild>
                    <Button onClick={()=> deleteNalog(nalozi._id)} variant="ghost" size="icon" className="rounded-full cursor-pointer hover:bg-gray-300">
                      <X />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Izbriši nalog</p>
                  </TooltipContent>
                </Tooltip>
                  
                  
                
            
              </ItemActions>
              </main>
              </Item>
              </CollapsibleContent> 
            </Collapsible>
       
        </ItemGroup>
  )
}






export default NalogKabinaCard





