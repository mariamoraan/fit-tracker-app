import { PageShell } from "@/src/core/components/page-shell/page-shell";
import { Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <PageShell title="Fit Tracker">
      <View style={{ gap: 16 }}>
        <View>
          <Text style={{ fontSize: 14, color: "#a1a1aa" }}>Hoy</Text>

          <Text
            style={{
              marginTop: 4,
              fontSize: 20,
              fontWeight: "600",
              color: "#fafafa",
            }}
          >
            Rutina del día
          </Text>

          <Text
            style={{
              marginTop: 8,
              fontSize: 14,
              color: "#a1a1aa",
            }}
          >
            Aquí verás la rutina recomendada para hoy y el acceso rápido a tu
            sesión.
          </Text>
        </View>

        <View
          style={{
            marginTop: 16,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: "#27272a",
            backgroundColor: "#18181b",
            paddingHorizontal: 16,
            paddingVertical: 12,
          }}
        >
          <Text style={{ fontSize: 14, color: "#a1a1aa" }}>
            Aún no has creado rutinas. Empieza creando tu primera rutina.
          </Text>
        </View>
      </View>
    </PageShell>
  );
}