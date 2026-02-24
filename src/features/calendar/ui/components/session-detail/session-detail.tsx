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

const MONTH_NAMES = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

function formatDateDisplay(dateISO: string): string {
    const [year, month, day] = dateISO.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    const dayName = date.toLocaleDateString("es-ES", { weekday: "long" });
    return `${dayName.charAt(0).toUpperCase() + dayName.slice(1)}, ${day} de ${MONTH_NAMES[month - 1]} ${year}`;
  }

export const SessionDetail = () => {
    const router = useRouter();
    const {selectedDate} = useCalendarContext();
    const { routines, getRoutineById } = useRoutines();
    const [sessions, setSessions] = useState<WorkoutSession[]>([]);
    const [loadingSessions, setLoadingSessions] = useState(false);
    const [expandedSessionId, setExpandedSessionId] = useState<string | null>(null);
    const [selectedRoutineId, setSelectedRoutineId] = useState<string>('');
    const [creatingSession, setCreatingSession] = useState(false);

    const handleCreateSession = async () => {
        if (!selectedDate || !selectedRoutineId) return;
    
        const routine = getRoutineById(selectedRoutineId);
        if (!routine || routine.exercises.length === 0) return;
        setCreatingSession(true);
        try {
          const useCase = new CreateSessionUseCase(
            new LocalStorageSessionRepository(),
          );
          const newSession = await useCase.execute({
            routineId: selectedRoutineId,
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
          setExpandedSessionId(null);
        };
        void loadSessions();
      }, [selectedDate]);
  if (!selectedDate) return null;
  const completedSessions = sessions?.filter(session => session.status === 'completed')?.length ?? 0
  return (
    <View style={styles.container}>
      {/* Header */}
      <View>
        <Text style={styles.dateText}>
          {formatDateDisplay(selectedDate)}
        </Text>

        {loadingSessions ? (
          <Text style={styles.smallMutedText}>
            Cargando sesiones...
          </Text>
        ) : (
          <Text style={styles.smallMutedText}>
            {completedSessions} sesión
            {completedSessions !== 1 ? "es" : ""} completada
            {completedSessions !== 1 ? "s" : ""}
          </Text>
        )}
      </View>

      {/* Sessions */}
      {!loadingSessions && sessions.length > 0 && (
        <View style={styles.sessionsList}>
          {sessions.map((session: any) => {
            const routine = getRoutineById(session.routineId);
            const isExpanded = expandedSessionId === session.id;

            return (
              <View key={session.id} style={styles.sessionCard}>
                <Pressable
                  onPress={() =>
                    /** 
                    setExpandedSessionId(
                      isExpanded ? null : session.id
                    )*/
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
                    {isExpanded ? "▼" : "▶"}
                  </Text>
                </Pressable>

                {isExpanded && (
                  <View style={styles.sessionContent}>
                    {session.exerciseLogs.map((log: any) => {
                      const exercise = routine?.exercises.find(
                        (e: any) =>
                          e.id === log.routineExerciseId
                      );

                      return (
                        <View
                          key={log.routineExerciseId}
                          style={styles.exerciseBlock}
                        >
                          <Text style={styles.exerciseName}>
                            {exercise?.name ??
                              "Ejercicio desconocido"}
                          </Text>

                          {log.sets.length > 0 ? (
                            <View style={styles.setsContainer}>
                              {log.sets.map((set: any) => (
                                <View
                                  key={set.id}
                                  style={styles.setRow}
                                >
                                  <Text style={styles.setNumber}>
                                    #
                                    {set.setNumber
                                      .toString()
                                      .padStart(2, "0")}
                                  </Text>

                                  <Text style={styles.setText}>
                                    {set.reps} reps
                                    {set.weight
                                      ? ` · ${set.weight} kg`
                                      : ""}
                                  </Text>
                                </View>
                              ))}
                            </View>
                          ) : (
                            <Text style={styles.emptySetsText}>
                              Sin series registradas
                            </Text>
                          )}
                        </View>
                      );
                    })}
                  </View>
                )}
              </View>
            );
          })}
        </View>
      )}

      {/* Add session */}
        <View style={styles.addSessionSection}>
            <Text style={styles.addSessionTitle}>
            Añadir sesión
            </Text>
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
                onPress={handleCreateSession}
                disabled={!selectedRoutineId || creatingSession}
                style={styles.createButton}
                >
                <Text style={styles.createButtonText}>
                    {creatingSession ? "..." : "Crear"}
                </Text>
                </Pressable >
                </View>
            </View>
    </View>
  );
};