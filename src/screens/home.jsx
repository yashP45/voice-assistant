import {Image, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function Home({navigation}) {
  return (
    <SafeAreaView className="flex flex-1  justify-around  bg-white ">
      <View className="space-y-2 ">
        <Text
          style={{fontSize: wp(10)}}
          className="text-center  font-bold text-gray-700">
          Ramesh
        </Text>
        <Text
          style={{fontSize: wp(4)}}
          className="text-center tracking-wider  text-gray-600">
          Bihari babu
        </Text>
      </View>
      <View className="flex-row justify-center">
        <Image
          source={require('../assets/images/react-logo.png')}
          style={{width: wp(75), height: wp(75)}}
        />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('welcome')}
        className="bg-emerald-600 rounded-2xl mx-5 p-4 text-center">
        <Text
          style={{fontSize: wp(5)}}
          className="text-center font-bold text-white">
          Daba do
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
