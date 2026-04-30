export function PageContainer({ children }: any) {
  return (
    <main className="min-h-screen bg-white px-20 py-20">
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </main>
  );
}
