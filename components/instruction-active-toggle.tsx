"use client";

import { Instruction } from "ragie/models/components";
import { Switch } from "./ui/switch";
import { toggleInstructionActive } from "@/actions";

export default function InstructionActiveToggle({
  instruction,
}: {
  instruction: Instruction;
}) {
  return (
    <Switch
      title={
        instruction.active ? "Deactivate instruction" : "Activate instruction"
      }
      checked={instruction.active}
      onCheckedChange={async (checked) => {
        await toggleInstructionActive(instruction.id, checked);
      }}
    />
  );
}
