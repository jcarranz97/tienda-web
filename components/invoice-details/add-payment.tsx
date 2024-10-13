import React from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Checkbox,
    Input,
    Link,
    Textarea,
    DatePicker,
} from "@nextui-org/react";
import { addInvoicePayment, fetchInvoiceDetails, InvoicePayment, SelectInvoiceDetails} from "./actions";


export interface AddPaymentProps {
    invoice_id: number;
    addPaymentToState: (payment: InvoicePayment) => void;
    setInvoiceDetails: (invoice_details: SelectInvoiceDetails) => void;
}

// Utility function to convert local date to UTC and return the date part only
const localToUtc = (localDate: Date | null | undefined) => {
    if (!localDate) return ""; // Handle case where the date is null or undefined

    // Calculate the UTC date
    const utcDate = new Date(localDate.getTime() + localDate.getTimezoneOffset() * 60000);

    // Format the UTC date to return only the date part (YYYY-MM-DD)
    const formattedDate = utcDate.toISOString().split('T')[0];
    
    return formattedDate; // Return just the date part
};


export const AddPayment: React.FC<AddPaymentProps> = ({ invoice_id, addPaymentToState, setInvoiceDetails}) => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [paymentAmount, setPaymentAmount] = React.useState<string>("0.00");
  const [paymentDate, setPaymentDate] = React.useState<string>("");
  const [paymentComment, setPaymentComment] = React.useState<string>("");
  const [error, setError] = React.useState('');


  return (
    <>
      <Button onPress={onOpen} color="primary">Add Installement</Button>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add Installment</ModalHeader>
              <ModalBody>
              <Input
                    isRequired
                    label="Amount"
                    variant="bordered"
                    placeholder="0.00"
                    onValueChange={(value) => setPaymentAmount(value)}
                    startContent={
                    <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">$</span>
                    </div>
                }
                type="number"
              />
            <DatePicker 
                label="Installement Date"
                className="max-w-[284px]"
                isRequired
                onChange={(date) => setPaymentDate(date.toString())}
                // Default value is today
                />
              <Textarea
                label="Comments"
                placeholder="Enter your comments here"
                className="max-w-xs"
                onValueChange={(value) => setPaymentComment(value)}
              />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                    color="primary"
                    onClick={() => {
                        console.log("Send payment");
                        addInvoicePayment({
                            invoice_id: invoice_id,
                            amount: paymentAmount,
                            // Get payment date from date picker
                            payment_date: localToUtc(new Date(paymentDate)),
                            payment_comment: paymentComment,
                        }).then((response) => {
                            console.log("Payment added", response);
                            if (response) {
                                // Add the payment to the state
                                addPaymentToState(response);
                                // If the payment was added successfully, then
                                // fetch the invoice details to update the state
                                fetchInvoiceDetails(invoice_id).then((data) => {
                                    if (data) {
                                        setInvoiceDetails(data);
                                        onClose(); // Close the modal
                                    } else {
                                        console.error("Error fetching invoice details");
                                        setError("Error fetching invoice details");
                                    }
                                });
                            } else {
                                console.error("Error adding payment");
                                setError("Error adding payment");
                            }
                        });
                    }}
                >
                  Send
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
  );
}