import { useEffect, useState } from "react";
import api from "@/services/api";
import { toast } from "react-toastify";

const initialAddress = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  state: "",
  city: "",
  country: "India",
  pincode: "",
};

export default function Address() {
  const [billingAddress, setBillingAddress] = useState(initialAddress);
  const [shippingAddress, setShippingAddress] = useState(initialAddress);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch saved addresses
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await api.get("/api/address");

        const savedAddress = response.data.address;

        if (savedAddress) {
          setBillingAddress(savedAddress.billingAddress);
          setShippingAddress(savedAddress.shippingAddress);
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Unable to fetch address"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAddress();
  }, []);

  // Handle input changes
  const handleChange = (e, type) => {
    const { name, value } = e.target;

    if (type === "billing") {
      setBillingAddress((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setShippingAddress((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Save both addresses
  const handleSaveAddress = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const response = await api.post("/api/address/save", {
        billingAddress,
        shippingAddress,
      });
     
      toast.success(response.data.message);

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to save address"
      );
    } finally {
      setSaving(false);
    }
  };

  // Reusable address form
  const renderAddressForm = (data, type) => {
    const fields = [
      { name: "fullName", placeholder: "Full Name" },
      { name: "email", placeholder: "Email Address", type: "email" },
      { name: "phone", placeholder: "Mobile Number", type: "tel" },
      { name: "address", placeholder: "Full Address", textarea: true },
      { name: "state", placeholder: "State" },
      { name: "city", placeholder: "City" },
      { name: "country", placeholder: "Country" },
      { name: "pincode", placeholder: "Pincode" },
    ];

    return (
      <div className="space-y-4">
        {fields.map((field) => (
          <div key={field.name}>
            {field.textarea ? (
              <textarea
                name={field.name}
                placeholder={field.placeholder}
                rows="3"
                value={data[field.name] || ""}
                onChange={(e) => handleChange(e, type)}
                required
                className="w-full border rounded-md p-3 outline-none focus:border-[#C09578]"
              />
            ) : (
              <input
                type={field.type || "text"}
                name={field.name}
                placeholder={field.placeholder}
                value={data[field.name] || ""}
                onChange={(e) => handleChange(e, type)}
                required
                className="w-full border rounded-md p-3 outline-none focus:border-[#C09578]"
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return <p className="p-6">Loading addresses...</p>;
  }

  return (
    <div className="border border-gray-200 rounded-md p-6">
      <h2 className="text-2xl font-semibold mb-6">
        My Address
      </h2>

      <form onSubmit={handleSaveAddress}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Billing Address */}
          <div className="border border-gray-200 rounded-md p-5">
            <h3 className="text-xl font-semibold mb-5">
              Billing Address
            </h3>

            {renderAddressForm(billingAddress, "billing")}
          </div>

          {/* Shipping Address */}
          <div className="border border-gray-200 rounded-md p-5">
            <h3 className="text-xl font-semibold mb-5">
              Shipping Address
            </h3>

            {renderAddressForm(shippingAddress, "shipping")}
          </div>

        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full mt-6 bg-[#C09578] text-white py-3 rounded-md hover:bg-black transition disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Both Addresses"}
        </button>
      </form>
    </div>
  );
}