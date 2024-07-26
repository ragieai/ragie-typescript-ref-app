import { Entity } from "ragie/models/components";

import ragie from "@/lib/ragie-client";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export default async function EntityListDialog({
  title,
  mode,
  id,
}: {
  title: string;
  mode: "document" | "instruction";
  id: string;
}) {
  let entities: Array<Entity> = [];
  if (mode === "document") {
    const entityRes = await ragie.entities.listByDocument({
      documentId: id,
    });
    for await (const page of entityRes) {
      entities.push(...page.result.entities);
    }
  } else if (mode === "instruction") {
    const entityRes = await ragie.entities.listByInstruction({
      instructionId: id,
    });
    for await (const page of entityRes) {
      entities.push(...page.result.entities);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Entities
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <ul className="flex flex-col gap-3">
          {entities.map((entity) => (
            <li key={entity.id}>
              <Card>
                <CardHeader>
                  <CardTitle>{entity.id}</CardTitle>
                  <CardDescription>
                    {new Intl.DateTimeFormat().format(entity.createdAt)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Extracted from document {entity.documentId}</p>
                  <p>Extracted by instruction {entity.instructionId}</p>
                  <pre>{JSON.stringify(entity.data, null, 2)}</pre>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
