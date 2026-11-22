export const proizvodi = [
  { label: "Flot 2mm", value: "flot2mm", 
    obrade: [{ime: "Seceno na meru", value:"flot2mm-seceno", cena: 2000},
              {ime: "KP Obrada", value: "flot2mm-obradaKp", cena: 2200}] ,
    uslugeProizvoda :[
      {ime: "Preuzimanje u radnji", value: "flot2mm-preuzimanjeRadnja", cena: 0}, 
      {ime: "Montaža u radnji", value: "flot2mm-montazaRadnja", cena: 500},
      {ime: "Reparacija u radnji", value: "flot2mm-reparacijaRadnja", cena: 700}
    ]
  },
  { label: "Flot 3mm", value: "flot3mm" ,
    obrade: [{ime: "Seceno na meru", value:"flot3mm-seceno", cena: 2200},
            {ime: "KP Obrada", value: "flot3mm-obradaKp", cena: 2400}],
    uslugeProizvoda :[
      {ime: "Preuzimanje u radnji", value: "flot3mm-preuzimanjeRadnja", cena: 0}, 
      {ime: "Montaža u radnji", value: "flot3mm-montazaRadnja", cena: 800},
      {ime: "Reparacija u radnji", value: "flot3mm-reparacijaRadnja", cena: 1000},
      {ime: "Reparacija teren", value: "flot3mm-reparacijaTeren", cena: 1400}
    ]
  },
  { label: "Flot 4mm", value: "flot4mm" ,
    obrade: [{ime: "Seceno na meru", value:"flot4mm-seceno", cena: 2400},
            {ime: "KP Obrada", value: "flot4mm-obradaKp", cena: 2600},
            {ime: "Kaljeno", value: "flot4mm-kaljeno", cena: 3600}
          ],
    uslugeProizvoda :[
      {ime: "Preuzimanje u radnji", value: "flot4mm-preuzimanjeRadnja", cena: 0}, 
      {ime: "Montaža u radnji", value: "flot4mm-montazaRadnja", cena: 1000},
      {ime: "Reparacija u radnji", value: "flot4mm-reparacijaRadnja", cena: 1200},
      {ime: "Reparacija teren", value: "flot4mm-reparacijaTeren", cena: 1200}
    ]
  },
  { label: "Flot 5mm", value: "flot5mm" ,
    obrade: [{ime: "Seceno na meru", value:"flot5mm-seceno", cena:3000},
      {ime: "KP Obrada", value: "flot5mm-obradaKp", cena: 3200}
    ],
    uslugeProizvoda :[
      {ime: "Preuzimanje u radnji", value: "flot5mm-preuzimanjeRadnja", cena: 500}, 
      {ime: "Montaža u radnji", value: "flot5mm-montazaRadnja", cena: 1000},
      {ime: "Reparacija u radnji", value: "flot5mm-reparacijaRadnja", cena: 1200},
      {ime: "Reparacija teren", value: "flot5mm-reparacijaTeren", cena: 1200}
    ]
  },
  { label: "Flot 6mm", value: "flot6mm" ,
    obrade: [{ime: "Seceno na meru", value:"flot6mm-seceno", cena: 3200},{ime: "KP Obrada", value: "flot6mm-obradaKp", cena:3400}],
    uslugeProizvoda :[
      {ime: "Preuzimanje u radnji", value: "flot6mm-preuzimanjeRadnja", cena: 500}, 
      {ime: "Montaža u radnji", value: "flot6mm-montazaRadnja", cena: 1000},
      {ime: "Reparacija u radnji", value: "flot6mm-reparacijaRadnja", cena: 1200},
      {ime: "Reparacija teren", value: "flot6mm-reparacijaTeren", cena: 1200}
    ]
  },
  { label: "Flot 8mm", value: "flot8mm" ,
    obrade: [{ime: "Seceno na meru", value:"flot8mm-seceno", cena: 4500},{ime: "KP Obrada", value: "flot8mm-obradaKp", cena: 4700}],
    uslugeProizvoda :[{}] 
  },
  { label: "Flot 10mm", value: "flot10mm" ,
    obrade: [{ime: "Seceno na meru", value:"flot10mm-seceno", cena: 5000},{ime: "KP Obrada", value: "flot10mm-obradaKp", cena: 5200}],
    uslugeProizvoda :[{}] 
  },
] 

export const obrada = [
  { label: "Seceno na meru", value: "seceno" },
  { label: "KP Obrada", value: "obradaKp" },
  { label: "Kaljeno", value: "kaljeno" },
  { label: "Fazeta 5mm", value: "fazeta-5" },
  { label: "Fazeta 10mm", value: "fazeta-10" },
] 

export const rupe = [
  { label: "⌀8mm", value: "rupa-8mm", cena: 100 },
  { label: "⌀10mm", value: "rupa-10mm", cena:200 },
  { label: "⌀12mm", value: "rupa-12mm", cena:300 },
] 

export const uslugaProizvoda = [
  { label: "Preuzimanje u radnji", value: "preuzimanjeRadnja"},
  { label: "Montaža u radnji", value: "montazaRadnja"},
  { label: "Dostava na adresu", value: "dostavaAdresa"},
  { label: "Reparacija u radnji", value: "reparacijaRadnja"},
  { label: "Reparacija teren", value: "reparacijaTeren"},
]

export const ramSifra = [
  {label: "720-55", value: "720-55", cena: 950},
  {label: "620-55", value: "620-55", cena: 1250},
  {label: "031-22", value: "031-22", cena: 550},
  {label: "121-22", value: "121-22", cena: 600},
  {label: "250-22", value: "250-22", cena: 1000},
  {label: "950-15", value: "950-15", cena: 2000},
  {label: "960-88", value: "960-88", cena: 2500},
]

export const ramStaklo = [
    { label: "Flot 2mm", value: "flot2mm-seceno", obrade: [{ime: "Seceno na meru", value:"flot2mm-seceno", cena: 2000},{ime: "KP Obrada", value: "flot2mm-obradaKp", cena: 2200}] },
    { label: "Antirefleks 2mm", value: "antirefleks2mm", obrade: [{ime: "Seceno na meru", value:"antirefleks2mm", cena: 4500}] },
    { label: "Ogledalo 4mm", value: "ogledalo4mm", obrade: [{ime: "Seceno na meru", value:"ogledalo4mm", cena: 4000}] },
    { label: "Ogledalo Bronza 4mm", value: "ogledaloBronza4mm", obrade: [{ime: "Seceno na meru", value:"ogledaloBronza4mm", cena: 6000}] },
    { label: "Ogledalo Sivo 4mm", value: "ogledaloSivo4mm", obrade: [{ime: "Seceno na meru", value:"ogledaloSivo4mm", cena: 6000}] },
]

export const paspatuBoja = [
  {label: "720-55", value: "720-55", cena: 600},
  {label: "720-56", value: "720-56", cena: 500},
  {label: "720-57", value: "720-57", cena: 500},
  {label: "720-58", value: "720-58", cena: 500},
]