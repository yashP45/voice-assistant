import {apiKey} from '../constants/dummy';
import axios from 'axios';

const gptEndpoint = ' https://api.openai.com/v1/chat/completions';
const dalleEndpoint = 'https://api.openai.com/v1/images/generations';
const client = axios.create({
  headers: {
    Authorization: `Bearer ${apiKey}`,
    'content-Type': 'application/json',
  },
});

export const apiCall = async (p, m) => {
  try {
    const res = await client.post(gptEndpoint, {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          message: `Does this message want to generate AI picture , image , art or anything similar? ${p}. Simply answer with a Yes or No`,
        },
      ],
    });
    console.log(res);
    // let isArt = res.data?.choices[0]?.message?.content;
    // if (isArt.toLowerCase().includes('yes')) {
    //   console.log('dalle call');
    //   return dalleCall(p, m || []);
    // } else {
    //   console.log(' callgpt ');
    //   return gptApiCall(p, m || []);
    // }
  } catch (error) {
    console.log(error);
    return Promise.resolve({success: false, msg: error.message});
  }
};

const gptApiCall = async (p, m) => {
  try {
    const res = await client.post(gptEndpoint, {
      model: 'gpt-3.5-turbo-instruct',
      m,
    });

    let answer = res.data?.choices[0]?.message?.content;
    m.push({role: 'assistant', content: answer.trim()});
    return Promise.resolve({success: true, m});
  } catch (error) {
    console.log(error);
    return Promise.resolve({success: false, msg: error.message});
  }
};

const dalleCall = async (p, m) => {
  try {
    const res = await client.post(dalleEndpoint, {
      p,
      n: 1,
      size: '512x512',
    });

    let url = res?.data?.data[0]?.url;
    m.push({role: 'assistant', content: url});
    return Promise.resolve({success: true, m});
  } catch (error) {
    console.log(error);
    return Promise.resolve({success: false, msg: error.message});
  }
};
