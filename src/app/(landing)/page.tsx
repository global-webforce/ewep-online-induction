import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <Card className="max-w-2xl mx-auto ">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center">
          Welcome to SFS Online Induction
        </CardTitle>
        <CardDescription className="text-center">
          Internal online induction platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center text-muted-foreground ">
          SFS Online Induction streamlines the induction process for new
          employees and provides easy access to important company information.
        </p>
        <div className="flex justify-center"></div>
      </CardContent>
      <CardFooter className="items-center justify-center">
        <Link href="/sign-up">
          <Button size="lg" variant="default">
            Start Induction
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
