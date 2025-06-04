import QueryForm from "@/components/QueryForm";

export default function Home() {
  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-lg w-full p-6 bg-white shadow-lg rounded-lg">
        <QueryForm />
      </div>
    </main>
  );
}
