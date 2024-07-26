"use client";

import { useFormState } from "react-dom";

import { createRetrieval } from "@/actions";
import { SubmitButton } from "./ui/submit-button";
import { Textarea } from "./ui/textarea";
import { Alert } from "./ui/alert";
import { Card, CardContent, CardHeader } from "./ui/card";

export default function CreateRetrievalForm() {
  const [state, action, isPending] = useFormState(createRetrieval, {
    status: "pending" as const,
    message: "",
  });
  return (
    <div className="flex gap-10">
      <form action={action} className="basis-1/4">
        <fieldset className="flex flex-col gap-3 border border-dashed p-4 rounded">
          {state.message && (
            <Alert>
              <p>{state.message}</p>
            </Alert>
          )}
          <legend>Create Retrieval</legend>
          <div>
            <label htmlFor="query">Query</label>
            <Textarea
              name="query"
              id="query"
              cols={30}
              rows={3}
              placeholder={"What is the parental leave policy?"}
            />
          </div>
          <div>
            <label htmlFor="filter">Metadata Filter</label>
            <Textarea
              name="filter"
              id="filter"
              cols={30}
              rows={5}
              placeholder={'{ "foo": "bar" }'}
            />
          </div>
          <div className="flex items-center gap-1">
            <input type="checkbox" id="rerank" name="rerank" defaultChecked />
            <label htmlFor="rerank">Rerank</label>
          </div>
          <SubmitButton>Retrieve</SubmitButton>
        </fieldset>
      </form>

      {state.results?.length === 0 && (
        <div className="basis-3/4">
          <Alert>
            <p>No results found.</p>
          </Alert>
        </div>
      )}

      {!!state.results && (
        <ul className="basis-3/4 flex flex-col gap-5">
          {state.results.map((result, idx) => (
            <li key={idx}>
              <Card>
                <CardHeader>
                  <div className="flex gap-2 text-sm">
                    <strong>{result.score}</strong>
                    <span>{result.documentId}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <code>
                    <pre>
                      {JSON.stringify(result.documentMetadata, null, 2)}
                    </pre>
                  </code>
                  <p>{result.text}</p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
