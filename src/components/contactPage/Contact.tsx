

const ContactPage = () => {
  return (
    <div className="h-[60vh] flex items-center justify-center bg-gray-100 my-8">
      <div className="max-w-2xl w-full mx-auto p-8 bg-white shadow-lg rounded-lg flex flex-col">
        <h1 className="text-2xl font-bold text-center mb-6">Contact Us</h1>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Your Email"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Your Message"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-[#4C765E] text-white py-3 rounded-lg hover:bg-[#4C765E] transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
