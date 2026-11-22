import dbConnect from "../../../../lib/db";
import { NextResponse } from "next/server";
import Klijent from "../../../../lib/models/Klijent";
import { revalidateTag } from "next/cache";

export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const data = await request.json();
        //const { newTitle: title, newDescription: description } = await request.json();
        await dbConnect();
        await Klijent.findByIdAndUpdate(id, data,{new: true} );
        revalidateTag
        return NextResponse.json({ message: "Task updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error updating task:", error);
        return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
    }
}