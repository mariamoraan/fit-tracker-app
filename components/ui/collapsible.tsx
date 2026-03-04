import { PropsWithChildren, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/src/core/theme/colors';

export function Collapsible({ children, title, isOpen: controlledOpen, setIsOpen: setControlledOpen }: PropsWithChildren & { title: string; isOpen?: boolean; setIsOpen?: (open: boolean) => void }) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setIsOpen = setControlledOpen ?? setInternalOpen;
  const theme = useColorScheme() ?? 'light';

  return (
    <ThemedView style={{
      marginBottom: 16,
      borderRadius: 14,
      backgroundColor: Colors.color_zinc_800,
      borderWidth: 1,
      borderColor: Colors.color_zinc_800,
      overflow: 'hidden',
    }}>
      <TouchableOpacity
        style={[styles.heading, {
          paddingVertical: 16,
          paddingHorizontal: 18,
          backgroundColor: Colors.color_zinc_800,
          borderBottomWidth: isOpen ? 1 : 0,
          borderBottomColor: Colors.color_zinc_800,
        }]}
        onPress={() => setIsOpen(!isOpen)}
        activeOpacity={0.8}>
        <IconSymbol
          name="chevron.right"
          size={22}
          weight="bold"
          color={Colors.color_zinc_100}
          style={{ transform: [{ rotate: isOpen ? '90deg' : '0deg' }], marginRight: 8 }}
        />
        <ThemedText type="defaultSemiBold" style={{ fontSize: 17, color: Colors.color_zinc_100 }}>
          {title}
        </ThemedText>
      </TouchableOpacity>
      {isOpen && <ThemedView style={[styles.content, { padding: 16, backgroundColor: 'transparent' }]}>{children}</ThemedView>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
});
