import React from 'react'
import NalogKartica from './NalogKartica'

function NalogContainer({nalozi,query}) {
  const searchCountries = Array.isArray(nalozi) ? nalozi.filter((data) => {
        return data.ime.toLowerCase().includes(query.toLowerCase()) //|| data.telefon.toString().toLowerCase().includes(query.toLowerCase());
    }) : [];
  
  //const pages = nalozi.length;
  //const perPage = Math.ceil(pages / 32)
  //const start = (Number(currentPage) - 1) * perPage
  //const end = start + perPage
  //const entries = searchCountries.slice(start, end)

const s = searchCountries.map((nalog) => {nalog.ime})

  return (
    <div>
      {
        Array.isArray(nalozi) && searchCountries.map((nalog) => {
          return (
            <NalogKartica key={nalog.id} nalozi={nalog} />      
          )
        })}
    </div>
  )
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