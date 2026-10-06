export function ProsePage({ title, updated, children }: { title: string; updated?: string; children: React.ReactNode }) {
  return (
    <article className="mx-auto max-w-3xl px-5 py-14 sm:px-8 md:py-20">
      <h1 className="text-[clamp(2.25rem,5vw,3.5rem)] font-extrabold">{title}</h1>
      {updated ? <p className="mt-3 text-sm text-ink-soft">Last updated {updated}</p> : null}
      <div className="prose-body mt-10 space-y-5 text-[1.0625rem] leading-7 [&_a]:font-medium [&_a]:text-primary [&_a]:underline-offset-4 hover:[&_a]:underline [&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[0.9em] [&_code]:voice-mono [&_h2]:pt-6 [&_h2]:text-2xl [&_h2]:font-extrabold [&_h3]:pt-2 [&_h3]:text-lg [&_h3]:font-bold [&_li]:pl-1 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_p]:text-foreground/90 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:bg-ink [&_pre]:p-4 [&_pre]:text-sm [&_pre]:leading-relaxed [&_pre]:voice-mono [&_pre]:text-paper [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_table]:w-full [&_table]:text-left [&_table]:text-sm [&_td]:border-b [&_td]:py-2 [&_td]:pr-4 [&_td]:align-top [&_th]:border-b [&_th]:py-2 [&_th]:pr-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
        {children}
      </div>
    </article>
  );
}
