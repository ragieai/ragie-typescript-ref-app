import CreateDocumentForm from "@/components/create-document-form";
import CreateRetrievalForm from "@/components/create-retrieval-form";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateInstructionForm from "@/components/create-instruction-form";
import InstructionsTable from "@/components/instructions-table";
import { Suspense } from "react";
import DocumentsTable from "@/components/documents-table";

export default async function Home({
  searchParams,
}: {
  searchParams: { cursor?: string; filter?: string };
}) {
  return (
    <main className="min-h-screen p-10">
      <h1 className="text-3xl font-semibold leading-relaxed">
        Ragie SDK Example App
      </h1>
      <Tabs defaultValue="documents">
        <TabsList className="my-6">
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="retrievals">Retrievals</TabsTrigger>
          <TabsTrigger value="entities">Entities</TabsTrigger>
        </TabsList>
        <TabsContent value="documents">
          <div className="flex gap-10">
            <CreateDocumentForm />
            <Suspense fallback={<div>Loading...</div>}>
              <DocumentsTable filter={searchParams.filter || ""} />
            </Suspense>
          </div>
        </TabsContent>
        <TabsContent value="retrievals">
          <CreateRetrievalForm />
        </TabsContent>
        <TabsContent value="entities">
          <div className="flex gap-10">
            <CreateInstructionForm />
            <Suspense fallback={<div>Loading...</div>}>
              <InstructionsTable />
            </Suspense>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
