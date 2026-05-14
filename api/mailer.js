'use strict';

const nodemailer = require('nodemailer');

// Lazy-initialised transporter reused across warm serverless invocations
let _transporter;
function getTransporter() {
    if (!_transporter) {
        _transporter = nodemailer.createTransport({
            host:   process.env.SMTP_HOST || 'my.safeguard-dns.com',
            port:   parseInt(process.env.SMTP_PORT || '465', 10),
            secure: true,            // SSL on port 465
            auth: {
                user: process.env.SMTP_USER || 'support@reclaim-guard.com',
                pass: process.env.SMTP_PASS, // set in env never hardcode
            },
            tls: {
                // Enforce modern TLS; reject invalid/self-signed certs
                minVersion: 'TLSv1.2',
                rejectUnauthorized: true,
            },
        });
    }
    return _transporter;
}

/**
 * Send a confirmation email to the person who submitted the form.
 */
async function sendLeadConfirmation({ name, email, amount, scamType }) {
    const amountLabels = {
        'under-1000':       'Under $1,000',
        '1000-5000':        '$1,000 – $5,000',
        '5000-25000':       '$5,000 – $25,000',
        '25000-100000':     '$25,000 – $100,000',
        '100000+':          'Over $100,000',
    };
    const typeLabels = {
        crypto: 'Cryptocurrency Fraud',
        broker: 'Broker / Investment Fraud',
        bank:   'Bank / Wire Fraud',
        card:   'Card Fraud',
        other:  'Other Financial Fraud',
    };

    await getTransporter().sendMail({
        from:    '"Reclaim Guard Legal" <support@reclaim-guard.com>',
        to:      email,
        subject: 'We received your case submission Reclaim Guard Legal',
        text: [
            `Dear ${name},`,
            '',
            'Thank you for reaching out to Reclaim Guard Legal.',
            '',
            'We have received your case details:',
            `  • Fraud type : ${typeLabels[scamType] || scamType}`,
            `  • Amount lost: ${amountLabels[amount] || amount}`,
            '',
            'One of our specialists will review your submission and contact you within 24 hours.',
            '',
            'If you have any urgent questions please reply to this email.',
            '',
            'Best regards,',
            'Reclaim Guard Legal',
            'https://reclaim-guard.com',
        ].join('\n'),
        html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:30px 0">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;max-width:600px">
        <tr><td style="background:#1a2340;padding:28px 40px">
          <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700">Reclaim Guard Legal</h1>
        </td></tr>
        <tr><td style="padding:40px">
          <p style="margin:0 0 16px;color:#333;font-size:16px">Dear <strong>${name}</strong>,</p>
          <p style="margin:0 0 16px;color:#555;font-size:15px">
            Thank you for reaching out to <strong>Reclaim Guard Legal</strong>.<br>
            We have received your case submission and will be in touch shortly.
          </p>
          <table width="100%" cellpadding="12" cellspacing="0" style="background:#f8f9fc;border-radius:6px;margin:24px 0">
            <tr>
              <td style="color:#555;font-size:14px;border-bottom:1px solid #e0e0e0"><strong>Fraud type</strong></td>
              <td style="color:#333;font-size:14px;border-bottom:1px solid #e0e0e0">${typeLabels[scamType] || scamType}</td>
            </tr>
            <tr>
              <td style="color:#555;font-size:14px"><strong>Amount lost</strong></td>
              <td style="color:#333;font-size:14px">${amountLabels[amount] || amount}</td>
            </tr>
          </table>
          <p style="margin:0 0 16px;color:#555;font-size:15px">
            One of our specialists will review your submission and contact you <strong>within 24 hours</strong>.
          </p>
          <p style="margin:0 0 4px;color:#555;font-size:15px">If you have urgent questions, simply reply to this email.</p>
        </td></tr>
        <tr><td style="background:#f8f9fc;padding:20px 40px;border-top:1px solid #e8e8e8">
          <p style="margin:0;color:#888;font-size:12px">
            &copy; ${new Date().getFullYear()} Reclaim Guard Legal &nbsp;|&nbsp;
            <a href="https://reclaim-guard.com" style="color:#1a2340;text-decoration:none">reclaim-guard.com</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
    });
}

/**
 * Notify admin that a new lead has arrived.
 */
async function sendAdminNotification({ name, email, phone, amount, scamType, when, payment, message, leadId, priority }) {
    const adminEmail = process.env.ADMIN_EMAIL || 'support@reclaim-guard.com';

    await getTransporter().sendMail({
        from:    '"Reclaim Guard System" <support@reclaim-guard.com>',
        to:      adminEmail,
        subject: `[${priority.toUpperCase()}] New Lead #${leadId} ${name}`,
        text: [
            `New lead submitted (ID #${leadId})`,
            '',
            `Name    : ${name}`,
            `Email   : ${email}`,
            `Phone   : ${phone || '—'}`,
            `Amount  : ${amount}`,
            `Type    : ${scamType}`,
            `When    : ${when || '—'}`,
            `Payment : ${payment || '—'}`,
            `Priority: ${priority}`,
            '',
            'Message:',
            message || '(none)',
            '',
            'View in admin: https://reclaim-guard.com/admin.html',
        ].join('\n'),
    });
}

module.exports = { sendLeadConfirmation, sendAdminNotification };
