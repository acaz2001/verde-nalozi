import React from 'react'
import { NalogKarticaZaObjekat } from '../../../components/NalogKartica';
import EditFormaNaloga from '../../../components/forms/EditFormaNaloga';
import  NalogKabinaCardZaObjekat  from '../../../components/tusKabine/NalogKabinaCardZaObjekat';
import EditFormaNalogaTusKabina from '../../../components/forms/EditFormaNalogaTusKabina';
import { promises as fs } from "fs";
import path from "path";



async function getNalogId(id) {
  const res = await fetch(`http://localhost:3000/api/tus-kabine-nalozi/${id}`, 
    {method:"GET"});
  return res.json();
}


async function TusKabineNaloziIdPage({params}) {
  const { id } = await params;
  //const res = await fetch(`http://localhost:3000/api/nalozi/${id}`, {method:"GET"});
  //const nalog = res.json();
  const filePath = path.join(process.cwd(), "data", "tusKabineNalozi.json");
  const fileData = await fs.readFile(filePath, "utf8");
  const nalozi = JSON.parse(fileData);

  //console.log ("NALOZI JE: ", nalozi.findIndex((obj) => obj.id == id))

  const nalog = await getNalogId( id ); // nalog je ovde objekat sa podacima naloga i id-em


  


  return (
    <div className='w-full'>
        <main className='max-w-[1650px] mx-auto mt-20'>
            {/* <div className='px-5'>
              <NalogKabinaCardZaObjekat nalog={nalog} id={id}/>
            </div> */}
            <EditFormaNalogaTusKabina nalog={nalog}/>
        </main>
     
    </div>
  )
}


export default TusKabineNaloziIdPage





