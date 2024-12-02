import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import ModalUsers from "./modalUsers";
import ModalInsertProducts from "./modalInsertProducts";

export default function Table() {
  return (
    <div className="w-full">  {/* Garantindo que o contêiner ocupe 100% da largura */}
      <Tabs variant="underlined" aria-label="Tabs variants" size="lg">
        <Tab key="products" title="Products">
          <Card className="w-full max-w-none"> {/* Usando w-full para ocupar toda a largura disponível e max-w-none para remover qualquer limite */}
            <CardBody>
              {/* Adicione seu conteúdo aqui */}
            </CardBody>
          </Card>
        </Tab>
        <Tab key="users" title="Users">
          <Card className="w-full max-w-none"> {/* Usando w-full para ocupar toda a largura disponível e max-w-none para remover qualquer limite */}
            <CardBody>
              <ModalUsers />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="videos" title="Videos">
          {/* Adicione seu conteúdo de vídeos aqui */}
        </Tab>
      </Tabs>
    </div>
  );
}
