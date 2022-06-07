import React, { PropsWithChildren, useCallback, useState } from "react";
import styled from "@emotion/styled";
import Radio from "./radiobutton";
import Checkbox from "./checkbox";

interface ModalDefaultType {
  onClickToggleModal: () => void;
  order?: Array<number>;
  onAddItem: () => void;
}
interface Theme {
  fg?: string;
  bg?: string;
}
const Modal = (props: PropsWithChildren<ModalDefaultType>) => {
  const { onClickToggleModal, order = [], onAddItem, children } = props;
  const [isOpenEdit, setOpenEdit] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState(new Set());

  const onClickToggleEdit = useCallback(() => {
    setOpenEdit(!isOpenEdit);
  }, [isOpenEdit]);

  const checkedItemHandler = (id: string, isChecked: boolean) => {
    if (isChecked) {
      checkedItems.add(id);
      setCheckedItems(checkedItems);
    } else if (!isChecked && checkedItems.has(id)) {
      checkedItems.delete(id);
      setCheckedItems(checkedItems);
    }
  };

  const label = ["asdf", "qwer"];
  const checkboxData = [
    { id: "1", name: "딸기", checked: false },
    { id: "2", name: "사과", checked: false },
    { id: "3", name: "바나나", checked: false },
    { id: "4", name: "귤", checked: false }
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
            {checkboxData &&
              checkboxData.map(item => (
                <label key={item.id}>
                  <Checkbox
                    item={item}
                    checkedItemHandler={checkedItemHandler}
                  />
                  <span style={{ marginLeft: 8 }}>{item.name}</span>
                </label>
              ))}
          </div>
        </DialogBox>
      </ModalContainer>
    </>
  );
};

const theme: Theme = {
  fg: "palevioletred",
  bg: "white"
};

const theme2: Theme = {
  fg: "white",
  bg: "palevioletred"
};

const ModalContainer = styled("div")(() => {
  return {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed"
  };
});

const DialogBox = styled("dialog")(() => {
  return {
    width: "800px",
    height: "400px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "none",
    borderRadius: "3px",
    boxShadow: "0 0 30px rgba(30, 30, 30, 0.185)",
    boxSizing: "border-box",
    backgroundColor: "white",
    zIndex: 10000
  };
});

const Input = styled("input")(props => {
  const margin = props.size ? props.size : 10;

  return {
    color: "palevioletred",
    fontSize: "1em",
    border: "2px solid palevioletred",
    borderRadius: "3px",

    /* here we use the dynamically computed prop */
    margin: margin,
    padding: props.size
  };
});

// const Input = styled.input((props: any) => ({
//   type: "text",
//   size: props.size || "1em"
// }))`
//   color: palevioletred;
//   font-size: 1em;
//   border: 2px solid palevioletred;
//   border-radius: 3px;

//   /* here we use the dynamically computed prop */
//   margin: ${props => props.size};
//   padding: ${props => props.size};
// `;

const DialogButton = styled("button")(props => {
  const Theme: Theme = props.theme;
  return {
    color: `${Theme.fg}` ? `${Theme.fg}` : "palevioletred",
    border: `2px solid ${Theme.fg}`,
    background: `${Theme.bg}`,

    fontSize: "1em",
    margin: "1em",
    padding: "0.25em 1em",
    borderRadius: "3px"
  };
});

export default Modal;
