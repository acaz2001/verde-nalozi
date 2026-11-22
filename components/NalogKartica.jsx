'use client'
import React from 'react'

import { PlusIcon, Check, X, Pencil, ChevronDownIcon , Ban, CircleUserRound, ChevronsUpDown  , MirrorRectangular, PencilRuler, Images, BanknoteArrowUp  } from "lucide-react"

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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Link from 'next/link'
import {naloziPromenaStanjaNaloga} from '../actions/action'
import {naloziPromenaStanjaNalogaNijeUradjen} from '../actions/action'
import Image from 'next/image'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { toast } from 'sonner'


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


function NalogKartica({nalozi, key}) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [open, setOpen] = React.useState(false)

  const deleteNalog = async (nalogId) => {
    const response = await fetch(`http://localhost:3000/api/nalozi/${nalogId}`, {
      method: 'DELETE',
    })
    const data = await response.json()
    console.log("DELETE DATA:",  data)

  }

  const handlePromenaStanjaNaloga = async(id) => {
    await naloziPromenaStanjaNaloga(id)
  }

  const handlePromenaStanjaNalogaNijeUradjen = async(id) => {
    await naloziPromenaStanjaNalogaNijeUradjen(id)

  }

  console.log("NNN:" , nalozi);
  

  return (
      <ItemGroup className="w-full  flex flex-col gap-5 relative hover:scale-101 overflow-visible 
      transition-all duration-200 cursor-pointer border border-gray-400 my-5 rounded-2xl"
      key={key}>
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
                    / 0{nalozi.brojTelefona}
                  </ItemTitle>
                  <ItemTitle className='text-2xl text-gray-500 md:block hidden'>
                    / Ukupna cena naloga: {nalozi.ukupnaCena} RSD
                  </ItemTitle>
                  {/* <ItemTitle className='text-[18px]'>{nalozi.stanjeNaloga}</ItemTitle> */}
                </div>
                <ChevronDownIcon className="ml-auto group-data-panel-open/button:rotate-180" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>

            <Item className="md:w-full w-fit rounded-3xl relative mb-5 bg-transparent p-0">
             <main className={`md:gap-5 gap-2 flex md:flex-row flex-col flex-col-reverse w-full rounded-3xl relative md:mt-0 mt-3`}>
              <ItemContent className={`md:p-5 md:p-0 gap-8 rounded-2xl ${nalozi.stanjeNaloga === 'nijeUradjen' ? 'bg-[#f0f0f06f]' : 'bg-green-200' }`}>
                  {nalozi.proizvod?.map((p, index) => {
                    return (
                      <div key={p._id} className='mt-2 border md:border-black border-none rounded-xl md:p-5 p-2.5'>
                        <div className='md:text-4xl text-2xl font-semibold tracking-wide bg-amber-400
                        rounded-2xl p-3 mb-8 flex flex-row justify-between w-full'>
                          Proizvod {index+1}: <span>{p.cena} RSD</span>
                        </div>
                        <div className='flex flex-col gap-8.5 '>
                          <section className='flex flex-col items-start gap-1.5'>
                            <div className='flex md:flex-row flex-col md:items-center  gap-1.5'>
                              <div className='flex flex-row items-center gap-1.5'>
                                <MirrorRectangular/>
                                <ItemTitle className='font-medium md:text-xl text-base text-nowrap'>
                                  <span className='font-bold md:text-xl text-base text-nowrap'>
                                    Vrsta stakla:
                                  </span>
                                  {`${p.imeProizvoda}`}/
                                </ItemTitle>
                              </div>
                              <div className='flex flex-row items-center gap-1'>
                                <ItemDescription className='font-medium md:text-xl text-base text-nowrap text-black'>
                                  {p.obradaProizvoda}
                                </ItemDescription>/
                                <ItemDescription className='font-medium md:text-xl text-base text-nowrap text-black'>
                                  {p.uslugaProizvoda}
                                </ItemDescription>
                              </div>
                            </div>
                            <div className='flex flex-row gap-1.5'>
                              <PencilRuler/>
                              <ItemDescription className='font-bold md:text-xl text-base text-nowrap text-black'>
                              {`Širina:${p.sirinaProizvoda}cm / Dužina:${p.duzinaProizvoda}cm`}
                              </ItemDescription>
                            </div>
                            <div>
                              <ItemTitle className='font-bold md:text-xl text-base text-nowrap'>
                                Broj komada: <span className='font-medium'>{p.brojKomadaProizvoda} kom.</span>
                              </ItemTitle>
                            </div>
                          </section>

                          {p.slikaProizvoda != '' ?
                          <>
                            <div className='flex flex-col gap-1.5 md:block hidden'>
                              <div className='flex flex-row gap-1.5 items-center'>
                                <Images/>
                                <h1 className='font-bold md:text-xl text-base text-nowrap'>
                                  Nacrt:
                                </h1>
                              </div>
                              <ItemDescription>
                                <Image src={p.slikaProizvoda} width={600} height={600} alt='Nacrt'/>
                              </ItemDescription>
                            </div>
                            <div className='flex flex-col gap-1.5 md:hidden block'>
                              <div className='flex flex-row gap-1.5 items-center'>
                                <Images/>
                                <h1 className='font-bold md:text-xl text-base text-nowrap'>
                                  Nacrt:
                                </h1>
                              </div>
                              <ItemDescription>
                                <Image src={p.slikaProizvoda} width={350} height={350} alt='Nacrt'/>
                              </ItemDescription>
                            </div>
                          </>
                          : null}
                          
                          <section className='bg-blue-100 rounded-xl p-3 flex flex-col gap-2 h-fit w-full'>
                            <ItemTitle className='font-medium md:text-xl text-base text-nowrap'>
                              Napomena*
                            </ItemTitle>
                            <ItemDescription className='md:text-base text-sm h-auto'>
                              {p.napomenaProizvoda}
                            </ItemDescription>
                          </section>

                          <section className='flex flex-col items-start gap-1.5'>
                            {p.dodatnoZaNaplatuProizvod != 0 ?
                              <div className='flex flex-row items-center gap-1.5'>
                                <div className='flex flex-row items-center gap-1.5'>
                                  <BanknoteArrowUp/> 
                                  <ItemTitle className='font-medium md:text-xl text-base text-nowrap'>
                                    Dodatno za naplatu:
                                  </ItemTitle>
                                </div>
                                <ItemDescription className='text-xl text-black font-bold'>
                                  {p.dodatnoZaNaplatuProizvod} RSD
                                </ItemDescription> 
                              </div>:
                              null
                            }
                            <div className='bg-blue-100 rounded-xl p-3 flex flex-col gap-2'>
                              <ItemTitle className='font-medium md:text-xl text-base text-nowrap'>
                                Opis dodatne naplate za proizvod*
                              </ItemTitle>
                              <ItemDescription className='md:text-base text-sm h-auto'>
                                {p.napomenaZaDodatnuCenuProizvoda}
                              </ItemDescription>
                            </div>
                          </section>

                          <div>
                            {p.stanjeNaloga}
                          </div>

                        </div>
                        
                        <>
                                   
                          {p.rupe?.map((rupa,rupeIndex) => {
                            return (
                              <div key={rupa._id} className='flex flex-col mt-2'>
                                {nalozi.proizvod[index].rupe ?
                                <ItemTitle className='font-medium md:text-xl text-base text-nowrap'>
                                  Rupe za proizvod {index+1}
                                </ItemTitle>
                                : null} 
                                <div className='flex flex-row gap-2'>
                                  <ItemDescription className='md:text-base text-sm h-auto'>
                                    {rupa.fiRupe}
                                  </ItemDescription>
                                  <ItemDescription className='md:text-base text-sm h-auto'>
                                    {rupa.brojRupa} rupa 
                                  </ItemDescription>
                                </div>
                              </div>
                            )
                          })}
                        </>
                      </div>
                      
                    )
                  })}

                  {nalozi.ram?.map((p, ramIndex) => {
                    return (
                      <div key={p._id} className='flex flex-col gap-2 border border-black p-5 rounded-2xl'>
                        <div className='text-4xl font-semibold tracking-wide bg-cyan-200
                        rounded-2xl p-3 mb-3 flex flex-row justify-between'>
                          Ram {ramIndex+1}: <span>{p.cenaRama} RSD</span>
                        </div>
                        <div className='flex flex-row gap-1.5 items-center'>
                          <ItemTitle className='font-bold md:text-xl text-base text-nowrap'>
                            Staklo/Ogledalo:
                          </ItemTitle>
                          <ItemDescription className='font-medium md:text-xl text-base text-nowrap text-black'>
                            {p.staklo}
                          </ItemDescription>
                        </div>
                        <div className='flex flex-row gap-1.5 items-center'>
                          <ItemTitle className='font-bold md:text-xl text-base text-nowrap'>
                            Šifra rama:
                          </ItemTitle>
                          <ItemDescription className='font-medium md:text-xl text-base text-nowrap text-black'>
                            {p.sifraRama}
                          </ItemDescription>
                        </div>
                        <div className='flex flex-row gap-1.5'>
                          <PencilRuler/>
                          <ItemDescription className='font-medium md:text-xl text-base text-nowrap text-black'>
                          {`Širina:${p.sirina}cm / Dužina:${p.duzina}cm`}
                          </ItemDescription>
                        </div>
                        <div>
                          {p.brojKomadaRamova && 
                            <ItemTitle className='font-medium md:text-xl text-base text-nowrap'>
                              Broj komada: <span className='font-medium'>{p.brojKomadaRamova} kom.</span>
                            </ItemTitle>
                          }
                        </div>
                        
                        {p.paspatuBoja != 'nema' ?
                          <div className='flex flex-row gap-1.5 items-center'>
                            <ItemTitle className='font-medium md:text-xl text-base text-nowrap'>
                              Paspatu:
                            </ItemTitle>
                            <ItemDescription className='font-medium md:text-xl text-base text-nowrap text-black'>
                              {p.paspatuBoja}
                            </ItemDescription>
                          </div>
                          : null
                        }
                        <div className='bg-blue-100 rounded-xl p-3 flex flex-col gap-2'>
                          <ItemTitle className='font-medium md:text-xl text-base text-nowrap'>
                            Napomena*
                          </ItemTitle>
                          <ItemDescription className='md:text-base text-sm h-auto'>
                            {p.napomena}
                          </ItemDescription>
                        </div>
                      
                        {p.dodatnaCena != 0 ?
                          <div className='flex flex-row items-center gap-1.5'>
                            <div className='flex flex-row items-center gap-1.5'>
                              <BanknoteArrowUp/> 
                              <ItemTitle className='font-medium md:text-xl text-base text-nowrap'>
                                Dodatno za naplatu:
                              </ItemTitle>
                            </div>
                            <ItemDescription className='text-xl text-black font-bold'>
                              {p.dodatnaCena} RSD
                            </ItemDescription> 
                          </div> : null
                        }

                        <div className='bg-blue-100 rounded-xl p-3 flex flex-col gap-2'>
                          <ItemTitle className='font-medium md:text-xl text-base text-nowrap'>
                            Napomena za dodatnu cenu*
                          </ItemTitle>
                          <ItemDescription className='md:text-base text-sm h-auto'>
                            {p.dodatnaCenaNapomena}
                          </ItemDescription>
                        </div>
                        
                      </div>
                    )
                  })}
                    
                
                  <section className='flex flex-col items-start gap-2 mt-2'>
                    <div className='flex flex-row items-end gap-1.5'>
                      <ItemTitle className='text-lg'>
                        Ukupno za naplatu:
                      </ItemTitle>
                      <ItemTitle className='text-2xl'>
                        {nalozi.ukupnaCena} RSD
                      </ItemTitle>
                    </div>
                    <div className='flex flex-row items-end gap-1.5'>
                      <ItemTitle>
                        Datum:
                      </ItemTitle>
                      <ItemTitle>
                        {nalozi.datum}
                      </ItemTitle>
                    </div>
                  </section>
              </ItemContent>


              <ItemActions className='bg-[#f6f1ff] rounded-2xl px-5 flex flex-row items-center justify-center'>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href={`/nalozi/${nalozi._id}`} target="_blank">
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


export async function NalogKarticaZaObjekat({nalog}) {
  const deleteNalog = async (nalog) => {
    const response = await fetch(`http://localhost:3000/api/nalozi/${nalog}`, {
      method: 'DELETE',
    })
    
    const data = await response.json()
    toast("Nalog za tuš kabinu je uspešno obrisan.", { position: "bottom-right" });
    redirect('/tus-kabine-nalozi')
  }

  return (
    <div>
      <ItemGroup className="w-full">
        
            <Item key={nalog._id} variant="outline" className="w-full">
            
            <ItemContent className="gap-1">
                <ItemTitle className='text-[18px]'>{nalog.ime}</ItemTitle>
                <ItemTitle>{nalog.brojTelefon}</ItemTitle>
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

export default NalogKartica
