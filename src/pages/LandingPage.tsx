
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, CreditCard, Users, CheckCircle, Star, ChevronRight, ArrowRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import ScrollReveal from "../components/ScrollReveal";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center shadow-lg">
                <span className="text-lg font-bold text-white">J</span>
              </div>
              <span className="font-bold text-xl">JeevaDev</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</a>
              <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">Pricing</a>
              <a href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">Testimonials</a>
              <a onClick={() => navigate('/design')} className="text-sm font-medium hover:text-primary transition-colors cursor-pointer">Design System</a>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/login')} className="hidden sm:inline-flex">Log in</Button>
              <Button onClick={() => navigate('/register')} className="shadow-md">Get Started</Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section with enhanced design */}
        <section className="relative overflow-hidden py-20 lg:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 z-0 gradient-animation"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <ScrollReveal animation="fade-in">
                <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  Simplified Booking System
                </span>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mt-4">
                  Streamline Your <span className="text-primary">Booking</span> & <span className="text-primary">Billing</span> Process
                </h1>
                <p className="text-lg text-gray-600 mt-4">
                  BookFlow helps businesses manage bookings, appointments, and payments in one place. 
                  Get started today and experience hassle-free scheduling.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <Button size="lg" onClick={() => navigate('/register')} className="group bg-primary hover:bg-primary/90 shadow-lg glow-button">
                    Get Started
                    <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => navigate('/login')} className="shadow-sm">
                    View Demo
                  </Button>
                </div>
                <div className="flex items-center space-x-4 text-sm mt-6">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((item) => (
                      <div key={item} className={`w-8 h-8 rounded-full border-2 border-white bg-gray-${item * 100} flex items-center justify-center text-xs text-white font-medium`}>
                        {item}
                      </div>
                    ))}
                  </div>
                  <span className="text-gray-600">Trusted by 1000+ businesses</span>
                </div>
              </ScrollReveal>
              <div className="relative lg:block floating">
                <div className="absolute -left-8 -top-8 w-72 h-72 bg-blue-100 rounded-full filter blur-3xl opacity-30"></div>
                <div className="absolute -right-8 -bottom-8 w-72 h-72 bg-purple-100 rounded-full filter blur-3xl opacity-30"></div>
                <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 transform hover:rotate-1 transition-transform duration-300">
                  <div className="w-full h-64 bg-gray-50 rounded-lg flex items-center justify-center mb-8">
                    <div className="text-center px-8">
                      <div className="w-20 h-20 rounded-full bg-primary/10 mx-auto flex items-center justify-center mb-4">
                        <Calendar className="h-10 w-10 text-primary" />
                      </div>
                      <h3 className="text-2xl font-semibold mb-2">Smart Booking System</h3>
                      <p className="text-gray-500">Manage all your bookings in one place with an intuitive calendar interface</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <span className="font-medium">Easy Setup</span>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                      <span className="font-medium">Team Access</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section with better cards */}
        <section id="features" className="py-20 bg-white">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium">
                Features
              </span>
              <h2 className="text-3xl font-bold mt-4 mb-4">All-in-one Booking Solution</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Everything you need to manage bookings, customers, and payments in one platform
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="overflow-hidden hover:shadow-lg transition-shadow border-0 shadow-md group">
                <div className="h-2 bg-blue-500"></div>
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                    <Calendar className="h-7 w-7 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">Smart Scheduling</h3>
                  <p className="text-gray-600">
                    Intelligent booking system that prevents double bookings and maximizes availability with customizable rules
                  </p>
                  <div className="mt-6 flex items-center text-blue-600 font-medium group-hover:translate-x-2 transition-transform">
                    <span>Learn more</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden hover:shadow-lg transition-shadow border-0 shadow-md group">
                <div className="h-2 bg-green-500"></div>
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                    <CreditCard className="h-7 w-7 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-green-600 transition-colors">Secure Payments</h3>
                  <p className="text-gray-600">
                    Integrated payment processing with automatic invoice generation and multiple payment options
                  </p>
                  <div className="mt-6 flex items-center text-green-600 font-medium group-hover:translate-x-2 transition-transform">
                    <span>Learn more</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden hover:shadow-lg transition-shadow border-0 shadow-md group">
                <div className="h-2 bg-purple-500"></div>
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                    <Users className="h-7 w-7 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-600 transition-colors">User Management</h3>
                  <p className="text-gray-600">
                    Role-based access control for admins and customers with personalized dashboards and reports
                  </p>
                  <div className="mt-6 flex items-center text-purple-600 font-medium group-hover:translate-x-2 transition-transform">
                    <span>Learn more</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section id="testimonials" className="py-20 bg-gray-50">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium">
                Testimonials
              </span>
              <h2 className="text-3xl font-bold mt-4 mb-4">What Our Clients Say</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Don't just take our word for it. See what our customers have to say about BookFlow.
              </p>
            </div>
            
            <div className="relative px-12">
              <Carousel className="w-full max-w-4xl mx-auto">
                <CarouselContent>
                  {[
                    {
                      name: "Jeeva",
                      role: "Senior Developer",
                      content: "BookFlow has transformed our booking process. We've reduced no-shows by 60% and increased our monthly revenue significantly.",
                      image: "/jeeva.jpg"
                    },
                    {
                      name: "Senthil",
                      role: "Fitness Studio Manager",
                      content: "The integrated payment system is a game-changer. Our clients love the seamless booking experience, and we love the automated billing.",
                      image: "https://randomuser.me/api/portraits/men/32.jpg"
                    },
                    {
                      name: "Aishwarya",
                      role: "Cloud Architect",
                      content: "After trying three different booking systems, BookFlow is by far the most intuitive and feature-rich solution for our salon needs.",
                      image: "https://randomuser.me/api/portraits/women/68.jpg"
                    }
                  ].map((testimonial, index) => (
                    <CarouselItem key={index}>
                      <Card className="border-0 shadow-lg">
                        <CardContent className="p-8 flex flex-col items-center text-center">
                          <div className="flex mb-4">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <p className="text-lg mb-6">"{testimonial.content}"</p>
                          <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-primary">
                            <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{testimonial.name}</h4>
                            <p className="text-sm text-gray-500">{testimonial.role}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="absolute -left-4 top-1/2 -translate-y-1/2">
                  <CarouselPrevious className="relative left-0" />
                </div>
                <div className="absolute -right-4 top-1/2 -translate-y-1/2">
                  <CarouselNext className="relative right-0" />
                </div>
              </Carousel>
            </div>
          </div>
        </section>

        {/* Pricing Section with hover effects */}
        <section id="pricing" className="py-20 bg-white">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium">
                Pricing
              </span>
              <h2 className="text-3xl font-bold mt-4 mb-4">Simple, Transparent Pricing</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Choose the plan that works best for your business, all with no hidden fees
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="border rounded-xl p-8 bg-white shadow-md hover:shadow-xl transition-shadow relative hover:-translate-y-1 duration-300">
                <div className="mb-4">
                  <h3 className="text-xl font-bold">Starter</h3>
                  <p className="text-gray-500">For small businesses</p>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-bold">Rs.999</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {['Up to 50 bookings/month', 'Email notifications', 'Customer management', 'Basic reporting'].map((feature) => (
                    <li key={feature} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant="outline">
                  Get Started
                </Button>
              </div>

              <div className="border-2 border-primary rounded-xl p-8 bg-white shadow-lg hover:shadow-xl transition-shadow relative -translate-y-4 hover:-translate-y-5 duration-300">
                <div className="absolute -top-4 left-0 right-0 mx-auto w-fit px-4 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                  Most Popular
                </div>
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-primary">Professional</h3>
                  <p className="text-gray-500">For growing businesses</p>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-bold">Rs.2999</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {[
                    'Unlimited bookings', 
                    'SMS notifications', 
                    'Online payments', 
                    'Advanced analytics',
                    'Custom branding',
                  ].map((feature) => (
                    <li key={feature} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full">
                  Get Started
                </Button>
              </div>

              <div className="border rounded-xl p-8 bg-white shadow-md hover:shadow-xl transition-shadow relative hover:-translate-y-1 duration-300">
                <div className="mb-4">
                  <h3 className="text-xl font-bold">Enterprise</h3>
                  <p className="text-gray-500">For large organizations</p>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-bold">Rs.3999</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {[
                    'Unlimited everything', 
                    'Priority support', 
                    'API access', 
                    'Custom development',
                    'Dedicated account manager',
                    'SLA guarantee'
                  ].map((feature) => (
                    <li key={feature} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant="outline">
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold mb-4">Ready to simplify your booking process?</h2>
                <p className="text-blue-100 text-lg">
                  Join thousands of businesses that use BookFlow to streamline their scheduling and billing. Get started today with a 14-day free trial.
                </p>
              </div>
              <div className="flex-shrink-0">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  Start Free Trial
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-gray-300 pt-16 pb-12">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center">
                  <span className="text-lg font-bold text-white">B</span>
                </div>
                <span className="font-bold text-xl text-white">BookFlow</span>
              </div>
              <p className="text-sm">
                Streamlining booking and billing processes for businesses of all sizes.
              </p>
              <div className="mt-4 flex space-x-4">
              <a href="#" className="transition-colors hover:opacity-80">
  <svg className="h-5 w-5" fill="#1877F2" viewBox="0 0 24 24" aria-hidden="true">
  <path 
      fillRule="evenodd" 
      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" 
      clipRule="evenodd" 
    />
  </svg>
</a>

<a href="#" className="transition-colors hover:opacity-80">
  <svg className="h-5 w-5" fill="white" viewBox="0 0 1200 1227" xmlns="http://www.w3.org/2000/svg">
    <path d="M758.6 0H970L616.9 521.1 1156 1227H799.7L501.5 834.6 160.1 1227H0L382.5 658.3 0 0h375.5l268.2 368.5L758.6 0Zm63.3 1123.7h108.5L329.5 95.6H215.3L821.9 1123.7Z" />
  </svg>
</a>

                <a href="https://www.instagram.com/jii_ves?igsh=MTJsZjM1aGxmemswag==" className="transition-colors hover:opacity-80">
  <svg className="h-6 w-6" viewBox="0 0 24 24" aria-hidden="true">
    <defs>
      <linearGradient id="instagram-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f09433" />
        <stop offset="25%" stopColor="#e6683c" />
        <stop offset="50%" stopColor="#dc2743" />
        <stop offset="75%" stopColor="#cc2366" />
        <stop offset="100%" stopColor="#bc1888" />
      </linearGradient>
    </defs>
    <path 
      fill="url(#instagram-gradient)"
      fillRule="evenodd"
      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
      clipRule="evenodd"
    />
  </svg>
</a>

              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 text-sm text-center">
            <p>&copy; {new Date().getFullYear()} JeevaDev. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
