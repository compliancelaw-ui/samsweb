/**
 * Invisible honeypot field for anti-spam protection.
 * Bots fill this out; humans never see it.
 * Include in every public-facing form.
 */
export function HoneypotField() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: '-9999px',
        top: '-9999px',
        height: 0,
        width: 0,
        overflow: 'hidden',
      }}
    >
      <label htmlFor="website_url">Website</label>
      <input
        type="text"
        id="website_url"
        name="website_url"
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  )
}
