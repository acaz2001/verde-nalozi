import React from 'react'
import {Naslov, OpisTeksta} from '../../components/typography/Kontent'
import { fetchKlijenti } from '../../actions/action'
import KlijentContainer from '../../components/klijenti/KlijentContainer';
import Link from 'next/link';
import {Button} from '../../components/ui/button'
import Search from '../../components/Search'

async function getKlijenti() {
  const res = await fetchKlijenti();
  return res.json();
}

async function KlijentiPage(props) {
  const searchParams = await props.searchParams;
  const klijenti = await getKlijenti(); // klijenti je array of objects
  //console.log("KlijentiOmg:", klijenti);
  const query = searchParams?.pretraga;
  
  return (
    <div className='w-full'>
      <div className='max-w-[1650px] mx-auto md:px-10 px-3 flex flex-col gap-2'>
        <div className='flex flex-col items-start mb-2'>
          <div className='flex md:flex-row flex-col justify-between w-full md:items-end items-start'>
            <div>
              <Naslov className=''>
                Klijenti:
              </Naslov>
              <OpisTeksta className={'mt-2'}> 
                Ovde možete videti sve vaše klijente i podešavati njihove podatke.
              </OpisTeksta>
            </div>
            <Link href={"/novi-klijent"}>
              <Button className='cursor-pointer mt-2 md:mt-0'>
                Napravi novog klijenta.
              </Button>
            </Link>
          </div>
          <div className="flex flex-col items-start gap-2.5 z-50 mt-5 w-full">
            <div>
              <label for="name" className='text-lg font-medium'>
                Pretraži klijenta:
              </label>
              <p className='text-sm text-gray-500'>
                Unesi ime ili broj telefona klijenta.
              </p>
            </div>
              <Search placeholder='Pretraži klijenta' className='w-full'/>
          </div> 
        </div>
        <KlijentContainer klijenti={klijenti} query={query}/>
      </div>     
    </div>
  )
}

export default KlijentiPage
