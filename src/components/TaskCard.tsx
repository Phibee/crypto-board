import React from 'react';
import {CardProps} from '../types/card';

export interface ITaskCardProps {
  card: CardProps;
}

const TaskCard: React.FC<ITaskCardProps> = ({card, ...props}) => {
  return (
    <div className="rounded p-5 flex bg-white shadow-2l cursor-move">
      <div className="flex-1">
        <p className="text-left font-medium">{card.title}</p>
      </div>
    </div>
  );
};

export default TaskCard;
