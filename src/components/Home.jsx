import{ useState, useEffect } from 'react';
import { Plus } from 'phosphor-react';
import InvoiceForm from './InvoiceForm';
import Invoice from './Invoice';


const Home = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(null);
  const [invoiceCounter, setInvoiceCounter] = useState(0);
  const [currentInvoiceNumber, setCurrentInvoiceNumber] = useState('8F7 S887-001');
  

  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleFormSubmit = (data) => {
    console.log('Form submitted with data:', data);  
    setFormData(data);
    setShowForm(false);
  };

  useEffect(() => {
    if (showForm) {
      const newInvoiceNumber = `8F7 S887-${String(invoiceCounter).padStart(3, '0')}`;
      setCurrentInvoiceNumber(newInvoiceNumber);
    }
  }, [showForm, invoiceCounter]);

  
  useEffect(() => {
    if (!showForm && formData) {
      setInvoiceCounter((prevCounter) => prevCounter + 1);
    }
  }, [showForm, formData]);

  return (
    <div>
      <div className="main">
        <header className="App-header">
          <h1 className='text-center text-3xl font-suse font-bold p-6 m-6'>
            Invoice Generator
          </h1>
        </header>
        <section className="flex flex-col items-center justify-center gap-8 h-[50vh]">
          <h1 className="text-center text-2xl">
            Welcome to the Invoice Generator !
          </h1>
          <button
            onClick={handleOpenForm}
            className="flex gap-4 text-white text-2xl px-12 py-4 rounded-xl bg-sea hover:bg-hover1"
          >
            Create an Invoice <Plus size={32} />
          </button>
        </section>
      </div>

    
      {showForm && (
        <InvoiceForm onClose={handleCloseForm} onSubmit={handleFormSubmit}  
        invoiceNumber={currentInvoiceNumber} />
      )}

    
      {!showForm && formData && formData.items && (
        <div className="px-8 mb-12">
          <Invoice formData={formData} />
        </div>
      )}
    </div>
  );
};

export default Home;
