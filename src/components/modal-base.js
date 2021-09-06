/** @jsxImportSource @emotion/react */
import * as React from 'react';
import Modal from 'react-modal';
import { CloseIcon } from './styles-lib';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '200px',
    minHeight: '150px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
};

function ModalBase(props) {
  return (
    <Modal
      isOpen={props.open}
      onRequestClose={props.close}
      contentLabel="Example Modal"
      ariaHideApp={false}
      style={customStyles}
    >
      <div
        css={{
          position: 'absolute',
          right: 8,
          top: 8,
        }}
      >
        <CloseIcon onClick={props.close} />
      </div>

      {props.children}
    </Modal>
  );
}
export { ModalBase };
