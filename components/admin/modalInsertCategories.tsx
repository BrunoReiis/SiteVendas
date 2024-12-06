import { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, useDisclosure } from "@nextui-org/react";
import { sendCategory } from "@/src/firebase/sendData"

export default function ModalInsertProducts() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [category, setCategory] = useState("");

  const Enviar = (categ: string) => {
    sendCategory(categ)
  };

  const handleCreateCategory= () => {
    Enviar(category);
    onClose();
  };

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Adicionar Categorias
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} placement="top-center">
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Adicionar Categorias
            </ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                label="Nome da Categoria"
                placeholder="Coloque o nome da Categoria"
                variant="bordered"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Fechar Modal
              </Button>
              <Button color="primary" onPress={handleCreateCategory}>
                Criar Categoria
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
