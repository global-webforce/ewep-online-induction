import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <Card className="w-full max-w-sm md:max-w-4xl mx-auto overflow-hidden p-0 ">
      <CardContent className="grid p-0 md:grid-cols-2 min-h-[400px]">
        <div className="bg-muted relative hidden md:block">
          <Image
            src="/bg.webp"
            fill={true}
            alt="Image"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.7]"
          />
        </div>
        <div className="p-6 md:p-8 flex flex-col gap-8 justify-between">
          <div className="space-y-4">
            <h1 className="text-3xl">{process.env.NEXT_PUBLIC_APP_NAME}</h1>
            <p className="text-muted-foreground text-sm">
              {process.env.NEXT_PUBLIC_APP_DESC}
            </p>
          </div>
          <Link href="/sign-up">
            <Button size="lg" variant="default">
              Get Started
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
