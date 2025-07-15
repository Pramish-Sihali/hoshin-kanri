// lib/dummyData.ts
import { StrategicObjective, AnnualObjective, Process, Metric, CatchballItem, HoshinData } from '../types/hoshin';

// CEO - Strategic Vision & Governance (Level 1)
export const ceoData: HoshinData = {
  strategicObjectives: [
    {
      id: 'ceo-strategic-1',
      title: 'Transform DHGO from Liability to Strategic Asset',
      description: 'Complete transformation of DHGO platform from current failing state to core strategic asset driving growth, customer retention, and revenue diversification for DishHome.',
      targetYear: 2027,
      owner: 'Chief Executive Officer',
      status: 'in-progress',
      priority: 'high'
    },
    {
      id: 'ceo-strategic-2',
      title: 'Achieve 2 Million Customer Milestone',
      description: 'Execute comprehensive customer acquisition strategy to reach 2 million active DHGO users within 12 months through systematic conversion of existing base and market expansion.',
      targetYear: 2025,
      owner: 'Chief Executive Officer',
      status: 'in-progress',
      priority: 'high'
    },
    {
      id: 'ceo-strategic-3',
      title: 'Return to Sustainable Profitability',
      description: 'Achieve positive operating margin and sustainable financial performance through DHGO revenue growth, cost optimization, and strategic business model transformation.',
      targetYear: 2026,
      owner: 'Chief Executive Officer',
      status: 'at-risk',
      priority: 'high'
    },
    {
      id: 'ceo-strategic-4',
      title: 'Establish Digital Market Leadership',
      description: 'Position DishHome as Nepal\'s leading digital entertainment and connectivity provider through integrated DTH, ISP, and OTT service excellence.',
      targetYear: 2028,
      owner: 'Chief Executive Officer',
      status: 'planning',
      priority: 'high'
    }
  ],
  annualObjectives: [
    {
      id: 'ceo-annual-1',
      title: 'Execute Strategic Transformation Roadmap',
      description: 'Implement comprehensive strategic transformation plan with clear milestones, resource allocation, and performance tracking across all business units.',
      strategicObjectiveIds: ['ceo-strategic-1', 'ceo-strategic-4'],
      targetDate: '2025-12-31',
      owner: 'Chief Executive Officer',
      status: 'in-progress',
      progress: 65
    },
    {
      id: 'ceo-annual-2',
      title: 'Achieve 1.2M Customer Conversion from Existing Base',
      description: 'Convert 60% of existing DTH and ISP customers to DHGO platform through aggressive bundling and value-added service strategies.',
      strategicObjectiveIds: ['ceo-strategic-2'],
      targetDate: '2025-09-30',
      owner: 'Chief Executive Officer',
      status: 'in-progress',
      progress: 58
    }
  ],
  processes: [
    {
      id: 'ceo-process-1',
      title: 'Strategic Transformation Leadership',
      description: 'Executive leadership process for driving organizational transformation with clear accountability and milestone tracking.',
      annualObjectiveIds: ['ceo-annual-1'],
      owner: 'Chief Executive Officer',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      status: 'in-progress',
      resources: ['Executive team', 'Strategic consultants', 'Change management', 'Performance dashboards']
    }
  ],
  metrics: [
    {
      id: 'ceo-metric-1',
      name: 'Strategic Objective Completion Rate',
      description: 'Percentage of strategic objectives completed on time and within budget',
      processIds: ['ceo-process-1'],
      target: 90,
      current: 65,
      unit: '% completion',
      frequency: 'quarterly',
      owner: 'Chief Executive Officer'
    },
    {
      id: 'ceo-metric-2',
      name: 'Customer Base Growth Rate',
      description: 'Total active customer growth across all DishHome services',
      processIds: ['ceo-process-1'],
      target: 2000000,
      current: 1200000,
      unit: 'customers',
      frequency: 'monthly',
      owner: 'Chief Executive Officer'
    }
  ],
  catchball: [
    {
      id: 'ceo-catchball-1',
      type: 'approval',
      title: 'Additional Budget for Technology Overhaul',
      description: 'CIO requests additional $500K for white-label OTT platform implementation to ensure quality and timeline adherence.',
      from: 'Chief Information Officer',
      to: 'Chief Executive Officer',
      relatedItemId: 'ceo-strategic-1',
      relatedItemType: 'strategic',
      status: 'pending',
      createdAt: '2025-07-10T09:00:00Z',
      responses: [
        {
          id: 'ceo-response-1',
          message: 'Approved. Technology foundation is critical for success. Let\'s ensure we select the right partner and maintain quality standards.',
          author: 'Chief Executive Officer',
          createdAt: '2025-07-10T14:30:00Z'
        }
      ]
    }
  ]
};

// COO - Operational Excellence & Service Delivery (Level 2)
export const cooData: HoshinData = {
  strategicObjectives: [
    {
      id: 'coo-strategic-1',
      title: 'Achieve World-Class Service Delivery Standards',
      description: 'Implement comprehensive service excellence framework achieving 99.9% network uptime and 4-hour average customer support response time.',
      targetYear: 2026,
      owner: 'Chief Operating Officer',
      status: 'in-progress',
      priority: 'high'
    },
    {
      id: 'coo-strategic-2',
      title: 'Optimize Customer Experience Operations',
      description: 'Transform customer service operations to achieve 90% customer satisfaction and reduce churn through operational excellence.',
      targetYear: 2026,
      owner: 'Chief Operating Officer',
      status: 'in-progress',
      priority: 'high'
    }
  ],
  annualObjectives: [
    {
      id: 'coo-annual-1',
      title: 'Implement Service Level Agreement Program',
      description: 'Deploy comprehensive SLA program with service guarantees, compensation mechanisms, and performance tracking similar to WorldLink\'s "2तै" program.',
      strategicObjectiveIds: ['coo-strategic-1'],
      targetDate: '2025-08-31',
      owner: 'Chief Operating Officer',
      status: 'in-progress',
      progress: 72
    },
    {
      id: 'coo-annual-2',
      title: 'Achieve 4-Hour Support Response Time',
      description: 'Reduce average customer support response time from current 8 hours to 4 hours through process optimization and resource allocation.',
      strategicObjectiveIds: ['coo-strategic-2'],
      targetDate: '2025-10-31',
      owner: 'Chief Operating Officer',
      status: 'in-progress',
      progress: 68
    },
    {
      id: 'coo-annual-3',
      title: 'Deploy 99.9% Network Uptime Infrastructure',
      description: 'Implement network monitoring, redundancy, and maintenance systems to achieve industry-leading 99.9% uptime.',
      strategicObjectiveIds: ['coo-strategic-1'],
      targetDate: '2025-11-30',
      owner: 'Chief Operating Officer',
      status: 'in-progress',
      progress: 75
    }
  ],
  processes: [
    {
      id: 'coo-process-1',
      title: 'Network Uptime Optimization',
      description: 'Comprehensive network monitoring and maintenance process ensuring maximum uptime and service reliability.',
      annualObjectiveIds: ['coo-annual-3'],
      owner: 'Network Operations Manager',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      status: 'in-progress',
      resources: ['Network engineers', 'Monitoring tools', 'Maintenance teams', 'Backup systems']
    },
    {
      id: 'coo-process-2',
      title: 'Customer Service Response Optimization',
      description: 'Streamlined customer service process with priority queuing, automated routing, and performance tracking.',
      annualObjectiveIds: ['coo-annual-1', 'coo-annual-2'],
      owner: 'Customer Service Manager',
      startDate: '2025-02-01',
      endDate: '2025-10-31',
      status: 'in-progress',
      resources: ['Service representatives', 'Ticketing system', 'Training programs', 'Performance dashboards']
    }
  ],
  metrics: [
    {
      id: 'coo-metric-1',
      name: 'Network Uptime Percentage',
      description: 'Percentage of time network services are operational and accessible',
      processIds: ['coo-process-1'],
      target: 99.9,
      current: 98.2,
      unit: '% uptime',
      frequency: 'daily',
      owner: 'Network Operations Manager'
    },
    {
      id: 'coo-metric-2',
      name: 'Customer Support Response Time',
      description: 'Average time to first response for customer support tickets',
      processIds: ['coo-process-2'],
      target: 4,
      current: 6.5,
      unit: 'hours',
      frequency: 'daily',
      owner: 'Customer Service Manager'
    },
    {
      id: 'coo-metric-3',
      name: 'Customer Satisfaction Score',
      description: 'Overall customer satisfaction rating based on service experience',
      processIds: ['coo-process-2'],
      target: 90,
      current: 78,
      unit: '% satisfaction',
      frequency: 'monthly',
      owner: 'Customer Experience Manager'
    }
  ],
  catchball: [
    {
      id: 'coo-catchball-1',
      type: 'concern',
      title: 'Staff Training Requirements for New SLA Program',
      description: 'Customer service team needs comprehensive training on new SLA procedures and compensation mechanisms. Current staff may need additional support.',
      from: 'Customer Service Manager',
      to: 'Chief Operating Officer',
      relatedItemId: 'coo-annual-1',
      relatedItemType: 'annual',
      status: 'pending',
      createdAt: '2025-07-09T11:30:00Z',
      responses: [
        {
          id: 'coo-response-1',
          message: 'Approved for additional training budget. Let\'s bring in external trainers and create comprehensive certification program.',
          author: 'Chief Operating Officer',
          createdAt: '2025-07-09T16:45:00Z'
        }
      ]
    }
  ]
};

// CFO - Financial Transformation & Resource Optimization (Level 2)
export const cfoData: HoshinData = {
  strategicObjectives: [
    {
      id: 'cfo-strategic-1',
      title: 'Achieve Sustainable Financial Recovery',
      description: 'Return to positive operating margin within 12 months through revenue optimization, cost management, and strategic financial restructuring.',
      targetYear: 2026,
      owner: 'Chief Financial Officer',
      status: 'at-risk',
      priority: 'high'
    },
    {
      id: 'cfo-strategic-2',
      title: 'Optimize Capital Structure and Debt Management',
      description: 'Reduce debt-to-equity ratio to under 2.0x and optimize capital allocation for sustainable growth and profitability.',
      targetYear: 2026,
      owner: 'Chief Financial Officer',
      status: 'in-progress',
      priority: 'high'
    }
  ],
  annualObjectives: [
    {
      id: 'cfo-annual-1',
      title: 'Return to Positive Operating Margin',
      description: 'Achieve positive operating margin by Q4 2025 through revenue growth from DHGO and cost optimization across all business units.',
      strategicObjectiveIds: ['cfo-strategic-1'],
      targetDate: '2025-12-31',
      owner: 'Chief Financial Officer',
      status: 'in-progress',
      progress: 58
    },
    {
      id: 'cfo-annual-2',
      title: 'Increase ARPU by 15% Through Premium Services',
      description: 'Implement premium service tiers and bundling strategies to increase average revenue per user across DTH, ISP, and DHGO services.',
      strategicObjectiveIds: ['cfo-strategic-1'],
      targetDate: '2025-11-30',
      owner: 'Chief Financial Officer',
      status: 'in-progress',
      progress: 62
    },
    {
      id: 'cfo-annual-3',
      title: 'Reduce Debt-to-Equity Ratio to 2.0x',
      description: 'Implement debt restructuring and equity optimization strategies to achieve target debt-to-equity ratio of 2.0x or lower.',
      strategicObjectiveIds: ['cfo-strategic-2'],
      targetDate: '2025-12-31',
      owner: 'Chief Financial Officer',
      status: 'in-progress',
      progress: 45
    }
  ],
  processes: [
    {
      id: 'cfo-process-1',
      title: 'Financial Recovery and Profitability Management',
      description: 'Comprehensive financial management process focusing on revenue optimization, cost control, and profitability improvement.',
      annualObjectiveIds: ['cfo-annual-1', 'cfo-annual-2'],
      owner: 'Financial Planning Manager',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      status: 'in-progress',
      resources: ['Financial analysts', 'Budget management', 'Revenue operations', 'Cost control systems']
    },
    {
      id: 'cfo-process-2',
      title: 'Debt Restructuring and Capital Optimization',
      description: 'Strategic debt management and capital structure optimization process for sustainable financial health.',
      annualObjectiveIds: ['cfo-annual-3'],
      owner: 'Treasury Manager',
      startDate: '2025-02-01',
      endDate: '2025-12-31',
      status: 'in-progress',
      resources: ['Treasury team', 'Banking partners', 'Financial advisors', 'Legal support']
    }
  ],
  metrics: [
    {
      id: 'cfo-metric-1',
      name: 'Operating Margin Percentage',
      description: 'Operating income as percentage of total revenue',
      processIds: ['cfo-process-1'],
      target: 5,
      current: -8.5,
      unit: '% margin',
      frequency: 'monthly',
      owner: 'Chief Financial Officer'
    },
    {
      id: 'cfo-metric-2',
      name: 'Average Revenue Per User (ARPU)',
      description: 'Average monthly revenue generated per customer across all services',
      processIds: ['cfo-process-1'],
      target: 850,
      current: 742,
      unit: 'NPR/month',
      frequency: 'monthly',
      owner: 'Revenue Operations Manager'
    },
    {
      id: 'cfo-metric-3',
      name: 'Debt-to-Equity Ratio',
      description: 'Ratio of total debt to total equity',
      processIds: ['cfo-process-2'],
      target: 2.0,
      current: 2.87,
      unit: 'ratio',
      frequency: 'quarterly',
      owner: 'Treasury Manager'
    }
  ],
  catchball: [
    {
      id: 'cfo-catchball-1',
      type: 'question',
      title: 'DHGO Revenue Recognition Model',
      description: 'Need clarification on revenue recognition for DHGO freemium model - how should we account for AVOD, SVOD, and TVOD revenues?',
      from: 'Revenue Operations Manager',
      to: 'Chief Financial Officer',
      relatedItemId: 'cfo-annual-1',
      relatedItemType: 'annual',
      status: 'addressed',
      createdAt: '2025-07-08T13:20:00Z',
      responses: [
        {
          id: 'cfo-response-1',
          message: 'Let\'s implement separate revenue streams: AVOD as advertising revenue, SVOD as subscription revenue, TVOD as transactional revenue. I\'ll coordinate with external auditors for compliance.',
          author: 'Chief Financial Officer',
          createdAt: '2025-07-08T17:15:00Z'
        }
      ]
    }
  ]
};

// CIO - Technology Infrastructure & Digital Transformation (Level 2)
export const cioData: HoshinData = {
  strategicObjectives: [
    {
      id: 'cio-strategic-1',
      title: 'Complete DHGO Platform Technology Overhaul',
      description: 'Partner with white-label OTT provider to completely rebuild DHGO platform with world-class stability, scalability, and user experience.',
      targetYear: 2025,
      owner: 'Chief Information Officer',
      status: 'in-progress',
      priority: 'high'
    },
    {
      id: 'cio-strategic-2',
      title: 'Digitize Customer Experience Infrastructure',
      description: 'Deploy comprehensive digital infrastructure for customer service, self-service capabilities, and mobile-first experiences.',
      targetYear: 2026,
      owner: 'Chief Information Officer',
      status: 'in-progress',
      priority: 'high'
    }
  ],
  annualObjectives: [
    {
      id: 'cio-annual-1',
      title: 'Deploy White-Label OTT Platform (ViewLift/VPlayed)',
      description: 'Complete selection, implementation, and deployment of white-label OTT platform with full customization and integration.',
      strategicObjectiveIds: ['cio-strategic-1'],
      targetDate: '2025-09-30',
      owner: 'Chief Information Officer',
      status: 'in-progress',
      progress: 68
    },
    {
      id: 'cio-annual-2',
      title: 'Enhance Mobile App and Web Experience',
      description: 'Deploy redesigned mobile applications and web platforms with improved UX, self-service capabilities, and digital customer support.',
      strategicObjectiveIds: ['cio-strategic-2'],
      targetDate: '2025-11-30',
      owner: 'Chief Information Officer',
      status: 'in-progress',
      progress: 55
    },
    {
      id: 'cio-annual-3',
      title: 'Implement Digital Customer Service Platform',
      description: 'Deploy comprehensive digital customer service platform with AI chatbots, knowledge base, and integrated ticketing system.',
      strategicObjectiveIds: ['cio-strategic-2'],
      targetDate: '2025-10-31',
      owner: 'Chief Information Officer',
      status: 'in-progress',
      progress: 62
    }
  ],
  processes: [
    {
      id: 'cio-process-1',
      title: 'DHGO Platform Technology Overhaul',
      description: 'Complete technology transformation process including vendor selection, implementation, testing, and deployment.',
      annualObjectiveIds: ['cio-annual-1'],
      owner: 'Platform Development Manager',
      startDate: '2025-01-01',
      endDate: '2025-09-30',
      status: 'in-progress',
      resources: ['Development team', 'QA engineers', 'External vendors', 'Integration specialists']
    },
    {
      id: 'cio-process-2',
      title: 'Digital Customer Experience Enhancement',
      description: 'Development and deployment of digital customer experience platforms and self-service capabilities.',
      annualObjectiveIds: ['cio-annual-2', 'cio-annual-3'],
      owner: 'Digital Experience Manager',
      startDate: '2025-02-01',
      endDate: '2025-11-30',
      status: 'in-progress',
      resources: ['UX designers', 'Mobile developers', 'Web developers', 'Digital analysts']
    }
  ],
  metrics: [
    {
      id: 'cio-metric-1',
      name: 'Platform Stability (App Crash Rate)',
      description: 'Percentage of app sessions that end in crashes or errors',
      processIds: ['cio-process-1'],
      target: 0.1,
      current: 8.5,
      unit: '% crash rate',
      frequency: 'daily',
      owner: 'Platform Development Manager'
    },
    {
      id: 'cio-metric-2',
      name: 'Digital Self-Service Adoption',
      description: 'Percentage of customer inquiries resolved through self-service channels',
      processIds: ['cio-process-2'],
      target: 65,
      current: 28,
      unit: '% self-service',
      frequency: 'weekly',
      owner: 'Digital Experience Manager'
    },
    {
      id: 'cio-metric-3',
      name: 'Mobile App User Rating',
      description: 'Average user rating on app stores (iOS and Android)',
      processIds: ['cio-process-2'],
      target: 4.5,
      current: 2.8,
      unit: 'rating (1-5)',
      frequency: 'weekly',
      owner: 'Mobile Development Manager'
    }
  ],
  catchball: [
    {
      id: 'cio-catchball-1',
      type: 'suggestion',
      title: 'Integration with Existing DTH and ISP Systems',
      description: 'Recommend implementing unified customer authentication system across DHGO, DTH, and ISP services for seamless user experience.',
      from: 'Platform Development Manager',
      to: 'Chief Information Officer',
      relatedItemId: 'cio-annual-1',
      relatedItemType: 'annual',
      status: 'pending',
      createdAt: '2025-07-11T10:45:00Z',
      responses: [
        {
          id: 'cio-response-1',
          message: 'Excellent idea! Single sign-on across all services will significantly improve user experience. Let\'s prioritize this in Phase 2 development.',
          author: 'Chief Information Officer',
          createdAt: '2025-07-11T15:20:00Z'
        }
      ]
    }
  ]
};

// CMO - Customer Acquisition & Brand Positioning (Level 2)
export const cmoData: HoshinData = {
  strategicObjectives: [
    {
      id: 'cmo-strategic-1',
      title: 'Execute 2 Million Customer Acquisition Strategy',
      description: 'Implement comprehensive customer acquisition strategy targeting 2 million DHGO users through phased approach and cross-leverage with existing customer base.',
      targetYear: 2025,
      owner: 'Chief Marketing Officer',
      status: 'in-progress',
      priority: 'high'
    },
    {
      id: 'cmo-strategic-2',
      title: 'Establish Hyper-Local Content Leadership',
      description: 'Position DHGO as the exclusive destination for premium Nepali content through strategic content acquisition and local partnerships.',
      targetYear: 2026,
      owner: 'Chief Marketing Officer',
      status: 'in-progress',
      priority: 'high'
    }
  ],
  annualObjectives: [
    {
      id: 'cmo-annual-1',
      title: 'Implement Freemium-Plus Monetization Model',
      description: 'Deploy hybrid AVOD-SVOD-TVOD model with tiered pricing and strategic content distribution across free and premium tiers.',
      strategicObjectiveIds: ['cmo-strategic-1'],
      targetDate: '2025-08-31',
      owner: 'Chief Marketing Officer',
      status: 'in-progress',
      progress: 72
    },
    {
      id: 'cmo-annual-2',
      title: 'Secure Exclusive Rights to 10 Major Nepali Films',
      description: 'Acquire exclusive digital streaming rights for 10 top-grossing Nepali films for first-window digital premieres on DHGO.',
      strategicObjectiveIds: ['cmo-strategic-2'],
      targetDate: '2025-12-31',
      owner: 'Chief Marketing Officer',
      status: 'in-progress',
      progress: 68
    },
    {
      id: 'cmo-annual-3',
      title: 'Convert 60% of Existing DishHome Customers',
      description: 'Achieve 60% activation rate from existing DTH and ISP customer base through bundling, incentives, and value-added services.',
      strategicObjectiveIds: ['cmo-strategic-1'],
      targetDate: '2025-10-31',
      owner: 'Chief Marketing Officer',
      status: 'in-progress',
      progress: 55
    }
  ],
  processes: [
    {
      id: 'cmo-process-1',
      title: 'Freemium-Plus Strategy Implementation',
      description: 'Comprehensive monetization strategy process including pricing, content allocation, and customer conversion optimization.',
      annualObjectiveIds: ['cmo-annual-1'],
      owner: 'Monetization Strategy Manager',
      startDate: '2025-01-01',
      endDate: '2025-08-31',
      status: 'in-progress',
      resources: ['Pricing analysts', 'Content strategists', 'Customer research', 'A/B testing tools']
    },
    {
      id: 'cmo-process-2',
      title: 'Hyper-Local Content Acquisition',
      description: 'Strategic content acquisition and partnership development process for exclusive Nepali content library.',
      annualObjectiveIds: ['cmo-annual-2'],
      owner: 'Content Acquisition Manager',
      startDate: '2025-02-01',
      endDate: '2025-12-31',
      status: 'in-progress',
      resources: ['Content negotiators', 'Legal team', 'Market researchers', 'Local partners']
    }
  ],
  metrics: [
    {
      id: 'cmo-metric-1',
      name: 'Customer Acquisition Rate',
      description: 'Number of new customers acquired per month',
      processIds: ['cmo-process-1'],
      target: 150000,
      current: 85000,
      unit: 'customers/month',
      frequency: 'monthly',
      owner: 'Customer Acquisition Manager'
    },
    {
      id: 'cmo-metric-2',
      name: 'Content Engagement Rate',
      description: 'Average time spent watching content per user session',
      processIds: ['cmo-process-2'],
      target: 45,
      current: 28,
      unit: 'minutes/session',
      frequency: 'weekly',
      owner: 'Content Strategy Manager'
    },
    {
      id: 'cmo-metric-3',
      name: 'Conversion Rate (Free to Premium)',
      description: 'Percentage of free users converting to premium subscriptions',
      processIds: ['cmo-process-1'],
      target: 15,
      current: 8.5,
      unit: '% conversion',
      frequency: 'monthly',
      owner: 'Monetization Strategy Manager'
    }
  ],
  catchball: [
    {
      id: 'cmo-catchball-1',
      type: 'concern',
      title: 'Content Acquisition Budget Constraints',
      description: 'Current budget may not be sufficient to secure exclusive rights for all 10 targeted major Nepali films. Need additional funding or revised strategy.',
      from: 'Content Acquisition Manager',
      to: 'Chief Marketing Officer',
      relatedItemId: 'cmo-annual-2',
      relatedItemType: 'annual',
      status: 'pending',
      createdAt: '2025-07-10T14:30:00Z',
      responses: [
        {
          id: 'cmo-response-1',
          message: 'Let\'s prioritize top 5 films for exclusive rights and negotiate revenue-sharing deals for the others. I\'ll coordinate with CFO for budget adjustment.',
          author: 'Chief Marketing Officer',
          createdAt: '2025-07-10T18:15:00Z'
        }
      ]
    }
  ]
};

// CTO - Technical Innovation & Platform Architecture (Level 2)
export const ctoData: HoshinData = {
  strategicObjectives: [
    {
      id: 'cto-strategic-1',
      title: 'Build Scalable Platform Architecture for 2M Users',
      description: 'Design and implement scalable cloud-native architecture capable of supporting 2 million concurrent users with 99.9% uptime and low latency.',
      targetYear: 2025,
      owner: 'Chief Technology Officer',
      status: 'in-progress',
      priority: 'high'
    },
    {
      id: 'cto-strategic-2',
      title: 'Implement AI-Powered Platform Intelligence',
      description: 'Deploy advanced AI and machine learning capabilities for personalized recommendations, predictive analytics, and automated customer insights.',
      targetYear: 2026,
      owner: 'Chief Technology Officer',
      status: 'in-progress',
      priority: 'high'
    }
  ],
  annualObjectives: [
    {
      id: 'cto-annual-1',
      title: 'Deploy Multi-CDN Architecture',
      description: 'Implement multi-CDN strategy with Akamai, Cloudflare, and AWS CloudFront for optimal content delivery across Nepal\'s diverse geography.',
      strategicObjectiveIds: ['cto-strategic-1'],
      targetDate: '2025-10-31',
      owner: 'Chief Technology Officer',
      status: 'in-progress',
      progress: 65
    },
    {
      id: 'cto-annual-2',
      title: 'Implement Multi-DRM Content Protection',
      description: 'Deploy comprehensive DRM solution with Google Widevine, Apple FairPlay, and Microsoft PlayReady for secure content delivery.',
      strategicObjectiveIds: ['cto-strategic-1'],
      targetDate: '2025-09-30',
      owner: 'Chief Technology Officer',
      status: 'in-progress',
      progress: 58
    },
    {
      id: 'cto-annual-3',
      title: 'Launch AI-Powered Recommendation Engine',
      description: 'Deploy machine learning-based recommendation system for personalized content discovery and user engagement optimization.',
      strategicObjectiveIds: ['cto-strategic-2'],
      targetDate: '2025-12-31',
      owner: 'Chief Technology Officer',
      status: 'in-progress',
      progress: 42
    }
  ],
  processes: [
    {
      id: 'cto-process-1',
      title: 'Scalable Platform Architecture Development',
      description: 'Design and implementation of cloud-native, scalable architecture with microservices and containerized deployment.',
      annualObjectiveIds: ['cto-annual-1', 'cto-annual-2'],
      owner: 'Platform Architecture Manager',
      startDate: '2025-01-01',
      endDate: '2025-10-31',
      status: 'in-progress',
      resources: ['Cloud architects', 'DevOps engineers', 'Security specialists', 'Performance engineers']
    },
    {
      id: 'cto-process-2',
      title: 'AI and Machine Learning Implementation',
      description: 'Development and deployment of AI/ML capabilities for recommendations, analytics, and predictive insights.',
      annualObjectiveIds: ['cto-annual-3'],
      owner: 'AI/ML Engineering Manager',
      startDate: '2025-03-01',
      endDate: '2025-12-31',
      status: 'in-progress',
      resources: ['Data scientists', 'ML engineers', 'Data engineers', 'AI specialists']
    }
  ],
  metrics: [
    {
      id: 'cto-metric-1',
      name: 'Platform Scalability (Concurrent Users)',
      description: 'Maximum number of concurrent users supported without performance degradation',
      processIds: ['cto-process-1'],
      target: 2000000,
      current: 500000,
      unit: 'concurrent users',
      frequency: 'weekly',
      owner: 'Platform Architecture Manager'
    },
    {
      id: 'cto-metric-2',
      name: 'Content Delivery Speed',
      description: 'Average time for content to start playing after user selection',
      processIds: ['cto-process-1'],
      target: 2,
      current: 8.5,
      unit: 'seconds',
      frequency: 'daily',
      owner: 'CDN Operations Manager'
    },
    {
      id: 'cto-metric-3',
      name: 'Recommendation Accuracy',
      description: 'Percentage of recommended content that users actually watch',
      processIds: ['cto-process-2'],
      target: 35,
      current: 15,
      unit: '% accuracy',
      frequency: 'weekly',
      owner: 'AI/ML Engineering Manager'
    }
  ],
  catchball: [
    {
      id: 'cto-catchball-1',
      type: 'question',
      title: 'Data Privacy Compliance for AI Recommendations',
      description: 'Need guidance on data privacy regulations for AI recommendation system. How should we handle user data collection and processing?',
      from: 'AI/ML Engineering Manager',
      to: 'Chief Technology Officer',
      relatedItemId: 'cto-annual-3',
      relatedItemType: 'annual',
      status: 'pending',
      createdAt: '2025-07-12T09:15:00Z',
      responses: [
        {
          id: 'cto-response-1',
          message: 'Let\'s implement privacy-by-design approach with user consent management and data anonymization. I\'ll coordinate with legal team for compliance framework.',
          author: 'Chief Technology Officer',
          createdAt: '2025-07-12T14:30:00Z'
        }
      ]
    }
  ]
};

// Unified DishHome Dataset (All Levels Combined)
export const dishHomeUnifiedData: HoshinData = {
  strategicObjectives: [
    ...ceoData.strategicObjectives,
    ...cooData.strategicObjectives,
    ...cfoData.strategicObjectives,
    ...cioData.strategicObjectives,
    ...cmoData.strategicObjectives,
    ...ctoData.strategicObjectives
  ],
  annualObjectives: [
    ...ceoData.annualObjectives,
    ...cooData.annualObjectives,
    ...cfoData.annualObjectives,
    ...cioData.annualObjectives,
    ...cmoData.annualObjectives,
    ...ctoData.annualObjectives
  ],
  processes: [
    ...ceoData.processes,
    ...cooData.processes,
    ...cfoData.processes,
    ...cioData.processes,
    ...cmoData.processes,
    ...ctoData.processes
  ],
  metrics: [
    ...ceoData.metrics,
    ...cooData.metrics,
    ...cfoData.metrics,
    ...cioData.metrics,
    ...cmoData.metrics,
    ...ctoData.metrics
  ],
  catchball: [
    ...ceoData.catchball,
    ...cooData.catchball,
    ...cfoData.catchball,
    ...cioData.catchball,
    ...cmoData.catchball,
    ...ctoData.catchball
  ]
};

// Dataset definitions with proper titles and level indicators
export interface DatasetOption {
  id: string;
  name: string;
  description: string;
  data: HoshinData;
}

export const availableDatasets: DatasetOption[] = [
  {
    id: 'dishome-unified',
    name: 'DishHome Unified Strategic Plan (All Levels)',
    description: 'Complete strategic plan across all executive levels and departments',
    data: dishHomeUnifiedData
  },
  {
    id: 'ceo-strategic',
    name: 'CEO - Strategic Vision & Governance (Level 1)',
    description: 'Strategic objectives and transformation leadership for organizational direction',
    data: ceoData
  },
  {
    id: 'coo-operational',
    name: 'COO - Operational Excellence & Service Delivery (Level 2)',
    description: 'Service delivery optimization and operational excellence initiatives',
    data: cooData
  },
  {
    id: 'cfo-financial',
    name: 'CFO - Financial Transformation & Resource Optimization (Level 2)',
    description: 'Financial recovery strategies and resource optimization programs',
    data: cfoData
  },
  {
    id: 'cio-infrastructure',
    name: 'CIO - Technology Infrastructure & Digital Transformation (Level 2)',
    description: 'Technology infrastructure and digital platform transformation',
    data: cioData
  },
  {
    id: 'cmo-marketing',
    name: 'CMO - Customer Acquisition & Brand Positioning (Level 2)',
    description: 'Customer acquisition strategies and brand positioning initiatives',
    data: cmoData
  },
  {
    id: 'cto-innovation',
    name: 'CTO - Technical Innovation & Platform Architecture (Level 2)',
    description: 'Technical innovation and scalable platform architecture development',
    data: ctoData
  }
];

// Legacy exports for backward compatibility
export const dummyStrategicObjectives = dishHomeUnifiedData.strategicObjectives;
export const dummyAnnualObjectives = dishHomeUnifiedData.annualObjectives;
export const dummyProcesses = dishHomeUnifiedData.processes;
export const dummyMetrics = dishHomeUnifiedData.metrics;
export const dummyCatchballItems = dishHomeUnifiedData.catchball;
export const allDummyData = dishHomeUnifiedData;