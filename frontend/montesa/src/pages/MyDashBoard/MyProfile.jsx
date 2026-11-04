
import { useAuth } from "@/Context/AuthContext";
import { useState ,useEffect  } from "react";
import api from "@/services/api";
import { toast } from "react-toastify";

function MyProfile() {
  const { user ,updateUser  } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await api.patch(
        "/api/auth/update-profile",
        formData
      );

      toast.success(response.data.message);
      updateUser(response.data.user);
      setIsEditing(false);

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Profile update failed"
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user) {
        setFormData({
            username: user.username || "",
            email: user.email || "",
        });
    }
}, [user]);

  return (
    <div className="border border-gray-200 rounded-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">My Profile</h2>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-[#C09578] text-white px-5 py-2 rounded-md"
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-gray-500 mb-1">Name</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="border p-3 rounded-md w-full"
              required
            />
          </div>

          <div>
            <label className="block text-gray-500 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border p-3 rounded-md w-full"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-[#C09578] text-white px-5 py-2 rounded-md disabled:opacity-50"
          >
            {loading ? "Updating..." : "Save Changes"}
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-gray-500 mb-1">Name</label>
            <p className="font-medium">
              {user?.username || "Not available"}
            </p>
          </div>

          <div>
            <label className="block text-gray-500 mb-1">Email</label>
            <p className="font-medium">
              {user?.email || "Not available"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyProfile;
