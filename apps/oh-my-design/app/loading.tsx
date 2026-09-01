export default function Loading() {
  return (
    <main id="main" className="main" aria-busy="true">
      <p className="kicker">불러오는 중</p>
      <h1 id="page-title" tabIndex={-1}>
        화면을 준비하고 있습니다
      </h1>
      <p className="lede">팀 기록을 읽고 있습니다.</p>
      <div className="kpi-grid section-air" data-state="loading">
        <div className="kpi">
          <dt>자리</dt>
          <dd>—</dd>
        </div>
        <div className="kpi">
          <dt>자리</dt>
          <dd>—</dd>
        </div>
        <div className="kpi">
          <dt>자리</dt>
          <dd>—</dd>
        </div>
        <div className="kpi">
          <dt>자리</dt>
          <dd>—</dd>
        </div>
      </div>
    </main>
  );
}
