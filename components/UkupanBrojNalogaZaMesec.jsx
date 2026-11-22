import React from 'react';
import { cn } from 'cn'

export default function UkupanBrojNalogaZaMesec ({nalozi, query, className, tekst}) {
  let el = nalozi.map((el) => el.datum)
  let brojNalogaPoDatumu = el.filter((e) => e.includes(query));


  return (
    <div className={cn("pt-3", className)}>
      <h1>{tekst} {query}: 
        <span className="pl-2">
          {brojNalogaPoDatumu.length}
        </span>
      </h1>
    </div>
  )
}