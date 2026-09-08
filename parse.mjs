import fs from 'fs';

const rawText = `Finalize account set-up
Hi {{text}},

Your new account has been created successfully. 

Please verify {{text}} to complete your profile.
1:34 PM
Verify account
account_creation_confirmation_3
Your appointment was canceled
Hello {{text}},

Your upcoming appointment with {{business name}} on {{date}} at {{text}} has been canceled.

Let us know if you have any questions or need to reschedule.
1:31 PM
View details
appointment_cancellation_1
Appointment cancelled
Hi {{text}},
Your appointment on {{text}} has been cancelled. We hope to see you another time.
1:33 PM
appointment_cancelled
Your appointment is booked
Hello {{text}},

Thank you for booking with {{business name}}.

Your appointment for {{text}} on {{date}} at {{text}} is confirmed.
1:34 PM
View details
appointment_confirmation_1
Appointment confirmed
Hi {{text}},
Your appointment is scheduled for {{text}}.

Service: {{text}}
Confirmation number: {{text}}

We're looking forward to your visit.
1:33 PM
appointment_confirmed
You have an upcoming appointment
Hello {{text}},

This is a reminder about your upcoming appointment with {{business name}} on {{date}} at {{text}}.

We look forward to seeing you!
1:34 PM
View details
appointment_reminder_2
Your appointment was rescheduled
Hello {{text}},

Your upcoming appointment with {{business name}} has been rescheduled for {{date}} at {{text}}. 

We look forward to seeing you!
1:33 PM
View details
appointment_reschedule_1
Appointment rescheduled
Hi {{text}},
Your appointment has been rescheduled to {{text}}.

Service: {{text}}
Confirmation number: {{text}}

We're looking forward to your visit.
1:34 PM
appointment_rescheduled
Would you like to receive a call from one of our representatives?
1:33 PM
Can {BIZ_NAME} call you?
You can update your preference anytime in the business profile.
1:33 PM
Choose preference
call_permission_request_1
Hi {{text}}, your order {{text}} was delivered successfully. 

You can manage your order below.
1:34 PM
Manage order
delivery_confirmation_1
Order delivered
Hi {{text}}, your order {{text}} was delivered. 

Need to return or replace an item?
Click to manage your order.
1:31 PM
Manage order
delivery_confirmation_2
{{text}}, your order {{text}} was delivered on {{date}}.

If you need to return or replace item(s), please click below.
1:34 PM
Start return
delivery_confirmation_3
{{text}}, your order was successfully delivered on {{date}}.

Thank you for your purchase.
1:31 PM
delivery_confirmation_4
Order delivered
Hi {{text}},

Great news! Your order {{text}} was delivered.
1:34 PM
View order
delivery_confirmation_5
Could not deliver your order
Hi {{text}}, 

We attempted to deliver your order on {{date}} but were not successful. 

Please contact us at {{phone}} to arrange re-delivery. 

Thank you.
1:31 PM
Manage delivery
Call us
delivery_failed_1
We were unable to deliver order {{text}} today. 

Please {{text}} to schedule another delivery attempt.
1:34 PM
Schedule delivery
delivery_failed_2
Hi {{text}}, your order {{text}} is on its way and should arrive soon.

Estimated delivery:  {{text}}

We will provide an update when your order is delivered.
An adult must be home to accept this package.
1:31 PM
Track order
delivery_update_1
Hi {{text}}, our order {{text}} is out for delivery! 

It should be delivered {{text}} between {{text}} and {{text}}.
1:34 PM
Track order
delivery_update_2
Your order {{text}} is out for delivery! 

It should arrive by {{date}}. 

Thank you for your business.
1:31 PM
Track order
delivery_update_3
Your order {{text}} is out for delivery and is expected to arrive by {{date}}.

Thank you for your business.
1:31 PM
delivery_update_4
You have an upcoming event
You have an upcoming event
Reminder: You RSVP’ed to {{text}} by {{text}}.

The event starts on {{date}} at {{text}} at {{address}} location.
1:31 PM
event_details_reminder_1
Reminder: {{text}} is coming up and you have RSVP’ed to this event by {{text}}. 

See you at {{text}} at {{text}} local time.
1:34 PM
event_details_reminder_2
Thank you for RSVP’ing to {{text}} by {{text}}. 

See you on {{date}} at {{text}} local time.
1:31 PM
event_rsvp_confirmation_1
Your RSVP for {{text}} by {{text}} is confirmed!

Thanks!
1:34 PM
event_rsvp_confirmation_2
Hi {{text}},

Thank you for your recent {{text}} on {{date}}.

We value your feedback and would appreciate you sharing more about your experience with us at the link below.

This should only take {{number}} minutes. We appreciate your time.
1:31 PM
Leave feedback
feedback_survey_1
How did we do?
Thank you for visiting us at {{address}} on {{date}}. 

We value your feedback.

Please fill out this short survey to let us know how we can continue to improve.
1:34 PM
Fill out survey
feedback_survey_2
Hi {{text}}, your request for {{text}} service from {{text}} was successfully received!

You can start the service by clicking and joining the group below.
{{group_id}}

Thank you!
1:31 PM
group_invite_link
Your {{text}} request with {{text}} is confirmed. Please join the WhatsApp group to start:
{{group_id}} Thank you!
1:31 PM
group_invite_link_concise
Hi {{text}},
We are pleased to inform you that your request for {{text}} from {{text}} has been successfully received.

To facilitate your session, we have created a dedicated WhatsApp group. Please join the group using the link below to proceed with your request:
{{group_id}}

Thank you for using our service!
1:31 PM
group_invite_link_detailed
Hi {{text}}, before we can process your order {{text}}, we need to verify some information.

Please contact us at your earliest convenience.

Thank you.
1:34 PM
Call us
order_action_required_1
We were unable to process your order {{text}}. 

Please call us at {{phone}} for next steps.
1:31 PM
Call us
order_action_required_2
Order canceled
{{text}}, your order {{text}} has been successfully canceled. 

Your refund will be processed in {{number}} business days. 

Thank you.
1:34 PM
View order details
order_canceled_1
{{text}}, per your request, we have canceled your order {{text}}. 

Your {{text}} will be processed in {{number}} business days. 

You can track this below.
1:31 PM
View order details
order_canceled_2
Hi, this is to confirm we have successfully canceled your recent order {{text}}. 

Thank you.
1:31 PM
View order details
order_canceled_3
Order canceled
Hello {{text}}, 

Your order {{text}} has been canceled. 

A refund will be issued to your original payment method soon.
1:31 PM
Order details
order_canceled_4
Order confirmed
Hi {{text}}, 
We're getting your order {{text}} ready and will let you know when it's on the way.
1:34 PM
order_confirmed
Hi {{text}}, there is a {{text}} in {{text}} your order {{text}}. 

We're working to resolve it as soon as possible. 

We will follow up with an update. 

We apologize for any inconvenience.
We'll send you an updated delivery status when we can.
1:31 PM
Track my order
View order details
order_delay_1
Item(s) out-of-stock
Hi {{text}}, 

Item(s) from your recent order {{text}} are out-of-stock. We will notify you as soon as your item(s) ship. 

If you prefer not to wait, please click below to {{text}} your order. 

We apologize for any inconvenience.
1:34 PM
Manage order
order_delay_2
Order delivered
Hi {{text}},
Your {{text}} has been delivered. Thank you for shopping with us.
1:31 PM
order_delivered
Order confirmed
Hi {{text}},

Thank you for your {{text}}! Your order number is {{text}}.

We'll start getting {{text}} ready to ship.

Estimated delivery: {{date}} 

We will let you know when your order ships.
1:34 PM
View order details
order_management_1
Order confirmed
Hi {{text}}, your order is confirmed and your order number is {{text}}. 

Estimated delivery: {{date}}. 

We will follow up with more details as we prepare your order for shipment.
1:31 PM
View order details
order_management_2
Order confirmed
Hi {{text}}, we've received your order. 

Your order number is {{text}}. 

Estimated delivery: {{date}}.

Click below to manage your order.
1:34 PM
Manage order
order_management_3
Order confirmed!
Hi {{text}},
Your order has been successfully placed and is being processed. Your order number is {{text}}. You can view order details below.
1:31 PM
View order
order_management_4
Order received
Hello {{text}},

We received your order {{text}}. We’ll send you a status update once your payment is approved.

Thank you for shopping with us!
1:34 PM
Order details
order_management_5
Order confirmed
Hi {{text}},

Your order {{text}} has been successfully placed with {{text}} and is being processed.
1:31 PM
View order
order_management_6
Order received
Hello {{text}},

We received your order {{text}}. We’ll send you a status update once your payment is approved.

Thank you for shopping with us!
1:34 PM
order_management_no_cta_5
Ready for pick up!
Hi {{text}}, your order {{text}} is ready for pick up at {{address}}.
When you arrive, tap the button below and we will bring your order to you. 
See you soon!
1:31 PM
I've arrived
order_pick_up_1
Great news! Your order {{text}} is now ready for pick up at {{address}}. 

Click "I'm here" when you arrive and we will meet you with your products. 

See you soon!
1:34 PM
I'm here
order_pick_up_3
It’s time to pick up your order
Hello {{text}},

Your order {{text}} is now ready for pickup at {{address}}.

Please remember to bring a photo ID with you.

See you soon!
1:31 PM
Order details
order_pick_up_4
It’s time to pick up your order
Hello {{text}},

Your order {{text}} is now ready for pickup at {{address}}.

Please remember to bring a photo ID with you.

See you soon!
1:34 PM
order_pick_up_no_cta_4
Order shipped
Hi {{text}}, 
Your order {{text}} has been shipped and is on the way.
1:31 PM
order_shipped
Your order is being prepared
Hi {{text}},

We’re preparing your order {{text}} and will let you know when it’s ready.
1:34 PM
Order details
order_update_1
Your order is being prepared
Hi {{text}},

We’re preparing your order {{text}} and will let you know when it’s ready.
1:31 PM
order_update_no_cta_1
Order approved
Hello {{text}},

Your payment of {{amount}} for order {{text}} has been approved.
1:34 PM
Order details
payment_confirmation_4
Hello {{text}},

Your invoice for order {{text}} is attached.

Thank you for shopping with us!
1:31 PM
Order details
purchase_receipt_3
You were refunded for {{amount}}
Hi {{text}},

Your refund for {{amount}} has been processed for order {{text}}. You'll be credited back to your original payment method in 3-5 business days.
1:34 PM
refund_confirmation_1
Hi {{text}}, we'd like to have your phone number on file so we can reach you more easily. Please share your contact info below.
1:31 PM
Share Contact Info
request_contact_info_1
Hi {{text}}, please share your phone number with us so we can stay in touch and assist you better.
1:34 PM
Share Contact Info
request_contact_info_2
Hi {{text}}, having your phone number helps us serve you faster. Tap below to share your contact info.
1:31 PM
Share Contact Info
request_contact_info_3
Hi {{text}}, thank you for returning product(s) from your order {{text}}. 

We are currently processing your return and will notify you of your {{text}} status.
1:34 PM
Manage order
return_confirmation_1
Return received
We have received item(s) from your order {{text}}. 

Your return is complete, and we have processed your {{text}} for {{amount}}. 

Thank you for your business.
1:31 PM
Manage order
return_confirmation_2
Order shipped
Hi {{text}}, your order has shipped! 

Your tracking number is {{text}}. 

Estimated delivery is {{date}}.
We will continue to provide updates on this shipment until it is delivered.
1:34 PM
Track shipment
shipment_confirmation_1
Hi {{text}}, great news! Your order {{text}} has shipped.

Tracking #: {{text}}
Estimated delivery: {{date}}

We will provide updates until delivery.
1:31 PM
Track shipment
shipment_confirmation_2
Hi {{text}}, your order {{text}} has left our {{text}} and is on its way to you! 

Your tracking ID is {{text}}. 

Click below to track your package.
1:34 PM
Track my order
shipment_confirmation_3
Your order is en route!
Hi {{text}},

We're happy to inform you that your order {{text}} has shipped! Click view order details to view the status of your shipment.
1:31 PM
View order details
shipment_confirmation_4
Order shipped
Hi {{text}},

We’re happy to inform you that your order {{text}} has shipped! Click below to view the status of your shipment.
1:34 PM
View order
shipment_confirmation_5
Statement available
Hi {{text}}, 

Your {{text}} statement for your account ending in {{number}} is now available. 

Click below to see your statement.
1:31 PM
View statement
statement_available_1
Statement available
This is to notify you that your latest statement for your Mankt checking plus account is now available. 

Please log into your account to view your statement.
1:34 PM
View statement
statement_available_2`;

// A simple state machine to parse the loose structure
const blocks = rawText.split(/(?=\n[a-z0-9_]+\n)/); 
// this split doesn't work well because the name is at the END of the block.
const lines = rawText.trim().split('\n');

const templates = [];
let currentTemplate = { header_type: null, header_content: null, body_text: [], buttons: [], name: null, category: 'Utility', language: 'en_US', status: 'APPROVED' };

// We read backwards or split by recognizing the pattern:
// [...]
// 1:31 PM
// [Optional buttons]
// template_name
// [...]

let chunk = [];
for (let i = lines.length - 1; i >= 0; i--) {
    let line = lines[i].trim();
    if (!line && chunk.length === 0) continue;
    chunk.unshift(line);
    
    // A block usually starts after the previous block's template name
    // It's tricky to parse forwards, so let's just group by looking for the timestamp line
}

function parseForward() {
    let currentLines = [];
    for(let line of lines) {
        if(/^[a-z0-9_]+$/.test(line) && currentLines.length > 0 && /\d{1,2}:\d{2}\s?[AP]M/.test(currentLines[currentLines.length - 1] || currentLines[currentLines.length - 2] || currentLines[currentLines.length - 3])) {
            currentLines.push(line);
            processBlock(currentLines);
            currentLines = [];
        } else {
            currentLines.push(line);
        }
    }
    if (currentLines.length > 0) processBlock(currentLines);
}

function processBlock(blockLines) {
    if(!blockLines || blockLines.length === 0) return;
    // remove empty lines from end
    while(blockLines.length > 0 && !blockLines[blockLines.length-1].trim()) blockLines.pop();
    if(blockLines.length === 0) return;
    
    let name = blockLines.pop().trim();
    let buttons = [];
    let timeIndex = -1;
    for(let i = blockLines.length - 1; i >= 0; i--) {
        if(/\d{1,2}:\d{2}\s?[AP]M/.test(blockLines[i])) {
            timeIndex = i;
            break;
        }
    }
    
    if (timeIndex !== -1) {
        // anything after timeIndex are buttons
        for(let i = timeIndex + 1; i < blockLines.length; i++) {
            if (blockLines[i].trim()) {
                buttons.push({ type: "url", text: blockLines[i].trim(), url: "https://example.com" });
            }
        }
        blockLines = blockLines.slice(0, timeIndex);
    }
    
    // Convert {{text}}, {{date}} etc to {{1}}, {{2}}...
    let counter = 1;
    let textContent = blockLines.join('\n').replace(/\{\{[^}]+\}\}/g, () => '{{' + (counter++) + '}}');
    let header_type = null;
    let header_content = null;
    let body_text = textContent;
    
    // In many of these, the first line is a header if it doesn't have variables and is separated by a newline
    let parts = textContent.split('\n');
    if (parts.length > 1 && !parts[0].includes('{{') && parts[0].length < 60) {
        // Might be a header
        header_type = 'text';
        header_content = parts[0];
        body_text = parts.slice(1).join('\n').trim();
    }
    
    templates.push({
        name,
        category: 'Marketing',
        language: 'en_US',
        header_type,
        header_content,
        body_text,
        footer_text: null,
        buttons: buttons.length > 0 ? buttons : null,
        status: 'APPROVED',
        meta_template_id: 'dry-run-meta-' + Math.random().toString(36).substring(2, 10)
    });
}

parseForward();

fs.writeFileSync('parsed_templates.json', JSON.stringify(templates, null, 2));
console.log('Parsed ' + templates.length + ' templates.');
