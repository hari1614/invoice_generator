import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { QRCodeSVG } from 'qrcode.react';
import { Printer } from 'phosphor-react';

const Invoice = ({ formData }) => {

    const invoiceRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => invoiceRef.current,
        onAfterPrint: () => console.log("Print complete"),
    });


    if (!formData || !formData.items || formData.items.length === 0) {
        return <p>No data to display</p>;
    }

    const calculateSubtotal = () => {
        return formData.items.reduce((total, item) => {
            const itemTotal = item.price * item.quantity || 0;
            return total + itemTotal;
        }, 0);
    };

    const subtotal = calculateSubtotal();
    const taxRate = 0.2;
    const tax = subtotal * taxRate;
    const grandTotal = subtotal + tax;


    return (
        <div>
            <div ref={invoiceRef} id="invoice" className="p-6 bg-white border mt-8">
                <div className='text-end text-gray-600'>
                    <h1 className="lg:text-2xl text-sm font-semibold text-black">{formData.businessName || 'Software Developer'}</h1>
                    <p className='text-xs lg:text-sm'>{formData.address || 'Rock beach pondicherry'}</p>
                    <p className='text-xs lg:text-sm'>{formData.phone || '+91 8825842628'}</p>
                </div>

                <hr className="my-4" />
                <div className='flex justify-between'>
                    <div className="mb-4 text-gray-600">
                        <p><strong>Invoice issued for:</strong></p>
                        <p className='lg:text-2xl text-sm font-semibold text-black'>{formData.clientName || 'Jack Sparrow'}</p>
                        <p className='text-xs lg:text-sm '>{formData.clientAddress || '26985 Brighton Lane,Lake Forest, CA 92630'}</p>
                        <p className='text-xs lg:text-sm'>{formData.clientEmail || 'Jack@gmail.com'}</p>
                    </div>

                    <div className="mb-4 text-gray-600">
                        <strong className='lg:text-2xl text-sm font-semibold text-black te'>Invoice #:
                            <span className='text-sea'>
                                {formData.invoiceNumber || '8F7 S887-001'}
                            </span>
                        </strong>
                        <p className='text-xs lg:text-sm'>Payment Date: {formData.paymentDate || '28-12-2024'}</p>
                        <p className='text-xs lg:text-sm'>Invoice Date: {formData.invoiceDate || '26-03-2024'}</p>
                    </div>
                </div>
                <div className='overflow-x-auto'>
                    <table className="table-auto w-full border-collapse border text-xs lg:text-sm">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">#</th>
                                <th className="border px-4 py-2">Title</th>
                                <th className="border px-4 py-2">Description</th>
                                <th className="border px-4 py-2">Price</th>
                                <th className="border px-4 py-2">Quantity</th>
                                <th className="border px-4 py-2">Unit</th>
                                <th className="border px-4 py-2">Total</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {formData.items.map((item, index) => (
                                <tr key={index}>
                                    <td className="border px-4 py-2">{index + 1}</td>
                                    <td className="border px-4 py-2">{item.title || 'N/A'}</td>
                                    <td className="border px-4 py-2">{item.description || 'N/A'}</td>
                                    <td className="border px-4 py-2">{item.price || '0.00'}</td>
                                    <td className="border px-4 py-2">{item.quantity || '1'}</td>
                                    <td className="border px-4 py-2">{item.unit || 'N/A'}</td>
                                    <td className="border px-4 py-2">
                                        {(item.price * item.quantity).toFixed(2) || '0.00'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="lg:text-lg font-semibold text-sm text-right mt-6 text-gray-600">
                    <p>Subtotal: {subtotal.toFixed(2)} ALL</p>
                    <p>VAT (20%): {tax.toFixed(2)} ALL</p>
                    <p><strong className='text-green-800'>Grand Total: {grandTotal.toFixed(2)} ALL</strong></p>
                </div>

                <div>
                    <h2 className='text-sm lg:text-xl mb-2'>Invoice Note</h2>
                    <h3 className='text-xs lg:text-sm font-semibold text-gray-600 w-full lg:w-[70%]'>{formData.invoiceNote || '"On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish.'}</h3>
                </div>

                <footer className='mt-4'>

                    <div className="mb-4 flex lg:justify-start justify-center">
                        <QRCodeSVG value={formData.invoiceNumber || 'N/A'} size={60} />
                    </div>

                    <div>
                        <p className='text-xs lg:text-sm text-center text-semibold text-gray-600'>This invoice is created on computer and is valid without the signature and stamp.</p>
                    </div>

                </footer>


            </div>
            <div className='flex lg:justify-start justify-center'>
                <button className="bg-sea hover:bg-hover1 text-white font-medium text-sm shadow-xl hover:shadow-lg py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center mt-4"
                    onClick={handlePrint}>
                    <Printer size={24} className="mr-2" /> Print Invoice
                </button>
            </div>
        </div>
    );
};

export default Invoice;
