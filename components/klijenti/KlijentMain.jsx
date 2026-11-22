'use client'
import React from 'react'
import FliterDugmeUredjeniNalozi from './FliterDugmeUredjeniNalozi'
import KlijentNaloziContainer, { KlijentKabineNaloziContainer } from './KlijentNaloziContainer'

function KlijentMain({klijentNalozi, kabineNalozi}) {
    const [aktivnostDugmeta, setAktivnostDugmeta] = React.useState(true)
    const handleAktivnostDugmeta = () => {
        if (!aktivnostDugmeta) {
        setAktivnostDugmeta(true)
        }
        else {
        setAktivnostDugmeta(false)
        }
        
    }
    
    console.log('aktivnostDugmeta', aktivnostDugmeta);


  return (
    <div>
      <FliterDugmeUredjeniNalozi setAktivnostDugmeta={handleAktivnostDugmeta}/>
      <KlijentNaloziContainer nalozi={klijentNalozi} aktivnostDugmeta={aktivnostDugmeta}/>
      <KlijentKabineNaloziContainer nalozi={kabineNalozi} aktivnostDugmeta={aktivnostDugmeta}/>
    </div>
  )
}

export default KlijentMain
