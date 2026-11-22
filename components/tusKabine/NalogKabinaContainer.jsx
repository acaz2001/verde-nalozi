import NalogKabinaCard from './NalogKabinaCard'

function NalogKabinaContainer({nalozi,query,query2, aktivnostDugmeta}) {

  const filterNalozi = nalozi.filter((word) => word.stanjeNaloga === 'nijeUradjen')

    if(!aktivnostDugmeta) {
        if (query && !query2 ) {     
            
                const searchCountries1 = Array.isArray(nalozi) ? nalozi.filter((data) => {
                return data.datum.toLowerCase().includes(query.toLowerCase() )   
            }) : [];
                
            return (
                <div className='w-full'>
                    {
                    Array.isArray(nalozi) && searchCountries1.map((nalog) => {
                    return (
                        <NalogKabinaCard key={nalog._id} nalozi={nalog} />      
                    )
                    })}
                </div>
            )
        } 
    
        if (query && query2) {
            const searchCountries = Array.isArray(nalozi) ? nalozi.filter((data) => {
                return data.ime.toLowerCase().includes(query.toLowerCase() && query2.toLowerCase()) ||
                data.datum.toLowerCase().includes(query.toLowerCase() && query2.toLowerCase()) ||
                data.telefon.toString().toLowerCase().includes(query.toLowerCase() && query2.toLowerCase()) ||
                data.ime.toLowerCase().includes(query.toLowerCase() && query2.toLowerCase())
            }) : [];
            
            return (
                <div>
                    {
                    Array.isArray(nalozi) && searchCountries.map((nalog) => {
                    return (
                        <NalogKabinaCard key={nalog._id} nalozi={nalog} />      
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
                <div className='w-full'>
                    {
                    Array.isArray(filterNalozi) && searchCountries1.map((nalog) => {
                    return (
                        <NalogKabinaCard key={nalog._id} nalozi={nalog} />      
                    )
                    })}
                </div>
            )
        } 
    
        if (query && query2) {
            const searchCountries = Array.isArray(filterNalozi) ? filterNalozi.filter((data) => {
                return data.ime.toLowerCase().includes(query.toLowerCase() && query2.toLowerCase()) ||
                data.datum.toLowerCase().includes(query.toLowerCase() && query2.toLowerCase()) ||
                data.telefon.toString().toLowerCase().includes(query.toLowerCase() && query2.toLowerCase()) ||
                data.ime.toLowerCase().includes(query.toLowerCase() && query2.toLowerCase())
            }) : [];
            
            return (
                <div>
                    {
                    Array.isArray(filterNalozi) && searchCountries.map((nalog) => {
                    return (
                        <NalogKabinaCard key={nalog._id} nalozi={nalog} />      
                    )
                    })}
                </div>
            )
        }
    }


    
    //const s = searchCountries.map((nalog) => {nalog.ime})

    

    
}

export default NalogKabinaContainer
