import { Tabs, Tab } from "@nextui-org/react";

export default function Table() {
  return (
    <div className="flex flex-wrap gap-4">
      <Tabs key="" variant="underlined" aria-label="Tabs variants">
        <Tab key="photos" title="Photos" />
        <Tab key="music" title="Music" />
        <Tab key="videos" title="Videos" />
      </Tabs>
    </div>
  );
}
