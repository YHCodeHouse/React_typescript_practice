import React, { PropsWithChildren, useCallback, useState } from "react";
import styled from "styled-components";
import Radio from "./radiobutton";
import Checkbox from "./checkbox";
interface ModalDefaultType {
  onClickToggleModal: () => void;
  order?: Array<number>;
  onAddItem: () => void;
}

const Modal = ({
  onClickToggleModal,
  order = [],
  onAddItem,
  children
}: PropsWithChildren<ModalDefaultType>) => {
  const [isOpenEdit, setOpenEdit] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState({ checked: false });
  const onClickToggleEdit = useCallback(() => {
    setOpenEdit(!isOpenEdit);
  }, [isOpenEdit]);
  const onChange = (event: any) => {
    setIsChecked({ checked: event.target.checked });
  };
  const label = ["asdf", "qwer"];
  const checkboxData = [
    { id: 1, name: "딸기", checked: false },
    { id: 2, name: "사과", checked: false },
    { id: 3, name: "바나나", checked: false },
    { id: 4, name: "귤", checked: false }
  ];

  return (
    <>
      <ModalContainer>
        <DialogBox>
          <DialogButton
            theme={isOpenEdit ? theme : theme2}
            onClick={onClickToggleEdit}
          >
            {isOpenEdit ? "Edit now" : "Close Edit"}
          </DialogButton>
          <DialogButton onClick={onClickToggleModal}>cancel</DialogButton>
          <DialogButton onClick={onAddItem}>add item</DialogButton>
          {order.map(item => (
            <Input key={item} placeholder="A small text input" />
          ))}

          <div>
            {label &&
              label.map(item => (
                <Radio key={item} name="test">
                  <Input key={item} placeholder="A small text input" />
                </Radio>
              ))}
          </div>
          <div>
            {label &&
              label.map(item => (
                <label>
                  <Checkbox checked={isChecked.checked} onChange={onChange} />
                  <span style={{ marginLeft: 8 }}>{item}</span>
                </label>
              ))}
          </div>
        </DialogBox>
      </ModalContainer>
    </>
  );
};
const theme = {
  fg: "palevioletred",
  bg: "white"
};

const theme2 = {
  fg: "white",
  bg: "palevioletred"
};

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
`;

const DialogBox = styled.dialog`
  width: 800px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  border-radius: 3px;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  box-sizing: border-box;
  background-color: white;
  z-index: 10000;
`;

const Input = styled.input.attrs(props => ({
  // we can define static props
  type: "text",

  // or we can define dynamic ones
  size: props.size || "1em"
}))`
  color: palevioletred;
  font-size: 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;

  /* here we use the dynamically computed prop */
  margin: ${props => props.size};
  padding: ${props => props.size};
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

export default Modal;
