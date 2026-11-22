'use client'
import React from "react";
import { cn } from "cn";
import { useSearchParams } from "next/navigation";

export default function UkupnaZaradaOdNalogaZaMesec({tekst, valuta, className, nalozi}) {
 const searchParams = useSearchParams();
 const query = searchParams.get('query')

  let sum = 0;
  const naloziMeseci = nalozi.filter((l) => l.datum.includes(query));
  const uradjeniNalozi = naloziMeseci.filter((el) => el.stanjeNaloga === 'uradjen')
  const ceneUradjenihNaloga = uradjeniNalozi.flatMap((m) => m.ukupnaCena || m.cena)

  for (let i = 0; i < ceneUradjenihNaloga.length; i++) {
      sum += ceneUradjenihNaloga[i]
  }

  console.log('ceneUradjenihNaloga', uradjeniNalozi);
  

  return (
    <h1>
        {tekst} {sum} {valuta}
    </h1>
  )
}