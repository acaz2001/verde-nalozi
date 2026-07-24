import React from "react"
import Charts from "../../components/charts/Charts"
import NalogKartica from "../../components/NalogKartica"
import Kalendar from "../../components/Kalendar"
import { Award } from "lucide-react";
import NalogContainer from "../../components/NalogContainer";
import Search from "../../components/Search"

async function getPosts() {
  const res = await fetch("http://localhost:3000/api/nalozi", {method:"GET"});
  return res.json();
}

export default async function Nalozi(props) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  //const currentPage = Number(searchParams?.page) || 1;

  console.log("QUERIS ARE:"+ query)

    const nalozi = await getPosts();

    //console.log("NALOZI SU:"+nalozi)

  return (
    <div>
        <div className="flex flex-row justify-between p-5 items-end">
          <div className="flex flex-col items-start gap-2.5">
            <label for="name">Pretraži nalog:</label>
            <Search placeholder={"Pretraži nalog po imeni ili br. telefona..."} />
          </div>
          <Kalendar />
        </div>
        
        {/*<Nalozi nalozi={nalozi}/>*/}
        
        <div className="px-5">
          <NalogContainer query={query} nalozi={nalozi}/>
        </div>
        {/*<NalogKartica data={nalozi}/>*/}
        
    </div>
  )
}


{/*
import React from "react"
import Charts from "../../components/charts/Charts"
import NalogKartica from "../../components/NalogKartica"
import Kalendar from "../../components/Kalendar"
import { Award } from "lucide-react";
import NalogContainer from "../../components/NalogContainer";


async function getPosts() {
  const res = await fetch("http://localhost:3000/api/nalozi", {method:"GET"});
  return res.json();
}

export default async function Nalozi() {

    const nalozi = await getPosts();

    console.log("NALOZI SU:"+nalozi)

  return (
    <div>
        <Kalendar />
        <div>
          <label for="name">Pretraži nalog:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            size="10"
            className="border-2" />
        </div>
        
        <NalogContainer nalozi={nalozi}/>
        
        
    </div>
  )
}
  
*/}