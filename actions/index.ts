"use server";

import { revalidatePath } from "next/cache";
import { Ragie } from "ragie";
import { ScoredChunk } from "ragie/models/components";

const ragie = new Ragie({ auth: process.env.RAGIE_API_KEY });

type FormState = { status: "pending" | "success" | "error"; message: string };
export async function createDocument(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const createRes = await ragie.documents.create({
      file: formData.get("file") as File,
      metadata: JSON.parse((formData.get("metadata") || "{}") as string),
    });
    revalidatePath("/");
    return {
      status: "success" as const,
      message: "Document created!",
    };
  } catch (error: unknown) {
    return {
      status: "error" as const,
      message: (error as Error).message,
    };
  }
}

export async function deleteDocument(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const res = await ragie.documents.delete({
      documentId: formData.get("documentId") as string,
    });
    console.log(res);
    revalidatePath("/");
    return {
      status: "success" as const,
      message: "Document deleted!",
    };
  } catch (error: unknown) {
    console.error(error);
    return {
      status: "error" as const,
      message: (error as Error).message,
    };
  }
}

export async function createRetrieval(
  prevState: FormState & { results?: ScoredChunk[] },
  formData: FormData,
): Promise<FormState & { results?: ScoredChunk[] }> {
  try {
    const res = await ragie.retrievals.retrieve({
      query: formData.get("query") as string,
      filter: JSON.parse((formData.get("filter") || "{}") as string),
    });
    return {
      status: "success" as const,
      message: "Document retrieved!",
      results: res.scoredChunks,
    };
  } catch (error: unknown) {
    console.error(error);
    return {
      status: "error" as const,
      message: (error as Error).message,
    };
  }
}
