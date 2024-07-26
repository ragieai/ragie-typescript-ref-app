"use server";

import ragie from "@/lib/ragie-client";
import { revalidatePath } from "next/cache";
import { ScoredChunk } from "ragie/models/components";

type FormState = { status: "pending" | "success" | "error"; message: string };
export async function createDocument(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const createRes = await ragie.documents.create({
      file: formData.get("file") as File,
      metadata: JSON.parse((formData.get("metadata") || "{}") as string),
      mode: formData.get("mode") as "fast" | "hi_res",
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

export async function createDocumentRaw(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const createRes = await ragie.documents.createRaw({
      data: formData.get("rawData") as string,
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

export async function patchDocumentMetadata(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const res = await ragie.documents.patchMetadata({
      documentId: formData.get("documentId") as string,
      patchDocumentMetadataParams: {
        metadata: JSON.parse((formData.get("metadata") || "{}") as string),
      },
    });
    revalidatePath("/");
    return {
      status: "success" as const,
      message: "Document metadata updated!",
    };
  } catch (error: unknown) {
    console.error(error);
    return {
      status: "error" as const,
      message: (error as Error).message,
    };
  }
}

export async function updateDocumentFile(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const res = await ragie.documents.updateFile({
      documentId: formData.get("documentId") as string,
      updateDocumentFileParams: {
        file: formData.get("file") as File,
      },
    });
    revalidatePath("/");
    return {
      status: "success" as const,
      message: "Document file updated!",
    };
  } catch (error: unknown) {
    console.error(error);
    return {
      status: "error" as const,
      message: (error as Error).message,
    };
  }
}

export async function updateDocumentRaw(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const res = await ragie.documents.updateRaw({
      documentId: formData.get("documentId") as string,
      updateDocumentRawParams: {
        data: formData.get("rawData") as string,
      },
    });
    revalidatePath("/");
    return {
      status: "success" as const,
      message: "Document file updated!",
    };
  } catch (error: unknown) {
    console.error(error);
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
    const filter = JSON.parse((formData.get("filter") || "{}") as string);
    const res = await ragie.retrievals.retrieve({
      query: formData.get("query") as string,
      filter,
      rerank: formData.get("rerank") === "on",
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

export async function createInstruction(
  prevState: FormState & { results?: ScoredChunk[] },
  formData: FormData,
): Promise<FormState & { results?: ScoredChunk[] }> {
  try {
    const res = await ragie.entities.createInstruction({
      name: formData.get("name") as string,
      prompt: formData.get("prompt") as string,
      scope: formData.get("scope") as "document" | "chunk",
      entitySchema: JSON.parse(
        (formData.get("entitySchema") || "{}") as string,
      ),
    });
    revalidatePath("/");
    return {
      status: "success" as const,
      message: "Instruction created!",
    };
  } catch (error: unknown) {
    console.error(error);
    return {
      status: "error" as const,
      message: (error as Error).message,
    };
  }
}

export async function toggleInstructionActive(
  instructionId: string,
  active: boolean,
) {
  try {
    await ragie.entities.updateInstruction({
      instructionId,
      updateInstructionParams: { active },
    });
    revalidatePath("/");
  } catch (error: unknown) {
    console.error(error);
  }
}
