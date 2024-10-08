import { useState } from "react"

const FormTable = ({ formData }) => {
    const [searchData, setSearchData] = useState("");

    const filterData = Array.isArray(formData) ? formData.filter(item =>
        item.businessName.toLowerCase().includes(searchData.toLowerCase())) : [];
    return (
        <div className="flex flex-col items-center justify-center p-6 mt-4">
            <label className="text-black p-4 bg-gray-100 font-bold rounded-lg w-full mb-6">
                Search by Business Name
                <input
                    type='text'
                    className="mb-6 p-2 border border-gray-300 rounded w-full mt-4"
                    placeholder="search"
                    value={searchData}
                    onChange={e => setSearchData(e.target.value)}
                />
            </label>

            <table className="table-auto w-full border-collapse border text-xs lg:text-sm">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Invoice Number</th>
                        <th className="border px-4 py-2">Business Name</th>
                        <th className="border px-4 py-2">Client Name</th>
                        <th className="border px-4 py-2">Phone</th>
                        <th className="border px-4 py-2">Email</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {filterData.map((item, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2">{item.invoiceNumber}</td>
                            <td className="border px-4 py-2">{item.businessName}</td>
                            <td className="border px-4 py-2">{item.clientName}</td>
                            <td className="border px-4 py-2">{item.phone}</td>
                            <td className="border px-4 py-2">{item.email}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    );
}

export default FormTable;