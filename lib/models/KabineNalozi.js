import { id } from "date-fns/locale";
import mongoose, {Document,Schema,Types} from "mongoose";

const KabineNaloziSchema = new Schema({
    ime: String,
    telefon: String,
    modelKabine: String,
    sirina: Number,
    duzina: Number,
    visina: Number,
    brojKabina: Number,
    bojaStakla: String,
    bojaOkova: String,
    montaza: String,
    napomena: String,
    cena: Number,
    dodatniTroskovi: Number,
    dodatniTroskoviNapomena: String,
    datum: String,
    stanjeNaloga: String,
})

export default mongoose.models.KabineNalozi || mongoose.model('KabineNalozi', KabineNaloziSchema)