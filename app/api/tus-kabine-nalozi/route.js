import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  //const filePath = await fs.readFile(process.cwd()+ '/data/nalozi.json', 'utf8');
  //const fileData = await fs.readFile(filePath, "utf8");
  const filePath = path.join(process.cwd(), "data", "tusKabineNalozi.json");
  const fileData = await fs.readFile(filePath, "utf8");
  const nalozi = JSON.parse(fileData);
  return NextResponse.json(nalozi);
}

export async function POST(req) {
  const newPost = await req.json();
  console.log("NEW POST JE :",newPost) // newPost je objekat sa podacima iz forme
  const filePath = path.join(process.cwd(), "data", "tusKabineNalozi.json");
  const fileData = await fs.readFile(filePath, "utf8"); //file data je array of objects za naloge
  console.log("FILE DATA JE:"  + fileData)
  const nalozi = JSON.parse(fileData);
  // Add new post with auto-increment id
  newPost.id = nalozi.length + 1;
  nalozi.push(newPost);
  console.log("Nalozi sa newPost su:",newPost)
  await fs.writeFile(filePath, JSON.stringify(nalozi, null, 2));
  return NextResponse.json({ message: "Post created", post: newPost });
}