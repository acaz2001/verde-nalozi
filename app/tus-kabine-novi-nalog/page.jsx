import React from 'react'
import TusKabineNoviNalog from '../../components/forms/TusKabineNoviNalog'
import Link from 'next/link'
import {Button} from '../../components/ui/button'
import {
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"
import moment from 'moment';

moment.locale('sr')
let date = moment();
let datum = date.format("MMMM DD YYYY")
let mesec = date.format("MMMM")

function TusKabinePage() {
  return (
    <div className='w-full'>
        <main className='max-w-[1650px] mx-auto px-5'>
            <section className='mt-10 flex md:flex-row flex-col md:justify-between w-full md:gap-2 gap-5'>
              <div className='flex flex-col gap-2 w-full' >
                <CardHeader className='px-0 gap-1.5'>
                    <CardTitle className='text-2xl font-bold'>
                      Forma za pravljenje naloga za tuš kabine.
                    </CardTitle>
                    <CardDescription>
                      Popuni podatke ispod da bi napravili novi nalog, klikom na dugme "Napravi nalog" kreirate nalog.
                    </CardDescription>
                </CardHeader>
              </div>
              <Link href={`/tus-kabine-nalozi?query=${mesec}`} >
                <Button className='cursor-pointer'>
                  Svi nalozi za tuš kabine.
                </Button>
              </Link>
            </section>
            <div className='mt-15 mb-5'>
              <TusKabineNoviNalog></TusKabineNoviNalog>
            </div>
        </main>
    </div>
  )
}

export default TusKabinePage
