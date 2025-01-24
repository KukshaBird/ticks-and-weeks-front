import Icon from '../../../assets/edit-button-svgrepo-com.svg';
import { ComponentProps } from 'react';

export default function EditIcon({ ...props }: ComponentProps<'img'>) {
  return <img src={Icon} alt={'Edit'} {...props} />;
}
