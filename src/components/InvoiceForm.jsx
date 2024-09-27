import { useState } from 'react';
import { Plus, Calendar, X } from 'phosphor-react';

const InvoiceForm = ({ onClose, onSubmit, invoiceNumber }) => {
    const [formData, setFormData] = useState({
        invoiceNumber: invoiceNumber,
        businessName: '',
        address: '',
        email: '',
        phone: '',
        clientName: '',
        clientAddress: '',
        clientPhone: '',
        clientEmail: '',
        invoiceDate: '',
        paymentDate: '',
        invoiceNote:'',
        items: [{ title: '', description: '', price: '', quantity: '', unit: '' }],
    });

    const handleInputChange = (e, index = null) => {
        const { name, value } = e.target;
        if (index !== null) {
            const updatedItems = [...formData.items];
            updatedItems[index][name] = value;
            setFormData({ ...formData, items: updatedItems });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleAddItem = () => {
        setFormData({
            ...formData,
            items: [...formData.items, { option: '', title: '', description: '', price: '', quantity: '', unit: '' }],
        });
    };

    const handleSubmit = () => {
        onSubmit(formData);
    };

    const today = new Date();
    const formattedDate = today.toLocaleDateString();

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl w-[35%] ">

                <div className='flex justify-between'>
                    <h2 className="text-2xl font-bold mb-4">Create Invoice</h2>
                    <button onClick={onClose} className='text-lg font-bold'><X size={26} /></button>
                </div>

                <hr className='mb-2'></hr>

                <div className=' text-sm font-semibold text-gray-600 flex justify-between p-2'>
                    <h2>Invoice {formData.invoiceNumber}</h2>
                    <h2 className='flex gap-2'>Date: {formattedDate} <Calendar size={18} /></h2>
                </div>

                <div className="overflow-y-auto max-h-[70vh] text-gray-600 font-semibold text-sm">
                    <div className="grid grid-cols-1 gap-4 mb-4 rounded-lg w-full">

                        <label className='text-black p-4 bg-gray-100 font-bold rounded-lg'>
                            Business Name
                            <input
                                className="border p-2 block rounded-lg text-xs font-medium w-full mt-2"
                                name="businessName"
                                value={formData.businessName}
                                onChange={handleInputChange}
                            />
                        </label>

                        <label>
                            Address
                            <input
                                className="border p-2 rounded-lg block mt-2 w-full"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                            />
                        </label>
                        
                        <div className='flex justify-between gap-2'>
                            <label>
                                Phone Number
                                <input
                                    className="border rounded-lg p-2 w-full mt-2"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                />
                            </label>

                            <label>
                                Email
                                <input
                                    className="border rounded-lg p-2 w-full mt-2"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </label>
                        </div>
                        <label className='text-black p-4 bg-gray-100 font-bold rounded-lg'>
                            Client Name
                            <input
                                type='text'
                                className="border p-2 block rounded-lg text-xs font-medium w-full mt-2"
                                name="clientName"
                                value={formData.clientName}
                                onChange={handleInputChange}
                            />
                        </label>

                        <label>
                            Address
                            <input
                                type='text'
                                className="border p-2 rounded-lg block mt-2 w-full"
                                name="clientAddress"
                                value={formData.clientAddress}
                                onChange={handleInputChange}
                            />
                        </label>

                        <div className='flex flex-col gap-2'>
                            <div className='flex justify-between gap-2'>
                                <label className="flex-1">
                                    Phone Number
                                    <input
                                        type='number'
                                        className="border rounded-lg p-2 w-full mt-2"
                                        name="clientPhone"
                                        value={formData.clientPhone}
                                        onChange={handleInputChange}
                                    />
                                </label>

                                <label className="flex-1">
                                    Email
                                    <input
                                        type='email'
                                        className="border rounded-lg p-2 w-full mt-2"
                                        name="clientEmail"
                                        value={formData.clientEmail}
                                        onChange={handleInputChange}
                                    />
                                </label>
                            </div>

                            <div className='flex justify-between gap-2'>
                                <label className="flex-1">
                                    Invoice Date
                                    <input
                                        type='date'
                                        className="border rounded-lg p-2 w-full mt-2 uppercase"
                                        name="invoiceDate"
                                        value={formData.invoiceDate}
                                        onChange={handleInputChange}
                                    />
                                </label>

                                <label className="flex-1">
                                    Payment Date
                                    <input
                                        type='date'
                                        className="border rounded-lg p-2 w-full mt-2 uppercase"
                                        name="paymentDate"
                                        value={formData.paymentDate}
                                        onChange={handleInputChange}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    <h3 className="text-lg font-bold mb-2 text-black">Invoice Items</h3>
                    {formData.items.map((item, index) => (
                        <div key={index} className="grid grid-cols-5 gap-4 mb-2 rounded-lg">

                            <input
                                type='text'
                                className="border p-2 rounded-lg"
                                name="title"
                                value={item.title}
                                placeholder="Title"
                                onChange={(e) => handleInputChange(e, index)}
                            />
                            <input
                                type='text'
                                className="border p-2 rounded-lg"
                                name="description"
                                value={item.description}
                                placeholder="Description"
                                onChange={(e) => handleInputChange(e, index)}
                            />
                            <input
                                type='number'
                                className="border p-2 rounded-lg"
                                name="price"
                                value={item.price}
                                placeholder="Price"
                                onChange={(e) => handleInputChange(e, index)}
                            />
                            <input
                                type='number'
                                className="border p-2 rounded-lg"
                                name="quantity"
                                value={item.quantity}
                                placeholder="Quantity"
                                onChange={(e) => handleInputChange(e, index)}
                            />
                            <input
                                
                                className="border p-2 rounded-lg"
                                name="unit"
                                value={item.unit}
                                placeholder="Unit"
                                onChange={(e) => handleInputChange(e, index)}
                            />
                        </div>
                    ))}

                    <button
                        className="text-sea font-bold flex gap-2 hover:bg-gray-300 py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center mt-4"
                        onClick={handleAddItem}
                    >
                        Add Item <Plus size={18} />
                    </button>

                    <div className='mt-4'>
                        <label className="mt-4">
                            Invoice Note
                            <textarea
                                className="border rounded-lg p-2 w-full mt-2"
                                name="invoiceNote"
                                value={formData.invoiceNote}
                                onChange={handleInputChange}
                                rows="4"
                            />
                        </label>
                    </div>

                    <div className="flex justify-center gap-4 mt-6">
                        <button
                            className="bg-gray-300 hover:bg-hover2 hover:text-white px-4 py-2 rounded"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            className="bg-sea hover:bg-hover1 text-white font-medium text-sm shadow-xl hover:shadow-lg py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvoiceForm;
