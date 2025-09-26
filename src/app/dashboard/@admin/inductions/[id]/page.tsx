"use client";
import { AlertPanelState } from "@/components/custom/alert-panel-state";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getInductionById, InductionFormUpdate } from "@/features/inductions";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams<{ id: string }>();

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: [`inductions`, id],
    queryFn: async () => await getInductionById(id),
  });

  return (
    <>
      {error && (
        <AlertPanelState onRetry={async () => await refetch()} variant="error">
          {error.message}
        </AlertPanelState>
      )}
      {isLoading && <AlertPanelState variant="loading" />}
      <h1 className="text-xl font-bold">{data?.title}</h1>
      <InductionFormUpdate id={id} data={data} />

      {id && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Create Presentation</CardTitle>
            <CardDescription>
              Quickly create and customize your presentation slides.
            </CardDescription>
          </CardHeader>

          <CardFooter>
            <Button asChild>
              <Link href={"/dashboard/inductions/" + id + "/resources"}>
                <span>Go to Presentation</span>
              </Link>
            </Button>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
