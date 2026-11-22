'use client'
import React, { useState } from 'react'
import { Switch } from "../ui/switch"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field"

function FliterDugmeUredjeniNalozi({setAktivnostDugmeta}) {
    

    
    

  return (
    <FieldGroup className="w-full max-w-sm cursor-pointer" >
      <FieldLabel htmlFor="switch-share" className='cursor-pointer'>
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle className='text-base'>
              Prikazi samo ne uradjene naloge.
            </FieldTitle>
            <FieldDescription>
              Kada je dugme aktivirano, onda se prikazuju samo ne uradjeni nalozi.
            </FieldDescription>
          </FieldContent>
          <Switch id="switch-share" defaultChecked onClick={setAktivnostDugmeta} className='cursor-pointer'/>
        </Field>
      </FieldLabel>
    </FieldGroup>
  )
}

export default FliterDugmeUredjeniNalozi
