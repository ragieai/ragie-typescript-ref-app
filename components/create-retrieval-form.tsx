"use client";

import { useFormState } from "react-dom";

import { createRetrieval } from "@/actions";
import { SubmitButton } from "./ui/submit-button";
import { Textarea } from "./ui/textarea";
import { Alert } from "./ui/alert";

export default function CreateRetrievalForm() {
  const [state, action, isPending] = useFormState(createRetrieval, {
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
          <legend>Create Retrieval</legend>
          <label htmlFor="query">Query</label>
          <Textarea
            name="query"
            id="query"
            cols={30}
            rows={3}
            placeholder={"What is the parental leave policy?"}
          />
          <label htmlFor="filter">Metadata Filter</label>
          <Textarea
            name="filter"
            id="filter"
            cols={30}
            rows={5}
            placeholder={'{ "foo": "bar" }'}
          />
          <SubmitButton>Retrieve</SubmitButton>
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
