
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import ScrollReveal from "../components/ScrollReveal";
import AnimatedTabs from "../components/AnimatedTabs";
import CodeBlock from "../components/CodeBlock";
import AnimatedToggle from "../components/AnimatedToggle";
import { toast } from "sonner";

const DesignSystem = () => {
  const navigate = useNavigate();
  const [isToggled, setIsToggled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [tabVariant, setTabVariant] = useState<'default' | 'underline' | 'pills'>('default');

  // Animation on mount
  useEffect(() => {
    setMounted(true);
    
    // Add reveal animation to sections when they come into view
    const revealElements = document.querySelectorAll('.reveal-text');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    revealElements.forEach(elem => observer.observe(elem));
    
    return () => {
      revealElements.forEach(elem => observer.unobserve(elem));
    };
  }, []);

  const sampleCode = `// A simple React component
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="counter">
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`;

  // Example tabs for the AnimatedTabs component
  const tabs = [
    {
      value: 'react',
      label: 'React',
      content: <CodeBlock code={sampleCode} language="typescript" filename="Counter.tsx" highlightedLines={[4, 8]} />
    },
    {
      value: 'vue',
      label: 'Vue',
      content: (
        <CodeBlock 
          code={`<template>
  <div class="counter">
    <h2>Count: {{ count }}</h2>
    <button @click="count++">Increment</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const count = ref(0);
</script>`} 
          language="html" 
          filename="Counter.vue"
          highlightedLines={[3, 10]} 
        />
      )
    },
    {
      value: 'svelte',
      label: 'Svelte',
      content: (
        <CodeBlock 
          code={`<script>
  let count = 0;
  
  function increment() {
    count += 1;
  }
</script>

<div class="counter">
  <h2>Count: {count}</h2>
  <button on:click={increment}>
    Increment
  </button>
</div>`} 
          language="svelte" 
          filename="Counter.svelte"
          highlightedLines={[2, 10]} 
        />
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-900 dark:to-slate-900">
      {/* Header */}
      <header className={`fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 transition-all duration-300 ease-in-out ${mounted ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg animate-pulse-glow">
                <span className="text-lg font-bold text-white">V</span>
              </div>
              <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">ViteClone</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <a href="#animations" className="text-sm font-medium hover:text-blue-500 transition-colors">Animations</a>
              <a href="#components" className="text-sm font-medium hover:text-blue-500 transition-colors">Components</a>
              <a href="#code" className="text-sm font-medium hover:text-blue-500 transition-colors">Code</a>
              <a href="#microinteractions" className="text-sm font-medium hover:text-blue-500 transition-colors">Microinteractions</a>
            </div>
            
            <div className="relative">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 menu-icon-transition"
                aria-label="Toggle menu"
              >
                <div className="w-6 h-6 flex flex-col justify-between items-center">
                  <span className={`w-full h-0.5 bg-current transform transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
                  <span className={`w-full h-0.5 bg-current transition-opacity ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                  <span className={`w-full h-0.5 bg-current transform transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
                </div>
              </button>
              
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 animate-fade-in">
                  <a href="#animations" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Animations</a>
                  <a href="#components" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Components</a>
                  <a href="#code" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Code</a>
                  <a href="#microinteractions" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Microinteractions</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className={`inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-600 text-sm font-medium ${mounted ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
              Modern UI Design
            </div>
            
            <h1 className={`text-4xl md:text-6xl font-bold tracking-tight ${mounted ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '400ms' }}>
              Smooth, <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">Minimalistic</span> Animations
            </h1>
            
            <p className={`text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto ${mounted ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '600ms' }}>
              A collection of fast, non-distracting, mobile-friendly animations to enhance user experience.
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-4 justify-center ${mounted ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '800ms' }}>
              <Button size="lg" className="glow-button bg-blue-600 hover:bg-blue-700 micro-bounce">
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="micro-bounce">
                View on GitHub
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Animation showcase */}
      <section id="animations" className="py-16 bg-white dark:bg-gray-900">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl font-bold mb-12 text-center">Page Load Animations</h2>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-3 gap-8">
            <ScrollReveal animation="fade-in" delay={100}>
              <Card className="hover-card">
                <CardHeader>
                  <CardTitle>Fade In</CardTitle>
                  <CardDescription>Subtle fade-in animation for a clean loading feel</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-32 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
                    <span className="animate-fade-in">Element fades in</span>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
            
            <ScrollReveal animation="slide-left" delay={300}>
              <Card className="hover-card">
                <CardHeader>
                  <CardTitle>Slide Left</CardTitle>
                  <CardDescription>Elements slide in from the right</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-32 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
                    <span className="scroll-slide-left visible">Element slides in</span>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
            
            <ScrollReveal animation="slide-up" delay={500}>
              <Card className="hover-card">
                <CardHeader>
                  <CardTitle>Slide Up</CardTitle>
                  <CardDescription>Elements slide up into view</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-32 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
                    <span className="scroll-slide-right visible">Element slides up</span>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Hover effects */}
      <section id="components" className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl font-bold mb-12 text-center">Hover Effects</h2>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-3 gap-8">
            <ScrollReveal animation="fade-in">
              <Card className="hover-card">
                <CardHeader>
                  <CardTitle>Card Hover</CardTitle>
                  <CardDescription>Cards lift up on hover with a shadow effect</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-32 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
                    <span>Hover over this card</span>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
            
            <ScrollReveal animation="fade-in" delay={200}>
              <Card className="hover-card">
                <CardHeader>
                  <CardTitle>Button Hover</CardTitle>
                  <CardDescription>Buttons with glow effect on hover</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <Button className="glow-button">Hover Me</Button>
                  <Button variant="outline" className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors">Subtle Hover</Button>
                </CardContent>
              </Card>
            </ScrollReveal>
            
            <ScrollReveal animation="fade-in" delay={400}>
              <Card className="hover-card">
                <CardHeader>
                  <CardTitle>Tooltip Hover</CardTitle>
                  <CardDescription>Elements with tooltips on hover</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button variant="outline">Hover for info</Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="animate-fade-in w-80">
                      <div className="flex justify-between space-x-4">
                        <div className="space-y-1">
                          <h4 className="text-sm font-semibold">Hover Card</h4>
                          <p className="text-sm">
                            This is a hover card that appears when you hover over the trigger.
                          </p>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Code blocks/tabs */}
      <section id="code" className="py-16 bg-white dark:bg-gray-900">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl font-bold mb-12 text-center">Animated Tab Transitions</h2>
          </ScrollReveal>
          
          <ScrollReveal>
            <div className="mb-6 flex justify-center space-x-4">
              <Button 
                variant={tabVariant === 'default' ? 'default' : 'outline'} 
                onClick={() => setTabVariant('default')}
                size="sm"
              >
                Default
              </Button>
              <Button 
                variant={tabVariant === 'underline' ? 'default' : 'outline'} 
                onClick={() => setTabVariant('underline')}
                size="sm"
              >
                Underline
              </Button>
              <Button 
                variant={tabVariant === 'pills' ? 'default' : 'outline'} 
                onClick={() => setTabVariant('pills')}
                size="sm"
              >
                Pills
              </Button>
            </div>

            <div className="max-w-3xl mx-auto">
              <AnimatedTabs tabs={tabs} variant={tabVariant} />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Microinteractions */}
      <section id="microinteractions" className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl font-bold mb-12 text-center">Microinteractions</h2>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <ScrollReveal animation="slide-left">
              <Card className="hover-card">
                <CardHeader>
                  <CardTitle>Toggle Switch</CardTitle>
                  <CardDescription>Smooth transition for toggle UI elements</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <AnimatedToggle 
                    checked={isToggled} 
                    onCheckedChange={setIsToggled} 
                    label="Standard Toggle"
                    description="Default size toggle switch"
                  />
                  
                  <AnimatedToggle 
                    checked={isToggled} 
                    onCheckedChange={setIsToggled} 
                    label="Small Toggle"
                    description="Compact size for tight spaces"
                    size="sm"
                  />
                  
                  <AnimatedToggle 
                    checked={isToggled} 
                    onCheckedChange={setIsToggled} 
                    label="Large Toggle"
                    description="Larger size for emphasis"
                    size="lg"
                  />
                </CardContent>
              </Card>
            </ScrollReveal>
            
            <ScrollReveal animation="slide-right">
              <Card className="hover-card">
                <CardHeader>
                  <CardTitle>Toast Notifications</CardTitle>
                  <CardDescription>Animated notifications that slide in</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <Button 
                    onClick={() => toast("Action completed", {
                      description: "The action was completed successfully."
                    })}
                    className="micro-bounce"
                  >
                    Show Success Toast
                  </Button>
                  
                  <Button 
                    onClick={() => toast.error("Action failed", {
                      description: "There was an error completing your action."
                    })}
                    variant="destructive"
                    className="micro-bounce"
                  >
                    Show Error Toast
                  </Button>
                  
                  <Button 
                    onClick={() => toast.info("Information", {
                      description: "This is an informational message."
                    })}
                    variant="outline"
                    className="micro-bounce"
                  >
                    Show Info Toast
                  </Button>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-in">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to use these animations?</h2>
              <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-8">
                Add smooth, minimalistic animations to your website with our lightweight utilities.
              </p>
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-50 micro-bounce"
                onClick={() => navigate('/')}
              >
                Back to Home
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default DesignSystem;
