"use client";

import { useFormState } from "react-dom";

import { deleteDocument } from "@/actions";
import { SubmitButton } from "./ui/submit-button";

export default function DeleteDocumentButton({
  documentId,
}: {
  documentId: string;
}) {
  const [state, action] = useFormState(deleteDocument, {
    status: "pending" as const,
    message: "",
  });
  return (
    <form action={action}>
      <input type="hidden" name="documentId" value={documentId} />
      <SubmitButton variant="destructive" size="sm">
        Delete Document
      </SubmitButton>
    </form>
  );
}
