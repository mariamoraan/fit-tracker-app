import { PropsWithChildren, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/src/core/theme/colors';

interface CollapsibleProps {
    title: string;
    isOpen?: boolean;
    setIsOpen?: (open: boolean) => void;
    /** Short label shown on the right when collapsed (e.g. routine name or exercise count) */
    badge?: string;
    /** Accent color dot shown next to the title */
    accentColor?: string;
}

export function Collapsible({
    children,
    title,
    isOpen: controlledOpen,
    setIsOpen: setControlledOpen,
    badge,
    accentColor,
}: PropsWithChildren<CollapsibleProps>) {
    const [internalOpen, setInternalOpen] = useState(false);
    const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
    const setIsOpen = setControlledOpen ?? setInternalOpen;

    return (
        <ThemedView style={styles.container}>
            <TouchableOpacity
                style={[styles.heading, isOpen && styles.headingOpen]}
                onPress={() => setIsOpen(!isOpen)}
                activeOpacity={0.75}
            >
                <View style={styles.headingLeft}>
                    <IconSymbol
                        name="chevron.right"
                        size={14}
                        weight="bold"
                        color={Colors.color_zinc_500}
                        style={{ transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }}
                    />
                    {accentColor && (
                        <View style={[styles.accentDot, { backgroundColor: accentColor }]} />
                    )}
                    <ThemedText type="defaultSemiBold" style={styles.title}>
                        {title}
                    </ThemedText>
                </View>
                {!isOpen && badge && (
                    <View style={styles.badge}>
                        <ThemedText style={styles.badgeText} numberOfLines={1}>
                            {badge}
                        </ThemedText>
                    </View>
                )}
            </TouchableOpacity>

            {isOpen && (
                <ThemedView style={styles.content}>
                    {children}
                </ThemedView>
            )}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 12,
        backgroundColor: '#232326',
        borderWidth: 1,
        borderColor: '#2e2e32',
        overflow: 'hidden',
    },
    heading: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
        paddingHorizontal: 16,
    },
    headingOpen: {
        borderBottomWidth: 1,
        borderBottomColor: '#2e2e32',
    },
    headingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        flex: 1,
    },
    accentDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    title: {
        fontSize: 15,
        color: Colors.color_zinc_100,
    },
    badge: {
        maxWidth: 140,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
        backgroundColor: '#2e2e32',
    },
    badgeText: {
        fontSize: 12,
        color: Colors.color_zinc_400,
    },
    content: {
        padding: 16,
        backgroundColor: 'transparent',
    },
});