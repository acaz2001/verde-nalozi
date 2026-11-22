'use client'
import React from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import { Handbag } from 'lucide-react'
import moment from 'moment';
import { usePathname } from 'next/navigation'


moment.locale('sr')
let date = moment();
let datum = date.format("MMMM DD YYYY")
let mesec = date.format("MMMM")


const stranice = [
    {label:"Početna",href:"/", value: "/"},
    {label:"Novi Nalog",href:"/novi-nalog", value: "/novi-nalog"},
    {label:"Nalozi",href:`/nalozi?query=${mesec}`, value: "/nalozi"},
    {label:"Tuš kabine",href:`/tus-kabine-nalozi?query=${mesec}`, value: "/tus-kabine-nalozi"},
    {label:"Klijenti",href:`/klijenti`, value: "/klijenti"}
]

function Header() {
    const [active, setActive] = useState()
    const pathname = usePathname()
    

  return (
    // top-295
    <div className={`min-w-[360px] my-5 px-5 sticky top-4  z-100`}> 
        <div className='max-w-[1650px] mx-auto p-3 flex items-center justify-center rounded-[100px] bg-transparent'>
            {/* <section>
                <div className='md:ml-5 ml-0'>
                    <h1 className='lg:text-5xl hidden text-white'>VERDE</h1>
                </div>
            </section> */}
            <section className='flex flex-row items-center  bg-[#191b1d] rounded-4xl'>
                {stranice.map((stranica)=> (
                    
                        <Link key={stranica.label} id={stranica.label} href={stranica.href} className=''>
                            <Button className={`cursor-pointer p-6 h-13 bg-transparent hover:bg-[#ddd7fd] hover:text-black rounded-4xl ${pathname == stranica.value ? 'bg-white text-black transition-all duration-300' : ''}`}>
                                {stranica.label}
                            </Button>
                        </Link>
                        
                    
                ))}
            </section>
            {/* <section className='flex items-center justify-end gap-5'>
                <div className='bg-[#191b1d] h-full rounded-2xl '>
                    <Handbag size={40} className='text-white p-2 rounded-2xl hover:bg-[#ddd7fd] hover:text-black cursor-pointer'/>
                </div>
                <div className='flex flex-row items-center justify-center'>
                    <div className='border-l px-2 border-white flex items-center justify-center '>
                        <Button className='w-full cursor-pointer p-6 h-13 bg-[#191b1d] hover:bg-[#ddd7fd] hover:text-black rounded-4xl'>
                            Login
                        </Button>
                    </div>
                    <div className='border-l-1 pl-2 border-white'>
                        <Button className='cursor-pointer p-6 h-13 bg-[#191b1d] hover:bg-[#ddd7fd] hover:text-black rounded-4xl'>
                            Sign up
                        </Button>
                    </div>
                </div>
            </section> */}
        </div>

    </div>
  )
}

export default Header
