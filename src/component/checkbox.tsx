import React, { useState } from "react";
import styled from "styled-components/macro";

interface CheckboxData {
  id: string;
  name: string;
  checked: boolean;
}
const Checkbox = ({
  className,
  item,
  checkedItemHandler,
  ...props
}: {
  className?: string;
  item: CheckboxData;
  checkedItemHandler: (id: string, isChecked: boolean) => void;
  props?: any[];
}) => {
  const [bChecked, setChecked] = useState(false);

  const checkHandler = ({ target }: any) => {
    setChecked(!bChecked);
    checkedItemHandler(target.id, target.checked);
  };
  return (
    <CheckboxContainer className={className}>
      <HiddenCheckbox
        checked={bChecked}
        onChange={e => checkHandler(e)}
        {...props}
      />
      <StyledCheckbox checked={bChecked}>
        <Icon viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </Icon>
      </StyledCheckbox>
    </CheckboxContainer>
  );
};

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div<{ checked: boolean }>`
  display: inline-block;
  width: 16px;
  height: 16px;
  background: ${props => (props.checked ? "salmon" : "papayawhip")};
  border-radius: 3px;
  transition: all 150ms;
  font-family: SF Pro Display;
  font-style: normal;
  font-weight: 200;
  font-size: 18px;
  line-height: 21px;
  text-align: center;
  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px #acacac;
  }

  ${Icon} {
    visibility: ${props => (props.checked ? "visible" : "hidden")};
  }
`;

export default Checkbox;
