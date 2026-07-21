import { cn } from "@domino/ui/lib/utils"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            data-slot="spinner"
            role="status"
            aria-label="Loading"
            className={cn("size-4 animate-spin", className)}
            {...props}
        >
            <path d="M21.9961 12C21.9961 17.5228 17.5189 22 11.9961 22C6.47325 22 1.99609 17.5228 1.99609 12C1.99609 6.47715 6.47325 2 11.9961 2" />
        </svg>
    )
}

export { Spinner }
