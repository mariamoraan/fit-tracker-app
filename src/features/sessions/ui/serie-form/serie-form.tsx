import { useState } from "react";
import {
    Keyboard,
    Pressable,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { styles } from "./serie-form.styles";

interface Props {
    handleCancel?: () => void;
    handleSerieChange: (serie: { reps?: number; weight?: number }) => void;
    initialSerie?: { reps?: number; weight?: number };
}

export const SerieForm: React.FC<Props> = ({
    handleCancel,
    handleSerieChange,
    initialSerie
}) => {

    const [serie, setSerie] = useState<{ reps?: number; weight?: number } | undefined>(
        initialSerie ?? {}
    );

    const onCancel = () => {
        Keyboard.dismiss();
        if (handleCancel) handleCancel();
        setSerie(undefined);
    };

    const onSubmitSerie = () => {
        handleSerieChange({
            reps: serie?.reps,
            weight: serie?.weight
        });

        setSerie(undefined);
        Keyboard.dismiss();
    };

    return (
        <View >
            <View>
                <View
                    style={{
                        flexDirection: "row",
                        gap: 4,
                        marginBottom: 8
                    }}
                >
                    {/* REPS */}
                    <View style={[styles.field, styles.metricsField]}>
                        <Text style={styles.label}>Reps</Text>
                        <TextInput
                            submitBehavior="blurAndSubmit"
                            keyboardType="numeric"
                            inputMode="numeric"
                            value={
                                serie?.reps !== undefined
                                    ? String(serie.reps)
                                    : ""
                            }
                            onChangeText={(value) =>
                                setSerie(prev => ({
                                    ...prev,
                                    reps: value === "" ? undefined : Number(value)
                                }))
                            }
                            style={[styles.input, styles.metricsInput]}
                        />
                    </View>

                    {/* WEIGHT */}
                    <View style={[styles.field, styles.metricsField]}>
                        <Text style={styles.label}>Peso (kg)</Text>
                        <TextInput
                            submitBehavior="blurAndSubmit"
                            keyboardType="decimal-pad"
                            inputMode="decimal"
                            value={
                                serie?.weight !== undefined
                                    ? String(serie.weight)
                                    : ""
                            }
                            onChangeText={(value) =>
                                setSerie(prev => ({
                                    ...prev,
                                    weight: value === "" ? undefined : Number(value)
                                }))
                            }
                            style={[styles.input, styles.metricsInput]}
                        />
                    </View>
                    </View>
            </View>

            {/* BUTTONS */}
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    gap: 12,
                }}
            >
                <Pressable
                    onPress={onCancel}
                    style={styles.cancelButton}
                >
                    <Text style={styles.cancelButtonText}>
                        Cancelar
                    </Text>
                </Pressable>

                <TouchableOpacity
                    key="btn-save"
                    onPress={onSubmitSerie}
                    style={styles.saveButton}
                >
                    <Text style={styles.saveButtonText}>
                        Guardar
                    </Text>
                </TouchableOpacity>
            </View>
               
        </View>
    );
};