import React from 'react'
import KlijentCard from './KlijentCard'

function KlijentContainer({klijenti, query}) {

    const searchCountries1 = Array.isArray(klijenti) ? klijenti.filter((data) => {
        return data.ime.toLowerCase().includes(query?.toLowerCase()) || 
        data.telefon.toString().toLowerCase().includes(query?.toLowerCase())
    }) : []
    
  return (
    <>
    {query ? 


    <div>
        {Array.isArray(klijenti) && searchCountries1.map((klijent) => {
            return(
                <KlijentCard key={klijent._id} klijent={klijent} ceoObjekat={false}/>
            )
            
        })}
    </div>
    : 
    <div>
        {Array.isArray(klijenti) && klijenti.map((klijent) => {
            return(
                <KlijentCard key={klijent._id} klijent={klijent} ceoObjekat={false}/>
            )
            
        })}
    </div>}
    </>
  )
}

export default KlijentContainer
