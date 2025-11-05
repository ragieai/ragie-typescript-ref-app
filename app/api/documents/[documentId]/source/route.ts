import { NextResponse } from "next/server";
import ragie from "@/lib/ragie-client";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ documentId: string }> },
) {
  const { documentId } = await params;

  try {
    const res = await ragie.documents.getSource(
      {
        documentId,
      },
      {},
    );

    // Stream the file response back to the client
    // Optionally could call getDocument to get more correct filename and Content-Type
    return new NextResponse(res, {
      status: 200,
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${documentId}"`,
      },
    });
  } catch (error) {
    console.error("Error fetching document source:", error);
    return new NextResponse("Error fetching document source", { status: 500 });
  }
}
