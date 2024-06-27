import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Tts from 'react-native-tts';
import Voice from '@react-native-voice/voice';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Features from '../components/features';
import {SafeAreaView} from 'react-native-safe-area-context';
import {apiCall} from '../api/openapi';

const WelcomeScreen = () => {
  const [message, setMessages] = useState([]);
  const [recording, setRecording] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [result, setResults] = useState('');
  const scrollViewRed = useRef();
  const clear = () => {
    setMessages([]);
    Tts.stop();
  };

  const stopSpeaking = () => {
    Tts.stop();
    setSpeaking(false);
  };

  const onSpeechStartHandler = () => {
    console.log('Speech has started');
  };

  const onSpeechEndHandler = () => {
    setRecording(false);
    console.log('Speech has ended');
  };

  const onSpeechResultsHandler = e => {
    console.log('Speech results:', e.value);

    const text = e.value[0];
    setResults(text);
  };

  const onSpeechErrorHandler = e => {
    console.error('Speech error:', e.error);
  };

  const startRecording = async () => {
    setRecording(true);
    try {
      Tts.stop();
      await Voice.start('en-US');
    } catch (error) {
      console.error('Error starting recording:', error);
      setRecording(false);
    }
  };
  const fetchresponse = () => {
    if (result.trim().length > 0) {
      let newMessage = [...message];
      newMessage.push({role: 'user', content: result.trim()});

      setMessages([...newMessage]);
      updateScrollView();
      apiCall(result.trim(), newMessage).then(res => {
        console.log('got api data', res);
        if (res.success) {
          setMessages([...res.data]);
          updateScrollView();
          setResults('');
          startTextToSpeech(res.data[res.data.length - 1]);
        } else {
          Alert.alert('Error getting response');
        }
      });
    }
  };

  const startTextToSpeech = a => {
    if (!message.content.includes('http')) {
      setSpeaking(true);
      Tts.speak(a.content, {
        androidParams: {
          KEY_PARAM_PAN: -1,
          KEY_PARAM_VOLUME: 0.5,
          KEY_PARAM_STREAM: 'STREAM_MUSIC',
        },
      });
    }
  };
  const updateScrollView = () => {
    setTimeout(() => {
      scrollViewRed.current?.scrollToEnd({animated: true});
    });
  };
  const stopRecording = async () => {
    try {
      await Voice.stop();
      setRecording(false);

      // fetch response

      fetchresponse();
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
  };

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;
    Voice.onSpeechError = onSpeechErrorHandler;
    // tts handlers

    Tts.addEventListener('tts-start', event => console.log('start', event));
    Tts.addEventListener('tts-progress', event =>
      console.log('progress', event),
    );
    Tts.addEventListener('tts-finish', event => console.log('finish', event));
    Tts.addEventListener('tts-cancel', event => console.log('cancel', event));

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  return (
    <SafeAreaView className="flex flex-1 bg-white px-5 py-5">
      <View className="flex-row justify-center ">
        <Image
          source={require('../assets/images/react-logo.png')}
          style={{width: hp(15), height: hp(15)}}
        />
      </View>
      {message.length > 0 ? (
        <View className="space-y-2 flex-1">
          <Text
            style={{fontSize: wp(5)}}
            className="font-semibold text-gray-700 ml-1">
            Assistant
          </Text>
          <View
            style={{height: wp(75)}}
            className="bg-neutral-200 rounded-3xl p-4">
            <ScrollView
              ref={scrollViewRed}
              bounces={false}
              className="space-y-4"
              showsHorizontalScrollIndicator={false}>
              {message.map((message, index) => {
                if (message.role === 'assistant') {
                  if (message.content.includes('http')) {
                    return (
                      <View key={index} className="flex-row justify-start">
                        <View
                          style={{width: wp(70)}}
                          className="bg-emerald-200 rounded-2xl p-2 flex rounded-tl-none">
                          <Image
                            className="rounded-2xl"
                            resizeMode="contain"
                            source={{uri: message.content}}
                            style={{height: wp(60)}}
                          />
                        </View>
                      </View>
                    );
                  } else {
                    return (
                      <View
                        key={index}
                        style={{width: wp(70)}}
                        className="bg-emerald-200 rounded-xl p-2 rounded-tl-none">
                        <Text className="text-black">{message.content}</Text>
                      </View>
                    );
                  }
                } else {
                  return (
                    <View key={index} className="flex-row justify-end">
                      <View
                        style={{width: wp(70)}}
                        className="bg-white rounded-xl p-2 rounded-tr-none">
                        <Text className="text-black">{message.content}</Text>
                      </View>
                    </View>
                  );
                }
              })}
            </ScrollView>
          </View>
        </View>
      ) : (
        <Features />
      )}

      <View className="flex justify-center items-center">
        <TouchableOpacity onPressIn={startRecording} onPressOut={stopRecording}>
          <Image
            className="rounded-full"
            source={require('../assets/images/react-logo.png')}
            style={{height: hp(10), width: hp(10)}}
          />
        </TouchableOpacity>

        {message.length > 0 && (
          <TouchableOpacity
            onPress={clear}
            className="bg-neutral-400 absolute p-3 right-10 rounded-3xl">
            <Text className="text-white font-semibold ">Clear</Text>
          </TouchableOpacity>
        )}
        {speaking && (
          <TouchableOpacity
            onPress={stopSpeaking}
            className="bg-red-400 absolute p-3 left-10 rounded-3xl">
            <Text className="text-white font-semibold ">Stop</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
