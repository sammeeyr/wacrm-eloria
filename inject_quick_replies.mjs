import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const envFile = fs.readFileSync('.env.local', 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  const cleanLine = line.trim();
  if (!cleanLine || cleanLine.startsWith('#')) return;
  const match = cleanLine.match(/^([^=]+)=(.*)$/);
  if (match) env[match[1].trim()] = match[2].trim();
});

const url = env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(url, key);

async function injectQuickReplies() {
  // 1. Get first user
  const { data: users, error: userError } = await supabase.auth.admin.listUsers();
  if (userError || !users.users || users.users.length === 0) {
    console.error("Could not fetch users, or no users exist. Create an account first.", userError);
    return;
  }
  const user_id = users.users[0].id;

  // 2. Get first account
  const { data: accounts, error: accountError } = await supabase.from('accounts').select('id').limit(1);
  if (accountError || !accounts || accounts.length === 0) {
    console.error("Could not fetch accounts, or no accounts exist. Create one first.", accountError);
    return;
  }
  const account_id = accounts[0].id;

  console.log(`Using user_id: ${user_id} and account_id: ${account_id}`);

  const quickReplies = [
    {
      user_id,
      account_id,
      title: 'Greeting',
      kind: 'text',
      content_text: 'Hi there! Thanks for reaching out. How can I help you today?',
    },
    {
      user_id,
      account_id,
      title: 'Business Hours',
      kind: 'text',
      content_text: 'Our business hours are Monday through Friday, 9:00 AM to 5:00 PM (EST). We will get back to you as soon as possible during these hours.',
    },
    {
      user_id,
      account_id,
      title: 'Location / Directions',
      kind: 'text',
      content_text: 'We are located at 123 Main Street, Suite 100. Let us know if you need directions when you are on your way!',
    },
    {
      user_id,
      account_id,
      title: 'Goodbye / Thanks',
      kind: 'text',
      content_text: 'Thank you for contacting us! Let us know if you have any other questions.',
    },
    {
      user_id,
      account_id,
      title: 'Interactive Options',
      kind: 'interactive',
      interactive_payload: {
        type: 'button',
        body: { text: 'How would you like to proceed?' },
        action: {
          buttons: [
            { type: 'reply', reply: { id: 'opt_1', title: 'Schedule Call' } },
            { type: 'reply', reply: { id: 'opt_2', title: 'More Info' } },
          ]
        }
      }
    }
  ];

  const { error } = await supabase.from('quick_replies').insert(quickReplies);
  if (error) {
    console.error("Failed to insert quick replies:", error);
  } else {
    console.log(`Successfully injected ${quickReplies.length} quick replies!`);
  }
}

injectQuickReplies();
