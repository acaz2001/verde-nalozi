import React from 'react'
import NalogKabinaCard from './NalogKabinaCard'

function NalogKabinaContainer({nalozi,query}) {
    const searchCountries = Array.isArray(nalozi) ? nalozi.filter((data) => {
        return data.ime.toLowerCase().includes(query.toLowerCase()) //|| data.telefon.toString().toLowerCase().includes(query.toLowerCase());
    }) : [];
    const s = searchCountries.map((nalog) => {nalog.ime})

    return (
        <div>
            {
            Array.isArray(nalozi) && searchCountries.map((nalog) => {
            return (
                <NalogKabinaCard key={nalog.id} nalozi={nalog} />      
            )
            })}
        </div>
    )
}

export default NalogKabinaContainer
