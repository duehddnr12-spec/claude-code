export default function Story() {
  return (
    <section id="story" className="mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-28">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="text-xs tracking-[0.28em] text-gold uppercase">Story</p>
          <h2 className="mt-4 font-display text-3xl leading-tight sm:text-4xl">
            화려함 대신, 완성도를 택했습니다.
          </h2>
        </div>
        <div className="space-y-6 text-base leading-relaxed text-ink-soft">
          <p>
            ATELIER BLANC는 단 하나의 제품만 만듭니다. 여러 컬러와 핏 대신,
            누구에게나 어울리는 하나의 실루엣을 오래 다듬는 쪽을 선택했습니다.
          </p>
          <p>
            매 시즌 같은 공장, 같은 원사, 같은 장인이 만드는 이 티셔츠는
            해가 지나도 같은 무게와 같은 촉감을 유지합니다. 유행이 아니라
            기본을 만드는 브랜드입니다.
          </p>
        </div>
      </div>
    </section>
  );
}
