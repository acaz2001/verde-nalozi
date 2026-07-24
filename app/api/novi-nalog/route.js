import { NextResponse } from "next/server";
import { formSchema } from "../../../lib/types";

export async function POST(request) {
    const data = await request.json();

    const result = formSchema.safeParse(data);

    // check out Zod's .flatten() method for an easier way to process errors
    let zodErrors = {};
    if (!result.success) {
        result.error.issues.forEach((issue) => {
        zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
        });
    }
        
    const json = JSON.stringify(data)

    console.log("SERVE DATA JE" + json)


    const {ime,proizvod,obrada,sirina,duzina,rupa,brojRupa} = data;


    return NextResponse.json( {ime,proizvod,obrada,sirina,duzina,rupa,brojRupa} )

    
}


export async function GET(request) {
    const res = await fetch('http://localhost:3000/api/novi-nalog', {
    method:"GET",
    body: JSON.stringify
  })
  const data = await res.json()
 
  //return Response.json({ data })
    
return NextResponse.json({ message: 'Hello, World!', proizvod: 'Flot 4mm', obrada: "KP obrada" });

}
