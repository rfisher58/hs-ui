import React, { ReactNode } from 'react';
import Card from '../Card';
import styled, {StyledComponentBase} from 'styled-components';
import { Footer, Header } from '../Card/Card';

export interface ModalProps {
  // TODO: Make string & StyledComponentBase<> its own type, also see about not using `any`
  StyledContainer?: string & StyledComponentBase<any, {}>,
  StyledOverlay?: string & StyledComponentBase<any, {}>,
  StyledHeader?: string & StyledComponentBase<any, {}>,
  StyledFooter?: string & StyledComponentBase<any, {}>,
  StyledCloseButton?: string & StyledComponentBase<any, {}>

  header?: ReactNode
  body?: ReactNode
  footer?: ReactNode

  onClickOutside?: () => void
  onClose?: () => void

  backgroundBlur?: string,
  backgroundDarkness?: number
}

const ModalOverlay = styled.div<{ backgroundBlur: string, backgroundDarkness: number }>`
  ${({ backgroundBlur = '0', backgroundDarkness = 0 }) => `
    height: 100%;
    width: 100%;

    position: fixed;
    top: 0;
    left: 0;

    z-index: 1000;

    backdrop-filter: blur(${backgroundBlur}) opacity(${1 - backgroundDarkness / 100});
  `}
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  z-index: 1010;
`;

const ModalHeader = styled(Header)`
  display: flex;
  justify-content: space-between;
`;

const ModalFooter = styled(Footer)`
  display: flex;
  justify-content: flex-end;
`;

const ModalCloseButton = styled.span`
  font-size: 1.3rem;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
  cursor: pointer;
`;

const Modal = ({
  StyledContainer = ModalContainer,
  StyledOverlay = ModalOverlay,
  StyledHeader = ModalHeader,
  StyledFooter = ModalFooter,
  StyledCloseButton = ModalCloseButton,
  onClickOutside = () => {},
  onClose = () => {},
  header,
  body,
  footer,
  backgroundBlur,
  backgroundDarkness,
}: ModalProps) => {
  const cardHeader = <>
    <span>{header}</span>
    <StyledCloseButton onClick={onClose}>&times;</StyledCloseButton>
  </>;
  return (
    <>
      <StyledContainer>
        <Card
          elevation={1}
          StyledHeader={StyledHeader}
          StyledFooter={StyledFooter}
          header={cardHeader}
          footer={footer}
        >
          {body}
        </Card>
      </StyledContainer>
      <StyledOverlay
        backgroundBlur={backgroundBlur}
        backgroundDarkness={backgroundDarkness}
        onClick={onClickOutside}
      />
    </>
  );
};

export default Modal;