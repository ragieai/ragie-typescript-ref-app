"use client";

import { useFormState } from "react-dom";

import { createInstruction } from "@/actions";
import { SubmitButton } from "./ui/submit-button";
import { Textarea } from "./ui/textarea";
import { Alert } from "./ui/alert";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function CreateRetrievalForm() {
  const [state, action, isPending] = useFormState(createInstruction, {
    status: "pending" as const,
    message: "",
  });
  return (
    <div>
      <form action={action}>
        <fieldset className="flex flex-col gap-3 border border-dashed p-4 rounded">
          {state.message && (
            <Alert>
              <p>{state.message}</p>
            </Alert>
          )}
          <legend>Create Instruction</legend>
          <label htmlFor="name">Name</label>
          <Input name="name" id="name" placeholder={"Extract widgets"} />
          <label htmlFor="prompt">Prompt</label>
          <Textarea
            name="prompt"
            id="prompt"
            cols={30}
            rows={5}
            placeholder={
              "You will be provided with some text. Please find and extract all the widgets it contains."
            }
          />
          <label htmlFor="scope">Scope</label>
          <Select name="scope">
            <SelectTrigger className="w-[180px]" defaultValue="document">
              <SelectValue placeholder="Select instruction scope" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="document">Document</SelectItem>
              <SelectItem value="chunk">Chunk</SelectItem>
            </SelectContent>
          </Select>
          <label htmlFor="entitySchema">Entity Schema</label>
          <Textarea
            name="entitySchema"
            id="entitySchema"
            cols={30}
            rows={5}
            placeholder={`{
              "type": "object",
              "properties": {
                "widget": {
                  "type": "string"
                }
              }
            }`}
          />
          <SubmitButton>Create Instruction</SubmitButton>
        </fieldset>
      </form>

      {!!state.results && (
        <ul>
          {state.results.map((result, idx) => (
            <li key={idx}>
              <p>{result.score}</p>
              <p>{result.documentId}</p>
              <p>{result.text}</p>
              <p>{JSON.stringify(result.documentMetadata, null, 2)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
