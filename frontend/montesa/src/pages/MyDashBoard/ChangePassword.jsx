
function ChangePassword() {
  return (
    <div className="border border-gray-200 rounded-md p-6">
      <h2 className="text-2xl font-semibold mb-6">
        Change Password
      </h2>

      <form className="max-w-xl space-y-5">

        <div>
          <label className="block mb-2 font-medium">
            Current Password
          </label>
          <input
            type="password"
            placeholder="Enter current password"
            className="w-full border rounded-md p-3 outline-none focus:border-[#C09578]"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            New Password
          </label>
          <input
            type="password"
            placeholder="Enter new password"
            className="w-full border rounded-md p-3 outline-none focus:border-[#C09578]"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Confirm New Password
          </label>
          <input
            type="password"
            placeholder="Confirm new password"
            className="w-full border rounded-md p-3 outline-none focus:border-[#C09578]"
          />
        </div>

        <button
          type="button"
          className="bg-[#C09578] text-white px-6 py-3 rounded-md hover:bg-black transition"
        >
          Update Password
        </button>

      </form>
    </div>
  );
}

export default ChangePassword;