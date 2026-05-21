import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send, Phone, Shield, ArrowRight } from 'lucide-react';
import { formatPrice } from '../data/products';

const WhatsAppWidget = ({ isOpen, onClose, onToggle, product }) => {
  const [showQuickReplies, setShowQuickReplies] = useState(false);
  const [showCustomMessage, setShowCustomMessage] = useState(false);
  const [showProductMessage, setShowProductMessage] = useState(false);
  const [customMessage, setCustomMessage] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [userName, setUserName] = useState('');
  const [showNameInput, setShowNameInput] = useState(true);

  useEffect(() => {
    const now = new Date();
    setTimestamp(`${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`);
  }, []);

  useEffect(() => {
    if (product) {
      setShowNameInput(false);
      setShowQuickReplies(false);
      setShowProductMessage(true);
    }
  }, [product]);

  const handleNameSubmit = (skip) => {
    setShowNameInput(false);
    setShowQuickReplies(true);
  };

  const sendToWhatsApp = (message) => {
    const phone = '256752103529';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleQuickReply = (type) => {
    setShowQuickReplies(false);
    const namePrefix = userName ? `My name is ${userName}. ` : '';
    let message = '';

    switch(type) {
      case 'browse':
        message = `Hi LORAH! \ud83d\udc4b ${namePrefix}I'd like to browse your latest handbag collection.`;
        break;
      case 'order':
        message = `Hi LORAH! \ud83d\udce6 ${namePrefix}I'd like to place an order.`;
        break;
      case 'inquiry':
        message = `Hi LORAH! \u2753 ${namePrefix}I have a question about your handbags.`;
        break;
      case 'custom':
        setShowCustomMessage(true);
        return;
      default:
        break;
    }

    if (message) sendToWhatsApp(message);
  };

  const sendCustomMessage = () => {
    if (customMessage.trim()) {
      const namePrefix = userName ? `My name is ${userName}.\n\n` : '';
      sendToWhatsApp(`Hi LORAH!\n\n${namePrefix}${customMessage}`);
      setCustomMessage('');
      setShowCustomMessage(false);
    }
  };

  const sendProductMessage = (type) => {
    if (!product) return;
    const namePrefix = userName ? `My name is ${userName}. ` : '';
    const priceStr = formatPrice(product.price);

    // Get product image URL for WhatsApp preview
    const imgSrc = Array.isArray(product.images) ? product.images[0] : product.image;
    let imageUrl = '';
    if (imgSrc) {
      if (imgSrc.startsWith('http')) {
        imageUrl = imgSrc;
      } else {
        imageUrl = `${window.location.origin}/${imgSrc.replace(/^\//, '')}`;
      }
    }

    const imageLine = imageUrl ? `\n${imageUrl}` : '';
    const msg = type === 'order'
      ? `Hi LORAH! \ud83d\udce6 ${namePrefix}I'd like to order:\n\n\ud83d\udccc *${product.name}*\n\ud83d\udcb0 Price: ${priceStr}${imageLine}\n\nPlease confirm availability and delivery details.`
      : `Hi LORAH! \u2753 ${namePrefix}I have a question about:\n\n\ud83d\udccc *${product.name}*\n\ud83d\udcb0 Price: ${priceStr}${imageLine}\n\nCould you provide more details?`;
    sendToWhatsApp(msg);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={onToggle}
        className={`wa-float-btn fixed bottom-6 right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-green-500 text-white flex items-center justify-center shadow-xl hover:bg-green-600 hover:shadow-2xl hover:scale-110 transition-all ${
          isOpen ? 'scale-0 opacity-0' : 'wa-bounce-in'
        }`}
        aria-label="Open WhatsApp chat"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full wa-notif-bounce"></span>
      </button>

      {/* Chat Window */}
      <div className={`wa-widget fixed bottom-6 right-6 z-50 w-[320px] sm:w-[360px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="bg-green-600 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-green-600 wa-status-online"></div>
            </div>
            <div>
              <p className="font-semibold text-sm">LORAH Support</p>
              <p className="text-xs text-green-200">Usually replies instantly</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-green-500 flex items-center justify-center transition-colors" aria-label="Close chat">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Chat Body */}
        <div className="h-[280px] sm:h-[320px] overflow-y-auto p-4 bg-[#E5DDD5]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}>
          {/* Welcome Message */}
          <div className="wa-bubble-in flex justify-start mb-3">
            <div className="bg-white rounded-2xl rounded-tl-sm p-3 max-w-[85%] shadow-sm">
              <p className="text-sm text-gray-800">{userName ? `Hi ${userName}! \ud83d\udc4b` : 'Hi there! \ud83d\udc4b'} Welcome to LORAH Exquisite Trends. How can I help you today?</p>
              <p className="text-[10px] text-gray-400 mt-1 text-right">{timestamp}</p>
            </div>
          </div>

          {/* Name Input */}
          {showNameInput && (
            <div className="wa-bubble-in bg-white rounded-2xl p-3 shadow-sm mb-3">
              <p className="text-xs text-gray-500 mb-2">What's your name? (optional)</p>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name..."
                className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:border-green-500 mb-2"
                onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit(false)}
              />
              <div className="flex gap-2">
                <button
                  onClick={() => handleNameSubmit(false)}
                  className="flex-1 bg-green-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
                >
                  Continue
                </button>
                <button
                  onClick={() => { setUserName(''); handleNameSubmit(true); }}
                  className="px-3 py-2 text-gray-500 text-sm hover:text-gray-700 transition-colors"
                >
                  Skip
                </button>
              </div>
            </div>
          )}

          {/* Quick Replies */}
          {showQuickReplies && (
            <div className="space-y-2 mb-3 wa-bubble-in">
              {[
                { type: 'browse', label: '\ud83d\udd0d Browse Collection', desc: 'See our latest bags' },
                { type: 'order', label: '\ud83d\udce6 Place an Order', desc: 'Order your favorite bag' },
                { type: 'inquiry', label: '\u2753 Ask a Question', desc: 'Get instant answers' },
                { type: 'custom', label: '\u270d\ufe0f Type a Message', desc: 'Write your own' },
              ].map((reply) => (
                <button
                  key={reply.type}
                  onClick={() => handleQuickReply(reply.type)}
                  className="wa-option w-full text-left bg-white rounded-xl p-2.5 shadow-sm hover:shadow-md hover:bg-green-50 transition-all group"
                >
                  <span className="text-sm font-medium text-green-700">{reply.label}</span>
                  <span className="block text-xs text-gray-500">{reply.desc}</span>
                </button>
              ))}
            </div>
          )}

          {/* Product Message */}
          {showProductMessage && product && (
            <div className="space-y-2 mb-3 wa-bubble-in">
              <div className="bg-white rounded-2xl p-3 shadow-sm">
                <p className="text-xs text-gray-500 mb-2">Product Selected:</p>
                <div className="flex gap-3">
                  <img src={Array.isArray(product.images) ? product.images[0] : product.image} alt={product.name} className="w-16 h-16 rounded-lg object-cover" />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{product.name}</p>
                    <p className="text-xs text-green-600 font-bold mt-1">{formatPrice(product.price)}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => sendProductMessage('order')}
                className="wa-option w-full text-left bg-green-500 text-white rounded-xl p-2.5 shadow-sm hover:bg-green-600 transition-all"
              >
                <span className="text-sm font-medium">\ud83d\udce6 Order This Bag</span>
              </button>
              <button
                onClick={() => sendProductMessage('inquiry')}
                className="wa-option w-full text-left bg-white rounded-xl p-2.5 shadow-sm hover:shadow-md hover:bg-green-50 transition-all"
              >
                <span className="text-sm font-medium text-green-700">\u2753 Ask About This Bag</span>
              </button>
            </div>
          )}

          {/* Custom Message Input */}
          {showCustomMessage && (
            <div className="wa-bubble-in bg-white rounded-2xl p-3 shadow-sm">
              <p className="text-xs text-gray-500 mb-2">Type your message:</p>
              <textarea
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Hi LORAH! I'd like to know about..."
                className="w-full h-20 resize-none border border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:border-green-500"
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={sendCustomMessage}
                  disabled={!customMessage.trim()}
                  className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" /> Send
                </button>
                <button
                  onClick={() => { setShowCustomMessage(false); setShowQuickReplies(true); }}
                  className="px-3 py-2 text-gray-500 text-sm hover:text-gray-700 transition-colors"
                >
                  Back
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-4 py-2.5 flex items-center justify-between border-t border-gray-100">
          <div className="flex items-center gap-1.5">
            <Shield className="w-3 h-3 text-green-600" />
            <span className="text-[10px] text-gray-500">End-to-end encrypted</span>
          </div>
          <a href="tel:0752103529" className="flex items-center gap-1 text-[10px] text-gray-500 hover:text-green-600 transition-colors">
            <Phone className="w-3 h-3" /> Call instead
          </a>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={onClose}></div>
      )}
    </>
  );
};

export default WhatsAppWidget;
