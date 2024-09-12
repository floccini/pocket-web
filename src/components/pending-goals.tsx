import { Plus } from 'lucide-react';
import { OutlineButton } from './ui/outline-button';
import { useQuery } from '@tanstack/react-query';
import { getPendingGoals } from '../services/get-pending-goals';
import { createGoalCompletion } from '../services/create-goal-completion';

interface PendingGoalsProps {
  refetchAll: () => void;
}

export function PendingGoals({ refetchAll }: PendingGoalsProps) {
  const { data } = useQuery({
    queryKey: ['pending-goals'],
    queryFn: getPendingGoals,
  });

  if (!data) return null;

  async function handleCompleteGoal(goalId: string) {
    await createGoalCompletion(goalId);

    refetchAll();
  }

  return (
    <div className="flex flex-wrap gap-3">
      {data.map((goal) => {
        return (
          <OutlineButton
            key={goal.id}
            disabled={goal.completionCount >= goal.desiredWeeklyFrequency}
            onClick={() => handleCompleteGoal(goal.id)}
          >
            <Plus className="size-4 text-zinc-600" />
            {goal.title}
          </OutlineButton>
        );
      })}
    </div>
  );
}
