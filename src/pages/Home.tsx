import React from 'react';
import imgRes from '../assets/images/kanban.svg';
import styled from 'styled-components';
import useAppStore from '../store';

const ContentTitleStyled = styled.div`
  margin-top: 25px;
  font-size: 1.4em;
  font-weight: 600;
  text-align: center;
`;
const ContentSubTitleStyled = styled.div`
  margin-top: 10px;
  text-align: center;
  font-size: 1em;
  color: #94959f;
  width: 300px;
`;

export interface IHomeProps {}

const NoBoardFound = () => {
  return (
    <>
      <img src={imgRes} height={200} />
      <ContentTitleStyled>Create your first Board</ContentTitleStyled>
      <ContentSubTitleStyled>
        Try creating a board not only one but multiple boards separated from one another.
      </ContentSubTitleStyled>
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
