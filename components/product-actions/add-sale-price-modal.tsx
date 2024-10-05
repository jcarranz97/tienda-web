import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
    Tooltip,
  } from "@nextui-org/react";
import React from "react";
import { useEffect, useState } from 'react';
import { MdPriceChange } from "react-icons/md";
import { SelectProduct } from "../products/actions";
import { addSalePrice } from "../products/actions";
  
  

  
  interface AddSalePriceModalProps {
    product: SelectProduct;
    replaceProductInState: (updatedProduct: SelectProduct) => void;
  }
  
  export const AddSalePriceModal: React.FC<AddSalePriceModalProps> = ({ product, replaceProductInState}) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [productStatus, setProductStatus] = React.useState<string>("active");
    // Define the state for product statuses, locations, and shipping groups
    // which are fetched from the server and shown in the select dropdowns
  
  
    const [shippingLabel, setShippingLabel] = React.useState<string>("");
    const [description, setDescription] = React.useState<string>("");
    const [salePrice, setSalePrice] = React.useState<string>("0.00");
    const [productLocation, setProductLocation] = React.useState<string>("");
    const [shippingGroup, setShippingGroup] = React.useState<string>("");
    const [error, setError] = useState('');

    // If the sale price is defined, then set the sale price to the value
    // passed in the product object
    useEffect(() => {
        if (product.sale_price) {
            setSalePrice(product.sale_price.toString());
        }
    }, [product.sale_price]);
  
    return (
      <div>
        <>
          <Tooltip content="Assign sale price">
            <Button onPress={onOpen} color="primary" isIconOnly variant="light">
                <MdPriceChange size={20} color="#fff" />
            </Button>
          </Tooltip>
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Give sale price to {product.shipping_label}
                  </ModalHeader>
                    <ModalBody>
                    <Input
                      isRequired
                      label="Sale price"
                      variant="bordered"
                      defaultValue={salePrice}
                      onValueChange={(value) => setSalePrice(value)}
                      startContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400 text-small">$</span>
                        </div>
                      }
                      type="number"
                    />
                    </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="flat" onClick={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onClick={() => {
                        // The add sale price function is called with the product id
                        // and the sale price, and it returns a promise which
                        // is the product with the updated sale price
                        addSalePrice(
                            product.id_product,
                            salePrice
                        ).then((updatedProduct) => {
                            // If the product is updated successfully, then close the modal
                            // and reset the error message
                            onClose();
                            setError('');
                            console.log("Product updated", updatedProduct);
                            if (updatedProduct) {
                                replaceProductInState(updatedProduct);
                            } else {
                                setError('Failed to update product');
                            }
                        }).catch((error) => {
                            // If there is an error, then set the error message
                            setError(error.message);
                        }
                        );
                    }}>
                      Confirm
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
  