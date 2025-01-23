import Icon from '../../../assets/delete-svgrepo-com.svg';
import { ComponentProps } from 'react';

export default function DeleteIcon({ ...props }: ComponentProps<'img'>) {
  return <img src={Icon} alt={'Del'} {...props} />;
}
