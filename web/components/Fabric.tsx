const specs = [
  { label: "중량", value: "220gsm", desc: "적당히 무게감 있는 헤비웨이트" },
  { label: "원사", value: "장섬유 코튼 100%", desc: "보풀 없이 오래가는 표면" },
  { label: "공정", value: "개러먼트 다잉", desc: "봉제 후 염색으로 자연스러운 톤" },
  { label: "생산", value: "스몰 배치", desc: "시즌당 500장 한정" },
];

export default function Fabric() {
  return (
    <section id="fabric" className="border-t border-border/70 bg-paper-deep">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-28">
        <div className="max-w-xl">
          <p className="text-xs tracking-[0.28em] text-gold uppercase">The Fabric</p>
          <h2 className="mt-4 font-display text-3xl leading-tight sm:text-4xl">
            보이지 않는 곳까지 타협하지 않았습니다.
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/70 bg-border/70 sm:grid-cols-4">
          {specs.map((s) => (
            <div key={s.label} className="bg-card px-6 py-8">
              <p className="text-xs tracking-[0.2em] text-muted uppercase">{s.label}</p>
              <p className="mt-3 font-display text-xl text-ink">{s.value}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
