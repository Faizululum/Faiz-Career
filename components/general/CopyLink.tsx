"use client";
import { toast } from 'sonner';
import { DropdownMenuItem } from '../ui/dropdown-menu'
import { Link2 } from 'lucide-react'

const CopyLinkMenuItem = ({jobUrl}: {jobUrl: string}) => {
    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(jobUrl);
            toast.success("Job URL copied to clipboard");
        } catch (error) {
            console.log(error);
            toast.error("Failed to copy job URL");
        }
    }

  return (
    <DropdownMenuItem onSelect={handleCopy}>
        <Link2 className="size-4" />
        <span>Copy Job URL</span>
    </DropdownMenuItem>
  )
}

export default CopyLinkMenuItem