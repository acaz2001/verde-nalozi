import React from 'react'
import {FormProviderCreateCourse} from '../../components/forms/forms' 
import {NoviNalog2} from '../../components/forms/NoviNalogForma2'
import { fetchKlijenti } from '../../actions/action'

async function getKlijenti() {
  const res = await fetchKlijenti();
  return res.json();
}


async function NoviNalogPage() {
  const klijenti = await getKlijenti(); // klijenti je array of objects

  return (
    <div className='w-full'>
      <div className='max-w-[1650px] mx-auto'>
        <FormProviderCreateCourse>
          <div className='px-5'>
            
            <NoviNalog2 klijenti={klijenti} />
          </div>
        
      </FormProviderCreateCourse>

      </div>

    
      
    </div>
  )
}

export default NoviNalogPage
