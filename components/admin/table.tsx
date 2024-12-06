import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import ModalUsers from "./modalUsers";
import ModalProducts from "./modalProducts";
import ModalInsertProducts from "./modalInsertProducts";
import ModalInsertCategories from "./modalInsertCategories";
import ModalCategories from "./modalCategories"

export default function Table() {
  return (
    <div className="w-full"> 
      <Tabs variant="underlined" aria-label="Tabs variants" size="lg">
        <Tab key="products" title="Products">
          <Card className="w-full max-w-none"> 
            <CardBody>
              <ModalInsertProducts />
              <ModalProducts />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="users" title="Users">
          <Card className="w-full max-w-none">
            <CardBody>
              <ModalUsers />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="categories" title="Categories">
        <Card className="w-full max-w-none">
            <CardBody>
              <ModalInsertCategories />
              <ModalCategories />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
