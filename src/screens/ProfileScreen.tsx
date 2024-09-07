import React, { useState } from 'react';
import Wrapper from '../components/Wrapper';
import Typo from '../components/Typo';
import { containerGap, inputButtonCardGap } from '../constants/Sizes';
import useAuth from '../hooks/useAuth';
import Button from '../components/Button';
import Input from '../components/Input';
import { ScrollView, ToastAndroid } from 'react-native';
import { bgColor } from '../constants/Colors';
import Avatar from '../components/Avatar';
import { postLogout, putRefresh } from '../services/userService';
import { UserUpdatePostType } from '../dataTypes/UserType';

const ProfileScreen = () => {
  const { logout, user, token, refresh } = useAuth();
  const [name, setName] = useState<string>(user?.name ?? '');
  const [email, setEmail] = useState<string>(user?.email ?? '');
  const [phone, setPhone] = useState<string>(user?.phone ?? '');
  const [address, setAddress] = useState<string>(user?.address ?? '');

  const handleUpdate = async () => {
    const newUserData: UserUpdatePostType = {
      name,
      email,
      phone,
      address,
    };
    await putRefresh(token, newUserData)
      .then((updatedUserData) => refresh(updatedUserData))
      .catch((err) => alert(err));
  };

  const handleLogout = async () => {
    await postLogout(token)
      .then((data) =>
        ToastAndroid.show(
          data.message ?? 'logout berhasil',
          ToastAndroid.SHORT,
        ),
      )
      .catch((err) => alert(err))
      .finally(() => logout());
  };

  return (
    <ScrollView>
      <Wrapper padding={40} gap={containerGap}>
        <Wrapper
          aspectRatio={16 / 9}
          justifyContent='center'
          alignItems='center'
          gap={20}
        >
          <Avatar size={120} type='image' label={user?.photo} />
          <Wrapper alignItems='center'>
            <Typo size='xl2' color={bgColor.primary} bold>
              {user?.name}
            </Typo>
            <Typo size='sm' opacity={0.5}>
              {user?.email}
            </Typo>
          </Wrapper>
        </Wrapper>
        <Wrapper gap={inputButtonCardGap}>
          <Input
            leftIcon='person'
            placeholder='Nama lengkap'
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <Input
            leftIcon='mail'
            placeholder='Alamat email'
            editable={false}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            leftIcon='device-mobile'
            placeholder='Nomor telepon'
            value={phone}
            onChangeText={(text) => setPhone(text)}
            inputMode='numeric'
          />
          <Input
            leftIcon='location'
            placeholder='Alamat'
            value={address}
            onChangeText={(text) => setAddress(text)}
          />
        </Wrapper>
        <Wrapper gap={inputButtonCardGap} width={'100%'}>
          <Button
            label='Simpan perubahan'
            icon='check'
            onPress={handleUpdate}
          />
          <Typo textAlign='center' size='sm' opacity={0.5} marginVertical={10}>
            Keluar aplikasi
          </Typo>
          <Button
            icon='sign-out'
            variant='error'
            label='logout'
            onPress={handleLogout}
          />
        </Wrapper>
      </Wrapper>
    </ScrollView>
  );
};

export default ProfileScreen;
