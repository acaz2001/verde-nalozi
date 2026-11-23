import React from 'react'
import { getKlijentId } from '../../../actions/action'
import KlijentCard from '../../../components/klijenti/KlijentCard';
import KlijentNaloziContainer from '../../../components/klijenti/KlijentNaloziContainer';
import {KlijentKabineNaloziContainer} from '../../../components/klijenti/KlijentNaloziContainer';
import FliterDugmeUredjeniNalozi from '../../../components/klijenti/FliterDugmeUredjeniNalozi';
import KlijentMain from '../../../components/klijenti/KlijentMain';


async function klijentId(id) {
    const res = await getKlijentId(id)
    return res.json()
}

async function getPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}api/nalozi`, {method:"GET"});
  console.log("DS:", res);
  
  return res.json();
}
async function getPostsKabine() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}api/tus-kabine-nalozi`, {method:"GET"});
  return res.json();
} 

async function KlijentiDynamicPage({params}) {
    const { id } = await params;
    console.log("PARAMS dd:",params);
    
  const klijent = await klijentId(id) // klijenti je objekat odredjenog id-a

  const naloziSvi = await getPosts(); // nalozi je array of objects
  const nalozi = naloziSvi.filter((nalog) => nalog.ime === klijent.ime)
  
  const kabineNaloziSvi = await getPostsKabine();
  const kabineNalozi = kabineNaloziSvi.filter((nalog) => nalog.ime === klijent.ime)
  console.log("PARAMS ID:",kabineNalozi.length + nalozi.length); 
  
  let brojNaloga = kabineNalozi.length + nalozi.length;

  

  return (
    <div className='w-full'>
      <div className='max-w-[1650px] mx-auto px-10 flex flex-col'>
        <KlijentCard klijent={klijent} ceoObjekat={true} brojNaloga={brojNaloga} ukupanBrojNaloga={true}/>
        <section>
          <KlijentMain klijentNalozi={nalozi} kabineNalozi={kabineNalozi}/>
        </section>
        
      </div>
    </div>
  )
}

export default KlijentiDynamicPage
