[SpeechMirror](#top)

[Analyze](#top) [Dataset](#top) [Roadmap](#top) [Limits](#limits)

Track C · IIT Mandi 2026

Transcript

Flaw in participant take

Severity

Demo pair: synthetic, built from the perturbation spec

### Transcript read by both takes (flagged words are highlighted after analysis)

English only

**Demo detector settings**Unfrozen in demo

Rushed: pace ratio above

Dead pause: extra gap above

Flat: F0 spread below

Mumbled: energy drop beyond

Input audioWAV, mono, 16 kHz, 16-bit

Benchmark thresholds are fitted on the train split only and frozen in **configs/pipeline.json**. These sliders exist so you can see how sensitivity trades misses against false alarms.

## Contrastive result

Settings changed. Press Analyze pair to refresh the result.

Ideal take Participant take Detected flaw region Constructed ground truth

### Why it was flagged

### Rubric scores

Demo scoring: 100 minus 18 per severity level on the affected dimension. Real weights and mapping live in configs/pipeline.json.

## What this dashboard shows that a plain waveform cannot

Each capability maps to a numbered requirement in your pack, so judges can trace claims to evidence.

MUST · FR-5

### Word-aligned comparison

The participant is compared with the ideal word by word, not by raw time. A pause shifts everything after it, and the dashed connectors show that shift.

MUST · FR-7

### Measured causes

Every flag lists which features moved, by how much, and which features stayed put. That rules out look-alike flaws.

MUST · A3

### Grounding quality in view

Detected region versus constructed truth gives live IoU and start/end error in milliseconds, the same metrics the benchmark reports.

### Gate status

Read from your repo (results/gates and workflow.md) when I cloned it. Update the status in your own files; this page does not write to the repo.

### Dataset targets versus what exists

The 30% data-engineering criterion is decided here.

| Item | Target | In repo now |
| --- | --- | --- |
| Transcript groups | 4 minimum, 6 recommended | 6 written |
| Speakers recorded | 2 minimum, 3 recommended | 0 |
| Validated paired clips for G4 | 40 or more | 0 |
| Sealed test clips | 60 or more, 2 held-out transcripts and speakers | 0 |
| Dual annotation (kappa) | 0.80 or higher | not started |
| Stress set | mic, noise, room, pace, accent, clean ideals | not started |

### Next 48 hours

Tick items off; your ticks are saved in this browser only.

### Flaw taxonomy and severity parameters

From reference.md. One flaw per clip, in one designated sentence (sentence 4 for T1).

Manifest columns

## Future features that move your score

Ordered by priority from requirements.md. Everything the original text-to-speech page offered that does not serve Track C (voice libraries, cloning, pricing, brand logos, testimonials) was removed.

### Honest limitations (FR-10)

- **This view uses a synthetic pair.** No benchmark number appears here. Real accuracy, IoU and confidence intervals come only from saved runs in results/.
- **Microphone and room change the numbers.** Features are normalized against the ideal take, but a different mic can still shift energy and spectral values.
- **Alignment errors carry through.** If word timing is wrong, every word-level delta after it is wrong. Benchmarks must use WhisperX or MFA, never the uniform-estimate fallback.
- **No judgment of meaning or emotion.** Only pace, pause, pitch, energy and clarity are measured, in English.
- **Small test sets give wide intervals.** With 20 clips, one error already moves 95% to 90%, so results are reported with Wilson intervals.

SpeechMirror, IIT Mandi Multimodal AI Hackathon 2026, Track C Build window Oct 1 to Oct 14. Submit by noon Oct 14.