import { cn } from '@/lib/utils'

const fieldStyles =
  'w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-[15px] text-ink placeholder:text-ink/35 ' +
  'transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 ' +
  'dark:border-paper/15 dark:bg-ink-raised dark:text-paper dark:placeholder:text-paper/35'

export function Label({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn(
        'mb-1.5 block text-[13px] font-medium text-ink/60 dark:text-paper/60',
        className
      )}
      {...props}
    />
  )
}

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(fieldStyles, className)} {...props} />
}

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(fieldStyles, 'min-h-32 resize-y', className)} {...props} />
}
