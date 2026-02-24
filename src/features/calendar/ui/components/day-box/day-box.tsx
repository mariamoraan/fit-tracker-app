import { formatDateToISO, getTodayISODate } from "@/src/core/date";
import { useRoutines } from "@/src/features/routines/ui/RoutinesProvider";
import { Pressable, Text, View } from "react-native";
import { useCalendar } from "../../useCalendar";
import { styles } from './day-box.styles';

interface Props {
  day: Date;
  selectedDate?: string;
  handleDayClick: (dateISO: string) => void;
}

export const DayBox: React.FC<Props> = ({
  day,
  handleDayClick,
  selectedDate,
}) => {
  const year = day.getFullYear();
  const month = day.getMonth();

  const { routines } = useRoutines();
  const { calendarDays } = useCalendar(routines, year, month);

  const today = getTodayISODate();
  const dateISO = formatDateToISO(day);
  const dayData = calendarDays.get(dateISO);

  const isToday = dateISO === today;
  const isSelected = selectedDate === dateISO;

  const scheduledRoutines =
    dayData?.scheduledRoutinesIds?.length
      ? routines.filter((r) =>
          dayData.scheduledRoutinesIds?.includes(r.id)
        )
      : null;

  const hasCompletedSession = (routineId: string) =>
    dayData?.completedSessionIds.some(
      (completedSession) => completedSession.routineId === routineId
    );

  return (
    <Pressable
      onPress={() => handleDayClick(dateISO)}
      style={[
        styles.container,
        isSelected && styles.selected,
        isToday && styles.today,
      ]}
    >
      <Text
        style={[
          styles.text,
          isToday && styles.textToday,
          isSelected && styles.textSelected,
        ]}
      >
        {day.getDate()}
      </Text>

      {scheduledRoutines && (
        <View style={styles.indicatorsList}>
          {scheduledRoutines.map((routine) => {
            const completed = hasCompletedSession(routine.id);

            return (
              <View
                key={routine.id}
                style={[
                  styles.indicator,
                  {
                    borderColor: routine.color,
                    backgroundColor: completed
                      ? routine.color
                      : "transparent",
                  },
                ]}
              />
            );
          })}
        </View>
      )}
    </Pressable>
  );
};