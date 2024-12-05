import Link from "next/link";

import DeleteDocumentButton from "@/components/delete-document-button";
import MetadataFilter from "@/components/metadata-filter";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ragie from "@/lib/ragie-client";
import EditDocumentMetadataDialog from "./edit-document-metadata-dialog";
import UpdateDocumentDialog from "./update-document-dialog";

export default async function DocumentsTable({
  filter,
  partition,
  cursor,
}: {
  filter?: string;
  partition?: string;
  cursor?: string;
}) {
  const listRes = await ragie.documents.list({
    cursor,
    filter,
    partition,
  });
  return (
    <div>
      <MetadataFilter filter={filter} partition={partition} />
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead>Chunk count</TableHead>
            <TableHead>Metadata</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {listRes.result.documents.map((doc) => (
            <TableRow key={doc.id}>
              <TableCell>{doc.id}</TableCell>
              <TableCell>
                {doc.name}
                <UpdateDocumentDialog document={doc} />
              </TableCell>
              <TableCell>
                {new Intl.DateTimeFormat().format(doc.createdAt)}
              </TableCell>
              <TableCell>{doc.chunkCount}</TableCell>
              <TableCell>
                <code className="block max-h-14 max-w-52 overflow-auto bg-gray-200">
                  <pre>{JSON.stringify(doc.metadata, null, 2)}</pre>
                </code>
                <EditDocumentMetadataDialog document={doc} />
              </TableCell>
              <TableCell>
                <DeleteDocumentButton documentId={doc.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell className="text-right" colSpan={6}>
              {listRes.result.pagination.nextCursor && (
                <Link
                  href={`/?cursor=${listRes.result.pagination.nextCursor}&filter=${filter}&partition=${partition}`}
                >
                  Next
                </Link>
              )}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
