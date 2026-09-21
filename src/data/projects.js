// Systems built and run at Cyntora. Copy is deliberately factual: no invented metrics.
export const systems = [
  {
    id: 'growth-engine',
    title: 'B2B growth engine',
    kind: 'Industrial client · ERP + webshop → CRM',
    meta: 'In production',
    description:
      'Customer data from the ERP and the webshop lands in GoHighLevel, gets segmented, and triggers sales alerts, cross-sell emails and onboarding for new accounts. The jobs run in Windmill.',
    tags: ['Windmill', 'GoHighLevel', 'REST APIs', 'TypeScript'],
    cover: { word: 'Growth', sub: 'ERP → CRM → sales alerts' },
    accent: '#2dcea3',
  },
  {
    id: 'agents',
    title: 'Reporting agents on Claude',
    kind: 'Agency-wide · sales & management',
    meta: 'In production',
    description:
      'Agent flows that summarise monthly reports, monitor clients and prepare briefs for sales and management. MCP servers against GA4, Search Console, SE Ranking and Windsor.ai give the agents real client data to read.',
    tags: ['Claude', 'MCP', 'GA4', 'Search Console', 'SE Ranking'],
    cover: { word: 'Agents', sub: 'Claude + MCP on real data' },
    accent: '#8b7dff',
  },
  {
    id: 'portal',
    title: 'Client portal & report generator',
    kind: 'Per client · WooCommerce stores',
    meta: 'In production',
    description:
      'A report generator per client, a client portal on Cloudflare Pages with login and PDF delivery, and a campaign report for every WooCommerce store.',
    tags: ['Cloudflare Pages', 'Workers', 'D1', 'R2', 'WooCommerce'],
    cover: { word: 'Portal', sub: 'login · PDF · per store' },
    accent: '#5ee0d4',
  },
  {
    id: 'outreach',
    title: 'B2B outreach engine',
    kind: 'Sweden & UK · lead generation',
    meta: 'In production',
    description:
      'Automated B2B outreach flows for two markets, email deliverability with SPF and DKIM, and a bilingual quiz that sends leads straight into the CRM.',
    tags: ['GoHighLevel', 'SPF / DKIM', 'Node.js', 'TypeScript'],
    cover: { word: 'Outreach', sub: 'SE · UK · quiz → CRM' },
    accent: '#ff8a5b',
  },
  {
    id: 'platform',
    title: 'Connector platform & internal AI tools',
    kind: 'Angry Creative Group · architecture',
    meta: 'In production',
    description:
      'Architecture for a connector platform shared across the group, plus internal tools that let designers and project managers use AI in their daily work.',
    tags: ['Architecture', 'TypeScript', 'Python', 'Claude Code'],
    cover: { word: 'Platform', sub: 'one connector layer for the group' },
    accent: '#f4f2ec',
  },
];

// Earlier work, before Cyntora.
export const earlier = [
  {
    id: 'primate',
    title: 'Primate Lounge',
    kind: 'Client site with a lightweight CMS',
    year: '2024',
    tags: ['Vue', 'Node.js', 'MongoDB'],
    url: 'https://www.primatelounge.se',
    image: '/assets/projects/primate.png',
  },
  {
    id: 'pulumock',
    title: 'Pulumock',
    kind: 'Bachelor thesis · unit testing toolkit for Pulumi .NET',
    year: '2025',
    tags: ['C#', '.NET', 'Pulumi'],
    url: 'https://github.com/amedipiran',
  },
  {
    id: 'cms',
    title: 'Webbpoolen CMS',
    kind: 'Diploma project · PHP framework from scratch',
    year: '2024',
    tags: ['PHP', 'JavaScript', 'SCSS'],
  },
];
