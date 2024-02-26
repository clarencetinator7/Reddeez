import CommunityHeader from "./_components/CommunityHeader";
import CommunityInfo from "./_components/CommunityInfo";

export default function CommunityPageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return (
    <main className="flex flex-col gap-5 p-10 h-full">
      <CommunityHeader id={params.id} />
      <div className="flex-grow flex items-start">
        {children}
        <CommunityInfo id={params.id} />
      </div>
    </main>
  );
}
