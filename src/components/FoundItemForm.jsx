import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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
  User,
  Eye,
  Clock,
  Info,
  HelpCircle,
  Shield,
  Building,
  Home,
  Lightbulb,
  HandHeart,
  Backpack,
  AlertCircle
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import MapSelector from '@/components/map/MapSelector';

const itemCategories = [
  { value: 'electronics', label: 'Electronics' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'jewelry', label: 'Jewelry' },
  { value: 'documents', label: 'Documents' },
  { value: 'keys', label: 'Keys' },
  { value: 'pets', label: 'Pets' },
  { value: 'other', label: 'Other' },
];

const FoundItemForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const dateInputRef = useRef(null);
  const timeInputRef = useRef(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    foundDate: '',
    foundTime: '',
    notSureWhen: false,
    photo: null,
    contactEmail: 'user@example.com', // Pre-filled from user profile in a real app
    contactPhone: '',
    allowNotifications: true,
    hideContactInfo: false,
    location: 'Current Location', // Text representation of coordinates
    locationCoords: null, // Actual coordinates object {lat, lng}
    itemLocation: 'have-with-me', // Where is the item now?
    customItemLocation: '',
    returnMethod: 'meet-in-person',
    verificationQuestions: {
      colorBrand: true,
      uniqueMarks: true,
      lostLocation: true,
      customQuestion: ''
    },
    confirmMeetSafely: false,
    confirmAccuracy: false,
  });
  
  // Form progress percentage
  const progressPercentage = (step / 6) * 100;
  
  // Generate a random report ID
  const reportId = `FI-2024-${Math.floor(100000 + Math.random() * 900000)}`;
  
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
  
  const handleVerificationChange = (key, value) => {
    setFormData({
      ...formData,
      verificationQuestions: {
        ...formData.verificationQuestions,
        [key]: value
      }
    });
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
            {step === 1 ? 'Item Details' : 
             step === 2 ? 'Item Location' : 
             step === 3 ? 'Return Method' : 
             step === 4 ? 'Verification' : 
             step === 5 ? 'Review' : 'Success'}
          </span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Step {step} of 6
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
                Report Found Item
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
                      placeholder="Provide details about the item (color, brand, size, identifying features, etc.)"
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
                  
                  {/* When Found */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      When did you find it?
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
                            foundDate: checked ? '' : formData.foundDate,
                            foundTime: checked ? '' : formData.foundTime,
                          });
                        }}
                        className="border-purple-200 data-[state=checked]:bg-purple-600"
                      />
                      <label
                        htmlFor="notSureWhen"
                        className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        I'm not sure when I found it
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
                                name="foundDate"
                                value={formData.foundDate}
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
                                name="foundTime"
                                value={formData.foundTime}
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
                      Where did you find it? *
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
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Item Location
              </h2>

              <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                      Where is the item now? *
                    </label>
                    
                    <RadioGroup 
                      value={formData.itemLocation} 
                      onValueChange={(value) => handleSelectChange('itemLocation', value)}
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 p-3 rounded-lg border border-purple-200 dark:border-purple-900/50 transition-all duration-200 hover:border-purple-400 dark:hover:border-purple-700">
                        <RadioGroupItem value="have-with-me" id="have-with-me" className="border-purple-200 text-purple-600" />
                        <Label htmlFor="have-with-me" className="font-medium text-gray-700 dark:text-gray-300 cursor-pointer w-full">I have it with me</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 p-3 rounded-lg border border-purple-200 dark:border-purple-900/50 transition-all duration-200 hover:border-purple-400 dark:hover:border-purple-700">
                        <RadioGroupItem value="left-where-found" id="left-where-found" className="border-purple-200 text-purple-600" />
                        <Label htmlFor="left-where-found" className="font-medium text-gray-700 dark:text-gray-300 cursor-pointer w-full">Left where I found it</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 p-3 rounded-lg border border-purple-200 dark:border-purple-900/50 transition-all duration-200 hover:border-purple-400 dark:hover:border-purple-700">
                        <RadioGroupItem value="security-authority" id="security-authority" className="border-purple-200 text-purple-600" />
                        <Label htmlFor="security-authority" className="font-medium text-gray-700 dark:text-gray-300 cursor-pointer w-full">Gave to security/authority</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 p-3 rounded-lg border border-purple-200 dark:border-purple-900/50 transition-all duration-200 hover:border-purple-400 dark:hover:border-purple-700">
                        <RadioGroupItem value="other" id="other-location" className="border-purple-200 text-purple-600" />
                        <Label htmlFor="other-location" className="font-medium text-gray-700 dark:text-gray-300 cursor-pointer w-full">Other</Label>
                      </div>
                    </RadioGroup>
                    
                    {formData.itemLocation === 'other' && (
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Please specify where *
                        </label>
                        <Input
                          name="customItemLocation"
                          value={formData.customItemLocation}
                          onChange={handleInputChange}
                          placeholder="E.g., Left with building management"
                          required
                          className="border-purple-200 dark:border-purple-900/50 focus:border-purple-500 focus:ring-purple-500"
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 flex items-start">
                    <div className="flex-shrink-0 mt-0.5">
                      <Info className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        This helps potential owners know if they can still find the item where they lost it, or if they need to contact you.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
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
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-purple-500/25 w-full sm:w-auto"
                  >
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
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
            <div className="bg-purple-100/80 dark:bg-gray-800/80 backdrop-blur-sm border border-purple-300 dark:border-purple-900/50 rounded-2xl p-6 shadow-lg mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Preferred Return Method
              </h2>

              <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                      How would you prefer to return the item? *
                    </label>
                    
                    <RadioGroup 
                      value={formData.returnMethod} 
                      onValueChange={(value) => handleSelectChange('returnMethod', value)}
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 p-4 rounded-lg border border-purple-200 dark:border-purple-900/50 transition-all duration-200 hover:border-purple-400 dark:hover:border-purple-700">
                        <RadioGroupItem value="meet-in-person" id="meet-in-person" className="border-purple-200 text-purple-600" />
                        <div className="w-full">
                          <Label htmlFor="meet-in-person" className="font-medium text-gray-700 dark:text-gray-300 cursor-pointer w-full flex items-center">
                            <Shield className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0" />
                            Meet in person (public place)
                          </Label>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-7">
                            Meet at a safe, well-lit public location
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 p-4 rounded-lg border border-purple-200 dark:border-purple-900/50 transition-all duration-200 hover:border-purple-400 dark:hover:border-purple-700">
                        <RadioGroupItem value="drop-off" id="drop-off" className="border-purple-200 text-purple-600" />
                        <div className="w-full">
                          <Label htmlFor="drop-off" className="font-medium text-gray-700 dark:text-gray-300 cursor-pointer w-full flex items-center">
                            <Building className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0" />
                            Drop off at their location
                          </Label>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-7">
                            You'll deliver the item to the owner
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 p-4 rounded-lg border border-purple-200 dark:border-purple-900/50 transition-all duration-200 hover:border-purple-400 dark:hover:border-purple-700">
                        <RadioGroupItem value="pick-up" id="pick-up" className="border-purple-200 text-purple-600" />
                        <div className="w-full">
                          <Label htmlFor="pick-up" className="font-medium text-gray-700 dark:text-gray-300 cursor-pointer w-full flex items-center">
                            <Home className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0" />
                            They can pick up from me
                          </Label>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-7">
                            The owner will come to collect the item
                          </p>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="mt-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 flex items-start">
                    <div className="flex-shrink-0 mt-0.5">
                      <Info className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Your safety is important. We recommend meeting in public places during daylight hours. You can always change your preference later.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
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
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-purple-500/25 w-full sm:w-auto"
                  >
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <div className="bg-purple-100/80 dark:bg-gray-800/80 backdrop-blur-sm border border-purple-300 dark:border-purple-900/50 rounded-2xl p-6 shadow-lg mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Help Verify Ownership
              </h2>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                To help confirm the real owner, what details should they provide?
              </p>

              <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
                <div className="space-y-6">
                  <div className="bg-white dark:bg-gray-800 rounded-lg border border-purple-200 dark:border-purple-900/50 p-5">
                    <div className="flex items-center mb-5">
                      <Lightbulb className="h-6 w-6 text-amber-500 mr-2 flex-shrink-0" />
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        These questions will help you identify the real owner when they contact you
                      </p>
                    </div>
                  
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Checkbox
                          id="colorBrand"
                          checked={formData.verificationQuestions.colorBrand}
                          onCheckedChange={(checked) => handleVerificationChange('colorBrand', checked)}
                          className="border-purple-200 data-[state=checked]:bg-purple-600"
                        />
                        <label
                          htmlFor="colorBrand"
                          className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Ask them to describe: Specific color/brand details
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <Checkbox
                          id="uniqueMarks"
                          checked={formData.verificationQuestions.uniqueMarks}
                          onCheckedChange={(checked) => handleVerificationChange('uniqueMarks', checked)}
                          className="border-purple-200 data-[state=checked]:bg-purple-600"
                        />
                        <label
                          htmlFor="uniqueMarks"
                          className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Unique marks or damage
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <Checkbox
                          id="lostLocation"
                          checked={formData.verificationQuestions.lostLocation}
                          onCheckedChange={(checked) => handleVerificationChange('lostLocation', checked)}
                          className="border-purple-200 data-[state=checked]:bg-purple-600"
                        />
                        <label
                          htmlFor="lostLocation"
                          className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Where/when they think they lost it
                        </label>
                      </div>
                      
                      <div className="pt-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Custom Question (Optional)
                        </label>
                        <Input
                          name="customQuestion"
                          value={formData.verificationQuestions.customQuestion}
                          onChange={(e) => handleVerificationChange('customQuestion', e.target.value)}
                          placeholder="E.g., What's inside the wallet?"
                          className="border-purple-200 dark:border-purple-900/50 focus:border-purple-500 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 flex items-start">
                    <div className="flex-shrink-0 mt-0.5">
                      <HelpCircle className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Ask specific questions that only the true owner would know. Avoid questions with answers visible in photos.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
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
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-purple-500/25 w-full sm:w-auto"
                  >
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        )}

        {step === 5 && (
          <motion.div
            key="step5"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <div className="bg-purple-100/80 dark:bg-gray-800/80 backdrop-blur-sm border border-purple-300 dark:border-purple-900/50 rounded-2xl p-6 shadow-lg mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Review Your Report
              </h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Item Title</h3>
                    <p className="text-gray-900 dark:text-white">{formData.title}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Category</h3>
                    <p className="text-gray-900 dark:text-white">
                      {itemCategories.find(c => c.value === formData.category)?.label || formData.category}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Description</h3>
                  <p className="text-gray-900 dark:text-white">{formData.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">When Found</h3>
                    <p className="text-gray-900 dark:text-white">
                      {formData.notSureWhen 
                        ? "Not sure" 
                        : formData.foundDate && formData.foundTime 
                          ? `${formData.foundDate} at ${formData.foundTime}`
                          : "Not specified"}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Where Found</h3>
                    <p className="text-gray-900 dark:text-white">{formData.location}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Item Location Now</h3>
                  <p className="text-gray-900 dark:text-white">
                    {formData.itemLocation === 'have-with-me' ? 'I have it with me' : 
                     formData.itemLocation === 'left-where-found' ? 'Left where I found it' : 
                     formData.itemLocation === 'security-authority' ? 'Gave to security/authority' : 
                     formData.customItemLocation}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Preferred Return Method</h3>
                  <p className="text-gray-900 dark:text-white">
                    {formData.returnMethod === 'meet-in-person' ? 'Meet in person (public place)' : 
                     formData.returnMethod === 'drop-off' ? 'Drop off at their location' : 
                     'They can pick up from me'}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Verification Questions</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-900 dark:text-white">
                    {formData.verificationQuestions.colorBrand && (
                      <li>Specific color/brand details</li>
                    )}
                    {formData.verificationQuestions.uniqueMarks && (
                      <li>Unique marks or damage</li>
                    )}
                    {formData.verificationQuestions.lostLocation && (
                      <li>Where/when they think they lost it</li>
                    )}
                    {formData.verificationQuestions.customQuestion && (
                      <li>{formData.verificationQuestions.customQuestion}</li>
                    )}
                  </ul>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Contact Email</h3>
                    <p className="text-gray-900 dark:text-white">{formData.contactEmail}</p>
                  </div>
                  
                  {formData.contactPhone && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Contact Phone</h3>
                      <p className="text-gray-900 dark:text-white">{formData.contactPhone}</p>
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Privacy</h3>
                    <p className="text-gray-900 dark:text-white">
                      {formData.hideContactInfo ? "Contact info hidden until claimed" : "Contact info visible"}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Notifications</h3>
                    <p className="text-gray-900 dark:text-white">
                      {formData.allowNotifications ? "Enabled" : "Disabled"}
                    </p>
                  </div>
                </div>
                
                {formData.photo && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Photo</h3>
                    <div className="w-32 h-32 bg-purple-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <p className="text-sm text-gray-500">{formData.photo.name}</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-8 border-t border-purple-200 dark:border-purple-900/50 pt-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Checkbox
                      id="confirmMeetSafely"
                      name="confirmMeetSafely"
                      checked={formData.confirmMeetSafely}
                      onCheckedChange={(checked) => handleInputChange({ target: { name: 'confirmMeetSafely', type: 'checkbox', checked } })}
                      className="border-purple-200 data-[state=checked]:bg-purple-600"
                    />
                    <label
                      htmlFor="confirmMeetSafely"
                      className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      I will meet in a safe, public location to return the item
                    </label>
                  </div>
                  
                  <div className="flex items-center">
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
                </div>
                
                <div className="mt-6 flex flex-col sm:flex-row justify-between gap-4">
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
                    disabled={!formData.confirmAccuracy || !formData.confirmMeetSafely}
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

        {step === 6 && (
          <motion.div
            key="step6"
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
                🎉 Great job! Your item has been posted
              </h2>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Report ID: <span className="font-semibold text-purple-700 dark:text-purple-400">{reportId}</span>
              </p>
              
              <div className="bg-white dark:bg-gray-700/50 rounded-xl p-6 mb-8 max-w-md mx-auto">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4 text-center">
                  What happens next?
                </h3>
                
                <ul className="space-y-4 mx-auto">
                  <li className="flex items-center justify-center">
                    <div className="flex-shrink-0 h-5 w-5 text-purple-600 mr-2">
                      <Backpack className="h-5 w-5" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">We'll check for existing lost item reports that match</span>
                  </li>
                  <li className="flex items-center justify-center">
                    <div className="flex-shrink-0 h-5 w-5 text-purple-600 mr-2">
                      <Bell className="h-5 w-5" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Potential owners will contact you through the app</span>
                  </li>
                  <li className="flex items-center justify-center">
                    <div className="flex-shrink-0 h-5 w-5 text-purple-600 mr-2">
                      <HelpCircle className="h-5 w-5" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Ask verification questions before meeting</span>
                  </li>
                </ul>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 flex items-start mb-8">
                <div className="flex-shrink-0 mt-0.5">
                  <HandHeart className="h-5 w-5 text-purple-600" />
                </div>
                <div className="ml-3 text-left">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Thank you for helping someone find their lost item! Your kindness makes our community better.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  onClick={() => navigate('/map')}
                  variant="outline"
                  className="border-purple-200 text-purple-700 hover:bg-purple-50 dark:border-purple-800 dark:text-purple-400 dark:hover:bg-purple-900/20"
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  View Matches
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

export default FoundItemForm; 