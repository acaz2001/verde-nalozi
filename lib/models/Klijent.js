import { id } from "date-fns/locale";
import mongoose, {Document,Schema,Types} from "mongoose";
import { ref } from "process";
import KabineNalozi from "./KabineNalozi";
import Nalozi from "./Nalozi";
import dbConnect from "../db";


export async function fetchKlijenti() {
  //console.log("SERVER KLIJENTI2:" ,NextResponse.json(klijenti));
  await dbConnect()
  const nalozi = await Nalozi.find()
  return NextResponse.json(nalozi)
  
  
}



const KlijentSchema = new Schema({
    ime: String,
    telefon: Number,
    vrstaNaloga: String,
    pibFirme: Number,
    adresaFirme: String,
    //nalozi:{type: [{}], ref: KabineNalozi},
    // kabineNalozi: {type: Schema.Types.ObjectId, ref: KabineNalozi},
    nalozi: {type: Schema.Types.ObjectId, ref: "Nalozi"}

})

export default mongoose.models.Klijent || mongoose.model('Klijent', KlijentSchema)