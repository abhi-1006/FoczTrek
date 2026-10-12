import { router } from 'expo-router';

import { AppText } from '@/components/AppText';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Screen } from '@/components/Screen';

export default function NotFoundScreen() {
  return (
    <Screen>
      <AppText variant="title" center>
        This screen doesn&apos;t exist.
      </AppText>
      <PrimaryButton title="Go to the home screen" onPress={() => router.replace('/')} />
    </Screen>
  );
}
