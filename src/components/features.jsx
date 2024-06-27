import { Image, Text, View } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Features = () => {
  return (
    <View style={{ height: hp(60) }} className="space-y-4">
      <Text
        style={{ fontSize: wp(6.5) }}
        className="font-semibold text-gray-700"
      >
        Features
      </Text>
      <View className="bg-emerald-200 p-4 rounded-xl space-y-2">
        <View className="flex-row items-center space-x-1">
          <Image
            source={require("../assets/images/react-logo.png")}
            style={{ width: hp(4), height: hp(4) }}
          />
          <Text
            style={{ fontSize: wp(4) }}
            className="font-semibold text-gray-700"
          >
            {" "}
            ChatGpt{" "}
          </Text>
        </View>
        <Text
          style={{ fontSize: wp(3.8) }}
          className="font-medium text-gray-700"
        >
          Ramesh bhaiya bihar se hai bde gyaani aadmi hai sab sawal ka jawab de
          sakte hai
        </Text>
      </View>
      <View className="bg-emerald-200 p-4 rounded-xl space-y-2">
        <View className="flex-row items-center space-x-1">
          <Image
            source={require("../assets/images/react-logo.png")}
            style={{ width: hp(4), height: hp(4) }}
          />
          <Text
            style={{ fontSize: wp(4) }}
            className="font-semibold text-gray-700"
          >
            {" "}
            Dalle-2{" "}
          </Text>
        </View>
        <Text
          style={{ fontSize: wp(3.8) }}
          className="font-medium text-gray-700"
        >
          Ramesh bhaiya bihar se hai bde gyaani aadmi hai sab sawal ka jawab de
          sakte hai
        </Text>
      </View>
      <View className="bg-emerald-200 p-4 rounded-xl space-y-2">
        <View className="flex-row items-center space-x-1">
          <Image
            source={require("../assets/images/react-logo.png")}
            style={{ width: hp(4), height: hp(4) }}
          />
          <Text
            style={{ fontSize: wp(4) }}
            className="font-semibold text-gray-700"
          >
            {" "}
            Smart Ai{" "}
          </Text>
        </View>
        <Text
          style={{ fontSize: wp(3.8) }}
          className="font-medium text-gray-700"
        >
          Ramesh bhaiya bihar se hai bde gyaani aadmi hai sab sawal ka jawab de
          sakte hai
        </Text>
      </View>
    </View>
  );
};

export default Features;
