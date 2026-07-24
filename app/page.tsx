import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Charts from "../components/charts/Charts"
import Kontent, { CrveniSpan, CrveniTekst, KosiTekst, LinijaOdvajanja, Lista, ListaBrojevi, Naslov, 
NaslovListe, PodebljaniTekst, PodebljanPodNaslov, PodNaslov, Span, Tekst } from "../components/typography/Kontent"


export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-[1650px] flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <section>
          <Naslov className={''}>Nalozi Ovaj Mesec</Naslov>
        </section>
        <Charts />
      </main>
    </div>
  );
}
