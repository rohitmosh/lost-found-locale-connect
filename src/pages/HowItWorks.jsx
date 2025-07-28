
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
  Star,
  Users,
  Sparkles,
  Heart,
  Award,
  Trophy
} from 'lucide-react';
import SimpleHeader from '../components/SimpleHeader';
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
      description: "Advanced filtering by category, date, location radius, and status with real-time database integration.",
      isNew: false
    },
    {
      icon: MapPin,
      title: "Interactive Map View",
      description: "Google Maps integration with marker clustering, smooth animations, and location-specific data for Bangalore.",
      isNew: false
    },
    {
      icon: Bell,
      title: "Real-time Notifications",
      description: "Instant alerts with animated notification sidebar, resolution confirmations, and thank you messages.",
      isNew: true
    },
    {
      icon: Shield,
      title: "Trust Score System",
      description: "Community-driven reputation system with detailed metrics, successful matches tracking, and verification badges.",
      isNew: false
    },
    {
      icon: Camera,
      title: "Photo Upload & Storage",
      description: "Secure image upload with Supabase storage, multiple photo support, and optimized loading.",
      isNew: false
    },
    {
      icon: Zap,
      title: "Resolution Celebration",
      description: "Confetti animations, success celebrations, and 'Item Reunited!' notifications when items are returned.",
      isNew: true
    },
    {
      icon: Users,
      title: "Dual Confirmation System",
      description: "Both owner and finder must confirm successful returns, ensuring accurate resolution tracking.",
      isNew: true
    },
    {
      icon: Sparkles,
      title: "Enhanced UI/UX",
      description: "Beautiful animations, micro-interactions, glass morphism effects, and delightful user experience.",
      isNew: true
    }
  ];

  const techStack = [
    { name: "React + Vite", category: "Frontend", isCore: true },
    { name: "Tailwind CSS", category: "Styling", isCore: true },
    { name: "Framer Motion", category: "Animations", isCore: true },
    { name: "Supabase", category: "Backend", isCore: true },
    { name: "PostgreSQL", category: "Database", isCore: true },
    { name: "Google Maps API", category: "Maps", isCore: true },
    { name: "Supabase Storage", category: "Images", isCore: false },
    { name: "Supabase Auth", category: "Security", isCore: true },
    { name: "Real-time DB", category: "Live Updates", isCore: true },
    { name: "Row Level Security", category: "Security", isCore: false },
    { name: "Lucide Icons", category: "UI", isCore: false },
    { name: "React Router", category: "Navigation", isCore: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-900 dark:via-purple-900/30 dark:to-indigo-900/30">
      <SimpleHeader />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-400/40 dark:bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-400/40 dark:bg-indigo-500/30 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-violet-400/40 dark:bg-violet-500/30 rounded-full blur-3xl animate-pulse delay-500" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl sm:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">
                How It Works
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
      <section className="py-20 bg-purple-50/70 dark:bg-gray-800/30 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-purple-400/20 dark:bg-purple-500/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400/20 dark:bg-indigo-500/20 rounded-full blur-3xl animate-float delay-1000" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
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
                className="group opacity-0 p-8 bg-white/90 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-purple-200/50 dark:border-purple-800/50 shadow-lg hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:scale-105 cursor-pointer animate-glow-pulse relative overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* NEW Badge */}
                {feature.isNew && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse-glow">
                    <Sparkles className="w-3 h-3 inline mr-1" />
                    NEW
                  </div>
                )}

                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg animate-bounce-subtle">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                  {feature.title}
                  {feature.isNew && (
                    <span className="ml-2 text-green-500 animate-sparkle">✨</span>
                  )}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>

                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Video Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-400/20 dark:bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
              See It In Action
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
              Watch how easy it is to report and find lost items
            </p>
          </div>
          
          <div className="relative group animate-scale-in">
            <div className="aspect-video bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-3xl flex items-center justify-center shadow-2xl border border-purple-200/50 dark:border-purple-800/50 group-hover:scale-105 transition-all duration-500 hover:shadow-purple-500/25">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 cursor-pointer animate-pulse-glow">
                <Play className="w-10 h-10 text-white ml-1" fill="currentColor" />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
          </div>
        </div>
      </section>

      {/* Why It's Easy */}
      <section className="py-20 bg-gradient-to-r from-purple-50/80 to-indigo-50/80 dark:from-purple-900/20 dark:to-indigo-900/20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-400/30 dark:bg-purple-500/25 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/30 dark:bg-indigo-500/25 rounded-full blur-3xl animate-float delay-500" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
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
                className="group p-8 bg-white/90 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-purple-200/50 dark:border-purple-800/50 shadow-lg hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:scale-105 text-center animate-stagger-fade"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg animate-glow-pulse">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
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
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-400/15 dark:bg-purple-500/15 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-400/15 dark:bg-indigo-500/15 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
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
                className={`group p-6 bg-white/90 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl border transition-all duration-300 hover:scale-105 text-center animate-stagger-fade relative overflow-hidden ${
                  tech.isCore
                    ? 'border-purple-300 dark:border-purple-700 shadow-lg hover:shadow-xl hover:shadow-purple-500/20 hover-glow'
                    : 'border-purple-200/50 dark:border-purple-800/50 shadow-md hover:shadow-lg hover:shadow-purple-500/10'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Core technology indicator */}
                {tech.isCore && (
                  <div className="absolute top-2 right-2 w-3 h-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full animate-pulse-glow">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full animate-ping opacity-75"></div>
                  </div>
                )}

                <div className={`text-sm font-medium mb-2 transition-colors duration-300 ${
                  tech.isCore
                    ? 'text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300'
                    : 'text-purple-500 dark:text-purple-500 group-hover:text-purple-600 dark:group-hover:text-purple-400'
                }`}>
                  {tech.category}
                  {tech.isCore && <Star className="w-3 h-3 inline ml-1 fill-current" />}
                </div>
                <div className="font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                  {tech.name}
                </div>

                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-100/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resolution Celebration Showcase */}
      <section className="py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-green-900/10 dark:to-emerald-900/10 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-300/30 dark:bg-green-600/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-300/30 dark:bg-emerald-600/20 rounded-full blur-3xl animate-pulse delay-1000" />

          {/* Floating celebration elements */}
          <div className="absolute top-20 left-20 text-2xl animate-sparkle">🎉</div>
          <div className="absolute top-40 right-32 text-3xl animate-sparkle delay-700">✨</div>
          <div className="absolute bottom-32 left-1/3 text-2xl animate-sparkle delay-1000">🎊</div>
          <div className="absolute bottom-20 right-20 text-3xl animate-sparkle delay-300">🏆</div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              <span className="gradient-text">Celebrate Every Success</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              When items are successfully returned, we celebrate with confetti animations and heartfelt messages
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Demo Animation */}
            <div className="relative">
              <div className="bg-white/90 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-green-200/50 dark:border-green-800/50 hover-glow">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold gradient-text mb-4">🎉 Item Reunited! 🎉</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    <span className="font-semibold text-purple-600 dark:text-purple-400">"iPhone 13 Pro"</span>
                    <br />
                    has been successfully returned to its owner!
                  </p>
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                    <span>Thank you for making our community stronger!</span>
                    <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Floating confetti elements */}
              <div className="absolute -top-4 -left-4 w-4 h-4 bg-purple-400 rounded-full animate-bounce"></div>
              <div className="absolute -top-2 -right-6 w-3 h-3 bg-green-400 rounded-full animate-bounce delay-200"></div>
              <div className="absolute -bottom-4 -left-2 w-5 h-5 bg-yellow-400 rounded-full animate-bounce delay-500"></div>
              <div className="absolute -bottom-2 -right-4 w-3 h-3 bg-pink-400 rounded-full animate-bounce delay-700"></div>
            </div>

            {/* Features List */}
            <div className="space-y-6">
              {[
                {
                  icon: Trophy,
                  title: "Confetti Celebration",
                  description: "Beautiful animated confetti effects when items are successfully returned"
                },
                {
                  icon: Heart,
                  title: "Heartfelt Messages",
                  description: "Personalized thank you messages and community appreciation notes"
                },
                {
                  icon: Award,
                  title: "Trust Score Boost",
                  description: "Both owner and finder receive trust score increases for successful returns"
                },
                {
                  icon: Bell,
                  title: "Instant Notifications",
                  description: "Real-time notifications with celebration animations for all parties involved"
                }
              ].map((feature, index) => (
                <div key={feature.title} className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-float delay-1000" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="animate-fade-in">
            <h2 className="text-3xl sm:text-5xl font-bold mb-6 animate-glow-pulse">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of users who have successfully reunited with their lost items
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in">
            <Link
              to="/register"
              className="group px-8 py-4 bg-white text-purple-600 font-bold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center gap-2 hover:glow-purple"
            >
              Try It Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 border-2 border-white/30 text-white font-bold rounded-2xl transition-all duration-300 hover:bg-white/10 hover:scale-105 flex items-center gap-2 hover:shadow-xl"
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
