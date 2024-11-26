import { useHabits } from "@/hooks/useHabits";
import { Habit } from "@/types/habit";
import dayjs from "dayjs";
import { useCallback, useMemo } from "react";
import { StyleSheet, Pressable, Text } from "react-native";

type Props = {
  habit: Habit;
};

export default function HabitCard({ habit }: Props) {
  const { name, streak, lastCompleted } = habit;

  const completedToday = useMemo(() => {
    return lastCompleted && dayjs(lastCompleted).isSame(dayjs(), "date");
  }, [lastCompleted]);

  const { complete, remove } = useHabits();

  return (
    <Pressable
      onLongPress={() => remove(habit)}
      onPress={() => complete(habit)}
      style={styles.container}
    >
      <Text style={styles.text}>{name}</Text>
      <Text style={{ color: completedToday ? "#FF9600" : "gray" }}>
        {streak}
        {completedToday && "🔥"}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 8,
    borderWidth: 1,
    backgroundColor: "#2a313c",
    borderColor: "#303740",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    color: "#F0F6FC",
  },
});
