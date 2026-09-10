export default function Purchase() {
  return (
    <section
      id="purchase"
      className="border-t border-border/70 bg-ink text-paper"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-6 py-20 sm:px-10 sm:py-28 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs tracking-[0.28em] text-gold-soft uppercase">
            Limited Batch
          </p>
          <h2 className="mt-4 font-display text-3xl leading-tight sm:text-4xl">
            이번 시즌, 500장 한정.
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-paper/70">
            소진 시 다음 배치까지 약 3개월이 소요됩니다. 지금 예약하시면
            우선 배송해 드립니다.
          </p>
        </div>

        <a
          href="#"
          className="cursor-pointer rounded-full bg-paper px-8 py-4 text-sm tracking-wide text-ink transition-transform duration-200 hover:scale-[1.03]"
        >
          ₩98,000 — 지금 예약하기
        </a>
      </div>
    </section>
  );
}
