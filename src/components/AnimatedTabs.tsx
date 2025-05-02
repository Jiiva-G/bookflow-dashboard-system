
import { useState, ReactNode, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export type TabItem = {
  value: string;
  label: string;
  content: ReactNode;
};

type AnimatedTabsProps = {
  tabs: TabItem[];
  defaultValue?: string;
  className?: string;
  variant?: 'default' | 'underline' | 'pills';
};

export function AnimatedTabs({ 
  tabs, 
  defaultValue, 
  className = '',
  variant = 'default'
}: AnimatedTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue || tabs[0]?.value);
  const [previousTab, setPreviousTab] = useState<string | null>(null);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  useEffect(() => {
    // Determine animation direction based on tab position
    if (previousTab && activeTab) {
      const prevIndex = tabs.findIndex(tab => tab.value === previousTab);
      const activeIndex = tabs.findIndex(tab => tab.value === activeTab);
      
      if (prevIndex < activeIndex) {
        setDirection('right');
      } else {
        setDirection('left');
      }
    }
  }, [activeTab, previousTab, tabs]);

  const handleTabChange = (value: string) => {
    setPreviousTab(activeTab);
    setActiveTab(value);
  };

  // Get styles for different tab variants
  const getTabListStyles = () => {
    switch (variant) {
      case 'underline':
        return 'bg-transparent border-b border-gray-200 dark:border-gray-700 px-0';
      case 'pills':
        return 'bg-muted/50 gap-2';
      default:
        return 'bg-muted';
    }
  };

  const getTabTriggerStyles = () => {
    switch (variant) {
      case 'underline':
        return `data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4`;
      case 'pills':
        return 'data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full';
      default:
        return `relative after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[2px] 
                after:bg-primary after:scale-x-0 after:transition-transform after:duration-300 
                data-[state=active]:after:scale-x-100`;
    }
  };

  return (
    <Tabs 
      defaultValue={activeTab} 
      className={className} 
      onValueChange={handleTabChange}
    >
      <TabsList className={`w-full flex overflow-x-auto md:overflow-visible mb-2 ${getTabListStyles()}`}>
        {tabs.map((tab) => (
          <TabsTrigger 
            key={tab.value} 
            value={tab.value}
            className={`flex-1 transition-all duration-300 ${getTabTriggerStyles()}`}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent 
          key={tab.value} 
          value={tab.value}
          className={`data-[state=active]:animate-${direction === 'right' ? 'slideInRight' : 'slideInLeft'} transition-all duration-300`}
        >
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}

export default AnimatedTabs;
