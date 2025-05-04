"use client";

import { useFormStatus } from "react-dom"
import { Button } from "../ui/button"
import { Heart, Loader2 } from "lucide-react"
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GeneralSubmitButtonProps {
  text: string,
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined,
  width?: string,
  icon?: ReactNode,
}

const GeneralSubmitButton = ({ text, variant, width, icon }: GeneralSubmitButtonProps) => {
  const {pending} = useFormStatus();

  return (
    <Button variant={variant} className={width} disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="animate-spin size-4" />
          <span>Submitting...</span>
        </>
      ): (
        <>
          {icon && <div>{icon}</div>}
          <span>{text}</span>
        </>
      )}
    </Button>
  )
}

export default GeneralSubmitButton

export function SaveJobButton({savedJob}: {savedJob: boolean}) {
  const {pending} = useFormStatus();

  return (
    <Button variant="outline" type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="animate-spin size-4" />
          <span>Saving...</span>
        </>
      ) : (
        <>
          <Heart className={cn(
            savedJob ? "fill-current text-red-500" : "",
            "size-4 transition-colors"
          )} />
          {savedJob ? "Saved" : "Save Job"}
        </>
      )}
    </Button>
  )
}