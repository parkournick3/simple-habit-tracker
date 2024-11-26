import { View, StyleSheet, FlatList, Text } from "react-native";

import HabitCard from "@/components/habit-card";
import IconButton from "@/components/icon-button";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useHabits } from "@/hooks/useHabits";
import { useState } from "react";
import CreateHabitModal from "@/components/create-habit-modal";

dayjs.extend(localizedFormat);

export default function Index() {
  const { habits } = useHabits();

  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <View style={styles.container}>
      <CreateHabitModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />

      <Text style={styles.title}>Hábits</Text>
      <Text style={styles.subtitle}>{dayjs().format("LL")}</Text>
      <FlatList
        data={habits}
        renderItem={({ item }) => <HabitCard habit={item} />}
      />
      <View style={styles.footerContainer}>
        <IconButton onPress={() => setShowCreateModal(true)} icon="plus" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: "#151B23",
    paddingHorizontal: 60,
  },
  title: {
    color: "#F0F6FC",
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#F0F6FC",
    marginBottom: 20,
  },
  footerContainer: {
    flex: 1 / 4,
    alignItems: "center",
  },
});
