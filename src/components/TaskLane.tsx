import React from 'react';
import {Draggable, Droppable} from 'react-beautiful-dnd';
import {CardProps} from '../types/card';
import TaskCard from './TaskCard';
import styled from 'styled-components';
import {Button, Dropdown, Input, Menu, Modal} from 'antd';
import {EllipsisOutlined} from '@ant-design/icons';
import useAppStore from '../store';
import {isEmpty} from 'lodash';

const TitleStyledContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  font-weight: 500;
  padding: 5px 8px;
  justify-content: space-between;
  background: #2dafed;
  color: #fff;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
`;

const CounterStyled = styled.span`
  background: #3693bf;
  padding: 2px 7px;
  border-radius: 50px;
  margin-left: 5px;
  display: inline-block;
  font-size: 12px;
  text-align: center;
  color: #fff;
  user-select: none;
  margin-right: 5px;
`;

export interface ITaskLaneProps {
  id: string;
  title: string;
  cards: CardProps[];
}

const {TextArea} = Input;

const TaskLane: React.FC<ITaskLaneProps> = ({id, title, cards, ...props}) => {
  const handleStart = (e: any) => {};
  const handleDrag = (e: any) => {};
  const handleStop = (e: any) => {};

  const {addCardToBoardItem} = useAppStore();
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [card, setCard] = React.useState<Omit<CardProps, 'id'>>();

  const handleOnOk = React.useCallback(() => {
    if (isEmpty(card)) return;

    card && addCardToBoardItem(id, card);
    setIsModalVisible(false);
  }, [card, id]);

  const handleOnCancel = () => {
    setIsModalVisible(false);
  };

  const handleShowAddCardModal = () => {
    setIsModalVisible(true);
    setCard(undefined);
  };

  const menu = (
    <Menu>
      <Menu.Item onClick={handleShowAddCardModal}>
        <span>Add New Card</span>
      </Menu.Item>
    </Menu>
  );

  const DropdownMenu = () => (
    <Dropdown key="more" overlay={menu} placement="bottomRight">
      <Button
        style={{
          border: 'none',
          padding: 0,
          backgroundColor: 'transparent',
        }}>
        <EllipsisOutlined
          style={{
            fontSize: 20,
            verticalAlign: 'top',
            color: '#ffffff',
          }}
        />
      </Button>
    </Dropdown>
  );

  const handleChange = (e: any) => {
    const {name, value} = e.target;

    setCard((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="pb-10" style={{boxShadow: '0 7px 4px #dedede'}}>
      <TitleStyledContainer>
        <div>{title}</div>
        <div>
          <CounterStyled>{cards.length}</CounterStyled>
          <DropdownMenu key="more" />
        </div>
      </TitleStyledContainer>
      <div className="h-full mt-3 kanban-group">
        <Droppable droppableId={id} key={id}>
          {(provided: any, snapshot: any) => {
            return (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  background: snapshot.isDraggingOver ? '#e6ebed' : 'white',
                  padding: 15,
                  minHeight: 500,
                  borderBottomLeftRadius: 6,
                  borderBottomRightRadius: 6,
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
                              overflow: 'hidden',
                              margin: '0 0 8px 0',
                              borderRadius: 6,
                              minHeight: '50px',
                              backgroundColor: '#FFFFFF', //snapshot.isDragging ? '#263B4A' : '#456C86',
                              border: '1px solid #e8ebed',
                              color: '#333333',
                              fontWeight: 600,
                              fontSize: 13,
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

        {/* Modal for new card */}
        <Modal
          title="Create New Card"
          visible={isModalVisible}
          onOk={handleOnOk}
          onCancel={handleOnCancel}>
          <div style={{marginBottom: 10}}>
            <label>Card Name</label>
            <Input
              placeholder="Enter card name"
              name="title"
              value={card?.title}
              onChange={handleChange}
            />
          </div>

          <div style={{marginBottom: 10}}>
            <label>Image Link (optional)</label>
            <Input
              placeholder="Paste image link here.."
              value={card?.imageUrl}
              onChange={handleChange}
              name="imageUrl"
            />
          </div>
          <div style={{marginBottom: 10}}>
            <label>Description</label>
            <TextArea
              placeholder="Description"
              name="description"
              value={card?.description}
              rows={4}
              style={{resize: 'none'}}
              onChange={handleChange}
            />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default TaskLane;
