import React from 'react'
import TusKabineNoviNalog from '../../components/forms/TusKabineNoviNalog'
import Link from 'next/link'

function TusKabinePage() {
  return (
    <div className='w-full'>
        <main className='max-w-[1650px] mx-auto px-5'>
            <Link href={'/tus-kabine-nalozi'}>Tus Kabine Nalozi</Link>
            <TusKabineNoviNalog></TusKabineNoviNalog>
        </main>
    </div>
  )
}

export default TusKabinePage
