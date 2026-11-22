import React from 'react'
import NalogKartica from '../NalogKartica'
import NalogKabinaCard from '../tusKabine/NalogKabinaCard'

function KlijentNaloziContainer({nalozi, aktivnostDugmeta}) {
  
  const filterNalozi = nalozi.filter((word) => word.stanjeNaloga === 'nijeUradjen')
  
  console.log('nalozi kv', filterNalozi);

  if(!aktivnostDugmeta) {
    return (
      <div className='max-w-[1650px] mx-auto'>
        {nalozi.map((n) => {
          return (
              <div key={n._id}>
                  <NalogKartica nalozi={n} key={n._id}/>
              </div>    
          )
        })}
      </div>
    )
  } 
  else {
    return (
      <div className='max-w-[1650px] mx-auto'>
        {filterNalozi.map((m) => {
          return (
            <div key={m._id}>
              <NalogKartica nalozi={m} key={m._id}/>
            </div>
          )
        })}
      </div>
    )
  }
}

export default KlijentNaloziContainer


export function KlijentKabineNaloziContainer({nalozi, aktivnostDugmeta}) {
  const filterNalozi = nalozi.filter((word) => word.stanjeNaloga === 'nijeUradjen')

  if(!aktivnostDugmeta) {
    return (
      <div className='max-w-[1650px] mx-auto'>
        {nalozi.map((n) => {
          return (
              <div key={n._id}>
                  <NalogKabinaCard nalozi={n} key={n._id}/>
              </div>    
          )
        })}
      </div>
    )
  }
  else {
    return (
      <div className='max-w-[1650px] mx-auto'>
        {filterNalozi.map((m) => {
          return (
            <div key={m._id}>
              <NalogKabinaCard nalozi={m} key={m._id}/>
            </div>
          )
        })}
      </div>
    )
  }
}
