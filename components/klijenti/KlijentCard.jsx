'use client'
import React, { useState } from 'react'
import { PlusIcon, Check, X, Pencil, Ban, SquareArrowOutUpRight  } from "lucide-react"

import { Button } from '../ui/button'
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
import { PodNaslov } from '../typography/Kontent'
import KlijentFormaEditNalog from '../forms/KlijentFormaEditNalog'


function KlijentCard({klijent, brojNaloga, ukupanBrojNaloga}) {

console.log("KLIJENTCARDL:", klijent);
  //const deleteNalog = async (nalogId) => {
  //  const response = await fetch(`http://localhost:3000/api/tus-kabine-nalozi/${nalogId}`, {
  //    method: 'DELETE',
  //  })
  //  const data = await response.json()
  //  console.log("DELETE DATA:",  data)

  //}

  const handlePromenaStanjaNaloga = async(id) => {
    await promenaStanjaNaloga(id)
  }

  const handlePromenaStanjaNalogaNijeUradjen = async(id) => {
    await promenaStanjaNalogaNijeUradjen(id)
  }

  const [vidljivostEditForme, setVidljivostEditForme] = useState(false)

  const handleVidljivostEditForme = function () {
    if (vidljivostEditForme === false) {
        setVidljivostEditForme(true)
    }
    else setVidljivostEditForme(false)
  }
  
  console.log('vidljivostEditForme', vidljivostEditForme);
  


  return (
    <main key={klijent._id}>
        <ItemGroup className="max-w-[1650px] mx-auto flex flex-col gap-5 relative hover:scale-101 overflow-visible transition-all duration-200 cursor-pointer">
                <Item key={klijent.id} variant="outline" 
                className={`w-full rounded-3xl relative mb-5 bg-transparent border-2 border-[#e9e7f2]} p-0`}>
                <main className={`gap-5 p-2 flex flex-col w-full rounded-3xl relative`}>
                    <section className='flex flex-row justify-between w-full gap-6'>
                        <ItemContent className={`p-5 gap-2 rounded-2xl ${klijent.vrstaNaloga === 'fizickoLice' ? 'bg-[#f8f8f8]' : 'bg-blue-100'} `}>
                            <div className='mt-2'>
                                <ItemTitle className='text-[15px] text-gray-500'>Broj telefona: 0{klijent.telefon}</ItemTitle>
                            </div>
                            <div className='flex flex-row gap-2 items-center'>
                                <ItemTitle className='md:text-[34px] text-[28px] text-black font-bold'>{klijent.ime}</ItemTitle>
                            </div>
                            {ukupanBrojNaloga ? 
                                <div className='mt-2'>
                                    <ItemTitle className='text-[15px] text-gray-500'>Ukupan broj naloga: {brojNaloga}</ItemTitle>
                                </div>
                            
                            : null}
                            
                            
                            

                            <div className='flex flex-col gap-1 mt-2'>
                                
                            </div>
                        </ItemContent>
                        <ItemActions className='bg-[#f6f1ff] rounded-2xl px-5'> 
                            <Tooltip>
                                <TooltipTrigger asChild>
                                <Link href={`/klijenti/${klijent._id}`} >
                                    <Button variant="ghost" size="icon" className="rounded-full cursor-pointer hover:bg-gray-300">
                                        <SquareArrowOutUpRight />
                                    </Button>
                                </Link>
                                </TooltipTrigger>
                                <TooltipContent>
                                <p>Vidi sve naloge</p>
                                </TooltipContent>
                            </Tooltip>  
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button onClick={handleVidljivostEditForme}  
                                    variant="ghost" size="icon" className="rounded-full cursor-pointer hover:bg-gray-300">
                                        <Pencil />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                <p>Promeni nalog</p>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                            <TooltipTrigger asChild>
                                <Button onClick={()=> deleteNalog(klijent._id)} variant="ghost" size="icon" className="rounded-full cursor-pointer hover:bg-gray-300">
                                <X />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Izbriši nalog</p>
                            </TooltipContent>
                            </Tooltip>
                            
                            
                            
                        
                        </ItemActions>
                    </section>

                    
                    

                
                
                

                </main>
                </Item>
        
        </ItemGroup>
        {vidljivostEditForme && <div className='mb-5'><KlijentFormaEditNalog klijent={klijent} handleVidljivostEditForme={handleVidljivostEditForme}/></div>}
        
    </main>

  )
}



// {ceoObjekat ? 
//                 <>
//                 <PodNaslov className='pl-5'>Svi nalozi:</PodNaslov>
//                     {klijent.nalozi.map((k) => {
//                         return (
//                             <main key={k.id} className='flex flex-col gap-2'>
                                
                                    
//                                     <main className='flex flex-row gap-6'>
//                                         <Link href={`/tus-kabine-nalozi/${k.id}`} target='_blank'
//                                         className='flex flex-col w-full justify-between gap-5' >
//                                             <section className={`flex flex-col gap-0 p-5 rounded-2xl w-full ${k.stanjeNaloga === 'nijeUradjen' ? 'bg-[#f8f8f8]' : 'bg-green-200'}`}>
//                                                 <ItemDescription className='text-2xl text-black'>
//                                                     Model Kabine: {k.modelKabine}
//                                                 </ItemDescription>
//                                                 {k.sirina ? <ItemDescription>Sirina: {k.sirina}cm</ItemDescription> : ''}
//                                                 {k.duzina ? <ItemDescription>Duzina: {k.duzina}cm</ItemDescription> : ''}
//                                                 <ItemDescription>Visina: {k.visina}cm</ItemDescription>
//                                                 <ItemDescription>Cena: {k.cena} eura</ItemDescription>
//                                                 <ItemDescription className='italic mt-5'>
//                                                     Datum: {k.datum}
//                                                 </ItemDescription>
//                                             </section>
//                                         </Link>
//                                         <section>
//                                             <ItemActions className='bg-[#f6f1ff] rounded-2xl px-5 flex justify-center h-full'> 
//                                                 <Tooltip>
//                                                     <TooltipTrigger asChild>
                                                        
//                                                     <Link href={`/tus-kabine-nalozi/${k.id}`} target="_blank">
//                                                         <Button variant="ghost" size="icon" className="rounded-full cursor-pointer hover:bg-gray-300">
//                                                             <SquareArrowOutUpRight />
//                                                         </Button>
//                                                     </Link> 
//                                                     </TooltipTrigger>
//                                                     <TooltipContent>
//                                                     <p>Vidi ceo nalog</p>
//                                                     </TooltipContent>
//                                                 </Tooltip> 
//                                                 {k.stanjeNaloga === 'nijeUradjen' 
//                                                     ? 
//                                                     <Tooltip>
//                                                     <TooltipTrigger asChild>
//                                                         <Button variant="ghost" size="icon" className="rounded-full cursor-pointer hover:bg-gray-300"
//                                                         onClick={()=> handlePromenaStanjaNaloga(k.id)}>
//                                                             <Check />
//                                                         </Button>
//                                                     </TooltipTrigger>
//                                                     <TooltipContent>
//                                                         <p>Uradjen nalog</p>
//                                                     </TooltipContent>
//                                                     </Tooltip> 
//                                                     : 
//                                                     <Tooltip>
//                                                     <TooltipTrigger asChild>
//                                                         <Button variant="ghost" size="icon" className="rounded-full cursor-pointer hover:bg-gray-300"
//                                                         onClick={()=> handlePromenaStanjaNalogaNijeUradjen(k.id)}>
//                                                             <Ban />
//                                                         </Button>
//                                                     </TooltipTrigger>
//                                                     <TooltipContent>
//                                                         <p>Promeni u ne uradjen nalog</p>
//                                                     </TooltipContent>
//                                                     </Tooltip>
//                                                 }
//                                                 <Tooltip>
//                                                     <TooltipTrigger asChild>
//                                                     {/* <Link href={`/klijenti/${klijent.id}`} target="_blank"> */}
//                                                         <Button variant="ghost" size="icon" className="rounded-full cursor-pointer hover:bg-gray-300">
//                                                             <Pencil />
//                                                         </Button>
//                                                     {/* </Link> */}
//                                                     </TooltipTrigger>
//                                                     <TooltipContent>
//                                                     <p>Promeni nalog</p>
//                                                     </TooltipContent>
//                                                 </Tooltip>
//                                                 <Tooltip>
//                                                 <TooltipTrigger asChild>
//                                                     <Button onClick={()=> deleteNalog(k.id)} variant="ghost" size="icon" className="rounded-full cursor-pointer hover:bg-gray-300">
//                                                     <X />
//                                                     </Button>
//                                                 </TooltipTrigger>
//                                                 <TooltipContent>
//                                                     <p>Izbriši nalog</p>
//                                                 </TooltipContent>
//                                                 </Tooltip>
                                                
                                                
                                                
                                            
//                                             </ItemActions>
//                                         </section>
//                                     </main>
                                
//                             </main>
//                         )
//                     })}
//                 </>
                    
                        
                          
                    
//                     : null}




export default KlijentCard





