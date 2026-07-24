import React from 'react'
import { NalogKarticaZaObjekat } from '../../../components/NalogKartica';
import EditFormaNaloga from '../../../components/forms/EditFormaNaloga';


async function getNalogId(id) {
  const res = await fetch(`http://localhost:3000/api/nalozi/${id}`, {method:"GET"});
  return res.json();
}

async function Nalog({params}) {
  const { id } = await params;
  //const res = await fetch(`http://localhost:3000/api/nalozi/${id}`, {method:"GET"});
  //const nalog = res.json();

  const nalog = await getNalogId( id );

  console.log ("NALOG ID JE: ", nalog)

  return (
    <div className='w-full'>
        <main className='max-w-[1650px] mx-auto mt-20'>
            <NalogKarticaZaObjekat nalog={nalog}/>
            <EditFormaNaloga nalog={nalog}/>
        </main>
      
    </div>
  )
}

export default Nalog
