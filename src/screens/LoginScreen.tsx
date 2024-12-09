import React, { useEffect, useState } from 'react';
import Wrapper from '../components/Wrapper';
import Typo from '../components/Typo';
import useAuth from '../hooks/useAuth';
import { inputButtonCardGap } from '../constants/Sizes';
import Input from '../components/Input';
import Button from '../components/Button';
import { bgColor } from '../constants/Colors';
import { Image } from 'react-native';
import { postLogin, postRegister } from '../services/userService';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { androidClientId } from '../constants/Services';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPass, setShowPass] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const [, response, promptAsync] = Google.useAuthRequest({
    androidClientId,
  });

  useEffect(() => {
    async function fetchUserData() {
      try {
        if (response?.type === 'success') {
          const accessToken = response.authentication?.accessToken;

          fetch('https://www.googleapis.com/userinfo/v2/me', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
            .then((res) => res.json())
            .then((resjson) => {
              postRegister({
                name: resjson.name,
                email: resjson.email,
                google_id: resjson.id,
                photo: resjson.picture,
              }).then(({ token, user }) => login(user, token));
            });
        }
      } catch (error) {
        console.error('Terjadi kesalahan:', error);
      }
    }

    if (response) {
      fetchUserData();
    }
  }, [response, login]);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Email dan password harus diisi');
      return;
    }

    await postLogin(email, password)
      .then(({ user, token }) => login(user, token))
      .catch((err) => setError(err.message));
  };
  return (
    <Wrapper
      padding={40}
      gap={40}
      flex={1}
      justifyContent='center'
      alignItems='center'
    >
      <Wrapper gap={inputButtonCardGap} width={'100%'}>
        <Image
          source={require('../../assets/logoimage.png')}
          style={{ height: 110, width: 110 }}
        />
      </Wrapper>
      <Wrapper gap={inputButtonCardGap} width={'100%'}>
        <Typo>
          Selamat datang, silahkan login dengan email yang sudah terdaftar atau
          login menggunakan akun google.
        </Typo>
      </Wrapper>
      <Wrapper gap={inputButtonCardGap} width={'100%'}>
        <Input
          placeholder='Email'
          leftIcon='person'
          value={email}
          inputMode='email'
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder='Password'
          leftIcon='key'
          rightIcon={showPass ? 'eye-closed' : 'eye'}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={!showPass}
          onRightIconPress={() => setShowPass(!showPass)}
        />
        {error && (
          <Typo size='sm' color={bgColor.error}>
            {error}
          </Typo>
        )}
      </Wrapper>
      <Wrapper gap={inputButtonCardGap} width={'100%'}>
        <Button label='Login' onPress={handleLogin} icon='sign-in' />
        <Typo textAlign='center' size='sm' opacity={0.5} marginVertical={10}>
          Login dengan cara lain
        </Typo>
        <Button
          imgSource={require('../../assets/googleicon.png')}
          variant='base3'
          label='Login dengan google'
          onPress={() => promptAsync()}
        />
      </Wrapper>
    </Wrapper>
  );
}
