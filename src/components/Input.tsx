import { TextInputProps, TextInput, TouchableOpacity } from 'react-native';
import Wrapper from './Wrapper';
import Octicons from '@expo/vector-icons/Octicons';
import { bgColor, textColor } from '../constants/Colors';
import {
  inputButtonGap,
  inputButtonHeight,
  roundedBtn,
} from '../constants/Sizes';

type InputProps = TextInputProps & {
  leftIcon?: keyof typeof Octicons.glyphMap;
  rightIcon?: keyof typeof Octicons.glyphMap;
  onRightIconPress?: () => void;
};

export default function Input({
  leftIcon,
  rightIcon,
  onRightIconPress,
  ...other
}: InputProps) {
  return (
    <Wrapper
      backgroundColor={bgColor.base3}
      gap={inputButtonGap}
      flexDirection='row'
      alignItems='center'
      height={inputButtonHeight}
      paddingHorizontal={20}
      borderRadius={roundedBtn}
    >
      {leftIcon && (
        <Wrapper
          width={20}
          height={20}
          alignItems='center'
          justifyContent='center'
        >
          <Octicons name={leftIcon} size={20} color={textColor.base} />
        </Wrapper>
      )}
      <TextInput
        placeholderTextColor={textColor.ghost}
        style={{
          flex: 1,
          fontFamily: 'Geologica-Medium',
          fontSize: 16,
          color: textColor.base,
          lineHeight: 24,
        }}
        {...other}
      />
      {rightIcon && (
        <TouchableOpacity onPress={onRightIconPress}>
          <Wrapper
            width={20}
            height={20}
            alignItems='center'
            justifyContent='center'
          >
            <Octicons name={rightIcon} size={20} color={textColor.base} />
          </Wrapper>
        </TouchableOpacity>
      )}
    </Wrapper>
  );
}
