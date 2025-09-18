export function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 rounded-lg">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-screen-lg m-4">
        {children}
      </div>
    </div>
  );
}
