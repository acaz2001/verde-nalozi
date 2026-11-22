'use client'
import React from 'react'
import FliterDugmeUredjeniNalozi from '../klijenti/FliterDugmeUredjeniNalozi'
import NalogKabinaContainer from './NalogKabinaContainer'
import UkupanBrojNalogaZaMesec from '../UkupanBrojNalogaZaMesec'
import UkupnaZaradaOdNalogaZaMesec from '../smallUi/UkupnaZaradaOdNalogaZaMesec'

function NalogKabineMain({kabineNalozi, query, query2}) {
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
    <div className='flex flex-col items-start w-full'>
      <FliterDugmeUredjeniNalozi setAktivnostDugmeta={handleAktivnostDugmeta}/>
      <UkupanBrojNalogaZaMesec nalozi={kabineNalozi} query={query} tekst={"Ukupan broj naloga za mesec"}/>
      <UkupnaZaradaOdNalogaZaMesec nalozi={kabineNalozi} tekst={"Ukupna zarada od naloga za ovaj mesec:"} valuta={"€"}/>
      <NalogKabinaContainer nalozi={kabineNalozi} query={query} query2={query2}
       aktivnostDugmeta={aktivnostDugmeta}/>
    </div>
  )
}

export default NalogKabineMain


