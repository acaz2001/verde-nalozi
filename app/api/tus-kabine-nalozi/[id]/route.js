import { promises as fs } from "fs";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import path from "path";
import { file } from "zod";
import KabineNalozi from "../../../../lib/models/KabineNalozi";
import dbConnect from "../../../../lib/db";

// export async function GET(request, { params }) {
//   // we will use params to access the data passed to the dynamic route
//   const { id } = await params;
 
//   const filePath = path.join(process.cwd(), "data", "tusKabineNalozi.json");
//   const fileData = await fs.readFile(filePath, "utf8");
//   const nalozi = JSON.parse(fileData);


//   console.log("fileData SU:",nalozi )




//   function findUser({ id }) {
//     return nalozi.find((nalog) => nalog.id == id)
//   }
//   console.log("FIND USER JE:",findUser({id}))
 


//   return NextResponse.json(findUser({id}));
// }


export async function GET(request, { params }) {
  
  const { id } = await params;
  await dbConnect()
  const nalozi = await KabineNalozi.findById(id)
  console.log("SERVER NALOZI:", nalozi)
  return NextResponse.json(nalozi)
  
}

export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const data = await request.json();
        //const { newTitle: title, newDescription: description } = await request.json();
        await dbConnect();
        await KabineNalozi.findByIdAndUpdate(id, data,{new: true} );
        return NextResponse.json({ message: "Task updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error updating task:", error);
        return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
    }
}
// export async function PUT(req, { params }) {
//   const { id } = await params;
//   const payload = await req.json();

//   //console.log("ID:", id);
//   //console.log("PAYLOAD:", payload);
//   //console.log("MODEL KABINE:", payload.modelKabine);

//   const filePath = path.join(
//     process.cwd(),
//     "data",
//     "tusKabineNalozi.json"
//   );

//   const fileData = await fs.readFile(filePath, "utf8");
//   const nalozi = JSON.parse(fileData);

//   const index = nalozi.findIndex((obj) => obj.id == id);

//   if (index !== -1) {
//     nalozi[index] = {
//       ...nalozi[index],
//       ...payload
//     };

//     console.log("NOVI OBJEKAT:", nalozi[index]);

//     await fs.writeFile(
//       filePath,
//       JSON.stringify(nalozi, null, 2)
//     );

//     return Response.json(nalozi[index], {
//       status: 200
//     });
//   }

//   return Response.json(
//     { message: "Nalog nije pronađen" },
//     { status: 404 }
//   );
// }

export async function DELETE(request, {params}) {
    try {
        const { id } = await params;
        await dbConnect();
        await KabineNalozi.findByIdAndDelete(id);
        return NextResponse.json({ message: "Task deleted" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting task:", error);
        return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
    }
}
// export const DELETE = async (
//   req,
//   { params }
// ) => {
//   try {
//     const { id } = await params;
//     const filePath = path.join(process.cwd(), "data", "tusKabineNalozi.json");
//     const fileData = await fs.readFile(filePath, "utf8");
//     const nalozi = JSON.parse(fileData);

//     const deletedNalog = nalozi.find(
//       (nalog) => nalog.id == id
//     )

//     const index = nalozi.findIndex(
//       (nalog) => nalog.id == id
//     )
//     nalozi.splice(index,1)

//     await fs.writeFile(
//       filePath,
//       JSON.stringify(nalozi, null, 2)
//     );

    
//     return NextResponse.json(
//       { message: "Todo item deleted successfully" },
//       { status: 200 }
      
//     );
    
//   } catch (error) {
//     console.error("Error processing request:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// };