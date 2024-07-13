"use client";

import { useFormState } from "react-dom";

import { createDocument } from "@/actions";
import { SubmitButton } from "./ui/submit-button";
import { Textarea } from "./ui/textarea";
import { Alert } from "./ui/alert";

export default function CreateDocumentForm() {
  const [state, action, isPending] = useFormState(createDocument, {
    status: "pending" as const,
    message: "",
  });
  return (
    <form action={action}>
      <fieldset className="flex flex-col gap-3 border border-dashed p-4 rounded">
        {state.message && (
          <Alert>
            <p>{state.message}</p>
          </Alert>
        )}
        <legend>Upload Document</legend>
        <label htmlFor="file">File</label>
        <input type="file" name="file" id="file" />
        <label htmlFor="metadata">Metadata</label>
        <Textarea
          className="text-black"
          name="metadata"
          id="metadata"
          cols={30}
          rows={10}
          placeholder={'{ "foo": "bar" }'}
        />
        <SubmitButton>Create Document</SubmitButton>
      </fieldset>
    </form>
  );
}
