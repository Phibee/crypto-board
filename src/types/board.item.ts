import {CardProps} from './card';

export type BoardItemProps = {
  id: string;
  title: string;
  color: string;
  cards: CardProps[];
};
