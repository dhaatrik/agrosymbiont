Title: "⚡ Bolt: Remove artificial delay in WaitlistForm submission"
Description:
💡 **What:** Removed the 1500ms artificial delay (simulated API call) in the waitlist form submission.
🎯 **Why:** Artificial delays increase latency and hurt user experience by needlessly holding the user back from the confirmation state.
📊 **Impact:** The submission form immediately moves to the success particles phase, saving 1.5 seconds per submission.
🔬 **Measurement:** Previously, tests required 1500ms of simulated time to advance past the initial loading phase. This has been reduced to 0ms for the API call simulation phase.
