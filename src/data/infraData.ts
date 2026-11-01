import { InfraCategory } from '../types';

export const infraCategories: InfraCategory[] = [
  {
    id: "networking",
    name: "Networking",
    label: "NETWORKING & INFRASTRUCTURE",
    subtitle: "MikroTik • VLAN • VPN • Routing",
    description: "Enterprise networking projects focused on MikroTik, Cisco, Fortinet, VyOS, VLAN segmentation, VPN, routing and high-availability infrastructure simulations.",
    icon: "Network",
    repos: [
      {
        type: "PERSONAL LAB",
        title: "MikroTik Setup Homelab and Small Office",
        description: "WAN, LAN, DHCP and internet configuration using MikroTik RouterOS for homelabs and small office branch deployments.",
        tags: ["MikroTik", "NAT", "DHCP"],
        link: "https://github.com/1705Alwwwan/MikroTik_HomeLab_Standard_Configuration.git"
      },
      {
        type: "VPN",
        title: "Mikrotik Site-to-Site Wireguard",
        description: "VLAN segmentation, DHCP, NAT, firewall hardening and multi-network secure interconnect using WireGuard.",
        tags: ["VLAN", "Wireguard", "Security"],
        link: "https://github.com/1705Alwwwan/mikrotik-site-to-site-wireguard.git"
      },
      {
        type: "VPN",
        title: "Mikrotik IPSec Site-to-Site VPN",
        description: "Site-to-site VPN encryption simulation and tunnel orchestration using MikroTik IPSec for inter-branch communication.",
        tags: ["VPN", "IPSec", "Security"],
        link: "https://github.com/1705Alwwwan/mikrotik-ipsec-site-to-site-vpn.git"
      },
      {
        type: "BASIC CONFIG",
        title: "Set up Identity of Mikrotik",
        description: "A production-ready MikroTik RouterOS initial configuration template including interface renaming, LAN bridge setup, basic security hardening, identity configuration, and timezone settings.",
        tags: ["Interface", "LAN-Bridge", "Hardening"],
        link: "https://github.com/1705Alwwwan/mikrotik-basic-initial-configuration.git"
      },
      {
        type: "BASIC CONFIG",
        title: "MikroTik RouterOS Basic Setup",
        description: "Firewall filtering rules, Network Address Translation (NAT), DHCP pools, and web domain content filtering for corporate safety.",
        tags: ["DHCP", "Web Filter", "Security"],
        link: "https://github.com/1705Alwwwan/MikroTik-RouterOS-Basic-Setup-with-Firewall-DHCP-NAT-Website-Blocking.git"
      },
      {
        type: "VLAN",
        title: "Mikrotik VLAN Enterprise Setup",
        description: "Advanced MikroTik RouterOS VLAN configuration for enterprise and SOHO environments featuring strict VLAN isolation and trunking.",
        tags: ["VLAN", "Firewall Isolation", "Network Security"],
        link: "https://github.com/1705Alwwwan/mikrotik-vlan-enterprise-setup.git",
        isOpenShowcase: true,
        showcaseId: "enterprise-vlan"
      }
    ]
  },
  {
    id: "linux-server",
    name: "Linux Server",
    label: "LINUX INFRASTRUCTURE",
    subtitle: "Ubuntu • Docker • Nginx",
    description: "Linux infrastructure projects using Ubuntu Server, Docker containerization, reverse proxy architecture and self-hosted services.",
    icon: "Server",
    repos: [
      {
        type: "DOCKER",
        title: "Docker Stack Infrastructure",
        description: "Docker Compose multi-service deployment with Nginx reverse proxy, PostgreSQL persistent database, and Redis caching.",
        tags: ["Docker", "Nginx", "PostgreSQL"],
        link: "https://github.com/1705Alwwwan",
        isOpenShowcase: true,
        showcaseId: "docker-infrastructure"
      },
      {
        type: "UBUNTU SERVER",
        title: "Ubuntu Basic Server Setup",
        description: "Ubuntu Server deployment, SSH hardening, non-root user privilege separation, UFW firewall and automated updates.",
        tags: ["Ubuntu", "Linux", "SSH Hardening"],
        link: "https://github.com/1705Alwwwan/ubuntu-basic-server-setup.git"
      },
      {
        type: "REVERSE PROXY",
        title: "Nginx Proxy & SSL Architecture",
        description: "Reverse proxy architecture using Nginx with automatic SSL certificates, upstream load balancing, and rate limiting.",
        tags: ["Nginx", "Proxy", "Docker", "SSL"],
        link: "https://github.com/1705Alwwwan"
      }
    ]
  },
  {
    id: "monitoring",
    name: "Monitoring",
    label: "MONITORING & VISIBILITY",
    subtitle: "Grafana • Prometheus • Logs",
    description: "Infrastructure monitoring, throughput analysis and telemetry observability projects using modern metrics aggregators.",
    icon: "Activity",
    repos: [
      {
        type: "GRAFANA",
        title: "Grafana & Prometheus Dashboard",
        description: "Infrastructure monitoring dashboard using Grafana, Prometheus metrics node-exporter, and alerting channels.",
        tags: ["Grafana", "Prometheus", "Metrics"],
        link: "https://github.com/1705Alwwwan",
        isOpenShowcase: true,
        showcaseId: "monitoring-dashboard"
      },
      {
        type: "LOGGING",
        title: "Centralized Log Monitoring",
        description: "Centralized logging and syslog monitoring visibility for enterprise Linux servers and networking appliances.",
        tags: ["Logs", "Monitoring", "Linux Syslog"],
        link: "https://github.com/1705Alwwwan"
      },
      {
        type: "THROUGHPUT",
        title: "Throughput Analysis & Bandwidth Audit",
        description: "Network throughput monitoring and visualization scripts using Python and PowerShell for identifying bandwidth bottlenecks.",
        tags: ["Python", "Monitoring", "Analytics"],
        link: "https://github.com/1705Alwwwan"
      }
    ]
  },
  {
    id: "automation",
    name: "Automation",
    label: "AUTOMATION & SCRIPTING",
    subtitle: "Python • PowerShell • Scripts",
    description: "Python and PowerShell automation projects for operational efficiency, server housekeeping, and automated internal workflows.",
    icon: "Terminal",
    repos: [
      {
        type: "PYTHON",
        title: "Python Systems Automation",
        description: "Internal automation scripts for operational workflows, routine administrative reporting and task simplification.",
        tags: ["Python", "Automation", "Scripting"],
        link: "https://github.com/1705Alwwwan"
      },
      {
        type: "POWERSHELL",
        title: "PowerShell Windows Automation",
        description: "PowerShell scripts for automated scheduled machine restarts, service recovery, and operational status reporting.",
        tags: ["PowerShell", "Windows", "Monitoring"],
        link: "https://github.com/1705Alwwwan"
      },
      {
        type: "WEB SCRAPER",
        title: "Data Scraping & ETL Automation",
        description: "Automated data harvesting and processing pipelines using Python BeautifulSoup and Streamlit dashboards.",
        tags: ["Python", "Scraping", "Automation"],
        link: "https://github.com/1705Alwwwan"
      }
    ]
  }
];
