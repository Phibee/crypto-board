import React from 'react';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import {CardProps} from '../types/card';
import TaskCard from './TaskCard';
import styled from 'styled-components';

const TitleStyledContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 10px;
`;

const CounterStyled = styled.span`
  background: #a7b0d1;
  padding: 2px 7px;
  border-radius: 50px;
  margin-left: 5px;
  display: inline-block;
  font-size: 12px;
  text-align: center;
  color: #fff;
  user-select: none;
`;

export interface ITaskLaneProps {
  id: string;
  title: string;
  color: string;
  cards: CardProps[];
}

const TaskLane: React.FC<ITaskLaneProps> = ({id, title, cards, ...props}) => {
  const [itemCount, setItemCount] = React.useState<number>(0);

  const handleStart = (e: any) => {};
  const handleDrag = (e: any) => {};
  const handleStop = (e: any) => {};

  return (
    <div className="pb-10">
      <TitleStyledContainer>
        {title}
        <CounterStyled>{cards.length}</CounterStyled>
      </TitleStyledContainer>
      <div className="h-full mt-3 kanban-group">
        <Droppable droppableId={id} key={id}>
          {(provided: any, snapshot: any) => {
            return (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  background: snapshot.isDraggingOver ? 'lightblue' : 'white',
                  padding: 15,
                  minHeight: 500,
                  borderRadius: 6,
                }}>
                {cards.map((item: any, index: any) => {
                  return (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              userSelect: 'none',
                              padding: 16,
                              margin: '0 0 8px 0',
                              borderRadius: 6,
                              minHeight: '50px',
                              backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
                              color: 'white',
                              ...provided.draggableProps.style,
                            }}>
                            <div className="mb-3">
                              <TaskCard card={item} />
                            </div>
                          </div>
                        );
                      }}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </div>
    </div>
  );
};

export default TaskLane;
