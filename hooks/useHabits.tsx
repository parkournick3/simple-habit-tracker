import { Habit } from "@/types/habit";
import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import { Alert } from "react-native";

const HabitsContext = createContext<{
  habits: Habit[];
  create: (name: string) => void;
  complete: (habit: Habit) => void;
  remove: (habit: Habit) => void;
}>({
  habits: [],
  create: () => {},
  complete: () => {},
  remove: () => {},
});

export const useHabits = () => useContext(HabitsContext);

export const HabitsContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);

  const create = (name: string) => {
    if (!name) {
      return;
    }

    if (habits.find(h => h.name === name)) {
      return;
    }

    const newHabit = { name, streak: 0, lastCompleted: null };
    setHabits([...habits, newHabit]);
  }

  const complete = (habit: Habit) => {
    if (habit.lastCompleted && dayjs(habit.lastCompleted).isSame(dayjs(), 'date')) {
      return;
    }

    const updatedHabits = habits.map(h => {
      if (h.name === habit.name) {
        return {
          ...habit,
          streak: habit.streak + 1,
          lastCompleted: dayjs(),
        };
      }

      return h;
    });

    setHabits(updatedHabits);
  }

  const remove = (habit: Habit) => {
    Alert.alert(
      "Remove habit",
      `Are you sure you want to remove ${habit.name}?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Remove",
          onPress: () => {
            const updatedHabits = habits.filter(h => h.name !== habit.name);
            setHabits(updatedHabits);
          }
        }
      ]
    )
  }

  useEffect(() => {
    if (initialLoading) {
      return;
    }

    AsyncStorage.setItem('habits', JSON.stringify(habits));
  }, [habits, initialLoading]);

  useEffect(() => {
    AsyncStorage.getItem('habits').then(data => {
      if (data) {
        setHabits(JSON.parse(data));
      } else {
        setHabits([
          { name: "Read for 30 minutes", streak: 0, lastCompleted: null },
          { name: "Workout", streak: 0, lastCompleted: null },
          { name: "Meditate", streak: 0, lastCompleted: null }]);
      }

      setInitialLoading(false);
    });
  }, []);

  return (
    <HabitsContext.Provider value={{ habits, create, complete, remove }}>
      {children}
    </HabitsContext.Provider>
  );
};
