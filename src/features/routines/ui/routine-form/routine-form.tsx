// RoutineForm.tsx

import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View
} from "react-native";


import { DatePicker } from "@/src/core/components/date-picker/date-picker";
import { COLORS } from "../../domain/constants/colors";
import { WEEK_DAYS } from "../../domain/constants/week-days";
import { Routine, RoutineMetadata } from "../../domain/entities/routine";
import { styles } from './routine-form.style';

interface Props {
  handleSubmit: (props: RoutineMetadata) => void;
  isSubmitting: boolean;
  initialRoutine?: Routine;
}

export const RoutineForm: React.FC<Props> = ({
  handleSubmit,
  isSubmitting,
  initialRoutine,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [routineData, setRoutineData] = useState<RoutineMetadata>({
    name: initialRoutine?.name ?? "",
    color: initialRoutine?.color ?? COLORS[0],
    daysOfWeek: initialRoutine?.daysOfWeek ?? [],
    startDay: initialRoutine?.startDay ?? new Date(),
  });

  const toggleDay = (value: number) => {
    setRoutineData((prev) => ({
      ...prev,
      daysOfWeek: prev.daysOfWeek.includes(value)
        ? prev.daysOfWeek.filter((d) => d !== value)
        : [...prev.daysOfWeek, value],
    }));
  };

  const onSubmit = () => {
    if (!routineData.name.trim() || isSubmitting) return;
    handleSubmit(routineData);
  };

  return (
    <View style={styles.form}>
      {/* Nombre */}
      <View style={styles.field}>
        <Text style={styles.label}>Nombre de la rutina</Text>
        <TextInput
          value={routineData.name}
          onChangeText={(text) =>
            setRoutineData((prev) => ({ ...prev, name: text }))
          }
          placeholder="Ej: Push Pull Legs"
          placeholderTextColor="#71717a"
          style={styles.input}
        />
      </View>

      {/* Color */}
      <View style={styles.field}>
        <Text style={styles.label}>Color identificador</Text>
        <View style={styles.colorPicker}>
          {COLORS.map((color) => {
            const selected = routineData.color === color;
            return (
              <Pressable
                key={color}
                onPress={() =>
                  setRoutineData((prev) => ({ ...prev, color }))
                }
                style={[
                  styles.colorButton,
                  { backgroundColor: color },
                  selected && styles.colorButtonSelected,
                ]}
              />
            );
          })}
        </View>
      </View>

      {/* Días */}
      <View style={styles.field}>
        <Text style={styles.label}>Días de la semana</Text>
        <View style={styles.daysRow}>
          {WEEK_DAYS.map((day) => {
            const active = routineData.daysOfWeek.includes(day.value);
            return (
              <Pressable
                key={day.value}
                onPress={() => toggleDay(day.value)}
                style={[
                  styles.dayButton,
                  active ? styles.dayActive : styles.dayInactive,
                ]}
              >
                <Text
                  style={[
                    styles.dayText,
                    active && styles.dayTextActive,
                  ]}
                >
                  {day.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Fecha */}
      <View style={styles.field}>
        <Text style={styles.label}>¿Cuándo empezamos?</Text>

        <Pressable
          style={styles.input}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={{ color: "#fafafa" }}>
            {routineData.startDay.toLocaleDateString()}
          </Text>
        </Pressable>

        {showDatePicker && (
          <DatePicker
            value={routineData.startDay}
            onChange={(selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setRoutineData((prev) => ({
                  ...prev,
                  startDay: selectedDate,
                }));
              }
            }}
          />
        )}
      </View>

      {/* Submit */}
      <Pressable
        onPress={onSubmit}
        disabled={!routineData.name.trim() || isSubmitting}
        style={[
          styles.submitButton,
          (!routineData.name.trim() || isSubmitting) &&
            styles.submitDisabled,
        ]}
      >
        {isSubmitting ? (
          <ActivityIndicator color="black" />
        ) : (
          <Text style={styles.submitText}>Guardar cambios</Text>
        )}
      </Pressable>
    </View>
  );
};