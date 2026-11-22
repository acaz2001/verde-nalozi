'use client'
import React from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useDebouncedCallback } from 'use-debounce';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import moment from 'moment';

const meseci = [
  { label: "Januar", value: "januar" },
  { label: "Februar", value: "februar" },
  { label: "Mart", value: "mart" },
  { label: "April", value: "april" },
  { label: "Maj", value: "maj" },
  { label: "Jun", value: "jun" },
  { label: "Jul", value: "jul" },
  { label: "Avgust", value: "avgust" },
  { label: "Septembar", value: "septembar" },
  { label: "Oktobar", value: "oktobar" },
  { label: "Novembar", value: "novembar" },
  { label: "Decembar", value: "decembar" }
]

moment.locale('sr')
let date = moment();
let datum = date.format("MMMM DD YYYY")
let tacanDatum = date.format("MMMM DD YYYY").charAt(0).toLocaleUpperCase()+datum.slice(1)
let mesec = date.format("MMMM")
let tacanMesec = mesec.charAt(0).toLocaleUpperCase()+mesec.slice(1)
console.log("DATE JE search:",tacanMesec);

function Kalendar2() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const [alignItemWithTrigger, setAlignItemWithTrigger] = React.useState(false)


    console.log("KALENDAR SEARCH:" + searchParams.get('query')?.toString())

    const handleSearch = useDebouncedCallback((term) => {
            const params = new URLSearchParams(searchParams);
            //params.set('page', '1');
            if (term) {
                params.set('query', term);
            } else {
                params.delete('query');
            }
            replace(`${pathname}?${params.toString()}`);

            console.log("SELECT:",term)
        }, 100);
    

  return (
    <>
        {/* <select defaultValue={searchParams.get('query')?.toString()} name="meseci" onChange={(e) => {
                    handleSearch(e.target.value)}}>
            {meseci.map((mesec)=> (
                <option value={mesec.value} id={mesec.label} key={mesec.label} 
                //selected={mesec}
                >
                    {mesec.label}
                </option>
            ))}
        </select> */}
    <Select 
    defaultValue={searchParams.get('query')?.toString()} 
        onValueChange={(value) => {
            console.log("TEST",);
            
            handleSearch(value);
        }}>
        <SelectTrigger className="w-full max-w-38 z-50">
            <SelectValue />
        </SelectTrigger>
        <SelectContent position={alignItemWithTrigger ? "item-aligned" : "popper"}>
            <SelectGroup>
            <SelectLabel>Izaberi datum:</SelectLabel>
            {meseci.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                {item.label}
                </SelectItem>
            ))}
            </SelectGroup>
        </SelectContent>
    </Select>
    </>
  )
}

export default Kalendar2
