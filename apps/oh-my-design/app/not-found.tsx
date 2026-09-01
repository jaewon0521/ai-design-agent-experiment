import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="main">
      <p className="kicker">없음</p>
      <h1 id="page-title" tabIndex={-1}>
        이 팀원을 찾지 못했습니다
      </h1>
      <p className="lede">
        주소의 번호가 샘플 목록에 없습니다. 목록에서 다시 고르세요.
      </p>
      <div className="alert" role="alert" data-state="error">
        없는 팀원 번호입니다.
      </div>
      <div className="actions">
        <Link className="btn" href="/members" data-cta="primary">
          팀원 목록 보기
        </Link>
      </div>
    </main>
  );
}
