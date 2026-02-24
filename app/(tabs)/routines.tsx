import { PageShell } from "@/src/core/components/page-shell/page-shell";
import { PATHS } from "@/src/core/router/paths";
import { Colors } from "@/src/core/theme/colors";
import { Typography } from "@/src/core/theme/theme";
import { useRoutines } from "@/src/features/routines/ui/RoutinesProvider";
import { Link } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  header: {
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  headerTitle: {
    color: Colors.color_zinc_400,
    flex: 1,
  },
  headerLink: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: Colors.color_zinc_100,
    color: Colors.color_zinc_900,
    borderRadius: 12,
    fontSize: Typography.sm.fontSize,
  },
  routinesList: {
    gap: 12,
  },
  routineListItem: {
    paddingVertical: 12,
    paddingRight: 16,
    display: 'flex', 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: Colors.color_zinc_900,
    borderRadius: 12,
  },
  routineInfo: {
    paddingLeft: 12,
    gap: 4,
  },
  routineName: {
    color: Colors.color_zinc_100,
    fontSize: Typography.md.fontSize,
  },
  routineDays: {
    color: Colors.color_zinc_500,
    fontSize: Typography.sm.fontSize,
  },
  indicator: {
    height: 32,
    width: 4, 
    borderRadius: 12,
  }
})

export default function RoutinesScreen() {
  const {loading, routines} = useRoutines()
  return (
    <PageShell title="Rutinas">
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Crea y gestiona tus rutinas de entrenamiento.</Text>
        <Link 
        {...PATHS.CREATE_ROUTINE}
        style={styles.headerLink}
        >
          <Text>Nueva</Text>
        </Link>
      </View>
      <View>
        {loading && (
          <Text>Cargando rutinas...</Text>
        )}
        {!loading && routines.length === 0 && (
          <Text>
            Aún no tienes rutinas. Crea la primera para empezar.
          </Text>
        )}
        {!loading &&
        <View style={styles.routinesList}>
          {
            routines.map((routine) => (
              <Link
                key={routine.id}
                style={styles.routineListItem}
                {...PATHS.ROUTINE(routine.id)}
              >
                  <View
                    style={[styles.indicator, {
                      backgroundColor: routine.color,
                    }]}
                  />
                  
                  <View style={styles.routineInfo}>
                    <Text style={styles.routineName}>{routine.name}</Text>
                    <Text style={styles.routineDays}>
                      {routine.daysOfWeek.length > 0
                        ? `Días: ${routine.daysOfWeek.join(", ")}`
                        : "Sin días asignados"}
                    </Text>
                  </View>
              </Link>
            ))
          }
          </View>
         }
      </View>
    </PageShell>
  );

}