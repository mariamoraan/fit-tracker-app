import { useState } from "react";
import {
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

import { DatePicker } from "@/src/core/components/date-picker/date-picker";
import { COLORS } from "../../domain/constants/colors";
import { WEEK_DAYS } from "../../domain/constants/week-days";
import { Routine, RoutineMetadata } from "../../domain/entities/routine";
import { styles } from './routine-metadata-form.style';

interface Props {
  onChange: (props: RoutineMetadata) => void;
  initialRoutine?: Routine;
}

export const RoutineMetadataForm: React.FC<Props> = ({
  onChange,
  initialRoutine,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [routineData, setRoutineData] = useState<RoutineMetadata>({
    name: initialRoutine?.name ?? "",
    color: initialRoutine?.color ?? COLORS[0],
    daysOfWeek: initialRoutine?.daysOfWeek ?? [],
    startDay: initialRoutine?.startDay ?? new Date(),
  });

  const update = (patch: Partial<RoutineMetadata>) => {
    const next = { ...routineData, ...patch };
    setRoutineData(next);
    onChange(next);
  };

  const toggleDay = (value: number) => {
    const next = routineData.daysOfWeek.includes(value)
      ? routineData.daysOfWeek.filter((d) => d !== value)
      : [...routineData.daysOfWeek, value];
    update({ daysOfWeek: next });
  };

  return (
    <View style={{ gap: 20 }}>
      {/* Nombre */}
      <View style={{ gap: 6 }}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          value={routineData.name}
          onChangeText={name => update({ name })}
          placeholder="Ej: Push Pull Legs"
          placeholderTextColor="#52525b"
        />
      </View>

      {/* Color */}
      <View style={{ gap: 10 }}>
        <Text style={styles.label}>Color</Text>
        <View style={styles.colorPicker}>
          {COLORS.map((color) => {
            const selected = routineData.color === color;
            return (
              <Pressable
                key={color}
                onPress={() => update({ color })}
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
      <View style={{ gap: 10 }}>
        <Text style={styles.label}>Días de entrenamiento</Text>
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
                <Text style={[styles.dayText, active && styles.dayTextActive]}>
                  {day.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Fecha de inicio */}
      <View style={{ gap: 6 }}>
        <Text style={styles.label}>Fecha de inicio</Text>
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
              if (selectedDate) update({ startDay: selectedDate });
            }}
          />
        )}
      </View>
    </View>
  );
};