import { Dialog } from './components/ui/dialog';

import { CreateGoal } from './components/create-goal';
import { Summary } from './components/summary';
import { EmptyGoals } from './components/empty-goals';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getSummary } from './services/get-summary';

export function App() {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: 60000,
  });

  async function refetchAll() {
    queryClient.invalidateQueries({ queryKey: ['summary'] });
    queryClient.invalidateQueries({ queryKey: ['pending-goals'] });
  }

  return (
    <Dialog>
      {data && data.total > 0 ? (
        <Summary data={data} refetchAll={refetchAll} />
      ) : (
        <EmptyGoals />
      )}

      <CreateGoal refetchAll={refetchAll} />
    </Dialog>
  );
}
