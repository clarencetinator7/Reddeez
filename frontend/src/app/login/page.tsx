import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <main className="w-full flex items-center justify-center">
      <Card className="w-[450px] my-20">
        <CardHeader>
          <CardTitle className="font-extrabold">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </main>
  );
}
