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

async function injectEcommerceQuickReplies() {
  const { data: users, error: userError } = await supabase.auth.admin.listUsers();
  if (userError || !users.users || users.users.length === 0) {
    console.error("Could not fetch users", userError);
    return;
  }
  const user_id = users.users[0].id;

  const { data: accounts, error: accountError } = await supabase.from('accounts').select('id').limit(1);
  if (accountError || !accounts || accounts.length === 0) {
    console.error("Could not fetch accounts", accountError);
    return;
  }
  const account_id = accounts[0].id;

  const quickReplies = [
    {
      title: 'Order Status Inquiry',
      kind: 'text',
      content_text: 'Thank you for your inquiry! Your order is currently being processed. You will receive a tracking link via email as soon as it ships. Please let me know if you need help with anything else.',
    },
    {
      title: 'Shipping Details Request',
      kind: 'text',
      content_text: 'Your order has shipped! You can track your delivery progress using the tracking link we sent to your email. Standard shipping typically takes 3-5 business days. Let us know if you experience any unexpected delays.',
    },
    {
      title: 'Return Policy',
      kind: 'text',
      content_text: 'We offer a 30-day return policy for all unused and unwashed items with their original tags attached. You can initiate a return by visiting our Returns Portal on our website and entering your order number.',
    },
    {
      title: 'Refund Timeline',
      kind: 'text',
      content_text: 'Once we receive and inspect your returned item, your refund will be processed automatically. Please allow 5-7 business days for the credit to appear on your original method of payment.',
    },
    {
      title: 'Out of Stock / Restock',
      kind: 'text',
      content_text: 'We are currently out of stock for that item, but we expect a restock within the next 2 weeks. I highly recommend signing up for the "Notify Me" alert on the product page so you are the first to know when it is back!',
    },
    {
      title: 'Payment / Card Declined',
      kind: 'text',
      content_text: 'It looks like your recent payment attempt was unsuccessful. This is usually due to a mismatch in the billing address or a temporary hold by your bank. Please verify your billing details or contact your card issuer for further assistance.',
    },
    {
      title: 'Promo Code / Discount',
      kind: 'text',
      content_text: 'You can apply your promo code at checkout in the "Discount Code" field. Please note that only one promo code can be applied per order, and some exclusions may apply to sale items.',
    },
    {
      title: 'Defective or Damaged Item',
      kind: 'text',
      content_text: 'I am so sorry to hear that your item arrived damaged! We take quality very seriously. Could you please send us a clear photo of the damage and your order number? We will arrange for a replacement to be sent out immediately.',
    },
    {
      title: 'Order Cancellation Request',
      kind: 'text',
      content_text: 'We can cancel your order as long as it has not yet entered the shipping process. Let me check the status of your order right now to see if we can still stop the shipment for you.',
    },
    {
      title: 'Sizing / Fit Guide',
      kind: 'text',
      content_text: 'Our items generally fit true to size. For more detailed measurements, please refer to the "Size Guide" linked directly above the size selection buttons on the product page. Let me know if you need help deciding!',
    },
    {
      title: 'Address Change Request',
      kind: 'text',
      content_text: 'We can update your shipping address if your order has not yet been processed by our fulfillment team. Please provide the correct address as soon as possible, and I will do my best to intercept it in time.',
    },
    {
      title: 'Review Request',
      kind: 'interactive',
      interactive_payload: {
        type: 'button',
        body: { text: 'We noticed your order was delivered recently! If you have a moment, we would love to hear your thoughts. Would you like to leave a review?' },
        action: {
          buttons: [
            { type: 'reply', reply: { id: 'review_yes', title: 'Yes, leave review' } },
            { type: 'reply', reply: { id: 'review_later', title: 'Maybe later' } },
          ]
        }
      }
    },
    {
      title: 'Exchange Process',
      kind: 'interactive',
      interactive_payload: {
        type: 'button',
        body: { text: 'Would you like to exchange this item for a different size or color, or would you prefer to process a return for a refund?' },
        action: {
          buttons: [
            { type: 'reply', reply: { id: 'exch_size_color', title: 'Exchange item' } },
            { type: 'reply', reply: { id: 'exch_return', title: 'Return for refund' } },
          ]
        }
      }
    }
  ].map(qr => ({ ...qr, user_id, account_id }));

  const { error } = await supabase.from('quick_replies').insert(quickReplies);
  if (error) {
    console.error("Failed to insert quick replies:", error);
  } else {
    console.log(`Successfully injected ${quickReplies.length} ecommerce quick replies!`);
  }
}

injectEcommerceQuickReplies();
