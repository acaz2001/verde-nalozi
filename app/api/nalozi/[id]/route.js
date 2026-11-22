import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import path from "path";
import dbConnect from "../../../../lib/db";
import Nalozi from "../../../../lib/models/Nalozi";



// export async function GET(request, { params }) {
//   // we will use params to access the data passed to the dynamic route
//   const { id } = await params;
//   //const nalogId = await params.id;
  
//   //const id = params.id;
//   const filePath = path.join(process.cwd(), "data", "nalozi.json");
//   const fileData = await fs.readFile(filePath, "utf8");
//   const nalozi = JSON.parse(fileData);

//   console.log("NALOZI SU:",nalozi.find((nalog) => nalog.id == id))

//   //function findNalog (id) {
//   //  for (let i in nalozi ) {
//   //    if (nalozi[i].id == id) {
//   //      return nalozi[i]
//   //    }
//   //    return null
//   //  }
//   //}
//   //console.log("FIND NALOG JEE:",findNalog(2)) // { id: 2, name: 'Mike', isActive: false }


//   function findUser({ id }) {
//     return nalozi.find((nalog) => nalog.id == id)
//   }
//   console.log("FIND USER JE:",findUser({id}))
  

//   return NextResponse.json(findUser({id}));
// }

export async function GET(request, { params }) {
  
  const { id } = await params;
  await dbConnect()
  const nalozi = await Nalozi.findById(id)
  console.log("SERVER NALOZI:", nalozi)
  return NextResponse.json(nalozi)
  
}

export async function DELETE(request, {params}) {
    try {
        const { id } = await params;
        await dbConnect();
        await Nalozi.findByIdAndDelete(id);
        return NextResponse.json({ message: "Task deleted" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting task:", error);
        return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
    }
}