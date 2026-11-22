import { id } from "date-fns/locale";
import mongoose, {Document,Schema,Types} from "mongoose";
import { type } from "os";

const NaloziSchema = new Schema({
    ime: String,
    brojTelefona: Number,
    stanjeNaloga: String,
    datum: String,
    proizvod: [{
        imeProizvoda: String,
        obradaProizvoda: String,
        sirinaProizvoda: Number,
        duzinaProizvoda: Number,
        uslugaProizvoda: String,
        slikaProizvoda: String,
        brojKomadaProizvoda: Number,
        rupe: [{
            fiRupe: String,
            brojRupa: Number
        }],
        napomenaProizvoda: String,
        dodatnoZaNaplatuProizvod: Number,
        napomenaZaDodatnuCenuProizvoda: String,
        cena: Number  
    }],
    ram: [{
        staklo: String,
        sifraRama: String,
        sirina: Number,
        duzina: Number,
        brojKomadaRamova: Number,
        paspatuBoja: String,
        //paspatuCena: Number,
        napomena: String,
        dodatnaCena: Number,
        dodatnaCenaNapomena: String,
        cenaRama: Number
    }],
    ukupnaCena: Number
})

export default mongoose.models.Nalozi || mongoose.model('Nalozi', NaloziSchema)