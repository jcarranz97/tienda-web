import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Select,
  SelectItem,
} from "@nextui-org/react";
import React from "react";
import {
  ShippingGroup,
  fetchShippingGroups,
  ShippingGroupStatus,
  Shipper,
  fetchShippingGroupStatuses,
  fetchShippers,
  addShippingGroup,
  fetchShippingGroup,
} from "./actions";
import { useEffect, useState } from 'react';
import { capitalize } from "@/utils/text_utils";

interface addShippingGroupProps {
  addShippingGroupToState: (newProduct: ShippingGroup) => void;
}



export const AddShippingGroup: React.FC<addShippingGroupProps> = ({ addShippingGroupToState }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [shippingGroupStatus, setShippingGroupStatus] = React.useState<string>("active");
  // Define the state for product statuses, locations, and shipping groups
  // which are fetched from the server and shown in the select dropdowns
  const [shippingGroupStatuses, setShippingGroupStatuses] = useState<ShippingGroupStatus[]>([]);
  const [shippers, setShippers] = useState<Shipper[]>([]);


  const [name, setName] = React.useState<string>("");
  const [shippingCost, setShippingCost] = React.useState<string>("");
  const [shipper, setShipper] = React.useState<string>("");
  const [dollarPrice, setDollarPrice] = React.useState<string>("0.00");
  const [tax, setTax] = React.useState<string>("8");
  const [notes, setNotes] = React.useState<string>("");
  const [error, setError] = useState('');

  // Fetch product statuses, locations, and shipping groups
  useEffect(() => {
    const getShippingGroupStatuses = async () => {
      const data = await fetchShippingGroupStatuses();
      if (data) {
        console.log("[Product Statuses]", data.statuses);
        setShippingGroupStatuses(data.statuses);
      }
    }
    getShippingGroupStatuses();
  }, []);

  useEffect(() => {
    const getShippers = async () => {
      const data = await fetchShippers();
      if (data) {
        console.log("[Product Locations]", data.shippers);
        setShippers(data.shippers);
      }
    }
    getShippers();
  }, []);

  return (
    <div>
      <>
        <Button onPress={onOpen} color="primary">
          Add Shipping Group
        </Button>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Add Shipping Group
                </ModalHeader>
                  <ModalBody>
                    <Input
                      isRequired
                      label="Name"
                      variant="bordered"
                      onValueChange={(value) => setName(value)}
                    />
                    <Select
                      items={shippers}
                      label="Shipper"
                      placeholder="Who would ship this product?"
                      className="max-w-xs"
                      onChange={(event) => setShipper(event.target.value)}
                    >
                      {(shipper) => <SelectItem key={shipper.id}>{capitalize(shipper.name)}</SelectItem>}
                    </Select>
                    <Select
                      items={shippingGroupStatuses}
                      label="Shipper"
                      placeholder="Was this product shipped?"
                      className="max-w-xs"
                      onChange={(event) => setShippingGroupStatus(event.target.value)}
                    >
                      {(shippingGroupStatus) => <SelectItem key={shippingGroupStatus.id}>{capitalize(shippingGroupStatus.name)}</SelectItem>}
                    </Select>
                    <Input
                      isRequired
                      label="Shipping Cost"
                      variant="bordered"
                      placeholder="Who much does it cost to ship this product?"
                      onValueChange={(value) => setShippingCost(value)}
                      startContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400 text-small">$</span>
                        </div>
                      }
                      type="number"
                    />
                    <Input
                      isRequired
                      label="Dollar Price"
                      variant="bordered"
                      placeholder="What is the dollar price today?"
                      onValueChange={(value) => setDollarPrice(value)}
                      startContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400 text-small">$</span>
                        </div>
                      }
                      type="number"
                    />
                    <Input
                      isRequired
                      label="Tax"
                      variant="bordered"
                      defaultValue={tax}
                      onValueChange={(value) => setTax(value)}
                      type="number"
                    />
                  </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onClick={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    onClick={() => {
                      addShippingGroup({
                        name: name,
                        id_shipper: shipper,
                        id_status: shippingGroupStatus,
                        shipping_cost: shippingCost,
                        dollar_price: dollarPrice,
                        tax: tax,
                        notes: notes,
                      }).then((response) => {
                        if (response) {
                          console.log("Product added successfully with id:", response);
                          // Get product using the id returned from the server
                          // and add it to the state using fetchProduct passing the id
                          console.log("fetching product with id:", response);
                          fetchShippingGroup(response).then((product) => {
                            if (product) {
                              console.log("Product fetched successfully:", product);
                              // Add the product to the state
                              addShippingGroupToState(product);
                            } else {
                              console.log("Failed to fetch product");
                              // Handle the error here
                              // Send a message to the user in the web interface
                              setError("Failed to fetch product");
                            }
                          }).catch(() => {
                            console.log("Failed to fetch product");
                            setError("Failed to fetch product");
                          });
                        } else {
                          console.log("Failed to add product");
                          // Handle the error here
                          // Send a message to the user in the web interface
                          setError("Failed to add product");
                        }
                      }).catch(() => {
                        console.log("Failed to add product");
                        setError("Failed to add product");
                      });
                    }}
                  >
                    Add Product
                  </Button>
                  {error && (
                    <div className="mt-2"> {/* Add margin to space the error message from the button */}
                      <span className="text-red-500">{error}</span>
                    </div>
                  )}
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </div>
  );
};
