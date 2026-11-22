'use client'
import React from 'react'
import FliterDugmeUredjeniNalozi from '../components/klijenti/FliterDugmeUredjeniNalozi'
import NalogContainer from './NalogContainer'
import UkupanBrojNalogaZaMesec from '../components/UkupanBrojNalogaZaMesec'
import UkupnaZaradaOdNalogaZaMesec from '../components/smallUi/UkupnaZaradaOdNalogaZaMesec'

function NalogMain({nalozi, query, query2}) {
    const [aktivnostDugmeta, setAktivnostDugmeta] = React.useState(true)
    const handleAktivnostDugmeta = () => {
        if (!aktivnostDugmeta) {
        setAktivnostDugmeta(true)
        }
        else {
        setAktivnostDugmeta(false)
        }
        
    }


  return (
    <div className='w-full'>
      <FliterDugmeUredjeniNalozi setAktivnostDugmeta={handleAktivnostDugmeta}/>
      <UkupanBrojNalogaZaMesec nalozi={nalozi} query={query} tekst={"Ukupan broj naloga za mesec"} />
      <UkupnaZaradaOdNalogaZaMesec nalozi={nalozi} tekst={"Ukupna zarada od naloga za ovaj mesec:"} valuta={"RSD"}/>
      <NalogContainer nalozi={nalozi} query={query} query2={query2}
       aktivnostDugmeta={aktivnostDugmeta}/>
    </div>
  )
}

export default NalogMain

