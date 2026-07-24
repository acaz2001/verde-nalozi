import { z } from "zod";

export const formSchema = z
  .object({
    ime: z
      .string()
      .min(3, "Ime must be at least 3 characters.")
      .max(10, "Ime must be at most 10 characters.")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Ime mogu biti samo slova ne i brojevi."
      ),
      proizvod: z
          .string()
          .min(1, "Obavezno je izabrati proizvod!")
          .refine((val) => val !== "auto", {
          message:
              "Obavezno je izabrati proizvod!",
      }),
      obrada: z
          .string()
          .min(1, "Obavezno je izabrati obradu!")
          .refine((val) => val !== "auto", {
          message:
              "Obavezno je izabrati obradu!",
      }),
      sirina: z
      .coerce.number().refine((val) => val !== 0, {
          message:
              "Obavezno je uneti sirinu!",
      })
  
      ,
      duzina: z
      .coerce.number()
      .refine((val) => val !== 0, {
          message:
              "Obavezno je uneti duzinu!",
      })
      ,
  
      rupa: z.array(
          z.object({
          fiRupe: z
              .string()
              .min(1, "Izaberi fi rupe")
              .refine((val) => val !== "auto", {
              message: "Izaberi konkretnu opciju",
              }),
          })
      ),
  
      brojRupa: z
      .coerce.number()
  });
