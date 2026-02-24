import { formatDateToISO, getDaysInMonth } from "@/src/core/date";
import { useMemo } from "react";
import { Pressable, Text, View } from "react-native";
import { useCalendarContext } from "../../CalendarProvider";
import { DayBox } from "../day-box/day-box";
import { styles } from "./sessions-calendar.styles";

const WEEK_DAY_LABELS = ["D", "L", "M", "X", "J", "V", "S"];

const MONTH_NAMES = [
  "Enero", "Febrero", "Marzo", "Abril",
  "Mayo", "Junio", "Julio", "Agosto",
  "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

export const SessionsCalendar: React.FC= () => {
  const {
    currentDate, 
    startDay, 
    goToPreviousMonth, 
    goToNextMonth, 
    goToToday, 
    selectedDate, 
    setSelectedDate
  } = useCalendarContext();

  const year = currentDate?.getFullYear();
  const month = currentDate?.getMonth();

  const days = useMemo(
    () => getDaysInMonth(year, month),
    [year, month]
  );

  const firstDayOfWeek = useMemo(() => {
    const firstDay = new Date(year, month, 1);
    return firstDay.getDay();
  }, [year, month]);

  const sortedWeekDayLabels = [
    ...WEEK_DAY_LABELS.slice(startDay),
    ...WEEK_DAY_LABELS.slice(0, startDay),
  ];

  const emptyDays = Array.from(
    { length: (firstDayOfWeek + 7 - (startDay ?? 0)) % 7 },
    (_, i) => i
  );

  const calendarDays: ({isEmpty: true, day: number} | {isEmpty: false, day: Date})[] = [
    ...emptyDays.map((day: number) => ({ isEmpty: true as const, day })),
    ...days.map((day: Date) => ({ isEmpty: false as const, day })),
  ];

  const chunkSize = 7;
  const calendarChunks = [];

  for (let i = 0; i < calendarDays.length; i += chunkSize) {
    let chunk = calendarDays.slice(i, i + chunkSize);
    calendarChunks.push(chunk);
  }
  
  // Rellenar el último chunk con emptyDays
  const lastChunk = calendarChunks[calendarChunks.length - 1];
  
  if (lastChunk && lastChunk.length < chunkSize) {
    const missing = chunkSize - lastChunk.length;
  
    const padding = Array.from({ length: missing }, (_, i) => ({
      isEmpty: true as const,
      day: i,
    }));
  
    lastChunk.push(...padding);
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>
          {MONTH_NAMES[month]} {year}
        </Text>

        <View style={styles.actions}>
          <Pressable onPress={goToPreviousMonth} style={styles.button}>
            <Text style={styles.buttonText}>←</Text>
          </Pressable>

          <Pressable onPress={goToToday} style={styles.button}>
            <Text style={styles.buttonText}>Hoy</Text>
          </Pressable>

          <Pressable onPress={goToNextMonth} style={styles.button}>
            <Text style={styles.buttonText}>→</Text>
          </Pressable>
        </View>
      </View>

      {/* WEEK LABELS */}
      <View style={styles.weekRow}>
        {sortedWeekDayLabels.map((label) => (
          <View key={label} style={styles.weekDay}>
            <Text style={styles.weekDayText}>{label}</Text>
          </View>
        ))}
      </View>

      {/* DAYS GRID */}
      <View style={styles.daysGrid}>
        {
          calendarChunks.map((chunk, index) => (
            <View style={styles.daysGridChunk} key={index}>
              {chunk.map(({day, isEmpty}) => (
                isEmpty 
                ? <View key={`empty-${day}`} style={styles.emptyCell} />
                : (
                  <View key={formatDateToISO(day)} style={styles.dayCell}>
                    <DayBox
                      day={day}
                      handleDayClick={() => setSelectedDate(formatDateToISO(day))}
                      selectedDate={selectedDate}
                    />
                  </View>
                )
              ))}
            </View>
          ))
        }
      </View>
    </View>
  );
};