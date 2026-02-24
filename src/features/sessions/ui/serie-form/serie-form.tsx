import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { styles } from "./serie-form.styles";

interface Props {
    handleCancel?: () => void;
    handleSerieChange: (serie: {reps?: number, weight?: number}) => void;
    initialSerie?: {reps?: number, weight?: number};
}

export const SerieForm: React.FC<Props> = (props) => {
    const {handleCancel, handleSerieChange, initialSerie} = props;
    const [serie, setSerie] = useState<{reps?: number, weight?: number} | undefined>(initialSerie ?? {});

    const onCancel = () => {
        if(!handleCancel) return
        handleCancel();
        setSerie(undefined)
    }

    const onSubmitSerie = () => {
        handleSerieChange({reps: serie?.reps, weight: serie?.weight})
        setSerie(undefined)
    }

    return (
        <View style={{gap: 8}}>
            <View style={{flexDirection: 'row', gap: 4}}>
                <View style={[styles.field, styles.metricsField]}>
                    <Text style={styles.label}>Reps</Text>
                    <TextInput
                    keyboardType="numeric"
                    value={serie?.reps ? serie?.reps.toString() : ''}
                    onChangeText={(value) => setSerie(prev => ({...prev, reps: Number(value) ?? undefined}))}
                    inputMode="numeric"
                    style={[styles.input, styles.metricsInput]} 
                    />
                </View>
                <View style={[styles.field, styles.metricsField]}>
                    <Text style={styles.label}>Peso (kg)</Text>
                    <TextInput
                    value={serie?.weight ? serie?.weight.toString() : ''}
                    onChangeText={(value) => setSerie(prev => ({...prev, weight: Number(value) ?? undefined}))}
                    inputMode="decimal"
                    style={[styles.input, styles.metricsInput]} 
                    />
                </View>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end', gap: 12, paddingTop: 4}}>
                <Pressable
                    onPress={onCancel}
                    style={styles.cancelButton}
                >
                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                </Pressable>
                <Pressable
                    onPress={onSubmitSerie}
                    style={styles.saveButton}
                >
                    <Text style={styles.saveButtonText}>Guardar</Text>
                </Pressable>
            </View>
        </View>
    )
}