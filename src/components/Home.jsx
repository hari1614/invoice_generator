import { useState, useEffect } from 'react';
import { Plus } from 'phosphor-react';
import InvoiceForm from './InvoiceForm';
import Invoice from './Invoice';
import FormTable from './FormTable';


const Home = () => {
    const [showForm, setShowForm] = useState(false);
    // const [formData, setFormData] = useState(null);
    const [invoices, setInvoices] = useState([]);
    const [invoiceCounter, setInvoiceCounter] = useState(0);
    const [currentInvoiceNumber, setCurrentInvoiceNumber] = useState('');


    const handleOpenForm = () => {
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
    };

    const handleFormSubmit = (data) => {
        console.log('Form submitted with data:', data);
        setInvoices(prevInvoices => [...prevInvoices, data]); 
        setShowForm(false);
    };

    useEffect(() => {
        if (showForm) {
            const newInvoiceNumber = `8F7 S887-${String(invoiceCounter).padStart(3, '0')}`;
            setCurrentInvoiceNumber(newInvoiceNumber);
        }
    }, [showForm, invoiceCounter]);


    useEffect(() => {
        if (!showForm) {
            setInvoiceCounter((prevCounter) => prevCounter + 1);
        }
    }, [showForm]);

    return (
        <div>
            <div className="main">
                <header className="App-header">
                    <h1 className='text-center text-xl lg:text-3xl font-bold p-6 m-6'>
                        Invoice Generator
                    </h1>
                </header>
                <section className="flex flex-col items-center justify-center gap-8 h-auto lg:h-[50vh]">
                    <h1 className="text-center text-xl lg:text-2xl font-extrabold">
                        Welcome to the Invoice Generator !
                    </h1>
                    <button
                        onClick={handleOpenForm}
                        className="flex gap-4 text-white text-xl lg:text-2xl font-bold lg:font-extrabold px-6 lg:px-12 py-2 lg:py-4 rounded-xl bg-sea hover:bg-hover1"
                    >
                        Create an Invoice <Plus size={32} weight="bold" />
                    </button>
                </section>
            </div>

            <FormTable formData={invoices} invoiceNumber={currentInvoiceNumber} />

            {showForm && (
                <InvoiceForm onClose={handleCloseForm} onSubmit={handleFormSubmit}
                    invoiceNumber={currentInvoiceNumber} />
            )}

            {!showForm && invoices.length > 0 && (
                <div className="px-8 mb-12">
                    <Invoice formData={invoices[invoices.length - 1]} /> {/* Show the last submitted invoice */}
                </div>
            )}


            {/* {!showForm && formData && formData.items && (
                <div className="px-8 mb-12">
                    <Invoice formData={formData} />
                </div>
            )} */}
        </div>
    );
};

export default Home;
