import { MaterialIcons } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

type IconName = ComponentProps<typeof MaterialIcons>['name'];

type ButtonProps = {
  title: string;
  onPress: () => void;
  iconName?: IconName;  // '?' significa que esta prop é opcional
};

export function ButtonIcon({ title, onPress, iconName }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.group}>
        {iconName && (
          <MaterialIcons name={iconName} size={24} />
        )}
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};