"use client";

import { useFormState } from "react-dom";

import { Document } from "ragie/models/components";

import { patchDocumentMetadata } from "@/actions";
import { Alert } from "./ui/alert";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { SubmitButton } from "./ui/submit-button";
import { Textarea } from "./ui/textarea";

export default function EditDocumentMetadataDialog({
  document,
}: {
  document: Document;
}) {
  const [state, action, isPending] = useFormState(patchDocumentMetadata, {
    status: "pending" as const,
    message: "",
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Edit {document.name} metadata</DialogTitle>
        </DialogHeader>
        <form action={action}>
          {state.message && (
            <Alert>
              <p>{state.message}</p>
            </Alert>
          )}
          <input type="hidden" name="documentId" value={document.id} />
          <label htmlFor="metadata">Metadata</label>
          <Textarea
            name="metadata"
            defaultValue={JSON.stringify(document.metadata, null, 2)}
          />
          <SubmitButton>Update</SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}
