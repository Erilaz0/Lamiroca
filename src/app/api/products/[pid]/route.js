import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Product from "../../../../service/antiqueService";

export async function GET(req, { params }) {
  const pid = params.pid;
  if (!pid || !mongoose.isValidObjectId(pid)) {
    return NextResponse.json({ ERROR: "INVALID PID" });
  } else {
    const getByPid = await Product.getByPid(pid);
    if (!getByPid) {
      return NextResponse.json({ ERROR: "CANNOT GET PRODUCT" });
    } else {
      return NextResponse.json({ MESSAGE: "200OK", PRODUCT: getByPid });
    }
  }
}
