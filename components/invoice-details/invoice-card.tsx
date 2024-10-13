import { 
    Card, 
    CardBody, 
    CardHeader, 
    CardFooter,
    Chip,
} from '@nextui-org/react';
import { FaMoneyBill, FaBox, FaStore, FaWallet, FaUser } from 'react-icons/fa6';
import { FaShoppingCart } from 'react-icons/fa';
import { FaRegStickyNote } from 'react-icons/fa';
import { FaInfoCircle } from 'react-icons/fa';
import { Divider } from '@nextui-org/react';
import { capitalize } from '@/utils/text_utils';
import { SelectInvoiceDetails } from './actions';


const InvoiceCard = ({ invoiceDetails }: { invoiceDetails: SelectInvoiceDetails }) => {
    return (
        <Card className="shadow-md rounded-md"> {/* Removed border class */}
          <CardHeader className="flex items-center justify-between bg-gray-100 p-4 rounded-t-md text-gray-800">
            <div className="flex items-center gap-2">
              <FaStore size={20} />
              <h4 className="font-semibold">Ticket Details</h4>
            </div>
          </CardHeader>
    
          <Divider />
    
          <CardBody className="p-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <FaUser size={18} color="#007BFF" />
                <span>
                  Seller: <strong>{capitalize(invoiceDetails.seller_name)}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FaMoneyBill size={18} color="#28A745" />
                <span>
                  Total Amount: <strong>${invoiceDetails.total_amount} MXN</strong>
                </span>
              </div>
    
              <div className="flex items-center gap-2">
                <FaWallet size={18} color="#FF6347" />
                <span>
                  Total Paid: <strong>${invoiceDetails.total_paid} MXN</strong>
                </span>
              </div>
    
              {/* New section for Invoice Status with Chip */}
              <div className="flex items-center gap-2">
                <FaInfoCircle size={18} color="#808080" /> {/* Fixed color for the FaCircle */}
                <span>
                  Status: 
                  <Chip
                    size="lg"
                    variant="flat"
                    color={
                      invoiceDetails.invoice_status === 'paid'
                        ? "success"        // Assuming your library uses these names for colors
                        : invoiceDetails.invoice_status === 'pending'
                        ? "warning"
                        : invoiceDetails.invoice_status === 'overpaid'
                        ? "secondary"      // Use the secondary color for overpaid
                        : "default"        // Fallback color for unknown status
                    }
                  >
                    <span className="capitalize text-md">
                      {capitalize(invoiceDetails.invoice_status || 'unknown')}
                    </span>
                  </Chip>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FaBox size={18} color="#FFA500" />
                <span>
                  Number of Products: <strong>{invoiceDetails.num_products}</strong>
                </span>
              </div>
    
              <div className="flex items-center gap-2">
                <FaShoppingCart size={18} color="#20B2AA" />
                <span>
                  Number of Payments: <strong>{invoiceDetails.num_payments}</strong>
                </span>
              </div>
    
              <div className="flex items-start gap-2">
                <FaRegStickyNote size={18} color="#6A5ACD" />
                <span>
                  Notes: <em>{invoiceDetails.notes || 'No notes available'}</em>
                </span>
              </div>
            </div>
          </CardBody>
        </Card>
      );
    };
  
  export default InvoiceCard;