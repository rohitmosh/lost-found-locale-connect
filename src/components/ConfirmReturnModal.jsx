import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';

const ConfirmReturnModal = ({ isOpen, onClose, reportId, reportTitle, ownerName }) => {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const [isConfirming, setIsConfirming] = useState(false);
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleConfirmReturn = async () => {
    if (!user || !reportId) {
      toast.error('Unable to process request. Please try again.');
      return;
    }

    setIsConfirming(true);

    try {
      // First, verify the resolution process exists and is in the correct state
      const { data: resolutionStatus } = await supabase.rpc('get_resolution_status', {
        p_report_id: reportId
      });

      if (!resolutionStatus || !resolutionStatus.exists) {
        toast.error('No resolution process found for this report.');
        setIsConfirming(false);
        return;
      }

      if (resolutionStatus.status === 'completed') {
        toast.error('This item has already been confirmed as returned.');
        setIsConfirming(false);
        return;
      }

      if (resolutionStatus.status !== 'pending_finder') {
        toast.error('This resolution is not ready for finder confirmation.');
        setIsConfirming(false);
        return;
      }

      // Call the Supabase function to confirm return by finder
      const { data, error } = await supabase.rpc('confirm_return_by_finder', {
        p_report_id: reportId,
        p_finder_id: user.id,
        p_finder_notes: notes || 'Item successfully returned'
      });

      if (error) {
        console.error('Error confirming return:', error);
        toast.error('Failed to confirm return. Please try again.');
        return;
      }

      if (data && data.success) {
        toast.success('Return confirmed! The item has been marked as resolved.');

        // Dispatch event to refresh UI components
        window.dispatchEvent(new CustomEvent('reportStatusChanged', {
          detail: { reportId, status: 'resolved' }
        }));

        // Mark the notification as read
        if (notification?.id) {
          await supabase
            .from('notifications')
            .update({ read: true })
            .eq('id', notification.id);
        }

        onClose();
      } else {
        toast.error(data?.error || 'Failed to confirm return');
      }
    } catch (error) {
      console.error('Error confirming return:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsConfirming(false);
    }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.95,
      y: 20
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300,
        duration: 0.3
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      y: 20,
      transition: {
        duration: 0.2
      }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.2 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Backdrop */}
        <motion.div
          variants={backdropVariants}
          className={`absolute inset-0 ${isDark ? 'bg-black/70' : 'bg-black/50'} backdrop-blur-sm`}
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          variants={modalVariants}
          className={`
            relative w-full max-w-md mx-auto
            ${isDark ? 'bg-gray-800/95' : 'bg-white/95'}
            backdrop-blur-md rounded-2xl shadow-2xl
            border ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'}
            overflow-hidden
          `}
        >
          {/* Header */}
          <div className="relative p-6 pb-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className={`absolute top-4 right-4 p-2 rounded-full transition-colors
                ${isDark ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}
              `}
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className={`p-4 rounded-full ${isDark ? 'bg-green-500/20' : 'bg-green-100'}`}>
                <CheckCircle className={`w-8 h-8 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
              </div>
            </div>

            {/* Title */}
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3, ease: "easeOut" }}
              className={`text-xl font-bold text-center mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}
            >
              Confirm Item Return
            </motion.h3>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.3, ease: "easeOut" }}
              className={`text-center mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
            >
              Please confirm that you have successfully returned <strong>"{reportTitle}"</strong> to {ownerName || 'the owner'}.
            </motion.p>

            {/* Notes Input */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3, ease: "easeOut" }}
              className="mb-6"
            >
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Additional Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any additional details about the return..."
                rows={3}
                className={`w-full px-3 py-2 rounded-lg border resize-none transition-colors
                  ${isDark 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-500' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-green-500'
                  } focus:outline-none focus:ring-2 focus:ring-green-500/20`}
              />
            </motion.div>

            {/* Warning */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.3, ease: "easeOut" }}
              className={`flex items-start space-x-3 p-3 rounded-lg mb-6 ${isDark ? 'bg-yellow-500/10 border border-yellow-500/20' : 'bg-yellow-50 border border-yellow-200'}`}
            >
              <AlertCircle className={`w-5 h-5 mt-0.5 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`} />
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-yellow-300' : 'text-yellow-800'}`}>
                  Important
                </p>
                <p className={`text-xs ${isDark ? 'text-yellow-400' : 'text-yellow-700'}`}>
                  Only confirm if you have actually returned the item. This action will mark the report as resolved and cannot be undone.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <div className={`px-6 pb-6 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} pt-4`}>
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.01, y: -1 }}
                whileTap={{ scale: 0.99 }}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3, ease: "easeOut" }}
                onClick={onClose}
                disabled={isConfirming}
                className={`py-3 px-4 rounded-xl font-medium transition-all duration-300 ${isDark 
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-300 disabled:opacity-50' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700 disabled:opacity-50'
                }`}
              >
                Cancel
              </motion.button>

              <motion.button
                whileHover={{ 
                  scale: isConfirming ? 1 : 1.01, 
                  y: isConfirming ? 0 : -1
                }}
                whileTap={{ scale: isConfirming ? 1 : 0.99 }}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.3, ease: "easeOut" }}
                onClick={handleConfirmReturn}
                disabled={isConfirming}
                className="relative flex items-center justify-center space-x-2 py-3 px-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl shadow-lg shadow-green-500/20 hover:shadow-green-500/30 transition-all duration-300 overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10 group-hover:from-green-400/20 group-hover:to-emerald-400/20 transition-all duration-300" />
                {isConfirming ? (
                  <Loader2 className="w-4 h-4 relative z-10 animate-spin" />
                ) : (
                  <CheckCircle className="w-4 h-4 relative z-10" />
                )}
                <span className="font-medium relative z-10">
                  {isConfirming ? 'Confirming...' : 'Confirm Return'}
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ConfirmReturnModal;
