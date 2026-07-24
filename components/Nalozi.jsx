'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import Search from '../components/Search'
import NalogContainer from './NalogContainer'
import {useSearchParams} from 'next/navigation'

function Nalozi({nalozi}) {
    const [profileData, setProfileData] = useState([])
    
    const searchParams = useSearchParams()

    const searchQuery = searchParams && searchParams.get("q");
    
    useEffect(() => {

    const handleSearch = () => {

      // Filter the data based on search query

      const findUser = nalozi.filter((nalog) => {

        if (searchQuery) {

          return (


 nalog.ime.toLowerCase().includes(searchQuery.toLowerCase()) ||

            nalog.proizvod.toLowerCase().includes(searchQuery.toLowerCase()) ||

            nalog.telefon.toLowerCase().includes(searchQuery.toLowerCase()) ||

            nalog.obrada.toLowerCase().includes(searchQuery.toLowerCase())

          );

        } else {

          // If no search query, return the original data

          return true;

        }

      });


      // Update profileData based on search results

      setProfileData(findUser);

    };


    // Call handleSearch when searchQuery changes

    handleSearch();

  }, [searchQuery]);

    const totalUser = profileData.length;

    return (
        <>
            <Search defaultValue={searchQuery} />
        </>
    )
}

export default Nalozi





{/*
'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import Search from '../components/Search'
import NalogContainer from './NalogContainer'


function Nalozi({nalozi}) {
    const [searchTerm, setSearchTerm] = useState(() => {
        return ""
    })
    const [foundUsers, setFoundUsers] = useState(() => {
        return []
    })

    const searchUser = (e) => {
        setSearchTerm(prevState => console.log(e.target.value))
    };

    useEffect(() => {
        setFoundUsers(
            nalozi.filter( nalog => {
        return nalog.ime.toLowerCase().includes(searchTerm.toLowerCase())}
        ))
    }, [searchTerm, nalozi])
  return (
    <div>
      <Search searchUser={searchUser}/>
      {foundUsers.length !== 0 ?
     <NalogContainer nalozi={foundUsers} />
    : foundUsers.length === 0 ?
     <h1> No Result </h1>
    :
     <NalogContainer nalozi={nalozi} />}
      
    </div>
  )
}

export default Nalozi

*/}
