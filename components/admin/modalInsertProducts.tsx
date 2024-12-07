import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  useDisclosure,
} from "@nextui-org/react";
import CategorySelector from "./categorySelector";
import { sendProduct } from "@/src/firebase/sendData";

export default function ModalInsertProducts() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [nomeProduto, setNomeProduto] = useState("");
  const [linkProduto, setLinkProduto] = useState("");
  const [valorProduto, setValorProduto] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const Enviar = async (nomeprod: string, categ: string | null, link: string, valor: number) => {
    if (!nomeprod || !categ || !link || isNaN(valor)) {
      console.error("Preencha todos os campos corretamente.");
      return;
    }
    try {
      await sendProduct(nomeprod, categ, link, valor);
      console.log("Produto enviado com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar produto:", error);
    }
  };

  const handleCreateProduct = () => {
    if (!nomeProduto || !selectedCategory || !linkProduto || !valorProduto) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const valorNumerico = parseFloat(valorProduto);
    if (isNaN(valorNumerico)) {
      alert("Por favor, insira um valor numérico válido para o preço.");
      return;
    }

    Enviar(nomeProduto, selectedCategory, linkProduto, valorNumerico);
    onClose();
    setNomeProduto(""); 
    setLinkProduto("");
    setValorProduto("");
    setSelectedCategory(null);
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
                onCategoryChange={(category: any) => setSelectedCategory(category?.id || null)}
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
                type="number"
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
