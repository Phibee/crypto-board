import React from 'react';
import {CardProps} from '../types/card';
import {isEmpty} from 'lodash';
import {LinkOutlined} from '@ant-design/icons';
import styled from 'styled-components';

const LinkIconContainerStyled = styled.div`
  position: absolute;
  z-index: 100;
  background: #fff;
  top: 40%;
  left: 40%;
  padding: 5px;
  text-align: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

const Container = styled.div`
  &:not(:hover) div.icon-link {
    opacity: 0;
  }

  & div.icon-link:hover ~ img,
  & img:hover {
    width: 100%;
    max-height: 150px;
    opacity: 0.5;
    transition: opacity 0.25s ease-in-out;
  }
`;

export interface ITaskCardProps {
  card: CardProps;
}

const TaskCard: React.FC<ITaskCardProps> = ({card, ...props}) => {
  return (
    <div className="rounded p-5 flex bg-white shadow-2l cursor-move">
      <div className="flex-1">
        <div style={{padding: '5px 10px'}}>
          <div className="font-medium">{card.title}</div>
          <div style={{fontSize: 12, fontWeight: 300, color: '#9d9d9d'}}>{card.description}</div>
        </div>
        <div style={{position: 'relative'}}>
          {!isEmpty(card.imageUrl) && (
            <Container>
              <LinkIconContainerStyled
                className="icon-link"
                onClick={() => window.open(card.imageUrl, '_blank')}>
                <LinkOutlined />
              </LinkIconContainerStyled>
              <img src={card.imageUrl} style={{width: '100%', maxHeight: 150}} />
            </Container>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
