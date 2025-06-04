export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">DocInsight Demo</h1>
      <p className="text-lg text-center mb-6 max-w-xl">
        Upload documents and get instant semantic insights using Vectara’s RAG capabilities.
      </p>
      <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
        Upload Document
      </button>
    </main>
  );
}
