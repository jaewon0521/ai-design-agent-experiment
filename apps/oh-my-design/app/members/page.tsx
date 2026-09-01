import type { Metadata } from "next";
import { MemberDirectory } from "@/components/member-directory";
import { SAMPLE_TODAY_LABEL, members } from "@/lib/team";

export const metadata: Metadata = {
  title: "팀원 목록",
};

export default function MembersPage() {
  return (
    <main id="main" className="main" tabIndex={-1}>
      <p className="kicker">팀원</p>
      <h1 id="page-title" tabIndex={-1}>
        팀원 목록
      </h1>
      <p className="lede">
        {SAMPLE_TODAY_LABEL} 기준 샘플 팀원 {members.length}명입니다. 상태 필터와
        이름 검색으로 목록을 좁힌 뒤, 한 사람의 업무 상태로 들어갑니다.
      </p>
      <div className="section-air">
        <MemberDirectory />
      </div>
    </main>
  );
}
