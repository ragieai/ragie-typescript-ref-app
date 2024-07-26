"use client";

import { useState } from "react";
import { useFormState } from "react-dom";

import { Document } from "ragie/models/components";

import { updateDocumentFile, updateDocumentRaw } from "@/actions";
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
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";

export default function UpdateDocumentDialog({
  document,
}: {
  document: Document;
}) {
  const [fileUploadMode, setFileUploadMode] = useState(true);
  const [state, action, isPending] = useFormState(
    fileUploadMode ? updateDocumentFile : updateDocumentRaw,
    {
      status: "pending" as const,
      message: "",
    },
  );
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Update Document
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Update {document.name} file</DialogTitle>
        </DialogHeader>
        <form action={action} className="flex flex-col gap-3">
          {state.message && (
            <Alert>
              <p>{state.message}</p>
            </Alert>
          )}
          <input type="hidden" name="documentId" value={document.id} />
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
          <SubmitButton>Update</SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}
