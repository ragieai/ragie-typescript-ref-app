"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";

import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";

export default function MetadataFilter({ 
  filter,
  partition 
}: { 
  filter?: string;
  partition?: string;
}) {
  const router = useRouter();
  return (
    <form
      className="p-3"
      onSubmit={(evt: FormEvent) => {
        evt.preventDefault();
        const formData = new FormData(evt.target as HTMLFormElement);
        const filter = (formData.get("filter") as string) || "";
        const partition = (formData.get("partition") as string) || "";
        router.push(`/?filter=${filter}&partition=${partition}`);
      }}
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="filter">Filter</label>
          <Textarea
            name="filter"
            placeholder={'{ "foo": {"$eq": "bar"}'}
            defaultValue={filter}
          />
        </div>
        <div>
          <label htmlFor="partition">Partition</label>
          <Input
            name="partition"
            placeholder="user_123"
            defaultValue={partition}
          />
        </div>
        <Button type="submit" variant="secondary">
          Filter
        </Button>
      </div>
    </form>
  );
}
