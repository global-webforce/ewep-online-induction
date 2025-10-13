"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, FileText, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface InductionStartCardProps {
  id: string;
}

export function InductionStartCard({ id }: InductionStartCardProps) {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="w-full max-w-2xl ">
      <Card className="border-2 shadow-lg">
        <CardContent className="p-4 md:p-6">
          {/* Icon and Title Section */}
          <div className="text-left mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
              <ShieldCheck className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-balance">
              Begin Your Induction
            </h1>
            <p className="text-lg text-muted-foreground text-balance">
              You're about to start an important process that will prepare you
              for success in your role
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-border mb-8" />

          {/* Agreement Section */}
          <div className="space-y-6 mb-8">
            <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 border">
              <FileText className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <p className="text-sm leading-relaxed text-muted-foreground">
                This induction contains essential information about company
                policies, safety procedures, and your responsibilities. Please
                review all materials carefully.
              </p>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-lg border-2 border-primary/20 bg-primary/5">
              <Checkbox
                id="agreement"
                checked={agreed}
                onCheckedChange={(checked) => setAgreed(!!checked)}
                className="mt-1"
              />
              <label
                htmlFor="agreement"
                className="text-sm leading-relaxed cursor-pointer select-none font-medium"
              >
                I acknowledge that I have read and agree to comply with all
                company policies and safety procedures as outlined in the
                induction materials. I understand this is a mandatory
                requirement for my role.
              </label>
            </div>
          </div>

          {/* Button Section */}
          <div className="space-y-4">
            <Button
              asChild
              size="default"
              disabled={!agreed}
              className="w-full text-base h-12 font-semibold transition-all"
            >
              <Link href={`/dashboard/inductions/${id}/resources`}>
                <span>Start Induction</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>

            {!agreed && (
              <p className="text-xs text-center text-muted-foreground">
                Please accept the agreement above to continue
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
