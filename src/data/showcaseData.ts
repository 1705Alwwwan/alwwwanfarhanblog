import { FeaturedShowcase } from '../types';

export const showcaseData: Record<string, FeaturedShowcase> = {
  'enterprise-vlan': {
    id: 'enterprise-vlan',
    title: 'Enterprise VLAN Infrastructure',
    label: 'NETWORK INFRASTRUCTURE',
    description: 'Enterprise-grade VLAN segmentation and network architecture for office, production, CCTV and guest environments using MikroTik and managed switches.',
    tags: ['MikroTik', 'VLAN', 'Managed Switch', 'Routing', 'Firewall', 'Fiber Optic', 'DHCP'],
    challenges: [
      'Broadcast traffic affecting production operations and machinery',
      'No isolation or separation between corporate office workstations and security CCTV',
      'Guest users accessing the sensitive internal network',
      'Difficult troubleshooting and poor latency monitoring',
      'Unstable communication between distributed building facilities'
    ],
    solutions: [
      'Layer 2/3 VLAN segmentation architecture with 802.1Q trunking',
      'Dedicated subnet and isolated DHCP server per department',
      'Managed switch VLAN trunking and strict access port tagging',
      'Access control lists (ACL) & stateful firewall filtering',
      'Fiber optic backbone implementation with redundant uplinks'
    ],
    highlights: [
      { title: 'VLAN 10', desc: 'Office & Admin Network', value: '10' },
      { title: 'VLAN 20', desc: 'Production Area & Machinery', value: '20' },
      { title: 'VLAN 30', desc: 'CCTV & Physical Surveillance', value: '30' },
      { title: 'VLAN 40', desc: 'Isolated Guest WiFi', value: '40' }
    ],
    githubUrl: 'https://github.com/1705Alwwwan/mikrotik-vlan-enterprise-setup.git',
    iconName: 'Network'
  },
  'docker-infrastructure': {
    id: 'docker-infrastructure',
    title: 'Docker Infrastructure',
    label: 'LINUX SERVER INFRASTRUCTURE',
    description: 'Enterprise-grade Docker infrastructure deployment using Ubuntu Server, Nginx Reverse Proxy, PostgreSQL, monitoring stack and containerized services.',
    tags: ['Ubuntu Server', 'Docker', 'Docker Compose', 'Nginx', 'PostgreSQL', 'Redis', 'SSL HTTPS'],
    challenges: [
      'Manual, error-prone software and service deployment on bare metal',
      'Difficult version management, dependencies and horizontal scaling',
      'Library and dependency conflicts between production services',
      'Absence of centralized container management and automated health checks'
    ],
    solutions: [
      'Containerized infrastructure powered by Docker and Docker Compose',
      'Docker Compose orchestration for multi-container microservice stacks',
      'Nginx reverse proxy architecture with automated SSL termination',
      'Centralized monitoring, persistent volumes and structured container logging'
    ],
    highlights: [
      { title: 'Reverse Proxy', desc: 'Nginx reverse proxy with SSL termination and multi-container routing' },
      { title: 'Database Layer', desc: 'PostgreSQL database container with persistent volume and backup strategy' },
      { title: 'Monitoring Stack', desc: 'Infrastructure monitoring with Grafana, Prometheus and node-exporter' }
    ],
    githubUrl: 'https://github.com/1705Alwwwan',
    iconName: 'Server'
  },
  'monitoring-dashboard': {
    id: 'monitoring-dashboard',
    title: 'Monitoring Dashboard',
    label: 'INFRASTRUCTURE MONITORING',
    description: 'Real-time infrastructure monitoring system using Grafana, Prometheus, throughput analysis, logging system and enterprise network visibility.',
    tags: ['Grafana', 'Prometheus', 'Python', 'PowerShell', 'Time Series', 'Network Throughput', 'Logging'],
    challenges: [
      'No real-time visibility into operational bandwidth and network usage',
      'Difficult troubleshooting during intermittent network latency events',
      'No historical throughput trends or audit trails',
      'Sudden bandwidth spikes and bottleneck anomalies went unnoticed'
    ],
    solutions: [
      'Real-time observability dashboard built on Grafana and Prometheus',
      'Historical throughput and telemetry logging for network interfaces',
      'Intuitive visualizations with custom threshold alerts and triggers',
      'Automated background health checks and metric scrapers via Python'
    ],
    highlights: [
      { title: '24/7', desc: 'Continuous Monitoring Availability', value: '24/7' },
      { title: 'Live', desc: 'Throughput Telemetry Logging', value: 'Live' },
      { title: 'TS', desc: 'Time Series Historical Analysis', value: 'TS' },
      { title: 'Auto', desc: 'Monitoring Scripts & Automation', value: 'Auto' }
    ],
    githubUrl: 'https://github.com/1705Alwwwan',
    iconName: 'Activity'
  }
};
