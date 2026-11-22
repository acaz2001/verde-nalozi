import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import dbConnect from "../../../lib/db";
import Nalozi from "../../../lib/models/Nalozi";

// export async function GET() {
//   //const filePath = await fs.readFile(process.cwd()+ '/data/nalozi.json', 'utf8');
//   //const fileData = await fs.readFile(filePath, "utf8");
//   const filePath = path.join(process.cwd(), "data", "nalozi.json");
//   const fileData = await fs.readFile(filePath, "utf8");
//   const nalozi = JSON.parse(fileData);
//   return NextResponse.json(nalozi);
// }

export async function GET() {
  await dbConnect()
  const nalozi = await Nalozi.find()
  return NextResponse.json(nalozi)
}


export async function POST(request) {
  try {
    await dbConnect()
    const newTask = await request.json()
    const task = await Nalozi.create(newTask)
    console.log("NALOZI Task:",task)
    return NextResponse.json({data:task},{status:201})
  } catch(err) {
    console.log("NALOZI POST ERROR:",err)
  }
}