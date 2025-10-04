import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Play } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <Card className="max-w-xl w-full shadow-sm rounded-lg border bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-800">
      <CardHeader className="flex flex-row items-start gap-3 border-b border-gray-200 dark:border-neutral-800 p-4">
        <div className="p-3 rounded-lg border bg-gradient-to-tr from-sky-50 to-white dark:from-sky-900/40 dark:to-sky-950/60 border-sky-100 dark:border-sky-800">
          <BookOpen className="h-6 w-6 text-sky-600 dark:text-sky-400" />
        </div>
        <div>
          <CardTitle className="text-base font-semibold text-gray-900 dark:text-gray-100">
            EZY Workforce and Education Partners Online Induction
          </CardTitle>
          <CardDescription className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            EWEP Online Induction streamlines the induction process for new
            employees and provides easy access to important company information.
          </CardDescription>
        </div>
      </CardHeader>

      <CardFooter className="flex items-center justify-between">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <Badge className="text-sm" variant="outline">
            Online
          </Badge>
          <Badge className="text-sm" variant="outline">
            Self-paced
          </Badge>
          <Badge className="text-sm" variant="outline">
            30–45 mins
          </Badge>
        </div>
        <Button className="flex items-center gap-1 text-sm px-3 py-1.5 h-auto">
          <Play className="h-4 w-4" />
          Start Induction
        </Button>
      </CardFooter>
    </Card>
  );
}
