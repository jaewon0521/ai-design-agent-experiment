"use client";

export default function ErrorView({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main id="main" className="main">
      <p className="kicker">실패</p>
      <h1 id="page-title" tabIndex={-1}>
        화면을 불러오지 못했습니다
      </h1>
      <p className="lede">잠시 후 다시 시도하세요. 내용은 바뀌지 않습니다.</p>
      <div className="alert" role="alert" data-state="error">
        {error.message || "알 수 없는 오류"}
      </div>
      <div className="actions">
        <button type="button" className="btn" data-cta="primary" onClick={reset}>
          다시 불러오기
        </button>
      </div>
    </main>
  );
}
