import React from "react"
import Charts from "../../components/charts/Charts"
import NalogKartica from "../../components/NalogKartica"
import Kalendar from "../../components/Kalendar"
import { Award } from "lucide-react";
import NalogContainer from "../../components/NalogContainer";
import Search from "../../components/Search"
import NalogKabinaContainer from "../../components/tusKabine/NalogKabinaContainer";
import Link from "next/link";
import { Button } from "../../components/ui/button";


async function getPosts() {
  const res = await fetch("http://localhost:3000/api/tus-kabine-nalozi", {method:"GET"});
  return res.json();
}

async function TusKabineNaloziPage(props) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const nalozi = await getPosts();


  return (
    <div>
        <div className="flex flex-row justify-between p-5 items-end">
          <div className="flex flex-col items-start gap-2.5">
            <label for="name">Pretraži nalog:</label>
            <Search placeholder={"Pretraži nalog po imeni ili br. telefona..."} />
          </div>
          <Kalendar />
        </div>
        <div className="pl-5 mb-5">  
          <Link href={'/tus-kabine-novi-nalog'}>
              <Button className="cursor-pointer">
                  Napravi novi nalog za tuš kabinu.
              </Button>
          </Link>
        </div>
        
        {/*<Nalozi nalozi={nalozi}/>*/}
        
        <div className="px-5">
          <NalogKabinaContainer query={query} nalozi={nalozi}/>
         
        </div>
        {/*<NalogKartica data={nalozi}/>*/}
        
    </div>
  )
}

export default TusKabineNaloziPage
