import React from 'react';
import TaskLane from '../components/TaskLane';
import {BoardItemProps} from '../types/board.item';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import {v4 as uuid} from 'uuid';
import {merge} from 'lodash';

export interface IBoardProps {}

const items: BoardItemProps[] = [
  {
    id: uuid(),
    title: 'Item 1',
    color: 'red',
    cards: [
      {
        id: uuid(),
        title: 'Card 1',
      },
      {
        id: uuid(),
        title: 'Card 2',
      },
    ],
  },
  {
    id: uuid(),
    title: 'Item 2',
    color: 'red',
    cards: [
      {
        id: uuid(),
        title: 'Card 3',
      },
    ],
  },
  {
    id: uuid(),
    title: 'Item 3',
    color: 'red',
    cards: [
      {
        id: uuid(),
        title: 'Card 3',
      },
    ],
  },
];

const Board: React.FC<IBoardProps> = ({...props}) => {
  const [columns, setColumns] = React.useState<BoardItemProps[]>(items);

  const onDragEnd = (result: any, columns: BoardItemProps[], setColumns: any) => {
    if (!result.destination) return;

    const {source, destination} = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns.filter(c => c.id === source.droppableId);
      const sourceColumnIndex = columns.findIndex(c => c.id === source.droppableId);

      const destColumn = columns.filter(c => c.id === destination.droppableId);
      const destColumnIndex = columns.findIndex(c => c.id === destination.droppableId);

      const sourceItems = sourceColumn[0].cards;
      const destItems = destColumn[0].cards;

      const removed = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, ...removed);

      let cols = [...columns];
      cols[sourceColumnIndex] = {...sourceColumn[0], cards: sourceItems};
      cols[destColumnIndex] = {...destColumn[0], cards: destItems};

      setColumns(cols);
    } else {
      const sourceColumn = columns.filter(c => c.id === source.droppableId);
      const sourceColumnIndex = columns.findIndex(c => c.id === source.droppableId);
      const copiedItems = sourceColumn[0].cards;
      const removed = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, ...removed);

      sourceColumn[0].cards = copiedItems;

      let cols = [...columns];
      cols[sourceColumnIndex] = {...sourceColumn[0], cards: copiedItems};

      setColumns(cols);
    }
  };

  return (
    <div className="grid-fixed">
      <DragDropContext onDragEnd={(result: any) => onDragEnd(result, columns, setColumns)}>
        {columns.map(item => (
          <TaskLane
            key={item.id}
            id={item.id}
            title={item.title}
            color={item.color}
            cards={item.cards}
          />
        ))}
      </DragDropContext>
    </div>
  );
};

export default Board;
