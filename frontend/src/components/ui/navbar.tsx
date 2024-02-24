import Link from "next/link";
import { getServerSession } from "next-auth";
import LogoutButton from "./LogoutButton";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export default async function Navbar() {
  // const { data: session } = useSession();
  const session = await getServerSession(authOptions);

  return (
    <div className="h-[80px] flex justify-center items-center">
      <div className="w-full max-w-[1300px] px-5 flex justify-between items-center">
        <div>
          <h1 className="font-bold">ReddeezNuts</h1>
        </div>
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
