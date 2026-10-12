import { Redirect, router, Stack, useLocalSearchParams } from 'expo-router';

import { AppText } from '@/components/AppText';
import { QuadrantForm } from '@/components/QuadrantForm';
import { Screen } from '@/components/Screen';
import { useAppState } from '@/context/AppStateContext';
import { tasksIn } from '@/lib/appState';
import { getQuadrant, isQuadrantId, nextQuadrant, QUADRANT_ORDER } from '@/lib/quadrants';

export function generateStaticParams() {
  return QUADRANT_ORDER.map((quadrant) => ({ quadrant }));
}

export default function PlanQuadrantScreen() {
  const { quadrant: param } = useLocalSearchParams<{ quadrant: string }>();
  const { state, setQuadrantTasks } = useAppState();

  if (!isQuadrantId(param)) return <Redirect href="/matrix" />;

  const quadrant = getQuadrant(param);
  const next = nextQuadrant(param);
  const step = QUADRANT_ORDER.indexOf(param) + 1;

  return (
    <Screen>
      <Stack.Screen options={{ title: `Plan ${step} of ${QUADRANT_ORDER.length}` }} />
      <AppText variant="label" center>
        Step {step} of {QUADRANT_ORDER.length}
      </AppText>
      <QuadrantForm
        key={param}
        quadrant={quadrant}
        initialTasks={tasksIn(state, param)}
        submitLabel={next ? `Save & next: ${getQuadrant(next).title}` : 'Save & continue'}
        onSubmit={(drafts) => {
          setQuadrantTasks(param, drafts);
          router.push(next ? `/plan/${next}` : '/brain');
        }}
      />
    </Screen>
  );
}
