"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";

type Props = {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  title?: string;
  children: React.ReactNode;
};

export default function MyModal({
  openModal,
  setOpenModal,
  title,
  children,
}: Props) {
  return (
    <>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>{title}</Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  );
}
