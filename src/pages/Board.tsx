import React from 'react';
import TaskLane from '../components/TaskLane';
import {BoardItemProps} from '../types/board.item';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import useAppStore from '../store';
import {useHistory, useParams} from 'react-router';
import {Button, Input, Modal, PageHeader} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {isEmpty, cloneDeep} from 'lodash';

export interface IBoardViewProps {}

interface RouteParams {
  id: string;
}

const BoardView: React.FC<IBoardViewProps> = ({...props}) => {
  const history = useHistory();
  const {id} = useParams<RouteParams>();
  const {boardItems, addBoardItemByBoardId, boards, updateBoardItems} = useAppStore();
  const [columns, setColumns] = React.useState<BoardItemProps[]>([]);
  const [boardName, setBoardName] = React.useState<string>('');

  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [inputVal, setInputVal] = React.useState<string>('');
  console.log({columns});

  const handleOnOk = React.useCallback(() => {
    if (inputVal === '') return;

    addBoardItemByBoardId(id, inputVal);
    setIsModalVisible(false);
  }, [inputVal, id]);

  const handleOnCancel = () => {
    setIsModalVisible(false);
  };

  const handleShowAddItemModal = () => {
    setIsModalVisible(true);
    setInputVal('');
  };

  React.useEffect(() => {
    const items = boardItems.filter(b => b.boardId === id);

    setBoardName(boards.filter(b => b.id === id)[0].title);
    setColumns(items);
  }, [boardItems, id]);

  const onDragEnd = (result: any, columns: BoardItemProps[], setColumns: any) => {
    if (!result.destination) return;

    const {source, destination} = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumnIndex = columns.findIndex(c => c.id === source.droppableId);
      const destColumnIndex = columns.findIndex(c => c.id === destination.droppableId);

      let cols = cloneDeep(columns);
      const sourceItemCard = cols[sourceColumnIndex].cards[source.index];

      cols[sourceColumnIndex].cards.splice(source.index, 1);
      cols[destColumnIndex].cards.splice(destination.index, 0, sourceItemCard);

      updateBoardItems(id, cols);
    } else {
      const boardItemIndx = columns.findIndex(c => c.id === source.droppableId);

      let cols = cloneDeep(columns);
      let card = cols[boardItemIndx].cards[source.index];
      cols[boardItemIndx].cards.splice(source.index, 1);
      cols[boardItemIndx].cards.splice(destination.index, 0, card);

      updateBoardItems(id, cols);
    }
  };

  return (
    <>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <div style={{flexShrink: 0}}>
          {/* Content Top Header  */}
          <PageHeader
            className="site-page-header-responsive"
            title={boardName}
            style={{padding: 0}}
            extra={[
              <Button icon={<PlusOutlined />} type="primary" onClick={handleShowAddItemModal}>
                Add New Item
              </Button>,
            ]}
          />
        </div>

        <div style={{flexGrow: 1}}>
          {/* Content */}
          <div className="grid-fixed">
            <DragDropContext onDragEnd={(result: any) => onDragEnd(result, columns, setColumns)}>
              {columns.map(item => (
                <TaskLane key={item.id} id={item.id} title={item.title} cards={item.cards} />
              ))}
            </DragDropContext>
          </div>
        </div>
      </div>

      {/* Modal for new board */}
      <Modal
        title="Create New Board Item"
        visible={isModalVisible}
        onOk={handleOnOk}
        onCancel={handleOnCancel}>
        <Input
          placeholder="Enter Board's Item name"
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default BoardView;
