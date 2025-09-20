"use client";

import { use, useEffect, useState } from "react";

import { sampleSlides } from "@/components/slide-maker/slides/sample";

import { getInductionAction, InductionFormUpdate } from "@/features/inductions";
import dynamic from "next/dynamic";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Link } from "lucide-react";
import { Button } from "@/components/ui/button";

const SlideMaker = dynamic(() => import("./slide-maker"), { ssr: false });
export default function SingleInductionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const res = await getInductionAction(id);
      setData(res);
    }
    fetchData();
  }, [id]);

  return (
    <>
      {data ? (
        <>
          <h1 className="text-xl semi-bold">Manage {data.title}</h1>
          <InductionFormUpdate id={id} data={data} />
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Create Presentation</CardTitle>
              <CardDescription>
                Quickly create and customize your presentation slides.
              </CardDescription>
            </CardHeader>

            <CardFooter>
              <Button>
                <span>Go to Presentation</span>
              </Button>
            </CardFooter>
          </Card>
          {/*  <SlideMaker value={sampleSlides} /> */}
        </>
      ) : (
        <></>
      )}
    </>
  );
}
