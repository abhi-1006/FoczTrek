import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

import { colors, radius } from '@/constants/theme';

type Props = {
  youtubeId: string;
  title: string;
};

/** Native (iOS/Android) YouTube player. The web build uses VideoEmbed.web.tsx instead. */
export function VideoEmbed({ youtubeId, title }: Props) {
  return (
    <View style={styles.frame} accessibilityLabel={title}>
      <WebView
        source={{ uri: `https://www.youtube.com/embed/${youtubeId}?playsinline=1` }}
        allowsFullscreenVideo
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction
        style={styles.webview}
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
  webview: { flex: 1, backgroundColor: colors.surface },
});
