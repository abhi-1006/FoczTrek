import { router } from 'expo-router';

import { AppText } from '@/components/AppText';
import { IllustratedStep } from '@/components/IllustratedStep';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Screen } from '@/components/Screen';
import { colors } from '@/constants/theme';

// Based on Tim Urban's "Inside the mind of a master procrastinator".
const STEPS = [
  { image: require('@/assets/images/rationalthinker.webp'), caption: 'This is the rational human, focused on their goals.' },
  {
    image: require('@/assets/images/monkey.webp'),
    caption: "This is the Instant Gratification Monkey. It wants fun right now and doesn't care about the future.",
  },
  {
    image: require('@/assets/images/monkeytake.webp'),
    caption: 'Every time you start a task, they fight for the wheel. Whoever has more energy wins.',
  },
  { image: require('@/assets/images/monkeytakeover.webp'), caption: 'When the monkey has more energy, it takes over.' },
  { image: require('@/assets/images/panicmonster.webp'), caption: 'This is the Panic Monster, the only thing the monkey fears.' },
  { image: require('@/assets/images/panicmonstert.webp'), caption: 'The Panic Monster only wakes up when a deadline gets close.' },
  {
    image: require('@/assets/images/frationalthinker.webp'),
    caption: "The monkey runs away, but now the human is stressed because there isn't enough time left.",
  },
];

export default function BrainScreen() {
  return (
    <Screen>
      <AppText variant="title" center>
        How your brain works
      </AppText>
      {STEPS.map((step) => (
        <IllustratedStep key={step.caption} image={step.image} caption={step.caption} />
      ))}
      <AppText variant="heading" color={colors.brand} center>
        Before you start any task, ask yourself: who is operating my brain right now?
      </AppText>
      <PrimaryButton title="See my plan" onPress={() => router.push('/summary')} />
    </Screen>
  );
}
