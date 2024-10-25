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
import { FaRulerCombined } from "react-icons/fa";
import { SelectProduct } from "../products/actions";
import { updateProductSize } from "../products/actions";
  
  

  
  interface UpdateSizeModalProps {
    product: SelectProduct;
    replaceProductInState: (updatedProduct: SelectProduct) => void;
  }
  
  export const UpdateSizeModal: React.FC<UpdateSizeModalProps> = ({ product, replaceProductInState}) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    // Define the state for product statuses, locations, and shipping groups
    // which are fetched from the server and shown in the select dropdowns
  
    const [length, setLength] = React.useState<string>("0.00");
    const [width, setWidth] = React.useState<string>("0.00");
    const [height, setHeight] = React.useState<string>("0.00");
    const [error, setError] = useState('');

    // If the sale price is defined, then set the sale price to the value
    // passed in the product object
    useEffect(() => {
        if (product.length) {
            setLength(product.length.toString());
        }
    }, [product.length]);

    useEffect(() => {
        if (product.width) {
            setWidth(product.width.toString());
        }
    }, [product.width]);

    useEffect(() => {
        if (product.height) {
            setHeight(product.height.toString());
        }
    }, [product.height]);
  
    return (
      <div>
        <>
          <Tooltip content="Assing Product Size">
            <Button onPress={onOpen} color="primary" isIconOnly variant="light">
                <FaRulerCombined size={20} color="#fff" />
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
                    Give size to {product.shipping_label}
                  </ModalHeader>
                    <ModalBody>
                    <Input
                      isRequired
                      label="Length"
                      variant="bordered"
                      defaultValue={length}
                      onValueChange={(value) => setLength(value)}
                      endContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400 text-small">cm</span>
                        </div>
                      }
                      type="number"
                    />
                    <Input
                      isRequired
                      label="Width"
                      variant="bordered"
                      defaultValue={width}
                      onValueChange={(value) => setWidth(value)}
                      endContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400 text-small">cm</span>
                        </div>
                      }
                      type="number"
                    />
                    <Input
                      isRequired
                      label="Height"
                      variant="bordered"
                      defaultValue={height}
                      onValueChange={(value) => setHeight(value)}
                      endContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400 text-small">cm</span>
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
                        updateProductSize(
                            product.id_product,
                            length,
                            width,
                            height
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
  