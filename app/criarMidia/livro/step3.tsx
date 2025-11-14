import { Text, View, StyleSheet} from "react-native";
import { themas } from "@/global/themas";

export default function LivroStep3() {
  return (
    <View style={styles.container}>
      
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    backgroundColor: themas.colors.grayStrong,
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 10,
    paddingBottom: 70,
    paddingHorizontal: 24,
  },

  line: {
    flex: 1,                 
    height: 2,               
    backgroundColor: themas.colors.Secondary, 
    marginHorizontal: 10,
    marginVertical: 15   
  },

  lineBox: {
    flexDirection: 'row',   
    alignItems: 'center',
    marginVertical: 15,
  }
});