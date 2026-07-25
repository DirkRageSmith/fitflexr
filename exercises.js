/*
 * FitFlexr dataset — ALL 11 muscle groups fully produced (ChatGPT-generated, all equipment
 * types). equipment = array of EQUIPMENT ids; see ROADMAP.md for the schema. Per-group edits
 * should preserve permanent ids (user data references them). Run `node validate.js`.
 */

// Deep, saturated jewel-tone palette (no pastels). Each is distinct in hue so
// "___ day" reads at a glance; derived text uses color-mix toward the theme text
// so these dark values stay legible in both light and dark themes.
const MUSCLE_GROUPS = [
  {
    "name": "Chest",
    "color": "#a4161e"
  },
  {
    "name": "Back",
    "color": "#1746a3"
  },
  {
    "name": "Shoulders",
    "color": "#a85c12"
  },
  {
    "name": "Biceps",
    "color": "#6d28d9"
  },
  {
    "name": "Triceps",
    "color": "#a81e63"
  },
  {
    "name": "Core/Abs",
    "color": "#047857"
  },
  {
    "name": "Glutes",
    "color": "#b23a0b"
  },
  {
    "name": "Quads",
    "color": "#3730a3"
  },
  {
    "name": "Hamstrings",
    "color": "#4d7c0f"
  },
  {
    "name": "Calves",
    "color": "#0e7490"
  },
  {
    "name": "Full Body/Cardio",
    "color": "#86198f"
  }
];

const EQUIPMENT = [
  {
    "id": "bodyweight",
    "label": "Bodyweight"
  },
  {
    "id": "dumbbell",
    "label": "Dumbbells"
  },
  {
    "id": "bench",
    "label": "Bench"
  },
  {
    "id": "resistance-band",
    "label": "Resistance Band"
  },
  {
    "id": "kettlebell",
    "label": "Kettlebell"
  },
  {
    "id": "pull-up-bar",
    "label": "Pull-Up Bar"
  },
  {
    "id": "cable",
    "label": "Cable Machine"
  },
  {
    "id": "machine",
    "label": "Machine"
  },
  {
    "id": "barbell",
    "label": "Barbell"
  },
  {
    "id": "ez-bar",
    "label": "EZ Bar"
  },
  {
    "id": "trx",
    "label": "Suspension (TRX)"
  },
  {
    "id": "box",
    "label": "Box / Step"
  },
  {
    "id": "medicine-ball",
    "label": "Medicine Ball"
  },
  {
    "id": "ab-wheel",
    "label": "Ab Wheel"
  },
  {
    "id": "jump-rope",
    "label": "Jump Rope"
  }
];

const CONDITIONS = [
  {
    "id": "lower-back",
    "label": "Lower Back Issues"
  },
  {
    "id": "knee",
    "label": "Knee Issues"
  },
  {
    "id": "shoulder",
    "label": "Shoulder Issues"
  },
  {
    "id": "wrist",
    "label": "Wrist Issues"
  },
  {
    "id": "neck",
    "label": "Neck Issues"
  },
  {
    "id": "hip",
    "label": "Hip Issues"
  },
  {
    "id": "high-impact",
    "label": "High Impact / Jumping"
  },
  {
    "id": "balance",
    "label": "Balance Issues"
  },
  {
    "id": "pregnancy",
    "label": "Pregnancy"
  }
];

const EXERCISES = [
  {
    "id": "barbell-flat-bench-press",
    "name": "Barbell Bench Press",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders",
      "Triceps"
    ],
    "equipment": [
      "barbell",
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Plant your feet, keep your shoulder blades pinned, and press in a slight arc over your shoulders.",
    "description": "Lower the bar under control to the mid-chest before pressing to full extension. Avoid bouncing the bar off your chest or flaring your elbows excessively.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Flat Bench",
      "BB Bench Press"
    ],
    "category": "strength"
  },
  {
    "id": "barbell-paused-bench-press",
    "name": "Paused Barbell Bench Press",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders",
      "Triceps"
    ],
    "equipment": [
      "barbell",
      "bench"
    ],
    "difficulty": "Advanced",
    "cue": "Pause for one full second on your chest before driving the bar upward.",
    "description": "Control the descent, pause without relaxing, then press explosively. Avoid sinking the bar into your chest during the pause.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "⏸️",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": false,
    "aliases": [
      "Competition Bench",
      "Paused Bench"
    ],
    "category": "strength"
  },
  {
    "id": "barbell-close-grip-bench-press",
    "name": "Close-Grip Barbell Bench Press",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Triceps",
      "Shoulders"
    ],
    "equipment": [
      "barbell",
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Grip just inside shoulder width and keep your elbows close throughout the press.",
    "description": "Lower the bar with control before pressing straight back up. Avoid gripping so narrowly that your wrists collapse inward.",
    "avoidIf": [
      "shoulder",
      "wrist"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Close Grip Bench",
      "CG Bench"
    ],
    "category": "strength"
  },
  {
    "id": "barbell-incline-bench-press",
    "name": "Incline Barbell Bench Press",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders",
      "Triceps"
    ],
    "equipment": [
      "barbell",
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Use a low incline and press toward your upper chest while keeping your shoulders packed.",
    "description": "Lower the bar to your upper chest before pressing smoothly. Avoid using an excessively steep bench angle that shifts the work to your shoulders.",
    "avoidIf": [
      "shoulder",
      "neck"
    ],
    "icon": "📈",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Incline BB Press"
    ],
    "category": "strength"
  },
  {
    "id": "barbell-decline-bench-press",
    "name": "Decline Barbell Bench Press",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Triceps",
      "Shoulders"
    ],
    "equipment": [
      "barbell",
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Secure your legs and lower the bar to the lower chest before pressing upward.",
    "description": "Maintain control through the full range of motion. Avoid lifting your hips off the bench during the press.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "📉",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Decline BB Press"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-flat-bench-press",
    "name": "Flat Dumbbell Bench Press",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders",
      "Triceps"
    ],
    "equipment": [
      "dumbbell",
      "bench"
    ],
    "difficulty": "Beginner",
    "cue": "Keep your wrists stacked over your elbows and press the dumbbells together at the top.",
    "description": "Lower each dumbbell evenly before pressing back to full extension. Avoid letting your elbows drop too far below the bench.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Bench Press",
      "Flat DB Press"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-incline-bench-press",
    "name": "Incline Dumbbell Bench Press",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders",
      "Triceps"
    ],
    "equipment": [
      "dumbbell",
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Set the bench around 30° and press slightly back toward your shoulders.",
    "description": "Lower the dumbbells until your upper arms are just below parallel before pressing up. Avoid shrugging your shoulders during the lift.",
    "avoidIf": [
      "shoulder",
      "neck"
    ],
    "icon": "📈",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Incline DB Press",
      "Incline Dumbbell Press"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-decline-bench-press",
    "name": "Decline Dumbbell Bench Press",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders",
      "Triceps"
    ],
    "equipment": [
      "dumbbell",
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Keep the dumbbells balanced directly over your lower chest throughout the press.",
    "description": "Press both dumbbells evenly while maintaining shoulder stability. Avoid letting the weights drift too far apart.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "📉",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy",
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Decline DB Press"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-neutral-grip-bench-press",
    "name": "Neutral-Grip Dumbbell Bench Press",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Triceps",
      "Shoulders"
    ],
    "equipment": [
      "dumbbell",
      "bench"
    ],
    "difficulty": "Beginner",
    "cue": "Keep your palms facing each other and press while keeping your elbows tucked.",
    "description": "Move the dumbbells under control from chest level to full extension. Avoid rotating your wrists during the lift.",
    "avoidIf": [],
    "icon": "🤲",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Hammer Grip DB Press"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-squeeze-press",
    "name": "Dumbbell Squeeze Press",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Triceps"
    ],
    "equipment": [
      "dumbbell",
      "bench"
    ],
    "difficulty": "Beginner",
    "cue": "Keep the dumbbells pressed together throughout every repetition.",
    "description": "Maintain inward pressure as you press and lower the weights. Avoid allowing the dumbbells to separate at the top.",
    "avoidIf": [],
    "icon": "💪",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Crush Press"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-flat-fly",
    "name": "Flat Dumbbell Fly",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "dumbbell",
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Keep a slight bend in your elbows and hug a wide barrel as you raise the weights.",
    "description": "Lower until you feel a comfortable chest stretch before returning to the top. Avoid turning the movement into a press.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🪽",
    "mechanic": "Isolation",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Fly",
      "Dumbbell Flye"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-incline-fly",
    "name": "Incline Dumbbell Fly",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "dumbbell",
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Use a shallow incline and maintain soft elbows throughout the movement.",
    "description": "Stretch under control before squeezing your chest to bring the weights together. Avoid lowering beyond your shoulder mobility.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🪽",
    "mechanic": "Isolation",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Incline DB Fly"
    ],
    "category": "strength"
  },
  {
    "id": "push-up",
    "name": "Push-Up",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders",
      "Triceps",
      "Core/Abs"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Maintain a straight line from head to heels and press the floor away.",
    "description": "Lower your chest under control before pushing back to full extension. Avoid letting your hips sag or flare your elbows excessively.",
    "avoidIf": [
      "wrist"
    ],
    "icon": "🤸",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "endurance",
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Press-Up"
    ],
    "category": "strength"
  },
  {
    "id": "incline-push-up",
    "name": "Incline Push-Up",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders",
      "Triceps",
      "Core/Abs"
    ],
    "equipment": [
      "bench"
    ],
    "difficulty": "Beginner",
    "cue": "Keep your body rigid while pressing away from the bench.",
    "description": "Lower your chest to the bench before pressing back up. Avoid allowing your lower back to arch.",
    "avoidIf": [
      "wrist"
    ],
    "icon": "📐",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Bench Push-Up"
    ],
    "category": "strength"
  },
  {
    "id": "decline-push-up",
    "name": "Decline Push-Up",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders",
      "Triceps",
      "Core/Abs"
    ],
    "equipment": [
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Elevate your feet and keep your hips level throughout each repetition.",
    "description": "Lower your chest until just above the floor before pressing upward. Avoid shrugging your shoulders toward your ears.",
    "avoidIf": [
      "wrist",
      "shoulder"
    ],
    "icon": "⬇️",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Feet Elevated Push-Up"
    ],
    "category": "strength"
  },
  {
    "id": "knee-push-up",
    "name": "Knee Push-Up",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders",
      "Triceps",
      "Core/Abs"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Keep a straight line from your knees through your shoulders as you press.",
    "description": "Lower your chest under control before pressing back up. Avoid bending at the hips instead of moving as one unit.",
    "avoidIf": [
      "wrist"
    ],
    "icon": "🧎",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "endurance",
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Modified Push-Up"
    ],
    "category": "strength"
  },
  {
    "id": "wide-push-up",
    "name": "Wide Push-Up",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders",
      "Triceps"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Place your hands wider than shoulder width and lower under control.",
    "description": "Press through your palms while keeping your body rigid. Avoid letting your elbows flare aggressively.",
    "avoidIf": [
      "wrist",
      "shoulder"
    ],
    "icon": "↔️",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Wide Grip Push-Up"
    ],
    "category": "strength"
  },
  {
    "id": "diamond-push-up",
    "name": "Diamond Push-Up",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Triceps",
      "Shoulders"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "Keep your hands close together beneath your chest and elbows tucked.",
    "description": "Lower until your chest nearly touches your hands before pressing up. Avoid collapsing your wrists inward.",
    "avoidIf": [
      "wrist",
      "shoulder"
    ],
    "icon": "💎",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Close Push-Up",
      "Close-Grip Push-Up"
    ],
    "category": "strength"
  },
  {
    "id": "archer-push-up",
    "name": "Archer Push-Up",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders",
      "Triceps",
      "Core/Abs"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Advanced",
    "cue": "Shift your weight over one arm while keeping the opposite arm nearly straight.",
    "description": "Alternate sides while maintaining full-body tension. Avoid twisting your hips during the movement.",
    "avoidIf": [
      "wrist",
      "shoulder",
      "balance"
    ],
    "icon": "🏹",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Side-to-Side Push-Up"
    ],
    "category": "strength"
  },
  {
    "id": "pseudo-planche-push-up",
    "name": "Pseudo Planche Push-Up",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders",
      "Triceps",
      "Core/Abs"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Advanced",
    "cue": "Lean your shoulders past your hands before lowering under control.",
    "description": "Maintain the forward lean throughout the repetition. Avoid allowing your hips to sag.",
    "avoidIf": [
      "wrist",
      "shoulder"
    ],
    "icon": "⚖️",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Planche Lean Push-Up"
    ],
    "category": "strength"
  },
  {
    "id": "tempo-push-up",
    "name": "Tempo Push-Up",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders",
      "Triceps",
      "Core/Abs"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "Take three to five seconds to lower before pressing up smoothly.",
    "description": "Maintain full-body tension through the slow eccentric. Avoid rushing the lowering phase.",
    "avoidIf": [
      "wrist"
    ],
    "icon": "⏱️",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy",
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Slow Push-Up"
    ],
    "category": "strength"
  },
  {
    "id": "deficit-push-up",
    "name": "Deficit Push-Up",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders",
      "Triceps"
    ],
    "equipment": [
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Lower deeper between the supports while maintaining shoulder control.",
    "description": "Increase range of motion without losing stability. Avoid dropping into painful shoulder positions.",
    "avoidIf": [
      "wrist",
      "shoulder"
    ],
    "icon": "⬇️",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Deep Push-Up"
    ],
    "category": "strength"
  },
  {
    "id": "wall-push-up",
    "name": "Wall Push-Up",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders",
      "Triceps"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Stand tall and lower yourself toward the wall in one straight line.",
    "description": "Push away from the wall without shrugging your shoulders. Avoid bending only at the hips.",
    "avoidIf": [],
    "icon": "🧱",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Standing Wall Push-Up"
    ],
    "category": "strength"
  },
  {
    "id": "chest-dip",
    "name": "Chest Dip",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Triceps",
      "Shoulders"
    ],
    "equipment": [
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Lean slightly forward as you lower and press back to the top.",
    "description": "Keep your elbows tracking naturally through the movement. Avoid dropping deeper than your shoulder mobility allows.",
    "avoidIf": [
      "shoulder",
      "wrist"
    ],
    "icon": "📉",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Dip"
    ],
    "category": "strength"
  },
  {
    "id": "band-chest-press",
    "name": "Resistance Band Chest Press",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders",
      "Triceps"
    ],
    "equipment": [
      "resistance-band"
    ],
    "difficulty": "Beginner",
    "cue": "Press straight forward while keeping tension in the band throughout.",
    "description": "Control both the press and the return phase. Avoid allowing the band to snap you backward.",
    "avoidIf": [],
    "icon": "🟢",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Band Press"
    ],
    "category": "strength"
  },
  {
    "id": "band-chest-fly",
    "name": "Resistance Band Chest Fly",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "resistance-band"
    ],
    "difficulty": "Beginner",
    "cue": "Sweep your arms together in a hugging motion while keeping soft elbows.",
    "description": "Maintain constant band tension throughout each repetition. Avoid turning the movement into a press.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🟢",
    "mechanic": "Isolation",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Band Fly"
    ],
    "category": "strength"
  },
  {
    "id": "band-high-to-low-crossover",
    "name": "High-to-Low Band Crossover",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "resistance-band"
    ],
    "difficulty": "Intermediate",
    "cue": "Pull downward and inward while squeezing your lower chest.",
    "description": "Control the return without losing posture. Avoid shrugging during the crossover.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🟢",
    "mechanic": "Isolation",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Band High Crossover"
    ],
    "category": "strength"
  },
  {
    "id": "band-low-to-high-crossover",
    "name": "Low-to-High Band Crossover",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "resistance-band"
    ],
    "difficulty": "Intermediate",
    "cue": "Drive your hands upward in a smooth arc toward eye level.",
    "description": "Squeeze your upper chest at the top of each repetition. Avoid arching your lower back.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🟢",
    "mechanic": "Isolation",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Band Low Crossover"
    ],
    "category": "strength"
  },
  {
    "id": "band-incline-chest-press",
    "name": "Incline Resistance Band Chest Press",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders",
      "Triceps"
    ],
    "equipment": [
      "resistance-band"
    ],
    "difficulty": "Intermediate",
    "cue": "Press upward at roughly a 30-degree angle while maintaining tension.",
    "description": "Control both directions of the movement. Avoid shrugging your shoulders as you press.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🟢",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Band Incline Press"
    ],
    "category": "strength"
  },
  {
    "id": "cable-chest-fly",
    "name": "Cable Chest Fly",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "cable"
    ],
    "difficulty": "Intermediate",
    "cue": "Bring the handles together in a wide hugging motion.",
    "description": "Maintain a slight bend in your elbows throughout. Avoid allowing the weights to slam together.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🔗",
    "mechanic": "Isolation",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Cable Fly"
    ],
    "category": "strength"
  },
  {
    "id": "high-cable-crossover",
    "name": "High Cable Crossover",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "cable"
    ],
    "difficulty": "Intermediate",
    "cue": "Pull the handles downward toward your waist in a controlled arc.",
    "description": "Squeeze your chest at the bottom before returning slowly. Avoid using momentum.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🔗",
    "mechanic": "Isolation",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "High Cable Fly"
    ],
    "category": "strength"
  },
  {
    "id": "low-cable-crossover",
    "name": "Low Cable Crossover",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "cable"
    ],
    "difficulty": "Intermediate",
    "cue": "Sweep the handles upward until they meet in front of your upper chest.",
    "description": "Move smoothly through the entire range of motion. Avoid leaning backward excessively.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🔗",
    "mechanic": "Isolation",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Low Cable Fly"
    ],
    "category": "strength"
  },
  {
    "id": "cable-chest-press",
    "name": "Cable Chest Press",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders",
      "Triceps"
    ],
    "equipment": [
      "cable"
    ],
    "difficulty": "Intermediate",
    "cue": "Press forward while maintaining even cable tension on both sides.",
    "description": "Keep your torso stable throughout the movement. Avoid stepping too far forward.",
    "avoidIf": [],
    "icon": "🔗",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Standing Cable Press"
    ],
    "category": "strength"
  },
  {
    "id": "incline-cable-chest-press",
    "name": "Incline Cable Chest Press",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders",
      "Triceps"
    ],
    "equipment": [
      "cable"
    ],
    "difficulty": "Intermediate",
    "cue": "Press upward from a low cable position while keeping your core braced.",
    "description": "Drive the handles toward your upper chest line. Avoid shrugging your shoulders during the press.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🔗",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Low Cable Press"
    ],
    "category": "strength"
  },
  {
    "id": "machine-chest-press",
    "name": "Machine Chest Press",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders",
      "Triceps"
    ],
    "equipment": [
      "machine"
    ],
    "difficulty": "Beginner",
    "cue": "Adjust the seat so the handles start at mid-chest height.",
    "description": "Press smoothly without locking your elbows forcefully. Avoid lifting your shoulders toward your ears.",
    "avoidIf": [],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Chest Press Machine"
    ],
    "category": "strength"
  },
  {
    "id": "pec-deck-fly",
    "name": "Pec Deck Fly",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "machine"
    ],
    "difficulty": "Beginner",
    "cue": "Bring the pads together while keeping a gentle bend in your elbows.",
    "description": "Pause briefly at peak contraction before returning slowly. Avoid bouncing the weight stack.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🦋",
    "mechanic": "Isolation",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Machine Fly"
    ],
    "category": "strength"
  },
  {
    "id": "incline-machine-chest-press",
    "name": "Incline Machine Chest Press",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders",
      "Triceps"
    ],
    "equipment": [
      "machine"
    ],
    "difficulty": "Beginner",
    "cue": "Press upward naturally while keeping your shoulder blades against the pad.",
    "description": "Maintain full control throughout each repetition. Avoid forcing your shoulders forward.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "📈",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Incline Chest Press Machine"
    ],
    "category": "strength"
  },
  {
    "id": "hammer-strength-chest-press",
    "name": "Hammer Strength Chest Press",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders",
      "Triceps"
    ],
    "equipment": [
      "machine"
    ],
    "difficulty": "Intermediate",
    "cue": "Drive each handle evenly while keeping your chest lifted.",
    "description": "Control the eccentric until the handles return naturally. Avoid locking out aggressively.",
    "avoidIf": [],
    "icon": "🔨",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Plate Loaded Chest Press"
    ],
    "category": "strength"
  },
  {
    "id": "trx-chest-press",
    "name": "TRX Chest Press",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders",
      "Triceps",
      "Core/Abs"
    ],
    "equipment": [
      "trx"
    ],
    "difficulty": "Intermediate",
    "cue": "Lean farther forward to increase the challenge while maintaining a rigid body.",
    "description": "Press the handles away while keeping your core engaged. Avoid letting your hips sag.",
    "avoidIf": [
      "shoulder",
      "balance"
    ],
    "icon": "🟡",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": false,
    "aliases": [
      "Suspension Chest Press"
    ],
    "category": "strength"
  },
  {
    "id": "trx-chest-fly",
    "name": "TRX Chest Fly",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders",
      "Core/Abs"
    ],
    "equipment": [
      "trx"
    ],
    "difficulty": "Advanced",
    "cue": "Keep your elbows softly bent as you open and close your arms.",
    "description": "Maintain tension throughout the movement. Avoid dropping too deep into the stretch.",
    "avoidIf": [
      "shoulder",
      "balance"
    ],
    "icon": "🟡",
    "mechanic": "Isolation",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Suspension Fly"
    ],
    "category": "strength"
  },
  {
    "id": "kettlebell-floor-press",
    "name": "Kettlebell Floor Press",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Triceps",
      "Shoulders"
    ],
    "equipment": [
      "kettlebell"
    ],
    "difficulty": "Intermediate",
    "cue": "Lower until your upper arm touches the floor before pressing smoothly upward.",
    "description": "Maintain a neutral wrist throughout the movement. Avoid letting the kettlebell drift behind your shoulder.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🔔",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "KB Floor Press"
    ],
    "category": "strength"
  },
  {
    "id": "single-arm-kettlebell-bench-press",
    "name": "Single-Arm Kettlebell Bench Press",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders",
      "Triceps",
      "Core/Abs"
    ],
    "equipment": [
      "kettlebell",
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Brace your core to prevent rotation as you press with one arm.",
    "description": "Complete all repetitions on one side before switching. Avoid twisting your torso during the lift.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🔔",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Single Arm KB Press"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-floor-press",
    "name": "Dumbbell Floor Press",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Triceps",
      "Shoulders"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Beginner",
    "cue": "Pause briefly with your upper arms on the floor before pressing.",
    "description": "Use the floor to limit shoulder range safely. Avoid bouncing your elbows off the ground.",
    "avoidIf": [],
    "icon": "🏠",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Floor Press"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-pullover",
    "name": "Dumbbell Pullover",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Back",
      "Triceps"
    ],
    "equipment": [
      "dumbbell",
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Lower the dumbbell only as far as your shoulder mobility comfortably allows.",
    "description": "Pull the weight back over your chest using a controlled arc. Avoid overextending your shoulders.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🌙",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Pullover"
    ],
    "category": "strength"
  },
  {
    "id": "single-arm-dumbbell-bench-press",
    "name": "Single-Arm Dumbbell Bench Press",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders",
      "Triceps",
      "Core/Abs"
    ],
    "equipment": [
      "dumbbell",
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Keep your torso stable while pressing with one arm at a time.",
    "description": "Brace your core to resist rotation through every repetition. Avoid letting the working shoulder roll forward.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "💪",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Single Arm DB Press"
    ],
    "category": "strength"
  },
  {
    "id": "alternating-dumbbell-bench-press",
    "name": "Alternating Dumbbell Bench Press",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders",
      "Triceps",
      "Core/Abs"
    ],
    "equipment": [
      "dumbbell",
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Keep one dumbbell extended while pressing with the opposite arm.",
    "description": "Alternate sides while maintaining a stable torso. Avoid dropping the stationary arm prematurely.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🔄",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Alternating DB Press"
    ],
    "category": "strength"
  },
  {
    "id": "pull-up",
    "name": "Pull-Up",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Shoulders"
    ],
    "equipment": [
      "pull-up-bar"
    ],
    "difficulty": "Intermediate",
    "cue": "Pull your elbows toward your ribs while keeping your chest lifted.",
    "description": "Start from a dead hang and pull until your chin clears the bar before lowering under control. Avoid kicking or swinging for momentum.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "⬆️",
    "mechanic": "Compound",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Pronated Pull-Up",
      "Overhand Pull-Up"
    ],
    "category": "strength"
  },
  {
    "id": "chin-up",
    "name": "Chin-Up",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Shoulders"
    ],
    "equipment": [
      "pull-up-bar"
    ],
    "difficulty": "Intermediate",
    "cue": "Keep your elbows close and drive your chest toward the bar.",
    "description": "Pull until your chin passes the bar before lowering with control. Avoid craning your neck to finish the repetition.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "💪",
    "mechanic": "Compound",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Underhand Pull-Up"
    ],
    "category": "strength"
  },
  {
    "id": "neutral-grip-pull-up",
    "name": "Neutral-Grip Pull-Up",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Shoulders"
    ],
    "equipment": [
      "pull-up-bar"
    ],
    "difficulty": "Intermediate",
    "cue": "Keep your palms facing each other and pull your elbows straight down.",
    "description": "Lift until your chin clears the handles before lowering smoothly. Avoid excessive swinging.",
    "avoidIf": [],
    "icon": "🤲",
    "mechanic": "Compound",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Hammer Grip Pull-Up"
    ],
    "category": "strength"
  },
  {
    "id": "wide-grip-pull-up",
    "name": "Wide-Grip Pull-Up",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Shoulders"
    ],
    "equipment": [
      "pull-up-bar"
    ],
    "difficulty": "Advanced",
    "cue": "Use a wide grip and pull your elbows toward your sides.",
    "description": "Raise your chest toward the bar with full-body control. Avoid shortening the range of motion.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "↔️",
    "mechanic": "Compound",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Wide Pull-Up"
    ],
    "category": "strength"
  },
  {
    "id": "commando-pull-up",
    "name": "Commando Pull-Up",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Core/Abs"
    ],
    "equipment": [
      "pull-up-bar"
    ],
    "difficulty": "Advanced",
    "cue": "Pull your head beside the bar while alternating sides each set.",
    "description": "Maintain control and keep your torso stable throughout. Avoid twisting aggressively.",
    "avoidIf": [
      "shoulder",
      "neck"
    ],
    "icon": "🪖",
    "mechanic": "Compound",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": false,
    "aliases": [
      "Side Pull-Up"
    ],
    "category": "strength"
  },
  {
    "id": "archer-pull-up",
    "name": "Archer Pull-Up",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Shoulders",
      "Core/Abs"
    ],
    "equipment": [
      "pull-up-bar"
    ],
    "difficulty": "Advanced",
    "cue": "Pull toward one arm while keeping the opposite arm extended.",
    "description": "Alternate sides while maintaining strict control. Avoid rotating your torso excessively.",
    "avoidIf": [
      "shoulder",
      "balance"
    ],
    "icon": "🏹",
    "mechanic": "Compound",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": true,
    "focus": [
      "strength"
    ],
    "homeFriendly": false,
    "aliases": [
      "Single-Side Pull-Up"
    ],
    "category": "strength"
  },
  {
    "id": "scapular-pull-up",
    "name": "Scapular Pull-Up",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "pull-up-bar"
    ],
    "difficulty": "Beginner",
    "cue": "Keep your elbows straight and pull only with your shoulder blades.",
    "description": "Lift your body slightly by depressing and retracting the scapulae. Avoid bending your elbows.",
    "avoidIf": [],
    "icon": "🎯",
    "mechanic": "Isolation",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "mobility",
      "strength"
    ],
    "homeFriendly": false,
    "aliases": [
      "Scap Pull-Up"
    ],
    "category": "strength"
  },
  {
    "id": "negative-pull-up",
    "name": "Negative Pull-Up",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps"
    ],
    "equipment": [
      "pull-up-bar"
    ],
    "difficulty": "Beginner",
    "cue": "Lower yourself as slowly as possible from the top position.",
    "description": "Step or jump to the top before controlling the descent. Avoid dropping quickly at the bottom.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "⬇️",
    "mechanic": "Compound",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": false,
    "aliases": [
      "Eccentric Pull-Up"
    ],
    "category": "strength"
  },
  {
    "id": "inverted-row",
    "name": "Inverted Row",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Shoulders"
    ],
    "equipment": [
      "bench"
    ],
    "difficulty": "Beginner",
    "cue": "Keep your body rigid and pull your chest toward the bar.",
    "description": "Lower yourself under control after each repetition. Avoid letting your hips sag.",
    "avoidIf": [],
    "icon": "↕️",
    "mechanic": "Compound",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Australian Pull-Up",
      "Body Row"
    ],
    "category": "strength"
  },
  {
    "id": "feet-elevated-inverted-row",
    "name": "Feet-Elevated Inverted Row",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Shoulders",
      "Core/Abs"
    ],
    "equipment": [
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Elevate your feet and keep your body perfectly straight.",
    "description": "Pull your chest to the bar before lowering slowly. Avoid losing body tension.",
    "avoidIf": [],
    "icon": "📈",
    "mechanic": "Compound",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Elevated Body Row"
    ],
    "category": "strength"
  },
  {
    "id": "towel-row",
    "name": "Towel Row",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Lean back and pull evenly through both arms.",
    "description": "Use a securely anchored towel and row your body toward it. Avoid using an unstable anchor point.",
    "avoidIf": [
      "balance"
    ],
    "icon": "🧺",
    "mechanic": "Compound",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "endurance",
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Door Towel Row"
    ],
    "category": "strength"
  },
  {
    "id": "superman",
    "name": "Superman",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Glutes",
      "Hamstrings"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Lift your arms and legs together while keeping your neck neutral.",
    "description": "Pause briefly at the top before lowering with control. Avoid looking upward excessively.",
    "avoidIf": [
      "lower-back",
      "pregnancy"
    ],
    "icon": "🦸",
    "mechanic": "Isolation",
    "pattern": "Core",
    "force": "Static",
    "unilateral": false,
    "focus": [
      "endurance",
      "mobility"
    ],
    "homeFriendly": true,
    "aliases": [
      "Superman Hold"
    ],
    "category": "strength"
  },
  {
    "id": "prone-y-t-w-raise",
    "name": "Prone Y-T-W Raise",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Move slowly through the Y, T, and W positions without shrugging.",
    "description": "Raise your arms deliberately while keeping your forehead supported. Avoid rushing between positions.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🔤",
    "mechanic": "Isolation",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "mobility",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "YTW Raise"
    ],
    "category": "strength"
  },
  {
    "id": "bodyweight-back-extension",
    "name": "Bodyweight Back Extension",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Glutes",
      "Hamstrings"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Lift your chest only until your spine reaches neutral alignment.",
    "description": "Raise and lower under complete control. Avoid hyperextending your lower back.",
    "avoidIf": [
      "lower-back",
      "pregnancy"
    ],
    "icon": "🌄",
    "mechanic": "Isolation",
    "pattern": "Hinge",
    "force": "Static",
    "unilateral": false,
    "focus": [
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Floor Back Extension"
    ],
    "category": "strength"
  },
  {
    "id": "reverse-snow-angel",
    "name": "Reverse Snow Angel",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Sweep your arms from overhead to your hips while keeping them off the floor.",
    "description": "Move slowly through the full arc without lifting your head. Avoid shrugging your shoulders.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "❄️",
    "mechanic": "Isolation",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "mobility",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Prone Snow Angel"
    ],
    "category": "strength"
  },
  {
    "id": "reverse-plank",
    "name": "Reverse Plank",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Glutes",
      "Shoulders",
      "Core/Abs"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Drive your hips upward while squeezing your shoulder blades together.",
    "description": "Hold a straight line from shoulders to heels. Avoid letting your hips sag.",
    "avoidIf": [
      "wrist",
      "shoulder"
    ],
    "icon": "🪵",
    "mechanic": "Compound",
    "pattern": "Core",
    "force": "Static",
    "unilateral": false,
    "focus": [
      "endurance",
      "mobility"
    ],
    "homeFriendly": true,
    "aliases": [
      "Back Plank"
    ],
    "category": "strength"
  },
  {
    "id": "bird-dog-row-hold",
    "name": "Bird Dog Row Hold",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Core/Abs",
      "Glutes"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Reach long through your arm and opposite leg while keeping your spine neutral.",
    "description": "Pause briefly before switching sides. Avoid rotating your hips during the hold.",
    "avoidIf": [
      "balance",
      "pregnancy"
    ],
    "icon": "🐦",
    "mechanic": "Compound",
    "pattern": "Core",
    "force": "Static",
    "unilateral": true,
    "focus": [
      "mobility",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Bird Dog Hold"
    ],
    "category": "strength"
  },
  {
    "id": "single-arm-dumbbell-row",
    "name": "Single-Arm Dumbbell Row",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Shoulders"
    ],
    "equipment": [
      "dumbbell",
      "bench"
    ],
    "difficulty": "Beginner",
    "cue": "Pull your elbow toward your hip while keeping your torso stable.",
    "description": "Support yourself on a bench and row the dumbbell through a full range of motion. Avoid twisting your torso to lift heavier weight.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": true,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "One-Arm DB Row",
      "Single Arm DB Row"
    ],
    "category": "strength"
  },
  {
    "id": "chest-supported-incline-dumbbell-row",
    "name": "Chest-Supported Incline Dumbbell Row",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Shoulders"
    ],
    "equipment": [
      "dumbbell",
      "bench"
    ],
    "difficulty": "Beginner",
    "cue": "Keep your chest glued to the bench and drive your elbows back.",
    "description": "Row both dumbbells until your elbows pass your torso before lowering under control. Avoid lifting your chest off the bench.",
    "avoidIf": [],
    "icon": "📈",
    "mechanic": "Compound",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy",
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Incline DB Row",
      "Chest Supported DB Row"
    ],
    "category": "strength"
  },
  {
    "id": "bent-over-dumbbell-row",
    "name": "Bent-Over Dumbbell Row",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Shoulders"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Maintain a flat back while pulling both elbows toward your hips.",
    "description": "Hinge at the hips and row both dumbbells with control. Avoid rounding your lower back.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "💪",
    "mechanic": "Compound",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Bent Row"
    ],
    "category": "strength"
  },
  {
    "id": "gorilla-dumbbell-row",
    "name": "Gorilla Dumbbell Row",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Core/Abs"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Alternate rows while holding a strong hip hinge.",
    "description": "Keep one dumbbell planted while rowing the other. Avoid rotating your torso as you switch sides.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🦍",
    "mechanic": "Compound",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": true,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Alternating Gorilla Row"
    ],
    "category": "strength"
  },
  {
    "id": "dead-stop-dumbbell-row",
    "name": "Dead-Stop Dumbbell Row",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Pause each dumbbell on the floor before every repetition.",
    "description": "Reset your position after every rep for maximum power. Avoid bouncing the weights off the floor.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "⏸️",
    "mechanic": "Compound",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Dead Stop Row"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-high-pull",
    "name": "Dumbbell High Pull",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Shoulders",
      "Biceps"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Snap your hips forward, then pull the dumbbells up to chest height, leading with your elbows.",
    "description": "Stand holding a dumbbell in each hand in front of your thighs, feet hip-width apart, knees slightly bent. Dip a few inches by pushing your hips back, then explosively stand up straight and use that momentum to pull both dumbbells straight up your body to about chest height, with your elbows leading high and out to the sides. Lower under control and reset. Don't turn it into a slow biceps curl — the power comes from your hips and legs, not your arms.",
    "avoidIf": [
      "shoulder",
      "lower-back"
    ],
    "icon": "⚡",
    "mechanic": "Compound",
    "pattern": "Vertical Pull",
    "force": "Explosive",
    "unilateral": false,
    "focus": [
      "power"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB High Pull"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-shrug",
    "name": "Dumbbell Shrug",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Beginner",
    "cue": "Lift your shoulders straight upward without rolling them.",
    "description": "Pause briefly at the top before lowering slowly. Avoid rotating your shoulders in circles.",
    "avoidIf": [
      "neck"
    ],
    "icon": "⬆️",
    "mechanic": "Isolation",
    "pattern": "Carry",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Shrug"
    ],
    "category": "strength"
  },
  {
    "id": "kroc-row",
    "name": "Kroc Row",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Core/Abs"
    ],
    "equipment": [
      "dumbbell",
      "bench"
    ],
    "difficulty": "Advanced",
    "cue": "Use controlled body English only after strict pulling breaks down.",
    "description": "Perform high-rep heavy rows while maintaining spinal stability. Avoid jerking the weight from the floor.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🦾",
    "mechanic": "Compound",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": true,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Heavy One-Arm Row"
    ],
    "category": "strength"
  },
  {
    "id": "incline-prone-dumbbell-row",
    "name": "Incline Prone Dumbbell Row",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Shoulders"
    ],
    "equipment": [
      "dumbbell",
      "bench"
    ],
    "difficulty": "Beginner",
    "cue": "Pull your elbows slightly outward while keeping your chest on the bench.",
    "description": "Focus on squeezing your shoulder blades together. Avoid lifting your chest during the row.",
    "avoidIf": [],
    "icon": "🛏️",
    "mechanic": "Compound",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Prone Incline Row"
    ],
    "category": "strength"
  },
  {
    "id": "barbell-bent-over-row",
    "name": "Barbell Bent-Over Row",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Shoulders"
    ],
    "equipment": [
      "barbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Hold a solid hip hinge and pull the bar toward your lower ribs.",
    "description": "Row under control while maintaining a neutral spine. Avoid using excessive torso momentum.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "BB Bent Row"
    ],
    "category": "strength"
  },
  {
    "id": "pendlay-row",
    "name": "Pendlay Row",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Shoulders"
    ],
    "equipment": [
      "barbell"
    ],
    "difficulty": "Advanced",
    "cue": "Reset the bar on the floor before every explosive repetition.",
    "description": "Pull from a dead stop with a rigid torso. Avoid bouncing the bar between repetitions.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🚀",
    "mechanic": "Compound",
    "pattern": "Horizontal Pull",
    "force": "Explosive",
    "unilateral": false,
    "focus": [
      "strength",
      "power"
    ],
    "homeFriendly": false,
    "aliases": [
      "Dead Stop Barbell Row"
    ],
    "category": "strength"
  },
  {
    "id": "t-bar-row",
    "name": "T-Bar Row",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Shoulders"
    ],
    "equipment": [
      "barbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Drive your elbows back while keeping your chest proud.",
    "description": "Pull through a full range of motion before lowering with control. Avoid rounding your spine.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🔩",
    "mechanic": "Compound",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Landmine Row"
    ],
    "category": "strength"
  },
  {
    "id": "yates-row",
    "name": "Yates Row",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps"
    ],
    "equipment": [
      "barbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Use an underhand grip and a slightly more upright torso.",
    "description": "Row toward your lower abdomen with control. Avoid excessive body swing.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "📏",
    "mechanic": "Compound",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Underhand Barbell Row"
    ],
    "category": "strength"
  },
  {
    "id": "barbell-shrug",
    "name": "Barbell Shrug",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "barbell"
    ],
    "difficulty": "Beginner",
    "cue": "Lift your shoulders straight toward your ears and pause.",
    "description": "Lower the bar slowly after each repetition. Avoid rolling your shoulders.",
    "avoidIf": [
      "neck"
    ],
    "icon": "⬆️",
    "mechanic": "Isolation",
    "pattern": "Carry",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "BB Shrug"
    ],
    "category": "strength"
  },
  {
    "id": "rack-pull",
    "name": "Rack Pull",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Glutes",
      "Hamstrings"
    ],
    "equipment": [
      "barbell"
    ],
    "difficulty": "Advanced",
    "cue": "Keep the bar close and lock out by driving your hips forward.",
    "description": "Lift from knee height while maintaining a neutral spine. Avoid hyperextending at lockout.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🗄️",
    "mechanic": "Compound",
    "pattern": "Hinge",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": false,
    "aliases": [
      "Partial Deadlift"
    ],
    "category": "strength"
  },
  {
    "id": "conventional-deadlift",
    "name": "Conventional Deadlift",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Glutes",
      "Hamstrings"
    ],
    "equipment": [
      "barbell"
    ],
    "difficulty": "Advanced",
    "cue": "Brace hard, keep the bar against your legs, and push the floor away.",
    "description": "Stand tall by extending your hips and knees together before lowering under control. Avoid rounding your lower back throughout the lift.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Hinge",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "power"
    ],
    "homeFriendly": false,
    "aliases": [
      "Deadlift",
      "Conventional Barbell Deadlift"
    ],
    "category": "strength"
  },
  {
    "id": "single-arm-kettlebell-row",
    "name": "Single-Arm Kettlebell Row",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Shoulders"
    ],
    "equipment": [
      "kettlebell",
      "bench"
    ],
    "difficulty": "Beginner",
    "cue": "Pull the kettlebell toward your hip while keeping your torso square.",
    "description": "Move through a controlled range of motion with each repetition. Avoid twisting your shoulders.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🔔",
    "mechanic": "Compound",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": true,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "One-Arm KB Row"
    ],
    "category": "strength"
  },
  {
    "id": "kettlebell-gorilla-row",
    "name": "Kettlebell Gorilla Row",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Core/Abs"
    ],
    "equipment": [
      "kettlebell"
    ],
    "difficulty": "Intermediate",
    "cue": "Alternate rows while maintaining a strong hip hinge.",
    "description": "Keep one kettlebell grounded while rowing the other. Avoid rotating your torso between repetitions.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🦍",
    "mechanic": "Compound",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": true,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "KB Gorilla Row"
    ],
    "category": "strength"
  },
  {
    "id": "cable-lat-pulldown",
    "name": "Cable Lat Pulldown",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Shoulders"
    ],
    "equipment": [
      "cable"
    ],
    "difficulty": "Beginner",
    "cue": "Pull the bar toward your upper chest while driving your elbows down.",
    "description": "Control the weight as it returns overhead before repeating. Avoid leaning back excessively to create momentum.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🔗",
    "mechanic": "Compound",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Lat Pulldown",
      "Wide Pulldown"
    ],
    "category": "strength"
  },
  {
    "id": "close-grip-cable-lat-pulldown",
    "name": "Close-Grip Cable Lat Pulldown",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Shoulders"
    ],
    "equipment": [
      "cable"
    ],
    "difficulty": "Beginner",
    "cue": "Use a close handle and pull your elbows toward your sides.",
    "description": "Focus on squeezing your lats at the bottom position. Avoid turning the movement into a row by leaning too far back.",
    "avoidIf": [],
    "icon": "🔗",
    "mechanic": "Compound",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "V-Bar Pulldown"
    ],
    "category": "strength"
  },
  {
    "id": "wide-grip-cable-lat-pulldown",
    "name": "Wide-Grip Cable Lat Pulldown",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Shoulders"
    ],
    "equipment": [
      "cable"
    ],
    "difficulty": "Intermediate",
    "cue": "Use a wider grip and pull your elbows down toward your ribs.",
    "description": "Maintain an upright torso while pulling through the back. Avoid pulling the bar behind your neck.",
    "avoidIf": [
      "shoulder",
      "neck"
    ],
    "icon": "↔️",
    "mechanic": "Compound",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Wide Lat Pulldown"
    ],
    "category": "strength"
  },
  {
    "id": "straight-arm-cable-pulldown",
    "name": "Straight-Arm Cable Pulldown",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "cable"
    ],
    "difficulty": "Beginner",
    "cue": "Keep your arms straight and pull the bar toward your thighs.",
    "description": "Move only through the shoulder joint while keeping your torso stable. Avoid bending your elbows to turn it into a pressdown.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🔗",
    "mechanic": "Isolation",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Cable Pullover",
      "Straight Arm Pullover"
    ],
    "category": "strength"
  },
  {
    "id": "seated-cable-row",
    "name": "Seated Cable Row",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Shoulders"
    ],
    "equipment": [
      "cable"
    ],
    "difficulty": "Beginner",
    "cue": "Pull the handle toward your torso while keeping your chest tall.",
    "description": "Squeeze your shoulder blades together before returning forward. Avoid rounding your back at the stretch.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🔗",
    "mechanic": "Compound",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Cable Row"
    ],
    "category": "strength"
  },
  {
    "id": "single-arm-cable-row",
    "name": "Single-Arm Cable Row",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Core/Abs"
    ],
    "equipment": [
      "cable"
    ],
    "difficulty": "Intermediate",
    "cue": "Pull one handle toward your hip while resisting rotation.",
    "description": "Keep your torso stable throughout the movement. Avoid twisting toward the cable stack.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🔗",
    "mechanic": "Compound",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": true,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "One Arm Cable Row"
    ],
    "category": "strength"
  },
  {
    "id": "cable-face-pull",
    "name": "Cable Face Pull",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "cable"
    ],
    "difficulty": "Beginner",
    "cue": "Pull the rope toward your face while rotating your hands outward.",
    "description": "Control the movement and squeeze your upper back. Avoid shrugging your shoulders upward.",
    "avoidIf": [
      "shoulder",
      "neck"
    ],
    "icon": "🎯",
    "mechanic": "Isolation",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "mobility",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Rope Face Pull"
    ],
    "category": "strength"
  },
  {
    "id": "cable-pullover",
    "name": "Cable Pullover",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "cable"
    ],
    "difficulty": "Intermediate",
    "cue": "Pull the rope or bar down in an arc while keeping your arms mostly straight.",
    "description": "Focus on lat contraction through the full movement. Avoid bending your elbows excessively.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🔗",
    "mechanic": "Isolation",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Cable Straight Arm Pullover"
    ],
    "category": "strength"
  },
  {
    "id": "lat-pulldown-machine",
    "name": "Lat Pulldown Machine",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Shoulders"
    ],
    "equipment": [
      "machine"
    ],
    "difficulty": "Beginner",
    "cue": "Pull the handles down while keeping your chest lifted.",
    "description": "Control the return until your arms are extended. Avoid using body momentum to pull the weight.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Pulldown Machine"
    ],
    "category": "strength"
  },
  {
    "id": "seated-row-machine",
    "name": "Seated Row Machine",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Shoulders"
    ],
    "equipment": [
      "machine"
    ],
    "difficulty": "Beginner",
    "cue": "Drive your elbows backward while keeping your chest against the pad.",
    "description": "Pause briefly when your shoulder blades squeeze together. Avoid rounding forward during the return.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Row Machine"
    ],
    "category": "strength"
  },
  {
    "id": "chest-supported-row-machine",
    "name": "Chest-Supported Row Machine",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Shoulders"
    ],
    "equipment": [
      "machine"
    ],
    "difficulty": "Beginner",
    "cue": "Keep your chest against the pad and pull smoothly.",
    "description": "Use the support to isolate your back muscles. Avoid lifting your chest away from the pad.",
    "avoidIf": [],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Supported Row Machine"
    ],
    "category": "strength"
  },
  {
    "id": "hammer-strength-row",
    "name": "Hammer Strength Row",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Shoulders"
    ],
    "equipment": [
      "machine"
    ],
    "difficulty": "Intermediate",
    "cue": "Drive the handles back while keeping your shoulders down.",
    "description": "Control each repetition and squeeze your upper back. Avoid jerking the handles toward you.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🔨",
    "mechanic": "Compound",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Hammer Row"
    ],
    "category": "strength"
  },
  {
    "id": "assisted-pull-up-machine",
    "name": "Assisted Pull-Up Machine",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Shoulders"
    ],
    "equipment": [
      "machine"
    ],
    "difficulty": "Beginner",
    "cue": "Pull your chest toward the handles while controlling the assistance.",
    "description": "Use the machine to practice a full pull-up pattern. Avoid relying entirely on the assistance platform.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "⬆️",
    "mechanic": "Compound",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": false,
    "aliases": [
      "Assisted Chin-Up Machine"
    ],
    "category": "strength"
  },
  {
    "id": "back-extension-machine",
    "name": "Back Extension Machine",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Glutes",
      "Hamstrings"
    ],
    "equipment": [
      "machine"
    ],
    "difficulty": "Beginner",
    "cue": "Extend your torso until your spine reaches neutral alignment.",
    "description": "Move through a controlled hip hinge pattern. Avoid hyperextending your lower back at the top.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🏋️",
    "mechanic": "Isolation",
    "pattern": "Hinge",
    "force": "Static",
    "unilateral": false,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": false,
    "aliases": [
      "Machine Hyperextension"
    ],
    "category": "strength"
  },
  {
    "id": "resistance-band-lat-pulldown",
    "name": "Resistance Band Lat Pulldown",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Shoulders"
    ],
    "equipment": [
      "resistance-band"
    ],
    "difficulty": "Beginner",
    "cue": "Pull the band down while driving your elbows toward your ribs.",
    "description": "Anchor the band overhead and control the return to the starting position. Avoid shrugging your shoulders during the pull.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🟢",
    "mechanic": "Compound",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Band Pulldown"
    ],
    "category": "strength"
  },
  {
    "id": "resistance-band-row",
    "name": "Resistance Band Row",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Shoulders"
    ],
    "equipment": [
      "resistance-band"
    ],
    "difficulty": "Beginner",
    "cue": "Pull the band toward your torso while squeezing your shoulder blades.",
    "description": "Maintain a tall posture and controlled tempo throughout the movement. Avoid leaning backward to create momentum.",
    "avoidIf": [],
    "icon": "🟢",
    "mechanic": "Compound",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Band Seated Row",
      "Band Row"
    ],
    "category": "strength"
  },
  {
    "id": "band-pull-apart",
    "name": "Band Pull-Apart",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "resistance-band"
    ],
    "difficulty": "Beginner",
    "cue": "Pull the band apart while keeping your arms straight.",
    "description": "Squeeze your upper back as the band reaches your chest line. Avoid shrugging or arching your lower back.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "↔️",
    "mechanic": "Isolation",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "mobility",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Band Shoulder Pull Apart"
    ],
    "category": "strength"
  },
  {
    "id": "band-straight-arm-pulldown",
    "name": "Band Straight-Arm Pulldown",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "resistance-band"
    ],
    "difficulty": "Beginner",
    "cue": "Pull the band down with straight arms toward your thighs.",
    "description": "Keep tension on the band throughout the movement. Avoid bending your elbows to compensate.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🟢",
    "mechanic": "Isolation",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Band Pullover"
    ],
    "category": "strength"
  },
  {
    "id": "band-face-pull",
    "name": "Band Face Pull",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "resistance-band"
    ],
    "difficulty": "Beginner",
    "cue": "Pull the band toward your face while rotating your hands outward.",
    "description": "Keep your elbows high and squeeze your upper back. Avoid pulling only with your arms.",
    "avoidIf": [
      "shoulder",
      "neck"
    ],
    "icon": "🎯",
    "mechanic": "Isolation",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "mobility",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Resistance Band Face Pull"
    ],
    "category": "strength"
  },
  {
    "id": "band-single-arm-row",
    "name": "Single-Arm Resistance Band Row",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Core/Abs"
    ],
    "equipment": [
      "resistance-band"
    ],
    "difficulty": "Beginner",
    "cue": "Row one arm at a time while resisting torso rotation.",
    "description": "Keep your shoulders square throughout each repetition. Avoid turning your body toward the anchor point.",
    "avoidIf": [],
    "icon": "🟢",
    "mechanic": "Compound",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": true,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Single Arm Band Row"
    ],
    "category": "strength"
  },
  {
    "id": "trx-row",
    "name": "TRX Row",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Shoulders"
    ],
    "equipment": [
      "trx"
    ],
    "difficulty": "Beginner",
    "cue": "Keep your body straight and pull your chest toward the handles.",
    "description": "Adjust your body angle to change difficulty. Avoid letting your hips drop during the row.",
    "avoidIf": [],
    "icon": "〰️",
    "mechanic": "Compound",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Suspension Row"
    ],
    "category": "strength"
  },
  {
    "id": "trx-single-arm-row",
    "name": "TRX Single-Arm Row",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Core/Abs"
    ],
    "equipment": [
      "trx"
    ],
    "difficulty": "Intermediate",
    "cue": "Row with one arm while resisting rotation through your torso.",
    "description": "Maintain a rigid plank position as you pull. Avoid twisting your hips open.",
    "avoidIf": [
      "balance"
    ],
    "icon": "〰️",
    "mechanic": "Compound",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": true,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Single Arm Suspension Row"
    ],
    "category": "strength"
  },
  {
    "id": "pike-push-up",
    "name": "Pike Push-Up",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Triceps",
      "Chest"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Drive your head toward the floor while keeping your hips high.",
    "description": "Press your body upward with your shoulders doing most of the work. Avoid collapsing your neck or losing your pike position.",
    "avoidIf": [
      "shoulder",
      "neck"
    ],
    "icon": "🔺",
    "mechanic": "Compound",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Downward Dog Push-Up"
    ],
    "category": "strength"
  },
  {
    "id": "feet-elevated-pike-push-up",
    "name": "Feet-Elevated Pike Push-Up",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Triceps",
      "Chest"
    ],
    "equipment": [
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Elevate your feet and lower your head between your hands.",
    "description": "Increase the shoulder loading angle while maintaining control. Avoid letting your lower back collapse.",
    "avoidIf": [
      "shoulder",
      "neck"
    ],
    "icon": "🔺",
    "mechanic": "Compound",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Elevated Pike Press"
    ],
    "category": "strength"
  },
  {
    "id": "wall-handstand-hold",
    "name": "Wall Handstand Hold",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Core/Abs",
      "Triceps"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Advanced",
    "cue": "Press tall through your hands while maintaining a straight body line.",
    "description": "Hold a stable inverted position against the wall. Avoid dumping weight into your neck or shoulders.",
    "avoidIf": [
      "shoulder",
      "neck",
      "wrist"
    ],
    "icon": "🤸",
    "mechanic": "Compound",
    "pattern": "Vertical Push",
    "force": "Static",
    "unilateral": false,
    "focus": [
      "strength",
      "mobility"
    ],
    "homeFriendly": true,
    "aliases": [
      "Wall Handstand"
    ],
    "category": "strength"
  },
  {
    "id": "wall-walk",
    "name": "Wall Walk",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Core/Abs",
      "Triceps"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Advanced",
    "cue": "Walk your hands forward while climbing your feet up the wall.",
    "description": "Move slowly into an inverted position and return with control. Avoid collapsing through the shoulders.",
    "avoidIf": [
      "shoulder",
      "wrist",
      "neck"
    ],
    "icon": "🧗",
    "mechanic": "Compound",
    "pattern": "Vertical Push",
    "force": "Explosive",
    "unilateral": false,
    "focus": [
      "strength",
      "power"
    ],
    "homeFriendly": true,
    "aliases": [
      "Wall Climb"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-lateral-raise",
    "name": "Dumbbell Lateral Raise",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Beginner",
    "cue": "Raise the dumbbells out to your sides with controlled motion.",
    "description": "Lift until your arms are near shoulder height before lowering slowly. Avoid swinging the weights upward.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🪽",
    "mechanic": "Isolation",
    "pattern": "Vertical Push",
    "force": "Static",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Side Raise"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-front-raise",
    "name": "Dumbbell Front Raise",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Chest"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Beginner",
    "cue": "Raise the dumbbells straight in front of you with control.",
    "description": "Keep your torso still while lifting and lowering the weights. Avoid leaning backward for momentum.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "⬆️",
    "mechanic": "Isolation",
    "pattern": "Vertical Push",
    "force": "Static",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Front Raise"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-rear-delt-fly",
    "name": "Dumbbell Rear-Delt Fly",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Back"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Beginner",
    "cue": "Sweep the dumbbells outward while squeezing your rear shoulders.",
    "description": "Maintain a stable bent-over position throughout the movement. Avoid shrugging the weights upward.",
    "avoidIf": [],
    "icon": "🪽",
    "mechanic": "Isolation",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Rear Fly"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-scaption",
    "name": "Dumbbell Scaption",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Chest"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Beginner",
    "cue": "Raise the dumbbells in the scapular plane with thumbs slightly upward.",
    "description": "Move smoothly through the shoulder-friendly angle. Avoid forcing painful ranges of motion.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "↗️",
    "mechanic": "Isolation",
    "pattern": "Vertical Push",
    "force": "Static",
    "unilateral": false,
    "focus": [
      "mobility",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Scaption Raise"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-cuban-press",
    "name": "Dumbbell Cuban Press",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Triceps"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Rotate the dumbbells upward before pressing overhead.",
    "description": "Use light weight and controlled rotation through the shoulders. Avoid forcing the range of motion.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🔄",
    "mechanic": "Compound",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "mobility",
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Cuban Rotation Press"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-six-way-raise",
    "name": "Dumbbell 6-Way Raise",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Chest"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Move through six controlled raise positions without swinging.",
    "description": "Keep the weights light and maintain shoulder control. Avoid rushing through the sequence.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🔢",
    "mechanic": "Isolation",
    "pattern": "Vertical Push",
    "force": "Static",
    "unilateral": false,
    "focus": [
      "endurance",
      "mobility"
    ],
    "homeFriendly": true,
    "aliases": [
      "Six Way Shoulder Raise"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-around-the-world",
    "name": "Dumbbell Around-the-World",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Chest"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Circle the dumbbells around your body with smooth control.",
    "description": "Maintain tension through the entire arc of motion. Avoid using momentum to complete the circle.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🌎",
    "mechanic": "Isolation",
    "pattern": "Vertical Push",
    "force": "Static",
    "unilateral": false,
    "focus": [
      "mobility"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Around World"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-lean-away-lateral-raise",
    "name": "Dumbbell Lean-Away Lateral Raise",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [],
    "equipment": [
      "dumbbell",
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Lean away from support and raise the dumbbell through your side.",
    "description": "Use controlled tension through the lateral deltoid. Avoid shrugging at the top.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "↔️",
    "mechanic": "Isolation",
    "pattern": "Vertical Push",
    "force": "Static",
    "unilateral": true,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Lean Away DB Raise"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-incline-y-raise",
    "name": "Dumbbell Incline Y-Raise",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Back"
    ],
    "equipment": [
      "dumbbell",
      "bench"
    ],
    "difficulty": "Beginner",
    "cue": "Raise your arms into a Y position while lying on an incline bench.",
    "description": "Focus on controlled shoulder blade movement. Avoid shrugging toward your ears.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🙆",
    "mechanic": "Isolation",
    "pattern": "Vertical Push",
    "force": "Static",
    "unilateral": false,
    "focus": [
      "mobility",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Incline DB Y Raise"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-l-raise",
    "name": "Dumbbell L-Raise",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Biceps"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Raise your arms into an L shape using slow controlled motion.",
    "description": "Rotate and lift with shoulder control throughout the movement. Avoid using heavy weights.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "📐",
    "mechanic": "Isolation",
    "pattern": "Vertical Push",
    "force": "Static",
    "unilateral": false,
    "focus": [
      "mobility",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB L Raise"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-powell-raise",
    "name": "Dumbbell Powell Raise",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Back"
    ],
    "equipment": [
      "dumbbell",
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Perform a rear-delt raise while lying chest-supported on an incline bench.",
    "description": "Keep the movement isolated to the rear shoulders. Avoid rotating your torso.",
    "avoidIf": [],
    "icon": "🪽",
    "mechanic": "Isolation",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Powell Raise"
    ],
    "category": "strength"
  },
  {
    "id": "seated-dumbbell-rear-delt-fly",
    "name": "Seated Dumbbell Rear-Delt Fly",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Back"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Beginner",
    "cue": "Lean forward and open your arms wide using your rear shoulders.",
    "description": "Squeeze the rear delts at the top before lowering slowly. Avoid turning it into a row.",
    "avoidIf": [],
    "icon": "🪽",
    "mechanic": "Isolation",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Seated DB Rear Fly"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-seated-shoulder-press",
    "name": "Dumbbell Seated Shoulder Press",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Triceps"
    ],
    "equipment": [
      "dumbbell",
      "bench"
    ],
    "difficulty": "Beginner",
    "cue": "Press the dumbbells overhead while keeping your ribs stacked over your hips.",
    "description": "Lower the weights under control to shoulder height before pressing again. Avoid arching your lower back to create momentum.",
    "avoidIf": [
      "shoulder",
      "neck"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Seated DB Press",
      "Dumbbell Overhead Press"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-standing-shoulder-press",
    "name": "Dumbbell Standing Shoulder Press",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Triceps",
      "Core/Abs"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Press overhead while maintaining a stable standing position.",
    "description": "Brace your core and move the dumbbells through a controlled path. Avoid leaning backward during the press.",
    "avoidIf": [
      "shoulder",
      "neck"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Standing DB Press"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-arnold-press",
    "name": "Dumbbell Arnold Press",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Triceps",
      "Chest"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Rotate your palms outward as you press the dumbbells overhead.",
    "description": "Use a controlled rotation through the shoulder joint. Avoid forcing the bottom position if mobility is limited.",
    "avoidIf": [
      "shoulder",
      "neck"
    ],
    "icon": "🔄",
    "mechanic": "Compound",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Arnold Dumbbell Press"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-push-press",
    "name": "Dumbbell Push Press",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Triceps",
      "Full Body/Cardio"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Use a small leg drive before pressing overhead.",
    "description": "Generate power from the lower body while keeping the press controlled. Avoid turning the movement into a jump.",
    "avoidIf": [
      "shoulder",
      "neck"
    ],
    "icon": "⚡",
    "mechanic": "Compound",
    "pattern": "Vertical Push",
    "force": "Explosive",
    "unilateral": false,
    "focus": [
      "power",
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Push Press"
    ],
    "category": "strength"
  },
  {
    "id": "single-arm-dumbbell-overhead-press",
    "name": "Single-Arm Dumbbell Overhead Press",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Triceps",
      "Core/Abs"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Press one dumbbell overhead while resisting sideways movement.",
    "description": "Maintain a strong brace throughout the press. Avoid leaning away from the working side.",
    "avoidIf": [
      "shoulder",
      "neck"
    ],
    "icon": "💪",
    "mechanic": "Compound",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Single Arm DB Press"
    ],
    "category": "strength"
  },
  {
    "id": "half-kneeling-dumbbell-press",
    "name": "Half-Kneeling Dumbbell Press",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Core/Abs",
      "Triceps"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Press overhead from a half-kneeling position while keeping your torso tall.",
    "description": "Use your core to prevent arching or rotating. Avoid leaning into the pressing side.",
    "avoidIf": [
      "shoulder",
      "neck"
    ],
    "icon": "🧎",
    "mechanic": "Compound",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "strength",
      "mobility"
    ],
    "homeFriendly": true,
    "aliases": [
      "Half Kneeling DB Press"
    ],
    "category": "strength"
  },
  {
    "id": "barbell-overhead-press",
    "name": "Barbell Overhead Press",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Triceps",
      "Core/Abs"
    ],
    "equipment": [
      "barbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Press the bar overhead while keeping your body rigid.",
    "description": "Move your head slightly back then forward as the bar passes. Avoid excessive lower-back arching.",
    "avoidIf": [
      "shoulder",
      "neck"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": false,
    "aliases": [
      "Military Press",
      "Strict Press"
    ],
    "category": "strength"
  },
  {
    "id": "barbell-push-press",
    "name": "Barbell Push Press",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Triceps",
      "Full Body/Cardio"
    ],
    "equipment": [
      "barbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Dip slightly with your legs and drive the bar overhead.",
    "description": "Transfer force from your legs into the press. Avoid excessive back extension at lockout.",
    "avoidIf": [
      "shoulder",
      "neck"
    ],
    "icon": "⚡",
    "mechanic": "Compound",
    "pattern": "Vertical Push",
    "force": "Explosive",
    "unilateral": false,
    "focus": [
      "power",
      "strength"
    ],
    "homeFriendly": false,
    "aliases": [
      "BB Push Press"
    ],
    "category": "strength"
  },
  {
    "id": "barbell-z-press",
    "name": "Barbell Z Press",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Core/Abs",
      "Triceps"
    ],
    "equipment": [
      "barbell"
    ],
    "difficulty": "Advanced",
    "cue": "Press overhead while seated on the floor with legs extended.",
    "description": "Maintain a tall seated posture throughout the movement. Avoid leaning backward to complete repetitions.",
    "avoidIf": [
      "shoulder",
      "neck"
    ],
    "icon": "🪑",
    "mechanic": "Compound",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "mobility"
    ],
    "homeFriendly": false,
    "aliases": [
      "Z Press"
    ],
    "category": "strength"
  },
  {
    "id": "barbell-landmine-press",
    "name": "Barbell Landmine Press",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Chest",
      "Triceps"
    ],
    "equipment": [
      "barbell"
    ],
    "difficulty": "Beginner",
    "cue": "Press the angled bar path upward and forward.",
    "description": "Keep your shoulder packed as you press. Avoid letting the shoulder roll forward at the top.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🚀",
    "mechanic": "Compound",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Landmine Shoulder Press"
    ],
    "category": "strength"
  },
  {
    "id": "barbell-upright-row",
    "name": "Barbell Upright Row",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Biceps"
    ],
    "equipment": [
      "barbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Pull the bar upward while keeping your elbows slightly above your hands.",
    "description": "Use a comfortable range of motion and controlled tempo. Avoid forcing a narrow grip or excessive height.",
    "avoidIf": [
      "shoulder",
      "wrist",
      "neck"
    ],
    "icon": "⬆️",
    "mechanic": "Compound",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "BB Upright Row"
    ],
    "category": "strength"
  },
  {
    "id": "kettlebell-overhead-press",
    "name": "Kettlebell Overhead Press",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Triceps",
      "Core/Abs"
    ],
    "equipment": [
      "kettlebell"
    ],
    "difficulty": "Intermediate",
    "cue": "Press the kettlebell overhead while keeping your wrist stacked.",
    "description": "Maintain a strong shoulder position throughout the press. Avoid leaning away from the weight.",
    "avoidIf": [
      "shoulder",
      "neck"
    ],
    "icon": "🔔",
    "mechanic": "Compound",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "KB Press"
    ],
    "category": "strength"
  },
  {
    "id": "kettlebell-push-press",
    "name": "Kettlebell Push Press",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Triceps",
      "Full Body/Cardio"
    ],
    "equipment": [
      "kettlebell"
    ],
    "difficulty": "Intermediate",
    "cue": "Use leg drive to help launch the kettlebell overhead.",
    "description": "Keep the movement powerful and controlled. Avoid losing wrist alignment.",
    "avoidIf": [
      "shoulder",
      "neck"
    ],
    "icon": "⚡",
    "mechanic": "Compound",
    "pattern": "Vertical Push",
    "force": "Explosive",
    "unilateral": true,
    "focus": [
      "power",
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "KB Push Press"
    ],
    "category": "strength"
  },
  {
    "id": "single-arm-kettlebell-press",
    "name": "Single-Arm Kettlebell Press",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Triceps",
      "Core/Abs"
    ],
    "equipment": [
      "kettlebell"
    ],
    "difficulty": "Intermediate",
    "cue": "Press one kettlebell overhead while maintaining a stacked posture.",
    "description": "Brace your core and control the descent. Avoid side bending during the press.",
    "avoidIf": [
      "shoulder",
      "neck"
    ],
    "icon": "🔔",
    "mechanic": "Compound",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "One Arm KB Press"
    ],
    "category": "strength"
  },
  {
    "id": "kettlebell-bottoms-up-press",
    "name": "Kettlebell Bottoms-Up Press",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Core/Abs"
    ],
    "equipment": [
      "kettlebell"
    ],
    "difficulty": "Advanced",
    "cue": "Balance the inverted kettlebell while pressing slowly overhead.",
    "description": "Use light weight and maintain wrist control. Avoid attempting heavy loads before mastering stability.",
    "avoidIf": [
      "shoulder",
      "wrist",
      "neck"
    ],
    "icon": "🔔",
    "mechanic": "Compound",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "strength",
      "mobility"
    ],
    "homeFriendly": true,
    "aliases": [
      "Bottoms Up KB Press"
    ],
    "category": "strength"
  },
  {
    "id": "kettlebell-halo",
    "name": "Kettlebell Halo",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Core/Abs"
    ],
    "equipment": [
      "kettlebell"
    ],
    "difficulty": "Beginner",
    "cue": "Circle the kettlebell around your head with controlled movement.",
    "description": "Move smoothly while keeping your ribs down. Avoid forcing uncomfortable shoulder positions.",
    "avoidIf": [
      "shoulder",
      "neck"
    ],
    "icon": "⭕",
    "mechanic": "Isolation",
    "pattern": "Rotation",
    "force": "Static",
    "unilateral": false,
    "focus": [
      "mobility"
    ],
    "homeFriendly": true,
    "aliases": [
      "KB Halo"
    ],
    "category": "mobility"
  },
  {
    "id": "kettlebell-high-pull",
    "name": "Kettlebell High Pull",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Back",
      "Core/Abs"
    ],
    "equipment": [
      "kettlebell"
    ],
    "difficulty": "Intermediate",
    "cue": "Drive the kettlebell upward while leading with your elbow.",
    "description": "Generate power from the hips before pulling. Avoid yanking through the shoulder joint.",
    "avoidIf": [
      "shoulder",
      "wrist",
      "neck"
    ],
    "icon": "⚡",
    "mechanic": "Compound",
    "pattern": "Vertical Pull",
    "force": "Explosive",
    "unilateral": false,
    "focus": [
      "power"
    ],
    "homeFriendly": true,
    "aliases": [
      "KB High Pull"
    ],
    "category": "strength"
  },
  {
    "id": "kettlebell-z-press",
    "name": "Kettlebell Z Press",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Core/Abs",
      "Triceps"
    ],
    "equipment": [
      "kettlebell"
    ],
    "difficulty": "Advanced",
    "cue": "Press kettlebells overhead while seated with legs extended.",
    "description": "Maintain a tall posture and strict pressing mechanics. Avoid leaning backward.",
    "avoidIf": [
      "shoulder",
      "neck"
    ],
    "icon": "🪑",
    "mechanic": "Compound",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "mobility"
    ],
    "homeFriendly": true,
    "aliases": [
      "KB Seated Press"
    ],
    "category": "strength"
  },
  {
    "id": "cable-lateral-raise",
    "name": "Cable Lateral Raise",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [],
    "equipment": [
      "cable"
    ],
    "difficulty": "Beginner",
    "cue": "Raise the cable handle out to your side with controlled tension.",
    "description": "Keep constant tension on the lateral deltoid throughout the movement. Avoid swinging the handle upward.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "↔️",
    "mechanic": "Isolation",
    "pattern": "Vertical Push",
    "force": "Static",
    "unilateral": true,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Single Arm Cable Lateral Raise"
    ],
    "category": "strength"
  },
  {
    "id": "cable-front-raise",
    "name": "Cable Front Raise",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Chest"
    ],
    "equipment": [
      "cable"
    ],
    "difficulty": "Beginner",
    "cue": "Raise the cable handle forward until your arm reaches shoulder height.",
    "description": "Maintain a stable torso throughout each repetition. Avoid leaning back to move heavier weight.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "⬆️",
    "mechanic": "Isolation",
    "pattern": "Vertical Push",
    "force": "Static",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Cable Front Delt Raise"
    ],
    "category": "strength"
  },
  {
    "id": "cable-rear-delt-fly",
    "name": "Cable Rear-Delt Fly",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Back"
    ],
    "equipment": [
      "cable"
    ],
    "difficulty": "Beginner",
    "cue": "Open your arms outward using your rear shoulders.",
    "description": "Control the cable path and squeeze your rear delts. Avoid rotating your torso to move the weight.",
    "avoidIf": [],
    "icon": "🪽",
    "mechanic": "Isolation",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": true,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Cable Reverse Fly"
    ],
    "category": "strength"
  },
  {
    "id": "cable-upright-row",
    "name": "Cable Upright Row",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Biceps"
    ],
    "equipment": [
      "cable"
    ],
    "difficulty": "Intermediate",
    "cue": "Pull the cable upward while keeping your elbows higher than your hands.",
    "description": "Use a comfortable range and controlled tempo. Avoid forcing the shoulders into painful positions.",
    "avoidIf": [
      "shoulder",
      "wrist",
      "neck"
    ],
    "icon": "⬆️",
    "mechanic": "Compound",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Cable High Pull"
    ],
    "category": "strength"
  },
  {
    "id": "cable-y-raise",
    "name": "Cable Y-Raise",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Back"
    ],
    "equipment": [
      "cable"
    ],
    "difficulty": "Intermediate",
    "cue": "Raise your arms into a Y pattern while maintaining shoulder control.",
    "description": "Move smoothly through the shoulder blades and upper back. Avoid shrugging toward your ears.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🙆",
    "mechanic": "Isolation",
    "pattern": "Vertical Push",
    "force": "Static",
    "unilateral": false,
    "focus": [
      "mobility",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Cable Y Raise"
    ],
    "category": "strength"
  },
  {
    "id": "machine-shoulder-press",
    "name": "Machine Shoulder Press",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Triceps"
    ],
    "equipment": [
      "machine"
    ],
    "difficulty": "Beginner",
    "cue": "Press the machine handles overhead with controlled movement.",
    "description": "Keep your back supported and press through the shoulders. Avoid locking out aggressively.",
    "avoidIf": [
      "shoulder",
      "neck"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Shoulder Press Machine"
    ],
    "category": "strength"
  },
  {
    "id": "machine-lateral-raise",
    "name": "Machine Lateral Raise",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [],
    "equipment": [
      "machine"
    ],
    "difficulty": "Beginner",
    "cue": "Raise the machine pads outward using your side delts.",
    "description": "Maintain slow controlled repetitions. Avoid bouncing the weight stack.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "↔️",
    "mechanic": "Isolation",
    "pattern": "Vertical Push",
    "force": "Static",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Lateral Raise Machine"
    ],
    "category": "strength"
  },
  {
    "id": "reverse-pec-deck",
    "name": "Reverse Pec Deck",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Back"
    ],
    "equipment": [
      "machine"
    ],
    "difficulty": "Beginner",
    "cue": "Pull the machine arms backward using your rear delts.",
    "description": "Keep your chest against the pad and control the return. Avoid shrugging through the movement.",
    "avoidIf": [],
    "icon": "🪽",
    "mechanic": "Isolation",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Rear Delt Machine Fly"
    ],
    "category": "strength"
  },
  {
    "id": "band-overhead-press",
    "name": "Resistance Band Overhead Press",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Triceps"
    ],
    "equipment": [
      "resistance-band"
    ],
    "difficulty": "Beginner",
    "cue": "Press the band overhead while keeping your core braced.",
    "description": "Maintain steady tension through the press. Avoid leaning backward to compensate for resistance.",
    "avoidIf": [
      "shoulder",
      "neck"
    ],
    "icon": "🟢",
    "mechanic": "Compound",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Band Shoulder Press"
    ],
    "category": "strength"
  },
  {
    "id": "band-lateral-raise",
    "name": "Resistance Band Lateral Raise",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [],
    "equipment": [
      "resistance-band"
    ],
    "difficulty": "Beginner",
    "cue": "Raise the band handles outward using your side delts.",
    "description": "Keep constant tension throughout the movement. Avoid using momentum from your torso.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🟢",
    "mechanic": "Isolation",
    "pattern": "Vertical Push",
    "force": "Static",
    "unilateral": false,
    "focus": [
      "hypertrophy",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Band Side Raise"
    ],
    "category": "strength"
  },
  {
    "id": "band-front-raise",
    "name": "Resistance Band Front Raise",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Chest"
    ],
    "equipment": [
      "resistance-band"
    ],
    "difficulty": "Beginner",
    "cue": "Raise the band handles forward under control.",
    "description": "Keep your body still while lifting. Avoid swinging the band upward.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🟢",
    "mechanic": "Isolation",
    "pattern": "Vertical Push",
    "force": "Static",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Band Front Delt Raise"
    ],
    "category": "strength"
  },
  {
    "id": "band-rear-delt-fly",
    "name": "Resistance Band Rear-Delt Fly",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Back"
    ],
    "equipment": [
      "resistance-band"
    ],
    "difficulty": "Beginner",
    "cue": "Pull the band apart while squeezing your rear shoulders.",
    "description": "Control the return and maintain posture. Avoid shrugging the shoulders upward.",
    "avoidIf": [],
    "icon": "🪽",
    "mechanic": "Isolation",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Band Reverse Fly"
    ],
    "category": "strength"
  },
  {
    "id": "band-upright-row",
    "name": "Resistance Band Upright Row",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Biceps"
    ],
    "equipment": [
      "resistance-band"
    ],
    "difficulty": "Intermediate",
    "cue": "Pull the band upward while keeping your elbows elevated.",
    "description": "Use controlled resistance and avoid excessive shoulder rotation. Avoid pulling into painful ranges.",
    "avoidIf": [
      "shoulder",
      "wrist",
      "neck"
    ],
    "icon": "🟢",
    "mechanic": "Compound",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Band High Pull"
    ],
    "category": "strength"
  },
  {
    "id": "trx-y-raise",
    "name": "TRX Y-Raise",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Back"
    ],
    "equipment": [
      "trx"
    ],
    "difficulty": "Intermediate",
    "cue": "Raise your arms into a Y shape while leaning into the straps.",
    "description": "Control your body angle and shoulder position. Avoid shrugging as you raise.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "〰️",
    "mechanic": "Isolation",
    "pattern": "Vertical Push",
    "force": "Static",
    "unilateral": false,
    "focus": [
      "mobility",
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Suspension Y Raise"
    ],
    "category": "strength"
  },
  {
    "id": "trx-rear-delt-fly",
    "name": "TRX Rear-Delt Fly",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Back"
    ],
    "equipment": [
      "trx"
    ],
    "difficulty": "Intermediate",
    "cue": "Open your arms outward while controlling your body angle.",
    "description": "Use slow repetitions to isolate the rear delts. Avoid letting your hips drop.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "〰️",
    "mechanic": "Isolation",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Suspension Rear Fly"
    ],
    "category": "strength"
  },
  {
    "id": "medicine-ball-overhead-press",
    "name": "Medicine Ball Overhead Press",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Triceps",
      "Core/Abs"
    ],
    "equipment": [
      "medicine-ball"
    ],
    "difficulty": "Beginner",
    "cue": "Press the medicine ball overhead while maintaining posture.",
    "description": "Keep your core engaged and control the descent. Avoid arching your lower back.",
    "avoidIf": [
      "shoulder",
      "neck"
    ],
    "icon": "⚽",
    "mechanic": "Compound",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Med Ball Press"
    ],
    "category": "strength"
  },
  {
    "id": "medicine-ball-push-press",
    "name": "Medicine Ball Push Press",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Triceps",
      "Full Body/Cardio"
    ],
    "equipment": [
      "medicine-ball"
    ],
    "difficulty": "Intermediate",
    "cue": "Use leg drive to launch the medicine ball overhead.",
    "description": "Generate power while maintaining control. Avoid losing alignment during the press.",
    "avoidIf": [
      "shoulder",
      "neck"
    ],
    "icon": "⚡",
    "mechanic": "Compound",
    "pattern": "Vertical Push",
    "force": "Explosive",
    "unilateral": false,
    "focus": [
      "power",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Med Ball Push Press"
    ],
    "category": "conditioning"
  },
  {
    "id": "underhand-towel-curl",
    "name": "Underhand Towel Curl",
    "muscleGroup": "Biceps",
    "secondaryMuscles": [],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Curl the towel up while pulling down on it with your other hand.",
    "description": "Loop a towel under one hand (palm up) and hold the other end with your free hand. Curl the working arm up while your top hand pulls down to create resistance, then lower slowly while still resisting. You control how hard it is by how much you pull.",
    "avoidIf": [],
    "icon": "🧺",
    "mechanic": "Isolation",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Self Resistance Towel Curl"
    ],
    "category": "strength"
  },
  {
    "id": "self-resisted-biceps-curl",
    "name": "Self-Resisted Biceps Curl",
    "muscleGroup": "Biceps",
    "secondaryMuscles": [],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Push down with your free hand as you curl the other arm up.",
    "description": "Place your free hand on top of your working forearm. Curl that arm up while your free hand presses down to resist, then lower slowly while still pushing. No equipment needed — the harder you press, the harder the curl.",
    "avoidIf": [],
    "icon": "💪",
    "mechanic": "Isolation",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": true,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Bodyweight Biceps Curl"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-biceps-curl",
    "name": "Dumbbell Biceps Curl",
    "muscleGroup": "Biceps",
    "secondaryMuscles": [],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Beginner",
    "cue": "Curl the dumbbells up by bending your elbows, keeping them at your sides.",
    "description": "Stand tall holding a dumbbell in each hand, palms facing forward. Bend your elbows to curl the weights up toward your shoulders, squeeze, then lower slowly. Keep your elbows pinned at your sides and don't swing your body to lift.",
    "avoidIf": [],
    "icon": "💪",
    "mechanic": "Isolation",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Curl",
      "Dumbbell Curl"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-hammer-curl",
    "name": "Dumbbell Hammer Curl",
    "muscleGroup": "Biceps",
    "secondaryMuscles": [],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Beginner",
    "cue": "Curl with palms facing each other, like holding two hammers.",
    "description": "Stand holding dumbbells with your palms facing your body (thumbs up). Curl the weights up keeping that grip the whole way, then lower slowly. The neutral grip builds the forearm and the outer part of the biceps for thicker-looking arms.",
    "avoidIf": [],
    "icon": "🔨",
    "mechanic": "Isolation",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Hammer Curl"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-concentration-curl",
    "name": "Dumbbell Concentration Curl",
    "muscleGroup": "Biceps",
    "secondaryMuscles": [],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Beginner",
    "cue": "Elbow braced on your inner thigh, curl one dumbbell up.",
    "description": "Sit down, lean forward, and rest the back of your working upper arm against your inner thigh, dumbbell hanging down. Curl it up toward your shoulder, squeeze hard at the top, then lower slowly. Bracing the elbow removes all momentum so the biceps does everything.",
    "avoidIf": [],
    "icon": "💪",
    "mechanic": "Isolation",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": true,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Concentration DB Curl"
    ],
    "category": "strength"
  },
  {
    "id": "incline-dumbbell-curl",
    "name": "Incline Dumbbell Curl",
    "muscleGroup": "Biceps",
    "secondaryMuscles": [],
    "equipment": [
      "dumbbell",
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Lie back on the incline and let your arms hang, then curl.",
    "description": "Sit back on an incline bench with a dumbbell in each hand, arms hanging straight down behind your body. Curl the weights up, then lower slowly back to the stretch. Starting with your arms behind you gives the biceps a bigger stretch and range.",
    "avoidIf": [],
    "icon": "🏋️",
    "mechanic": "Isolation",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Incline DB Curl"
    ],
    "category": "strength"
  },
  {
    "id": "spider-dumbbell-curl",
    "name": "Spider Dumbbell Curl",
    "muscleGroup": "Biceps",
    "secondaryMuscles": [],
    "equipment": [
      "dumbbell",
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Lie face-down on an incline bench and curl with arms hanging straight down.",
    "description": "Lie chest-down on an incline bench so your arms hang straight toward the floor holding dumbbells. Curl them up to the top, squeeze, then lower slowly. The face-down angle keeps constant tension and stops you swinging.",
    "avoidIf": [],
    "icon": "🕷️",
    "mechanic": "Isolation",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Spider Curl"
    ],
    "category": "strength"
  },
  {
    "id": "zottman-dumbbell-curl",
    "name": "Zottman Dumbbell Curl",
    "muscleGroup": "Biceps",
    "secondaryMuscles": [],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Curl up palms-up, rotate at the top, lower palms-down.",
    "description": "Curl the dumbbells up with your palms facing up. At the top, rotate your wrists so your palms face down, then lower slowly in that reversed grip. You get a biceps curl on the way up and a forearm-builder on the way down.",
    "avoidIf": [],
    "icon": "🔄",
    "mechanic": "Isolation",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Zottman Curl"
    ],
    "category": "strength"
  },
  {
    "id": "cross-body-hammer-curl",
    "name": "Cross-Body Hammer Curl",
    "muscleGroup": "Biceps",
    "secondaryMuscles": [],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Beginner",
    "cue": "Curl the dumbbell across your body toward the opposite shoulder.",
    "description": "Hold dumbbells with palms facing your body. Curl one across your torso toward the opposite shoulder, then lower and repeat with the other arm. The angled path targets the outer biceps and the brachialis underneath.",
    "avoidIf": [],
    "icon": "💪",
    "mechanic": "Isolation",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": true,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Cross Body DB Hammer Curl"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-drag-curl",
    "name": "Dumbbell Drag Curl",
    "muscleGroup": "Biceps",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Drag the dumbbells straight up your body, elbows going back.",
    "description": "Hold dumbbells at your sides and curl them up while dragging them close to your torso, letting your elbows travel backward instead of staying pinned. Lower the same way. Keeping the weights against your body shifts the work onto the biceps peak.",
    "avoidIf": [],
    "icon": "⬆️",
    "mechanic": "Isolation",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Drag Curl"
    ],
    "category": "strength"
  },
  {
    "id": "reverse-dumbbell-curl",
    "name": "Reverse Dumbbell Curl",
    "muscleGroup": "Biceps",
    "secondaryMuscles": [],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Curl with palms facing down the whole time.",
    "description": "Stand holding dumbbells with your palms facing down (knuckles up). Curl them up keeping that grip, then lower slowly. The overhand grip shifts most of the work to your forearms and the muscle beneath the biceps — expect to use lighter weight.",
    "avoidIf": [
      "wrist"
    ],
    "icon": "🔄",
    "mechanic": "Isolation",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Reverse Curl"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-waiter-curl",
    "name": "Dumbbell Waiter Curl",
    "muscleGroup": "Biceps",
    "secondaryMuscles": [],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Cup one dumbbell in both hands like a tray and curl it up.",
    "description": "Hold one dumbbell vertically, cupping the top end in both palms like carrying a tray. Curl it up toward your chin, squeeze, then lower slowly. The grip forces your biceps to work without help from the forearms.",
    "avoidIf": [],
    "icon": "🍽️",
    "mechanic": "Isolation",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Waiter Curl"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-twenty-one-curl",
    "name": "Dumbbell 21s",
    "muscleGroup": "Biceps",
    "secondaryMuscles": [],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Seven bottom-half reps, seven top-half, seven full reps.",
    "description": "Do seven curls through only the bottom half of the range, then seven through only the top half, then seven full reps — 21 in total without resting. It floods the biceps with tension. Use a lighter weight than usual; the burn is the point.",
    "avoidIf": [],
    "icon": "2️⃣1️⃣",
    "mechanic": "Isolation",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB 21s"
    ],
    "category": "strength"
  },
  {
    "id": "seated-alternating-dumbbell-curl",
    "name": "Seated Alternating Dumbbell Curl",
    "muscleGroup": "Biceps",
    "secondaryMuscles": [],
    "equipment": [
      "dumbbell",
      "bench"
    ],
    "difficulty": "Beginner",
    "cue": "Sitting tall, curl one arm at a time.",
    "description": "Sit on the end of a bench with a dumbbell in each hand, arms hanging down. Curl one arm up, lower it, then curl the other. Sitting stops you swinging your body, so each rep is strict and controlled.",
    "avoidIf": [],
    "icon": "💪",
    "mechanic": "Isolation",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": true,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Alternating DB Curl"
    ],
    "category": "strength"
  },
  {
    "id": "incline-hammer-dumbbell-curl",
    "name": "Incline Hammer Dumbbell Curl",
    "muscleGroup": "Biceps",
    "secondaryMuscles": [],
    "equipment": [
      "dumbbell",
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Lie back on the incline and hammer-curl with palms facing in.",
    "description": "Sit back on an incline bench with dumbbells hanging down, palms facing each other. Curl them up keeping that neutral grip, then lower slowly to the stretch. Combines the incline stretch with the forearm emphasis of a hammer curl.",
    "avoidIf": [],
    "icon": "🔨",
    "mechanic": "Isolation",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Incline Hammer Curl"
    ],
    "category": "strength"
  },
  {
    "id": "prone-dumbbell-curl",
    "name": "Prone Dumbbell Curl",
    "muscleGroup": "Biceps",
    "secondaryMuscles": [],
    "equipment": [
      "dumbbell",
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Lie face-down on a flat bench and curl the dumbbells up.",
    "description": "Lie face-down on a flat bench raised enough for your arms to hang, holding dumbbells straight down. Curl them up, squeeze, then lower slowly. Lying face-down completely blocks any cheating with your legs or back.",
    "avoidIf": [],
    "icon": "🏋️",
    "mechanic": "Isolation",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Chest Supported DB Curl"
    ],
    "category": "strength"
  },
  {
    "id": "ez-bar-biceps-curl",
    "name": "EZ-Bar Biceps Curl",
    "muscleGroup": "Biceps",
    "secondaryMuscles": [],
    "equipment": [
      "ez-bar"
    ],
    "difficulty": "Beginner",
    "cue": "Curl the EZ-bar up, elbows at your sides.",
    "description": "Hold an EZ-bar with palms up on the angled sections, arms straight. Curl it up toward your shoulders keeping your elbows pinned, squeeze, then lower slowly. The angled bar is much kinder to your wrists than a straight bar.",
    "avoidIf": [],
    "icon": "💪",
    "mechanic": "Isolation",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "EZ Curl"
    ],
    "category": "strength"
  },
  {
    "id": "ez-bar-preacher-curl",
    "name": "EZ-Bar Preacher Curl",
    "muscleGroup": "Biceps",
    "secondaryMuscles": [],
    "equipment": [
      "ez-bar",
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Rest your arms on the preacher pad and curl the bar up.",
    "description": "Sit at a preacher bench with the backs of your upper arms flat on the angled pad, holding an EZ-bar. Curl it up, then lower slowly until your arms are almost straight. The pad locks your elbows in place so the biceps can't hide behind momentum.",
    "avoidIf": [],
    "icon": "🏋️",
    "mechanic": "Isolation",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "EZ Preacher Curl"
    ],
    "category": "strength"
  },
  {
    "id": "ez-bar-reverse-curl",
    "name": "EZ-Bar Reverse Curl",
    "muscleGroup": "Biceps",
    "secondaryMuscles": [],
    "equipment": [
      "ez-bar"
    ],
    "difficulty": "Intermediate",
    "cue": "Grip the EZ-bar palms-down and curl.",
    "description": "Hold an EZ-bar with an overhand (palms-down) grip, arms straight. Curl it up keeping that grip, then lower slowly. Targets the forearms and the brachialis — go lighter than your normal curl weight.",
    "avoidIf": [
      "wrist"
    ],
    "icon": "🔄",
    "mechanic": "Isolation",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": false,
    "aliases": [
      "EZ Reverse Curl"
    ],
    "category": "strength"
  },
  {
    "id": "ez-bar-drag-curl",
    "name": "EZ-Bar Drag Curl",
    "muscleGroup": "Biceps",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "ez-bar"
    ],
    "difficulty": "Intermediate",
    "cue": "Drag the EZ-bar up your torso, elbows drifting back.",
    "description": "Hold an EZ-bar at your thighs and curl it up while keeping it dragging against your body, letting your elbows travel backward. Lower the same way. The dragging path bunches up the biceps peak at the top.",
    "avoidIf": [],
    "icon": "⬆️",
    "mechanic": "Isolation",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "EZ Drag Curl"
    ],
    "category": "strength"
  },
  {
    "id": "barbell-biceps-curl",
    "name": "Barbell Biceps Curl",
    "muscleGroup": "Biceps",
    "secondaryMuscles": [],
    "equipment": [
      "barbell"
    ],
    "difficulty": "Beginner",
    "cue": "Curl the barbell up in one line, elbows at your sides.",
    "description": "Stand holding a barbell with a shoulder-width underhand grip, arms straight. Curl it up toward your shoulders, squeeze, then lower slowly. Keep your elbows pinned and resist the urge to swing your hips to heave it up.",
    "avoidIf": [],
    "icon": "🏋️",
    "mechanic": "Isolation",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "BB Curl"
    ],
    "category": "strength"
  },
  {
    "id": "wide-grip-barbell-curl",
    "name": "Wide-Grip Barbell Curl",
    "muscleGroup": "Biceps",
    "secondaryMuscles": [],
    "equipment": [
      "barbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Grip the bar wider than shoulders and curl.",
    "description": "Hold a barbell with a grip wider than shoulder width, palms up. Curl it up keeping your elbows at your sides, then lower slowly. The wide grip emphasizes the inner (short) head of the biceps.",
    "avoidIf": [],
    "icon": "💪",
    "mechanic": "Isolation",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Wide BB Curl"
    ],
    "category": "strength"
  },
  {
    "id": "close-grip-barbell-curl",
    "name": "Close-Grip Barbell Curl",
    "muscleGroup": "Biceps",
    "secondaryMuscles": [],
    "equipment": [
      "barbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Grip the bar narrow, hands close together, and curl.",
    "description": "Hold a barbell with your hands close together, palms up. Curl it up with elbows tucked, then lower slowly. The narrow grip shifts the emphasis to the outer (long) head of the biceps for a taller peak.",
    "avoidIf": [
      "wrist"
    ],
    "icon": "💪",
    "mechanic": "Isolation",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Narrow BB Curl"
    ],
    "category": "strength"
  },
  {
    "id": "barbell-twenty-one-curl",
    "name": "Barbell 21s",
    "muscleGroup": "Biceps",
    "secondaryMuscles": [],
    "equipment": [
      "barbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Seven bottom-half, seven top-half, seven full reps with the bar.",
    "description": "Do seven curls through the bottom half of the range, seven through the top half, then seven full reps — 21 straight with no rest. It's a brutal pump finisher. Load the bar lighter than usual.",
    "avoidIf": [],
    "icon": "2️⃣1️⃣",
    "mechanic": "Isolation",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy",
      "endurance"
    ],
    "homeFriendly": false,
    "aliases": [
      "BB 21s"
    ],
    "category": "strength"
  },
  {
    "id": "cable-biceps-curl",
    "name": "Cable Biceps Curl",
    "muscleGroup": "Biceps",
    "secondaryMuscles": [],
    "equipment": [
      "cable"
    ],
    "difficulty": "Beginner",
    "cue": "Curl the low cable handle up, elbows fixed at your sides.",
    "description": "Stand facing a cable machine with a bar or handle on the low pulley, arms straight. Curl it up toward your shoulders, then lower slowly. The cable keeps steady tension on the biceps through the entire rep, even at the bottom.",
    "avoidIf": [],
    "icon": "🔗",
    "mechanic": "Isolation",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Cable Curl"
    ],
    "category": "strength"
  },
  {
    "id": "rope-hammer-cable-curl",
    "name": "Rope Hammer Cable Curl",
    "muscleGroup": "Biceps",
    "secondaryMuscles": [],
    "equipment": [
      "cable"
    ],
    "difficulty": "Beginner",
    "cue": "Curl the rope up with palms facing each other.",
    "description": "Attach a rope to a low cable and hold both ends with palms facing in. Curl up keeping that neutral grip, then lower slowly. Combines constant cable tension with the forearm-building hammer grip.",
    "avoidIf": [],
    "icon": "🔗",
    "mechanic": "Isolation",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Rope Cable Hammer Curl"
    ],
    "category": "strength"
  },
  {
    "id": "high-cable-double-biceps-curl",
    "name": "High Cable Double-Biceps Curl",
    "muscleGroup": "Biceps",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "cable"
    ],
    "difficulty": "Intermediate",
    "cue": "Two high cables, curl both handles toward your ears — a front-double-biceps pose.",
    "description": "Stand between two high pulleys and hold a handle in each hand, arms out wide. Curl both hands in toward your ears like a front-double-biceps pose, squeeze hard, then return slowly. The peak-contraction squeeze is what makes this one great.",
    "avoidIf": [],
    "icon": "💪",
    "mechanic": "Isolation",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "High Cable Curl"
    ],
    "category": "strength"
  },
  {
    "id": "single-arm-cable-biceps-curl",
    "name": "Single-Arm Cable Biceps Curl",
    "muscleGroup": "Biceps",
    "secondaryMuscles": [],
    "equipment": [
      "cable"
    ],
    "difficulty": "Beginner",
    "cue": "One low handle, curl with your elbow pinned.",
    "description": "Stand facing a cable machine holding a single handle in one hand on the low pulley. Curl it up keeping your elbow at your side, squeeze, then lower slowly. Working one arm lets you focus fully and fix a weaker side.",
    "avoidIf": [],
    "icon": "💪",
    "mechanic": "Isolation",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": true,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "One Arm Cable Curl"
    ],
    "category": "strength"
  },
  {
    "id": "cable-preacher-curl",
    "name": "Cable Preacher Curl",
    "muscleGroup": "Biceps",
    "secondaryMuscles": [],
    "equipment": [
      "cable",
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Arms on the pad, curl the low cable up.",
    "description": "Set a preacher bench in front of a low cable, rest the backs of your arms on the pad, and hold the handle. Curl up, then lower slowly to nearly straight. The cable plus the pad means constant tension and zero cheating.",
    "avoidIf": [],
    "icon": "🏋️",
    "mechanic": "Isolation",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Cable Scott Curl"
    ],
    "category": "strength"
  },
  {
    "id": "machine-preacher-biceps-curl",
    "name": "Machine Preacher Biceps Curl",
    "muscleGroup": "Biceps",
    "secondaryMuscles": [],
    "equipment": [
      "machine"
    ],
    "difficulty": "Beginner",
    "cue": "Arms on the pad, curl the handles up.",
    "description": "Sit at the preacher curl machine with your upper arms flat on the pad and grip the handles. Curl up, squeeze, then lower slowly until your arms are nearly straight. The fixed path makes it easy to focus purely on squeezing the biceps.",
    "avoidIf": [],
    "icon": "🏋️",
    "mechanic": "Isolation",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Preacher Curl Machine"
    ],
    "category": "strength"
  },
  {
    "id": "machine-biceps-curl",
    "name": "Machine Biceps Curl",
    "muscleGroup": "Biceps",
    "secondaryMuscles": [],
    "equipment": [
      "machine"
    ],
    "difficulty": "Beginner",
    "cue": "Grip the handles and curl up in a smooth arc.",
    "description": "Sit in the biceps curl machine, adjust the seat so your elbows line up with the pivot, and grip the handles. Curl up, squeeze, then lower slowly. A beginner-friendly way to train the biceps with no balancing required.",
    "avoidIf": [],
    "icon": "🏋️",
    "mechanic": "Isolation",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Biceps Curl Machine"
    ],
    "category": "strength"
  },
  {
    "id": "resistance-band-biceps-curl",
    "name": "Resistance Band Biceps Curl",
    "muscleGroup": "Biceps",
    "secondaryMuscles": [],
    "equipment": [
      "resistance-band"
    ],
    "difficulty": "Beginner",
    "cue": "Stand on the band and curl the handles up.",
    "description": "Stand on the middle of a resistance band and hold an end in each hand, palms up. Curl up against the band's pull, squeeze, then lower slowly. The band gets harder as you curl, peaking right at the top squeeze.",
    "avoidIf": [],
    "icon": "🟢",
    "mechanic": "Isolation",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Band Curl"
    ],
    "category": "strength"
  },
  {
    "id": "resistance-band-hammer-curl",
    "name": "Resistance Band Hammer Curl",
    "muscleGroup": "Biceps",
    "secondaryMuscles": [],
    "equipment": [
      "resistance-band"
    ],
    "difficulty": "Beginner",
    "cue": "Stand on the band and curl with palms facing in.",
    "description": "Stand on a band holding the ends with palms facing each other. Curl up keeping that neutral grip, then lower slowly. Hits the forearms and outer biceps, with the band's tension strongest at the top.",
    "avoidIf": [],
    "icon": "🟢",
    "mechanic": "Isolation",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Band Hammer Curl"
    ],
    "category": "strength"
  },
  {
    "id": "kettlebell-biceps-curl",
    "name": "Kettlebell Biceps Curl",
    "muscleGroup": "Biceps",
    "secondaryMuscles": [],
    "equipment": [
      "kettlebell"
    ],
    "difficulty": "Intermediate",
    "cue": "Curl the kettlebell up; the weight hangs behind your hand.",
    "description": "Hold a kettlebell by the handle, palm up, so the bell hangs on the back of your wrist. Curl it up, squeeze, then lower slowly. The offset weight makes your biceps and grip work a little harder than a dumbbell.",
    "avoidIf": [],
    "icon": "🔔",
    "mechanic": "Isolation",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "KB Curl"
    ],
    "category": "strength"
  },
  {
    "id": "trx-biceps-curl",
    "name": "TRX Biceps Curl",
    "muscleGroup": "Biceps",
    "secondaryMuscles": [
      "Core/Abs"
    ],
    "equipment": [
      "trx"
    ],
    "difficulty": "Intermediate",
    "cue": "Lean back on the straps and curl your body up to your hands.",
    "description": "Hold the TRX handles palms up and lean back with straight arms so your bodyweight loads them. Curl your body up by bending only your elbows, keeping them high and still, then lower slowly. Walk your feet forward to make it harder.",
    "avoidIf": [],
    "icon": "〰️",
    "mechanic": "Isolation",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Suspension Biceps Curl"
    ],
    "category": "strength"
  },
  {
    "id": "bench-dip-triceps",
    "name": "Bench Dip",
    "muscleGroup": "Triceps",
    "secondaryMuscles": [
      "Chest",
      "Shoulders"
    ],
    "equipment": [
      "bench"
    ],
    "difficulty": "Beginner",
    "cue": "Hands on the bench behind you, bend your elbows to dip down, then press back up.",
    "description": "Sit on the edge of a bench, hands gripping the edge beside your hips, and slide your butt off so you're held up by your arms. Bend your elbows straight back to lower your body, then press through your palms to straighten your arms. Keep your elbows pointing back, not flaring out to the sides.",
    "avoidIf": [
      "shoulder",
      "wrist"
    ],
    "icon": "🪑",
    "mechanic": "Compound",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Bench Triceps Dip"
    ],
    "category": "strength"
  },
  {
    "id": "feet-elevated-bench-dip",
    "name": "Feet-Elevated Bench Dip",
    "muscleGroup": "Triceps",
    "secondaryMuscles": [
      "Chest",
      "Shoulders"
    ],
    "equipment": [
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Feet up on a second bench, dip down and press back up.",
    "description": "Set up like a bench dip but rest your heels on a second bench or chair so your legs are straight and level. Bend your elbows to lower your body, then press back up. Raising your feet puts more of your bodyweight on your triceps, making it harder.",
    "avoidIf": [
      "shoulder",
      "wrist"
    ],
    "icon": "🪑",
    "mechanic": "Compound",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Elevated Bench Dip"
    ],
    "category": "strength"
  },
  {
    "id": "bodyweight-triceps-extension",
    "name": "Bodyweight Triceps Extension",
    "muscleGroup": "Triceps",
    "secondaryMuscles": [
      "Shoulders",
      "Core/Abs"
    ],
    "equipment": [
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Lean into the bar and straighten your arms to push yourself back.",
    "description": "Set your hands on a waist-height bar or bench edge and walk your feet back so your body is angled forward like a falling plank. Bend only at the elbows to lower your forehead toward the bar, then straighten your arms to push back up. Keep your body in one straight line the whole time.",
    "avoidIf": [
      "shoulder",
      "wrist"
    ],
    "icon": "💪",
    "mechanic": "Isolation",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Bench Triceps Extension"
    ],
    "category": "strength"
  },
  {
    "id": "bench-supported-skull-crusher",
    "name": "Bench-Supported Skull Crusher",
    "muscleGroup": "Triceps",
    "secondaryMuscles": [],
    "equipment": [
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Lower the weight toward your forehead by bending only your elbows.",
    "description": "Lie back on a bench holding a weight over your chest with straight arms. Keeping your upper arms still and pointing at the ceiling, bend your elbows to lower the weight toward your forehead, then straighten back up. Only your forearms should move — the elbows stay put.",
    "avoidIf": [
      "shoulder",
      "wrist"
    ],
    "icon": "💀",
    "mechanic": "Isolation",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Bodyweight Skull Crusher"
    ],
    "category": "strength"
  },
  {
    "id": "two-hand-overhead-dumbbell-extension",
    "name": "Two-Hand Overhead Dumbbell Extension",
    "muscleGroup": "Triceps",
    "secondaryMuscles": [],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Beginner",
    "cue": "Hold one dumbbell overhead and lower it behind your head.",
    "description": "Stand or sit tall and hold one dumbbell with both hands straight above your head. Keeping your elbows close to your ears, bend them to lower the dumbbell behind your head, then straighten your arms to press it back up. Don't let your elbows flare wide.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🏋️",
    "mechanic": "Isolation",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Overhead Extension"
    ],
    "category": "strength"
  },
  {
    "id": "single-arm-overhead-dumbbell-extension",
    "name": "Single-Arm Overhead Dumbbell Extension",
    "muscleGroup": "Triceps",
    "secondaryMuscles": [
      "Core/Abs"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "One dumbbell overhead, lower it behind your head, then press up.",
    "description": "Hold a dumbbell straight overhead in one hand, elbow pointing forward and close to your head. Bend the elbow to lower the weight behind your head, then straighten your arm to press it up. Brace your core so you don't arch your back.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "💪",
    "mechanic": "Isolation",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Single Arm DB Overhead Extension"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-skull-crusher",
    "name": "Dumbbell Skull Crusher",
    "muscleGroup": "Triceps",
    "secondaryMuscles": [],
    "equipment": [
      "dumbbell",
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Lower two dumbbells toward your forehead, then press back up.",
    "description": "Lie on a bench holding a dumbbell in each hand, arms straight up over your chest with palms facing each other. Bend your elbows to lower the dumbbells beside your head, then straighten to press them back up. Keep your upper arms vertical and still.",
    "avoidIf": [
      "shoulder",
      "wrist"
    ],
    "icon": "💀",
    "mechanic": "Isolation",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Lying Extension"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-triceps-kickback",
    "name": "Dumbbell Triceps Kickback",
    "muscleGroup": "Triceps",
    "secondaryMuscles": [],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Beginner",
    "cue": "Hinge forward and straighten your arm back until it's parallel to the floor.",
    "description": "Hinge forward at the hips with a flat back, upper arm tucked against your side and elbow bent 90 degrees. Straighten your arm behind you until it's fully extended, squeezing the triceps, then return under control. Keep your upper arm still — only the forearm swings.",
    "avoidIf": [],
    "icon": "↩️",
    "mechanic": "Isolation",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Kickback"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-tate-press",
    "name": "Dumbbell Tate Press",
    "muscleGroup": "Triceps",
    "secondaryMuscles": [
      "Chest"
    ],
    "equipment": [
      "dumbbell",
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Lower the dumbbells to your chest with elbows flared out, then press up.",
    "description": "Lie on a bench with a dumbbell in each hand pressed together above your chest, palms facing your feet. Bend your elbows out to the sides to lower the dumbbells toward your chest, then press them back up. It's an unusual angle that hammers the inner triceps.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🏋️",
    "mechanic": "Isolation",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Tate Press"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-jm-press",
    "name": "Dumbbell JM Press",
    "muscleGroup": "Triceps",
    "secondaryMuscles": [
      "Chest"
    ],
    "equipment": [
      "dumbbell",
      "bench"
    ],
    "difficulty": "Advanced",
    "cue": "Lower the dumbbells toward your upper chest, then press up — half press, half skull crusher.",
    "description": "Lie on a bench holding dumbbells over your chest. Lower them toward your upper chest and chin by bending your elbows forward, keeping them tucked, then press back up. It blends a close-grip press with a skull crusher — go light while you learn the groove.",
    "avoidIf": [
      "shoulder",
      "wrist"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB JM Press"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-neutral-grip-triceps-press",
    "name": "Dumbbell Neutral-Grip Triceps Press",
    "muscleGroup": "Triceps",
    "secondaryMuscles": [
      "Chest"
    ],
    "equipment": [
      "dumbbell",
      "bench"
    ],
    "difficulty": "Beginner",
    "cue": "Press two dumbbells straight up with palms facing each other, elbows tucked.",
    "description": "Lie on a bench holding a dumbbell in each hand over your chest, palms facing each other. Lower them to your chest keeping your elbows tucked close to your sides, then press straight back up. The tucked elbows shift the work from chest to triceps.",
    "avoidIf": [],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Neutral Grip DB Press"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-floor-triceps-extension",
    "name": "Dumbbell Floor Triceps Extension",
    "muscleGroup": "Triceps",
    "secondaryMuscles": [],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Beginner",
    "cue": "On the floor, lower the dumbbells beside your head, then press up.",
    "description": "Lie on the floor with a dumbbell in each hand, arms straight over your chest. Bend your elbows to lower the dumbbells toward the floor beside your head, then straighten up. The floor stops you going too deep, protecting your elbows and shoulders.",
    "avoidIf": [
      "wrist"
    ],
    "icon": "💀",
    "mechanic": "Isolation",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Floor DB Extension"
    ],
    "category": "strength"
  },
  {
    "id": "seated-overhead-dumbbell-extension",
    "name": "Seated Overhead Dumbbell Extension",
    "muscleGroup": "Triceps",
    "secondaryMuscles": [
      "Core/Abs"
    ],
    "equipment": [
      "dumbbell",
      "bench"
    ],
    "difficulty": "Beginner",
    "cue": "Sit tall, lower one dumbbell behind your head, then press up.",
    "description": "Sit on a bench with back support, holding one dumbbell overhead with both hands. Bend your elbows to lower it behind your head, then straighten your arms to press it up. Sitting with support keeps your torso stable so you can't cheat with momentum.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🪑",
    "mechanic": "Isolation",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Seated DB Extension"
    ],
    "category": "strength"
  },
  {
    "id": "incline-dumbbell-skull-crusher",
    "name": "Incline Dumbbell Skull Crusher",
    "muscleGroup": "Triceps",
    "secondaryMuscles": [],
    "equipment": [
      "dumbbell",
      "bench"
    ],
    "difficulty": "Advanced",
    "cue": "On an incline bench, lower the dumbbells past your head, then press up.",
    "description": "Lie back on an incline bench holding dumbbells with straight arms over your face. Bend your elbows to lower the weights down past the top of your head, then straighten back up. The incline stretches the triceps harder at the bottom — control the weight.",
    "avoidIf": [
      "shoulder",
      "wrist"
    ],
    "icon": "💀",
    "mechanic": "Isolation",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Incline DB Extension"
    ],
    "category": "strength"
  },
  {
    "id": "cross-body-dumbbell-triceps-extension",
    "name": "Cross-Body Dumbbell Triceps Extension",
    "muscleGroup": "Triceps",
    "secondaryMuscles": [],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Lower the dumbbell across your body toward the opposite shoulder.",
    "description": "Lie on a bench holding a dumbbell over your chest in one hand. Bend your elbow to lower the dumbbell across your body toward the opposite shoulder, then straighten back up. The angled path targets the long head of the triceps.",
    "avoidIf": [],
    "icon": "↘️",
    "mechanic": "Isolation",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Cross Body DB Extension"
    ],
    "category": "strength"
  },
  {
    "id": "ez-bar-skull-crusher",
    "name": "EZ-Bar Skull Crusher",
    "muscleGroup": "Triceps",
    "secondaryMuscles": [],
    "equipment": [
      "ez-bar",
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Lower the EZ-bar to your forehead, then straighten your arms.",
    "description": "Lie on a bench holding an EZ-bar over your chest with a narrow grip on the angled parts. Bend your elbows to lower the bar to your forehead or just behind it, then straighten back up. The angled bar is easier on the wrists than a straight one.",
    "avoidIf": [
      "shoulder",
      "wrist"
    ],
    "icon": "💀",
    "mechanic": "Isolation",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "EZ Skull Crusher",
      "EZ-Bar Lying Triceps Extension"
    ],
    "category": "strength"
  },
  {
    "id": "ez-bar-overhead-triceps-extension",
    "name": "EZ-Bar Overhead Triceps Extension",
    "muscleGroup": "Triceps",
    "secondaryMuscles": [],
    "equipment": [
      "ez-bar"
    ],
    "difficulty": "Intermediate",
    "cue": "Press the EZ-bar overhead, lower it behind your head, then extend.",
    "description": "Hold an EZ-bar overhead with a narrow grip, arms straight. Keeping your elbows close to your head, bend them to lower the bar behind your head, then straighten your arms to press it up. Brace your core so your ribs don't flare.",
    "avoidIf": [
      "shoulder",
      "wrist"
    ],
    "icon": "🏋️",
    "mechanic": "Isolation",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "EZ Overhead Extension"
    ],
    "category": "strength"
  },
  {
    "id": "ez-bar-jm-press",
    "name": "EZ-Bar JM Press",
    "muscleGroup": "Triceps",
    "secondaryMuscles": [
      "Chest"
    ],
    "equipment": [
      "ez-bar",
      "bench"
    ],
    "difficulty": "Advanced",
    "cue": "Lower the bar toward your upper chest with elbows tucked, then press.",
    "description": "Lie on a bench holding an EZ-bar over your chest with a close grip. Lower it toward your upper chest and chin while keeping your elbows tucked forward, then press back up. A hybrid of close-grip press and skull crusher — start light.",
    "avoidIf": [
      "shoulder",
      "wrist"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": false,
    "aliases": [
      "EZ JM Press"
    ],
    "category": "strength"
  },
  {
    "id": "barbell-skull-crusher",
    "name": "Barbell Skull Crusher",
    "muscleGroup": "Triceps",
    "secondaryMuscles": [],
    "equipment": [
      "barbell",
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Lower the barbell to your forehead by bending only your elbows.",
    "description": "Lie on a bench holding a barbell over your chest with a shoulder-width grip, arms straight. Bend your elbows to lower the bar to your forehead, keeping your upper arms vertical, then straighten back up. Lower slowly and under control — it's called a skull crusher for a reason.",
    "avoidIf": [
      "shoulder",
      "wrist"
    ],
    "icon": "💀",
    "mechanic": "Isolation",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "BB Skull Crusher"
    ],
    "category": "strength"
  },
  {
    "id": "reverse-grip-barbell-press",
    "name": "Reverse-Grip Barbell Press",
    "muscleGroup": "Triceps",
    "secondaryMuscles": [
      "Chest"
    ],
    "equipment": [
      "barbell",
      "bench"
    ],
    "difficulty": "Advanced",
    "cue": "Grip the bar underhand and press it from your lower chest, elbows tucked.",
    "description": "Lie on a bench and hold a barbell with an underhand (palms-up) grip at shoulder width. Lower it to your lower chest with elbows tucked close to your body, then press straight up. The reverse grip emphasizes the triceps — use lighter weight and a spotter.",
    "avoidIf": [
      "wrist"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": false,
    "aliases": [
      "Reverse Grip Bench Press"
    ],
    "category": "strength"
  },
  {
    "id": "rope-triceps-pushdown",
    "name": "Rope Triceps Pushdown",
    "muscleGroup": "Triceps",
    "secondaryMuscles": [],
    "equipment": [
      "cable"
    ],
    "difficulty": "Beginner",
    "cue": "Push the rope down and spread the ends apart at the bottom.",
    "description": "Stand facing a cable machine with a rope attached high, elbows tucked at your sides. Push the rope down by straightening your arms, spreading the ends apart at the bottom for an extra squeeze, then return under control. Keep your elbows pinned to your sides.",
    "avoidIf": [],
    "icon": "🪢",
    "mechanic": "Isolation",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Rope Pushdown"
    ],
    "category": "strength"
  },
  {
    "id": "straight-bar-triceps-pushdown",
    "name": "Straight-Bar Triceps Pushdown",
    "muscleGroup": "Triceps",
    "secondaryMuscles": [],
    "equipment": [
      "cable"
    ],
    "difficulty": "Beginner",
    "cue": "Push the bar down until your arms are straight, elbows glued to your sides.",
    "description": "Stand facing a cable machine with a straight bar attached high. Keeping your elbows tucked at your sides, push the bar down until your arms are fully straight, then let it rise back under control. Only your forearms move — don't lean over the bar to force it down.",
    "avoidIf": [
      "wrist"
    ],
    "icon": "🔗",
    "mechanic": "Isolation",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Straight Bar Pushdown"
    ],
    "category": "strength"
  },
  {
    "id": "overhead-cable-triceps-extension",
    "name": "Overhead Cable Triceps Extension",
    "muscleGroup": "Triceps",
    "secondaryMuscles": [],
    "equipment": [
      "cable"
    ],
    "difficulty": "Intermediate",
    "cue": "Face away from the machine and press the handle forward and up.",
    "description": "Set the cable low or high, face away from the machine, and hold the rope or handle behind your head with elbows bent and pointing forward. Straighten your arms to press the handle forward and up, then return slowly. The overhead angle stretches and works the long head of the triceps.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🔗",
    "mechanic": "Isolation",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Cable Overhead Extension"
    ],
    "category": "strength"
  },
  {
    "id": "single-arm-cable-triceps-pushdown",
    "name": "Single-Arm Cable Triceps Pushdown",
    "muscleGroup": "Triceps",
    "secondaryMuscles": [],
    "equipment": [
      "cable"
    ],
    "difficulty": "Beginner",
    "cue": "One hand, push the handle down until your arm is straight.",
    "description": "Stand facing a cable machine holding a single handle in one hand, elbow tucked at your side. Push down until your arm is fully straight, squeeze, then return under control. Working one arm at a time helps fix a weaker side.",
    "avoidIf": [],
    "icon": "💪",
    "mechanic": "Isolation",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "One Arm Cable Pushdown"
    ],
    "category": "strength"
  },
  {
    "id": "cross-body-cable-triceps-extension",
    "name": "Cross-Body Cable Triceps Extension",
    "muscleGroup": "Triceps",
    "secondaryMuscles": [],
    "equipment": [
      "cable"
    ],
    "difficulty": "Intermediate",
    "cue": "Pull the handle down and across your body until your arm is straight.",
    "description": "Stand side-on to a cable machine holding a handle with the far hand. Straighten your arm down and across your body, then return under control. The cross-body angle keeps constant tension on the triceps through the whole range.",
    "avoidIf": [],
    "icon": "↘️",
    "mechanic": "Isolation",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Cross Body Cable Extension"
    ],
    "category": "strength"
  },
  {
    "id": "machine-triceps-extension",
    "name": "Machine Triceps Extension",
    "muscleGroup": "Triceps",
    "secondaryMuscles": [],
    "equipment": [
      "machine"
    ],
    "difficulty": "Beginner",
    "cue": "Set the seat, grip the handles, and push until your arms are straight.",
    "description": "Sit in the triceps machine and adjust the seat so your elbows line up with the pivot. Grip the handles and push down or forward until your arms are straight, then return under control. Machines keep the path fixed, so just focus on a full squeeze and slow return.",
    "avoidIf": [],
    "icon": "🏋️",
    "mechanic": "Isolation",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Triceps Extension Machine"
    ],
    "category": "strength"
  },
  {
    "id": "assisted-dip-machine-triceps",
    "name": "Assisted Dip Machine",
    "muscleGroup": "Triceps",
    "secondaryMuscles": [
      "Chest",
      "Shoulders"
    ],
    "equipment": [
      "machine"
    ],
    "difficulty": "Beginner",
    "cue": "Kneel on the pad and dip with your torso upright to hit the triceps.",
    "description": "Set the assist weight, kneel on the pad, and grip the handles with your body upright. Bend your elbows to lower yourself, then press back up. Staying upright (rather than leaning forward) keeps the focus on your triceps instead of your chest.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": false,
    "aliases": [
      "Machine Assisted Dip"
    ],
    "category": "strength"
  },
  {
    "id": "triceps-dip-machine",
    "name": "Triceps Dip Machine",
    "muscleGroup": "Triceps",
    "secondaryMuscles": [
      "Chest"
    ],
    "equipment": [
      "machine"
    ],
    "difficulty": "Beginner",
    "cue": "Sit tall, press the handles down until your arms are straight.",
    "description": "Sit in the dip machine and grip the handles at your sides. Press down until your arms are fully straight, then return under control. The seated setup lets you overload the triceps safely without balancing your bodyweight.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Dip Machine"
    ],
    "category": "strength"
  },
  {
    "id": "resistance-band-triceps-pushdown",
    "name": "Resistance Band Triceps Pushdown",
    "muscleGroup": "Triceps",
    "secondaryMuscles": [],
    "equipment": [
      "resistance-band"
    ],
    "difficulty": "Beginner",
    "cue": "Anchor the band high and push down until your arms are straight.",
    "description": "Loop a resistance band over a high anchor like a door top and hold the ends with elbows tucked at your sides. Push down until your arms are straight against the band's pull, then return slowly. The band gives the most resistance right where you lock out.",
    "avoidIf": [],
    "icon": "🟢",
    "mechanic": "Isolation",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Band Pushdown"
    ],
    "category": "strength"
  },
  {
    "id": "resistance-band-overhead-triceps-extension",
    "name": "Resistance Band Overhead Triceps Extension",
    "muscleGroup": "Triceps",
    "secondaryMuscles": [],
    "equipment": [
      "resistance-band"
    ],
    "difficulty": "Beginner",
    "cue": "Step on the band, press the ends overhead and behind your head.",
    "description": "Stand on one end of a band and hold the other overhead with elbows bent behind your head. Straighten your arms to press upward against the band, then lower slowly. Keep your elbows pointing forward and close to your head.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🟢",
    "mechanic": "Isolation",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Band Overhead Extension"
    ],
    "category": "strength"
  },
  {
    "id": "resistance-band-triceps-kickback",
    "name": "Resistance Band Triceps Kickback",
    "muscleGroup": "Triceps",
    "secondaryMuscles": [],
    "equipment": [
      "resistance-band"
    ],
    "difficulty": "Beginner",
    "cue": "Hinge forward and extend your arms back against the band.",
    "description": "Stand on a band, hinge forward with a flat back, and hold the ends with elbows bent at your sides. Straighten your arms behind you against the band's pull, squeeze, then return. Keep your upper arms still — only the forearms move.",
    "avoidIf": [],
    "icon": "🟢",
    "mechanic": "Isolation",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "hypertrophy",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Band Kickback"
    ],
    "category": "strength"
  },
  {
    "id": "kettlebell-overhead-triceps-extension",
    "name": "Kettlebell Overhead Triceps Extension",
    "muscleGroup": "Triceps",
    "secondaryMuscles": [],
    "equipment": [
      "kettlebell"
    ],
    "difficulty": "Intermediate",
    "cue": "Hold the kettlebell overhead and lower it behind your head.",
    "description": "Hold a kettlebell by the horns with both hands straight overhead. Bend your elbows to lower it behind your head, keeping your elbows close, then straighten to press it back up. The bell hangs behind your hands, giving a slightly different feel than a dumbbell.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🔔",
    "mechanic": "Isolation",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "KB Overhead Triceps Extension"
    ],
    "category": "strength"
  },
  {
    "id": "trx-triceps-extension",
    "name": "TRX Triceps Extension",
    "muscleGroup": "Triceps",
    "secondaryMuscles": [
      "Core/Abs"
    ],
    "equipment": [
      "trx"
    ],
    "difficulty": "Intermediate",
    "cue": "Lean into the straps and press yourself back by straightening your arms.",
    "description": "Hold the TRX handles at head height and walk your feet forward so you're leaning in, arms bent beside your head. Straighten your arms to press your body back up to standing, then bend to lower under control. Walk your feet back to make it easier, forward to make it harder.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "〰️",
    "mechanic": "Isolation",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Suspension Triceps Extension"
    ],
    "category": "strength"
  },
  {
    "id": "bodyweight-squat",
    "name": "Bodyweight Squat",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Sit your hips down and back while keeping your chest tall.",
    "description": "Descend until comfortable depth before standing tall. Avoid letting your knees collapse inward.",
    "avoidIf": [
      "knee"
    ],
    "icon": "🦵",
    "mechanic": "Compound",
    "pattern": "Squat",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Air Squat"
    ],
    "category": "strength"
  },
  {
    "id": "pause-bodyweight-squat",
    "name": "Pause Squat",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Pause for two seconds at the bottom before standing.",
    "description": "Maintain tension during the pause. Avoid relaxing into the bottom position.",
    "avoidIf": [
      "knee"
    ],
    "icon": "⏸️",
    "mechanic": "Compound",
    "pattern": "Squat",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Paused Air Squat"
    ],
    "category": "strength"
  },
  {
    "id": "tempo-bodyweight-squat",
    "name": "Tempo Squat",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "Lower for three seconds before standing smoothly.",
    "description": "Control every inch of the descent. Avoid dropping quickly into the bottom.",
    "avoidIf": [
      "knee"
    ],
    "icon": "🐢",
    "mechanic": "Compound",
    "pattern": "Squat",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Slow Squat"
    ],
    "category": "strength"
  },
  {
    "id": "pulse-squat",
    "name": "Pulse Squat",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "Stay near the bottom and perform short controlled pulses.",
    "description": "Keep tension throughout the set. Avoid standing fully between repetitions.",
    "avoidIf": [
      "knee"
    ],
    "icon": "〰️",
    "mechanic": "Compound",
    "pattern": "Squat",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "endurance",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Squat Pulses"
    ],
    "category": "strength"
  },
  {
    "id": "bodyweight-split-squat",
    "name": "Split Squat",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Lower straight down while keeping your front foot planted.",
    "description": "Push through your front foot to stand. Avoid letting your front knee cave inward.",
    "avoidIf": [
      "knee",
      "balance"
    ],
    "icon": "🦵",
    "mechanic": "Compound",
    "pattern": "Lunge",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Static Lunge"
    ],
    "category": "strength"
  },
  {
    "id": "walking-lunge",
    "name": "Walking Lunge",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Step forward into each lunge with controlled balance.",
    "description": "Alternate legs as you move forward. Avoid pushing off the rear foot excessively.",
    "avoidIf": [
      "knee",
      "balance"
    ],
    "icon": "🚶",
    "mechanic": "Compound",
    "pattern": "Lunge",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Walking Lunges"
    ],
    "category": "strength"
  },
  {
    "id": "forward-lunge",
    "name": "Forward Lunge",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Step forward and lower under control.",
    "description": "Drive back to the starting position through the front leg. Avoid collapsing the knee inward.",
    "avoidIf": [
      "knee",
      "balance"
    ],
    "icon": "➡️",
    "mechanic": "Compound",
    "pattern": "Lunge",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Front Lunge"
    ],
    "category": "strength"
  },
  {
    "id": "reverse-lunge",
    "name": "Reverse Lunge",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Step backward into the lunge while keeping your torso upright.",
    "description": "Return by driving through the front heel. Avoid wobbling during the step.",
    "avoidIf": [
      "knee",
      "balance"
    ],
    "icon": "⬅️",
    "mechanic": "Compound",
    "pattern": "Lunge",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Rear Lunge"
    ],
    "category": "strength"
  },
  {
    "id": "curtsy-lunge",
    "name": "Curtsy Lunge",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "Step diagonally behind your body before lowering.",
    "description": "Keep your hips facing forward throughout. Avoid twisting your knees.",
    "avoidIf": [
      "knee",
      "balance",
      "hip"
    ],
    "icon": "↙️",
    "mechanic": "Compound",
    "pattern": "Lunge",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Curtsy Squat"
    ],
    "category": "strength"
  },
  {
    "id": "cossack-squat",
    "name": "Cossack Squat",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Advanced",
    "cue": "Shift your weight fully to one side while keeping the other leg straight.",
    "description": "Descend only as deep as your mobility allows. Avoid collapsing through the planted knee.",
    "avoidIf": [
      "knee",
      "balance",
      "hip"
    ],
    "icon": "↔️",
    "mechanic": "Compound",
    "pattern": "Squat",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "mobility",
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Side Squat"
    ],
    "category": "strength"
  },
  {
    "id": "sissy-squat",
    "name": "Sissy Squat",
    "muscleGroup": "Quads",
    "secondaryMuscles": [],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Advanced",
    "cue": "Lean backward while driving your knees forward under control.",
    "description": "Maintain a straight body line throughout. Avoid dropping quickly into the stretch.",
    "avoidIf": [
      "knee",
      "balance"
    ],
    "icon": "🦵",
    "mechanic": "Isolation",
    "pattern": "Squat",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Bodyweight Sissy Squat"
    ],
    "category": "strength"
  },
  {
    "id": "wall-sit",
    "name": "Wall Sit",
    "muscleGroup": "Quads",
    "secondaryMuscles": [],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Press your back into the wall and hold a seated position.",
    "description": "Maintain even pressure through both feet. Avoid letting your hips rise.",
    "avoidIf": [
      "knee"
    ],
    "icon": "🧱",
    "mechanic": "Isolation",
    "pattern": "Squat",
    "force": "Static",
    "unilateral": false,
    "focus": [
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Wall Chair"
    ],
    "category": "strength"
  },
  {
    "id": "wall-sit-march",
    "name": "Wall Sit March",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Core/Abs"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "Alternate lifting one foot while maintaining the wall sit.",
    "description": "Keep your hips level throughout the movement. Avoid rocking side to side.",
    "avoidIf": [
      "knee",
      "balance"
    ],
    "icon": "🚶",
    "mechanic": "Compound",
    "pattern": "Squat",
    "force": "Static",
    "unilateral": true,
    "focus": [
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Marching Wall Sit"
    ],
    "category": "strength"
  },
  {
    "id": "pistol-squat",
    "name": "Pistol Squat",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Advanced",
    "cue": "Keep one leg extended while lowering under full control.",
    "description": "Use your full foot for balance throughout the movement. Avoid collapsing into the knee.",
    "avoidIf": [
      "knee",
      "balance"
    ],
    "icon": "🎯",
    "mechanic": "Compound",
    "pattern": "Squat",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "strength",
      "mobility"
    ],
    "homeFriendly": true,
    "aliases": [
      "Single Leg Squat"
    ],
    "category": "strength"
  },
  {
    "id": "shrimp-squat",
    "name": "Shrimp Squat",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Advanced",
    "cue": "Hold your rear foot while lowering on one leg.",
    "description": "Move slowly through the full range of motion. Avoid twisting your hips.",
    "avoidIf": [
      "knee",
      "balance"
    ],
    "icon": "🦐",
    "mechanic": "Compound",
    "pattern": "Squat",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Shrimp Squat Hold"
    ],
    "category": "strength"
  },
  {
    "id": "skater-squat",
    "name": "Skater Squat",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Advanced",
    "cue": "Lower onto one leg while keeping the rear leg behind you.",
    "description": "Maintain balance throughout the movement. Avoid dropping your rear knee abruptly.",
    "avoidIf": [
      "knee",
      "balance"
    ],
    "icon": "⛸️",
    "mechanic": "Compound",
    "pattern": "Squat",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Single Leg Skater Squat"
    ],
    "category": "strength"
  },
  {
    "id": "box-jump",
    "name": "Box Jump",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes",
      "Full Body/Cardio"
    ],
    "equipment": [
      "box"
    ],
    "difficulty": "Intermediate",
    "cue": "Jump softly onto the box and land with bent knees.",
    "description": "Step down between repetitions when possible. Avoid landing with locked knees.",
    "avoidIf": [
      "knee",
      "high-impact"
    ],
    "icon": "📦",
    "mechanic": "Compound",
    "pattern": "Squat",
    "force": "Explosive",
    "unilateral": false,
    "focus": [
      "power"
    ],
    "homeFriendly": true,
    "aliases": [
      "Plyometric Box Jump"
    ],
    "category": "conditioning"
  },
  {
    "id": "box-step-up",
    "name": "Box Step-Up",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "box"
    ],
    "difficulty": "Beginner",
    "cue": "Drive through the elevated foot without pushing off the trailing leg.",
    "description": "Stand fully before stepping back down. Avoid using momentum.",
    "avoidIf": [
      "knee",
      "balance"
    ],
    "icon": "📦",
    "mechanic": "Compound",
    "pattern": "Lunge",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Step Up"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-goblet-squat",
    "name": "Dumbbell Goblet Squat",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Beginner",
    "cue": "Hold one dumbbell at chest height and squat between your knees.",
    "description": "Keep your torso tall and elbows close to your body. Avoid letting your heels lift off the floor.",
    "avoidIf": [
      "knee"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Squat",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Goblet Squat"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-squat",
    "name": "Dumbbell Squat",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Beginner",
    "cue": "Hold dumbbells at your sides and squat with control.",
    "description": "Drive through your whole foot to stand tall. Avoid collapsing your knees inward.",
    "avoidIf": [
      "knee"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Squat",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Squat"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-front-squat",
    "name": "Dumbbell Front Squat",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes",
      "Core/Abs"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Rack the dumbbells on your shoulders and keep your elbows high.",
    "description": "Maintain an upright torso throughout the lift. Avoid rounding your upper back.",
    "avoidIf": [
      "knee"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Squat",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Front Rack Dumbbell Squat"
    ],
    "category": "strength"
  },
  {
    "id": "heel-elevated-goblet-squat",
    "name": "Heel-Elevated Goblet Squat",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Raise your heels slightly and keep your knees tracking forward.",
    "description": "Stay upright while emphasizing knee flexion. Avoid bouncing from the bottom.",
    "avoidIf": [
      "knee"
    ],
    "icon": "🦵",
    "mechanic": "Compound",
    "pattern": "Squat",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Cyclist Goblet Squat"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-bulgarian-split-squat",
    "name": "Dumbbell Bulgarian Split Squat",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "dumbbell",
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Rest your rear foot on a bench and lower straight down.",
    "description": "Drive through your front foot to stand. Avoid leaning excessively forward.",
    "avoidIf": [
      "knee",
      "balance"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Lunge",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Bulgarian Split Squat"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-split-squat",
    "name": "Dumbbell Split Squat",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Beginner",
    "cue": "Hold dumbbells at your sides while lowering vertically.",
    "description": "Keep your front heel planted throughout the movement. Avoid wobbling side to side.",
    "avoidIf": [
      "knee",
      "balance"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Lunge",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Split Squat"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-walking-lunge",
    "name": "Dumbbell Walking Lunge",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Carry dumbbells while taking controlled forward steps.",
    "description": "Push through the front heel each repetition. Avoid rushing your stride.",
    "avoidIf": [
      "knee",
      "balance"
    ],
    "icon": "🚶",
    "mechanic": "Compound",
    "pattern": "Lunge",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Walking Lunges"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-reverse-lunge",
    "name": "Dumbbell Reverse Lunge",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Beginner",
    "cue": "Step backward while keeping dumbbells stable at your sides.",
    "description": "Drive upward through the front leg. Avoid shifting your weight onto the rear foot.",
    "avoidIf": [
      "knee",
      "balance"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Lunge",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Reverse Lunge"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-forward-lunge",
    "name": "Dumbbell Forward Lunge",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Beginner",
    "cue": "Step forward under control while carrying dumbbells.",
    "description": "Lower until both knees are comfortably bent. Avoid pushing off your rear foot.",
    "avoidIf": [
      "knee",
      "balance"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Lunge",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Front Lunge"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-step-up",
    "name": "Dumbbell Step-Up",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "dumbbell",
      "box"
    ],
    "difficulty": "Intermediate",
    "cue": "Drive through the elevated foot without jumping.",
    "description": "Stand completely before stepping back down. Avoid pushing off the trailing leg.",
    "avoidIf": [
      "knee",
      "balance"
    ],
    "icon": "📦",
    "mechanic": "Compound",
    "pattern": "Lunge",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Box Step-Up"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-curtsy-lunge",
    "name": "Dumbbell Curtsy Lunge",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Cross one leg behind while holding dumbbells at your sides.",
    "description": "Keep your torso upright throughout the movement. Avoid twisting through the knees.",
    "avoidIf": [
      "knee",
      "balance",
      "hip"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Lunge",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Curtsy Lunge"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-cossack-squat",
    "name": "Dumbbell Cossack Squat",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Advanced",
    "cue": "Hold a dumbbell at your chest while shifting side to side.",
    "description": "Descend only as far as mobility allows. Avoid collapsing into the planted knee.",
    "avoidIf": [
      "knee",
      "balance",
      "hip"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Squat",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "strength",
      "mobility"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Side Squat"
    ],
    "category": "strength"
  },
  {
    "id": "kettlebell-goblet-squat",
    "name": "Kettlebell Goblet Squat",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "kettlebell"
    ],
    "difficulty": "Beginner",
    "cue": "Hold the kettlebell at chest height throughout the squat.",
    "description": "Keep your elbows tucked close to your body. Avoid letting your chest collapse.",
    "avoidIf": [
      "knee"
    ],
    "icon": "🔔",
    "mechanic": "Compound",
    "pattern": "Squat",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "KB Goblet Squat"
    ],
    "category": "strength"
  },
  {
    "id": "kettlebell-front-squat",
    "name": "Kettlebell Front Squat",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Core/Abs"
    ],
    "equipment": [
      "kettlebell"
    ],
    "difficulty": "Intermediate",
    "cue": "Rack the kettlebells and maintain high elbows.",
    "description": "Keep your torso upright through the entire lift. Avoid rounding forward.",
    "avoidIf": [
      "knee"
    ],
    "icon": "🔔",
    "mechanic": "Compound",
    "pattern": "Squat",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "KB Front Squat"
    ],
    "category": "strength"
  },
  {
    "id": "kettlebell-lunge",
    "name": "Kettlebell Lunge",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "kettlebell"
    ],
    "difficulty": "Intermediate",
    "cue": "Carry kettlebells while lowering under control.",
    "description": "Maintain a stable torso throughout the movement. Avoid collapsing the front knee.",
    "avoidIf": [
      "knee",
      "balance"
    ],
    "icon": "🔔",
    "mechanic": "Compound",
    "pattern": "Lunge",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "KB Lunge"
    ],
    "category": "strength"
  },
  {
    "id": "kettlebell-step-up",
    "name": "Kettlebell Step-Up",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "kettlebell",
      "box"
    ],
    "difficulty": "Intermediate",
    "cue": "Step onto the box under control while carrying kettlebells.",
    "description": "Drive through the lead leg to stand fully. Avoid pushing off the trailing foot.",
    "avoidIf": [
      "knee",
      "balance"
    ],
    "icon": "🔔",
    "mechanic": "Compound",
    "pattern": "Lunge",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "KB Box Step-Up"
    ],
    "category": "strength"
  },
  {
    "id": "double-kettlebell-front-squat",
    "name": "Double Kettlebell Front Squat",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Core/Abs"
    ],
    "equipment": [
      "kettlebell"
    ],
    "difficulty": "Advanced",
    "cue": "Rack both kettlebells securely before squatting.",
    "description": "Brace your core throughout the lift. Avoid allowing the bells to pull you forward.",
    "avoidIf": [
      "knee"
    ],
    "icon": "🔔",
    "mechanic": "Compound",
    "pattern": "Squat",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Double KB Front Squat"
    ],
    "category": "strength"
  },
  {
    "id": "kettlebell-reverse-lunge",
    "name": "Kettlebell Reverse Lunge",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "kettlebell"
    ],
    "difficulty": "Intermediate",
    "cue": "Step backward while maintaining a tall torso.",
    "description": "Drive upward through the front leg. Avoid shifting weight onto the rear foot.",
    "avoidIf": [
      "knee",
      "balance"
    ],
    "icon": "🔔",
    "mechanic": "Compound",
    "pattern": "Lunge",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "KB Reverse Lunge"
    ],
    "category": "strength"
  },
  {
    "id": "barbell-back-squat",
    "name": "Barbell Back Squat",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes",
      "Core/Abs"
    ],
    "equipment": [
      "barbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Brace your core and squat with the bar across your upper back.",
    "description": "Drive through your feet while maintaining a stable torso. Avoid letting your knees collapse inward.",
    "avoidIf": [
      "knee"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Squat",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Back Squat"
    ],
    "category": "strength"
  },
  {
    "id": "barbell-front-squat",
    "name": "Barbell Front Squat",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes",
      "Core/Abs"
    ],
    "equipment": [
      "barbell"
    ],
    "difficulty": "Advanced",
    "cue": "Keep the bar racked on your shoulders while maintaining an upright torso.",
    "description": "Control the descent and drive upward through your feet. Avoid dropping your elbows.",
    "avoidIf": [
      "knee"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Squat",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Front Squat"
    ],
    "category": "strength"
  },
  {
    "id": "barbell-box-squat",
    "name": "Barbell Box Squat",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "barbell",
      "box"
    ],
    "difficulty": "Intermediate",
    "cue": "Squat back to the box before driving upward.",
    "description": "Use the box as a depth target without relaxing fully. Avoid bouncing off the surface.",
    "avoidIf": [
      "knee"
    ],
    "icon": "📦",
    "mechanic": "Compound",
    "pattern": "Squat",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": false,
    "aliases": [
      "Box Squat"
    ],
    "category": "strength"
  },
  {
    "id": "barbell-pause-squat",
    "name": "Barbell Pause Squat",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes",
      "Core/Abs"
    ],
    "equipment": [
      "barbell"
    ],
    "difficulty": "Advanced",
    "cue": "Pause at the bottom before driving back upward.",
    "description": "Maintain tension during the pause. Avoid losing your brace before the ascent.",
    "avoidIf": [
      "knee"
    ],
    "icon": "⏸️",
    "mechanic": "Compound",
    "pattern": "Squat",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": false,
    "aliases": [
      "Paused Barbell Squat"
    ],
    "category": "strength"
  },
  {
    "id": "zercher-squat",
    "name": "Zercher Squat",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes",
      "Core/Abs"
    ],
    "equipment": [
      "barbell"
    ],
    "difficulty": "Advanced",
    "cue": "Hold the bar in your elbow crease and squat upright.",
    "description": "Brace your torso and control the descent. Avoid letting the bar pull you forward.",
    "avoidIf": [
      "knee"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Squat",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": false,
    "aliases": [
      "Zercher Squat"
    ],
    "category": "strength"
  },
  {
    "id": "barbell-overhead-squat",
    "name": "Barbell Overhead Squat",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Shoulders",
      "Core/Abs"
    ],
    "equipment": [
      "barbell"
    ],
    "difficulty": "Advanced",
    "cue": "Hold the bar overhead while squatting with control.",
    "description": "Maintain shoulder stability and a strong brace. Avoid losing the overhead position.",
    "avoidIf": [
      "knee",
      "shoulder",
      "balance"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Squat",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "mobility"
    ],
    "homeFriendly": false,
    "aliases": [
      "Overhead Squat"
    ],
    "category": "strength"
  },
  {
    "id": "barbell-split-squat",
    "name": "Barbell Split Squat",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "barbell"
    ],
    "difficulty": "Advanced",
    "cue": "Lower vertically while supporting the bar across your shoulders.",
    "description": "Keep your front foot planted throughout. Avoid shifting your hips sideways.",
    "avoidIf": [
      "knee",
      "balance"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Lunge",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "strength"
    ],
    "homeFriendly": false,
    "aliases": [
      "Barbell Static Lunge"
    ],
    "category": "strength"
  },
  {
    "id": "leg-press-machine",
    "name": "Leg Press",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "machine"
    ],
    "difficulty": "Beginner",
    "cue": "Press the platform away while keeping your feet stable.",
    "description": "Lower under control before pressing back up. Avoid locking your knees forcefully.",
    "avoidIf": [
      "knee"
    ],
    "icon": "🦵",
    "mechanic": "Compound",
    "pattern": "Squat",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Machine Leg Press"
    ],
    "category": "strength"
  },
  {
    "id": "hack-squat-machine",
    "name": "Hack Squat Machine",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "machine"
    ],
    "difficulty": "Intermediate",
    "cue": "Lower the sled while keeping your back supported.",
    "description": "Drive through your feet to extend the knees. Avoid lifting your heels.",
    "avoidIf": [
      "knee"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Squat",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Machine Hack Squat"
    ],
    "category": "strength"
  },
  {
    "id": "leg-extension-machine",
    "name": "Leg Extension",
    "muscleGroup": "Quads",
    "secondaryMuscles": [],
    "equipment": [
      "machine"
    ],
    "difficulty": "Beginner",
    "cue": "Extend your knees until your legs are straight.",
    "description": "Use controlled repetitions and avoid swinging the weight. Avoid snapping the knees at lockout.",
    "avoidIf": [
      "knee"
    ],
    "icon": "🦵",
    "mechanic": "Isolation",
    "pattern": "Squat",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Machine Leg Extension"
    ],
    "category": "strength"
  },
  {
    "id": "pendulum-belt-squat",
    "name": "Pendulum Belt Squat",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "machine"
    ],
    "difficulty": "Intermediate",
    "cue": "Squat through a guided machine path while keeping your torso stable.",
    "description": "Control the bottom position before driving upward. Avoid rushing the movement.",
    "avoidIf": [
      "knee"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Squat",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Belt Squat"
    ],
    "category": "strength"
  },
  {
    "id": "smith-machine-squat",
    "name": "Smith Machine Squat",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "machine"
    ],
    "difficulty": "Beginner",
    "cue": "Squat along the guided bar path with your feet positioned comfortably.",
    "description": "Maintain control throughout the movement. Avoid relying entirely on the machine path.",
    "avoidIf": [
      "knee"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Squat",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Smith Squat"
    ],
    "category": "strength"
  },
  {
    "id": "band-squat",
    "name": "Resistance Band Squat",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "resistance-band"
    ],
    "difficulty": "Beginner",
    "cue": "Squat while maintaining tension from the resistance band.",
    "description": "Keep constant tension through the movement. Avoid letting the knees cave inward.",
    "avoidIf": [
      "knee"
    ],
    "icon": "🟢",
    "mechanic": "Compound",
    "pattern": "Squat",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Band Squat"
    ],
    "category": "strength"
  },
  {
    "id": "banded-lunge",
    "name": "Resistance Band Lunge",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "resistance-band"
    ],
    "difficulty": "Intermediate",
    "cue": "Perform a lunge while resisting the band's pull.",
    "description": "Keep your front foot stable throughout. Avoid losing alignment through the knee.",
    "avoidIf": [
      "knee",
      "balance"
    ],
    "icon": "🟢",
    "mechanic": "Compound",
    "pattern": "Lunge",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Band Lunge"
    ],
    "category": "strength"
  },
  {
    "id": "trx-squat",
    "name": "TRX Squat",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "trx"
    ],
    "difficulty": "Beginner",
    "cue": "Use the straps for balance while squatting under control.",
    "description": "Keep your feet planted and chest tall. Avoid pulling yourself upward with the straps.",
    "avoidIf": [
      "knee"
    ],
    "icon": "〰️",
    "mechanic": "Compound",
    "pattern": "Squat",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Suspension Squat"
    ],
    "category": "strength"
  },
  {
    "id": "trx-assisted-pistol-squat",
    "name": "TRX Assisted Pistol Squat",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "trx"
    ],
    "difficulty": "Advanced",
    "cue": "Use the straps for assistance while lowering on one leg.",
    "description": "Control the descent and maintain balance. Avoid relying entirely on the straps.",
    "avoidIf": [
      "knee",
      "balance"
    ],
    "icon": "〰️",
    "mechanic": "Compound",
    "pattern": "Squat",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "strength",
      "mobility"
    ],
    "homeFriendly": true,
    "aliases": [
      "TRX Pistol Squat"
    ],
    "category": "strength"
  },
  {
    "id": "nordic-hamstring-curl",
    "name": "Nordic Hamstring Curl",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "bodyweight",
      "bench"
    ],
    "difficulty": "Advanced",
    "cue": "Kneel anchored and lower your body forward under control.",
    "description": "Use your hamstrings to resist the descent. Avoid dropping quickly without control.",
    "avoidIf": [
      "knee"
    ],
    "icon": "🦵",
    "mechanic": "Isolation",
    "pattern": "Squat",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Nordic Curl",
      "Natural Hamstring Curl"
    ],
    "category": "strength"
  },
  {
    "id": "slider-leg-curl",
    "name": "Slider Leg Curl",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": [
      "Glutes",
      "Core/Abs"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "Slide your heels toward your hips while lifting your hips.",
    "description": "Maintain a strong bridge position throughout. Avoid letting your hips drop.",
    "avoidIf": [
      "knee"
    ],
    "icon": "🦵",
    "mechanic": "Isolation",
    "pattern": "Squat",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Towel Hamstring Curl"
    ],
    "category": "strength"
  },
  {
    "id": "glute-bridge-leg-curl-walkout",
    "name": "Glute Bridge Leg Curl Walkout",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "Lift into a bridge and slowly walk your heels away.",
    "description": "Keep your hips elevated while moving your feet. Avoid arching your lower back.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🦵",
    "mechanic": "Compound",
    "pattern": "Hinge",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Bridge Walkout"
    ],
    "category": "strength"
  },
  {
    "id": "single-leg-hip-hinge-reach",
    "name": "Single-Leg Hip Hinge Reach",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Balance on one leg while reaching your hands toward the floor.",
    "description": "Keep your hips square as you hinge. Avoid rotating your torso.",
    "avoidIf": [
      "lower-back",
      "balance"
    ],
    "icon": "⚖️",
    "mechanic": "Compound",
    "pattern": "Hinge",
    "force": "Pull",
    "unilateral": true,
    "focus": [
      "mobility",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Bodyweight Single Leg RDL"
    ],
    "category": "strength"
  },
  {
    "id": "razor-curl",
    "name": "Razor Curl",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "bodyweight",
      "bench"
    ],
    "difficulty": "Advanced",
    "cue": "Anchor your feet and curl your body using your hamstrings.",
    "description": "Control the entire movement with tension. Avoid dropping into the bottom position.",
    "avoidIf": [
      "knee"
    ],
    "icon": "🦵",
    "mechanic": "Isolation",
    "pattern": "Squat",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Razor Hamstring Curl"
    ],
    "category": "strength"
  },
  {
    "id": "hamstring-bridge-hold",
    "name": "Hamstring Bridge Hold",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Lift your hips and hold a bridge position.",
    "description": "Maintain tension through the back of your legs. Avoid letting your hips sag.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🦵",
    "mechanic": "Isolation",
    "pattern": "Hinge",
    "force": "Static",
    "unilateral": false,
    "focus": [
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Bridge Isometric Hold"
    ],
    "category": "strength"
  },
  {
    "id": "single-leg-glute-bridge-hamstring-march",
    "name": "Single-Leg Glute Bridge Hamstring March",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": [
      "Glutes",
      "Core/Abs"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "Hold a bridge while alternating lifted legs.",
    "description": "Keep your pelvis level during each march. Avoid rotating side to side.",
    "avoidIf": [
      "lower-back",
      "balance"
    ],
    "icon": "🦵",
    "mechanic": "Compound",
    "pattern": "Hinge",
    "force": "Static",
    "unilateral": true,
    "focus": [
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Bridge March"
    ],
    "category": "strength"
  },
  {
    "id": "bodyweight-good-morning",
    "name": "Bodyweight Good Morning",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Hinge at your hips while keeping your spine neutral.",
    "description": "Push your hips backward to load the hamstrings. Avoid rounding your lower back.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🌅",
    "mechanic": "Compound",
    "pattern": "Hinge",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "mobility",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Bodyweight Hip Hinge"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-romanian-deadlift",
    "name": "Dumbbell Romanian Deadlift",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Hinge your hips back while lowering dumbbells close to your legs.",
    "description": "Keep tension through your hamstrings throughout the lift. Avoid rounding your back.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Hinge",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB RDL"
    ],
    "category": "strength"
  },
  {
    "id": "single-leg-dumbbell-rdl",
    "name": "Single-Leg Dumbbell Romanian Deadlift",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Hold a dumbbell while hinging on one leg.",
    "description": "Keep your hips level during the movement. Avoid losing balance by rushing.",
    "avoidIf": [
      "lower-back",
      "balance"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Hinge",
    "force": "Pull",
    "unilateral": true,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Single Leg DB RDL"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-stiff-leg-deadlift",
    "name": "Dumbbell Stiff-Leg Deadlift",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Lower dumbbells with minimal knee bend and a strong hip hinge.",
    "description": "Maintain a neutral spine as you stretch the hamstrings. Avoid turning it into a squat.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Hinge",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Stiff Leg Deadlift"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-b-stance-rdl",
    "name": "Dumbbell B-Stance Romanian Deadlift",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Use a staggered stance and load the front leg.",
    "description": "Keep most weight on the working leg. Avoid rotating your hips open.",
    "avoidIf": [
      "lower-back",
      "balance"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Hinge",
    "force": "Pull",
    "unilateral": true,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Kickstand DB RDL"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-good-morning",
    "name": "Dumbbell Good Morning",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Hold a dumbbell at your chest and hinge forward.",
    "description": "Drive your hips backward to load the hamstrings. Avoid rounding your spine.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Hinge",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Good Morning"
    ],
    "category": "strength"
  },
  {
    "id": "seated-dumbbell-leg-curl",
    "name": "Seated Dumbbell Leg Curl",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": [],
    "equipment": [
      "dumbbell",
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Secure a dumbbell between your feet and curl your legs.",
    "description": "Move slowly through the curl. Avoid using momentum to lift the weight.",
    "avoidIf": [
      "knee"
    ],
    "icon": "🏋️",
    "mechanic": "Isolation",
    "pattern": "Squat",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Leg Curl"
    ],
    "category": "strength"
  },
  {
    "id": "prone-dumbbell-leg-curl",
    "name": "Prone Dumbbell Leg Curl",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": [],
    "equipment": [
      "dumbbell",
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Curl a dumbbell with your feet while lying face down.",
    "description": "Keep the movement controlled and isolated. Avoid lifting your hips off the bench.",
    "avoidIf": [
      "knee"
    ],
    "icon": "🏋️",
    "mechanic": "Isolation",
    "pattern": "Squat",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Lying DB Leg Curl"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-sumo-rdl",
    "name": "Dumbbell Sumo Romanian Deadlift",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Take a wide stance and hinge while holding the dumbbell.",
    "description": "Keep your chest tall during the hinge. Avoid turning it into a squat.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Hinge",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Sumo RDL"
    ],
    "category": "strength"
  },
  {
    "id": "staggered-stance-dumbbell-rdl",
    "name": "Staggered-Stance Dumbbell Romanian Deadlift",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Place one foot slightly behind while hinging forward.",
    "description": "Keep tension on the front leg. Avoid shifting fully onto the rear foot.",
    "avoidIf": [
      "lower-back",
      "balance"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Hinge",
    "force": "Pull",
    "unilateral": true,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Staggered DB RDL"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-hip-hinge",
    "name": "Dumbbell Hip Hinge",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Beginner",
    "cue": "Practice pushing your hips back while holding a dumbbell.",
    "description": "Learn the hinge pattern with control. Avoid bending through the lower back.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Hinge",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "mobility",
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Loaded Hip Hinge"
    ],
    "category": "strength"
  },
  {
    "id": "barbell-romanian-deadlift",
    "name": "Barbell Romanian Deadlift",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "barbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Hinge your hips back while lowering the bar close to your legs.",
    "description": "Maintain a neutral spine and controlled stretch through the hamstrings. Avoid rounding your lower back.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Hinge",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Barbell RDL"
    ],
    "category": "strength"
  },
  {
    "id": "barbell-stiff-leg-deadlift",
    "name": "Barbell Stiff-Leg Deadlift",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "barbell"
    ],
    "difficulty": "Advanced",
    "cue": "Lower the bar with nearly straight legs and a controlled hip hinge.",
    "description": "Keep the bar close to your body throughout the lift. Avoid rounding your spine.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Hinge",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": false,
    "aliases": [
      "Stiff-Leg Barbell Deadlift"
    ],
    "category": "strength"
  },
  {
    "id": "barbell-good-morning",
    "name": "Barbell Good Morning",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": [
      "Glutes",
      "Core/Abs"
    ],
    "equipment": [
      "barbell"
    ],
    "difficulty": "Advanced",
    "cue": "Hinge forward with the bar on your upper back.",
    "description": "Move through the hips while keeping your spine stable. Avoid using excessive weight.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🌅",
    "mechanic": "Compound",
    "pattern": "Hinge",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": false,
    "aliases": [
      "Good Morning"
    ],
    "category": "strength"
  },
  {
    "id": "snatch-grip-romanian-deadlift",
    "name": "Snatch-Grip Romanian Deadlift",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": [
      "Glutes",
      "Back"
    ],
    "equipment": [
      "barbell"
    ],
    "difficulty": "Advanced",
    "cue": "Use a wide grip while hinging the bar down under control.",
    "description": "Keep your lats engaged and spine neutral. Avoid allowing the bar to drift away.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Hinge",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "mobility"
    ],
    "homeFriendly": false,
    "aliases": [
      "Snatch Grip RDL"
    ],
    "category": "strength"
  },
  {
    "id": "deficit-romanian-deadlift",
    "name": "Deficit Romanian Deadlift",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "barbell",
      "box"
    ],
    "difficulty": "Advanced",
    "cue": "Stand elevated and hinge deeper while controlling the bar.",
    "description": "Maintain tension through the hamstrings. Avoid forcing depth beyond your mobility.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "📦",
    "mechanic": "Compound",
    "pattern": "Hinge",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "mobility"
    ],
    "homeFriendly": false,
    "aliases": [
      "Deficit RDL"
    ],
    "category": "strength"
  },
  {
    "id": "lying-leg-curl-machine",
    "name": "Lying Leg Curl",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": [],
    "equipment": [
      "machine"
    ],
    "difficulty": "Beginner",
    "cue": "Curl your heels toward your glutes while lying face down.",
    "description": "Control the lowering phase for tension. Avoid lifting your hips from the pad.",
    "avoidIf": [
      "knee"
    ],
    "icon": "🦵",
    "mechanic": "Isolation",
    "pattern": "Squat",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Prone Leg Curl"
    ],
    "category": "strength"
  },
  {
    "id": "seated-leg-curl-machine",
    "name": "Seated Leg Curl",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": [],
    "equipment": [
      "machine"
    ],
    "difficulty": "Beginner",
    "cue": "Curl the padded lever downward while seated upright.",
    "description": "Keep your hips against the pad during the movement. Avoid using momentum.",
    "avoidIf": [
      "knee"
    ],
    "icon": "🦵",
    "mechanic": "Isolation",
    "pattern": "Squat",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Seated Hamstring Curl"
    ],
    "category": "strength"
  },
  {
    "id": "glute-ham-raise",
    "name": "Glute-Ham Raise",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "machine"
    ],
    "difficulty": "Advanced",
    "cue": "Lower your torso while resisting with your hamstrings.",
    "description": "Maintain a straight line from knees through shoulders. Avoid dropping uncontrolled.",
    "avoidIf": [
      "knee"
    ],
    "icon": "🦵",
    "mechanic": "Compound",
    "pattern": "Hinge",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": false,
    "aliases": [
      "GHR"
    ],
    "category": "strength"
  },
  {
    "id": "forty-five-degree-back-extension",
    "name": "45 Degree Back Extension",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": [
      "Glutes",
      "Back"
    ],
    "equipment": [
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Hinge at the hips on the angled bench and raise your torso.",
    "description": "Squeeze your glutes at the top position. Avoid hyperextending your lower back.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Hinge",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": false,
    "aliases": [
      "45 Degree Hyperextension"
    ],
    "category": "strength"
  },
  {
    "id": "cable-pull-through",
    "name": "Cable Pull-Through",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "cable"
    ],
    "difficulty": "Beginner",
    "cue": "Pull the cable through your legs while driving your hips forward.",
    "description": "Use your hips to generate movement. Avoid pulling with your arms.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🔗",
    "mechanic": "Compound",
    "pattern": "Hinge",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Cable Hip Hinge"
    ],
    "category": "strength"
  },
  {
    "id": "cable-romanian-deadlift",
    "name": "Cable Romanian Deadlift",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "cable"
    ],
    "difficulty": "Intermediate",
    "cue": "Hinge away from the cable while maintaining tension.",
    "description": "Keep constant resistance through the movement. Avoid rounding your back.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🔗",
    "mechanic": "Compound",
    "pattern": "Hinge",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Cable RDL"
    ],
    "category": "strength"
  },
  {
    "id": "cable-leg-curl",
    "name": "Cable Leg Curl",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": [],
    "equipment": [
      "cable"
    ],
    "difficulty": "Intermediate",
    "cue": "Attach an ankle strap and curl your heel toward your body.",
    "description": "Keep the movement isolated and controlled. Avoid rotating your hips.",
    "avoidIf": [
      "knee"
    ],
    "icon": "🔗",
    "mechanic": "Isolation",
    "pattern": "Squat",
    "force": "Pull",
    "unilateral": true,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Standing Cable Leg Curl"
    ],
    "category": "strength"
  },
  {
    "id": "kettlebell-romanian-deadlift",
    "name": "Kettlebell Romanian Deadlift",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "kettlebell"
    ],
    "difficulty": "Beginner",
    "cue": "Hold the kettlebell and hinge your hips backward.",
    "description": "Keep the kettlebell close to your body. Avoid squatting the movement.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🔔",
    "mechanic": "Compound",
    "pattern": "Hinge",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "KB RDL"
    ],
    "category": "strength"
  },
  {
    "id": "single-leg-kettlebell-rdl",
    "name": "Single-Leg Kettlebell Romanian Deadlift",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "kettlebell"
    ],
    "difficulty": "Intermediate",
    "cue": "Balance on one leg while lowering the kettlebell.",
    "description": "Keep your hips square and controlled. Avoid rotating during the hinge.",
    "avoidIf": [
      "lower-back",
      "balance"
    ],
    "icon": "🔔",
    "mechanic": "Compound",
    "pattern": "Hinge",
    "force": "Pull",
    "unilateral": true,
    "focus": [
      "strength",
      "mobility"
    ],
    "homeFriendly": true,
    "aliases": [
      "Single Leg KB RDL"
    ],
    "category": "strength"
  },
  {
    "id": "band-romanian-deadlift",
    "name": "Resistance Band Romanian Deadlift",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "resistance-band"
    ],
    "difficulty": "Beginner",
    "cue": "Stand on the band and hinge while holding the handles.",
    "description": "Drive your hips forward against resistance. Avoid rounding your back.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🟢",
    "mechanic": "Compound",
    "pattern": "Hinge",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Band RDL"
    ],
    "category": "strength"
  },
  {
    "id": "band-leg-curl",
    "name": "Resistance Band Leg Curl",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": [],
    "equipment": [
      "resistance-band"
    ],
    "difficulty": "Beginner",
    "cue": "Anchor the band and curl your heel toward your glutes.",
    "description": "Keep the motion smooth and controlled. Avoid using momentum.",
    "avoidIf": [
      "knee"
    ],
    "icon": "🟢",
    "mechanic": "Isolation",
    "pattern": "Squat",
    "force": "Pull",
    "unilateral": true,
    "focus": [
      "hypertrophy",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Band Hamstring Curl"
    ],
    "category": "strength"
  },
  {
    "id": "band-pull-through",
    "name": "Resistance Band Pull-Through",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "resistance-band"
    ],
    "difficulty": "Beginner",
    "cue": "Hinge forward and extend your hips against band resistance.",
    "description": "Move through the hips rather than the lower back. Avoid leaning backward.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🟢",
    "mechanic": "Compound",
    "pattern": "Hinge",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Band Hip Hinge"
    ],
    "category": "strength"
  },
  {
    "id": "trx-hamstring-curl",
    "name": "TRX Hamstring Curl",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": [
      "Glutes",
      "Core/Abs"
    ],
    "equipment": [
      "trx"
    ],
    "difficulty": "Intermediate",
    "cue": "Place heels in straps and curl while holding a bridge.",
    "description": "Keep your hips elevated throughout. Avoid letting your lower back arch.",
    "avoidIf": [
      "lower-back",
      "knee"
    ],
    "icon": "〰️",
    "mechanic": "Isolation",
    "pattern": "Squat",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy",
      "endurance"
    ],
    "homeFriendly": false,
    "aliases": [
      "Suspension Hamstring Curl"
    ],
    "category": "strength"
  },
  {
    "id": "glute-bridge",
    "name": "Glute Bridge",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [
      "Hamstrings"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Drive through your feet and squeeze your glutes to lift your hips.",
    "description": "Keep your ribs down and hips level at the top. Avoid arching through your lower back.",
    "avoidIf": [],
    "icon": "🍑",
    "mechanic": "Isolation",
    "pattern": "Hinge",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Bodyweight Glute Bridge"
    ],
    "category": "strength"
  },
  {
    "id": "single-leg-glute-bridge",
    "name": "Single-Leg Glute Bridge",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [
      "Hamstrings"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "Lift your hips while driving through one planted foot.",
    "description": "Keep your pelvis level throughout the movement. Avoid rotating your hips.",
    "avoidIf": [
      "balance"
    ],
    "icon": "🍑",
    "mechanic": "Isolation",
    "pattern": "Hinge",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Single Leg Bridge"
    ],
    "category": "strength"
  },
  {
    "id": "glute-bridge-march",
    "name": "Glute Bridge March",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [
      "Core/Abs",
      "Hamstrings"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "Hold a bridge position while alternating knee lifts.",
    "description": "Keep your hips steady while marching. Avoid dropping your pelvis side to side.",
    "avoidIf": [
      "balance"
    ],
    "icon": "🍑",
    "mechanic": "Compound",
    "pattern": "Hinge",
    "force": "Static",
    "unilateral": true,
    "focus": [
      "endurance",
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Bridge March"
    ],
    "category": "strength"
  },
  {
    "id": "bodyweight-hip-thrust",
    "name": "Bodyweight Hip Thrust",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [
      "Hamstrings"
    ],
    "equipment": [
      "bench"
    ],
    "difficulty": "Beginner",
    "cue": "Rest your shoulders on a bench and drive your hips upward.",
    "description": "Squeeze your glutes fully at the top. Avoid hyperextending your lower back.",
    "avoidIf": [],
    "icon": "🍑",
    "mechanic": "Isolation",
    "pattern": "Hinge",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Shoulder-Elevated Hip Thrust"
    ],
    "category": "strength"
  },
  {
    "id": "single-leg-hip-thrust",
    "name": "Single-Leg Hip Thrust",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [
      "Hamstrings"
    ],
    "equipment": [
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Drive through one foot while lifting your hips.",
    "description": "Keep your working knee aligned throughout. Avoid twisting your pelvis.",
    "avoidIf": [
      "balance"
    ],
    "icon": "🍑",
    "mechanic": "Isolation",
    "pattern": "Hinge",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Single Leg Bodyweight Hip Thrust"
    ],
    "category": "strength"
  },
  {
    "id": "frog-pump",
    "name": "Frog Pump",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Place your feet together and drive your hips upward.",
    "description": "Focus on glute contraction at the top. Avoid using momentum from your lower back.",
    "avoidIf": [],
    "icon": "🐸",
    "mechanic": "Isolation",
    "pattern": "Hinge",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Frog Glute Pump"
    ],
    "category": "strength"
  },
  {
    "id": "frog-bridge",
    "name": "Frog Bridge",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [
      "Hamstrings"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Use a frog-leg position while lifting your hips.",
    "description": "Keep your core engaged during the lift. Avoid arching your lower back.",
    "avoidIf": [],
    "icon": "🐸",
    "mechanic": "Isolation",
    "pattern": "Hinge",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Frog Glute Bridge"
    ],
    "category": "strength"
  },
  {
    "id": "donkey-kick",
    "name": "Donkey Kick",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [
      "Core/Abs"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Drive one heel upward while keeping your knee bent.",
    "description": "Keep your hips square during the movement. Avoid rotating your torso.",
    "avoidIf": [],
    "icon": "🦵",
    "mechanic": "Isolation",
    "pattern": "Hinge",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "hypertrophy",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Quadruped Hip Extension Kick"
    ],
    "category": "strength"
  },
  {
    "id": "quadruped-hip-extension",
    "name": "Quadruped Hip Extension",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [
      "Core/Abs"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Extend one leg behind you from a hands-and-knees position.",
    "description": "Move slowly and keep your spine neutral. Avoid swinging the leg.",
    "avoidIf": [],
    "icon": "🦵",
    "mechanic": "Isolation",
    "pattern": "Hinge",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Bird Dog Hip Extension"
    ],
    "category": "strength"
  },
  {
    "id": "fire-hydrant",
    "name": "Fire Hydrant",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [
      "Core/Abs"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Lift your bent knee out to the side.",
    "description": "Keep your hips stable during the movement. Avoid shifting your weight.",
    "avoidIf": [],
    "icon": "🐕",
    "mechanic": "Isolation",
    "pattern": "Hip Abduction",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "mobility",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Quadruped Hip Abduction"
    ],
    "category": "strength"
  },
  {
    "id": "clamshell",
    "name": "Clamshell",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Rotate your top knee upward while keeping your feet together.",
    "description": "Control the rotation with your hip muscles. Avoid rolling your pelvis backward.",
    "avoidIf": [],
    "icon": "🦪",
    "mechanic": "Isolation",
    "pattern": "Hip Abduction",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "mobility",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Side-Lying Clamshell"
    ],
    "category": "strength"
  },
  {
    "id": "side-lying-hip-abduction",
    "name": "Side-Lying Hip Abduction",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Lift your top leg upward while lying on your side.",
    "description": "Keep your toes facing forward during the lift. Avoid rotating your hip open.",
    "avoidIf": [],
    "icon": "🦵",
    "mechanic": "Isolation",
    "pattern": "Hip Abduction",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Side Leg Raise"
    ],
    "category": "strength"
  },
  {
    "id": "standing-hip-abduction",
    "name": "Standing Hip Abduction",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [
      "Core/Abs"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Lift one leg out to the side while standing tall.",
    "description": "Maintain upright posture during the movement. Avoid leaning away from the working leg.",
    "avoidIf": [
      "balance"
    ],
    "icon": "🦵",
    "mechanic": "Isolation",
    "pattern": "Hip Abduction",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Standing Side Leg Raise"
    ],
    "category": "strength"
  },
  {
    "id": "curtsy-hold-glute-squeeze",
    "name": "Curtsy Hold Glute Squeeze",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [
      "Quads"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "Hold a curtsy position and squeeze the glute of the standing leg.",
    "description": "Stay controlled in the hold position. Avoid collapsing the knee inward.",
    "avoidIf": [
      "knee",
      "balance"
    ],
    "icon": "🍑",
    "mechanic": "Isolation",
    "pattern": "Lunge",
    "force": "Static",
    "unilateral": true,
    "focus": [
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Curtsy Glute Hold"
    ],
    "category": "strength"
  },
  {
    "id": "bench-reverse-hyper",
    "name": "Bench Reverse Hyper",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [
      "Hamstrings"
    ],
    "equipment": [
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Lie supported and lift your legs behind you using your hips.",
    "description": "Squeeze your glutes at the top of the movement. Avoid swinging your legs.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🏋️",
    "mechanic": "Isolation",
    "pattern": "Hinge",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Bodyweight Reverse Hyper"
    ],
    "category": "strength"
  },
  {
    "id": "prone-plank-hip-extension",
    "name": "Prone Plank Hip Extension",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [
      "Core/Abs"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "Lift one leg while holding a plank position.",
    "description": "Keep your hips level and core engaged. Avoid rotating your body.",
    "avoidIf": [],
    "icon": "🔥",
    "mechanic": "Compound",
    "pattern": "Core",
    "force": "Static",
    "unilateral": true,
    "focus": [
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Plank Leg Lift"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-hip-thrust",
    "name": "Dumbbell Hip Thrust",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [
      "Hamstrings"
    ],
    "equipment": [
      "dumbbell",
      "bench"
    ],
    "difficulty": "Beginner",
    "cue": "Place a dumbbell across your hips and drive upward through your feet.",
    "description": "Squeeze your glutes fully at the top while keeping your spine neutral. Avoid arching your lower back.",
    "avoidIf": [],
    "icon": "🍑",
    "mechanic": "Compound",
    "pattern": "Hinge",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Hip Thrust"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-glute-bridge",
    "name": "Dumbbell Glute Bridge",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [
      "Hamstrings"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Beginner",
    "cue": "Hold a dumbbell on your hips while lifting into a bridge.",
    "description": "Maintain tension through your glutes throughout the movement. Avoid pushing through your lower back.",
    "avoidIf": [],
    "icon": "🍑",
    "mechanic": "Isolation",
    "pattern": "Hinge",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Weighted Glute Bridge"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-frog-pump",
    "name": "Dumbbell Frog Pump",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Beginner",
    "cue": "Hold a dumbbell on your hips and pump from a frog-leg position.",
    "description": "Focus on repeated glute contractions. Avoid using momentum from your torso.",
    "avoidIf": [],
    "icon": "🐸",
    "mechanic": "Isolation",
    "pattern": "Hinge",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Weighted Frog Pump"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-single-leg-hip-thrust",
    "name": "Dumbbell Single-Leg Hip Thrust",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [
      "Hamstrings"
    ],
    "equipment": [
      "dumbbell",
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Balance a dumbbell on your hip while driving upward with one leg.",
    "description": "Keep your hips square and controlled. Avoid twisting during the lift.",
    "avoidIf": [
      "balance"
    ],
    "icon": "🍑",
    "mechanic": "Compound",
    "pattern": "Hinge",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Single Leg DB Hip Thrust"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-b-stance-hip-thrust",
    "name": "Dumbbell B-Stance Hip Thrust",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [
      "Hamstrings"
    ],
    "equipment": [
      "dumbbell",
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Use a staggered stance while driving the hips upward.",
    "description": "Keep most tension on the lead leg. Avoid shifting into the rear foot.",
    "avoidIf": [
      "balance"
    ],
    "icon": "🍑",
    "mechanic": "Compound",
    "pattern": "Hinge",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "B-Stance DB Hip Thrust"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-sumo-squat-glute-focus",
    "name": "Dumbbell Sumo Squat Glute Focus",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [
      "Quads"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Hold a dumbbell low and squat with a wide stance.",
    "description": "Drive through your heels and squeeze your glutes. Avoid excessive depth if mobility is limited.",
    "avoidIf": [
      "knee",
      "hip"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Squat",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Sumo Squat"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-single-leg-glute-bridge",
    "name": "Dumbbell Single-Leg Glute Bridge",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [
      "Hamstrings"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Place a dumbbell on your hip and bridge with one leg.",
    "description": "Control the pelvis throughout the movement. Avoid rotating your hips.",
    "avoidIf": [
      "balance"
    ],
    "icon": "🍑",
    "mechanic": "Isolation",
    "pattern": "Hinge",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Weighted Single Leg Bridge"
    ],
    "category": "strength"
  },
  {
    "id": "kettlebell-hip-thrust",
    "name": "Kettlebell Hip Thrust",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [
      "Hamstrings"
    ],
    "equipment": [
      "kettlebell",
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Rest the kettlebell across your hips and thrust upward.",
    "description": "Lock out by squeezing your glutes. Avoid overextending your spine.",
    "avoidIf": [
      "pregnancy"
    ],
    "icon": "🔔",
    "mechanic": "Compound",
    "pattern": "Hinge",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "KB Hip Thrust"
    ],
    "category": "strength"
  },
  {
    "id": "kettlebell-glute-bridge",
    "name": "Kettlebell Glute Bridge",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [
      "Hamstrings"
    ],
    "equipment": [
      "kettlebell"
    ],
    "difficulty": "Beginner",
    "cue": "Hold a kettlebell on your hips while bridging upward.",
    "description": "Keep constant glute tension throughout the movement. Avoid arching your back.",
    "avoidIf": [],
    "icon": "🔔",
    "mechanic": "Isolation",
    "pattern": "Hinge",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Weighted KB Bridge"
    ],
    "category": "strength"
  },
  {
    "id": "kettlebell-sumo-squat-glute-focus",
    "name": "Kettlebell Sumo Squat Glute Focus",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [
      "Quads"
    ],
    "equipment": [
      "kettlebell"
    ],
    "difficulty": "Intermediate",
    "cue": "Hold the kettlebell and squat with a wide stance.",
    "description": "Push your knees outward and squeeze your glutes. Avoid losing your posture.",
    "avoidIf": [
      "knee",
      "hip"
    ],
    "icon": "🔔",
    "mechanic": "Compound",
    "pattern": "Squat",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "KB Sumo Squat"
    ],
    "category": "strength"
  },
  {
    "id": "kettlebell-frog-pump",
    "name": "Kettlebell Frog Pump",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [],
    "equipment": [
      "kettlebell"
    ],
    "difficulty": "Beginner",
    "cue": "Hold the kettlebell over your hips and perform frog pumps.",
    "description": "Maintain controlled contractions. Avoid using momentum.",
    "avoidIf": [],
    "icon": "🔔",
    "mechanic": "Isolation",
    "pattern": "Hinge",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "KB Frog Pump"
    ],
    "category": "strength"
  },
  {
    "id": "barbell-hip-thrust",
    "name": "Barbell Hip Thrust",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [
      "Hamstrings"
    ],
    "equipment": [
      "barbell",
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Drive a loaded barbell upward by extending your hips.",
    "description": "Pause and squeeze at lockout. Avoid hyperextending your lower back.",
    "avoidIf": [
      "pregnancy"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Hinge",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "BB Hip Thrust"
    ],
    "category": "strength"
  },
  {
    "id": "barbell-glute-bridge",
    "name": "Barbell Glute Bridge",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [
      "Hamstrings"
    ],
    "equipment": [
      "barbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Place a barbell across your hips and bridge upward.",
    "description": "Brace your core while squeezing your glutes. Avoid excessive spinal extension.",
    "avoidIf": [
      "pregnancy"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Hinge",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": false,
    "aliases": [
      "Weighted Barbell Bridge"
    ],
    "category": "strength"
  },
  {
    "id": "barbell-frog-pump",
    "name": "Barbell Frog Pump",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [],
    "equipment": [
      "barbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Perform frog pumps with a barbell across your hips.",
    "description": "Use controlled repetitions and squeeze the glutes. Avoid bouncing the weight.",
    "avoidIf": [
      "pregnancy"
    ],
    "icon": "🏋️",
    "mechanic": "Isolation",
    "pattern": "Hinge",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Weighted Barbell Frog Pump"
    ],
    "category": "strength"
  },
  {
    "id": "barbell-single-leg-hip-thrust",
    "name": "Barbell Single-Leg Hip Thrust",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [
      "Hamstrings"
    ],
    "equipment": [
      "barbell",
      "bench"
    ],
    "difficulty": "Advanced",
    "cue": "Drive the bar upward using one leg at a time.",
    "description": "Keep the bar level throughout the movement. Avoid rotating your hips.",
    "avoidIf": [
      "balance",
      "pregnancy"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Hinge",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "strength"
    ],
    "homeFriendly": false,
    "aliases": [
      "Single Leg Barbell Hip Thrust"
    ],
    "category": "strength"
  },
  {
    "id": "b-stance-barbell-hip-thrust",
    "name": "B-Stance Barbell Hip Thrust",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [
      "Hamstrings"
    ],
    "equipment": [
      "barbell",
      "bench"
    ],
    "difficulty": "Advanced",
    "cue": "Use a staggered stance and drive through the lead foot.",
    "description": "Maintain control and load the working glute. Avoid shifting weight to the back foot.",
    "avoidIf": [
      "balance",
      "pregnancy"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Hinge",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "B-Stance BB Hip Thrust"
    ],
    "category": "strength"
  },
  {
    "id": "hip-thrust-machine",
    "name": "Hip Thrust Machine",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [
      "Hamstrings"
    ],
    "equipment": [
      "machine"
    ],
    "difficulty": "Intermediate",
    "cue": "Brace your core and drive the machine platform upward with your hips.",
    "description": "Squeeze your glutes at full extension. Avoid overextending your lower back.",
    "avoidIf": [
      "pregnancy"
    ],
    "icon": "🍑",
    "mechanic": "Compound",
    "pattern": "Hinge",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Machine Hip Thrust"
    ],
    "category": "strength"
  },
  {
    "id": "glute-kickback-machine",
    "name": "Glute Kickback Machine",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [
      "Hamstrings"
    ],
    "equipment": [
      "machine"
    ],
    "difficulty": "Beginner",
    "cue": "Press the machine pad backward using your glute.",
    "description": "Move with control and avoid rotating your hips. Do not swing the leg.",
    "avoidIf": [],
    "icon": "🍑",
    "mechanic": "Isolation",
    "pattern": "Hinge",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Machine Glute Kickback"
    ],
    "category": "strength"
  },
  {
    "id": "hip-abduction-machine",
    "name": "Hip Abduction Machine",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [],
    "equipment": [
      "machine"
    ],
    "difficulty": "Beginner",
    "cue": "Push your knees outward against the machine pads.",
    "description": "Keep the movement controlled and focused on the outer glutes. Avoid bouncing the weight.",
    "avoidIf": [],
    "icon": "🍑",
    "mechanic": "Isolation",
    "pattern": "Hip Abduction",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Seated Hip Abduction"
    ],
    "category": "strength"
  },
  {
    "id": "smith-machine-hip-thrust",
    "name": "Smith Machine Hip Thrust",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [
      "Hamstrings"
    ],
    "equipment": [
      "machine",
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Position your shoulders on a bench and drive the guided bar upward.",
    "description": "Pause at the top while squeezing your glutes. Avoid arching your spine.",
    "avoidIf": [
      "pregnancy"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Hinge",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Smith Hip Thrust"
    ],
    "category": "strength"
  },
  {
    "id": "cable-glute-kickback",
    "name": "Cable Glute Kickback",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [
      "Hamstrings"
    ],
    "equipment": [
      "cable"
    ],
    "difficulty": "Beginner",
    "cue": "Drive your leg backward against cable resistance.",
    "description": "Keep your hips square and squeeze at the end range. Avoid swinging your leg.",
    "avoidIf": [],
    "icon": "🔗",
    "mechanic": "Isolation",
    "pattern": "Hinge",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Cable Kickback"
    ],
    "category": "strength"
  },
  {
    "id": "standing-cable-hip-abduction",
    "name": "Standing Cable Hip Abduction",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [
      "Core/Abs"
    ],
    "equipment": [
      "cable"
    ],
    "difficulty": "Beginner",
    "cue": "Move your leg outward against cable resistance.",
    "description": "Stay tall and controlled throughout the movement. Avoid leaning away.",
    "avoidIf": [
      "balance"
    ],
    "icon": "🔗",
    "mechanic": "Isolation",
    "pattern": "Hip Abduction",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "endurance",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Cable Hip Abduction"
    ],
    "category": "strength"
  },
  {
    "id": "cable-hip-thrust",
    "name": "Cable Hip Thrust",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [
      "Hamstrings"
    ],
    "equipment": [
      "cable",
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Drive your hips upward while holding cable resistance.",
    "description": "Focus on hip extension and glute contraction. Avoid pulling with your arms.",
    "avoidIf": [],
    "icon": "🔗",
    "mechanic": "Compound",
    "pattern": "Hinge",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Cable Loaded Hip Thrust"
    ],
    "category": "strength"
  },
  {
    "id": "kneeling-cable-kickback",
    "name": "Kneeling Cable Kickback",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [
      "Core/Abs"
    ],
    "equipment": [
      "cable"
    ],
    "difficulty": "Beginner",
    "cue": "Extend your leg backward from a kneeling cable position.",
    "description": "Keep your torso stable while squeezing your glute. Avoid rotating your hips.",
    "avoidIf": [],
    "icon": "🔗",
    "mechanic": "Isolation",
    "pattern": "Hinge",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Kneeling Glute Kickback"
    ],
    "category": "strength"
  },
  {
    "id": "banded-hip-thrust",
    "name": "Banded Hip Thrust",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [
      "Hamstrings"
    ],
    "equipment": [
      "resistance-band",
      "bench"
    ],
    "difficulty": "Beginner",
    "cue": "Drive your hips upward while pressing outward against the band.",
    "description": "Maintain tension on the band throughout the movement. Avoid letting your knees collapse inward.",
    "avoidIf": [],
    "icon": "🟢",
    "mechanic": "Compound",
    "pattern": "Hinge",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Resistance Band Hip Thrust"
    ],
    "category": "strength"
  },
  {
    "id": "banded-glute-bridge",
    "name": "Banded Glute Bridge",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [
      "Hamstrings"
    ],
    "equipment": [
      "resistance-band"
    ],
    "difficulty": "Beginner",
    "cue": "Press your knees outward while bridging against band tension.",
    "description": "Keep constant glute engagement. Avoid arching your lower back.",
    "avoidIf": [],
    "icon": "🟢",
    "mechanic": "Isolation",
    "pattern": "Hinge",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "endurance",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Band Glute Bridge"
    ],
    "category": "strength"
  },
  {
    "id": "banded-lateral-walk",
    "name": "Banded Lateral Walk",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [
      "Quads"
    ],
    "equipment": [
      "resistance-band"
    ],
    "difficulty": "Beginner",
    "cue": "Step sideways while maintaining band tension around your legs.",
    "description": "Keep your knees tracking outward during steps. Avoid standing upright between steps.",
    "avoidIf": [],
    "icon": "🟢",
    "mechanic": "Isolation",
    "pattern": "Hip Abduction",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "endurance",
      "mobility"
    ],
    "homeFriendly": true,
    "aliases": [
      "Lateral Band Walk"
    ],
    "category": "conditioning"
  },
  {
    "id": "monster-walk",
    "name": "Monster Walk",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [
      "Quads"
    ],
    "equipment": [
      "resistance-band"
    ],
    "difficulty": "Beginner",
    "cue": "Walk forward with knees pushed outward against band resistance.",
    "description": "Maintain a controlled athletic stance. Avoid letting the band lose tension.",
    "avoidIf": [],
    "icon": "🟢",
    "mechanic": "Isolation",
    "pattern": "Hip Abduction",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Banded Monster Walk"
    ],
    "category": "conditioning"
  },
  {
    "id": "banded-clamshell",
    "name": "Banded Clamshell",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [],
    "equipment": [
      "resistance-band"
    ],
    "difficulty": "Beginner",
    "cue": "Open your knees against band tension while lying on your side.",
    "description": "Keep your feet together and pelvis stable. Avoid rolling backward.",
    "avoidIf": [],
    "icon": "🦪",
    "mechanic": "Isolation",
    "pattern": "Hip Abduction",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Resistance Band Clamshell"
    ],
    "category": "strength"
  },
  {
    "id": "banded-standing-kickback",
    "name": "Banded Standing Kickback",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [
      "Core/Abs"
    ],
    "equipment": [
      "resistance-band"
    ],
    "difficulty": "Beginner",
    "cue": "Extend one leg backward while keeping band tension.",
    "description": "Keep your torso still and squeeze your glute. Avoid swinging your leg.",
    "avoidIf": [
      "balance"
    ],
    "icon": "🟢",
    "mechanic": "Isolation",
    "pattern": "Hinge",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Band Glute Kickback"
    ],
    "category": "strength"
  },
  {
    "id": "banded-hip-abduction",
    "name": "Banded Hip Abduction",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [],
    "equipment": [
      "resistance-band"
    ],
    "difficulty": "Beginner",
    "cue": "Move your legs outward against band resistance.",
    "description": "Keep the movement controlled and deliberate. Avoid using momentum.",
    "avoidIf": [],
    "icon": "🟢",
    "mechanic": "Isolation",
    "pattern": "Hip Abduction",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Band Hip Abduction"
    ],
    "category": "strength"
  },
  {
    "id": "trx-hip-thrust",
    "name": "TRX Hip Thrust",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [
      "Hamstrings",
      "Core/Abs"
    ],
    "equipment": [
      "trx"
    ],
    "difficulty": "Intermediate",
    "cue": "Use suspension straps for support while driving hips upward.",
    "description": "Maintain a controlled hip extension pattern. Avoid arching your back.",
    "avoidIf": [],
    "icon": "〰️",
    "mechanic": "Compound",
    "pattern": "Hinge",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": false,
    "aliases": [
      "Suspension Hip Thrust"
    ],
    "category": "strength"
  },
  {
    "id": "box-shoulder-elevated-hip-thrust",
    "name": "Box Shoulder-Elevated Hip Thrust",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [
      "Hamstrings"
    ],
    "equipment": [
      "box"
    ],
    "difficulty": "Intermediate",
    "cue": "Rest your shoulders on a box and drive your hips upward.",
    "description": "Control the full movement and squeeze your glutes at lockout. Avoid excessive lower-back extension.",
    "avoidIf": [],
    "icon": "📦",
    "mechanic": "Compound",
    "pattern": "Hinge",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Box Hip Thrust"
    ],
    "category": "strength"
  },
  {
    "id": "standing-calf-raise",
    "name": "Standing Calf Raise",
    "muscleGroup": "Calves",
    "secondaryMuscles": [],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Push through the balls of your feet and lift your heels as high as you can.",
    "description": "Stand tall with feet hip-width apart. Rise up onto the balls of your feet, squeezing your calves at the top, then lower your heels slowly back to the floor. Don't bounce — control the way down for the full stretch.",
    "avoidIf": [],
    "icon": "🦵",
    "mechanic": "Isolation",
    "pattern": "Squat",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Bodyweight Calf Raise"
    ],
    "category": "strength"
  },
  {
    "id": "single-leg-calf-raise",
    "name": "Single-Leg Calf Raise",
    "muscleGroup": "Calves",
    "secondaryMuscles": [],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "Balance on one foot and raise that heel as high as possible.",
    "description": "Stand on one foot, holding a wall for balance, with the other foot lifted. Push through the ball of your standing foot to lift your heel high, then lower slowly. Keep your knee straight so the calf does the work, not your leg.",
    "avoidIf": [
      "balance"
    ],
    "icon": "🦵",
    "mechanic": "Isolation",
    "pattern": "Squat",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Single Leg Standing Calf Raise"
    ],
    "category": "strength"
  },
  {
    "id": "seated-calf-raise-bodyweight",
    "name": "Seated Calf Raise Bodyweight",
    "muscleGroup": "Calves",
    "secondaryMuscles": [],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Sit tall and drive your heels up using just the balls of your feet.",
    "description": "Sit on a chair with feet flat and knees bent 90 degrees. Press through the balls of your feet to lift your heels as high as you can, then lower slowly. This version targets the deeper soleus muscle beneath the calf.",
    "avoidIf": [],
    "icon": "🦵",
    "mechanic": "Isolation",
    "pattern": "Squat",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Seated Bodyweight Calf Raise"
    ],
    "category": "strength"
  },
  {
    "id": "donkey-calf-raise",
    "name": "Donkey Calf Raise",
    "muscleGroup": "Calves",
    "secondaryMuscles": [],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "Hinge forward at the hips, then raise your heels high.",
    "description": "Bend forward at the hips and rest your hands on a bench or wall so your back is nearly flat. With the balls of your feet on the floor, lift your heels as high as possible, then lower slowly. The forward bend gives your calves a bigger stretch and range.",
    "avoidIf": [],
    "icon": "🫏",
    "mechanic": "Isolation",
    "pattern": "Squat",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Bent-Over Calf Raise"
    ],
    "category": "strength"
  },
  {
    "id": "wall-lean-calf-raise",
    "name": "Wall-Lean Calf Raise",
    "muscleGroup": "Calves",
    "secondaryMuscles": [],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Lean into the wall and press your heels up.",
    "description": "Stand a step back from a wall and lean your forearms against it, body straight. Push through the balls of your feet to raise your heels, then lower slowly. Leaning removes balance from the equation so you can focus on the calf squeeze.",
    "avoidIf": [],
    "icon": "🧱",
    "mechanic": "Isolation",
    "pattern": "Squat",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Wall Calf Raise"
    ],
    "category": "strength"
  },
  {
    "id": "calf-raise-pulse",
    "name": "Calf Raise Pulse",
    "muscleGroup": "Calves",
    "secondaryMuscles": [],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Raise up, then do quick small pulses at the top.",
    "description": "Rise onto the balls of your feet, then stay high and pulse up and down through a small range without dropping your heels. Keep the tension on your calves the whole time. Great burnout finisher once full raises get easy.",
    "avoidIf": [],
    "icon": "🦵",
    "mechanic": "Isolation",
    "pattern": "Squat",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Calf Pulses"
    ],
    "category": "conditioning"
  },
  {
    "id": "tempo-calf-raise",
    "name": "Tempo Calf Raise",
    "muscleGroup": "Calves",
    "secondaryMuscles": [],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "Take three seconds up and three seconds down.",
    "description": "Do a standing calf raise but slow it right down: three seconds to lift, a pause at the top, three seconds to lower. The slow tempo keeps your calves under tension longer. Don't rush the lowering phase — that's where the growth is.",
    "avoidIf": [],
    "icon": "⏱️",
    "mechanic": "Isolation",
    "pattern": "Squat",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Slow Calf Raise"
    ],
    "category": "strength"
  },
  {
    "id": "toe-walk",
    "name": "Toe Walk",
    "muscleGroup": "Calves",
    "secondaryMuscles": [
      "Full Body/Cardio"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Walk forward on the balls of your feet with heels high.",
    "description": "Rise onto the balls of both feet and walk forward in small steps, keeping your heels off the ground the whole time. Stay tall and controlled. It builds calf endurance and ankle stability at the same time.",
    "avoidIf": [],
    "icon": "🚶",
    "mechanic": "Isolation",
    "pattern": "Conditioning",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Tiptoe Walk"
    ],
    "category": "conditioning"
  },
  {
    "id": "deficit-calf-raise-box",
    "name": "Deficit Calf Raise Off Box",
    "muscleGroup": "Calves",
    "secondaryMuscles": [],
    "equipment": [
      "box"
    ],
    "difficulty": "Intermediate",
    "cue": "Let your heels drop below the box, then press all the way up.",
    "description": "Stand with the balls of your feet on the edge of a box or step, heels hanging off. Let your heels sink below the edge for a deep stretch, then press up as high as you can. The extra drop trains the calf through its fullest range.",
    "avoidIf": [],
    "icon": "📦",
    "mechanic": "Isolation",
    "pattern": "Squat",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Step Calf Raise"
    ],
    "category": "strength"
  },
  {
    "id": "single-leg-deficit-calf-raise-box",
    "name": "Single-Leg Deficit Calf Raise Off Box",
    "muscleGroup": "Calves",
    "secondaryMuscles": [],
    "equipment": [
      "box"
    ],
    "difficulty": "Advanced",
    "cue": "On one foot, drop the heel below the box then drive up high.",
    "description": "Balance on the ball of one foot on the edge of a box, holding a wall for support. Let your heel sink below the edge, then press up as high as possible before lowering slowly. One leg at a time doubles the load and fixes side-to-side imbalances.",
    "avoidIf": [
      "balance"
    ],
    "icon": "📦",
    "mechanic": "Isolation",
    "pattern": "Squat",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Single Leg Step Calf Raise"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-calf-raise",
    "name": "Dumbbell Calf Raise",
    "muscleGroup": "Calves",
    "secondaryMuscles": [],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Beginner",
    "cue": "Hold dumbbells at your sides and raise your heels high.",
    "description": "Stand tall holding a dumbbell in each hand at your sides. Push through the balls of your feet to lift your heels, squeeze at the top, then lower slowly. The added weight makes each rep count — keep your body upright, don't lean.",
    "avoidIf": [],
    "icon": "🏋️",
    "mechanic": "Isolation",
    "pattern": "Squat",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Calf Raise"
    ],
    "category": "strength"
  },
  {
    "id": "single-leg-dumbbell-calf-raise",
    "name": "Single-Leg Dumbbell Calf Raise",
    "muscleGroup": "Calves",
    "secondaryMuscles": [],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "One dumbbell, one foot — press that heel up high.",
    "description": "Hold a dumbbell in one hand and balance on the same-side foot, using a wall for support. Raise your heel as high as you can, then lower under control. Loading one leg builds serious calf strength and evens out weak sides.",
    "avoidIf": [
      "balance"
    ],
    "icon": "🏋️",
    "mechanic": "Isolation",
    "pattern": "Squat",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Single Leg DB Calf Raise"
    ],
    "category": "strength"
  },
  {
    "id": "seated-dumbbell-calf-raise",
    "name": "Seated Dumbbell Calf Raise",
    "muscleGroup": "Calves",
    "secondaryMuscles": [],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Beginner",
    "cue": "Rest dumbbells on your knees and drive your heels up.",
    "description": "Sit with knees bent 90 degrees and a dumbbell resting on each thigh near the knee. Press through the balls of your feet to lift your heels, then lower slowly. The seated angle hits the soleus, the calf muscle that shapes the lower leg.",
    "avoidIf": [],
    "icon": "🏋️",
    "mechanic": "Isolation",
    "pattern": "Squat",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Seated DB Calf Raise"
    ],
    "category": "strength"
  },
  {
    "id": "barbell-standing-calf-raise",
    "name": "Barbell Standing Calf Raise",
    "muscleGroup": "Calves",
    "secondaryMuscles": [],
    "equipment": [
      "barbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Rest the bar across your upper back and raise your heels.",
    "description": "Set a barbell across your upper back like a squat, standing tall with feet hip-width. Push through the balls of your feet to lift your heels high, then lower slowly. Keep your knees straight and core braced so you stay balanced under the bar.",
    "avoidIf": [],
    "icon": "🏋️",
    "mechanic": "Isolation",
    "pattern": "Squat",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "BB Standing Calf Raise"
    ],
    "category": "strength"
  },
  {
    "id": "barbell-seated-calf-raise",
    "name": "Barbell Seated Calf Raise",
    "muscleGroup": "Calves",
    "secondaryMuscles": [],
    "equipment": [
      "barbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Rest the bar on your thighs and press your heels up.",
    "description": "Sit with knees bent and a barbell laid across your thighs, held in place with your hands. Drive through the balls of your feet to raise your heels, then lower slowly. Pad the bar if it digs in — comfort lets you push harder.",
    "avoidIf": [],
    "icon": "🏋️",
    "mechanic": "Isolation",
    "pattern": "Squat",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "BB Seated Calf Raise"
    ],
    "category": "strength"
  },
  {
    "id": "standing-calf-raise-machine",
    "name": "Standing Calf Raise Machine",
    "muscleGroup": "Calves",
    "secondaryMuscles": [],
    "equipment": [
      "machine"
    ],
    "difficulty": "Intermediate",
    "cue": "Shoulders under the pads, then press your heels as high as they go.",
    "description": "Stand on the platform with the balls of your feet on the edge and shoulders under the pads. Lower your heels for a stretch, then press up as high as possible. Move through the full range slowly rather than bouncing the weight.",
    "avoidIf": [],
    "icon": "🏋️",
    "mechanic": "Isolation",
    "pattern": "Squat",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Machine Standing Calf Raise"
    ],
    "category": "strength"
  },
  {
    "id": "seated-calf-raise-machine",
    "name": "Seated Calf Raise Machine",
    "muscleGroup": "Calves",
    "secondaryMuscles": [],
    "equipment": [
      "machine"
    ],
    "difficulty": "Beginner",
    "cue": "Knees under the pad, then drive your heels up.",
    "description": "Sit with the balls of your feet on the platform and the pad snug over your knees. Lower your heels for a stretch, then press up and squeeze. The bent-knee position targets the deeper soleus muscle.",
    "avoidIf": [],
    "icon": "🏋️",
    "mechanic": "Isolation",
    "pattern": "Squat",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Machine Seated Calf Raise"
    ],
    "category": "strength"
  },
  {
    "id": "leg-press-calf-raise",
    "name": "Leg Press Calf Raise",
    "muscleGroup": "Calves",
    "secondaryMuscles": [
      "Quads"
    ],
    "equipment": [
      "machine"
    ],
    "difficulty": "Intermediate",
    "cue": "Push the sled with just the balls of your feet.",
    "description": "Sit in the leg press with only the balls of your feet on the bottom edge of the platform, legs nearly straight. Press the sled away by pushing through your toes, then let it come back for a calf stretch. Keep the safeties on — don't let your feet slip.",
    "avoidIf": [],
    "icon": "🦵",
    "mechanic": "Isolation",
    "pattern": "Squat",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Leg Press Machine Calf Raise"
    ],
    "category": "strength"
  },
  {
    "id": "smith-machine-calf-raise",
    "name": "Smith Machine Calf Raise",
    "muscleGroup": "Calves",
    "secondaryMuscles": [],
    "equipment": [
      "machine"
    ],
    "difficulty": "Intermediate",
    "cue": "Bar on your upper back, heels driving high.",
    "description": "Set the Smith machine bar across your upper back and stand with the balls of your feet on a small plate or block. Raise your heels as high as you can, then lower slowly. The fixed bar path lets you push hard without worrying about balance.",
    "avoidIf": [],
    "icon": "🏋️",
    "mechanic": "Isolation",
    "pattern": "Squat",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": false,
    "aliases": [
      "Smith Calf Raise"
    ],
    "category": "strength"
  },
  {
    "id": "hack-squat-machine-calf-raise",
    "name": "Hack Squat Machine Calf Raise",
    "muscleGroup": "Calves",
    "secondaryMuscles": [
      "Quads"
    ],
    "equipment": [
      "machine"
    ],
    "difficulty": "Intermediate",
    "cue": "Shoulders under the pads, press through your toes.",
    "description": "Load into the hack squat machine with the balls of your feet on the platform edge. Press through your toes to raise your heels, then lower for a stretch. The back support keeps you stable so you can focus purely on the calves.",
    "avoidIf": [],
    "icon": "🏋️",
    "mechanic": "Isolation",
    "pattern": "Squat",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Hack Machine Calf Raise"
    ],
    "category": "strength"
  },
  {
    "id": "kettlebell-calf-raise",
    "name": "Kettlebell Calf Raise",
    "muscleGroup": "Calves",
    "secondaryMuscles": [],
    "equipment": [
      "kettlebell"
    ],
    "difficulty": "Beginner",
    "cue": "Hold a kettlebell and lift your heels high.",
    "description": "Stand tall holding a kettlebell in front of you or by your side. Push through the balls of your feet to raise your heels, squeeze, then lower slowly. Keep your torso upright so the weight stays over your midfoot.",
    "avoidIf": [],
    "icon": "🔔",
    "mechanic": "Isolation",
    "pattern": "Squat",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "KB Calf Raise"
    ],
    "category": "strength"
  },
  {
    "id": "kettlebell-seated-calf-raise",
    "name": "Kettlebell Seated Calf Raise",
    "muscleGroup": "Calves",
    "secondaryMuscles": [],
    "equipment": [
      "kettlebell"
    ],
    "difficulty": "Beginner",
    "cue": "Rest a kettlebell on your knee and press your heel up.",
    "description": "Sit with knees bent 90 degrees and a kettlebell resting on one or both thighs near the knees. Drive through the balls of your feet to lift your heels, then lower slowly. Bent knees shift the work to the deeper soleus.",
    "avoidIf": [],
    "icon": "🔔",
    "mechanic": "Isolation",
    "pattern": "Squat",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "KB Seated Calf Raise"
    ],
    "category": "strength"
  },
  {
    "id": "band-calf-raise",
    "name": "Band Calf Raise",
    "muscleGroup": "Calves",
    "secondaryMuscles": [],
    "equipment": [
      "resistance-band"
    ],
    "difficulty": "Beginner",
    "cue": "Loop the band under your feet and press up against it.",
    "description": "Stand on the middle of a resistance band and hold the ends at your shoulders or sides. Push through the balls of your feet to raise your heels against the band's pull, then lower slowly. The band adds the most tension right at the top where the squeeze happens.",
    "avoidIf": [],
    "icon": "🟢",
    "mechanic": "Isolation",
    "pattern": "Squat",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Resistance Band Calf Raise"
    ],
    "category": "strength"
  },
  {
    "id": "band-seated-calf-raise",
    "name": "Band Seated Calf Raise",
    "muscleGroup": "Calves",
    "secondaryMuscles": [],
    "equipment": [
      "resistance-band"
    ],
    "difficulty": "Beginner",
    "cue": "Band over your knees, drive your heels up.",
    "description": "Sit with knees bent and loop a band under the balls of your feet, holding the ends over your knees for resistance. Press your heels up against the band, then lower slowly. A simple way to load the soleus with no weights.",
    "avoidIf": [],
    "icon": "🟢",
    "mechanic": "Isolation",
    "pattern": "Squat",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Seated Band Calf Raise"
    ],
    "category": "strength"
  },
  {
    "id": "banded-single-leg-calf-raise",
    "name": "Banded Single-Leg Calf Raise",
    "muscleGroup": "Calves",
    "secondaryMuscles": [],
    "equipment": [
      "resistance-band"
    ],
    "difficulty": "Intermediate",
    "cue": "One foot on the band, press that heel high.",
    "description": "Stand on the band with one foot and hold the ends at that side, balancing with a wall if needed. Raise your heel against the band's pull, then lower slowly. Single-leg plus band tension is a strong combo for stubborn calves.",
    "avoidIf": [
      "balance"
    ],
    "icon": "🟢",
    "mechanic": "Isolation",
    "pattern": "Squat",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Single Leg Band Calf Raise"
    ],
    "category": "strength"
  },
  {
    "id": "eccentric-heel-drop",
    "name": "Eccentric Heel Drop",
    "muscleGroup": "Calves",
    "secondaryMuscles": [],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Rise on two feet, then lower slowly on one.",
    "description": "Stand on the balls of your feet on a step. Push up with both feet, shift your weight to one leg, then lower that heel slowly below the step over three to four seconds. The slow lowering is great for calf strength and Achilles tendon health.",
    "avoidIf": [],
    "icon": "🦶",
    "mechanic": "Isolation",
    "pattern": "Squat",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "mobility"
    ],
    "homeFriendly": true,
    "aliases": [
      "Heel Drop Stretch"
    ],
    "category": "strength"
  },
  {
    "id": "forearm-plank",
    "name": "Forearm Plank",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Brace your core and hold a straight line from head to heels.",
    "description": "Maintain tension throughout your trunk while breathing steadily. Avoid letting your hips sag or rise.",
    "avoidIf": [],
    "icon": "🧘",
    "mechanic": "Isolation",
    "pattern": "Core",
    "force": "Static",
    "unilateral": false,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Plank",
      "Elbow Plank"
    ],
    "category": "strength"
  },
  {
    "id": "high-plank",
    "name": "High Plank",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Press into the floor and hold a rigid straight-arm plank.",
    "description": "Keep your core engaged and body straight. Avoid dumping weight into your shoulders.",
    "avoidIf": [
      "wrist"
    ],
    "icon": "🧘",
    "mechanic": "Isolation",
    "pattern": "Core",
    "force": "Static",
    "unilateral": false,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Straight-Arm Plank"
    ],
    "category": "strength"
  },
  {
    "id": "side-plank",
    "name": "Side Plank",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "Support on one forearm and stack your body in a straight line.",
    "description": "Engage your obliques to hold a stable position. Avoid rotating your hips forward or back.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🧘",
    "mechanic": "Isolation",
    "pattern": "Core",
    "force": "Static",
    "unilateral": true,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Lateral Plank"
    ],
    "category": "strength"
  },
  {
    "id": "side-plank-hip-dip",
    "name": "Side Plank Hip Dip",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "Lower and raise your hips while holding a side plank.",
    "description": "Control the movement through your obliques. Avoid collapsing your shoulder.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🧘",
    "mechanic": "Isolation",
    "pattern": "Core",
    "force": "Static",
    "unilateral": true,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Side Plank Dips"
    ],
    "category": "strength"
  },
  {
    "id": "plank-shoulder-tap",
    "name": "Plank Shoulder Tap",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "Tap the opposite shoulder while holding a stable high plank.",
    "description": "Minimize hip rotation during each tap. Avoid shifting your weight excessively.",
    "avoidIf": [
      "wrist"
    ],
    "icon": "🖐️",
    "mechanic": "Isolation",
    "pattern": "Core",
    "force": "Static",
    "unilateral": true,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Shoulder Tap Plank"
    ],
    "category": "strength"
  },
  {
    "id": "body-saw-plank",
    "name": "Body Saw Plank",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Advanced",
    "cue": "Rock your body forward and back while holding a forearm plank.",
    "description": "Maintain a rigid plank throughout. Avoid dropping your hips.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🪚",
    "mechanic": "Isolation",
    "pattern": "Core",
    "force": "Static",
    "unilateral": false,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Plank Body Saw"
    ],
    "category": "strength"
  },
  {
    "id": "bear-plank-hold",
    "name": "Bear Plank Hold",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Hover your knees an inch above the floor while bracing your core.",
    "description": "Keep a stable spine and steady breathing. Avoid shifting your weight excessively.",
    "avoidIf": [
      "wrist"
    ],
    "icon": "🐻",
    "mechanic": "Isolation",
    "pattern": "Core",
    "force": "Static",
    "unilateral": false,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Bear Hold"
    ],
    "category": "strength"
  },
  {
    "id": "plank-knee-to-elbow",
    "name": "Plank Knee to Elbow",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "Drive your knee toward your same-side elbow from a plank.",
    "description": "Maintain shoulder stability and core tension. Avoid rotating excessively.",
    "avoidIf": [
      "wrist"
    ],
    "icon": "🦵",
    "mechanic": "Compound",
    "pattern": "Core",
    "force": "Static",
    "unilateral": true,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Spiderman Plank"
    ],
    "category": "strength"
  },
  {
    "id": "dead-bug",
    "name": "Dead Bug",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Lower opposite arm and leg while keeping your lower back flat.",
    "description": "Move slowly while maintaining core tension. Avoid arching your lower back.",
    "avoidIf": [],
    "icon": "🪲",
    "mechanic": "Isolation",
    "pattern": "Core",
    "force": "Static",
    "unilateral": true,
    "focus": [
      "strength",
      "mobility"
    ],
    "homeFriendly": true,
    "aliases": [
      "Deadbug"
    ],
    "category": "strength"
  },
  {
    "id": "bird-dog",
    "name": "Bird Dog",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [
      "Back",
      "Glutes"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Extend opposite arm and leg while keeping your spine neutral.",
    "description": "Focus on stability through your trunk. Avoid rotating your hips.",
    "avoidIf": [],
    "icon": "🐕",
    "mechanic": "Isolation",
    "pattern": "Core",
    "force": "Static",
    "unilateral": true,
    "focus": [
      "strength",
      "mobility"
    ],
    "homeFriendly": true,
    "aliases": [
      "Quadruped Reach"
    ],
    "category": "strength"
  },
  {
    "id": "bird-dog-hold",
    "name": "Bird Dog Hold",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [
      "Back"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Extend opposite arm and leg and pause while staying balanced.",
    "description": "Keep your hips square and spine neutral. Avoid rotating toward the lifted side.",
    "avoidIf": [],
    "icon": "🐕",
    "mechanic": "Isolation",
    "pattern": "Core",
    "force": "Static",
    "unilateral": true,
    "focus": [
      "strength",
      "mobility"
    ],
    "homeFriendly": true,
    "aliases": [
      "Quadruped Hold"
    ],
    "category": "mobility"
  },
  {
    "id": "side-plank-knee-drive",
    "name": "Side Plank Knee Drive",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Advanced",
    "cue": "Drive your top knee toward your chest from a side plank.",
    "description": "Maintain side-plank alignment while moving. Avoid collapsing your shoulder.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "↔️",
    "mechanic": "Compound",
    "pattern": "Core",
    "force": "Pull",
    "unilateral": true,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Side Plank Crunch"
    ],
    "category": "strength"
  },
  {
    "id": "crunch",
    "name": "Crunch",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Curl your shoulders toward your hips using your abs.",
    "description": "Move with control and avoid pulling on your neck. Avoid excessive speed.",
    "avoidIf": [
      "lower-back",
      "neck",
      "pregnancy"
    ],
    "icon": "💪",
    "mechanic": "Isolation",
    "pattern": "Core",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Ab Crunch"
    ],
    "category": "strength"
  },
  {
    "id": "reverse-crunch",
    "name": "Reverse Crunch",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Curl your hips upward while keeping your lower back controlled.",
    "description": "Use your abs to lift your pelvis rather than swinging your legs. Avoid momentum.",
    "avoidIf": [
      "lower-back",
      "neck",
      "pregnancy"
    ],
    "icon": "🔄",
    "mechanic": "Isolation",
    "pattern": "Core",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Pelvic Curl"
    ],
    "category": "strength"
  },
  {
    "id": "bicycle-crunch",
    "name": "Bicycle Crunch",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "Rotate your torso, bringing opposite elbow toward opposite knee.",
    "description": "Control each rotation through your core. Avoid pulling your neck forward.",
    "avoidIf": [
      "lower-back",
      "neck",
      "pregnancy"
    ],
    "icon": "🚲",
    "mechanic": "Isolation",
    "pattern": "Rotation",
    "force": "Pull",
    "unilateral": true,
    "focus": [
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Bicycle Twist"
    ],
    "category": "strength"
  },
  {
    "id": "sit-up",
    "name": "Sit-Up",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "Roll your torso up until your chest moves toward your knees.",
    "description": "Use your core instead of momentum. Avoid straining your neck.",
    "avoidIf": [
      "lower-back",
      "neck",
      "pregnancy"
    ],
    "icon": "💪",
    "mechanic": "Isolation",
    "pattern": "Core",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Full Sit-Up"
    ],
    "category": "strength"
  },
  {
    "id": "v-up",
    "name": "V-Up",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Advanced",
    "cue": "Lift your torso and legs together to form a V shape.",
    "description": "Move with control and keep your core engaged. Avoid using momentum.",
    "avoidIf": [
      "lower-back",
      "neck",
      "pregnancy"
    ],
    "icon": "🔺",
    "mechanic": "Isolation",
    "pattern": "Core",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Jackknife Sit-Up"
    ],
    "category": "strength"
  },
  {
    "id": "tuck-up",
    "name": "Tuck-Up",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "Bring your knees and torso together, balancing on your hips.",
    "description": "Control the extension and contraction phases. Avoid rounding excessively.",
    "avoidIf": [
      "lower-back",
      "neck",
      "pregnancy"
    ],
    "icon": "🔺",
    "mechanic": "Isolation",
    "pattern": "Core",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Tuck Crunch"
    ],
    "category": "strength"
  },
  {
    "id": "toe-touch-crunch",
    "name": "Toe Touch Crunch",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "Reach toward your toes while contracting your abs.",
    "description": "Lift with your core instead of your neck. Avoid using momentum.",
    "avoidIf": [
      "lower-back",
      "neck",
      "pregnancy"
    ],
    "icon": "👣",
    "mechanic": "Isolation",
    "pattern": "Core",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Toe Touch"
    ],
    "category": "strength"
  },
  {
    "id": "side-crunch",
    "name": "Side Crunch",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Lift your shoulder toward your hip using your obliques.",
    "description": "Focus on shortening the side of your torso. Avoid pulling your neck.",
    "avoidIf": [
      "lower-back",
      "neck"
    ],
    "icon": "↔️",
    "mechanic": "Isolation",
    "pattern": "Core",
    "force": "Pull",
    "unilateral": true,
    "focus": [
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Oblique Crunch"
    ],
    "category": "strength"
  },
  {
    "id": "standing-oblique-crunch",
    "name": "Standing Oblique Crunch",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Bring your elbow toward your raised knee using your side abs.",
    "description": "Contract your obliques through controlled side bending. Avoid twisting excessively.",
    "avoidIf": [
      "lower-back",
      "neck"
    ],
    "icon": "↔️",
    "mechanic": "Isolation",
    "pattern": "Core",
    "force": "Pull",
    "unilateral": true,
    "focus": [
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Standing Side Crunch"
    ],
    "category": "strength"
  },
  {
    "id": "lying-leg-raise",
    "name": "Lying Leg Raise",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "Raise straight legs upward while keeping your lower back controlled.",
    "description": "Control the lowering phase and avoid swinging. Avoid arching your lower back.",
    "avoidIf": [
      "lower-back",
      "neck",
      "pregnancy"
    ],
    "icon": "🦵",
    "mechanic": "Isolation",
    "pattern": "Core",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Straight Leg Raise"
    ],
    "category": "strength"
  },
  {
    "id": "flutter-kick",
    "name": "Flutter Kicks",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Alternate small controlled leg lifts while bracing your core.",
    "description": "Keep movements low and controlled. Avoid arching your back.",
    "avoidIf": [
      "lower-back",
      "pregnancy"
    ],
    "icon": "🌊",
    "mechanic": "Isolation",
    "pattern": "Core",
    "force": "Static",
    "unilateral": true,
    "focus": [
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Flutter Kick"
    ],
    "category": "conditioning"
  },
  {
    "id": "scissor-kick",
    "name": "Scissor Kicks",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "Cross your legs in alternating scissor motions while bracing.",
    "description": "Maintain a stable torso throughout. Avoid lifting your lower back.",
    "avoidIf": [
      "lower-back",
      "pregnancy"
    ],
    "icon": "✂️",
    "mechanic": "Isolation",
    "pattern": "Core",
    "force": "Static",
    "unilateral": true,
    "focus": [
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Scissor Abs"
    ],
    "category": "conditioning"
  },
  {
    "id": "lying-knee-tuck",
    "name": "Lying Knee Tuck",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Pull your knees toward your chest while curling your hips upward.",
    "description": "Use controlled abdominal contraction. Avoid swinging your legs.",
    "avoidIf": [
      "lower-back",
      "neck",
      "pregnancy"
    ],
    "icon": "🔄",
    "mechanic": "Isolation",
    "pattern": "Core",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Knee Tuck"
    ],
    "category": "strength"
  },
  {
    "id": "hollow-body-hold",
    "name": "Hollow Body Hold",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "Press your lower back into the floor while holding a hollow position.",
    "description": "Maintain full-body tension throughout the hold. Avoid letting your back arch.",
    "avoidIf": [
      "lower-back",
      "pregnancy"
    ],
    "icon": "⭕",
    "mechanic": "Isolation",
    "pattern": "Core",
    "force": "Static",
    "unilateral": false,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Hollow Hold"
    ],
    "category": "strength"
  },
  {
    "id": "hollow-body-rock",
    "name": "Hollow Body Rock",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Advanced",
    "cue": "Hold a hollow position and rock gently without losing tension.",
    "description": "Keep your ribs down and body rigid. Avoid relaxing between rocks.",
    "avoidIf": [
      "lower-back",
      "pregnancy"
    ],
    "icon": "🌙",
    "mechanic": "Isolation",
    "pattern": "Core",
    "force": "Static",
    "unilateral": false,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Hollow Rock"
    ],
    "category": "strength"
  },
  {
    "id": "boat-hold",
    "name": "Boat Hold",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "Balance on your sit bones with torso and legs elevated.",
    "description": "Maintain a strong core position throughout the hold. Avoid collapsing your chest.",
    "avoidIf": [
      "lower-back",
      "pregnancy"
    ],
    "icon": "⛵",
    "mechanic": "Isolation",
    "pattern": "Core",
    "force": "Static",
    "unilateral": false,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Navasana",
      "Boat Pose"
    ],
    "category": "strength"
  },
  {
    "id": "windshield-wiper",
    "name": "Windshield Wiper",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Advanced",
    "cue": "Rotate your legs side to side while controlling your core.",
    "description": "Move slowly through rotation. Avoid using momentum from your hips.",
    "avoidIf": [
      "lower-back",
      "pregnancy"
    ],
    "icon": "🚗",
    "mechanic": "Compound",
    "pattern": "Rotation",
    "force": "Static",
    "unilateral": true,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Floor Windshield Wipers"
    ],
    "category": "strength"
  },
  {
    "id": "crab-reach",
    "name": "Crab Reach",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [
      "Shoulders",
      "Glutes"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "Rotate from a crab position and reach one arm overhead.",
    "description": "Move through controlled rotation and extension. Avoid collapsing into your shoulder.",
    "avoidIf": [
      "shoulder",
      "wrist"
    ],
    "icon": "🦀",
    "mechanic": "Compound",
    "pattern": "Rotation",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "mobility",
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Crab Rotation"
    ],
    "category": "mobility"
  },
  {
    "id": "hanging-knee-raise",
    "name": "Hanging Knee Raise",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "pull-up-bar"
    ],
    "difficulty": "Intermediate",
    "cue": "Hang from a bar and raise your knees toward your chest.",
    "description": "Control the movement without swinging. Avoid using momentum.",
    "avoidIf": [
      "lower-back",
      "shoulder",
      "neck",
      "pregnancy"
    ],
    "icon": "🪜",
    "mechanic": "Isolation",
    "pattern": "Core",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": false,
    "aliases": [
      "Hanging Knee Lift"
    ],
    "category": "strength"
  },
  {
    "id": "hanging-leg-raise",
    "name": "Hanging Leg Raise",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "pull-up-bar"
    ],
    "difficulty": "Advanced",
    "cue": "Raise straight legs while hanging from an overhead bar.",
    "description": "Maintain control throughout. Avoid swinging or using momentum.",
    "avoidIf": [
      "lower-back",
      "shoulder",
      "neck",
      "pregnancy"
    ],
    "icon": "⬆️",
    "mechanic": "Isolation",
    "pattern": "Core",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": false,
    "aliases": [
      "Straight Leg Raise Hang"
    ],
    "category": "strength"
  },
  {
    "id": "toes-to-bar",
    "name": "Toes-to-Bar",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "pull-up-bar"
    ],
    "difficulty": "Advanced",
    "cue": "Bring your toes to the bar under control.",
    "description": "Use your core to drive the movement. Avoid excessive momentum.",
    "avoidIf": [
      "lower-back",
      "shoulder",
      "neck",
      "pregnancy"
    ],
    "icon": "🦶",
    "mechanic": "Compound",
    "pattern": "Core",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "power"
    ],
    "homeFriendly": false,
    "aliases": [
      "T2B"
    ],
    "category": "strength"
  },
  {
    "id": "hanging-oblique-knee-raise",
    "name": "Hanging Oblique Knee Raise",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "pull-up-bar"
    ],
    "difficulty": "Advanced",
    "cue": "Raise your knees toward one side while hanging.",
    "description": "Rotate under control using your obliques. Avoid twisting aggressively.",
    "avoidIf": [
      "lower-back",
      "shoulder",
      "neck",
      "pregnancy"
    ],
    "icon": "↔️",
    "mechanic": "Isolation",
    "pattern": "Rotation",
    "force": "Pull",
    "unilateral": true,
    "focus": [
      "strength"
    ],
    "homeFriendly": false,
    "aliases": [
      "Hanging Side Knee Raise"
    ],
    "category": "strength"
  },
  {
    "id": "weighted-crunch-dumbbell",
    "name": "Weighted Crunch",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Hold a dumbbell at your chest and curl your torso upward.",
    "description": "Contract your abs to lift your shoulders. Avoid pulling your neck forward.",
    "avoidIf": [
      "lower-back",
      "neck",
      "pregnancy"
    ],
    "icon": "🏋️",
    "mechanic": "Isolation",
    "pattern": "Core",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Weighted Crunch"
    ],
    "category": "strength"
  },
  {
    "id": "weighted-sit-up-dumbbell",
    "name": "Weighted Sit-Up",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Hold a dumbbell and sit up under control.",
    "description": "Use your core to raise your torso and lower slowly. Avoid jerking or pulling your neck.",
    "avoidIf": [
      "lower-back",
      "neck",
      "pregnancy"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Core",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Sit-Up"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-side-bend",
    "name": "Dumbbell Side Bend",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Beginner",
    "cue": "Hold one dumbbell and bend sideways under control.",
    "description": "Engage the obliques to return upright. Avoid twisting instead of bending.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🏋️",
    "mechanic": "Isolation",
    "pattern": "Core",
    "force": "Pull",
    "unilateral": true,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Side Bend"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-russian-twist",
    "name": "Dumbbell Russian Twist",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Rotate your torso side to side while holding a dumbbell.",
    "description": "Move through controlled rotation using your core. Avoid rounding aggressively.",
    "avoidIf": [
      "lower-back",
      "pregnancy"
    ],
    "icon": "🔄",
    "mechanic": "Isolation",
    "pattern": "Rotation",
    "force": "Static",
    "unilateral": false,
    "focus": [
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Weighted Russian Twist"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-woodchopper",
    "name": "Dumbbell Woodchopper",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Move the dumbbell diagonally across your body with controlled rotation.",
    "description": "Rotate through your trunk while staying controlled. Avoid using only your arms.",
    "avoidIf": [
      "lower-back",
      "pregnancy"
    ],
    "icon": "🪓",
    "mechanic": "Compound",
    "pattern": "Rotation",
    "force": "Pull",
    "unilateral": true,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Wood Chop"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-suitcase-carry",
    "name": "Dumbbell Suitcase Carry",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Beginner",
    "cue": "Carry one dumbbell at your side while resisting lateral bending.",
    "description": "Walk tall with a braced core. Avoid leaning toward the weight.",
    "avoidIf": [],
    "icon": "🧳",
    "mechanic": "Isolation",
    "pattern": "Carry",
    "force": "Static",
    "unilateral": true,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Suitcase Walk"
    ],
    "category": "carry"
  },
  {
    "id": "kettlebell-windmill",
    "name": "Kettlebell Windmill",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "kettlebell"
    ],
    "difficulty": "Advanced",
    "cue": "Hold a kettlebell overhead and hinge sideways toward the floor.",
    "description": "Maintain a strong overhead position and rotate through the trunk. Avoid collapsing the shoulder.",
    "avoidIf": [
      "shoulder",
      "lower-back",
      "balance"
    ],
    "icon": "🌬️",
    "mechanic": "Compound",
    "pattern": "Rotation",
    "force": "Static",
    "unilateral": true,
    "focus": [
      "strength",
      "mobility"
    ],
    "homeFriendly": true,
    "aliases": [
      "KB Windmill"
    ],
    "category": "strength"
  },
  {
    "id": "kettlebell-side-bend",
    "name": "Kettlebell Side Bend",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [],
    "equipment": [
      "kettlebell"
    ],
    "difficulty": "Beginner",
    "cue": "Hold a kettlebell and bend laterally under control.",
    "description": "Engage your obliques to return to standing. Avoid rotating the torso.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🔔",
    "mechanic": "Isolation",
    "pattern": "Core",
    "force": "Pull",
    "unilateral": true,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "KB Side Bend"
    ],
    "category": "strength"
  },
  {
    "id": "kettlebell-russian-twist",
    "name": "Kettlebell Russian Twist",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [],
    "equipment": [
      "kettlebell"
    ],
    "difficulty": "Intermediate",
    "cue": "Rotate your torso while holding a kettlebell in front of you.",
    "description": "Control each rotation using your core. Avoid excessive spinal movement.",
    "avoidIf": [
      "lower-back",
      "pregnancy"
    ],
    "icon": "🔔",
    "mechanic": "Isolation",
    "pattern": "Rotation",
    "force": "Static",
    "unilateral": false,
    "focus": [
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "KB Russian Twist"
    ],
    "category": "strength"
  },
  {
    "id": "kettlebell-suitcase-carry",
    "name": "Kettlebell Suitcase Carry",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "kettlebell"
    ],
    "difficulty": "Intermediate",
    "cue": "Carry one kettlebell at your side while maintaining upright posture.",
    "description": "Resist side bending and walk with control. Avoid leaning toward the weight.",
    "avoidIf": [],
    "icon": "🔔",
    "mechanic": "Isolation",
    "pattern": "Carry",
    "force": "Static",
    "unilateral": true,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "KB Suitcase Carry"
    ],
    "category": "carry"
  },
  {
    "id": "medicine-ball-russian-twist",
    "name": "Medicine Ball Russian Twist",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [],
    "equipment": [
      "medicine-ball"
    ],
    "difficulty": "Intermediate",
    "cue": "Rotate side to side while holding a medicine ball.",
    "description": "Use controlled trunk rotation. Avoid forcing the range of motion.",
    "avoidIf": [
      "lower-back",
      "pregnancy"
    ],
    "icon": "🏐",
    "mechanic": "Isolation",
    "pattern": "Rotation",
    "force": "Static",
    "unilateral": false,
    "focus": [
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Med Ball Twist"
    ],
    "category": "strength"
  },
  {
    "id": "medicine-ball-sit-up-throw",
    "name": "Medicine Ball Sit-Up Throw",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "medicine-ball"
    ],
    "difficulty": "Advanced",
    "cue": "Perform a sit-up and throw the medicine ball at the top.",
    "description": "Generate power from your core and control the return. Avoid using momentum alone.",
    "avoidIf": [
      "lower-back",
      "neck",
      "pregnancy"
    ],
    "icon": "🏐",
    "mechanic": "Compound",
    "pattern": "Core",
    "force": "Explosive",
    "unilateral": false,
    "focus": [
      "power"
    ],
    "homeFriendly": true,
    "aliases": [
      "Med Ball Sit-Up Throw"
    ],
    "category": "power"
  },
  {
    "id": "medicine-ball-woodchopper",
    "name": "Medicine Ball Woodchopper",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "medicine-ball"
    ],
    "difficulty": "Intermediate",
    "cue": "Rotate and drive the medicine ball diagonally across your body.",
    "description": "Use your trunk to create movement. Avoid twisting only with your arms.",
    "avoidIf": [
      "lower-back",
      "pregnancy"
    ],
    "icon": "🪓",
    "mechanic": "Compound",
    "pattern": "Rotation",
    "force": "Explosive",
    "unilateral": true,
    "focus": [
      "power",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Med Ball Chop"
    ],
    "category": "power"
  },
  {
    "id": "medicine-ball-v-up-pass",
    "name": "Medicine Ball V-Up Pass",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "medicine-ball"
    ],
    "difficulty": "Advanced",
    "cue": "Pass a medicine ball between your hands and feet during a V-up.",
    "description": "Keep the movement controlled through your core. Avoid straining your neck.",
    "avoidIf": [
      "lower-back",
      "neck",
      "pregnancy"
    ],
    "icon": "🏐",
    "mechanic": "Compound",
    "pattern": "Core",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Med Ball V-Up"
    ],
    "category": "strength"
  },
  {
    "id": "kneeling-ab-wheel-rollout",
    "name": "Kneeling Ab-Wheel Rollout",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "ab-wheel"
    ],
    "difficulty": "Advanced",
    "cue": "Roll forward from your knees while keeping a braced core.",
    "description": "Control the rollout and keep your spine neutral. Avoid letting your lower back sag.",
    "avoidIf": [
      "lower-back",
      "shoulder"
    ],
    "icon": "⭕",
    "mechanic": "Compound",
    "pattern": "Core",
    "force": "Static",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Ab Wheel Rollout"
    ],
    "category": "strength"
  },
  {
    "id": "standing-ab-wheel-rollout",
    "name": "Standing Ab-Wheel Rollout",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "ab-wheel"
    ],
    "difficulty": "Advanced",
    "cue": "Roll the wheel forward from standing while keeping full-body tension.",
    "description": "Brace strongly and control the return. Avoid extending through the lower back.",
    "avoidIf": [
      "lower-back",
      "shoulder"
    ],
    "icon": "⭕",
    "mechanic": "Compound",
    "pattern": "Core",
    "force": "Static",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Standing Rollout"
    ],
    "category": "strength"
  },
  {
    "id": "cable-crunch",
    "name": "Cable Crunch",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [],
    "equipment": [
      "cable"
    ],
    "difficulty": "Intermediate",
    "cue": "Kneel at a cable station and curl your ribs toward your pelvis.",
    "description": "Contract your abs through spinal flexion while controlling the weight. Avoid pulling with your arms.",
    "avoidIf": [
      "lower-back",
      "neck",
      "pregnancy"
    ],
    "icon": "🔗",
    "mechanic": "Isolation",
    "pattern": "Core",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Kneeling Cable Crunch",
      "Rope Cable Crunch"
    ],
    "category": "strength"
  },
  {
    "id": "cable-woodchopper",
    "name": "Cable Woodchopper",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "cable"
    ],
    "difficulty": "Intermediate",
    "cue": "Pull the cable diagonally across your body using controlled rotation.",
    "description": "Rotate through your trunk while keeping tension on the cable. Avoid twisting only with your arms.",
    "avoidIf": [
      "lower-back",
      "pregnancy"
    ],
    "icon": "🪓",
    "mechanic": "Compound",
    "pattern": "Rotation",
    "force": "Pull",
    "unilateral": true,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": false,
    "aliases": [
      "Cable Chop",
      "High-to-Low Chop"
    ],
    "category": "strength"
  },
  {
    "id": "standing-cable-oblique-twist",
    "name": "Standing Cable Oblique Twist",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [],
    "equipment": [
      "cable"
    ],
    "difficulty": "Intermediate",
    "cue": "Rotate your torso against cable resistance while staying tall.",
    "description": "Move with controlled rotation from your core. Avoid yanking the handle with your arms.",
    "avoidIf": [
      "lower-back",
      "pregnancy"
    ],
    "icon": "🔗",
    "mechanic": "Isolation",
    "pattern": "Rotation",
    "force": "Pull",
    "unilateral": true,
    "focus": [
      "endurance"
    ],
    "homeFriendly": false,
    "aliases": [
      "Cable Oblique Rotation"
    ],
    "category": "strength"
  },
  {
    "id": "cable-pallof-press",
    "name": "Cable Pallof Press",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "cable"
    ],
    "difficulty": "Intermediate",
    "cue": "Press the cable straight out while resisting rotation.",
    "description": "Maintain a square stance and brace against the pull. Avoid rotating toward the weight.",
    "avoidIf": [],
    "icon": "🔒",
    "mechanic": "Isolation",
    "pattern": "Core",
    "force": "Static",
    "unilateral": true,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": false,
    "aliases": [
      "Pallof Press"
    ],
    "category": "strength"
  },
  {
    "id": "ab-crunch-machine",
    "name": "Ab Crunch Machine",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [],
    "equipment": [
      "machine"
    ],
    "difficulty": "Beginner",
    "cue": "Sit in the machine and curl your torso forward against resistance.",
    "description": "Focus on contracting the abs rather than moving quickly. Avoid pulling with your neck.",
    "avoidIf": [
      "lower-back",
      "neck",
      "pregnancy"
    ],
    "icon": "🏋️",
    "mechanic": "Isolation",
    "pattern": "Core",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Machine Crunch"
    ],
    "category": "strength"
  },
  {
    "id": "torso-rotation-machine",
    "name": "Torso Rotation Machine",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [],
    "equipment": [
      "machine"
    ],
    "difficulty": "Intermediate",
    "cue": "Rotate your torso against resistance while keeping your hips stable.",
    "description": "Control the rotation through the obliques. Avoid forcing excessive range.",
    "avoidIf": [
      "lower-back",
      "pregnancy"
    ],
    "icon": "🔄",
    "mechanic": "Isolation",
    "pattern": "Rotation",
    "force": "Pull",
    "unilateral": true,
    "focus": [
      "strength"
    ],
    "homeFriendly": false,
    "aliases": [
      "Rotary Torso Machine"
    ],
    "category": "strength"
  },
  {
    "id": "captains-chair-leg-raise",
    "name": "Captain's Chair Leg Raise",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "machine"
    ],
    "difficulty": "Intermediate",
    "cue": "Support yourself on the pads and raise your knees or legs.",
    "description": "Control the movement using your core. Avoid swinging your body.",
    "avoidIf": [
      "lower-back",
      "neck",
      "shoulder",
      "pregnancy"
    ],
    "icon": "🪜",
    "mechanic": "Isolation",
    "pattern": "Core",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": false,
    "aliases": [
      "Vertical Knee Raise"
    ],
    "category": "strength"
  },
  {
    "id": "band-pallof-press",
    "name": "Band Pallof Press",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "resistance-band"
    ],
    "difficulty": "Beginner",
    "cue": "Press a resistance band straight out while resisting rotation.",
    "description": "Keep your ribs down and core engaged. Avoid turning toward the band.",
    "avoidIf": [],
    "icon": "🔒",
    "mechanic": "Isolation",
    "pattern": "Core",
    "force": "Static",
    "unilateral": true,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Band Anti-Rotation Press"
    ],
    "category": "strength"
  },
  {
    "id": "band-woodchopper",
    "name": "Band Woodchopper",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "resistance-band"
    ],
    "difficulty": "Intermediate",
    "cue": "Rotate and pull the band diagonally across your body.",
    "description": "Use your core to drive the movement. Avoid letting the band pull you off balance.",
    "avoidIf": [
      "lower-back",
      "pregnancy"
    ],
    "icon": "🪓",
    "mechanic": "Compound",
    "pattern": "Rotation",
    "force": "Pull",
    "unilateral": true,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Resistance Band Chop"
    ],
    "category": "strength"
  },
  {
    "id": "band-dead-bug",
    "name": "Band Dead Bug",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [],
    "equipment": [
      "resistance-band"
    ],
    "difficulty": "Intermediate",
    "cue": "Hold band tension while extending opposite arms and legs.",
    "description": "Maintain a stable spine and braced core. Avoid arching your lower back.",
    "avoidIf": [],
    "icon": "🪲",
    "mechanic": "Isolation",
    "pattern": "Core",
    "force": "Static",
    "unilateral": true,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Banded Dead Bug"
    ],
    "category": "strength"
  },
  {
    "id": "trx-crunch",
    "name": "TRX Crunch",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "trx"
    ],
    "difficulty": "Intermediate",
    "cue": "Place your feet in the straps and draw your knees toward your chest.",
    "description": "Brace your core while controlling the straps. Avoid swinging your hips.",
    "avoidIf": [
      "lower-back",
      "shoulder",
      "pregnancy"
    ],
    "icon": "🔺",
    "mechanic": "Compound",
    "pattern": "Core",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": false,
    "aliases": [
      "Suspension Crunch"
    ],
    "category": "strength"
  },
  {
    "id": "trx-knee-tuck",
    "name": "TRX Knee Tuck",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "trx"
    ],
    "difficulty": "Intermediate",
    "cue": "Pull your knees toward your chest from a suspended plank.",
    "description": "Maintain a strong plank position throughout. Avoid dropping your hips.",
    "avoidIf": [
      "shoulder",
      "wrist",
      "lower-back"
    ],
    "icon": "🔺",
    "mechanic": "Compound",
    "pattern": "Core",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": false,
    "aliases": [
      "TRX Pike Tuck"
    ],
    "category": "strength"
  },
  {
    "id": "trx-pike",
    "name": "TRX Pike",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "trx"
    ],
    "difficulty": "Advanced",
    "cue": "Lift your hips upward into a pike from a suspended plank.",
    "description": "Move smoothly while keeping your body controlled. Avoid collapsing through your shoulders.",
    "avoidIf": [
      "shoulder",
      "wrist"
    ],
    "icon": "🔺",
    "mechanic": "Compound",
    "pattern": "Core",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": false,
    "aliases": [
      "Suspension Pike"
    ],
    "category": "strength"
  },
  {
    "id": "trx-oblique-crunch",
    "name": "TRX Oblique Crunch",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "trx"
    ],
    "difficulty": "Advanced",
    "cue": "Draw your knees diagonally toward one side in the straps.",
    "description": "Control the rotation through your core. Avoid swinging the straps.",
    "avoidIf": [
      "shoulder",
      "wrist",
      "lower-back"
    ],
    "icon": "↔️",
    "mechanic": "Compound",
    "pattern": "Rotation",
    "force": "Pull",
    "unilateral": true,
    "focus": [
      "strength"
    ],
    "homeFriendly": false,
    "aliases": [
      "TRX Side Crunch"
    ],
    "category": "strength"
  },
  {
    "id": "decline-sit-up-bench",
    "name": "Decline Sit-Up",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [],
    "equipment": [
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Anchor your feet on a decline bench and curl your torso upward.",
    "description": "Use your abs to control the ascent and descent. Avoid pulling with your neck.",
    "avoidIf": [
      "lower-back",
      "neck",
      "pregnancy"
    ],
    "icon": "🪑",
    "mechanic": "Compound",
    "pattern": "Core",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": false,
    "aliases": [
      "Decline Bench Sit-Up"
    ],
    "category": "strength"
  },
  {
    "id": "decline-crunch-bench",
    "name": "Decline Crunch",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [],
    "equipment": [
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Perform a shortened crunch on a decline bench.",
    "description": "Focus on curling your ribs toward your pelvis. Avoid lifting with your hips.",
    "avoidIf": [
      "lower-back",
      "neck",
      "pregnancy"
    ],
    "icon": "🪑",
    "mechanic": "Isolation",
    "pattern": "Core",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Decline Bench Crunch"
    ],
    "category": "strength"
  },
  {
    "id": "bench-leg-raise",
    "name": "Bench Leg Raise",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [],
    "equipment": [
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Lie on a bench and raise your legs using controlled core tension.",
    "description": "Keep the movement slow and controlled. Avoid arching the lower back.",
    "avoidIf": [
      "lower-back",
      "pregnancy"
    ],
    "icon": "🪑",
    "mechanic": "Isolation",
    "pattern": "Core",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Bench Reverse Crunch"
    ],
    "category": "strength"
  },
  {
    "id": "dragon-flag",
    "name": "Dragon Flag",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "bench"
    ],
    "difficulty": "Advanced",
    "cue": "Lower your extended body under control while anchored on a bench.",
    "description": "Maintain a rigid body position throughout. Avoid dropping your hips.",
    "avoidIf": [
      "lower-back",
      "shoulder",
      "neck"
    ],
    "icon": "🐉",
    "mechanic": "Isolation",
    "pattern": "Core",
    "force": "Static",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Dragon Flag Negative"
    ],
    "category": "strength"
  },
  {
    "id": "burpee",
    "name": "Burpee",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Chest",
      "Shoulders",
      "Quads",
      "Core/Abs"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "Move smoothly from squat to plank to jump without pausing.",
    "description": "Keep your core tight throughout the movement. Avoid collapsing through the lower back during the plank.",
    "avoidIf": [
      "knee",
      "high-impact",
      "wrist"
    ],
    "icon": "💥",
    "mechanic": "Compound",
    "pattern": "Conditioning",
    "force": "Explosive",
    "unilateral": false,
    "focus": [
      "endurance",
      "power"
    ],
    "homeFriendly": true,
    "aliases": [
      "Burpee Jump"
    ],
    "category": "conditioning"
  },
  {
    "id": "half-burpee",
    "name": "Half Burpee",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Core/Abs",
      "Quads"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Kick your feet back and forward without the jump.",
    "description": "Maintain a strong plank position. Avoid letting your hips sag.",
    "avoidIf": [
      "wrist"
    ],
    "icon": "⚡",
    "mechanic": "Compound",
    "pattern": "Conditioning",
    "force": "Explosive",
    "unilateral": false,
    "focus": [
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "No Jump Burpee"
    ],
    "category": "conditioning"
  },
  {
    "id": "squat-thrust",
    "name": "Squat Thrust",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Quads",
      "Core/Abs"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Kick your feet back into a plank and return quickly.",
    "description": "Move under control while maintaining trunk stability. Avoid bouncing through your shoulders.",
    "avoidIf": [
      "wrist"
    ],
    "icon": "↕️",
    "mechanic": "Compound",
    "pattern": "Conditioning",
    "force": "Explosive",
    "unilateral": false,
    "focus": [
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Plank Thrust"
    ],
    "category": "conditioning"
  },
  {
    "id": "jump-squat-conditioning",
    "name": "Jump Squat",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Quads",
      "Glutes",
      "Calves"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "Jump explosively and land softly before repeating.",
    "description": "Absorb the landing through your hips and knees. Avoid stiff-legged landings.",
    "avoidIf": [
      "knee",
      "high-impact"
    ],
    "icon": "🦘",
    "mechanic": "Compound",
    "pattern": "Conditioning",
    "force": "Explosive",
    "unilateral": false,
    "focus": [
      "power",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Bodyweight Jump Squat"
    ],
    "category": "power"
  },
  {
    "id": "tuck-jump",
    "name": "Tuck Jump",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Quads",
      "Core/Abs",
      "Calves"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Advanced",
    "cue": "Jump high and pull your knees toward your chest.",
    "description": "Land softly and reset each repetition. Avoid collapsing your knees inward.",
    "avoidIf": [
      "knee",
      "high-impact"
    ],
    "icon": "🚀",
    "mechanic": "Compound",
    "pattern": "Conditioning",
    "force": "Explosive",
    "unilateral": false,
    "focus": [
      "power"
    ],
    "homeFriendly": true,
    "aliases": [
      "Knee Tuck Jump"
    ],
    "category": "power"
  },
  {
    "id": "broad-jump",
    "name": "Broad Jump",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Glutes",
      "Quads",
      "Calves"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "Drive forward explosively and stick the landing.",
    "description": "Swing your arms to generate power. Avoid landing with locked knees.",
    "avoidIf": [
      "knee",
      "high-impact"
    ],
    "icon": "➡️",
    "mechanic": "Compound",
    "pattern": "Conditioning",
    "force": "Explosive",
    "unilateral": false,
    "focus": [
      "power"
    ],
    "homeFriendly": true,
    "aliases": [
      "Standing Broad Jump"
    ],
    "category": "power"
  },
  {
    "id": "star-jump",
    "name": "Star Jump",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Shoulders",
      "Quads",
      "Calves"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Explode upward while spreading your arms and legs wide.",
    "description": "Land softly and reset between jumps. Avoid hard landings.",
    "avoidIf": [
      "knee",
      "high-impact"
    ],
    "icon": "⭐",
    "mechanic": "Compound",
    "pattern": "Conditioning",
    "force": "Explosive",
    "unilateral": false,
    "focus": [
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "X Jump"
    ],
    "category": "conditioning"
  },
  {
    "id": "jumping-jack",
    "name": "Jumping Jack",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Shoulders",
      "Calves"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Jump your feet apart while raising your arms overhead.",
    "description": "Maintain a steady rhythm throughout. Avoid heavy landings.",
    "avoidIf": [
      "knee",
      "high-impact"
    ],
    "icon": "🤸",
    "mechanic": "Compound",
    "pattern": "Conditioning",
    "force": "Explosive",
    "unilateral": false,
    "focus": [
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Jacks"
    ],
    "category": "conditioning"
  },
  {
    "id": "high-knees-run",
    "name": "High Knees",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Core/Abs",
      "Quads",
      "Calves"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Drive your knees high while pumping your arms.",
    "description": "Stay light on your feet. Avoid leaning too far backward.",
    "avoidIf": [
      "knee",
      "high-impact"
    ],
    "icon": "🏃",
    "mechanic": "Compound",
    "pattern": "Conditioning",
    "force": "Explosive",
    "unilateral": true,
    "focus": [
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Running High Knees"
    ],
    "category": "conditioning"
  },
  {
    "id": "butt-kicks-run",
    "name": "Butt Kicks",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Hamstrings",
      "Calves"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Run in place while kicking your heels toward your glutes.",
    "description": "Keep your chest tall and cadence quick. Avoid excessive forward lean.",
    "avoidIf": [
      "knee",
      "high-impact"
    ],
    "icon": "🏃",
    "mechanic": "Compound",
    "pattern": "Conditioning",
    "force": "Explosive",
    "unilateral": true,
    "focus": [
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Heel Kicks"
    ],
    "category": "conditioning"
  },
  {
    "id": "mountain-climber-conditioning",
    "name": "Mountain Climber",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Core/Abs",
      "Shoulders"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "Drive alternating knees forward while maintaining a strong plank.",
    "description": "Keep your hips level throughout. Avoid bouncing excessively.",
    "avoidIf": [
      "wrist"
    ],
    "icon": "⛰️",
    "mechanic": "Compound",
    "pattern": "Conditioning",
    "force": "Explosive",
    "unilateral": true,
    "focus": [
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Mountain Climbers"
    ],
    "category": "conditioning"
  },
  {
    "id": "plank-jack",
    "name": "Plank Jack",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Core/Abs",
      "Shoulders"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "Jump your feet apart and together while holding a plank.",
    "description": "Brace your core to prevent hip sway. Avoid sagging through your shoulders.",
    "avoidIf": [
      "wrist"
    ],
    "icon": "🪵",
    "mechanic": "Compound",
    "pattern": "Conditioning",
    "force": "Explosive",
    "unilateral": false,
    "focus": [
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Plank Jump Jack"
    ],
    "category": "conditioning"
  },
  {
    "id": "bear-crawl-conditioning",
    "name": "Bear Crawl",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Core/Abs",
      "Shoulders",
      "Quads"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "Move opposite hand and foot while keeping your knees just off the floor.",
    "description": "Stay controlled and maintain a flat back. Avoid letting your hips rise too high.",
    "avoidIf": [
      "wrist"
    ],
    "icon": "🐻",
    "mechanic": "Compound",
    "pattern": "Conditioning",
    "force": "Static",
    "unilateral": true,
    "focus": [
      "endurance",
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Crawl"
    ],
    "category": "conditioning"
  },
  {
    "id": "inchworm-walkout",
    "name": "Inchworm",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Hamstrings",
      "Shoulders",
      "Core/Abs"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Walk your hands forward into a plank and back again.",
    "description": "Move slowly and keep your core engaged. Avoid rushing through the stretch.",
    "avoidIf": [
      "wrist"
    ],
    "icon": "🐛",
    "mechanic": "Compound",
    "pattern": "Conditioning",
    "force": "Static",
    "unilateral": false,
    "focus": [
      "mobility",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Walkout"
    ],
    "category": "conditioning"
  },
  {
    "id": "sprawl-conditioning",
    "name": "Sprawl",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Core/Abs",
      "Quads"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "Kick your legs back rapidly and return to standing.",
    "description": "Stay athletic throughout the movement. Avoid crashing into the floor.",
    "avoidIf": [
      "wrist",
      "knee"
    ],
    "icon": "⚔️",
    "mechanic": "Compound",
    "pattern": "Conditioning",
    "force": "Explosive",
    "unilateral": false,
    "focus": [
      "power",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Wrestling Sprawl"
    ],
    "category": "conditioning"
  },
  {
    "id": "lateral-shuffle",
    "name": "Lateral Shuffle",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Quads",
      "Glutes",
      "Calves"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Stay low and move laterally with quick controlled steps.",
    "description": "Keep your chest tall and hips back. Avoid crossing your feet.",
    "avoidIf": [
      "knee"
    ],
    "icon": "↔️",
    "mechanic": "Compound",
    "pattern": "Conditioning",
    "force": "Explosive",
    "unilateral": true,
    "focus": [
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Defensive Shuffle"
    ],
    "category": "conditioning"
  },
  {
    "id": "jump-rope-basic",
    "name": "Jump Rope",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Calves",
      "Shoulders"
    ],
    "equipment": [
      "jump-rope"
    ],
    "difficulty": "Beginner",
    "cue": "Bounce lightly on the balls of your feet, turning the rope from the wrists.",
    "description": "Keep jumps low and rhythmic with soft knees. Avoid landing heavily on flat feet.",
    "avoidIf": [
      "knee",
      "high-impact"
    ],
    "icon": "🪢",
    "mechanic": "Compound",
    "pattern": "Conditioning",
    "force": "Explosive",
    "unilateral": false,
    "focus": [
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Skipping"
    ],
    "category": "conditioning"
  },
  {
    "id": "boxer-skip",
    "name": "Boxer Skip",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Calves"
    ],
    "equipment": [
      "jump-rope"
    ],
    "difficulty": "Beginner",
    "cue": "Shift your weight side to side in a light, rhythmic skip.",
    "description": "Stay relaxed and springy on the balls of your feet. Avoid tensing your shoulders.",
    "avoidIf": [
      "knee",
      "high-impact"
    ],
    "icon": "🥊",
    "mechanic": "Compound",
    "pattern": "Conditioning",
    "force": "Explosive",
    "unilateral": true,
    "focus": [
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Boxer Shuffle Skip"
    ],
    "category": "conditioning"
  },
  {
    "id": "high-knee-jump-rope",
    "name": "High-Knee Jump Rope",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Calves",
      "Quads",
      "Core/Abs"
    ],
    "equipment": [
      "jump-rope"
    ],
    "difficulty": "Intermediate",
    "cue": "Drive your knees up to hip height with each rope turn.",
    "description": "Keep a fast, controlled cadence. Avoid leaning back as the knees rise.",
    "avoidIf": [
      "knee",
      "high-impact",
      "hip"
    ],
    "icon": "🪢",
    "mechanic": "Compound",
    "pattern": "Conditioning",
    "force": "Explosive",
    "unilateral": true,
    "focus": [
      "endurance",
      "power"
    ],
    "homeFriendly": true,
    "aliases": [
      "Running Rope"
    ],
    "category": "conditioning"
  },
  {
    "id": "double-unders",
    "name": "Double-Unders",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Calves",
      "Shoulders"
    ],
    "equipment": [
      "jump-rope"
    ],
    "difficulty": "Advanced",
    "cue": "Jump higher and pass the rope under your feet twice per jump.",
    "description": "Use quick wrist turns rather than big arm swings. Avoid piking or tucking your legs.",
    "avoidIf": [
      "knee",
      "high-impact"
    ],
    "icon": "🪢",
    "mechanic": "Compound",
    "pattern": "Conditioning",
    "force": "Explosive",
    "unilateral": false,
    "focus": [
      "power",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Double Under"
    ],
    "category": "power"
  },
  {
    "id": "dumbbell-thruster",
    "name": "Dumbbell Thruster",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Quads",
      "Shoulders",
      "Core/Abs"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Drive from the squat directly into an overhead press.",
    "description": "Use leg drive to power the press. Avoid pressing with a relaxed core.",
    "avoidIf": [
      "knee",
      "shoulder",
      "lower-back"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Conditioning",
    "force": "Explosive",
    "unilateral": false,
    "focus": [
      "power",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Thruster"
    ],
    "category": "conditioning"
  },
  {
    "id": "dumbbell-clean-and-press",
    "name": "Dumbbell Clean and Press",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Shoulders",
      "Glutes",
      "Core/Abs"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Advanced",
    "cue": "Explosively clean the dumbbells before pressing overhead.",
    "description": "Drive from the hips and finish overhead. Avoid curling the weights.",
    "avoidIf": [
      "shoulder",
      "lower-back"
    ],
    "icon": "💪",
    "mechanic": "Compound",
    "pattern": "Conditioning",
    "force": "Explosive",
    "unilateral": false,
    "focus": [
      "power",
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Clean Press"
    ],
    "category": "power"
  },
  {
    "id": "dumbbell-snatch",
    "name": "Dumbbell Snatch",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Shoulders",
      "Glutes",
      "Core/Abs"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Advanced",
    "cue": "Drive the dumbbell overhead in one smooth explosive motion.",
    "description": "Generate power through the hips. Avoid pulling primarily with the arm.",
    "avoidIf": [
      "shoulder",
      "lower-back"
    ],
    "icon": "⚡",
    "mechanic": "Compound",
    "pattern": "Hinge",
    "force": "Explosive",
    "unilateral": true,
    "focus": [
      "power"
    ],
    "homeFriendly": true,
    "aliases": [
      "Single Arm DB Snatch"
    ],
    "category": "power"
  },
  {
    "id": "dumbbell-swing",
    "name": "Dumbbell Swing",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Glutes",
      "Hamstrings",
      "Core/Abs"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Snap the hips to swing the dumbbell to chest height.",
    "description": "Drive with your hips instead of lifting with your arms. Avoid rounding the back.",
    "avoidIf": [
      "lower-back",
      "shoulder"
    ],
    "icon": "🔄",
    "mechanic": "Compound",
    "pattern": "Hinge",
    "force": "Explosive",
    "unilateral": false,
    "focus": [
      "power",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Swing"
    ],
    "category": "conditioning"
  },
  {
    "id": "dumbbell-devil-press",
    "name": "Dumbbell Devil Press",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Chest",
      "Shoulders",
      "Core/Abs"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Advanced",
    "cue": "Perform a burpee before swinging both dumbbells overhead.",
    "description": "Flow continuously through each repetition. Avoid muscling the dumbbells overhead.",
    "avoidIf": [
      "wrist",
      "shoulder",
      "lower-back",
      "knee"
    ],
    "icon": "😈",
    "mechanic": "Compound",
    "pattern": "Conditioning",
    "force": "Explosive",
    "unilateral": false,
    "focus": [
      "power",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Devil Press"
    ],
    "category": "conditioning"
  },
  {
    "id": "dumbbell-man-maker",
    "name": "Dumbbell Man Maker",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Chest",
      "Back",
      "Shoulders",
      "Core/Abs"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Advanced",
    "cue": "Combine a push-up, row, clean and press into one sequence.",
    "description": "Stay smooth between each phase. Avoid twisting during the rows.",
    "avoidIf": [
      "wrist",
      "shoulder",
      "lower-back"
    ],
    "icon": "🔥",
    "mechanic": "Compound",
    "pattern": "Conditioning",
    "force": "Explosive",
    "unilateral": true,
    "focus": [
      "power",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Man Maker"
    ],
    "category": "conditioning"
  },
  {
    "id": "dumbbell-burpee",
    "name": "Dumbbell Burpee",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Chest",
      "Shoulders",
      "Quads"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Advanced",
    "cue": "Hold the dumbbells throughout the burpee.",
    "description": "Maintain control during transitions. Avoid dropping the weights.",
    "avoidIf": [
      "wrist",
      "knee",
      "shoulder"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Conditioning",
    "force": "Explosive",
    "unilateral": false,
    "focus": [
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Burpee"
    ],
    "category": "conditioning"
  },
  {
    "id": "dumbbell-farmers-carry",
    "name": "Dumbbell Farmer's Carry",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Core/Abs",
      "Shoulders"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Beginner",
    "cue": "Walk tall while carrying heavy dumbbells at your sides.",
    "description": "Maintain posture and steady breathing. Avoid leaning to one side.",
    "avoidIf": [],
    "icon": "🚶",
    "mechanic": "Compound",
    "pattern": "Carry",
    "force": "Static",
    "unilateral": false,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Carry"
    ],
    "category": "conditioning"
  },
  {
    "id": "kettlebell-swing-conditioning",
    "name": "Kettlebell Swing",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Glutes",
      "Hamstrings",
      "Core/Abs"
    ],
    "equipment": [
      "kettlebell"
    ],
    "difficulty": "Intermediate",
    "cue": "Drive through the hips to propel the kettlebell forward.",
    "description": "Explode from the hips and let the bell float. Avoid lifting with the arms.",
    "avoidIf": [
      "lower-back",
      "shoulder"
    ],
    "icon": "🔔",
    "mechanic": "Compound",
    "pattern": "Hinge",
    "force": "Explosive",
    "unilateral": false,
    "focus": [
      "power",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "KB Swing"
    ],
    "category": "conditioning"
  },
  {
    "id": "kettlebell-clean-and-press",
    "name": "Kettlebell Clean and Press",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Shoulders",
      "Core/Abs"
    ],
    "equipment": [
      "kettlebell"
    ],
    "difficulty": "Advanced",
    "cue": "Clean the kettlebell before driving it overhead.",
    "description": "Use hip power and a smooth rack position. Avoid pressing from an unstable position.",
    "avoidIf": [
      "shoulder",
      "lower-back"
    ],
    "icon": "🔔",
    "mechanic": "Compound",
    "pattern": "Conditioning",
    "force": "Explosive",
    "unilateral": true,
    "focus": [
      "power",
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "KB Clean Press"
    ],
    "category": "power"
  },
  {
    "id": "kettlebell-snatch-conditioning",
    "name": "Kettlebell Snatch",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Shoulders",
      "Core/Abs"
    ],
    "equipment": [
      "kettlebell"
    ],
    "difficulty": "Advanced",
    "cue": "Drive the kettlebell overhead in one continuous motion.",
    "description": "Use the hips to accelerate the bell. Avoid letting it crash onto your forearm.",
    "avoidIf": [
      "shoulder",
      "lower-back"
    ],
    "icon": "⚡",
    "mechanic": "Compound",
    "pattern": "Hinge",
    "force": "Explosive",
    "unilateral": true,
    "focus": [
      "power"
    ],
    "homeFriendly": true,
    "aliases": [
      "KB Snatch"
    ],
    "category": "power"
  },
  {
    "id": "kettlebell-thruster",
    "name": "Kettlebell Thruster",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Quads",
      "Shoulders",
      "Core/Abs"
    ],
    "equipment": [
      "kettlebell"
    ],
    "difficulty": "Intermediate",
    "cue": "Drive out of the squat into a powerful overhead press.",
    "description": "Use momentum from the legs. Avoid pressing with loose core tension.",
    "avoidIf": [
      "knee",
      "shoulder",
      "lower-back"
    ],
    "icon": "🔔",
    "mechanic": "Compound",
    "pattern": "Conditioning",
    "force": "Explosive",
    "unilateral": false,
    "focus": [
      "power",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "KB Thruster"
    ],
    "category": "conditioning"
  },
  {
    "id": "turkish-get-up",
    "name": "Turkish Get-Up",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Shoulders",
      "Core/Abs",
      "Glutes"
    ],
    "equipment": [
      "kettlebell"
    ],
    "difficulty": "Advanced",
    "cue": "Stand up while keeping the kettlebell locked overhead.",
    "description": "Move deliberately through every position. Avoid rushing the transitions.",
    "avoidIf": [
      "shoulder",
      "lower-back"
    ],
    "icon": "🛡️",
    "mechanic": "Compound",
    "pattern": "Carry",
    "force": "Static",
    "unilateral": true,
    "focus": [
      "strength",
      "mobility"
    ],
    "homeFriendly": true,
    "aliases": [
      "TGU"
    ],
    "category": "strength"
  },
  {
    "id": "kettlebell-clean-conditioning",
    "name": "Kettlebell Clean",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Glutes",
      "Core/Abs"
    ],
    "equipment": [
      "kettlebell"
    ],
    "difficulty": "Intermediate",
    "cue": "Snap the kettlebell into the rack position.",
    "description": "Use hip power instead of curling the bell. Avoid banging your forearm.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🔔",
    "mechanic": "Compound",
    "pattern": "Hinge",
    "force": "Explosive",
    "unilateral": true,
    "focus": [
      "power"
    ],
    "homeFriendly": true,
    "aliases": [
      "KB Clean"
    ],
    "category": "power"
  },
  {
    "id": "kettlebell-figure-eight",
    "name": "Kettlebell Figure Eight",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Core/Abs",
      "Glutes"
    ],
    "equipment": [
      "kettlebell"
    ],
    "difficulty": "Intermediate",
    "cue": "Pass the kettlebell between your legs in a figure-eight pattern.",
    "description": "Maintain an athletic stance throughout. Avoid excessive spinal movement.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🔔",
    "mechanic": "Compound",
    "pattern": "Conditioning",
    "force": "Explosive",
    "unilateral": true,
    "focus": [
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "KB Figure 8"
    ],
    "category": "conditioning"
  },
  {
    "id": "double-kettlebell-clean",
    "name": "Double Kettlebell Clean",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Glutes",
      "Core/Abs",
      "Shoulders"
    ],
    "equipment": [
      "kettlebell"
    ],
    "difficulty": "Advanced",
    "cue": "Explosively clean two kettlebells into the rack position.",
    "description": "Drive through the hips while keeping the bells close. Avoid curling them upward.",
    "avoidIf": [
      "lower-back",
      "shoulder"
    ],
    "icon": "🔔",
    "mechanic": "Compound",
    "pattern": "Hinge",
    "force": "Explosive",
    "unilateral": false,
    "focus": [
      "power",
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Double KB Clean"
    ],
    "category": "power"
  },
  {
    "id": "barbell-thruster",
    "name": "Barbell Thruster",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Quads",
      "Shoulders",
      "Core/Abs"
    ],
    "equipment": [
      "barbell"
    ],
    "difficulty": "Advanced",
    "cue": "Drive from the front squat directly into the overhead press.",
    "description": "Use leg drive to power the bar overhead. Avoid pressing with a loose core.",
    "avoidIf": [
      "knee",
      "shoulder",
      "lower-back"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Conditioning",
    "force": "Explosive",
    "unilateral": false,
    "focus": [
      "power",
      "strength"
    ],
    "homeFriendly": false,
    "aliases": [
      "BB Thruster"
    ],
    "category": "conditioning"
  },
  {
    "id": "barbell-clean-and-press-conditioning",
    "name": "Barbell Clean and Press",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Shoulders",
      "Glutes",
      "Core/Abs"
    ],
    "equipment": [
      "barbell"
    ],
    "difficulty": "Advanced",
    "cue": "Clean the bar before pressing overhead in one fluid sequence.",
    "description": "Generate power from the hips. Avoid muscling the bar with the arms.",
    "avoidIf": [
      "shoulder",
      "lower-back"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Conditioning",
    "force": "Explosive",
    "unilateral": false,
    "focus": [
      "power",
      "strength"
    ],
    "homeFriendly": false,
    "aliases": [
      "BB Clean Press"
    ],
    "category": "power"
  },
  {
    "id": "barbell-complex",
    "name": "Barbell Complex",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Back",
      "Quads",
      "Shoulders",
      "Core/Abs"
    ],
    "equipment": [
      "barbell"
    ],
    "difficulty": "Advanced",
    "cue": "Perform several barbell movements back-to-back without setting the bar down.",
    "description": "Maintain excellent technique throughout every phase. Avoid sacrificing form for speed.",
    "avoidIf": [
      "shoulder",
      "lower-back"
    ],
    "icon": "🔥",
    "mechanic": "Compound",
    "pattern": "Conditioning",
    "force": "Explosive",
    "unilateral": false,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": false,
    "aliases": [
      "BB Complex"
    ],
    "category": "conditioning"
  },
  {
    "id": "barbell-clean-conditioning",
    "name": "Barbell Clean",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Glutes",
      "Shoulders",
      "Core/Abs"
    ],
    "equipment": [
      "barbell"
    ],
    "difficulty": "Advanced",
    "cue": "Explode through the hips to rack the bar smoothly.",
    "description": "Keep the bar close to your body. Avoid pulling with the arms too early.",
    "avoidIf": [
      "lower-back",
      "shoulder"
    ],
    "icon": "⚡",
    "mechanic": "Compound",
    "pattern": "Hinge",
    "force": "Explosive",
    "unilateral": false,
    "focus": [
      "power"
    ],
    "homeFriendly": false,
    "aliases": [
      "Olympic Clean"
    ],
    "category": "power"
  },
  {
    "id": "medicine-ball-slam-conditioning",
    "name": "Medicine Ball Slam",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Core/Abs",
      "Shoulders",
      "Back"
    ],
    "equipment": [
      "medicine-ball"
    ],
    "difficulty": "Intermediate",
    "cue": "Raise the ball overhead before slamming it into the floor with force.",
    "description": "Generate power through your entire body. Avoid rounding your back at the finish.",
    "avoidIf": [
      "shoulder",
      "lower-back"
    ],
    "icon": "💥",
    "mechanic": "Compound",
    "pattern": "Conditioning",
    "force": "Explosive",
    "unilateral": false,
    "focus": [
      "power",
      "endurance"
    ],
    "homeFriendly": false,
    "aliases": [
      "Med Ball Slam"
    ],
    "category": "power"
  },
  {
    "id": "wall-ball-shot",
    "name": "Wall Ball",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Quads",
      "Shoulders",
      "Core/Abs"
    ],
    "equipment": [
      "medicine-ball"
    ],
    "difficulty": "Intermediate",
    "cue": "Squat before driving the medicine ball toward a high target.",
    "description": "Use your legs to generate power. Avoid throwing only with the arms.",
    "avoidIf": [
      "knee",
      "shoulder"
    ],
    "icon": "🎯",
    "mechanic": "Compound",
    "pattern": "Conditioning",
    "force": "Explosive",
    "unilateral": false,
    "focus": [
      "endurance",
      "power"
    ],
    "homeFriendly": false,
    "aliases": [
      "Wall Ball Shot"
    ],
    "category": "conditioning"
  },
  {
    "id": "medicine-ball-chest-pass-conditioning",
    "name": "Medicine Ball Chest Pass",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Chest",
      "Shoulders",
      "Core/Abs"
    ],
    "equipment": [
      "medicine-ball"
    ],
    "difficulty": "Beginner",
    "cue": "Explosively throw the ball straight forward from your chest.",
    "description": "Finish with full extension through the arms. Avoid arching the lower back.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🏀",
    "mechanic": "Compound",
    "pattern": "Conditioning",
    "force": "Explosive",
    "unilateral": false,
    "focus": [
      "power"
    ],
    "homeFriendly": false,
    "aliases": [
      "Chest Pass"
    ],
    "category": "power"
  },
  {
    "id": "medicine-ball-overhead-throw",
    "name": "Medicine Ball Overhead Throw",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Shoulders",
      "Core/Abs",
      "Glutes"
    ],
    "equipment": [
      "medicine-ball"
    ],
    "difficulty": "Intermediate",
    "cue": "Drive the ball overhead and throw explosively.",
    "description": "Generate force from your legs and hips. Avoid excessive lumbar extension.",
    "avoidIf": [
      "shoulder",
      "lower-back"
    ],
    "icon": "🚀",
    "mechanic": "Compound",
    "pattern": "Conditioning",
    "force": "Explosive",
    "unilateral": false,
    "focus": [
      "power"
    ],
    "homeFriendly": false,
    "aliases": [
      "Overhead Throw"
    ],
    "category": "power"
  },
  {
    "id": "medicine-ball-burpee",
    "name": "Medicine Ball Burpee",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Chest",
      "Shoulders",
      "Quads",
      "Core/Abs"
    ],
    "equipment": [
      "medicine-ball"
    ],
    "difficulty": "Advanced",
    "cue": "Complete a burpee before lifting or throwing the medicine ball.",
    "description": "Maintain control during every transition. Avoid collapsing into the floor.",
    "avoidIf": [
      "wrist",
      "knee",
      "shoulder"
    ],
    "icon": "💣",
    "mechanic": "Compound",
    "pattern": "Conditioning",
    "force": "Explosive",
    "unilateral": false,
    "focus": [
      "endurance"
    ],
    "homeFriendly": false,
    "aliases": [
      "Med Ball Burpee"
    ],
    "category": "conditioning"
  },
  {
    "id": "medicine-ball-rotational-throw",
    "name": "Medicine Ball Rotational Throw",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Core/Abs",
      "Shoulders",
      "Glutes"
    ],
    "equipment": [
      "medicine-ball"
    ],
    "difficulty": "Intermediate",
    "cue": "Rotate forcefully through the hips before throwing the ball.",
    "description": "Lead with the hips and torso together. Avoid twisting only through the spine.",
    "avoidIf": [
      "lower-back",
      "pregnancy"
    ],
    "icon": "🌪️",
    "mechanic": "Compound",
    "pattern": "Rotation",
    "force": "Explosive",
    "unilateral": true,
    "focus": [
      "power"
    ],
    "homeFriendly": false,
    "aliases": [
      "Rotational Med Ball Throw"
    ],
    "category": "power"
  },
  {
    "id": "box-jump-over",
    "name": "Box Jump Over",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Quads",
      "Glutes",
      "Calves"
    ],
    "equipment": [
      "box"
    ],
    "difficulty": "Advanced",
    "cue": "Jump onto the box and continue over the opposite side.",
    "description": "Land softly before stepping or jumping down. Avoid stiff-legged landings.",
    "avoidIf": [
      "knee",
      "high-impact"
    ],
    "icon": "📦",
    "mechanic": "Compound",
    "pattern": "Conditioning",
    "force": "Explosive",
    "unilateral": false,
    "focus": [
      "power",
      "endurance"
    ],
    "homeFriendly": false,
    "aliases": [
      "Box Overs"
    ],
    "category": "conditioning"
  },
  {
    "id": "burpee-box-jump-over",
    "name": "Burpee Box Jump Over",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Chest",
      "Quads",
      "Core/Abs"
    ],
    "equipment": [
      "box"
    ],
    "difficulty": "Advanced",
    "cue": "Perform a burpee before jumping over the box.",
    "description": "Keep your movement continuous and controlled. Avoid sloppy landings.",
    "avoidIf": [
      "wrist",
      "knee",
      "high-impact"
    ],
    "icon": "📦",
    "mechanic": "Compound",
    "pattern": "Conditioning",
    "force": "Explosive",
    "unilateral": false,
    "focus": [
      "endurance",
      "power"
    ],
    "homeFriendly": false,
    "aliases": [
      "Burpee Box Overs"
    ],
    "category": "conditioning"
  },
  {
    "id": "lateral-box-shuffle",
    "name": "Lateral Box Shuffle",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Quads",
      "Glutes",
      "Calves"
    ],
    "equipment": [
      "box"
    ],
    "difficulty": "Intermediate",
    "cue": "Shuffle rapidly side-to-side over a low box.",
    "description": "Stay light on your feet throughout. Avoid crossing your feet.",
    "avoidIf": [
      "knee",
      "high-impact"
    ],
    "icon": "↔️",
    "mechanic": "Compound",
    "pattern": "Conditioning",
    "force": "Explosive",
    "unilateral": true,
    "focus": [
      "endurance"
    ],
    "homeFriendly": false,
    "aliases": [
      "Box Shuffle"
    ],
    "category": "conditioning"
  },
  {
    "id": "trx-burpee",
    "name": "TRX Burpee",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Chest",
      "Shoulders",
      "Core/Abs"
    ],
    "equipment": [
      "trx"
    ],
    "difficulty": "Advanced",
    "cue": "Keep tension on the straps throughout the burpee.",
    "description": "Control the straps during every transition. Avoid swinging excessively.",
    "avoidIf": [
      "wrist",
      "shoulder"
    ],
    "icon": "🟡",
    "mechanic": "Compound",
    "pattern": "Conditioning",
    "force": "Explosive",
    "unilateral": false,
    "focus": [
      "endurance"
    ],
    "homeFriendly": false,
    "aliases": [
      "Suspension Burpee"
    ],
    "category": "conditioning"
  },
  {
    "id": "trx-atomic-push-up-conditioning",
    "name": "TRX Atomic Push-Up",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Chest",
      "Core/Abs",
      "Shoulders"
    ],
    "equipment": [
      "trx"
    ],
    "difficulty": "Advanced",
    "cue": "Perform a push-up before tucking your knees toward your chest.",
    "description": "Brace your core to control the straps. Avoid letting your hips sag.",
    "avoidIf": [
      "wrist",
      "shoulder"
    ],
    "icon": "⚛️",
    "mechanic": "Compound",
    "pattern": "Conditioning",
    "force": "Static",
    "unilateral": false,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": false,
    "aliases": [
      "Atomic Push-Up"
    ],
    "category": "conditioning"
  },
  {
    "id": "rowing-machine-sprint",
    "name": "Rowing Machine Sprint",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Back",
      "Quads",
      "Core/Abs"
    ],
    "equipment": [
      "machine"
    ],
    "difficulty": "Intermediate",
    "cue": "Drive explosively through your legs before finishing with your arms.",
    "description": "Maintain consistent stroke mechanics throughout. Avoid pulling early with the arms.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🚣",
    "mechanic": "Compound",
    "pattern": "Conditioning",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "endurance",
      "power"
    ],
    "homeFriendly": false,
    "aliases": [
      "Erg Sprint",
      "Row Erg"
    ],
    "category": "conditioning"
  },
  {
    "id": "assault-bike-sprint",
    "name": "Assault Bike Sprint",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Shoulders",
      "Quads",
      "Core/Abs"
    ],
    "equipment": [
      "machine"
    ],
    "difficulty": "Intermediate",
    "cue": "Push and pull the handles aggressively while driving the pedals.",
    "description": "Maintain maximum effort for the work interval. Avoid shortening your stroke.",
    "avoidIf": [],
    "icon": "🚴",
    "mechanic": "Compound",
    "pattern": "Conditioning",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "endurance",
      "power"
    ],
    "homeFriendly": false,
    "aliases": [
      "Air Bike Sprint",
      "Echo Bike Sprint"
    ],
    "category": "conditioning"
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { MUSCLE_GROUPS, EQUIPMENT, CONDITIONS, EXERCISES };
}
