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
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import React from "react";
import {
  fetchProductStatuses,
  ProductStatus,
  fetchProductLocations,
  ProductLocation,
  ShippingGroup,
  fetchShippingGroups,
  fetchProduct,
  Seller,
  fetchSellers,
} from "./actions";
import { useEffect, useState } from 'react';
import { capitalize } from "@/utils/text_utils";
import { addProduct } from "./actions";
import { SelectProduct } from "./actions";



interface AddProductProps {
  addProductToState: (newProduct: SelectProduct) => void;
}


export const AddProduct: React.FC<AddProductProps> = ({ addProductToState }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // Define the state for product statuses, locations, and shipping groups
  // which are fetched from the server and shown in the select dropdowns
  const [productLocations, setProductLocations] = useState<ProductLocation[]>([]);
  const [shippingGroups, setShippingGroups] = useState<ShippingGroup[]>([]);


  const [shippingLabel, setShippingLabel] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [purchasePrice, setPurchasePrice] = React.useState<string>("0.00");
  const [productLocation, setProductLocation] = React.useState<string>("");
  const [shippingGroup, setShippingGroup] = React.useState<string>("");
  const [error, setError] = useState('');

  // Fetch product statuses, locations, and shipping groups
  useEffect(() => {
    const getProductLocations = async () => {
      const data = await fetchProductLocations();
      if (data) {
        console.log("[Product Locations]", data.locations);
        setProductLocations(data.locations);
      }
    }
    getProductLocations();
  }, []);

  useEffect(() => {
    const getShippingGroups = async () => {
      const data = await fetchShippingGroups();
      if (data) {
        console.log("[Shipping Groups]", data.groups);
        setShippingGroups(data.groups);
      }
    }
    getShippingGroups();
  }, []);


  return (
    <div>
      <>
        <Button onPress={onOpen} color="primary">
          Add Product
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
                  Add Product
                </ModalHeader>
                  <ModalBody>
                    <Input
                      isRequired
                      label="Shipping Label"
                      variant="bordered"
                      onValueChange={(value) => setShippingLabel(value)}
                    />
                    <Input
                      label="Description"
                      variant="bordered"
                      onValueChange={(value) => setDescription(value)}
                    />
                    <Input
                      isRequired
                      label="Purchase Price"
                      variant="bordered"
                      placeholder="0.00"
                      onValueChange={(value) => setPurchasePrice(value)}
                      startContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400 text-small">$</span>
                        </div>
                      }
                      type="number"
                    />
                    <Select
                      items={productLocations}
                      label="Product Location"
                      placeholder="Product Location"
                      className="max-w-xs"
                      onChange={(event) => setProductLocation(event.target.value)}
                    >
                      {(location) => <SelectItem key={location.id}>{capitalize(location.name)}</SelectItem>}
                    </Select>
                    <Select
                      items={shippingGroups}
                      label="Shipping Group"
                      placeholder="Shipping Group"
                      className="max-w-xs"
                      onChange={(event) => setShippingGroup(event.target.value)}
                    >
                      {(group) => <SelectItem key={group.id}>{group.name}</SelectItem>}
                    </Select>
                  </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onClick={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    onClick={() => {
                      // addProduct returns a promise
                      // so we can use .then() to handle the response
                      // The idea here is to send and error message if the product
                      // could not be added to the database
                      addProduct({
                        shipping_label: shippingLabel,
                        description: description,
                        purchase_price: purchasePrice,
                        product_location_id: productLocation,
                        shipping_group_id: shippingGroup,
                      }).then((response) => {
                        if (response) {
                          console.log("Product added successfully with id:", response);
                          // Get product using the id returned from the server
                          // and add it to the state using fetchProduct passing the id
                          console.log("fetching product with id:", response);
                          fetchProduct(response).then((product) => {
                            if (product) {
                              console.log("Product fetched successfully:", product);
                              // Add the product to the state
                              addProductToState(product);
                              // onClose();
                            } else {
                              console.log("Failed to fetch product");
                              // Handle the error here
                              // Send a message to the user in the web interface
                              setError("Failed to fetch product");
                            }
                          });
                        } else {
                          console.log("Failed to add product");
                          // Handle the error here
                          // Send a message to the user in the web interface
                          setError("Failed to add product");
                        }
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
