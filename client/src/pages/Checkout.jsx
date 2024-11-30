import React, { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { motion } from 'framer-motion';
import state from '../store';
import { CustomButton } from '../components';
import { fadeAnimation } from '../config/motion';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const snap = useSnapshot(state);
  const navigate = useNavigate();
  const [step, setStep] = useState('cart'); // cart -> shipping -> payment
  const [shippingData, setShippingData] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    email: ''
  });

  useEffect(() => {
    if (step === 'payment') {
      // Initialize PayPal script
      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=YOUR_PAYPAL_CLIENT_ID&currency=USD`;
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        window.paypal.Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: '29.99'
                }
              }]
            });
          },
          onApprove: (data, actions) => {
            return actions.order.capture().then((details) => {
              alert('Transaction completed by ' + details.payer.name.given_name);
              // Handle successful payment here
            });
          }
        }).render('#paypal-button-container');
      };

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [step]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitShipping = (e) => {
    e.preventDefault();
    // Validate shipping data
    const isValid = Object.values(shippingData).every(value => value.trim() !== '');
    if (isValid) {
      setStep('payment');
    } else {
      alert('Please fill in all fields');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 'cart':
        return (
          <div className="flex flex-col gap-4">
            <div className="order-summary bg-gray-100 p-4 rounded-lg">
              <h3 className="text-xl mb-4">Order Summary</h3>
              <div className="flex justify-between mb-2">
                <span>Custom T-Shirt</span>
                <span>$29.99</span>
              </div>
              
              <div className="preview-container mt-4">
                <h4 className="text-lg mb-2">Your Design</h4>
                {snap.designPreview && (
                  <img 
                    src={snap.designPreview} 
                    alt="T-shirt design preview" 
                    className="w-full max-w-md mx-auto rounded-lg shadow-md"
                  />
                )}
              </div>

              {snap.uploadedFile && (
                <div className="uploaded-file mt-4 p-4 bg-white rounded-lg">
                  <h4 className="text-lg mb-2">Uploaded Design File</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">File: {snap.uploadedFile.name}</p>
                      <p className="text-sm text-gray-600">
                        Size: {(snap.uploadedFile.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                    <a
                      href={snap.uploadedFile.dataUrl}
                      download={snap.uploadedFile.name}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors"
                    >
                      Download File
                    </a>
                  </div>
                </div>
              )}
            </div>

            <CustomButton 
              type="filled"
              title="Proceed to Shipping"
              handleClick={() => setStep('shipping')}
              customStyles="w-full px-4 py-2.5 font-bold text-sm mt-4"
            />
          </div>
        );

      case 'shipping':
        return (
          <form onSubmit={handleSubmitShipping} className="flex flex-col gap-4">
            <h3 className="text-xl mb-4">Shipping Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={shippingData.fullName}
                onChange={handleInputChange}
                className="border p-2 rounded"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={shippingData.email}
                onChange={handleInputChange}
                className="border p-2 rounded"
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={shippingData.address}
                onChange={handleInputChange}
                className="border p-2 rounded md:col-span-2"
                required
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={shippingData.city}
                onChange={handleInputChange}
                className="border p-2 rounded"
                required
              />
              <input
                type="text"
                name="state"
                placeholder="State/Province"
                value={shippingData.state}
                onChange={handleInputChange}
                className="border p-2 rounded"
                required
              />
              <input
                type="text"
                name="zipCode"
                placeholder="ZIP/Postal Code"
                value={shippingData.zipCode}
                onChange={handleInputChange}
                className="border p-2 rounded"
                required
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={shippingData.country}
                onChange={handleInputChange}
                className="border p-2 rounded"
                required
              />
            </div>

            <div className="flex gap-4 mt-4">
              <CustomButton 
                type="outline"
                title="Back to Cart"
                handleClick={() => setStep('cart')}
                customStyles="w-1/2 px-4 py-2.5 font-bold text-sm"
              />
              <CustomButton 
                type="filled"
                title="Proceed to Payment"
                handleClick={handleSubmitShipping}
                customStyles="w-1/2 px-4 py-2.5 font-bold text-sm"
              />
            </div>
          </form>
        );

      case 'payment':
        return (
          <div className="flex flex-col gap-4">
            <h3 className="text-xl mb-4">Payment</h3>
            
            <div className="order-details bg-gray-100 p-4 rounded-lg mb-4">
              <h4 className="font-bold mb-2">Order Details</h4>
              <p>Shipping to: {shippingData.fullName}</p>
              <p>{shippingData.address}</p>
              <p>{shippingData.city}, {shippingData.state} {shippingData.zipCode}</p>
              <p>{shippingData.country}</p>
              
              {snap.uploadedFile && (
                <div className="mt-4">
                  <p className="font-bold">Design File:</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-sm">{snap.uploadedFile.name}</p>
                    <a
                      href={snap.uploadedFile.dataUrl}
                      download={snap.uploadedFile.name}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors"
                    >
                      Download File
                    </a>
                  </div>
                </div>
              )}
            </div>

            <div id="paypal-button-container"></div>

            <CustomButton 
              type="outline"
              title="Back to Shipping"
              handleClick={() => setStep('shipping')}
              customStyles="w-full px-4 py-2.5 font-bold text-sm mt-4"
            />
          </div>
        );
    }
  };

  return (
    <motion.div
      className="checkout-container"
      {...fadeAnimation}
    >
      <div className="flex flex-col gap-4 p-8 max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Checkout</h2>
          <div className="flex items-center gap-2">
            <div className={`h-3 w-3 rounded-full ${step === 'cart' ? 'bg-blue-500' : 'bg-gray-300'}`} />
            <div className={`h-3 w-3 rounded-full ${step === 'shipping' ? 'bg-blue-500' : 'bg-gray-300'}`} />
            <div className={`h-3 w-3 rounded-full ${step === 'payment' ? 'bg-blue-500' : 'bg-gray-300'}`} />
          </div>
        </div>

        {renderStep()}

        {step !== 'cart' && (
          <CustomButton 
            type="filled"
            title="Back to Customizer"
            handleClick={() => navigate('/customizer')}
            customStyles="w-fit px-4 py-2.5 font-bold text-sm mt-4"
          />
        )}
      </div>
    </motion.div>
  );
};

export default Checkout;
