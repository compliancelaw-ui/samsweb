// Honeypot anti-spam utility.
// Adds invisible fields to forms that bots fill out but humans don't.
// If the field has any value, the submission is silently rejected (returns 200 to not tip off bots).

import { NextResponse } from 'next/server'

// The field name that bots will fill — looks like a real field
export const HONEYPOT_FIELD = 'website_url'

/**
 * Check if a honeypot field was filled (indicating bot submission).
 * Returns a fake "success" response to not tip off the bot, or null if clean.
 */
export function checkHoneypot(body: Record<string, unknown>): NextResponse | null {
  if (body[HONEYPOT_FIELD]) {
    // Return a fake success to not alert the bot
    return NextResponse.json(
      { message: 'Thank you for your submission.' },
      { status: 201 }
    )
  }
  return null
}
