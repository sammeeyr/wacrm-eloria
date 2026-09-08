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

const supabase = createClient(url, key);

async function fix() {
  const { data: replies, error } = await supabase.from('quick_replies').select('*').eq('kind', 'interactive');
  if (error) throw error;

  for (const qr of replies) {
    let payload = qr.interactive_payload;
    if (payload.type === 'button') { // old meta format
      const newPayload = {
        kind: 'buttons',
        body: payload.body?.text || 'Default body',
        buttons: payload.action?.buttons?.map(b => ({
          id: b.reply.id,
          title: b.reply.title
        })) || []
      };
      
      const { error: updError } = await supabase
        .from('quick_replies')
        .update({ interactive_payload: newPayload })
        .eq('id', qr.id);
        
      if (updError) {
        console.error("Failed to update", qr.id, updError);
      } else {
        console.log("Fixed", qr.id);
      }
    }
  }
  console.log("Done fixing interactive payloads.");
}

fix().catch(console.error);
