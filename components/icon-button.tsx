import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, View, Pressable, Text } from 'react-native';

type Props = {
  icon: React.ComponentProps<typeof FontAwesome>['name'];
  onPress: () => void;
};

export default function IconButton({ icon, onPress }: Props) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <FontAwesome name={icon} size={18} style={styles.buttonIcon} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: "100%",
    width: 60,
    height: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#007AFF',
  },
  buttonIcon: {
    color: '#F0F6FC',
  },
});
