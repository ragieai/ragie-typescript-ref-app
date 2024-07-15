"use server";
import { Ragie } from "ragie";
import Link from "next/link";

import DeleteDocumentButton from "@/components/delete-document-button";
import CreateDocumentForm from "@/components/create-document-form";
import CreateRetrievalForm from "@/components/create-retrieval-form";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ragie = new Ragie({ auth: process.env.RAGIE_API_KEY });

export default async function Home({
  searchParams,
}: {
  searchParams: { cursor?: string; filter?: string };
}) {
  try {
    var listRes = await ragie.documents.list({
      cursor: searchParams.cursor,
      filter: searchParams.filter || "",
    });
  } catch (error: unknown) {
    console.error(error);
    return <div>{JSON.stringify(error)}</div>;
  }

  return (
    <main className="min-h-screen p-10">
      <h1 className="text-3xl font-semibold leading-relaxed">
        Ragie SDK Example App
      </h1>
      <Tabs defaultValue="documents">
        <TabsList className="my-6">
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="retrievals">Retrievals</TabsTrigger>
        </TabsList>
        <TabsContent value="documents">
          <div className="flex gap-10">
            <CreateDocumentForm />
            <div>
              <MetadataFilter filter={searchParams.filter} />
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
                        {new Intl.DateTimeFormat().format(doc.createdAt)}
                      </TableCell>
                      <TableCell>{doc.name}</TableCell>
                      <TableCell>{doc.chunkCount}</TableCell>
                      <TableCell>
                        <code className="block max-h-14 max-w-52 overflow-auto bg-gray-200">
                          <pre>{JSON.stringify(doc.metadata, null, 2)}</pre>
                        </code>
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
                          href={`/?cursor=${listRes.result.pagination.nextCursor}&filter=${searchParams.filter}`}
                        >
                          Next
                        </Link>
                      )}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="retrievals">
          <CreateRetrievalForm />
        </TabsContent>
      </Tabs>
    </main>
  );
}
