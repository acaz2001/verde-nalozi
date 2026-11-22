import React from 'react'
import NalogKartica from './NalogKartica'

function NalogContainer({nalozi,query,query2, aktivnostDugmeta}) {

  const filterNalozi = nalozi.filter((word) => word.stanjeNaloga === 'nijeUradjen')

  if(!aktivnostDugmeta) {
      if (query && !query2 ) {     
                
                    const searchCountries1 = Array.isArray(nalozi) ? nalozi.filter((data) => {
                    return data.datum.toLowerCase().includes(query.toLowerCase() )   
                }) : [];
                    
                return (
                    <div className='z-10'>
                        {
                        Array.isArray(nalozi) && searchCountries1.map((nalog) => {
                        return (
                            <NalogKartica key={nalog._id} nalozi={nalog} />      
                        )
                        })}
                    </div>
                )
            } 
    
            if (query && query2) {
                const searchCountries = Array.isArray(nalozi) ? nalozi.filter((data) => {
                    return data.ime.toLowerCase().includes(query.toLowerCase() && query2.toLowerCase()) ||
                    data.datum.toLowerCase().includes(query.toLowerCase() && query2.toLowerCase()) ||
                    data.brojTelefona.toString().toLowerCase().includes(query.toLowerCase() && query2.toLowerCase()) ||
                    data.ime.toLowerCase().includes(query.toLowerCase() && query2.toLowerCase())
                }) : [];
                
                return (
                    <div>
                        {
                        Array.isArray(nalozi) && searchCountries.map((nalog) => {
                        return (
                            <NalogKartica key={nalog._id} nalozi={nalog} />      
                        )
                        })}
                    </div>
                )
            }
  }
  else {
    if (query && !query2 ) {     
                
            const searchCountries1 = Array.isArray(filterNalozi) ? filterNalozi.filter((data) => {
            return data.datum.toLowerCase().includes(query.toLowerCase() )   
        }) : [];
            
        return (
            <div className='z-10'>
                {
                Array.isArray(filterNalozi) && searchCountries1.map((nalog) => {
                return (
                    <NalogKartica key={nalog._id} nalozi={nalog} />      
                )
                })}
            </div>
        )
    } 

    if (query && query2) {
        const searchCountries = Array.isArray(filterNalozi) ? filterNalozi.filter((data) => {
            return data.ime.toLowerCase().includes(query.toLowerCase() && query2.toLowerCase()) ||
            data.datum.toLowerCase().includes(query.toLowerCase() && query2.toLowerCase()) ||
            data.brojTelefona.toString().toLowerCase().includes(query.toLowerCase() && query2.toLowerCase()) ||
            data.ime.toLowerCase().includes(query.toLowerCase() && query2.toLowerCase())
        }) : [];
        
        return (
            <div>
                {
                Array.isArray(filterNalozi) && searchCountries.map((nalog) => {
                return (
                    <NalogKartica key={nalog._id} nalozi={nalog} />      
                )
                })}
            </div>
        )
    }
  }
}

export default NalogContainer


{/*
  import React from 'react'
import NalogKartica from './NalogKartica'

function NalogContainer({nalozi,query,currentPage}) {
  const searchCountries = Array.isArray(nalozi) ? nalozi.filter((data) => {
        //return data.name.toLowerCase().includes(query.toLowerCase()) || data.region.toLowerCase().includes(query.toLowerCase());
        return data.name
    }) : [];
  
  const pages = nalozi.length;
  const perPage = Math.ceil(pages / 32)
  const start = (Number(currentPage) - 1) * perPage
  const end = start + perPage
  const entries = searchCountries.slice(start, end)



  return (
    <div>
      {nalozi.map (nalog => <NalogKartica key={nalog.id} nalozi={nalog}
      />)}
    </div>
  )
}

export default NalogContainer
 */}