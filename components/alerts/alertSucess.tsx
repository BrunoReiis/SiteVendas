import React from "react";
import {Alert, Button} from "@nextui-org/react";

export default function alertSucess(title: string, description: string) {
  const [isVisible, setIsVisible] = React.useState(true);

  return (
    <div className="flex flex-col gap-4">
      {isVisible ? (
        <Alert
          color="success"
          description={description}
          isVisible={isVisible}
          title={title}
          variant="faded"
          onClose={() => setIsVisible(false)}
        />
      ) : (
        <Button variant="bordered" onPress={() => setIsVisible(true)}>
          Show Alert
        </Button>
      )}
    </div>
  );
}

