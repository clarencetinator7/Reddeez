import TopCommunities from "./TopCommunities";

export default async function Communities() {
  return (
    <div className="w-full max-w-[250px] px-5 py-10 sticky top-[60px]">
      {/* COMMUNITIES */}
      <h3 className="font-bold mb-5">Communities</h3>
      <TopCommunities />
    </div>
  );
}
