"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";

import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export default function MetadataFilter({ filter }: { filter?: string }) {
  const router = useRouter();
  return (
    <form
      className="p-3"
      onSubmit={(evt: FormEvent) => {
        evt.preventDefault();
        const formData = new FormData(evt.target as HTMLFormElement);
        const filter = (formData.get("filter") as string) || "";
        router.push(`/?filter=${filter}`);
      }}
    >
      <label htmlFor="filter">Filter</label>
      <Textarea
        name="filter"
        placeholder={'{ "foo": {"$eq": "bar"}'}
        defaultValue={filter}
      />
      <Button type="submit" variant="secondary">
        Filter
      </Button>
    </form>
  );
}
