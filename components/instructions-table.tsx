import ragie from "@/lib/ragie-client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import InstructionActiveToggle from "./instruction-active-toggle";
import EntityListDialog from "./entity-list-dialog";

export default async function InstructionsTable() {
  const instructions = await ragie.entities.listInstructions();
  return (
    <div>
      <h2>Instructions</h2>
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead>Prompt</TableHead>
            <TableHead>Scope</TableHead>
            <TableHead>Schema</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {instructions.map((instruction) => (
            <TableRow key={instruction.id}>
              <TableCell>{instruction.id}</TableCell>
              <TableCell>{instruction.name}</TableCell>
              <TableCell>
                {new Intl.DateTimeFormat().format(instruction.createdAt)}
              </TableCell>
              <TableCell>{instruction.prompt}</TableCell>
              <TableCell>{instruction.scope}</TableCell>
              <TableCell>
                <code className="block overflow-auto bg-gray-200">
                  <pre>{JSON.stringify(instruction.entitySchema, null, 2)}</pre>
                </code>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <InstructionActiveToggle instruction={instruction} />
                  <EntityListDialog
                    title={`Entities for instruction ${instruction.name}`}
                    mode="instruction"
                    id={instruction.id}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
