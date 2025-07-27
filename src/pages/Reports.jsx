import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Search, 
  MapPin, 
  Clock, 
  Mail, 
  Phone, 
  Filter, 
  ArrowDownUp, 
  Edit,
  Trash2,
  Eye,
  X,
  Calendar,
  User,
  Tag,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

// Simplified mock data
const MOCK_REPORTS = [
  {
    id: 'LF-2024-123456',
    type: 'lost',
    title: 'Blue Backpack with Laptop',
    description: 'Lost my blue Northface backpack with a Dell laptop inside near the park. Has a keychain with a mini skateboard attached. The laptop was in a black sleeve with stickers on it.',
    date: new Date(2024, 5, 24, 14, 30),
    status: 'active',
    location: 'Central Park, Main Entrance',
    contactMethod: 'email',
    isOwner: true,
    category: 'electronics',
    contactInfo: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: null
    },
    additionalInfo: 'The backpack contains important work documents and a laptop charger.',
    image: null
  },
  {
    id: 'FI-2024-789012',
    type: 'found',
    title: 'iPhone 14 Pro in Black Case',
    description: 'Found an iPhone 14 Pro with a black case near the bus stop. Screen is not cracked but phone is locked. Has a photo of a dog as the lock screen.',
    date: new Date(2024, 5, 26, 17, 45),
    status: 'active',
    location: 'Main Street Bus Stop',
    contactMethod: 'phone',
    isOwner: true,
    category: 'electronics',
    contactInfo: {
      name: 'Jane Smith',
      email: null,
      phone: '555-123-4567'
    },
    additionalInfo: 'The phone is currently being kept at the bus station lost and found.',
    image: null
  },
  {
    id: 'LF-2024-123457',
    type: 'lost',
    title: 'Car Keys with Red Lanyard',
    description: 'Lost my Toyota car keys with a red university lanyard attached. Has a small cat keychain and a remote starter.',
    date: new Date(2024, 5, 25, 9, 15),
    status: 'resolved',
    location: 'University Library, Second Floor',
    contactMethod: 'both',
    isOwner: true,
    category: 'keys',
    contactInfo: {
      name: 'Emily Johnson',
      email: 'emily.j@example.com',
      phone: '555-987-6543'
    },
    additionalInfo: 'Lost while studying at the library. Keys were found and returned by library staff.',
    image: null
  },
  {
    id: 'FI-2024-789013',
    type: 'found',
    title: 'Silver Bracelet with Charm',
    description: 'Found a silver bracelet with a heart charm on the sidewalk. Has an engraving that says "Forever" on the inside.',
    date: new Date(2024, 5, 23, 8, 30),
    status: 'active',
    location: 'Park Avenue Sidewalk',
    contactMethod: 'email',
    isOwner: false,
    category: 'jewelry',
    contactInfo: {
      name: 'Michael Brown',
      email: 'michael.b@example.com',
      phone: null
    },
    additionalInfo: 'Found near the coffee shop entrance.',
    image: null
  },
  {
    id: 'LF-2024-123458',
    type: 'lost',
    title: 'Prescription Glasses',
    description: 'Lost my prescription glasses with tortoise shell frames. They were in a brown case with a cleaning cloth.',
    date: new Date(2024, 5, 20, 12, 0),
    status: 'active',
    location: 'Downtown Coffee Shop',
    contactMethod: 'email',
    isOwner: false,
    category: 'accessories',
    contactInfo: {
      name: 'Sarah Williams',
      email: 'sarah.w@example.com',
      phone: null
    },
    additionalInfo: 'I have a strong prescription and need these glasses to drive.',
    image: null
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 15,
    scale: 0.95,
    rotateX: 3
  },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300,
      delay: index * 0.05,
      duration: 0.4
    }
  }),
  exit: { 
    opacity: 0, 
    y: -10, 
    scale: 0.97,
    transition: { 
      duration: 0.2,
      ease: "easeOut"
    } 
  },
  hover: {
    y: -4,
    scale: 1.02,
    rotateY: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 25
    }
  }
};

const filterVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      delay: 0.2,
      duration: 0.25 
    } 
  }
};

const searchVariants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      delay: 0.25,
      duration: 0.25,
      type: "spring",
      stiffness: 400,
      damping: 25
    } 
  }
};

// Helper function for time formatting
const formatTimeAgo = (date) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) {
    return 'just now';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
};

const Reports = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: 'all', // 'all', 'active', 'resolved'
    type: 'all', // 'all', 'lost', 'found'
    onlyMine: false,
  });
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest'
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [reportToDelete, setReportToDelete] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

  // Fetch user's reports from database
  const fetchReports = async () => {
    if (!user?.id) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('reports')
        .select(`
          id,
          title,
          description,
          report_type,
          status,
          address,
          latitude,
          longitude,
          contact_email,
          contact_phone,
          photo_url,
          incident_date,
          created_at,
          updated_at,
          categories (
            id,
            name
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching reports:', error);
        return;
      }

      // Format reports for the UI
      const formattedReports = data.map(report => ({
        id: report.id,
        title: report.title,
        description: report.description,
        type: report.report_type,
        status: report.status,
        location: report.address,
        latitude: report.latitude,
        longitude: report.longitude,
        contactEmail: report.contact_email,
        contactPhone: report.contact_phone,
        photoUrl: report.photo_url,
        date: new Date(report.incident_date || report.created_at),
        createdAt: new Date(report.created_at),
        updatedAt: new Date(report.updated_at),
        category: report.categories?.name || 'Other',
        categoryId: report.categories?.id,
        isOwner: true // All reports are user's own reports
      }));

      setReports(formattedReports);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load reports when component mounts or user changes
  useEffect(() => {
    fetchReports();
  }, [user?.id]);

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setTypeFilter('all');
    setStatusFilter('all');
    setCategoryFilter('all');
  };
  
  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 },
  };
  
  // Filter reports based on search query and filters
  const filteredReports = reports.filter(report => {
    // Search filter
    const matchesSearch = 
      searchQuery === '' ||
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Status filter
    const matchesStatus = 
      statusFilter === 'all' || 
      report.status === statusFilter;
    
    // Type filter
    const matchesType = 
      typeFilter === 'all' || 
      report.type === typeFilter;
      
    // Category filter
    const matchesCategory =
      categoryFilter === 'all' ||
      report.category === categoryFilter;
    
    // Only mine filter
    const matchesMine = 
      !filters.onlyMine || 
      report.isOwner;
    
    return matchesSearch && matchesStatus && matchesType && matchesCategory && matchesMine;
  });
  
  // Sort reports
  const sortedReports = [...filteredReports].sort((a, b) => {
    if (sortBy === 'newest') {
      return b.date - a.date;
    } else {
      return a.date - b.date;
    }
  });
  
  // Handle delete confirmation
  const confirmDelete = (reportId) => {
    setReportToDelete(reportId);
    setDeleteDialogOpen(true);
  };
  
  // Handle actual deletion
  const handleDelete = async () => {
    if (!reportToDelete) return;

    try {
      const { error } = await supabase
        .from('reports')
        .delete()
        .eq('id', reportToDelete)
        .eq('user_id', user.id); // Ensure user can only delete their own reports

      if (error) {
        console.error('Error deleting report:', error);
        alert('Failed to delete report. Please try again.');
        return;
      }

      // Remove from local state
      setReports(reports.filter(report => report.id !== reportToDelete));
      setDeleteDialogOpen(false);
      setReportToDelete(null);
    } catch (error) {
      console.error('Error deleting report:', error);
      alert('Failed to delete report. Please try again.');
    }
  };

  // Handle view details
  const handleViewDetails = (report) => {
    setSelectedReport(report);
    setDetailsDialogOpen(true);
  };

  // Handle edit report
  const handleEditReport = (report) => {
    // Only allow editing of active reports
    if (report.status !== 'active') {
      alert('Only active reports can be edited.');
      return;
    }

    if (report.type === 'lost') {
      navigate('/report-lost', { state: { editMode: true, report } });
    } else {
      navigate('/report-found', { state: { editMode: true, report } });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      <motion.div 
        className="flex-grow container mx-auto px-4 py-8"
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">
              My Reports
            </h1>
            
            {/* Filtering Section */}
            <motion.div 
              variants={filterVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center"
            >
              <div className="flex-1 w-full md:w-auto">
                <motion.div
                  variants={searchVariants}
                  initial="hidden"
                  animate="visible" 
                  className="relative"
                >
                  <Input
                    type="text"
                    placeholder="Search by title, description, or location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white dark:bg-gray-800 border-purple-200 dark:border-purple-900/50 rounded-xl focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-purple-600 dark:focus:border-purple-600 transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-purple-500/10"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </motion.div>
              </div>
              
              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full md:w-[150px] bg-white dark:bg-gray-800 border-purple-200 dark:border-purple-900/50 rounded-xl focus:ring-purple-500 focus:border-purple-500 shadow-sm hover:shadow-md hover:shadow-purple-500/10 transition-all duration-300">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-purple-200 dark:border-purple-900/50">
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="lost">Lost Items</SelectItem>
                    <SelectItem value="found">Found Items</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-[150px] bg-white dark:bg-gray-800 border-purple-200 dark:border-purple-900/50 rounded-xl focus:ring-purple-500 focus:border-purple-500 shadow-sm hover:shadow-md hover:shadow-purple-500/10 transition-all duration-300">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-purple-200 dark:border-purple-900/50">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full md:w-[180px] bg-white dark:bg-gray-800 border-purple-200 dark:border-purple-900/50 rounded-xl focus:ring-purple-500 focus:border-purple-500 shadow-sm hover:shadow-md hover:shadow-purple-500/10 transition-all duration-300">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-purple-200 dark:border-purple-900/50">
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="personal">Personal Items</SelectItem>
                    <SelectItem value="documents">Documents</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button 
                  variant="outline" 
                  className="flex items-center gap-1 border-purple-200 text-purple-700 hover:bg-purple-50 dark:border-purple-800 dark:text-purple-400 dark:hover:bg-purple-900/20 rounded-xl shadow-sm hover:shadow-md hover:shadow-purple-500/10 transition-all duration-300 hover:scale-105"
                  onClick={resetFilters}
                >
                  <Filter className="h-4 w-4" />
                  Reset
                </Button>
              </div>
            </motion.div>
          </div>
          
          {/* Reports Count */}
          <div className="mb-6 text-sm text-gray-600 dark:text-gray-400">
            Showing {sortedReports.length} {sortedReports.length === 1 ? 'report' : 'reports'}
          </div>
          
          {/* Results */}
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white dark:bg-gray-800 rounded-3xl border border-purple-100 dark:border-purple-900/50 overflow-hidden animate-pulse">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 m-4" />
                    <div className="px-4 pb-4">
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2" />
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-4" />
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800/60 border-t border-purple-100 dark:border-purple-900/50 flex justify-between items-center">
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20" />
                      <div className="flex space-x-2">
                        <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full" />
                        <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full" />
                        <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full" />
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : filteredReports.length === 0 ? (
              <motion.div 
                key="no-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mb-4">
                  <AlertCircle className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No matching reports found</h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                  Try adjusting your search or filter criteria to find what you're looking for.
                </p>
              </motion.div>
            ) : (
              <motion.div 
                key="results" 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                <AnimatePresence>
                  {filteredReports.map((report, index) => (
                    <motion.div
                      key={report.id}
                      custom={index}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout
                      whileHover="hover"
                      className={`bg-white dark:bg-gray-800 rounded-3xl border border-purple-100 dark:border-purple-900/50 overflow-hidden hover:shadow-xl hover:shadow-purple-500/30 dark:hover:shadow-purple-900/40 transition-all duration-300 ${
                        report.isOwner && report.status === 'active' ? 'ring-2 ring-red-500/30 hover:ring-red-500/50 hover:glow-red' : 
                        report.isOwner && report.status === 'resolved' ? 'ring-2 ring-green-500/30 hover:ring-green-500/50 hover:glow-green' : 
                        report.type === 'found' ? 'ring-2 ring-blue-500/30 hover:ring-blue-500/50 hover:glow-blue' : 'hover:glow-purple'
                      }`}
                    >
                      {/* Card Header with type indicator */}
                      <div className={`px-4 py-2 flex justify-between items-center ${
                        report.type === 'lost' ? 'bg-red-50 dark:bg-red-900/20' : 'bg-blue-50 dark:bg-blue-900/20'
                      }`}>
                        <div className="flex items-center">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium transition-all duration-200 hover:scale-105 ${
                            report.type === 'lost' 
                              ? 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300 shadow-sm' 
                              : 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 shadow-sm'
                          }`}>
                            {report.type === 'lost' ? 'Lost' : 'Found'}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium transition-all duration-200 hover:scale-105 ${
                            report.status === 'active' 
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300 shadow-sm' 
                              : 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 shadow-sm'
                          }`}>
                            {report.status === 'active' ? 'Active' : 'Resolved'}
                          </span>
                        </div>
                      </div>
                      
                      {/* Card Content */}
                      <div className="p-4">
                        <motion.h3 
                          initial={{ opacity: 0.9 }}
                          animate={{ opacity: 1 }}
                          whileHover={{ scale: 1.005, x: 1 }}
                          className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200"
                        >
                          {report.title}
                        </motion.h3>
                        
                        <motion.p 
                          initial={{ opacity: 0.8 }}
                          animate={{ opacity: 1 }}
                          className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2"
                        >
                          {report.description}
                        </motion.p>
                        
                        <div className="space-y-2 text-sm">
                          {/* Location */}
                          <motion.div 
                            className="flex items-start group"
                            whileHover={{ x: 1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          >
                            <MapPin className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0 group-hover:text-purple-500 transition-colors duration-200" />
                            <span className="text-gray-700 dark:text-gray-300 line-clamp-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200">{report.location}</span>
                          </motion.div>
                          
                          {/* Time */}
                          <motion.div 
                            className="flex items-start group"
                            whileHover={{ x: 1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          >
                            <Clock className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0 group-hover:text-purple-500 transition-colors duration-200" />
                            <span className="text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200">
                              {report.type === 'lost' ? 'Lost' : 'Found'} {formatTimeAgo(report.date)}
                            </span>
                          </motion.div>
                          
                          {/* Contact Method */}
                          <motion.div 
                            className="flex items-start group"
                            whileHover={{ x: 1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          >
                            {report.contactMethod === 'email' && <Mail className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0 group-hover:text-purple-500 transition-colors duration-200" />}
                            {report.contactMethod === 'phone' && <Phone className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0 group-hover:text-purple-500 transition-colors duration-200" />}
                            {report.contactMethod === 'both' && (
                              <div className="flex mr-2">
                                <Mail className="h-4 w-4 text-gray-400 flex-shrink-0 group-hover:text-purple-500 transition-colors duration-200" />
                                <Phone className="h-4 w-4 text-gray-400 flex-shrink-0 ml-1 group-hover:text-purple-500 transition-colors duration-200" />
                              </div>
                            )}
                            <span className="text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200">
                              {report.contactMethod === 'email' ? 'Email' : 
                               report.contactMethod === 'phone' ? 'Phone' : 
                               'Email & Phone'}
                            </span>
                          </motion.div>
                        </div>
                      </div>
                      
                      {/* Card Footer */}
                      <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800/60 border-t border-purple-100 dark:border-purple-900/50 flex justify-between items-center">
                        <div className="text-xs text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">
                          {report.id}
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {report.status === 'active' && (
                            <>
                              <motion.div whileHover={{ scale: 1.08, rotate: 3 }} whileTap={{ scale: 0.97 }}>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 w-8 p-0 text-purple-600 hover:text-purple-700 hover:bg-purple-100 dark:text-purple-400 dark:hover:bg-purple-900/20 rounded-full transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-purple-500/10"
                                  title="Edit report"
                                  onClick={() => handleEditReport(report)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </motion.div>
                              
                              <motion.div whileHover={{ scale: 1.08, rotate: -3 }} whileTap={{ scale: 0.97 }}>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/20 rounded-full transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-red-500/10"
                                  onClick={() => confirmDelete(report.id)}
                                  title="Delete report"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </motion.div>
                            </>
                          )}
                          
                          <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }}>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900/20 rounded-full transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-blue-500/10"
                              title="View details"
                              onClick={() => handleViewDetails(report)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      
      <Footer />
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="bg-white dark:bg-gray-800 border-purple-200 dark:border-purple-900/50 sm:max-w-md rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">Delete Report</DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              Are you sure you want to delete this report? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-end">
            <Button 
              variant="outline" 
              onClick={() => setDeleteDialogOpen(false)}
              className="border-purple-200 text-purple-700 hover:bg-purple-50 dark:border-purple-800 dark:text-purple-400 dark:hover:bg-purple-900/20 rounded-full"
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white rounded-full"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Details Dialog */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="bg-white dark:bg-gray-800 border-purple-200 dark:border-purple-900/50 max-w-3xl max-h-[90vh] overflow-auto rounded-3xl shadow-lg shadow-purple-500/20 dark:shadow-purple-900/30" hideClose>
          {selectedReport && (
            <>
              <div className="absolute right-4 top-4 z-10">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setDetailsDialogOpen(false)}
                  className="h-12 w-12 p-0 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800/50 transition-all duration-200 hover:scale-110 shadow-md shadow-purple-500/10"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              
              <DialogHeader>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium transition-all duration-200 hover:scale-105 ${
                      selectedReport.type === 'lost' 
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300 shadow-sm shadow-red-500/20' 
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 shadow-sm shadow-blue-500/20'
                    }`}>
                      {selectedReport.type === 'lost' ? 'Lost' : 'Found'}
                    </span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium transition-all duration-200 hover:scale-105 ${
                      selectedReport.status === 'active' 
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300 shadow-sm shadow-yellow-500/20' 
                        : 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 shadow-sm shadow-green-500/20'
                    }`}>
                      {selectedReport.status === 'active' ? 'Active' : 'Resolved'}
                    </span>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">
                      {selectedReport.id}
                    </span>
                  </div>
                </div>
                <DialogTitle className="text-2xl text-gray-900 dark:text-white mt-2 animate-fade-in">
                  {selectedReport.title}
                </DialogTitle>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  {selectedReport.photoUrl ? (
                    <div className="rounded-3xl overflow-hidden mb-4 border border-purple-200 dark:border-purple-900/50 shadow-md hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 hover:scale-[1.02] transform">
                      <img
                        src={selectedReport.photoUrl}
                        alt={selectedReport.title}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  ) : (
                    <div className="rounded-3xl overflow-hidden mb-4 border border-purple-200 dark:border-purple-900/50 bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center h-48 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 hover:scale-[1.02] transform">
                      <span className="text-gray-400 dark:text-gray-600 text-sm">No image available</span>
                    </div>
                  )}
                  
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                    <Tag className="h-4 w-4 text-purple-500 mr-2" />
                    Category
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 capitalize">
                    {selectedReport.category}
                  </p>
                  
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                    <MapPin className="h-4 w-4 text-purple-500 mr-2" />
                    Location
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {selectedReport.location}
                  </p>
                  
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                    <Calendar className="h-4 w-4 text-purple-500 mr-2" />
                    Date & Time
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {selectedReport.date.toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })} at {selectedReport.date.toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Description
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 whitespace-pre-line">
                    {selectedReport.description}
                  </p>
                  

                  
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                    <User className="h-4 w-4 text-purple-500 mr-2" />
                    Contact Information
                  </h3>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-3xl p-4 mb-4 shadow-sm hover:shadow-md hover:shadow-purple-500/10 transition-all duration-300">
                    {selectedReport.contactEmail && (
                      <p className="text-gray-700 dark:text-gray-300 mb-2 flex items-center hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">
                        <Mail className="h-4 w-4 text-gray-400 mr-2" />
                        <strong>Email:</strong> <span className="ml-2">{selectedReport.contactEmail}</span>
                      </p>
                    )}
                    {selectedReport.contactPhone && (
                      <p className="text-gray-700 dark:text-gray-300 flex items-center hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">
                        <Phone className="h-4 w-4 text-gray-400 mr-2" />
                        <strong>Phone:</strong> <span className="ml-2">{selectedReport.contactPhone}</span>
                      </p>
                    )}
                    {!selectedReport.contactEmail && !selectedReport.contactPhone && (
                      <p className="text-gray-500 dark:text-gray-400 italic">No contact information available</p>
                    )}
                  </div>
                </div>
              </div>
              
              <DialogFooter className="flex flex-col sm:flex-row gap-2 items-center mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                {selectedReport.status === 'active' ? (
                  <div className="w-full flex justify-center space-x-8">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setDetailsDialogOpen(false);
                        handleEditReport(selectedReport);
                      }}
                      className="border-purple-200 text-purple-700 hover:bg-purple-50 dark:border-purple-800 dark:text-purple-400 dark:hover:bg-purple-900/20 rounded-full px-8 shadow-md hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105 transform"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Report
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setDetailsDialogOpen(false);
                        confirmDelete(selectedReport.id);
                      }}
                      className="border-red-200 text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20 rounded-full px-8 shadow-md hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 hover:scale-105 transform"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Report
                    </Button>
                  </div>
                ) : null}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Reports; 