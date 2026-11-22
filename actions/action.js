"use server"
import { promises as fs } from "fs";
//import { redirect } from "next/navigation";
//import { NextResponse } from "next/server";
import path from "path";
//import { file } from "zod";
import { revalidateTag, revalidatePath } from 'next/cache'
import { NextResponse } from "next/server";
import KabineNalozi from "../lib/models/KabineNalozi";
import Nalozi from "../lib/models/Nalozi";
import Klijent from "../lib/models/Klijent"
import dbConnect from "../lib/db";
import { toast } from "sonner";


const filePath = path.join(process.cwd(), "data", "tusKabineNalozi.json");
const fileData = await fs.readFile(filePath, "utf8");
const nalozi = JSON.parse(fileData);

const klijetiPath = path.join(process.cwd(), "data", "klijenti.json");
const klijentiFileData = await fs.readFile(klijetiPath, "utf8");
const klijenti = JSON.parse(klijentiFileData);


export async function promenaStanjaNaloga(id) {
    // id === 5
    try{

      await dbConnect();
      await KabineNalozi.findByIdAndUpdate(id,{stanjeNaloga: "uradjen"})
      revalidatePath('/tus-kabine-nalozi')
      
      return NextResponse.json({ message: "Task updated successfully" }, { status: 200 });

    } catch(error) {
      console.error("Error updating task:", error);
      return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
    }
    //const tacanNalogId = KabineNalozi.findById(id)
    //nalozi.find((nalog) => nalog.id == id);
    //const index = nalozi.findIndex((nalog) => nalog.id == id);
    
    

    // if (index !== -1) {
    // nalozi[index] = {
    //   ...nalozi[index],
    //   stanjeNaloga: 'uradjen'
    // };

    // //console.log("NOVI OBJEKAT:", {...nalozi[index], stanjeNaloga: 'uradjen'} );

    // await fs.writeFile(
    //   filePath,
    //   JSON.stringify(nalozi, null, 2)
    // );

    // //revalidatePath('/tus-kabine-nalozi')
    // //

    
  }


export async function promenaStanjaNalogaNijeUradjen(id) {
  try{

      await dbConnect();
      await KabineNalozi.findByIdAndUpdate(id,{stanjeNaloga: "nijeUradjen"})
      revalidatePath('/tus-kabine-nalozi')
      
      return NextResponse.json({ message: "Task updated successfully" }, { status: 200 });

    } catch(error) {
      console.error("Error updating task:", error);
      return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
    }
  //   // id === 5
  //   const tacanNalogId = nalozi.find((nalog) => nalog.id == id);
  //   const index = nalozi.findIndex((nalog) => nalog.id == id);

  //   if (index !== -1) {
  //   nalozi[index] = {
  //     ...nalozi[index],
  //     stanjeNaloga: 'nijeUradjen'
  //   };

  //   //console.log("NOVI OBJEKAT:", {...nalozi[index], stanjeNaloga: 'uradjen'} );

  //   await fs.writeFile(
  //     filePath,
  //     JSON.stringify(nalozi, null, 2)
  //   );

  //   //revalidatePath('/tus-kabine-nalozi')
  //   // revalidateTag('nalozi')

  //   return Response.json(nalozi[index], {
  //     status: 200
  //   });
    
  // }

  // return Response.json(
  //   { message: "Nalog nije pronađen" },
  //   { status: 404 }
  // );
    
}


//-------------NALOZI-------------------
export async function naloziPromenaStanjaNaloga(id) {
    try{

      await dbConnect();
      await Nalozi.findByIdAndUpdate(id,{stanjeNaloga: "uradjen"})
      revalidatePath('/nalozi')
      
      return NextResponse.json({ message: "Task updated successfully" }, { status: 200 });

    } catch(error) {
      console.error("Error updating task:", error);
      return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
    }
  }

export async function naloziPromenaStanjaNalogaNijeUradjen(id) {
  try{

      await dbConnect();
      await Nalozi.findByIdAndUpdate(id,{stanjeNaloga: "nijeUradjen"})
      // toast("Uspešno urađen nalog!")
      revalidatePath('/nalozi')
      
      return NextResponse.json({ message: "Task updated successfully" }, { status: 200 });

    } catch(error) {
      console.error("Error updating task:", error);
      return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
    }
}

//--------------KLIJENT------------------
export async function fetchKlijenti() {
  //console.log("SERVER KLIJENTI2:" ,NextResponse.json(klijenti));
  await dbConnect()
  const klijenti = await Klijent.find()
  return NextResponse.json(klijenti)
  
  
}

export async function getKlijentId(id){
  await dbConnect()
  const klijent = await Klijent.findById(id)
  return NextResponse.json(klijent)

}