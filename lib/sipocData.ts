// lib/sipocData.ts
export interface SIPOCData {
    suppliers: string[];
    inputs: string[];
    process: string;
    outputs: string[];
    customers: string[];
    upstreamProcesses: string[];
    downstreamProcesses: string[];
  }
  
  export const dishHomeSIPOCData: Record<string, SIPOCData> = {
    // CEO Level Strategic Processes
    'ceo-strategic-transformation': {
      suppliers: [
        'Board of Directors',
        'Market Research Teams',
        'Financial Analysis Department',
        'Strategic Consulting Partners',
        'Industry Benchmarking Services'
      ],
      inputs: [
        'Board strategic directives',
        'Market analysis reports',
        'Financial performance data',
        'Competitive intelligence',
        'Stakeholder feedback',
        'Industry trend analysis'
      ],
      process: 'Strategic Business Transformation Leadership Process',
      outputs: [
        'Strategic transformation roadmap',
        'Executive alignment decisions',
        'Resource allocation priorities',
        'Performance targets',
        'Change management initiatives'
      ],
      customers: [
        'DishHome Stakeholders',
        'Board of Directors',
        'Executive Leadership Team',
        'Department Heads',
        'Investors and Shareholders'
      ],
      upstreamProcesses: [
        'Market Intelligence Gathering',
        'Financial Health Assessment',
        'Competitive Landscape Analysis',
        'Stakeholder Expectation Management'
      ],
      downstreamProcesses: [
        'Departmental Strategy Implementation',
        'Resource Deployment Process',
        'Performance Monitoring System',
        'Change Management Execution'
      ]
    },
  
    'ceo-customer-acquisition': {
      suppliers: [
        'Marketing Analytics Team',
        'Customer Research Division',
        'Sales Operations',
        'Digital Marketing Agencies',
        'Customer Success Teams'
      ],
      inputs: [
        'Customer acquisition strategies',
        'Market penetration analysis',
        'Customer lifetime value models',
        'Marketing campaign data',
        'Sales pipeline reports'
      ],
      process: '2 Million Customer Acquisition Strategy Process',
      outputs: [
        'Customer acquisition roadmap',
        'Marketing budget allocation',
        'Sales target distribution',
        'Customer success metrics',
        'Growth milestone tracking'
      ],
      customers: [
        'Marketing Department',
        'Sales Teams',
        'Customer Success Division',
        'Product Development',
        'Operations Teams'
      ],
      upstreamProcesses: [
        'Market Size Analysis',
        'Customer Segmentation Research',
        'Competitive Positioning Study',
        'Budget Planning Process'
      ],
      downstreamProcesses: [
        'Marketing Campaign Execution',
        'Sales Team Deployment',
        'Customer Onboarding Process',
        'Retention Strategy Implementation'
      ]
    },
  
    // COO Level Operational Processes
    'coo-network-optimization': {
      suppliers: [
        'Network Engineering Teams',
        'Infrastructure Vendors',
        'Monitoring System Providers',
        'Maintenance Service Partners',
        'Quality Assurance Teams'
      ],
      inputs: [
        'Network performance data',
        'Uptime monitoring reports',
        'Maintenance schedules',
        'Infrastructure capacity plans',
        'Quality metrics'
      ],
      process: 'Network Uptime Optimization Process',
      outputs: [
        '99.9% network uptime achievement',
        'Proactive maintenance schedules',
        'Performance optimization reports',
        'Infrastructure upgrade plans',
        'Quality assurance confirmations'
      ],
      customers: [
        'DishHome Customers',
        'Customer Service Teams',
        'Technical Support',
        'Sales Teams',
        'Management Dashboard'
      ],
      upstreamProcesses: [
        'Infrastructure Planning',
        'Capacity Forecasting',
        'Vendor Selection Process',
        'Maintenance Planning'
      ],
      downstreamProcesses: [
        'Customer Experience Delivery',
        'Technical Support Response',
        'Service Level Reporting',
        'Continuous Improvement Process'
      ]
    },
  
    'coo-customer-service': {
      suppliers: [
        'Customer Service Representatives',
        'Technical Support Teams',
        'Training Departments',
        'Customer Feedback Systems',
        'Service Management Tools'
      ],
      inputs: [
        'Customer service requests',
        'Technical support tickets',
        'Service level agreements',
        'Customer feedback data',
        'Training materials'
      ],
      process: 'Customer Service Response Time Optimization Process',
      outputs: [
        '4-hour average response time',
        'Customer satisfaction improvements',
        'Service quality metrics',
        'Staff performance reports',
        'Process improvement recommendations'
      ],
      customers: [
        'DishHome Customers',
        'Customer Experience Teams',
        'Management Reporting',
        'Quality Assurance',
        'Training Coordinators'
      ],
      upstreamProcesses: [
        'Staff Training and Development',
        'Service Standard Definition',
        'Technology Tool Implementation',
        'Performance Baseline Setting'
      ],
      downstreamProcesses: [
        'Customer Satisfaction Measurement',
        'Service Quality Assurance',
        'Continuous Training Process',
        'Performance Optimization'
      ]
    },
  
    // CFO Level Financial Processes
    'cfo-financial-recovery': {
      suppliers: [
        'Financial Planning Teams',
        'Revenue Operations',
        'Cost Management Division',
        'Investment Analysis Teams',
        'Audit and Compliance'
      ],
      inputs: [
        'Financial performance data',
        'Revenue forecasts',
        'Cost analysis reports',
        'Investment proposals',
        'Market financial trends'
      ],
      process: 'Financial Recovery and Profitability Process',
      outputs: [
        'Positive operating margin achievement',
        'Cost optimization strategies',
        'Revenue enhancement plans',
        'Investment allocation decisions',
        'Financial performance reports'
      ],
      customers: [
        'Board of Directors',
        'Executive Leadership',
        'Investors',
        'Department Heads',
        'Financial Stakeholders'
      ],
      upstreamProcesses: [
        'Financial Health Assessment',
        'Cost Structure Analysis',
        'Revenue Stream Evaluation',
        'Investment Opportunity Review'
      ],
      downstreamProcesses: [
        'Budget Implementation',
        'Cost Control Execution',
        'Revenue Growth Activities',
        'Financial Performance Monitoring'
      ]
    },
  
    'cfo-debt-optimization': {
      suppliers: [
        'Treasury Management',
        'Banking Partners',
        'Financial Advisory Services',
        'Credit Rating Agencies',
        'Investment Banking Teams'
      ],
      inputs: [
        'Debt portfolio analysis',
        'Interest rate forecasts',
        'Credit rating reports',
        'Refinancing options',
        'Capital structure recommendations'
      ],
      process: 'Debt-to-Equity Ratio Optimization Process',
      outputs: [
        'Optimal debt structure',
        'Refinancing strategies',
        'Credit rating improvements',
        'Interest cost reductions',
        'Capital efficiency gains'
      ],
      customers: [
        'Board of Directors',
        'Executive Leadership',
        'Banking Partners',
        'Credit Rating Agencies',
        'Investment Community'
      ],
      upstreamProcesses: [
        'Capital Structure Analysis',
        'Market Condition Assessment',
        'Banking Relationship Management',
        'Credit Rating Preparation'
      ],
      downstreamProcesses: [
        'Debt Restructuring Implementation',
        'Banking Relationship Optimization',
        'Credit Rating Monitoring',
        'Capital Cost Management'
      ]
    },
  
    // CIO Level Technology Infrastructure Processes
    'cio-platform-overhaul': {
      suppliers: [
        'White-label OTT Providers (ViewLift/VPlayed)',
        'Cloud Infrastructure Partners',
        'System Integration Teams',
        'Security Service Providers',
        'User Experience Designers'
      ],
      inputs: [
        'Technology requirements',
        'User experience specifications',
        'Security compliance standards',
        'Integration protocols',
        'Performance benchmarks'
      ],
      process: 'DHGO Platform Technology Overhaul Process',
      outputs: [
        'Stable and scalable DHGO platform',
        'Enhanced user experience',
        'Improved system performance',
        'Secure content delivery',
        'Multi-device compatibility'
      ],
      customers: [
        'DHGO Platform Users',
        'Content Teams',
        'Customer Support',
        'Marketing Teams',
        'Technical Operations'
      ],
      upstreamProcesses: [
        'Technology Vendor Selection',
        'Requirements Gathering',
        'Architecture Design',
        'Security Framework Planning'
      ],
      downstreamProcesses: [
        'User Training and Adoption',
        'Performance Monitoring',
        'Security Compliance Verification',
        'Continuous Platform Optimization'
      ]
    },
  
    'cio-digital-experience': {
      suppliers: [
        'Mobile App Development Teams',
        'Web Development Partners',
        'UX/UI Design Agencies',
        'Digital Analytics Providers',
        'Customer Feedback Systems'
      ],
      inputs: [
        'User experience requirements',
        'Mobile app specifications',
        'Web platform designs',
        'Analytics integration needs',
        'Customer feedback data'
      ],
      process: 'Digital Customer Experience Enhancement Process',
      outputs: [
        'Enhanced mobile applications',
        'Improved web platforms',
        'Unified digital experience',
        'Real-time analytics dashboards',
        'Customer satisfaction improvements'
      ],
      customers: [
        'DishHome Customers',
        'Customer Experience Teams',
        'Marketing Department',
        'Customer Support',
        'Product Management'
      ],
      upstreamProcesses: [
        'User Research and Analysis',
        'Digital Strategy Development',
        'Technology Stack Selection',
        'Design System Creation'
      ],
      downstreamProcesses: [
        'Digital Marketing Enablement',
        'Customer Support Enhancement',
        'User Behavior Analytics',
        'Continuous UX Optimization'
      ]
    },
  
    // CMO Level Customer Acquisition Processes
    'cmo-freemium-strategy': {
      suppliers: [
        'Content Strategy Teams',
        'Pricing Strategy Consultants',
        'Market Research Partners',
        'Customer Analytics Teams',
        'Competitive Intelligence'
      ],
      inputs: [
        'Market segmentation analysis',
        'Pricing sensitivity studies',
        'Content consumption patterns',
        'Competitive pricing models',
        'Customer acquisition costs'
      ],
      process: 'Freemium-Plus Monetization Strategy Process',
      outputs: [
        'Tiered pricing strategy',
        'Content allocation framework',
        'Customer conversion funnels',
        'Revenue optimization models',
        'Marketing campaign strategies'
      ],
      customers: [
        'Product Teams',
        'Sales Operations',
        'Customer Success',
        'Content Teams',
        'Revenue Operations'
      ],
      upstreamProcesses: [
        'Market Research and Analysis',
        'Customer Behavior Study',
        'Competitive Analysis',
        'Content Strategy Development'
      ],
      downstreamProcesses: [
        'Customer Acquisition Campaigns',
        'Conversion Optimization',
        'Customer Retention Programs',
        'Revenue Performance Tracking'
      ]
    },
  
    'cmo-content-strategy': {
      suppliers: [
        'Content Production Teams',
        'Local Content Creators',
        'Content Licensing Partners',
        'Digital Rights Management',
        'Content Analytics Providers'
      ],
      inputs: [
        'Content acquisition strategies',
        'Local content requirements',
        'Licensing agreements',
        'Audience preference data',
        'Content performance metrics'
      ],
      process: 'Hyper-Local Content Strategy Process',
      outputs: [
        'Exclusive content library',
        'Local content partnerships',
        'Content distribution plans',
        'Audience engagement metrics',
        'Content ROI analysis'
      ],
      customers: [
        'DHGO Platform Users',
        'Content Distribution Teams',
        'Customer Experience',
        'Product Management',
        'Revenue Operations'
      ],
      upstreamProcesses: [
        'Content Market Analysis',
        'Audience Research',
        'Content Creator Identification',
        'Licensing Strategy Development'
      ],
      downstreamProcesses: [
        'Content Production Management',
        'Distribution Optimization',
        'Audience Engagement Tracking',
        'Content Performance Analysis'
      ]
    },
  
    // CTO Level Technical Innovation Processes
    'cto-platform-architecture': {
      suppliers: [
        'Cloud Architecture Teams',
        'CDN Service Providers',
        'Database Management Teams',
        'Security Architecture Partners',
        'Performance Optimization Specialists'
      ],
      inputs: [
        'Scalability requirements',
        'Performance benchmarks',
        'Security specifications',
        'Integration protocols',
        'Disaster recovery plans'
      ],
      process: 'Scalable Platform Architecture Development Process',
      outputs: [
        'Scalable system architecture',
        'Performance optimization solutions',
        'Security implementation framework',
        'Disaster recovery systems',
        'Integration documentation'
      ],
      customers: [
        'Development Teams',
        'Operations Teams',
        'Security Teams',
        'Product Management',
        'Quality Assurance'
      ],
      upstreamProcesses: [
        'System Requirements Analysis',
        'Technology Stack Selection',
        'Architecture Planning',
        'Security Framework Design'
      ],
      downstreamProcesses: [
        'Development Implementation',
        'System Testing and Validation',
        'Performance Monitoring',
        'Security Compliance Verification'
      ]
    },
  
    'cto-ai-analytics': {
      suppliers: [
        'AI/ML Development Teams',
        'Data Science Partners',
        'Analytics Platform Providers',
        'Machine Learning Infrastructure',
        'Data Engineering Teams'
      ],
      inputs: [
        'User behavior data',
        'Content consumption patterns',
        'Customer preference analytics',
        'Performance metrics',
        'Business intelligence requirements'
      ],
      process: 'AI-Powered Analytics and Recommendations Process',
      outputs: [
        'Personalized recommendation engine',
        'Predictive analytics models',
        'Customer behavior insights',
        'Content optimization recommendations',
        'Business intelligence dashboards'
      ],
      customers: [
        'Product Teams',
        'Marketing Teams',
        'Content Teams',
        'Customer Success',
        'Executive Leadership'
      ],
      upstreamProcesses: [
        'Data Collection and Processing',
        'Machine Learning Model Development',
        'Analytics Framework Design',
        'Data Quality Assurance'
      ],
      downstreamProcesses: [
        'Recommendation System Deployment',
        'Customer Experience Personalization',
        'Marketing Campaign Optimization',
        'Business Intelligence Reporting'
      ]
    }
  };
  
  // Helper function to get SIPOC data by ID
  export const getSIPOCData = (id: string): SIPOCData | undefined => {
    return dishHomeSIPOCData[id];
  };
  
  // Helper function to get all SIPOC processes
  export const getAllSIPOCProcesses = (): string[] => {
    return Object.keys(dishHomeSIPOCData);
  };
  
  // Helper function to get SIPOC processes by executive
  export const getSIPOCByExecutive = (executive: string): Record<string, SIPOCData> => {
    const filtered: Record<string, SIPOCData> = {};
    Object.entries(dishHomeSIPOCData).forEach(([key, value]) => {
      if (key.startsWith(executive.toLowerCase())) {
        filtered[key] = value;
      }
    });
    return filtered;
  };