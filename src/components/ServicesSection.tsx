import React from 'react';
import { Network, Server, Check, ArrowRight } from 'lucide-react';

interface ServicesSectionProps {
  onOpenContact: (serviceName?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenContact }) => {
  const networkItems = [
    { name: 'MikroTik Setup & Routing', desc: 'Core routing, NAT, firewall filtering, and bandwidth queues.' },
    { name: 'VLAN Segmentation', desc: 'Isolation for office, production floor, CCTV surveillance, and guests.' },
    { name: 'Site-to-Site & Client VPN', desc: 'WireGuard and IPSec encrypted tunnels across branch offices.' },
    { name: 'Wireless Enterprise', desc: 'Enterprise AP provisioning with roaming and 802.1X authentication.' },
    { name: 'Failover ISP & Multi-WAN', desc: 'Seamless automated failover and load balancing between dual ISPs.' },
  ];

  const linuxItems = [
    { name: 'Ubuntu Server Hardening', desc: 'SSH key-only auth, non-root users, UFW firewall rules, and updates.' },
    { name: 'Docker & Container Stacks', desc: 'Multi-service Docker Compose orchestration with persistent storage.' },
    { name: 'Observability & Monitoring', desc: 'Prometheus node-exporter metrics, Grafana dashboards, and alerts.' },
    { name: 'System Automation Scripts', desc: 'Custom Python & PowerShell automated maintenance and scheduled tasks.' },
    { name: 'Nginx Reverse Proxy & SSL', desc: 'Centralized reverse proxy routing, SSL termination, and rate limits.' },
  ];

  return (
    <section id="services" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <p className="text-blue-500 font-bold text-xs sm:text-sm tracking-[0.25em] uppercase mb-3">
            INFRASTRUCTURE SOLUTIONS
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Professional Services
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
            End-to-end design, implementation, hardening, and ongoing operational maintenance for businesses.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10">
          {/* Service 1: Network Infrastructure */}
          <div className="rounded-3xl bg-[#0f172a]/75 border border-white/10 p-8 sm:p-12 hover:border-blue-500/50 transition-all shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  <Network className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-xs font-mono text-blue-400 uppercase tracking-widest font-semibold">
                    DOMAIN 01
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">
                    Network Infrastructure
                  </h3>
                </div>
              </div>

              <p className="text-sm text-gray-400 mb-8 leading-relaxed">
                Robust, isolated enterprise network topologies designed to prevent outages, eliminate broadcast storms, and guarantee security.
              </p>

              <ul className="space-y-4 mb-8">
                {networkItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3.5">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">{item.name}</h4>
                      <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => onOpenContact('Network Infrastructure Consulting')}
              className="w-full py-4 px-6 rounded-2xl bg-blue-600/20 hover:bg-blue-600 border border-blue-500/40 text-blue-300 hover:text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 group"
            >
              <span>Consult on Network Setup</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Service 2: Linux & Monitoring */}
          <div className="rounded-3xl bg-[#0f172a]/75 border border-white/10 p-8 sm:p-12 hover:border-blue-500/50 transition-all shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  <Server className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-xs font-mono text-blue-400 uppercase tracking-widest font-semibold">
                    DOMAIN 02
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">
                    Linux & Monitoring
                  </h3>
                </div>
              </div>

              <p className="text-sm text-gray-400 mb-8 leading-relaxed">
                Containerized server architectures, high-performance database containers, automated scripts, and real-time observability telemetry.
              </p>

              <ul className="space-y-4 mb-8">
                {linuxItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3.5">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">{item.name}</h4>
                      <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => onOpenContact('Linux & Monitoring Consulting')}
              className="w-full py-4 px-6 rounded-2xl bg-blue-600/20 hover:bg-blue-600 border border-blue-500/40 text-blue-300 hover:text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 group"
            >
              <span>Consult on Server Deployment</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
