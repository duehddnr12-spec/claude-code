export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border/70 bg-paper">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-6 py-10 text-xs tracking-wide text-muted sm:flex-row sm:justify-between sm:px-10">
        <p className="font-display tracking-[0.18em]">ATELIER BLANC</p>
        <p>&copy; {new Date().getFullYear()} ATELIER BLANC. All rights reserved.</p>
      </div>
    </footer>
  );
}
