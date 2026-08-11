/**
 * Debounce for draft autosave, in milliseconds, shared by every collection with drafts.
 *
 * Payload debounces on this value (`useDebounce` in @payloadcms/ui restarts the timer on
 * every keystroke), so it means "save after this much inactivity", not "save this often".
 *
 * This was 100ms, which saved on every micro-pause while typing. Because the admin shows
 * the saving indicator for a minimum of 1s (`minimumAnimationTime`), the "Saving… / Last
 * saved at" state and the Publish button were in near-constant flux while writing.
 *
 * Trade-off: live preview here is `RefreshRouteOnSave` (see components/LivePreviewListener),
 * which re-renders on the server from the saved draft — so the preview pane now updates
 * this long after you stop typing. Lower this value if preview latency matters more than
 * a calm editing UI. Payload's own default is 2000.
 */
export const AUTOSAVE_INTERVAL = 5_000
