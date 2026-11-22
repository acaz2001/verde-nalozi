"use client";

import { UploadButton } from "@uploadthing/react";
import { useState } from "react";
import { twMerge } from 'tailwind-merge'


export function MyUploadButton() {
  const [url, setUrl] = useState();
  return (
    // @ts-ignore
    <UploadButton
    config={{ cn: twMerge }}
      className="mt-4 bg-amber-300 ut-button:bg-red-500 ut-button:ut-readying:bg-red-500/50"
      endpoint="imageUploader"
      onClientUploadComplete={(res : any) => {
        console.log("Files: ",  res);
        setUrl(res)
        // alert("Upload Completed");
      }}
      onUploadError={(error: Error) => {
        alert(`ERROR! ${error.message}`);
      }}
    />
  );
}