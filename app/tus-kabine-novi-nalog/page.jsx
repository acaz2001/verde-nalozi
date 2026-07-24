import React from 'react'
import TusKabineNoviNalog from '../../components/forms/TusKabineNoviNalog'
import Link from 'next/link'
import {Button} from '../../components/ui/button'

function TusKabinePage() {
  return (
    <div className='w-full'>
        <main className='max-w-[1650px] mx-auto px-5'>
            <div className='mt-10'>
              <Link href={'/tus-kabine-nalozi'} >
                <Button className='cursor-pointer'>
                  Svi nalozi za tuš kabine.
                </Button>
              </Link>
            </div>
            <div className='mt-15'>
              <TusKabineNoviNalog></TusKabineNoviNalog>
            </div>
        </main>
    </div>
  )
}

export default TusKabinePage
