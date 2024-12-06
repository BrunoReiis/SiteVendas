import { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, useDisclosure } from "@nextui-org/react";
import CategorySelector from "./categorySelector";
import { sendProduct } from "@/src/firebase/sendData"

export default function ModalInsertProducts() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [nomeProduto, setNomeProduto] = useState("");
  const [linkProduto, setLinkProduto] = useState("");
  const [valorProduto, setValorProduto] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const Enviar = (nomeprod: string, categ: string | null, link: string, valor: string) => {
    sendProduct(nomeprod, categ, link, valor)
  };

  const handleCreateProduct = () => {
    Enviar(nomeProduto, selectedCategory, linkProduto, valorProduto);
    onClose();
  };

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Adicionar Produtos
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} placement="top-center">
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Adicionar Produtos
            </ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                label="Nome do Produto"
                placeholder="Coloque o nome do Produto"
                variant="bordered"
                value={nomeProduto}
                onChange={(e) => setNomeProduto(e.target.value)}
              />
              <CategorySelector
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
              <Input
                label="Foto do Produto"
                placeholder="Coloque o Link"
                variant="bordered"
                value={linkProduto}
                onChange={(e) => setLinkProduto(e.target.value)}
              />
              <Input
                label="Preço do produto"
                placeholder="Coloque o valor"
                variant="bordered"
                value={valorProduto}
                onChange={(e) => setValorProduto(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Fechar Modal
              </Button>
              <Button color="primary" onPress={handleCreateProduct}>
                Criar Produto
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
