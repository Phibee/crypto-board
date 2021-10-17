import React from 'react';
import imgRes from '../assets/images/kanban.svg';
import styled from 'styled-components';
import useAppStore from '../store';
import {Button, Input, Modal} from 'antd';

const ContentTitleStyled = styled.div`
  margin-top: 25px;
  font-size: 1.4em;
  font-weight: 600;
  text-align: center;
`;
const ContentSubTitleStyled = styled.div`
  margin-top: 10px;
  margin-bottom: 15px;
  text-align: center;
  font-size: 1em;
  color: #94959f;
  width: 300px;
`;

export interface IHomeProps {}

const NoBoardFound = () => {
  const {addBoard, boards} = useAppStore();
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [inputVal, setInputVal] = React.useState('');

  const handleAddBoardModal = () => {
    setIsModalVisible(true);
    setInputVal('');
  };

  const handleOnOk = () => {
    addBoard(inputVal);
    setIsModalVisible(false);
  };

  const handleOnCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <img src={imgRes} height={200} />
      <ContentTitleStyled>Create your first Board</ContentTitleStyled>
      <ContentSubTitleStyled>
        Try creating a board not only one but multiple boards separated from one another.
      </ContentSubTitleStyled>
      <Button type="primary" shape="round" onClick={handleAddBoardModal}>
        Create New Board
      </Button>

      {/* Modal for new board */}
      <Modal
        title="Create New Board"
        visible={isModalVisible}
        onOk={handleOnOk}
        onCancel={handleOnCancel}>
        <Input
          placeholder="Enter Board's name"
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
        />
      </Modal>
    </>
  );
};

const Home: React.FC<IHomeProps> = props => {
  const {boards} = useAppStore();
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'white',
        }}>
        {boards.length === 0 && <NoBoardFound />}
      </div>
    </>
  );
};

export default Home;
