import React from 'react'
import Link from 'next/link'
import { Button } from './ui/button'

function Header() {
  return (
    <div className="w-full flex items-center bg-red-400">
        <div className='max-w-[1650px] mx-auto'>
            <Link href={'/'}>
            <Button className="cursor-pointer">
               Pocetna
            </Button>
            </Link>
            <Link href={'/novi-nalog'}>
            <Button className="cursor-pointer">
                Novi Nalog
            </Button>
            </Link>
            <Link href={'/nalozi'}>
            <Button className="cursor-pointer">
                Nalozi
            </Button>
            </Link>
            <Link href={'/tus-kabine-nalozi'}>
            <Button className="cursor-pointer">
                Tus kabine
            </Button>
            </Link>
        </div>
    </div>
  )
}

export default Header
