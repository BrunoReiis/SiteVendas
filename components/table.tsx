import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import ModalUsers from "./modalUsers";
import ModalInsertProducts from "./modalInsertProducts";

export default function Table() {
  return (
    <div className="flex flex-wrap gap-4">
      <Tabs variant="underlined" aria-label="Tabs variants">
        <Tab key="products" title="Products">
          <Card>
            <CardBody>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="users" title="Users">
          <Card>
            <CardBody>
              <ModalUsers />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="videos" title="Videos">
          {/* You can add your videos content here */}
        </Tab>
      </Tabs>
    </div>
  );
}
