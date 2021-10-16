import produce from 'immer';
import create from 'zustand';
import {persist} from 'zustand/middleware';
import {BoardItemProps, BoardProps} from '../types/board.item';
import {v4 as uuid} from 'uuid';
import {CardProps} from '../types/card';

export type AppStore = {
  addBoard: (boardName: string) => void;
  boards: BoardProps[];
  boardItems: BoardItemProps[];
  addBoardItemByBoardId: (boardId: string, itemName: string) => void;
  addBoardItem: (item: BoardItemProps) => void;
  updateBoardItem: (item: BoardItemProps) => void;
  updateBoardItems: (boardId: string, items: BoardItemProps[]) => void;
  deleteBoardItem: (boardItemId: string) => void;
  addCardToBoardItem: (boardItemId: string, card: Omit<CardProps, 'id'>) => void;
};

const useAppStore = create<AppStore>(
  persist(
    (set, get) => ({
      boardItems: [],
      boards: [],
      addBoard: boardName =>
        set(state =>
          produce(state, draft => {
            draft.boards.push({id: uuid(), title: boardName});
          }),
        ),
      addBoardItemByBoardId: (boardId, itemName) =>
        set(state =>
          produce(state, draft => {
            draft.boardItems.push({id: uuid(), boardId: boardId, title: itemName, cards: []});
          }),
        ),
      addBoardItem: item =>
        set(state =>
          produce(state, draft => {
            draft.boardItems.push(item);
          }),
        ),
      updateBoardItem: item => set(state => produce(state, draft => {})),
      updateBoardItems: (boardId, items) =>
        set(state =>
          produce(state, draft => {
            let otherItems = state.boardItems.filter(bi => bi.boardId !== boardId);
            draft.boardItems = [...otherItems, ...items];
          }),
        ),
      deleteBoardItem: boardItemId =>
        set(state =>
          produce(state, draft => {
            let boardColumnToDeleteIndex = state.boardItems.findIndex(bi => bi.id === boardItemId);

            draft.boardItems.splice(boardColumnToDeleteIndex, 1);
          }),
        ),
      addCardToBoardItem: (boardItemId, card) =>
        set(state =>
          produce(state, draft => {
            const indx = state.boardItems.findIndex(i => i.id === boardItemId);

            draft.boardItems[indx].cards.push({
              id: uuid(),
              title: card.title,
              imageUrl: card.imageUrl,
              description: card.description,
            });
          }),
        ),
    }),

    {name: 'app-store-persist'},
  ),
);

export default useAppStore;
