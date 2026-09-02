import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { TaskProgressList } from "@/components/TaskProgressList";
import { SPRINT_NAME, tasks } from "@/lib/data";
import { getTeamStats } from "@/lib/selectors";

export const metadata = {
  title: "업무 진행 상황",
};

export default function ProgressPage() {
  const stats = getTeamStats();
  const ordered = [...tasks].sort((a, b) => {
    const rank = {
      blocked: 0,
      in_progress: 1,
      review: 2,
      todo: 3,
      done: 4,
    };
    if (rank[a.status] !== rank[b.status]) {
      return rank[a.status] - rank[b.status];
    }
    return a.dueDate.localeCompare(b.dueDate);
  });

  return (
    <div>
      <PageHeader
        title="업무 진행 상황"
        description={`${SPRINT_NAME}의 업무를 상태와 마감 순으로 확인합니다.`}
      />

      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        <Card>
          <p className="text-sm text-ink-subtle">평균 진행률</p>
          <p className="mt-2 font-mono text-2xl font-semibold">{stats.averageProgress}%</p>
        </Card>
        <Card>
          <p className="text-sm text-ink-subtle">완료된 업무</p>
          <p className="mt-2 font-mono text-2xl font-semibold">
            {stats.taskDone}/{stats.taskTotal}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-ink-subtle">차단된 업무</p>
          <p className="mt-2 font-mono text-2xl font-semibold text-danger">
            {stats.taskBlocked}
          </p>
        </Card>
      </div>

      <Card className="mb-6">
        <ProgressBar
          value={Math.round((stats.taskDone / stats.taskTotal) * 100)}
          label="스프린트 완료율"
          tone="success"
        />
      </Card>

      <TaskProgressList tasks={ordered} />
    </div>
  );
}
