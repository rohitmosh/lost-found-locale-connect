import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Camera, 
  MapPin, 
  Check, 
  ArrowLeft, 
  ArrowRight,
  Calendar,
  Mail,
  Phone,
  Bell,
  Upload,
  Map,
  User,
  Eye,
  EyeOff,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import MapSelector from '@/components/map/MapSelector';
import StaticMapImage from '@/components/map/StaticMapImage';

const itemCategories = [
  { value: 'electronics', label: 'Electronics' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'jewelry', label: 'Jewelry' },
  { value: 'documents', label: 'Documents' },
  { value: 'keys', label: 'Keys' },
  { value: 'pets', label: 'Pets' },
  { value: 'other', label: 'Other' },
];

const LostItemForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(1);
  const dateInputRef = useRef(null);
  const timeInputRef = useRef(null);

  // Check if we're in edit mode
  const editMode = location.state?.editMode || false;
  const existingReport = location.state?.report || null;
  const [formData, setFormData] = useState(() => {
    if (editMode && existingReport) {
      // Pre-fill form with existing report data
      const reportDate = existingReport.date ? new Date(existingReport.date) : new Date();
      return {
        title: existingReport.title || '',
        description: existingReport.description || '',
        category: existingReport.categoryId || '',
        lostDate: reportDate.toISOString().split('T')[0],
        lostTime: reportDate.toTimeString().split(' ')[0].slice(0, 5),
        notSureWhen: false,
        photo: null,
        contactEmail: existingReport.contactEmail || 'user@example.com',
        contactPhone: existingReport.contactPhone || '',
        allowNotifications: true,
        hideContactInfo: false,
        location: existingReport.location || 'Current Location',
        locationCoords: existingReport.latitude && existingReport.longitude ?
          { lat: existingReport.latitude, lng: existingReport.longitude } : null,
        confirmAccuracy: false,
      };
    }

    // Default form data for new reports
    return {
      title: '',
      description: '',
      category: '',
      lostDate: '',
      lostTime: '',
      notSureWhen: false,
      photo: null,
      contactEmail: 'user@example.com',
      contactPhone: '',
      allowNotifications: true,
      hideContactInfo: false,
      location: 'Current Location',
      locationCoords: null,
      confirmAccuracy: false,
    };
  });
  
  // Form progress percentage
  const progressPercentage = (step / 3) * 100;
  
  // Generate a random report ID
  const reportId = `LF-2024-${Math.floor(100000 + Math.random() * 900000)}`;
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };
  
  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFormData({
        ...formData,
        photo: e.target.files[0],
      });
    }
  };
  
  const handleNext = () => {
    window.scrollTo(0, 0);
    setStep(step + 1);
  };
  
  const handleBack = () => {
    window.scrollTo(0, 0);
    setStep(step - 1);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would submit the form data to the server here
    handleNext();
  };
  
  const handleDateIconClick = () => {
    if (dateInputRef.current) {
      try {
        dateInputRef.current.showPicker();
      } catch (e) {
        // Fallback for browsers that don't support showPicker API
        dateInputRef.current.focus();
        // Add a small visual indication that the field is active
        dateInputRef.current.click();
      }
    }
  };
  
  const handleTimeIconClick = () => {
    if (timeInputRef.current) {
      try {
        timeInputRef.current.showPicker();
      } catch (e) {
        // Fallback for browsers that don't support showPicker API
        timeInputRef.current.focus();
        // Add a small visual indication that the field is active
        timeInputRef.current.click();
      }
    }
  };
  
  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -100 },
  };
  
  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.3,
  };
  
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {step === 1 ? 'Item Details' : step === 2 ? 'Review' : 'Success'}
          </span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Step {step} of 3
          </span>
        </div>
        <div className="w-full bg-purple-100 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-purple-600 to-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
      
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <div className="bg-purple-100/80 dark:bg-gray-800/80 backdrop-blur-sm border border-purple-300 dark:border-purple-900/50 rounded-2xl p-6 shadow-lg mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {editMode ? 'Edit Lost Item Report' : 'Report Lost Item'}
              </h2>
              
              <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
                <div className="space-y-6">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Item Title *
                    </label>
                    <Input
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="E.g., Blue Backpack with Laptop"
                      required
                      className="border-purple-200 dark:border-purple-900/50 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                  
                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description *
                    </label>
                    <Textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Provide details about your item (color, brand, size, identifying features, etc.)"
                      required
                      className="border-purple-200 dark:border-purple-900/50 focus:border-purple-500 focus:ring-purple-500 min-h-[100px]"
                    />
                  </div>
                  
                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Category *
                    </label>
                    <Select 
                      onValueChange={(value) => handleSelectChange('category', value)}
                      value={formData.category}
                      required
                    >
                      <SelectTrigger className="border-purple-200 dark:border-purple-900/50 focus:border-purple-500 focus:ring-purple-500">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {itemCategories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* When Lost */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      When did you lose it?
                    </label>
                    
                    <div className="flex items-center mb-2">
                      <Checkbox
                        id="notSureWhen"
                        name="notSureWhen"
                        checked={formData.notSureWhen}
                        onCheckedChange={(checked) => {
                          setFormData({
                            ...formData,
                            notSureWhen: checked,
                            lostDate: checked ? '' : formData.lostDate,
                            lostTime: checked ? '' : formData.lostTime,
                          });
                        }}
                        className="border-purple-200 data-[state=checked]:bg-purple-600"
                      />
                      <label
                        htmlFor="notSureWhen"
                        className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        I'm not sure when I lost it
                      </label>
                    </div>
                    
                    {!formData.notSureWhen && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <div className="relative group">
                              <Calendar 
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 cursor-pointer z-10 group-hover:text-purple-500 transition-colors duration-200" 
                                onClick={handleDateIconClick}
                              />
                              <Input
                                type="date"
                                name="lostDate"
                                value={formData.lostDate}
                                onChange={handleInputChange}
                                ref={dateInputRef}
                                className="pl-10 border-purple-200 dark:border-purple-900/50 focus:border-purple-500 focus:ring-purple-500 cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                                onClick={handleDateIconClick}
                              />
                              <div className="absolute inset-0 pointer-events-none border border-transparent group-hover:border-purple-400 group-hover:shadow-sm rounded-md transition-all duration-200"></div>
                            </div>
                          </div>
                          <div>
                            <div className="relative group">
                              <Clock 
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 cursor-pointer z-10 group-hover:text-purple-500 transition-colors duration-200" 
                                onClick={handleTimeIconClick}
                              />
                              <Input
                                type="time"
                                name="lostTime"
                                value={formData.lostTime}
                                onChange={handleInputChange}
                                ref={timeInputRef}
                                className="pl-10 border-purple-200 dark:border-purple-900/50 focus:border-purple-500 focus:ring-purple-500 cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                                onClick={handleTimeIconClick}
                              />
                              <div className="absolute inset-0 pointer-events-none border border-transparent group-hover:border-purple-400 group-hover:shadow-sm rounded-md transition-all duration-200"></div>
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Click on the date/time fields or icons to open the pickers
                        </p>
                      </>
                    )}
                  </div>
                  
                  {/* Photo Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Add Photo (Optional)
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-purple-200 dark:border-purple-900/50 border-dashed rounded-lg hover:border-purple-400 transition-colors duration-200">
                      <div className="space-y-2 text-center">
                        <div className="mx-auto h-12 w-12 text-gray-400 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center">
                          <Camera className="h-6 w-6 text-purple-500" />
                        </div>
                        <div className="flex text-sm text-gray-600 dark:text-gray-400">
                          <label htmlFor="photo-upload" className="relative cursor-pointer rounded-md bg-white dark:bg-transparent font-medium text-purple-600 dark:text-purple-400 hover:text-purple-500 focus-within:outline-none">
                            <span>Upload a file</span>
                            <input
                              id="photo-upload"
                              name="photo"
                              type="file"
                              accept="image/*"
                              className="sr-only"
                              onChange={handleFileChange}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          PNG, JPG, GIF up to 10MB
                        </p>
                        {formData.photo && (
                          <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                            {formData.photo.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Contact Information */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      How can people reach you?
                    </label>
                    <div className="space-y-4">
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          type="email"
                          name="contactEmail"
                          value={formData.contactEmail}
                          onChange={handleInputChange}
                          placeholder="Email"
                          className="pl-10 border-purple-200 dark:border-purple-900/50 focus:border-purple-500 focus:ring-purple-500"
                        />
                      </div>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          type="tel"
                          name="contactPhone"
                          value={formData.contactPhone}
                          onChange={handleInputChange}
                          placeholder="Phone (optional)"
                          className="pl-10 border-purple-200 dark:border-purple-900/50 focus:border-purple-500 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Notification Preferences */}
                  <div>
                    <div className="flex items-center mb-2">
                      <Checkbox
                        id="allowNotifications"
                        name="allowNotifications"
                        checked={formData.allowNotifications}
                        onCheckedChange={(checked) => handleInputChange({ target: { name: 'allowNotifications', type: 'checkbox', checked } })}
                        className="border-purple-200 data-[state=checked]:bg-purple-600"
                      />
                      <label
                        htmlFor="allowNotifications"
                        className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Allow notification alerts
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <Checkbox
                        id="hideContactInfo"
                        name="hideContactInfo"
                        checked={formData.hideContactInfo}
                        onCheckedChange={(checked) => handleInputChange({ target: { name: 'hideContactInfo', type: 'checkbox', checked } })}
                        className="border-purple-200 data-[state=checked]:bg-purple-600"
                      />
                      <label
                        htmlFor="hideContactInfo"
                        className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Hide my contact info until someone claims
                      </label>
                    </div>
                  </div>
                  
                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Where did you lose it? *
                    </label>
                    <MapSelector 
                      onLocationChange={(location) => {
                        setFormData({
                          ...formData,
                          location: `${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}`,
                          locationCoords: location
                        });
                      }}
                    />
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <Button 
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-purple-500/25 w-full md:w-auto"
                  >
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
        
        {step === 2 && (
          <motion.div
            key="step2"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <div className="bg-purple-100/80 dark:bg-gray-800/80 backdrop-blur-sm border border-purple-300 dark:border-purple-900/50 rounded-2xl p-6 shadow-lg mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b border-purple-200 dark:border-purple-900/50 pb-3">
                Review Your Report
              </h2>
              
              <div className="space-y-4">
                {/* Basic Information Section */}
                <div className="bg-white/50 dark:bg-gray-700/30 rounded-lg p-4">
                  <h3 className="font-medium text-purple-700 dark:text-purple-400 mb-3 text-base">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Item Title</h4>
                      <p className="text-gray-900 dark:text-white font-medium">{formData.title}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Category</h4>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {itemCategories.find(c => c.value === formData.category)?.label || formData.category}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</h4>
                    <p className="text-gray-900 dark:text-white">{formData.description}</p>
                  </div>
                </div>
                
                {/* Location & Time Section */}
                <div className="bg-white/50 dark:bg-gray-700/30 rounded-lg p-4">
                  <h3 className="font-medium text-purple-700 dark:text-purple-400 mb-3 text-base">Location & Time</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">When Lost</h4>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {formData.notSureWhen 
                          ? "Not sure" 
                          : formData.lostDate && formData.lostTime 
                            ? `${formData.lostDate} at ${formData.lostTime}`
                            : "Not specified"}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Where Lost</h4>
                      <p className="text-gray-900 dark:text-white font-medium">{formData.location}</p>
                      {formData.locationCoords && (
                        <div className="mt-2">
                          <StaticMapImage location={formData.locationCoords} width={300} height={180} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Contact Information Section */}
                <div className="bg-white/50 dark:bg-gray-700/30 rounded-lg p-4">
                  <h3 className="font-medium text-purple-700 dark:text-purple-400 mb-3 text-base">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Contact Email</h4>
                      <p className="text-gray-900 dark:text-white font-medium">{formData.contactEmail}</p>
                    </div>
                    
                    {formData.contactPhone && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Contact Phone</h4>
                        <p className="text-gray-900 dark:text-white font-medium">{formData.contactPhone}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Privacy</h4>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {formData.hideContactInfo ? "Contact info hidden until claimed" : "Contact info visible"}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Notifications</h4>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {formData.allowNotifications ? "Enabled" : "Disabled"}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Photo Section (if available) */}
                {formData.photo && (
                  <div className="bg-white/50 dark:bg-gray-700/30 rounded-lg p-4">
                    <h3 className="font-medium text-purple-700 dark:text-purple-400 mb-3 text-base">Photo</h3>
                    <div className="w-32 h-32 bg-purple-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <p className="text-sm text-gray-500">{formData.photo.name}</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-6 border-t border-purple-200 dark:border-purple-900/50 pt-4">
                <div className="flex items-center mb-6">
                  <Checkbox
                    id="confirmAccuracy"
                    name="confirmAccuracy"
                    checked={formData.confirmAccuracy}
                    onCheckedChange={(checked) => handleInputChange({ target: { name: 'confirmAccuracy', type: 'checkbox', checked } })}
                    className="border-purple-200 data-[state=checked]:bg-purple-600"
                  />
                  <label
                    htmlFor="confirmAccuracy"
                    className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    I confirm this information is complete and accurate
                  </label>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <Button 
                    type="button" 
                    onClick={handleBack}
                    variant="outline"
                    className="border-purple-200 text-purple-700 hover:bg-purple-50 dark:border-purple-800 dark:text-purple-400 dark:hover:bg-purple-900/20"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  
                  <Button 
                    type="button"
                    onClick={handleSubmit}
                    disabled={!formData.confirmAccuracy}
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                  >
                    Submit Report
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        {step === 3 && (
          <motion.div
            key="step3"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <div className="bg-purple-100/80 dark:bg-gray-800/80 backdrop-blur-sm border border-purple-300 dark:border-purple-900/50 rounded-2xl p-6 shadow-lg mb-6 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full mx-auto flex items-center justify-center mb-6">
                <Check className="h-10 w-10 text-white" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                🎉 Success! Your report has been posted
              </h2>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Report ID: <span className="font-semibold text-purple-700 dark:text-purple-400">{reportId}</span>
              </p>
              
              <div className="bg-white dark:bg-gray-700/50 rounded-xl p-6 mb-8 max-w-md mx-auto">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4 text-center">
                  What's next?
                </h3>
                
                <ul className="space-y-3 mx-auto">
                  <li className="flex items-center justify-center">
                    <div className="flex-shrink-0 h-5 w-5 text-purple-600 mr-2">
                      <Bell className="h-5 w-5" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">We'll notify you of any matches</span>
                  </li>
                  <li className="flex items-center justify-center">
                    <div className="flex-shrink-0 h-5 w-5 text-purple-600 mr-2">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Check the map for updates</span>
                  </li>
                  <li className="flex items-center justify-center">
                    <div className="flex-shrink-0 h-5 w-5 text-purple-600 mr-2">
                      <User className="h-5 w-5" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Share with your community</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  onClick={() => navigate('/map')}
                  variant="outline"
                  className="border-purple-200 text-purple-700 hover:bg-purple-50 dark:border-purple-800 dark:text-purple-400 dark:hover:bg-purple-900/20"
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  View on Map
                </Button>
                
                <Button
                  onClick={() => navigate('/reports')}
                  variant="outline"
                  className="border-purple-200 text-purple-700 hover:bg-purple-50 dark:border-purple-800 dark:text-purple-400 dark:hover:bg-purple-900/20"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  My Reports
                </Button>
                
                <Button
                  onClick={() => navigate('/dashboard')}
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-purple-500/25"
                >
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Home
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LostItemForm; 