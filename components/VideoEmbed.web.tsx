import { StyleSheet, View } from 'react-native';

import { colors, radius } from '@/constants/theme';

type Props = {
  youtubeId: string;
  title: string;
};

/** Web YouTube player. Metro picks this file over VideoEmbed.tsx when bundling for web. */
export function VideoEmbed({ youtubeId, title }: Props) {
  return (
    <View style={styles.frame}>
      <iframe
        src={`https://www.youtube.com/embed/${youtubeId}`}
        title={title}
        style={{ width: '100%', height: '100%', border: 0 }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: radius.md,
    overflow: 'hidden',
    backgroundColor: colors.surface,
  },
});
