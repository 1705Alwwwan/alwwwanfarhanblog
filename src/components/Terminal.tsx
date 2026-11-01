import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, CornerDownLeft } from 'lucide-react';

interface TerminalProps {
  onSelectCategory?: (catId: 'networking' | 'linux-server' | 'monitoring' | 'automation') => void;
  onOpenContact?: () => void;
  onOpenAdmin?: () => void;
}

export const Terminal: React.FC<TerminalProps> = ({ onSelectCategory, onOpenContact, onOpenAdmin }) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<Array<{ cmd: string; output?: string | React.ReactNode }>>([
    {
      cmd: 'docker ps',
      output: 'CONTAINER ID   IMAGE                 STATUS         PORTS\n9b12a884efc1   nginx:alpine          Up 42 days     0.0.0.0:80->80/tcp, 0.0.0.0:443->443/tcp\n4d30ac6150fe   postgres:16           Up 42 days     5432/tcp\n218f7a9301da   grafana/grafana:10.4  Up 42 days     0.0.0.0:3001->3000/tcp\ne74bb34101e9   prom/prometheus       Up 42 days     9090/tcp'
    },
    {
      cmd: 'monitoring --status',
      output: '[OK] Prometheus daemon: ACTIVE (sampling interval: 15s)\n[OK] Node Exporter: RUNNING on 192.168.10.1:9100\n[OK] MikroTik SNMP Scraper: ALL 24 PORTS UP - 0 DROPS\n[OK] Core Switch Trunk 10G SFP+: HEALTHY - Latency 0.42ms'
    },
    {
      cmd: 'mikrotik vlan print',
      output: '#  NAME     VLAN-ID  INTERFACE   COMMENT\n0  VLAN-10  10       sfp-sfpplus1 Office & Admin Subnet (192.168.10.0/24)\n1  VLAN-20  20       sfp-sfpplus1 Production Line & CNC (192.168.20.0/24)\n2  VLAN-30  30       sfp-sfpplus1 CCTV & NVR Surveillance (192.168.30.0/24)\n3  VLAN-40  40       sfp-sfpplus1 Guest Isolation WiFi (192.168.40.0/24)'
    }
  ]);

  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCmd = inputVal.trim();
    if (!cleanCmd) return;

    const lower = cleanCmd.toLowerCase();
    let out: React.ReactNode | string = '';

    if (lower === 'clear' || lower === 'cls') {
      setHistory([]);
      setInputVal('');
      return;
    } else if (lower === 'help') {
      out = `Available commands:
  - docker ps        : List running production containers
  - monitoring       : Check health & observability daemon
  - vlan             : Print MikroTik VLAN routing table
  - skills           : List core technical competencies
  - whoami           : Infrastructure Engineer bio
  - projects         : Jump to enterprise showcases
  - blog             : Jump to technical articles & guides
  - admin / login    : Open Administrator Portal
  - contact          : Contact Alwan directly
  - clear            : Wipe terminal buffer`;
    } else if (lower.includes('docker')) {
      out = `CONTAINER ID   IMAGE                 STATUS         PORTS
9b12a884efc1   nginx:alpine          Up 42 days     0.0.0.0:80->80/tcp, 0.0.0.0:443->443/tcp
4d30ac6150fe   postgres:16           Up 42 days     5432/tcp
218f7a9301da   grafana/grafana:10.4  Up 42 days     0.0.0.0:3001->3000/tcp
e74bb34101e9   prom/prometheus       Up 42 days     9090/tcp`;
      onSelectCategory?.('linux-server');
    } else if (lower.includes('monitor') || lower.includes('grafana')) {
      out = `[OBSERVABILITY REPORT]
CPU Utilization : 14.2% across 8 cores
RAM Usage       : 6.8 GB / 32 GB (21%)
Storage (ZFS)   : 2.1 TB / 8.0 TB (healthy)
Network Traffic : 142.6 Mbps RX / 88.4 Mbps TX
Incident Status : 0 Critical, 0 High Warnings`;
      onSelectCategory?.('monitoring');
    } else if (lower.includes('vlan') || lower.includes('mikrotik')) {
      out = `#  NAME     VLAN-ID  INTERFACE   STATUS
0  VLAN-10  10       ether1      ACTIVE (Office)
1  VLAN-20  20       ether1      ACTIVE (Production)
2  VLAN-30  30       ether1      ACTIVE (CCTV)
3  VLAN-40  40       ether1      ACTIVE (Guest)`;
      onSelectCategory?.('networking');
    } else if (lower === 'skills') {
      out = `[CORE SKILLSETS]
- Networking    : MikroTik RouterOS, Cisco, WireGuard, IPSec, VLAN 802.1Q, Firewall Filter
- Linux Server  : Ubuntu Server, SSH Hardening, Nginx Reverse Proxy, SSL/TLS, Systemd
- Containers    : Docker, Docker Compose, Portainer, Registry, Volume Management
- Automation    : Python (ETL, Scrapy, Streamlit), PowerShell, Bash Scripting, Visual Basic
- Observability : Grafana, Prometheus, Node-Exporter, Syslog, Throughput Analysis`;
    } else if (lower === 'whoami') {
      out = `Alwan Farhan Aziz - Infrastructure Engineer & Linux Specialist.
Experienced in enterprise network architecture, Linux server hardening, automated operations, and industrial equipment integration at EssilorLuxottica Group and freelance deployments.`;
    } else if (lower === 'projects') {
      out = `Navigating to Enterprise Projects section...`;
      const projElem = document.getElementById('projects');
      if (projElem) projElem.scrollIntoView({ behavior: 'smooth' });
    } else if (lower === 'blog' || lower === 'articles') {
      out = `Navigating to Engineering Journal & Articles...`;
      const blogElem = document.getElementById('blog');
      if (blogElem) blogElem.scrollIntoView({ behavior: 'smooth' });
    } else if (lower === 'admin' || lower === 'login' || lower === 'cms') {
      out = `Opening Administrator Portal modal...`;
      onOpenAdmin?.();
    } else if (lower === 'contact' || lower === 'hire') {
      out = `Opening contact details...`;
      onOpenContact?.();
    } else {
      out = `bash: ${cleanCmd}: command not found. Type 'help' for available commands.`;
    }

    setHistory((prev) => [...prev, { cmd: cleanCmd, output: out }]);
    setInputVal('');
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="terminal-box bg-[#0f172a]/90 border border-white/10 rounded-2xl overflow-hidden mt-8 max-w-xl shadow-2xl backdrop-blur-md cursor-text"
    >
      {/* Header */}
      <div className="terminal-header flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#0b1120]">
        <div className="flex gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500 inline-block hover:opacity-80 transition-opacity"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block hover:opacity-80 transition-opacity"></span>
          <span className="w-3 h-3 rounded-full bg-green-500 inline-block hover:opacity-80 transition-opacity"></span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
          <TerminalIcon className="w-3.5 h-3.5 text-blue-400" />
          <span>root@alwan-system:~</span>
        </div>
        <div className="text-[11px] text-gray-500 font-mono hidden sm:block">bash 5.2</div>
      </div>

      {/* Terminal Body */}
      <div
        ref={bodyRef}
        className="terminal-body p-4 sm:p-5 font-mono text-xs sm:text-[13px] text-blue-400 leading-relaxed max-h-72 overflow-y-auto selection:bg-blue-600/30 selection:text-white"
      >
        {history.map((item, idx) => (
          <div key={idx} className="mb-3">
            <div className="flex items-center gap-1.5 text-gray-300">
              <span className="text-emerald-400">root@alwan-system</span>
              <span className="text-gray-500">:</span>
              <span className="text-blue-400">~#</span>
              <span className="text-white font-medium ml-1">{item.cmd}</span>
            </div>
            {item.output && (
              <pre className="text-gray-300 whitespace-pre-wrap mt-1 font-mono pl-3 border-l-2 border-blue-500/30 text-[11px] sm:text-xs">
                {item.output}
              </pre>
            )}
          </div>
        ))}

        {/* Input prompt */}
        <form onSubmit={handleCommand} className="flex items-center gap-1.5 mt-2">
          <span className="text-emerald-400">root@alwan-system</span>
          <span className="text-gray-500">:</span>
          <span className="text-blue-400">~#</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="type 'help' or command..."
            className="flex-1 bg-transparent text-white focus:outline-none ml-1 font-mono text-xs sm:text-[13px] placeholder:text-gray-600 caret-blue-400"
          />
          <button type="submit" className="text-gray-600 hover:text-blue-400 transition-colors p-1">
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
