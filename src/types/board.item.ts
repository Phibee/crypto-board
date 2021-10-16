import {CardProps} from './card';


export type BoardProps = {
  id: string;
  title: string;
};

export type BoardItemProps = {
  id: string;
  title: string;
  cards: CardProps[];
  boardId: string;
};
