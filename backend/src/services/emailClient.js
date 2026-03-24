import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const FROM_ADDRESS = process.env.SENDGRID_FROM_EMAIL

/**
 * Sends a password-reset email to the given address.
 *
 * @param {string} to          - Recipient email address
 * @param {string} resetToken  - Opaque reset token to embed in the link
 * @returns {Promise<void>}
 */
export async function sendPasswordResetEmail(to, resetToken) {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`

  const msg = {
    to,
    from: FROM_ADDRESS,
    subject: 'Reset your Tracy Shop password',
    text: `You requested a password reset. Visit the link below to set a new password:\n\n${resetUrl}\n\nThis link expires in 1 hour.\n\nIf you did not request this, you can safely ignore this email.`,
    html: `
      <p>You requested a password reset.</p>
      <p>
        <a href="${resetUrl}" style="color:#007185;font-weight:bold;">Reset your password</a>
      </p>
      <p>This link expires in <strong>1 hour</strong>.</p>
      <p style="color:#888;font-size:0.85em;">
        If you did not request this, you can safely ignore this email.
      </p>
    `,
  }

  await sgMail.send(msg)
}
