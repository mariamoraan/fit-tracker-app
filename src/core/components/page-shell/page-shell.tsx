import { ReactNode } from "react";
import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface PageShellProps {
  title?: string;
  style?: StyleSheet;
  children: ReactNode;
}

export function PageShell({ title, children }: PageShellProps) {
    const insets = useSafeAreaInsets();
  return (
    <View 
    style={{
        flex: 1,
        paddingTop: insets.top,
    }}
    >
      <View style={{ flex: 1, maxWidth: 480, alignSelf: "center", width: "100%" }}>
        
        {/* Header */}
        <View
          style={{
            paddingHorizontal: 16,
            paddingTop: 24,
            paddingBottom: 8,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "600", color: "#fafafa" }}>
            {title}
          </Text>
        </View>

        {/* Scrollable Content */}
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: 96,
          }}
        >
          {children}
        </ScrollView>
      </View>
    </View>
  );
}