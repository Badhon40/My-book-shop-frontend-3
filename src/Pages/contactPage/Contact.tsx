/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { toast } from 'sonner';
import { Mail, Phone, MapPin } from 'lucide-react';
import emailjs from 'emailjs-com';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e : any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e : any) => {
    e.preventDefault();

    emailjs
      .send(
        'service_id', // Replace with your EmailJS service ID
        'template_id', // Replace with your EmailJS template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        'user_id' // Replace with your EmailJS user ID
      )
      .then(
        () => {
          toast.success('Message sent successfully!');
          setFormData({ name: '', email: '', message: '' });
        },
        (error) => {
          toast.error('Failed to send message. Please try again.');
          console.error('Failed to send message:', error);
        }
      );
  };

  return (
    <div className='flex flex-col items-center justify-center my-16'>
      <div className='max-w-4xl w-full mx-auto p-8 bg-white shadow-xl rounded-2xl flex flex-col md:flex-row gap-8'>
        <div className='md:w-2/3'>
          <h1 className='text-3xl font-bold text-center mb-6 text-[#4C765E]'>Contact Us</h1>
          <form className='space-y-4' onSubmit={handleSubmit}>
            <div>
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
                required
                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C765E]'
                placeholder='Your Name'
              />
            </div>
            <div>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                required
                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C765E]'
                placeholder='Your Email'
              />
            </div>
            <div>
              <textarea
                name='message'
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C765E]'
                placeholder='Your Message'
              />
            </div>
            <div className='text-center'>
              <button
                type='submit'
                className='w-full bg-[#4C765E] text-white py-3 rounded-lg hover:bg-[#3b5f4e] transition-colors'
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        <div className='md:w-1/3 flex flex-col space-y-6 text-gray-700'>
          <div className='flex items-center gap-3'>
            <Mail className='text-[#4C765E]' />
            <div>
              <p className='font-semibold'>Email:</p>
              <p>support@example.com</p>
            </div>
          </div>
          <div className='flex items-center gap-3'>
            <Phone className='text-[#4C765E]' />
            <div>
              <p className='font-semibold'>Phone:</p>
              <p>+1 (234) 567-890</p>
            </div>
          </div>
          <div className='flex items-center gap-3'>
            <MapPin className='text-[#4C765E]' />
            <div>
              <p className='font-semibold'>Location:</p>
              <p>123 Main St, City, Country</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
