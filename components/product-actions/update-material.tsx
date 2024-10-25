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
import { TbTexture } from "react-icons/tb";
import { SelectProduct } from "../products/actions";
import { updateMaterial } from "../products/actions";
  
  

  
  interface UpdateMaterialModalProps {
    product: SelectProduct;
    replaceProductInState: (updatedProduct: SelectProduct) => void;
  }
  
  export const UpdateMaterialModal: React.FC<UpdateMaterialModalProps> = ({ product, replaceProductInState}) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    // Define the state for product statuses, locations, and shipping groups
    // which are fetched from the server and shown in the select dropdowns
  
    const [material, setMaterial] = React.useState<string>("");

    const [error, setError] = useState('');

    // If the sale price is defined, then set the sale price to the value
    // passed in the product object
    useEffect(() => {
        if (product.material) {
            setMaterial(product.material.toString());
        }
    }, [product.material]);
  
    return (
      <div>
        <>
          <Tooltip content="Assing Material">
            <Button onPress={onOpen} color="primary" isIconOnly variant="light">
                <TbTexture size={20} color="#fff" />
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
                    Give material to {product.shipping_label}
                  </ModalHeader>
                    <ModalBody>
                    <Input
                      isRequired
                      label="Material"
                      variant="bordered"
                      defaultValue={material}
                      onValueChange={(value) => setMaterial(value)}
                      type="string"
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
                        updateMaterial(
                            product.id_product,
                            material,
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
  