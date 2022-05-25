import { useState, useCallback } from "react";
import styled from "styled-components";
import Modal from "./component/modal";
const indexArr: Array<number> = [];

function App() {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [order, setOrder] = useState<Array<number>>(indexArr);

  // const onClickToggleModal = useCallback(() => {
  //   setOpenModal(!isOpenModal);
  // }, [isOpenModal]);

  const onClickToggleModal = useCallback(() => {
    setOpenModal(prev => !prev);
  }, []);

  const onAddItem = useCallback(() => {
    const newOrder = [...order];
    if (newOrder.length > 0)
      newOrder[newOrder.length] = newOrder[newOrder.length - 1] + 1;
    else newOrder[0] = 0;
    setOrder(newOrder);

    // -----
    // if (order.length > 0) order[order.length] = order[order.length - 1] + 1;
    // else order[0] = 0;
    // setOrder([...order]);
  }, [order]);

  return (
    <Main>
      <Title>여긴 배경화면 입니다</Title>
      {isOpenModal && (
        <Modal
          onClickToggleModal={onClickToggleModal}
          order={order}
          onAddItem={onAddItem}
        ></Modal>
      )}
      <DialogButton onClick={onClickToggleModal}>Open Modal</DialogButton>
    </Main>
  );
}

const Main = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h3`
  text-align: center;
`;

const DialogButton = styled.button`
  color: ${props => props.theme.fg};
  border: 2px solid ${props => props.theme.fg};
  background: ${props => props.theme.bg};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
`;

export default App;
