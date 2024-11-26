import { useHabits } from "@/hooks/useHabits";
import { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CreateHabitModal({ open, onClose }: Props) {
  const [newHabitName, setNewHabitName] = useState("");

  const { create } = useHabits();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={open}
      onRequestClose={() => {
        onClose();
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Create habit</Text>

          <TextInput
            style={styles.modalInput}
            onChangeText={(text) => setNewHabitName(text)}
            value={newHabitName}
          />

          <View style={styles.buttonContainer}>
            <Pressable style={[styles.button]} onPress={() => onClose()}>
              <Text style={styles.closeTextStyle}>Cancel</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.buttonCreate]}
              onPress={() => {
                create(newHabitName);
                setNewHabitName("");
                onClose();
              }}
            >
              <Text style={styles.createTextStyle}>Create</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "#2a313c",
    borderRadius: 5,
    padding: 35,
    alignItems: "center",
  },
  button: {
    borderRadius: 5,
    padding: 10,
  },
  buttonCreate: {
    backgroundColor: "#007AFF",
  },
  createTextStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  closeTextStyle: {
    textAlign: "center",
    color: "#F0F6FC",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "#F0F6FC",
  },
  modalInput: {
    height: 40,
    width: 200,
    borderColor: "303740",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#262c36",
    color: "#F0F6FC",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 20,
  },
});
