import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// simple dotenv parser since dotenv might not be installed at top level
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

async function inject() {
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

  const templates = JSON.parse(fs.readFileSync('parsed_templates.json', 'utf8'));

  const insertData = templates.map(t => ({
    user_id,
    account_id,
    name: t.name,
    category: t.category,
    language: t.language,
    header_type: t.header_type,
    header_content: t.header_content,
    body_text: t.body_text,
    footer_text: t.footer_text,
    buttons: t.buttons,
    status: 'APPROVED',
    meta_template_id: t.meta_template_id
  }));

  const { error } = await supabase.from('message_templates').insert(insertData);
  if (error) {
    console.error("Failed to insert templates:", error);
  } else {
    console.log(`Successfully injected ${templates.length} templates!`);
  }
}

inject();
