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
    Spinner,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    getKeyValue,
    Textarea,
    Card,
    DatePicker,
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
    fetchSellers,
    Seller,
    FetchSellersResponse,
    createInvoice,
  } from "./actions";
  import { useEffect, useState } from 'react';
  import { capitalize } from "@/utils/text_utils";
  import { addProduct } from "./actions";
  import { SelectProduct } from "./actions";
  
  
  
  interface AddProductProps {
    addProductToState: (newProduct: SelectProduct) => void;
    selectedProductsIndexes: Set<string>;
    products: SelectProduct[];
  }
  

  const columns = [
    {
        key: "shipping_label",
        label: "SHIPPING LABEL",
    },
    {
        key: "shipping_group",
        label: "SHIPPING GROUP",
    },
    {
        key: "status",
        label: "STATUS",
    },
    {
        key: "purchase_price_mxn",
        label: "PURCHASE PRICE (MXN)",
    },
    {
        key: "sale_price",
        label: "SALE PRICE",
    }
    ];
  
// Utility function to convert local date to UTC and return the date part only
const localToUtc = (localDate: Date | null | undefined) => {
  if (!localDate) return ""; // Handle case where the date is null or undefined

  // Calculate the UTC date
  const utcDate = new Date(localDate.getTime() + localDate.getTimezoneOffset() * 60000);

  // Format the UTC date to return only the date part (YYYY-MM-DD)
  const formattedDate = utcDate.toISOString().split('T')[0];
  
  return formattedDate; // Return just the date part
};


  export const CreateInvoice: React.FC<AddProductProps> = ({ addProductToState, selectedProductsIndexes, products}) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [productStatus, setProductStatus] = React.useState<string>("active");
    const [seller, setSeller] = React.useState<string>("");
    const [sellers, setSellers] = useState<Seller[]>([]);
    const [payment, setPayment] = React.useState<string>("");
    const [isCreatingInvoice, setIsCreatingInvoice] = useState<boolean>(false);
    const [paymentDate, setPaymentDate] = React.useState<string>("");
    const [paymentComment, setPaymentComment] = React.useState<string>("");
    // Define the state for product statuses, locations, and shipping groups
    // which are fetched from the server and shown in the select dropdowns
    const [productStatuses, setProductStatuses] = useState<ProductStatus[]>([]);
    const [productLocations, setProductLocations] = useState<ProductLocation[]>([]);
    
    const [shippingGroups, setShippingGroups] = useState<ShippingGroup[]>([]);
  
  
    const [shippingLabel, setShippingLabel] = React.useState<string>("");
    const [notes, setNotes] = React.useState<string>("");
    const [purchasePrice, setPurchasePrice] = React.useState<string>("0.00");
    const [productLocation, setProductLocation] = React.useState<string>("");
    const [shippingGroup, setShippingGroup] = React.useState<string>("");
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    // Print selected products
    console.log("Selected Products Indexes", selectedProductsIndexes);
    console.log("Seller - ", seller);
    // Fetch product statuses, locations, and shipping groups
    useEffect(() => {
      const getSellers = async () => {
        console.log("!!!!fetching sellers");
        const data = await fetchSellers();
        if (data) {
          console.log("[Sellers]", data.sellers);
          setSellers(data.sellers);
        }
      }
      getSellers();
    }, []);
  
    // SelectedProduct is an array of objects with the selected products
    // These products are taken from the products array using the selectedProductsIndexes
    const selectedProducts = products.filter((product) => selectedProductsIndexes.has(product.id_product.toString()));

    console.log("Selected Products Array", selectedProducts);

    return (
      <div>
        <>
          <Button onPress={onOpen} color="primary">
            Create Invoice
          </Button>
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
            size="3xl"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Create Invoice
                  </ModalHeader>
                    <ModalBody>
                      {/* In the modal, create a small table with the selected products and include, shipping_label, status and sale_price */}
                      <Select
                        items={sellers}
                        label="Seller name"
                        placeholder="Who is the seller?"
                        onChange={(event) => setSeller(event.target.value)}
                        style={{ flex: 1 }} // Optional: make it more responsive
                      >
                        {(seller) => <SelectItem key={seller.id}>{seller.name}</SelectItem>}
                      </Select>
                      <Textarea
                        label="Notes"
                        placeholder="Add notes here"
                        //className="max-w-xs"
                        onValueChange={(value) => setNotes(value)}
                      />
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Input
                          isRequired
                          label="First Payment"
                          variant="bordered"
                          placeholder="0.00"
                          onValueChange={(value) => setPayment(value)}
                          startContent={
                            <div className="pointer-events-none flex items-center">
                              <span className="text-default-400 text-small">$</span>
                            </div>
                          }
                          type="number"
                          style={{ width: '120px' }} // Set a fixed width for the input
                        />
                        <DatePicker
                          label="First Payment Date"
                          className="max-w-[284px]" // You can adjust this width as needed
                          isRequired
                          onChange={(date) => setPaymentDate(date.toString())}
                          // Default value is today
                        />
                      </div>
                      <Textarea
                        label="First Payment Comments"
                        placeholder="Enter your comments here"
                        className="max-w-xs"
                        onValueChange={(value) => setPaymentComment(value)}
                      />
                      <Table aria-label="products-for-invoice">
                        <TableHeader columns={columns}>
                          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                        </TableHeader>
                        <TableBody items={selectedProducts}>
                          {(item) => (
                            <TableRow key={item.id_product}>
                              {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="flat" onClick={onClose}>
                      Close
                    </Button>
                    <Button
                      color="primary"
                      isLoading={isCreatingInvoice}
                      endContent={isCreatingInvoice ? <Spinner /> : null}
                      onClick={() => {
                        // addProduct returns a promise
                        // so we can use .then() to handle the response
                        // The idea here is to send and error message if the product
                        // could not be added to the database
                        setIsCreatingInvoice(true);
                        console.log("Setting isCreatingInvoice to true");
                        createInvoice({
                          id_seller: Number(seller),
                          products: selectedProducts.map((product) => product.id_product),
                          notes: notes,
                          payment: payment,
                          payment_date: localToUtc(new Date(paymentDate)),
                          payment_comment: paymentComment,
                        }).then((response) => {
                          setIsCreatingInvoice(false);
                          if (response) {
                            console.log("Product added successfully with id:", response);
                            // Get product using the id returned from the server
                            // and add it to the state using fetchProduct passing the id
                            setSuccessMessage("Invoice created successfully with id: " + response);
                          } else {
                            console.log("Failed to create invoice");
                            // Handle the error here
                            // Send a message to the user in the web interface
                            setError("Failed to create invoice");
                          }
                        });
                      }}
                    >
                      Create Invoice
                    </Button>
                    {error && (
                      <div className="mt-2"> {/* Add margin to space the error message from the button */}
                        <span className="text-red-500">{error}</span>
                      </div>
                    )}
                    {successMessage && (
                      <div className="mt-2"> {/* Add margin to space the error message from the button */}
                        <span className="text-green-500">{successMessage}</span>
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
  