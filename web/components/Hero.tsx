import ProductShowcase from "./ProductShowcase";

export default function Hero() {
  return (
    <section id="viewer" className="mx-auto max-w-6xl px-6 pb-16 pt-14 sm:px-10 sm:pt-20">
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div>
          <p className="text-xs tracking-[0.28em] text-gold uppercase">
            Premium Cotton, One Silhouette
          </p>
          <h1 className="mt-5 font-display text-4xl leading-[1.15] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            단 하나의 티셔츠,
            <br />
            완벽을 위해 다시 만들다.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
            220gsm 헤비웨이트 코튼과 개러먼트 다잉 공정. 계절이 바뀌어도
            변하지 않는 단 하나의 화이트 티셔츠를 소량 생산으로 완성했습니다.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#purchase"
              className="cursor-pointer rounded-full bg-ink px-7 py-3.5 text-sm tracking-wide text-paper transition-transform duration-200 hover:scale-[1.02]"
            >
              지금 예약 구매
            </a>
            <a
              href="#fabric"
              className="cursor-pointer text-sm tracking-wide text-ink-soft underline decoration-border underline-offset-4 transition-colors hover:text-ink"
            >
              원단 살펴보기
            </a>
          </div>
        </div>

        <ProductShowcase />
      </div>
    </section>
  );
}
