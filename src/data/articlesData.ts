import { ArticleItem } from '../types';

export const initialArticles: ArticleItem[] = [
  {
    id: 'mikrotik-vlan-segmentation-guide',
    title: 'Enterprise VLAN Segmentation with MikroTik RouterOS',
    slug: 'mikrotik-vlan-segmentation-guide',
    category: 'Networking',
    readTime: '6 min read',
    coverImage: '/media/img/labself.jpg',
    excerpt: 'How to design and implement strict layer 2/3 network segmentation separating corporate workstations, production machinery, and CCTV cameras using MikroTik RouterOS.',
    content: `## Architecture Overview
In manufacturing and enterprise facilities, broadcast storms and unsegmented traffic can degrade performance and expose sensitive machines to operational risks. By implementing 802.1Q VLAN trunks on MikroTik switches and routers, we enforce strict isolation:

- **VLAN 10**: Office Workstations & Management
- **VLAN 20**: Production Floor Machinery & CNC Controllers
- **VLAN 30**: CCTV, NVR, and Security Surveillance
- **VLAN 40**: Isolated Guest Wi-Fi

### Step 1: Bridge Configuration and VLAN Filtering
First, create a unified bridge interface and enable \`vlan-filtering\`:

\`\`\`routeros
/interface bridge
add name=bridge-lan vlan-filtering=yes

/interface bridge port
add bridge=bridge-lan interface=ether2 pvid=10
add bridge=bridge-lan interface=ether3 pvid=20
add bridge=bridge-lan interface=sfp-sfpplus1 frame-types=admit-only-vlan-tagged
\`\`\`

### Step 2: Stateful Firewall Rules
To block guest and office devices from reaching production machinery while allowing administrative monitoring:

\`\`\`routeros
/ip firewall filter
add chain=forward action=accept connection-state=established,related
add chain=forward action=drop in-interface=vlan40-guest out-interface=vlan20-prod
add chain=forward action=drop in-interface=vlan10-office out-interface=vlan30-cctv
\`\`\`

With these rules in place, security audits and operational stability are maintained 24/7 without cross-talk.`,
    tags: ['MikroTik', 'VLAN', 'Network Security', 'Firewall'],
    createdAt: '2025-11-15T09:00:00Z',
    isInitial: true
  },
  {
    id: 'ubuntu-server-hardening-production',
    title: 'Production Linux Server Hardening & SSH Defense',
    slug: 'ubuntu-server-hardening-production',
    category: 'Linux & Server',
    readTime: '5 min read',
    coverImage: '/media/img/sysadminubuntu.jpeg',
    excerpt: 'Essential checklist for securing Ubuntu Server 24.04 LTS: disabling password authentication, UFW rate limiting, fail2ban integration, and unattended security updates.',
    content: `## Securing Cloud & On-Premise Ubuntu Nodes
Deploying a public-facing server requires zero-trust configuration from day one. Below is the operational baseline used across our production Docker nodes.

### 1. SSH Hardening (\`/etc/ssh/sshd_config\`)
Disable root direct login and password-based auth immediately:

\`\`\`bash
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
MaxAuthTries 3
ClientAliveInterval 300
ClientAliveCountMax 2
\`\`\`

### 2. UFW Firewall Policy
Drop all unsolicited inbound traffic by default, whitelisting only designated operational ports:

\`\`\`bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
\`\`\`

### 3. Automated Security Patches
Enable \`unattended-upgrades\` so critical CVE kernels and OpenSSL patches install automatically without manual intervention.`,
    tags: ['Ubuntu', 'Linux', 'Security', 'DevOps'],
    createdAt: '2025-10-28T14:30:00Z',
    isInitial: true
  },
  {
    id: 'monitoring-infrastructure-grafana-prometheus',
    title: 'Real-Time Network Observability with Prometheus & Grafana',
    slug: 'monitoring-infrastructure-grafana-prometheus',
    category: 'Monitoring',
    readTime: '7 min read',
    coverImage: '/media/img/pingauto.jpeg',
    excerpt: 'Building an automated telemetry pipeline to scrape SNMP metrics from network switches and node-exporter from Linux instances to catch latency spikes early.',
    content: `## Observability Strategy
You cannot optimize what you do not measure. In high-throughput industrial and data environments, monitoring network throughput and disk I/O prevents costly downtime.

### Prometheus Configuration
Using Prometheus \`snmp_exporter\` and \`node_exporter\`, metrics are polled every 15 seconds:

\`\`\`yaml
scrape_configs:
  - job_name: 'node_exporter'
    static_configs:
      - targets: ['192.168.10.10:9100', '192.168.10.11:9100']

  - job_name: 'mikrotik_snmp'
    static_configs:
      - targets: ['192.168.10.1']
    metrics_path: /snmp
    params:
      module: [mikrotik]
\`\`\`

### Key SLA Dashboards
- **Port Saturation**: Alerts when link utilization exceeds 85% for more than 3 consecutive polling intervals.
- **Packet Drop Rate**: Instant Telegram/Discord notifications if interface error counters increment.`,
    tags: ['Grafana', 'Prometheus', 'Monitoring', 'SNMP'],
    createdAt: '2025-10-10T11:00:00Z',
    isInitial: true
  },
  {
    id: 'powershell-python-it-automation',
    title: 'Automating Repetitive IT Operations with PowerShell & Python',
    slug: 'powershell-python-it-automation',
    category: 'Automation',
    readTime: '4 min read',
    coverImage: '/media/img/restartauto.jpeg',
    excerpt: 'Case study on developing scheduled machine restarts, file synching, and network scanner utilities that save hours of manual maintenance weekly.',
    content: `## The Problem: Downtime from Memory Leaks
Production PCs running continuous factory machinery frequently experienced driver stagnation and memory bloat.

### The Solution: Automated PowerShell Restart Task
By deploying a silent scheduled task running elevated PowerShell, systems cleanly flush memory and restart outside of operational shifts:

\`\`\`powershell
$action = New-ScheduledTaskAction -Execute 'powershell.exe' -Argument '-NoProfile -WindowStyle Hidden -Command "Restart-Computer -Force"'
$trigger = New-ScheduledTaskTrigger -Weekly -DaysOfWeek Sunday -At 3:00am
Register-ScheduledTask -Action $action -Trigger $trigger -TaskName "WeeklyMaintenanceRestart" -User "NT AUTHORITY\\SYSTEM" -RunLevel Highest
\`\`\`

Coupled with a custom Python scanner that tests IP reachability immediately after reboot, IT administrators receive real-time notifications confirming all machines recovered properly.`,
    tags: ['PowerShell', 'Python', 'Automation', 'DevOps'],
    createdAt: '2025-09-20T08:15:00Z',
    isInitial: true
  }
];
