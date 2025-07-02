
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  UserPlus, 
  PlusCircle, 
  Search, 
  MessageCircle, 
  CheckCircle,
  Filter,
  MapPin,
  Bell,
  Shield,
  Camera,
  Smartphone,
  Monitor,
  Zap,
  Github,
  ArrowRight,
  Play,
  Star
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HowItWorks = () => {
  const stepsRef = useRef([]);
  const featuresRef = useRef([]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          entry.target.style.animationDelay = '0s';
        }
      });
    }, observerOptions);

    [...stepsRef.current, ...featuresRef.current].forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      id: 1,
      icon: UserPlus,
      title: "Sign Up / Log In",
      description: "Quickly create an account or log in to access your personalized dashboard in under 30 seconds.",
      highlight: "Quick onboarding"
    },
    {
      id: 2,
      icon: PlusCircle,
      title: "Create a Listing",
      description: "Report a lost or found item with photos, detailed description, and precise location data.",
      highlight: "Takes less than 60 seconds"
    },
    {
      id: 3,
      icon: Search,
      title: "Browse & Search",
      description: "Use smart filters and AI-powered search to find exactly what you're looking for.",
      highlight: "Smart matching"
    },
    {
      id: 4,
      icon: MessageCircle,
      title: "Connect Safely",
      description: "Message verified users directly through our secure in-app communication system.",
      highlight: "Verified profiles only"
    },
    {
      id: 5,
      icon: CheckCircle,
      title: "Item Returned! 🎉",
      description: "Mark items as returned, leave feedback, and help build our community trust score.",
      highlight: "Community driven"
    }
  ];

  const features = [
    {
      icon: Filter,
      title: "Smart Search & Filters",
      description: "Advanced filtering by category, date, location, and custom criteria to find items faster."
    },
    {
      icon: MapPin,
      title: "Interactive Map View",
      description: "Visualize item locations on Google Maps with clustering and proximity-based search."
    },
    {
      icon: Bell,
      title: "Real-time Notifications",
      description: "Instant alerts when matching items are posted or when someone messages you."
    },
    {
      icon: Shield,
      title: "Verified Profiles",
      description: "Enhanced security with profile verification and community rating system."
    },
    {
      icon: Camera,
      title: "Image Recognition",
      description: "Upload multiple photos with automatic categorization and visual similarity matching."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance with real-time updates and instant search results."
    }
  ];

  const techStack = [
    { name: "React + Vite", category: "Frontend" },
    { name: "Tailwind CSS", category: "Styling" },
    { name: "Node.js + Express", category: "Backend" },
    { name: "PostgreSQL", category: "Database" },
    { name: "Google Maps API", category: "Maps" },
    { name: "Cloudinary", category: "Images" },
    { name: "JWT Auth", category: "Security" },
    { name: "WebSocket", category: "Real-time" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-900 dark:via-purple-900/10 dark:to-indigo-900/10">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-300/20 dark:bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-300/20 dark:bg-indigo-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl sm:text-6xl font-bold mb-6">
              <span className="block text-gray-900 dark:text-white mb-2">How It</span>
              <span className="block bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">
                Works
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Lost something? Found something? Our app makes it quick and easy to report, find, and return lost items to their rightful owners.
            </p>
          </div>
        </div>
      </section>

      {/* Step-by-Step Workflow */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Simple 5-Step Process
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              From reporting to reunion, our streamlined workflow makes lost & found effortless
            </p>
          </div>

          <div className="space-y-16">
            {steps.map((step, index) => (
              <div
                key={step.id}
                ref={(el) => (stepsRef.current[index] = el)}
                className={`group opacity-0 transition-all duration-700 ${
                  index % 2 === 0 ? 'translate-x-[-100px]' : 'translate-x-[100px]'
                }`}
              >
                <div className={`flex flex-col lg:flex-row items-center gap-12 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}>
                  {/* Step Content */}
                  <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg animate-glow-pulse">
                        {step.id}
                      </div>
                      <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium rounded-full">
                        {step.highlight}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                      {step.title}
                    </h3>
                    
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Step Visual */}
                  <div className="flex-1 flex justify-center">
                    <div className="relative group">
                      <div className="w-80 h-80 bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-3xl flex items-center justify-center shadow-2xl group-hover:shadow-purple-500/25 transition-all duration-500 group-hover:scale-105 border border-purple-200/50 dark:border-purple-800/50">
                        <step.icon className="w-24 h-24 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-purple-50/50 dark:bg-gray-800/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Standout Features
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Powered by cutting-edge technology to deliver the best lost & found experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                ref={(el) => (featuresRef.current[index] = el)}
                className="group opacity-0 p-8 bg-white/80 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-purple-200/50 dark:border-purple-800/50 shadow-lg hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 hover:scale-105 cursor-pointer"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Video Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            See It In Action
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Watch how easy it is to report and find lost items
          </p>
          
          <div className="relative group">
            <div className="aspect-video bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-3xl flex items-center justify-center shadow-2xl border border-purple-200/50 dark:border-purple-800/50 group-hover:scale-105 transition-all duration-500">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 cursor-pointer">
                <Play className="w-10 h-10 text-white ml-1" fill="currentColor" />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
          </div>
        </div>
      </section>

      {/* Why It's Easy */}
      <section className="py-20 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/10 dark:to-indigo-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Built for Everyone
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Designed with accessibility and usability at its core
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Smartphone,
                title: "Mobile First",
                description: "Fully responsive design that works perfectly on any device"
              },
              {
                icon: Monitor,
                title: "Clean Interface",
                description: "Intuitive design that anyone can use without tutorials"
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Optimized performance with instant loading and real-time updates"
              }
            ].map((item, index) => (
              <div
                key={item.title}
                className="group p-8 bg-white/80 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-purple-200/50 dark:border-purple-800/50 shadow-lg hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 hover:scale-105 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Built With Modern Tech
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Leveraging the latest technologies for optimal performance and scalability
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {techStack.map((tech, index) => (
              <div
                key={tech.name}
                className="group p-6 bg-white/80 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-purple-200/50 dark:border-purple-800/50 shadow-lg hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 hover:scale-105 text-center"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-sm text-purple-600 dark:text-purple-400 font-medium mb-2">
                  {tech.category}
                </div>
                <div className="font-bold text-gray-900 dark:text-white">
                  {tech.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl sm:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users who have successfully reunited with their lost items
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/register"
              className="group px-8 py-4 bg-white text-purple-600 font-bold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center gap-2"
            >
              Try It Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 border-2 border-white/30 text-white font-bold rounded-2xl transition-all duration-300 hover:bg-white/10 hover:scale-105 flex items-center gap-2"
            >
              <Github className="w-5 h-5" />
              View Source
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowItWorks;
