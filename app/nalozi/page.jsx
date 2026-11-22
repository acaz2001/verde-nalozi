import React from "react"
import Kalendar2 from "../../components/Kalendar2"
import Search from "../../components/Search"
import NalogMain from "../../components/NalogMain"

async function getPosts() {
  const res = await fetch("http://localhost:3000/api/nalozi", {method:"GET"});
  console.log("DS:", res);
  
  return res.json();
}

export default async function Nalozi(props) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query;
  const query2 = searchParams?.pretraga;
  //const currentPage = Number(searchParams?.page) || 1;

  console.log("QUERIS ARE:"+ query)

    const nalozi =  await getPosts(); // nalozi je array of objects

    //console.log("NALOZI SU:"+ JSON.stringify(nalozi[0]))

  return (
    <div>
      <div className="max-w-[1650px] mx-auto">
          <div className="flex flex-row justify-between md:p-5 p-5 items-end md:gap-5 gap-5">
            <div className="flex flex-col items-start gap-2.5 z-50 w-full">
              <label for="name">Pretraži nalog:</label>
              <Search placeholder={"Pretraži nalog po imeni ili br. telefona..."} />
            </div>
            <Kalendar2 />
          </div>
          
          <div className="px-5">
            <NalogMain nalozi={nalozi} query={query} query2={query2}/>
          </div>
          
      </div>
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