const hoursAgo = (h) => new Date(Date.now() - h * 60 * 60 * 1000).toISOString();
const daysAgo = (d) => new Date(Date.now() - d * 24 * 60 * 60 * 1000).toISOString();
const hoursFromNow = (h) => new Date(Date.now() + h * 60 * 60 * 1000).toISOString();

export const teamMembers = [
  { id: 'u1', name: 'Alex Chen', email: 'alex@flowdesk.co', role: 'Admin', status: 'online', ticketsHandled: 142, avgResponseTime: 3.2, csat: 4.9, avatarSeed: 'alex' },
  { id: 'u2', name: 'Maya Patel', email: 'maya@flowdesk.co', role: 'Manager', status: 'online', ticketsHandled: 128, avgResponseTime: 4.1, csat: 4.7, avatarSeed: 'maya' },
  { id: 'u3', name: 'Jordan Kim', email: 'jordan@flowdesk.co', role: 'Support Agent', status: 'away', ticketsHandled: 96, avgResponseTime: 5.8, csat: 4.5, avatarSeed: 'jordan' },
  { id: 'u4', name: 'Sophia Martinez', email: 'sophia@flowdesk.co', role: 'Support Agent', status: 'online', ticketsHandled: 115, avgResponseTime: 3.9, csat: 4.8, avatarSeed: 'sophia' },
  { id: 'u5', name: 'Liam OConnor', email: 'liam@flowdesk.co', role: 'Support Agent', status: 'offline', ticketsHandled: 87, avgResponseTime: 6.2, csat: 4.3, avatarSeed: 'liam' },
  { id: 'u6', name: 'Emma Svensson', email: 'emma@flowdesk.co', role: 'Manager', status: 'online', ticketsHandled: 134, avgResponseTime: 3.5, csat: 4.8, avatarSeed: 'emma' },
  { id: 'u7', name: 'Noah Williams', email: 'noah@flowdesk.co', role: 'Support Agent', status: 'online', ticketsHandled: 102, avgResponseTime: 4.7, csat: 4.6, avatarSeed: 'noah' },
  { id: 'u8', name: 'Aisha Rahman', email: 'aisha@flowdesk.co', role: 'Support Agent', status: 'busy', ticketsHandled: 119, avgResponseTime: 4.0, csat: 4.7, avatarSeed: 'aisha' },
];

export const customers = [
  { id: 'c1', name: 'Elena Rossi', email: 'elena@montagna.io', company: 'Montagna', plan: 'Enterprise', totalTickets: 24, openTickets: 2, resolvedTickets: 22, avgResponseTime: 2.8, customerSince: daysAgo(184), lastInteraction: hoursAgo(2), status: 'active', avatarSeed: 'elena' },
  { id: 'c2', name: 'Marcus Thompson', email: 'marcus@helixbio.com', company: 'Helix Biotech', plan: 'Business', totalTickets: 17, openTickets: 1, resolvedTickets: 16, avgResponseTime: 3.1, customerSince: daysAgo(240), lastInteraction: hoursAgo(6), status: 'active', avatarSeed: 'marcus' },
  { id: 'c3', name: 'Yuki Tanaka', email: 'yuki@sakura-design.jp', company: 'Sakura Design', plan: 'Starter', totalTickets: 8, openTickets: 0, resolvedTickets: 8, avgResponseTime: 2.4, customerSince: daysAgo(95), lastInteraction: daysAgo(12), status: 'inactive', avatarSeed: 'yuki' },
  { id: 'c4', name: 'David Okonkwo', email: 'david@kineti.co', company: 'Kineti Sports', plan: 'Business', totalTickets: 31, openTickets: 4, resolvedTickets: 27, avgResponseTime: 3.6, customerSince: daysAgo(310), lastInteraction: hoursAgo(1), status: 'active', avatarSeed: 'david' },
  { id: 'c5', name: 'Clara Nguyen', email: 'clara@northwindlabs.com', company: 'Northwind Labs', plan: 'Enterprise', totalTickets: 42, openTickets: 3, resolvedTickets: 39, avgResponseTime: 2.2, customerSince: daysAgo(420), lastInteraction: hoursAgo(4), status: 'active', avatarSeed: 'clara' },
  { id: 'c6', name: 'Anders Holm', email: 'anders@fjordtech.no', company: 'Fjord Technology', plan: 'Growth', totalTickets: 15, openTickets: 1, resolvedTickets: 14, avgResponseTime: 4.1, customerSince: daysAgo(150), lastInteraction: daysAgo(3), status: 'active', avatarSeed: 'anders' },
  { id: 'c7', name: 'Priya Mehta', email: 'priya@aetherstudios.in', company: 'Aether Studios', plan: 'Starter', totalTickets: 6, openTickets: 0, resolvedTickets: 6, avgResponseTime: 3.0, customerSince: daysAgo(65), lastInteraction: daysAgo(8), status: 'inactive', avatarSeed: 'priya' },
  { id: 'c8', name: 'Henry Dubois', email: 'henry@atlasfreres.fr', company: 'Atlas Frères', plan: 'Business', totalTickets: 22, openTickets: 2, resolvedTickets: 20, avgResponseTime: 3.4, customerSince: daysAgo(275), lastInteraction: hoursAgo(8), status: 'active', avatarSeed: 'henry' },
  { id: 'c9', name: 'Zara Khan', email: 'zara@ember-retail.com', company: 'Ember Retail', plan: 'Growth', totalTickets: 19, openTickets: 3, resolvedTickets: 16, avgResponseTime: 3.8, customerSince: daysAgo(120), lastInteraction: hoursAgo(3), status: 'active', avatarSeed: 'zara' },
  { id: 'c10', name: 'Felix Baumgartner', email: 'felix@alpin-software.de', company: 'Alpin Software', plan: 'Business', totalTickets: 28, openTickets: 1, resolvedTickets: 27, avgResponseTime: 2.9, customerSince: daysAgo(340), lastInteraction: daysAgo(2), status: 'active', avatarSeed: 'felix' },
  { id: 'c11', name: 'Isabella Costa', email: 'isabella@rio-solutions.br', company: 'Rio Solutions', plan: 'Starter', totalTickets: 9, openTickets: 1, resolvedTickets: 8, avgResponseTime: 4.5, customerSince: daysAgo(48), lastInteraction: hoursAgo(10), status: 'active', avatarSeed: 'isabella' },
  { id: 'c12', name: 'James Fitzgerald', email: 'james@claddagh.ie', company: 'Claddagh Publishing', plan: 'Growth', totalTickets: 14, openTickets: 0, resolvedTickets: 14, avgResponseTime: 3.3, customerSince: daysAgo(200), lastInteraction: daysAgo(5), status: 'inactive', avatarSeed: 'james' },
  { id: 'c13', name: 'Amira Hassan', email: 'amira@nile-digital.eg', company: 'Nile Digital', plan: 'Business', totalTickets: 25, openTickets: 2, resolvedTickets: 23, avgResponseTime: 3.1, customerSince: daysAgo(290), lastInteraction: hoursAgo(5), status: 'active', avatarSeed: 'amira' },
  { id: 'c14', name: 'Vladimir Petrov', email: 'vladimir@taiga-systems.ru', company: 'Taiga Systems', plan: 'Enterprise', totalTickets: 38, openTickets: 5, resolvedTickets: 33, avgResponseTime: 2.6, customerSince: daysAgo(380), lastInteraction: hoursAgo(1), status: 'active', avatarSeed: 'vladimir' },
  { id: 'c15', name: 'Camila Flores', email: 'camila@andes-cloud.cl', company: 'Andes Cloud', plan: 'Growth', totalTickets: 18, openTickets: 1, resolvedTickets: 17, avgResponseTime: 3.9, customerSince: daysAgo(165), lastInteraction: daysAgo(1), status: 'active', avatarSeed: 'camila' },
  { id: 'c16', name: 'Oskar Lindqvist', email: 'oskar@aurora-finance.se', company: 'Aurora Finance', plan: 'Enterprise', totalTickets: 45, openTickets: 2, resolvedTickets: 43, avgResponseTime: 2.1, customerSince: daysAgo(460), lastInteraction: hoursAgo(7), status: 'active', avatarSeed: 'oskar' },
  { id: 'c17', name: 'Ravi Desai', email: 'ravi@monsoon-apps.in', company: 'Monsoon Apps', plan: 'Starter', totalTickets: 5, openTickets: 0, resolvedTickets: 5, avgResponseTime: 4.2, customerSince: daysAgo(30), lastInteraction: daysAgo(4), status: 'active', avatarSeed: 'ravi' },
  { id: 'c18', name: 'Nadia El Amrani', email: 'nadia@sahara-logistics.ma', company: 'Sahara Logistics', plan: 'Business', totalTickets: 21, openTickets: 2, resolvedTickets: 19, avgResponseTime: 3.7, customerSince: daysAgo(250), lastInteraction: hoursAgo(9), status: 'active', avatarSeed: 'nadia' },
  { id: 'c19', name: 'Mateusz Kowalski', email: 'mateusz@carpathia-tech.pl', company: 'Carpathia Tech', plan: 'Growth', totalTickets: 12, openTickets: 0, resolvedTickets: 12, avgResponseTime: 4.0, customerSince: daysAgo(110), lastInteraction: daysAgo(7), status: 'inactive', avatarSeed: 'mateusz' },
  { id: 'c20', name: 'Lucia Alvarez', email: 'lucia@pampa-agro.com.ar', company: 'Pampa Agro', plan: 'Starter', totalTickets: 7, openTickets: 1, resolvedTickets: 6, avgResponseTime: 4.8, customerSince: daysAgo(55), lastInteraction: hoursAgo(11), status: 'active', avatarSeed: 'lucia' },
  { id: 'c21', name: 'Kenji Watanabe', email: 'kenji@tsunami-dev.jp', company: 'Tsunami Dev', plan: 'Business', totalTickets: 26, openTickets: 3, resolvedTickets: 23, avgResponseTime: 2.7, customerSince: daysAgo(320), lastInteraction: hoursAgo(2), status: 'active', avatarSeed: 'kenji' },
  { id: 'c22', name: 'Grace Adeyemi', email: 'grace@savannah-soft.ng', company: 'Savannah Soft', plan: 'Growth', totalTickets: 16, openTickets: 1, resolvedTickets: 15, avgResponseTime: 3.5, customerSince: daysAgo(140), lastInteraction: daysAgo(1), status: 'active', avatarSeed: 'grace' },
];

const statuses = ['Open', 'In Progress', 'Pending', 'Resolved'];
const priorities = ['Low', 'Medium', 'High', 'Urgent'];
const channels = ['email', 'chat', 'phone', 'twitter'];
const categories = ['Billing', 'Technical', 'Feature Request', 'Account', 'Bug Report', 'General Inquiry'];

export const tickets = [
  { id: 'T-1042', customerId: 'c4', customer: 'David Okonkwo', subject: 'API rate limit exceeded on production endpoint', status: 'Open', priority: 'Urgent', assigneeId: 'u1', assignee: 'Alex Chen', createdAt: hoursAgo(1), updatedAt: hoursAgo(1), channel: 'chat', category: 'Technical', tags: ['api', 'production', 'urgent'], description: 'We are hitting 429 errors on our main production endpoint starting about 30 minutes ago. This is impacting customer checkout flow.' },
  { id: 'T-1041', customerId: 'c5', customer: 'Clara Nguyen', subject: 'Custom report builder not exporting CSV', status: 'In Progress', priority: 'High', assigneeId: 'u4', assignee: 'Sophia Martinez', createdAt: hoursAgo(3), updatedAt: hoursAgo(2), channel: 'email', category: 'Bug Report', tags: ['reports', 'csv', 'export'], description: 'The custom report builder shows success but the CSV never downloads. Tried on multiple browsers.' },
  { id: 'T-1040', customerId: 'c1', customer: 'Elena Rossi', subject: 'SSO configuration with Okta failing', status: 'In Progress', priority: 'High', assigneeId: 'u2', assignee: 'Maya Patel', createdAt: hoursAgo(5), updatedAt: hoursAgo(3), channel: 'email', category: 'Technical', tags: ['sso', 'okta', 'enterprise'], description: "We've followed the SSO setup guide step by step but keep getting a 401 on callback. Our IT team reviewed the settings and everything looks correct on our side." },
  { id: 'T-1039', customerId: 'c14', customer: 'Vladimir Petrov', subject: 'Invoice discrepancy for Q3', status: 'Pending', priority: 'Medium', assigneeId: 'u6', assignee: 'Emma Svensson', createdAt: hoursAgo(7), updatedAt: hoursAgo(4), channel: 'email', category: 'Billing', tags: ['invoice', 'q3', 'billing'], description: 'The invoice we received shows 120 seats but our contract specifies 100 for this quarter. Can you please review and issue a corrected invoice or credit?' },
  { id: 'T-1038', customerId: 'c9', customer: 'Zara Khan', subject: 'Weekly digest email not being received', status: 'Open', priority: 'Medium', assigneeId: 'u8', assignee: 'Aisha Rahman', createdAt: hoursAgo(10), updatedAt: hoursAgo(10), channel: 'chat', category: 'Bug Report', tags: ['email', 'digest', 'notifications'], description: "We haven't received the weekly digest email for the past 2 weeks. Checked spam folder, not there." },
  { id: 'T-1037', customerId: 'c16', customer: 'Oskar Lindqvist', subject: 'Feature request: Webhook signature verification', status: 'Pending', priority: 'Low', assigneeId: 'u3', assignee: 'Jordan Kim', createdAt: hoursAgo(14), updatedAt: hoursAgo(12), channel: 'email', category: 'Feature Request', tags: ['webhooks', 'security', 'feature'], description: 'It would be great if you could add HMAC signature verification for webhooks so we can validate payload authenticity on our end.' },
  { id: 'T-1036', customerId: 'c8', customer: 'Henry Dubois', subject: 'Mobile app crash on iOS 18 beta', status: 'In Progress', priority: 'High', assigneeId: 'u7', assignee: 'Noah Williams', createdAt: hoursAgo(18), updatedAt: hoursAgo(15), channel: 'twitter', category: 'Bug Report', tags: ['mobile', 'ios', 'crash'], description: 'App crashes on launch since updating to iOS 18 developer beta. Tried reinstalling, same issue. iPhone 15 Pro.' },
  { id: 'T-1035', customerId: 'c2', customer: 'Marcus Thompson', subject: 'How to migrate data from legacy plan?', status: 'Resolved', priority: 'Medium', assigneeId: 'u4', assignee: 'Sophia Martinez', createdAt: daysAgo(1) + 1, updatedAt: hoursAgo(20), channel: 'email', category: 'General Inquiry', tags: ['migration', 'legacy'], description: 'We are on the legacy v2 plan and need to move all our data to the new v3 platform. What is the process and timeline?' },
  { id: 'T-1034', customerId: 'c13', customer: 'Amira Hassan', subject: 'Two-factor auth reset needed', status: 'Open', priority: 'Urgent', assigneeId: 'u1', assignee: 'Alex Chen', createdAt: hoursAgo(22), updatedAt: hoursAgo(22), channel: 'phone', category: 'Account', tags: ['2fa', 'security', 'account'], description: 'Our account administrator lost their phone and needs 2FA reset. I can provide verification documents.' },
  { id: 'T-1033', customerId: 'c6', customer: 'Anders Holm', subject: 'Dashboard widget alignment issue on Safari', status: 'Pending', priority: 'Low', assigneeId: 'u8', assignee: 'Aisha Rahman', createdAt: daysAgo(1), updatedAt: hoursAgo(23), channel: 'chat', category: 'Bug Report', tags: ['ui', 'safari', 'dashboard'], description: 'On Safari 17, the KPI widgets on the dashboard are misaligned and overlapping each other. Works fine on Chrome.' },
  { id: 'T-1032', customerId: 'c21', customer: 'Kenji Watanabe', subject: 'Bulk user import template issue', status: 'In Progress', priority: 'Medium', assigneeId: 'u3', assignee: 'Jordan Kim', createdAt: daysAgo(1), updatedAt: hoursAgo(25), channel: 'email', category: 'Technical', tags: ['import', 'users', 'csv'], description: 'The bulk import template we downloaded from settings is throwing validation errors even though we followed the format exactly. Row 12, column role seems to be the issue.' },
  { id: 'T-1031', customerId: 'c11', customer: 'Isabella Costa', subject: 'Payment method update failing', status: 'Open', priority: 'High', assigneeId: 'u6', assignee: 'Emma Svensson', createdAt: daysAgo(2), updatedAt: daysAgo(2), channel: 'chat', category: 'Billing', tags: ['payment', 'credit-card', 'billing'], description: 'Every time we try to update our credit card in billing settings, it goes through the 3DS flow then shows a generic error. Card is valid and has funds.' },
  { id: 'T-1030', customerId: 'c18', customer: 'Nadia El Amrani', subject: 'API webhook retry behavior documentation', status: 'Resolved', priority: 'Low', assigneeId: 'u2', assignee: 'Maya Patel', createdAt: daysAgo(2), updatedAt: daysAgo(1), channel: 'email', category: 'General Inquiry', tags: ['webhooks', 'docs', 'api'], description: "Can you clarify the webhook retry schedule? We need to know if there's exponential backoff and when events are dropped." },
  { id: 'T-1029', customerId: 'c15', customer: 'Camila Flores', subject: 'Audit log export limited to 1000 rows', status: 'Open', priority: 'Medium', assigneeId: 'u7', assignee: 'Noah Williams', createdAt: daysAgo(3), updatedAt: daysAgo(3), channel: 'email', category: 'Feature Request', tags: ['audit', 'export', 'logs'], description: 'Compliance requires us to export a full year of audit logs but the export tool caps at 1000 rows. Need a solution for larger exports.' },
  { id: 'T-1028', customerId: 'c22', customer: 'Grace Adeyemi', subject: 'Role permissions: Cannot view own tickets', status: 'Pending', priority: 'Medium', assigneeId: 'u4', assignee: 'Sophia Martinez', createdAt: daysAgo(3), updatedAt: daysAgo(2), channel: 'chat', category: 'Bug Report', tags: ['permissions', 'roles', 'tickets'], description: "We created a custom role with 'view own tickets' permission but users in that role see nothing. Admin override works fine." },
  { id: 'T-1027', customerId: 'c10', customer: 'Felix Baumgartner', subject: 'Custom domain SSL certificate error', status: 'In Progress', priority: 'Urgent', assigneeId: 'u1', assignee: 'Alex Chen', createdAt: daysAgo(4), updatedAt: daysAgo(3), channel: 'email', category: 'Technical', tags: ['ssl', 'custom-domain', 'dns'], description: 'Our custom domain help.alpin-software.de is showing SSL certificate mismatch error. We pointed the CNAME correctly 48 hours ago.' },
  { id: 'T-1026', customerId: 'c12', customer: 'James Fitzgerald', subject: 'GDPR data export request', status: 'Resolved', priority: 'Medium', assigneeId: 'u8', assignee: 'Aisha Rahman', createdAt: daysAgo(5), updatedAt: daysAgo(4), channel: 'email', category: 'Account', tags: ['gdpr', 'export', 'privacy'], description: 'Under GDPR, we are requesting a full data export for our organization including all tickets, user data, and analytics history.' },
  { id: 'T-1025', customerId: 'c3', customer: 'Yuki Tanaka', subject: 'Upgrade from Starter to Growth plan', status: 'Resolved', priority: 'Low', assigneeId: 'u6', assignee: 'Emma Svensson', createdAt: daysAgo(6), updatedAt: daysAgo(5), channel: 'chat', category: 'Billing', tags: ['upgrade', 'plan', 'pricing'], description: 'We would like to upgrade our Starter plan to Growth. What features will be unlocked and how does billing prorate?' },
  { id: 'T-1024', customerId: 'c20', customer: 'Lucia Alvarez', subject: 'Unable to add team member invitation', status: 'Open', priority: 'Medium', assigneeId: 'u3', assignee: 'Jordan Kim', createdAt: daysAgo(6), updatedAt: daysAgo(6), channel: 'chat', category: 'Bug Report', tags: ['team', 'invitation', 'users'], description: 'When I click "Invite Member" and fill the form, nothing happens. No error shown, console shows 422 Unprocessable Entity.' },
  { id: 'T-1023', customerId: 'c17', customer: 'Ravi Desai', subject: 'Welcome email template customization', status: 'Pending', priority: 'Low', assigneeId: 'u8', assignee: 'Aisha Rahman', createdAt: daysAgo(7), updatedAt: daysAgo(7), channel: 'email', category: 'Feature Request', tags: ['email', 'templates', 'branding'], description: 'Can we customize the welcome email that users get when invited? Currently it says "Flowdesk" but we want our branding and logo.' },
  { id: 'T-1022', customerId: 'c19', customer: 'Mateusz Kowalski', subject: 'Slack integration stopped posting updates', status: 'Resolved', priority: 'High', assigneeId: 'u2', assignee: 'Maya Patel', createdAt: daysAgo(8), updatedAt: daysAgo(8), channel: 'chat', category: 'Technical', tags: ['slack', 'integration', 'notifications'], description: 'The Slack integration that posts new ticket alerts to #support suddenly stopped working 3 days ago. Tried reconnecting, no luck.' },
  { id: 'T-1021', customerId: 'c7', customer: 'Priya Mehta', subject: 'Trial extension requested', status: 'Resolved', priority: 'Low', assigneeId: 'u6', assignee: 'Emma Svensson', createdAt: daysAgo(10), updatedAt: daysAgo(10), channel: 'email', category: 'Account', tags: ['trial', 'extension', 'billing'], description: 'We had a busy week and did not get a chance to fully evaluate the product. Can we get a 7-day trial extension?' },
  { id: 'T-1020', customerId: 'c1', customer: 'Elena Rossi', subject: 'Add custom field to ticket forms', status: 'In Progress', priority: 'Medium', assigneeId: 'u4', assignee: 'Sophia Martinez', createdAt: daysAgo(11), updatedAt: daysAgo(9), channel: 'email', category: 'Feature Request', tags: ['custom-fields', 'forms', 'metadata'], description: 'We need to capture "Server Region" as a required field on all support tickets for our enterprise customers. Is this configurable?' },
  { id: 'T-1019', customerId: 'c4', customer: 'David Okonkwo', subject: 'Database migration slow on large dataset', status: 'Open', priority: 'Urgent', assigneeId: 'u1', assignee: 'Alex Chen', createdAt: daysAgo(12), updatedAt: daysAgo(12), channel: 'chat', category: 'Technical', tags: ['migration', 'performance', 'database'], description: 'Running the v3 data migration on our 2.4M ticket database has been running for 14 hours and is only 18% complete. This is blocking our launch.' },
  { id: 'T-1018', customerId: 'c14', customer: 'Vladimir Petrov', subject: 'SAML signing certificate expiring', status: 'Pending', priority: 'High', assigneeId: 'u2', assignee: 'Maya Patel', createdAt: daysAgo(13), updatedAt: daysAgo(10), channel: 'email', category: 'Technical', tags: ['saml', 'sso', 'certificate'], description: 'Alert says SAML signing certificate expires in 3 days. We need instructions on rotating the certificate without downtime.' },
  { id: 'T-1017', customerId: 'c5', customer: 'Clara Nguyen', subject: 'Analytics data missing for last Monday', status: 'Resolved', priority: 'Medium', assigneeId: 'u7', assignee: 'Noah Williams', createdAt: daysAgo(14), updatedAt: daysAgo(13), channel: 'chat', category: 'Bug Report', tags: ['analytics', 'data', 'gap'], description: 'Analytics dashboard shows zero data for Monday last week but we definitely processed 150+ tickets that day. Our logs confirm this.' },
  { id: 'T-1016', customerId: 'c8', customer: 'Henry Dubois', subject: 'Agent workload report incorrect totals', status: 'In Progress', priority: 'Medium', assigneeId: 'u8', assignee: 'Aisha Rahman', createdAt: daysAgo(15), updatedAt: daysAgo(12), channel: 'email', category: 'Bug Report', tags: ['reports', 'workload', 'analytics'], description: 'The agent workload report is undercounting tickets by about 15% for all agents. Comparing with individual ticket lists shows the discrepancy.' },
];

export const conversations = [
  {
    id: 'conv1',
    customerId: 'c4',
    customer: 'David Okonkwo',
    customerEmail: 'david@kineti.co',
    avatarSeed: 'david',
    preview: 'The 429 errors are still happening. We just lost 3 orders in the last 10 minutes...',
    channel: 'chat',
    priority: 'Urgent',
    status: 'Open',
    assigneeId: 'u1',
    assignee: 'Alex Chen',
    unread: true,
    timestamp: hoursAgo(1),
    ticketId: 'T-1042',
    messages: [
      { id: 'm1', author: 'customer', content: "Hi team, we're seeing 429 rate limit errors on our production API endpoint /v2/orders starting about 30 minutes ago. This is hitting our checkout flow directly.", timestamp: hoursAgo(1.5) },
      { id: 'm2', author: 'agent', agentId: 'u1', agentName: 'Alex Chen', content: "Hi David, I'm sorry to hear that. Let me check our rate limit logs immediately. Can you confirm which API key is being used and the approximate request volume?", timestamp: hoursAgo(1.4) },
      { id: 'm3', author: 'customer', content: "API key starts with sk_live_8f2a. We're doing about 400 req/min which should be well under our enterprise limit of 5000/min.", timestamp: hoursAgo(1.3) },
      { id: 'm4', author: 'note', agentId: 'u4', agentName: 'Sophia Martinez', content: 'Checked the rate limiter config - enterprise keys are hitting the default staging limit. Wrong env config deployed.', timestamp: hoursAgo(1.2) },
      { id: 'm5', author: 'agent', agentId: 'u1', agentName: 'Alex Chen', content: 'Found the issue. Our latest deploy incorrectly applied staging rate limits to production. Rolling back now - should be resolved in 3-5 minutes.', timestamp: hoursAgo(1.1) },
      { id: 'm6', author: 'customer', content: "The 429 errors are still happening. We just lost 3 orders in the last 10 minutes. I know it hasn't been 5 minutes yet, just keeping you posted.", timestamp: hoursAgo(1) },
    ],
  },
  {
    id: 'conv2',
    customerId: 'c5',
    customer: 'Clara Nguyen',
    customerEmail: 'clara@northwindlabs.com',
    avatarSeed: 'clara',
    preview: 'That seems to have done it! CSVs are downloading correctly now. Thank you so much...',
    channel: 'email',
    priority: 'High',
    status: 'In Progress',
    assigneeId: 'u4',
    assignee: 'Sophia Martinez',
    unread: false,
    timestamp: hoursAgo(2),
    ticketId: 'T-1041',
    messages: [
      { id: 'm1', author: 'customer', content: 'Hi, the custom report builder says export complete but no CSV downloads. Tried Chrome, Firefox, Safari - same result. Need this for board reporting tomorrow.', timestamp: hoursAgo(3.5) },
      { id: 'm2', author: 'agent', agentId: 'u4', agentName: 'Sophia Martinez', content: 'Hi Clara, sorry for the trouble. I found the issue - there was a Content-Disposition header mismatch on large reports. Pushing a hotfix now.', timestamp: hoursAgo(2.5) },
      { id: 'm3', author: 'customer', content: 'That seems to have done it! CSVs are downloading correctly now. Thank you so much for the quick turnaround.', timestamp: hoursAgo(2) },
    ],
  },
  {
    id: 'conv3',
    customerId: 'c13',
    customer: 'Amira Hassan',
    customerEmail: 'amira@nile-digital.eg',
    avatarSeed: 'amira',
    preview: 'Yes, I have the government-issued ID and company registration...',
    channel: 'phone',
    priority: 'Urgent',
    status: 'Open',
    assigneeId: 'u1',
    assignee: 'Alex Chen',
    unread: true,
    timestamp: hoursAgo(3),
    ticketId: 'T-1034',
    messages: [
      { id: 'm1', author: 'customer', content: "URGENT: Our account administrator Hossam lost his work phone on the subway. He can't log in and we need to reset 2FA immediately so we can process billing today.", timestamp: hoursAgo(4) },
      { id: 'm2', author: 'agent', agentId: 'u1', agentName: 'Alex Chen', content: "I understand Amira. For security, I'll need to verify the account. Can you provide the last 4 of the card on file, and have the account owner email from their registered address confirming the 2FA reset request?", timestamp: hoursAgo(3.8) },
      { id: 'm3', author: 'customer', content: 'Yes, I have the government-issued ID and company registration ready. Last 4 of the card on file is 4821. Hossam will email you right now.', timestamp: hoursAgo(3) },
    ],
  },
  {
    id: 'conv4',
    customerId: 'c1',
    customer: 'Elena Rossi',
    customerEmail: 'elena@montagna.io',
    avatarSeed: 'elena',
    preview: "The assertion mapping looks right on our side. We've double-checked...",
    channel: 'email',
    priority: 'High',
    status: 'In Progress',
    assigneeId: 'u2',
    assignee: 'Maya Patel',
    unread: false,
    timestamp: hoursAgo(5),
    ticketId: 'T-1040',
    messages: [
      { id: 'm1', author: 'customer', content: "We've been trying to set up Okta SSO for 3 days. Every time the callback comes back we get a generic 401 error in Flowdesk but no details on what's wrong.", timestamp: hoursAgo(6) },
      { id: 'm2', author: 'agent', agentId: 'u2', agentName: 'Maya Patel', content: "Hi Elena, let's get this sorted. 401 on callback usually means either the audience, ACS URL, or NameID format doesn't match. Can you confirm your Audience Restriction is set to https://app.flowdesk.co/sso/saml?", timestamp: hoursAgo(5.5) },
      { id: 'm3', author: 'customer', content: "The assertion mapping looks right on our side. We've double-checked all three. Could there be something else? Could the certificate be the problem?", timestamp: hoursAgo(5) },
    ],
  },
  {
    id: 'conv5',
    customerId: 'c10',
    customer: 'Felix Baumgartner',
    customerEmail: 'felix@alpin-software.de',
    avatarSeed: 'felix',
    preview: 'Still seeing NET::ERR_CERT_COMMON_NAME_INVALID. Tried clearing browser cache...',
    channel: 'email',
    priority: 'Urgent',
    status: 'In Progress',
    assigneeId: 'u1',
    assignee: 'Alex Chen',
    unread: false,
    timestamp: hoursAgo(8),
    ticketId: 'T-1027',
    messages: [
      { id: 'm1', author: 'customer', content: 'help.alpin-software.de is showing certificate error. CNAME was set correctly 48h ago and we verified DNS propagation globally.', timestamp: daysAgo(4) },
      { id: 'm2', author: 'agent', agentId: 'u1', agentName: 'Alex Chen', content: 'I see the issue - our TLS provisioner had a backlog. Triggered a manual certificate issuance. Should be active in 15-20 minutes.', timestamp: hoursAgo(10) },
      { id: 'm3', author: 'customer', content: 'Still seeing NET::ERR_CERT_COMMON_NAME_INVALID. Tried clearing browser cache and multiple devices.', timestamp: hoursAgo(8) },
    ],
  },
  {
    id: 'conv6',
    customerId: 'c9',
    customer: 'Zara Khan',
    customerEmail: 'zara@ember-retail.com',
    avatarSeed: 'zara',
    preview: "Checked spam, promotions, everything. They're just not arriving.",
    channel: 'chat',
    priority: 'Medium',
    status: 'Open',
    assigneeId: 'u8',
    assignee: 'Aisha Rahman',
    unread: false,
    timestamp: hoursAgo(10),
    ticketId: 'T-1038',
    messages: [
      { id: 'm1', author: 'customer', content: 'We normally get our weekly analytics digest every Monday morning but nothing has come for the last 2 weeks.', timestamp: hoursAgo(12) },
      { id: 'm2', author: 'agent', agentId: 'u8', agentName: 'Aisha Rahman', content: 'Let me check your email delivery logs. The digests have been sent - can you search for "Flowdesk Weekly Digest" including spam and promotions folders?', timestamp: hoursAgo(11) },
      { id: 'm3', author: 'customer', content: "Checked spam, promotions, everything. They're just not arriving. Our IT says nothing was blocked on our firewall either.", timestamp: hoursAgo(10) },
    ],
  },
  {
    id: 'conv7',
    customerId: 'c11',
    customer: 'Isabella Costa',
    customerEmail: 'isabella@rio-solutions.br',
    avatarSeed: 'isabella',
    preview: 'Yes the card works fine online everywhere else. Should I try a different...',
    channel: 'chat',
    priority: 'High',
    status: 'Open',
    assigneeId: 'u6',
    assignee: 'Emma Svensson',
    unread: true,
    timestamp: hoursAgo(13),
    ticketId: 'T-1031',
    messages: [
      { id: 'm1', author: 'customer', content: 'Need to update credit card for billing. 3DS popup loads, I approve, then it says "Payment failed" with no further details. This is urgent because the old card is expiring.', timestamp: hoursAgo(14) },
      { id: 'm2', author: 'agent', agentId: 'u6', agentName: 'Emma Svensson', content: "Sorry about that. Looking at our payment logs, the bank is actually declining the transaction with code 'Do not honor'. This is typically a card-side issue. Can you try a different card or contact your bank?", timestamp: hoursAgo(13.5) },
      { id: 'm3', author: 'customer', content: 'Yes the card works fine online everywhere else. Should I try a different payment method? PayPal maybe?', timestamp: hoursAgo(13) },
    ],
  },
  {
    id: 'conv8',
    customerId: 'c21',
    customer: 'Kenji Watanabe',
    customerEmail: 'kenji@tsunami-dev.jp',
    avatarSeed: 'seed',
    preview: "Column header says 'role' with that exact spelling. Are there any hidden character...",
    channel: 'email',
    priority: 'Medium',
    status: 'In Progress',
    assigneeId: 'u3',
    assignee: 'Jordan Kim',
    unread: false,
    timestamp: hoursAgo(16),
    ticketId: 'T-1032',
    messages: [
      { id: 'm1', author: 'customer', content: 'Trying to bulk import 150 team members using the template downloaded from settings. Row 12 is failing validation on the role column even though "Support Agent" is a valid role.', timestamp: hoursAgo(20) },
      { id: 'm2', author: 'agent', agentId: 'u3', agentName: 'Jordan Kim', content: "Let me look at the import schema. The role field might be case-sensitive or you might have trailing whitespace. Could you confirm the exact value in the cell and that the CSV is saved as UTF-8?", timestamp: hoursAgo(18) },
      { id: 'm3', author: 'customer', content: "Column header says 'role' with that exact spelling. Are there any hidden character requirements? File is UTF-8 confirmed.", timestamp: hoursAgo(16) },
    ],
  },
  {
    id: 'conv9',
    customerId: 'c14',
    customer: 'Vladimir Petrov',
    customerEmail: 'vladimir@taiga-systems.ru',
    avatarSeed: 'vladimir',
    preview: "Also, if there's a grace period beyond the 3 days please let me know as...",
    channel: 'email',
    priority: 'High',
    status: 'Pending',
    assigneeId: 'u2',
    assignee: 'Maya Patel',
    unread: false,
    timestamp: hoursAgo(20),
    ticketId: 'T-1018',
    messages: [
      { id: 'm1', author: 'customer', content: 'We received an alert that our SAML signing certificate expires in 3 days. Please provide step-by-step rotation instructions so we can do this without any SSO downtime for our 800 users.', timestamp: daysAgo(2) },
      { id: 'm2', author: 'agent', agentId: 'u2', agentName: 'Maya Patel', content: "You can add a second certificate to the IdP in Flowdesk settings and it will be accepted for a 7-day overlap window. I'll send the full guide as an attachment.", timestamp: daysAgo(1) },
      { id: 'm3', author: 'customer', content: "Also, if there's a grace period beyond the 3 days please let me know as our team needs to schedule the change.", timestamp: hoursAgo(20) },
    ],
  },
  {
    id: 'conv10',
    customerId: 'c2',
    customer: 'Marcus Thompson',
    customerEmail: 'marcus@helixbio.com',
    avatarSeed: 'marcus',
    preview: 'That worked perfectly. All data is showing. Thank you for the thorough doc...',
    channel: 'email',
    priority: 'Medium',
    status: 'Resolved',
    assigneeId: 'u4',
    assignee: 'Sophia Martinez',
    unread: false,
    timestamp: hoursAgo(23),
    ticketId: 'T-1035',
    messages: [
      { id: 'm1', author: 'customer', content: 'We have a lot of historical data on the legacy v2 platform. We need to get everything over to v3 without losing records. What is the process?', timestamp: daysAgo(2) },
      { id: 'm2', author: 'agent', agentId: 'u4', agentName: 'Sophia Martinez', content: "I've attached our v2-to-v3 migration guide. You run a 3-step CLI tool: 1) audit, 2) dry-run, 3) migrate. Takes about 2-4 hours for datasets of your size. Let me know if you want me on call during the process.", timestamp: daysAgo(1) },
      { id: 'm3', author: 'customer', content: 'That worked perfectly. All data is showing. Thank you for the thorough documentation and the tool.', timestamp: hoursAgo(23) },
    ],
  },
  {
    id: 'conv11',
    customerId: 'c4',
    customer: 'David Okonkwo',
    customerEmail: 'david@kineti.co',
    avatarSeed: 'david',
    preview: '14 hours at 18%. This is going to miss our weekend migration window...',
    channel: 'chat',
    priority: 'Urgent',
    status: 'Open',
    assigneeId: 'u1',
    assignee: 'Alex Chen',
    unread: true,
    timestamp: hoursAgo(24),
    ticketId: 'T-1019',
    messages: [
      { id: 'm1', author: 'customer', content: 'Running v3 migration on 2.4M tickets. ETA was 4 hours, now at 14 hours and still going.', timestamp: hoursAgo(30) },
      { id: 'm2', author: 'agent', agentId: 'u1', agentName: 'Alex Chen', content: 'We recently patched a migration performance issue with ticket comments. The CLI v3.2.1 is 6-8x faster on large datasets. Can you upgrade and restart?', timestamp: hoursAgo(26) },
      { id: 'm3', author: 'customer', content: '14 hours at 18%. This is going to miss our weekend migration window if we restart now. Can you prioritize a hotfix for the running migration?', timestamp: hoursAgo(24) },
    ],
  },
  {
    id: 'conv12',
    customerId: 'c18',
    customer: 'Nadia El Amrani',
    customerEmail: 'nadia@sahara-logistics.ma',
    avatarSeed: 'nadia',
    preview: 'Thanks, the diagram really clarifies the retry stages. All set on this!',
    channel: 'email',
    priority: 'Low',
    status: 'Resolved',
    assigneeId: 'u2',
    assignee: 'Maya Patel',
    unread: false,
    timestamp: daysAgo(2),
    ticketId: 'T-1030',
    messages: [
      { id: 'm1', author: 'customer', content: 'We need to document webhook retry behavior for our incident response runbook. Exponential backoff? When do you stop retrying?', timestamp: daysAgo(3) },
      { id: 'm2', author: 'agent', agentId: 'u2', agentName: 'Maya Patel', content: 'Retry schedule: 1, 5, 15, 30 min then every 1 hour up to 24 hours total (27 attempts max). After that the webhook endpoint is marked dead and events are queued for 3 days. Exponential backoff with jitter.', timestamp: daysAgo(3) },
      { id: 'm3', author: 'customer', content: 'Thanks, the diagram really clarifies the retry stages. All set on this!', timestamp: daysAgo(2) },
    ],
  },
];

export const teamActivity = [
  { id: 'a1', userId: 'u4', userName: 'Sophia Martinez', action: 'resolved', target: 'ticket T-1035', forCustomer: 'Marcus Thompson (Helix Biotech)', timestamp: hoursAgo(0.5) },
  { id: 'a2', userId: 'u2', userName: 'Maya Patel', action: 'assigned to', target: 'conversation from Clara Nguyen', forCustomer: '', timestamp: hoursAgo(1) },
  { id: 'a3', userId: 'u1', userName: 'Alex Chen', action: 'changed priority to Urgent on', target: 'ticket T-1042', forCustomer: 'David Okonkwo (Kineti Sports)', timestamp: hoursAgo(1.5) },
  { id: 'a4', userId: 'u8', userName: 'Aisha Rahman', action: 'sent a reply in', target: 'conversation Zara Khan', forCustomer: '', timestamp: hoursAgo(2) },
  { id: 'a5', userId: 'u6', userName: 'Emma Svensson', action: 'added a note to', target: 'ticket T-1039', forCustomer: 'Vladimir Petrov (Taiga Systems)', timestamp: hoursAgo(3) },
  { id: 'a6', userId: 'u7', userName: 'Noah Williams', action: 'opened', target: 'ticket T-1029', forCustomer: 'Camila Flores (Andes Cloud)', timestamp: hoursAgo(4) },
  { id: 'a7', userId: 'u3', userName: 'Jordan Kim', action: 'snoozed', target: 'ticket T-1037 (Feature Request)', forCustomer: '', timestamp: hoursAgo(5) },
  { id: 'a8', userId: 'u1', userName: 'Alex Chen', action: 'merged', target: 'ticket T-1015 into T-1042', forCustomer: 'Duplicate rate-limit reports', timestamp: hoursAgo(6) },
  { id: 'a9', userId: 'u4', userName: 'Sophia Martinez', action: 'tagged', target: 'ticket T-1020 with #custom-fields', forCustomer: '', timestamp: hoursAgo(8) },
  { id: 'a10', userId: 'u6', userName: 'Emma Svensson', action: 'processed refund for', target: 'invoice #INV-3381', forCustomer: 'Vladimir Petrov', timestamp: hoursAgo(10) },
];

export const kpis = {
  openTickets: { value: 47, previous: 52, change: -9.6, trend: [58, 55, 54, 52, 53, 50, 47] },
  resolvedToday: { value: 28, previous: 24, change: 16.7, trend: [18, 22, 20, 25, 23, 24, 28] },
  avgResponseTime: { value: 3.4, previous: 3.8, change: -10.5, trend: [4.1, 3.9, 3.8, 3.7, 3.6, 3.5, 3.4], suffix: ' min' },
  csat: { value: 96.2, previous: 94.8, change: 1.5, trend: [93.4, 94.1, 94.5, 95.0, 95.2, 94.8, 96.2], suffix: '%' },
};

function buildVolumeData(days, trend = 'stable') {
  const data = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const baseIncoming = trend === 'growing' ? 40 + Math.floor((days - i) * 0.5) : 40;
    const baseResolved = trend === 'improving' ? 36 + Math.floor((days - i) * 0.4) : 36;
    const incoming = baseIncoming + Math.floor(Math.random() * 18 - 9);
    const resolved = baseResolved + Math.floor(Math.random() * 18 - 9);
    const label = days <= 7
      ? d.toLocaleDateString('en-US', { weekday: 'short' })
      : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    data.push({ label, incoming, resolved });
  }
  return data;
}

export const volumeData7d = buildVolumeData(7);
export const volumeData30d = buildVolumeData(30, 'growing');
export const volumeData90d = buildVolumeData(90, 'growing');

function buildSatisfactionData(days) {
  const data = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const csat = 92 + Math.floor(Math.random() * 8);
    const responses = 8 + Math.floor(Math.random() * 14);
    const label = days <= 7
      ? d.toLocaleDateString('en-US', { weekday: 'short' })
      : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    data.push({ label, csat, responses });
  }
  return data;
}

export const csatData7d = buildSatisfactionData(7);
export const csatData30d = buildSatisfactionData(30);
export const csatData90d = buildSatisfactionData(90);

function buildResponseTimeData(days) {
  const data = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const avg = 2.8 + Math.random() * 2.2;
    const p95 = 6 + Math.random() * 5;
    const label = days <= 7
      ? d.toLocaleDateString('en-US', { weekday: 'short' })
      : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    data.push({ label, avg: Number(avg.toFixed(1)), p95: Number(p95.toFixed(1)) });
  }
  return data;
}

export const responseTimeData7d = buildResponseTimeData(7);
export const responseTimeData30d = buildResponseTimeData(30);
export const responseTimeData90d = buildResponseTimeData(90);

export const resolutionRateData = [
  { label: 'Mon', firstResponse: 68, within24h: 82, within48h: 94 },
  { label: 'Tue', firstResponse: 72, within24h: 85, within48h: 96 },
  { label: 'Wed', firstResponse: 65, within24h: 80, within48h: 93 },
  { label: 'Thu', firstResponse: 74, within24h: 86, within48h: 95 },
  { label: 'Fri', firstResponse: 70, within24h: 83, within48h: 92 },
  { label: 'Sat', firstResponse: 58, within24h: 76, within48h: 88 },
  { label: 'Sun', firstResponse: 55, within24h: 72, within48h: 85 },
];

export const categoryData = [
  { name: 'Technical', value: 34, color: '#6366f1' },
  { name: 'Billing', value: 22, color: '#10b981' },
  { name: 'Bug Report', value: 18, color: '#f59e0b' },
  { name: 'Account', value: 12, color: '#ec4899' },
  { name: 'Feature Request', value: 9, color: '#06b6d4' },
  { name: 'General Inquiry', value: 5, color: '#8b5cf6' },
];

export const notifications = [
  { id: 'n1', title: 'Urgent ticket assigned', description: 'T-1042 — Kineti Sports API outage', read: false, time: hoursAgo(1) },
  { id: 'n2', title: 'Maya mentioned you', description: 'in conversation with Elena Rossi', read: false, time: hoursAgo(3) },
  { id: 'n3', title: 'Weekly report ready', description: 'Your team resolved 187 tickets this week', read: false, time: hoursAgo(8) },
  { id: 'n4', title: 'New agent onboarded', description: 'Noah Williams completed training', read: true, time: daysAgo(1) },
  { id: 'n5', title: 'CSAT milestone', description: 'Team hit 96% CSAT for September', read: true, time: daysAgo(2) },
];

export { statuses, priorities, channels, categories };
