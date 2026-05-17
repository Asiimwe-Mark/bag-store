import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send, Phone, Shield, ArrowRight } from 'lucide-react';

const WhatsAppWidget = ({ isOpen, onClose, onToggle, product }) => {
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [showCustomMessage, setShowCustomMessage] = useState(false);
  const [showProductMessage, setShowProductMessage] = useState(false);
  const [customMessage, setCustomMessage] = useState('');
  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    const now = new Date();
    setTimestamp(`${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`);
  }, []);

  useEffect(() => {
    if (product) {
      setShowQuickReplies(false);
      setShowProductMessage(true);
    }
  }, [product]);

  const sendToWhatsApp = (message) => {
    const phone = '256752103529';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleQuickReply = (type) => {
    setShowQuickReplies(false);
    let message = '';
    
    switch(type) {
      case 'browse':
        message = "Hi LORAH! 👋 I'd like to browse your latest handbag collection.";
        break;
      case 'order':
        message = "Hi LORAH! 📦 I'd like to place an order.";
        break;
      case 'inquiry':
        message = "Hi LORAH! ❓ I have a question about your handbags.";
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
      sendToWhatsApp(`Hi LORAH!\n\n${customMessage}`);
      setCustomMessage('');
      setShowCustomMessage(false);
    }
  };

  const orderProduct = () => {
    if (product) {
      sendToWhatsApp(`Hi LORAH! 👜\n\nI'd like to order:\n\n👜 *${product.name}*\n💰 ${product.price}\n\nPlease confirm availability.`);
    }
  };

  const inquireProduct = () => {
    if (product) {
      sendToWhatsApp(`Hi LORAH!\n\nI have a question about:\n\n👜 *${product.name}*\n💰 ${product.price}`);
    }
  };

  return (
    <>
      {/* Widget Container */}
      <div className={`fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end gap-2 sm:gap-3`}>
        {/* Chat Window */}
        <div className={`wa-widget ${isOpen ? 'open' : ''} w-[300px] sm:w-[350px] md:w-[380px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100`}>
          {/* Header */}
          <div className="wa-header-gradient p-4 sm:p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="font-serif text-white font-bold text-lg sm:text-xl">L</span>
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-green-400 border-2 border-white rounded-full wa-status-online"></span>
                </div>
                <div>
                  <h4 className="text-white font-semibold text-base sm:text-lg">LORAH Bags</h4>
                  <p className="text-green-100 text-xs">Typically replies within minutes</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="w-7 h-7 sm:w-8 sm:h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Chat Body */}
          <div className="p-3 sm:p-4 bg-[#E5DDD5] min-h-[180px] sm:min-h-[200px] max-h-[280px] sm:max-h-[300px] overflow-y-auto">
            {/* Welcome Message */}
            <div className="wa-chat-bubble max-w-[85%] bg-white rounded-lg rounded-tl-none p-2.5 sm:p-3 shadow-sm mb-2 sm:mb-3">
              <p className="text-sm text-matte-800">👋 Hello! Welcome to <strong>LORAH</strong></p>
              <p className="text-sm text-matte-800 mt-1">How can we help you today?</p>
              <p className="text-[10px] text-matte-400 mt-2 text-right">{timestamp}</p>
            </div>

            {/* Quick Replies */}
            {showQuickReplies && (
              <div className="wa-chat-bubble max-w-[85%] bg-white rounded-lg rounded-tl-none p-2.5 sm:p-3 shadow-sm">
                <p className="text-xs font-semibold text-matte-800 mb-2">Choose an option:</p>
                <div className="space-y-1.5 sm:space-y-2">
                  <button 
                    onClick={() => handleQuickReply('browse')}
                    className="w-full text-left px-2.5 sm:px-3 py-2 rounded-lg border border-green-200 bg-green-50 text-green-700 text-sm hover:bg-green-100 transition-colors flex items-center justify-between group"
                  >
                    <span>👜 Browse Collection</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                  <button 
                    onClick={() => handleQuickReply('order')}
                    className="w-full text-left px-2.5 sm:px-3 py-2 rounded-lg border border-green-200 bg-green-50 text-green-700 text-sm hover:bg-green-100 transition-colors flex items-center justify-between group"
                  >
                    <span>📦 Place an order</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                  <button 
                    onClick={() => handleQuickReply('inquiry')}
                    className="w-full text-left px-2.5 sm:px-3 py-2 rounded-lg border border-green-200 bg-green-50 text-green-700 text-sm hover:bg-green-100 transition-colors flex items-center justify-between group"
                  >
                    <span>❓ General Inquiry</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                  <button 
                    onClick={() => handleQuickReply('custom')}
                    className="w-full text-left px-2.5 sm:px-3 py-2 rounded-lg border border-green-200 bg-green-50 text-green-700 text-sm hover:bg-green-100 transition-colors flex items-center justify-between group"
                  >
                    <span>✍️ Custom message</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </div>
              </div>
            )}

            {/* Custom Message Input */}
            {showCustomMessage && (
              <div className="wa-chat-bubble max-w-[85%] bg-white rounded-lg rounded-tl-none p-2.5 sm:p-3 shadow-sm">
                <p className="text-sm text-matte-800 mb-2">Type your message:</p>
                <textarea 
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  rows="3"
                  className="w-full border border-gray-200 rounded-lg p-2 text-sm resize-none focus:outline-none focus:border-green-400"
                  placeholder="e.g., I'm looking for a black tote bag..."
                />
                <button 
                  onClick={sendCustomMessage}
                  className="mt-2 w-full bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Send via WhatsApp
                </button>
              </div>
            )}

            {/* Product Message */}
            {showProductMessage && product && (
              <div className="wa-chat-bubble max-w-[85%] bg-white rounded-lg rounded-tl-none p-2.5 sm:p-3 shadow-sm">
                <div className="flex items-center gap-3 mb-2 sm:mb-3">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover bg-beige-50"
                  />
                  <div>
                    <p className="font-semibold text-sm text-matte-900">{product.name}</p>
                    <p className="text-green-600 font-bold text-sm">{product.price}</p>
                  </div>
                </div>
                <p className="text-sm text-matte-800 mb-2">Interested in this bag?</p>
                <div className="flex gap-2">
                  <button 
                    onClick={orderProduct}
                    className="flex-1 bg-green-500 text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-1"
                  >
                    <MessageCircle className="w-4 h-4" /> Order
                  </button>
                  <button 
                    onClick={inquireProduct}
                    className="flex-1 border border-green-500 text-green-600 px-3 py-2 rounded-lg text-sm font-semibold hover:bg-green-50 transition-colors"
                  >
                    Ask
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-white border-t border-gray-100 p-2.5 sm:p-3 flex items-center justify-center gap-3 sm:gap-4">
            <span className="text-[10px] text-gray-400 flex items-center gap-1">
              <Shield className="w-3 h-3" /> Encrypted
            </span>
            <a 
              href="tel:+256752103529"
              className="text-[10px] text-gray-400 flex items-center gap-1 hover:text-green-600 transition-colors"
            >
              <Phone className="w-3 h-3" /> 0752 103 529
            </a>
          </div>
        </div>

        {/* Toggle Button */}
        <button 
          onClick={onToggle}
          className="relative w-14 h-14 sm:w-16 sm:h-16 bg-green-500 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/30 hover:scale-110 transition-transform wa-pulse"
        >
          {isOpen ? (
            <X className="w-7 h-7 sm:w-8 sm:h-8 text-white relative z-10" />
          ) : (
            <>
              <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 text-white relative z-10" />
              <span className="notif-badge absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 rounded-full text-white text-[9px] sm:text-[10px] font-bold flex items-center justify-center">
                1
              </span>
            </>
          )}
        </button>
      </div>
    </>
  );
};

export default WhatsAppWidget;