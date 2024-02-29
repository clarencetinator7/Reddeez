import Link from "next/link";
import { getServerSession } from "next-auth";
import LogoutButton from "./LogoutButton";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import CommunitySearchBar from "@/app/_components/CommunitySearchBar";

export default async function Navbar() {
  // const { data: session } = useSession();
  const session = await getServerSession(authOptions);

  return (
    <div className="h-[60px] flex justify-center items-center sticky top-0 border-b bg-white z-10">
      <div className="w-full max-w-[1500px] px-5 flex justify-between items-center">
        <div>
          <h1 className="font-bold text-lg">Reddeez</h1>
        </div>
        <CommunitySearchBar />
        <nav>
          <ul className="flex space-x-5 items-center">
            <li>
              <Link href="/">Home</Link>
            </li>
            {session ? (
              <li>
                <LogoutButton />
              </li>
            ) : (
              <>
                <li>
                  <Link href="/login">Login</Link>
                </li>
                <li>
                  <Link href="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}
