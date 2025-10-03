import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <Card className="max-w-2xl mx-auto bg-white bg-opacity-90">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center">
          Welcome to EWEP Online Induction
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center">
          EWEP Online Induction streamlines the induction process for new
          employees and provides easy access to important company information.
        </p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Link href="/sign-up">
          <Button size="lg" variant="default">
            Start Induction
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
