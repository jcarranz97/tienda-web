import React from "react";
import {
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  useDisclosure,
} from "@nextui-org/react";
import { VerticalDotsIcon } from "@/components/icons/vertical-dots-icon";
import { SelectProduct } from "../products/actions";


export const ProductActions = ({ product }: { product: SelectProduct }) => {
  return (
    <div className="relative flex justify-end items-center gap-2">
      <Dropdown>
        <DropdownTrigger>
          <Button isIconOnly size="sm" variant="light">
            <VerticalDotsIcon className="text-default-300" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          variant="faded"
          aria-label="Dropdown menu with description"
        >
          <DropdownSection title="Actions" showDivider>  
            <DropdownItem
              key="edit"
              description="Allows you to edit the file"
            >
              Edit file
            </DropdownItem>
          </DropdownSection>
          <DropdownSection title="Danger zone">  
            <DropdownItem
              key="delete"
              className="text-danger"
              color="danger"
              shortcut="⌘⇧D"
              description="Permanently delete the file"
            >
              Delete file
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};