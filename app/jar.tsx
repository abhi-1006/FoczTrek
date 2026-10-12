import { router } from 'expo-router';

import { AppText } from '@/components/AppText';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Screen } from '@/components/Screen';
import { VideoEmbed } from '@/components/VideoEmbed';

export default function JarScreen() {
  return (
    <Screen>
      <AppText variant="title" center>
        The Jar of Life
      </AppText>
      <AppText center>
        Put the big rocks in first. If you fill your jar with sand (small, easy tasks), the important things
        won&apos;t fit. FoczTrek follows this principle.
      </AppText>
      <VideoEmbed youtubeId="6_N_uvq41Pg" title="The Jar of Life" />
      <AppText variant="caption" center>
        Watch the video if the idea is new to you.
      </AppText>
      <PrimaryButton title="Next: sort my tasks" onPress={() => router.push('/matrix')} />
    </Screen>
  );
}
