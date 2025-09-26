import { TouchableOpacity, Text, View } from 'react-native';
import { styles } from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import { ComponentProps } from 'react';

type IconName = ComponentProps<typeof MaterialIcons>['name'];

type ButtonProps = {
  title: string;
  onPress: () => void;
  iconName?: IconName;  // '?' significa que esta prop é opcional
};

export function Button({ title, onPress, iconName }: ButtonProps) {
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