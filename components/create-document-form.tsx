"use client";

import { useState } from "react";
import { useFormState } from "react-dom";

import { createDocument, createDocumentRaw } from "@/actions";
import { SubmitButton } from "./ui/submit-button";
import { Textarea } from "./ui/textarea";
import { Alert } from "./ui/alert";
import { Switch } from "./ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function CreateDocumentForm() {
  const [fileUploadMode, setFileUploadMode] = useState(true);
  const [state, action, isPending] = useFormState(
    fileUploadMode ? createDocument : createDocumentRaw,
    {
      status: "pending" as const,
      message: "",
    },
  );
  return (
    <form action={action}>
      <fieldset className="flex flex-col gap-3 border border-dashed p-4 rounded">
        {state.message && (
          <Alert>
            <p>{state.message}</p>
          </Alert>
        )}
        <legend>Upload Document</legend>
        <div className="flex items-center gap-1">
          <Switch
            name="uploadMode"
            id="uploadMode"
            title="Upload File"
            checked={fileUploadMode}
            onCheckedChange={(checked) => setFileUploadMode(checked)}
          />
          <label htmlFor="uploadMode">Upload a File</label>
        </div>
        {fileUploadMode ? (
          <>
            <div>
              <label htmlFor="file">File</label>
              <input type="file" name="file" id="file" className="block" />
            </div>
            <div>
              <label htmlFor="mode">Mode</label>
              <Select name="mode" defaultValue="fast">
                <SelectTrigger className="w-[180px]" defaultValue="document">
                  <SelectValue placeholder="Select instruction scope" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fast">Fast</SelectItem>
                  <SelectItem value="hires">Hires</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        ) : (
          <div>
            <label htmlFor="rawData">Raw Text</label>
            <Textarea
              name="rawData"
              id="rawData"
              cols={30}
              rows={10}
              placeholder={"Lorem ipsum dolor sit amet..."}
            />
          </div>
        )}
        <div>
          <label htmlFor="metadata">Metadata</label>
          <Textarea
            name="metadata"
            id="metadata"
            cols={30}
            rows={10}
            placeholder={'{ "foo": "bar" }'}
          />
        </div>
        <SubmitButton>Create Document</SubmitButton>
      </fieldset>
    </form>
  );
}
