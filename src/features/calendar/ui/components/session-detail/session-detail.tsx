import { PATHS } from "@/src/core/router/paths";
import { useRoutines } from "@/src/features/routines/ui/RoutinesProvider";
import { CreateSessionUseCase } from "@/src/features/sessions/application/use-cases/CreateSession";
import { GetSessionsByDateUseCase } from "@/src/features/sessions/application/use-cases/GetSessionsByDateUseCase";
import { WorkoutSession } from "@/src/features/sessions/domain/entities/session";
import { LocalStorageSessionRepository } from "@/src/features/sessions/infrastructure/storage/LocalStorageSessionRepository";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useCalendarContext } from "../../CalendarProvider";
import { styles } from "./session-detail.styles";

export const SessionDetail = () => {
    const router = useRouter();
    const {selectedDate} = useCalendarContext();
    const { routines, getRoutineById } = useRoutines();
    const [sessions, setSessions] = useState<WorkoutSession[]>([]);
    const [loadingSessions, setLoadingSessions] = useState(false);
    const [selectedRoutineId, setSelectedRoutineId] = useState<string>('');
    const [creatingSession, setCreatingSession] = useState(false);
    const [showAddSessionForm, setShowAddSessionForm] = useState(false)

    const handleCreateSession = async (routineId: string) => {
        if (!selectedDate || !routineId) return;
        const routine = getRoutineById(routineId);
        if (!routine) return;
        setCreatingSession(true);
        try {
          const useCase = new CreateSessionUseCase(
            new LocalStorageSessionRepository(),
          );
          const newSession = await useCase.execute({
            routineId,
            date: selectedDate,
          });
          setSessions(prev => ([...prev, newSession]))
          router.push({
            pathname: PATHS.START_SESSION({sessionId: newSession.id}).pathname,
            params:  PATHS.START_SESSION({sessionId: newSession.id}).params
          })
        } catch (error) {
            console.error("Error creating session:", error);
        } finally {
          setCreatingSession(false);
          setShowAddSessionForm(false);
        }
      };

    useEffect(() => {
        const loadSessions = async () => {
          if (!selectedDate) {
            setSessions([]);
            return;
          }
    
          setLoadingSessions(true);
          const useCase = new GetSessionsByDateUseCase(
            new LocalStorageSessionRepository(),
          );
          const daySessions = await useCase.execute(selectedDate);
          setSessions(daySessions);
          setLoadingSessions(false);
        };
        void loadSessions();
      }, [selectedDate]);
  if (!selectedDate) return null;

  const weekDay = new Date(selectedDate).getDay();
  const completedSessions = sessions?.filter(session => session.status === 'completed')?.length ?? 0
  const scheduledRoutines = routines?.filter(routine => routine.daysOfWeek.includes(weekDay) && sessions.every(session => session.routineId !== routine.id))

  return (
    <View style={styles.container}>
      {/* Sessions */}
      {!loadingSessions && sessions.length > 0 && (
        <View style={styles.sessionsList}>
          {sessions.map((session: any) => {
            const routine = getRoutineById(session.routineId);

            return (
              <View key={session.id} style={styles.sessionCard}>
                <Pressable
                  onPress={() =>
    
                   router.push({
                    pathname: PATHS.START_SESSION({sessionId: session.id}).pathname,
                    params: PATHS.START_SESSION({sessionId: session.id}).params
                   })
                  }
                  style={styles.sessionHeader}
                >
                  <View style={styles.sessionHeaderLeft}>
                    {routine && (
                      <View
                        style={[
                          styles.routineColorBar,
                          { backgroundColor: routine.color },
                        ]}
                      />
                    )}

                    <View>
                      <Text style={styles.sessionRoutineName}>
                        {routine?.name ?? "Rutina desconocida"}
                      </Text>

                      <Text style={styles.sessionStats}>
                        {session.exerciseLogs.reduce(
                          (acc: number, log: any) =>
                            acc + log.sets.length,
                          0
                        )}{" "}
                        series totales
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.expandIcon}>
                    ▶
                  </Text>
                </Pressable>
              </View>
            );
          })}
        </View>
      )}

        {scheduledRoutines.map(routine => (
            <View key={routine.id} style={styles.sessionCard}>
                <Pressable onPress={() => handleCreateSession(routine.id)} style={styles.sessionHeader} key={routine.id}>
                    <View style={styles.sessionHeaderLeft}>
                        {routine && (
                        <View
                            style={[
                            styles.routineColorBar,
                            { backgroundColor: routine.color },
                            ]}
                        />
                        )}

                        <View>
                        <Text style={styles.sessionRoutineName}>
                            {routine?.name ?? "Rutina desconocida"}
                        </Text>
                        <Text style={styles.sessionStats}>Comenzar entrenamiento</Text>
                        </View>
                    </View>

                    <Text style={styles.expandIcon}>
                        ▶
                    </Text>
                </Pressable>
            </View>
        ))}

      {/* Add session */}
        <View style={styles.addSessionSection}>
            <Pressable style={styles.addSessionButton} onPress={() => setShowAddSessionForm(true)}>
                <Text style={styles.addSessionButtonTitle}>
                Añadir sesión
                </Text>
            </Pressable>
            {
                showAddSessionForm && (
                    <View style={styles.addSessionSectionForm}>
                        <Dropdown
                            data={routines?.map(routine => ({label: routine.name, value: routine.id}))}
                            labelField="label"
                            valueField="value"
                            placeholder="Selecciona una opción"
                            value={selectedRoutineId}
                            onChange={(item) => setSelectedRoutineId(item.value)}
                            style={{
                                borderWidth: 1,
                                borderColor: "white",
                                borderRadius: 8,
                                padding: 12,
                                flex: 1,
                            }}
                    
                            placeholderStyle={{
                                color: "white",
                            }}
                    
                            selectedTextStyle={{
                                color: "white",
                            }}
                    
                            itemTextStyle={{
                                color: "black",
                            }}
                    
                            iconStyle={{
                                tintColor: "white",
                            }}
                            />
                        <Pressable
                        onPress={() => handleCreateSession(selectedRoutineId)}
                        disabled={!selectedRoutineId || creatingSession}
                        style={styles.createButton}
                        >
                        <Text style={styles.createButtonText}>
                            {creatingSession ? "..." : "Crear"}
                        </Text>
                        </Pressable >
                    </View>
                )
            }
        </View>
    </View>
  );
};