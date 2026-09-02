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

// Disciplines a stretch belongs to. Mirrors the EQUIPMENT shape ([{id,label}]) so the
// chip UI and validator extend rather than fork. An exercise with no `sports` (or an
// empty array) is general — it suits everyone. Strength moves never carry this field.
const SPORTS = [
  {
    "id": "yoga",
    "label": "Yoga"
  },
  {
    "id": "football",
    "label": "Football"
  },
  {
    "id": "baseball",
    "label": "Baseball"
  },
  {
    "id": "track-field",
    "label": "Track & Field"
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
    "cue": "Lower the bar to your mid-chest, then press it straight up.",
    "description": "Lie on a flat bench, grip the bar a bit wider than shoulders, and unrack it over your chest. Lower it under control to your mid-chest with elbows about 45 degrees from your body, then press it back up. Keep your feet planted and shoulder blades pinched down — don't bounce the bar off your chest.",
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
    "cue": "Lower to your chest, pause a full second, then press up.",
    "description": "Set up like a normal barbell bench press but hold the bar still on your chest for a full second before pressing. The pause kills momentum and builds power off the bottom. Stay tight through the pause so the bar doesn't sink or drift.",
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
    "cue": "Grip shoulder-width, keep elbows tucked, and press.",
    "description": "Lie on a bench and grip the bar about shoulder-width apart. Lower it to your lower chest with your elbows tucked close to your body, then press up. The narrow grip and tucked elbows shift much of the work onto your triceps.",
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
    "cue": "On a 30-degree incline, press the bar up over your upper chest.",
    "description": "Set the bench to about 30 degrees, grip the bar slightly wider than shoulders, and unrack over your upper chest. Lower to your upper chest, then press up. The incline targets the often-lagging upper chest — don't set the angle too steep or it becomes a shoulder press.",
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
    "cue": "On a decline bench, press the bar up over your lower chest.",
    "description": "Lie on a decline bench with your legs anchored, gripping the bar over your lower chest. Lower it to your lower chest, then press up. The decline angle emphasizes the lower chest and is often easier on the shoulders than flat pressing.",
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
    "cue": "Press two dumbbells up over your chest, then lower to a deep stretch.",
    "description": "Lie on a flat bench with a dumbbell in each hand at chest level, palms facing your feet. Press them up until your arms are straight, then lower slowly until you feel a stretch across your chest. Dumbbells let each arm move freely and reach a deeper stretch than a barbell.",
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
    "cue": "On a 30-degree incline, press the dumbbells up over your upper chest.",
    "description": "Set the bench to about 30 degrees and hold a dumbbell in each hand at your upper chest. Press them up until your arms are straight, then lower slowly. Targets the upper chest — keep your shoulder blades pinned back so the chest does the work, not the front of your shoulders.",
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
    "cue": "On a decline, press the dumbbells over your lower chest.",
    "description": "Lie on a decline bench with legs anchored, holding a dumbbell in each hand at your lower chest. Press them up until your arms are straight, then lower slowly. The decline hits the lower chest and tends to be gentle on the shoulders.",
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
    "cue": "Press the dumbbells up with palms facing each other.",
    "description": "Lie on a flat bench holding dumbbells over your chest with palms facing each other. Press up until your arms are straight, then lower slowly keeping that neutral grip. The palms-in grip is easier on cranky shoulders while still building the chest.",
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
    "cue": "Press the dumbbells while pushing them together the whole time.",
    "description": "Lie on a bench holding two dumbbells pressed together over your chest, palms facing each other. Press up and lower down while actively squeezing the dumbbells into each other the entire set. The constant inward squeeze lights up the inner chest.",
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
    "cue": "Open your arms wide in an arc, then hug the dumbbells back together.",
    "description": "Lie on a flat bench with dumbbells pressed together above your chest, elbows slightly bent. Open your arms out wide in a big arc until you feel a stretch across your chest, then bring them back together like hugging a barrel. Keep the slight elbow bend fixed — this is a sweep, not a press.",
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
    "cue": "On an incline, open wide then hug the dumbbells back together.",
    "description": "Set the bench to about 30 degrees, press dumbbells together over your upper chest with elbows slightly bent. Open your arms wide in an arc until you feel a stretch, then bring them back together. The incline shifts the stretch and squeeze onto the upper chest.",
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
    "cue": "Lower your chest to the floor keeping your body in one straight line.",
    "description": "Start in a plank with hands a bit wider than your shoulders and body straight from head to heels. Bend your elbows to lower your chest toward the floor, then push back up. Keep your core tight so your hips don't sag or pike — one solid line the whole way.",
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
    "cue": "Hands on a raised surface, lower your chest to it, then press up.",
    "description": "Place your hands on a bench, table, or wall so your body is angled up. Keeping a straight line from head to heels, lower your chest to the surface, then press back up. The higher your hands, the easier it is — a great way to build up to floor push-ups.",
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
    "cue": "Feet raised on a bench, lower your chest to the floor.",
    "description": "Put your feet up on a bench with your hands on the floor, body straight. Lower your chest toward the floor, then press up. Raising your feet shifts more weight onto your arms and targets the upper chest — harder than a standard push-up.",
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
    "cue": "From your knees, lower your chest and press back up in a straight line.",
    "description": "Start on your hands and knees with your body straight from head to knees, hands a bit wider than your shoulders. Lower your chest toward the floor, then press up. Dropping to your knees reduces the load, making it the ideal starting point for push-ups.",
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
    "cue": "Set your hands well wider than your shoulders and lower your chest.",
    "description": "Get into a push-up position but with your hands placed noticeably wider than your shoulders. Lower your chest toward the floor, then press up. The wide hand position puts more of the stretch and work on the chest and less on the triceps.",
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
    "cue": "Make a diamond with your hands under your chest and lower to it.",
    "description": "Get into a push-up position and place your hands together under your chest so your thumbs and index fingers form a diamond. Lower your chest to your hands with elbows tucked, then press up. The close hands make your triceps and inner chest do the heavy lifting.",
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
    "cue": "Shift your weight over one arm while the other stays straight out to the side.",
    "description": "Set up with hands wide. Lower toward one hand by bending that elbow while keeping the other arm straight out to the side, then press up and alternate. Most of your weight goes through the bending arm, making it a stepping stone to a one-arm push-up.",
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
    "cue": "Turn your hands to point back and lean your shoulders past your hands.",
    "description": "Get into a push-up position but rotate your hands so the fingers point toward your feet, then lean your shoulders forward past your hands. Lower and press while keeping that forward lean. The lean loads the shoulders and upper chest hard — an advanced move that builds toward the planche.",
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
    "cue": "Take three to four seconds to lower, then press up smoothly.",
    "description": "Do a standard push-up but lower yourself slowly over three to four seconds, pausing briefly just above the floor before pressing up. The slow lowering keeps your chest under tension far longer than normal reps. Quality over speed here.",
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
    "cue": "Hands raised on blocks so your chest can drop below them.",
    "description": "Place each hand on a low block, book, or push-up handle so your chest can sink below the level of your hands at the bottom. Lower into that deep stretch, then press up. The extra range gives the chest a bigger stretch than floor push-ups.",
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
    "cue": "Stand facing a wall, lower your chest toward it, then push back.",
    "description": "Stand arm's length from a wall with your hands on it at shoulder height and body straight. Bend your elbows to bring your chest toward the wall, then push back to straight arms. The most beginner-friendly push-up — the more upright you stand, the easier it is.",
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
    "cue": "Lean your torso forward and dip until you feel a chest stretch.",
    "description": "Support yourself on parallel bars or between two sturdy surfaces with arms straight. Lean your torso forward, bend your elbows to lower until you feel a stretch across your chest, then press back up. The forward lean is what shifts the work from triceps to chest.",
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
    "cue": "Anchor the band behind you and press the handles forward.",
    "description": "Anchor a band behind you at chest height and hold a handle in each hand, elbows bent. Press both hands forward until your arms are straight, squeezing your chest, then return under control. Step further from the anchor for more resistance.",
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
    "cue": "Arms wide, sweep the handles together in front of your chest.",
    "description": "Anchor a band behind you at chest height and hold the handles with arms out wide and elbows slightly bent. Sweep your hands together in front of your chest in an arc, squeeze, then return slowly. Keep the slight elbow bend — it's a hug, not a press.",
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
    "cue": "From high anchors, pull the handles down and together at your waist.",
    "description": "Anchor bands up high on each side and hold a handle in each hand, arms up and out. Pull both hands down and together in front of your waist, crossing slightly, then return slowly. The downward angle targets the lower chest.",
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
    "cue": "From low anchors, sweep the handles up and together at chest height.",
    "description": "Anchor bands low on each side and hold a handle in each hand, arms down and out. Sweep both hands up and together in front of your upper chest, then return slowly. The upward angle emphasizes the upper chest.",
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
    "cue": "Anchor the band low and press the handles up and forward.",
    "description": "Anchor a band low behind you and hold a handle in each hand at chest level, elbows bent. Press up and forward at an incline angle until your arms are straight, then return slowly. Mimics an incline press to hit the upper chest with no bench.",
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
    "cue": "Arms wide, sweep the handles together in front of your chest.",
    "description": "Stand between two cable pulleys set around chest height, holding a handle in each hand with arms out wide and elbows slightly bent. Sweep your hands together in front of your chest, squeeze, then return slowly. Cables keep steady tension the entire arc.",
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
    "cue": "From high pulleys, pull the handles down and together at your waist.",
    "description": "Set both pulleys high and hold a handle in each hand, arms up and out. Pull both hands down and together in front of your waist, crossing your wrists slightly, then return slowly. The downward path hits the lower chest.",
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
    "cue": "From low pulleys, sweep the handles up and together at chest height.",
    "description": "Set both pulleys low and hold a handle in each hand, arms down and out. Sweep both hands up and together in front of your upper chest, squeeze, then return slowly. The upward path emphasizes the upper chest.",
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
    "cue": "Press both handles forward until your arms meet in front.",
    "description": "Stand between chest-height pulleys with a handle in each hand, elbows bent. Press both hands forward until your arms are nearly straight and meet in front of your chest, then return slowly. The cables load your chest evenly through the whole press.",
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
    "cue": "From low pulleys, press the handles up and forward.",
    "description": "Set the pulleys low and hold a handle in each hand at chest level, elbows bent. Press up and forward until your arms are nearly straight, then return slowly. The upward angle targets the upper chest with constant cable tension.",
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
    "cue": "Grip the handles and press them straight forward.",
    "description": "Sit in the chest press machine with the handles at chest height and your back flat against the pad. Press the handles forward until your arms are nearly straight, then return under control. A safe, stable way to train the chest without balancing free weights.",
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
    "cue": "Bring the pads together in front of your chest in a hugging arc.",
    "description": "Sit at the pec deck with your forearms or hands on the pads, arms out wide. Squeeze the pads together in front of your chest, hold for a beat, then return slowly to a stretch. The fixed path makes it easy to feel your chest doing the work.",
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
    "cue": "Press the handles up and forward on the incline machine.",
    "description": "Sit in the incline chest press machine with your back on the pad and grip the handles at upper-chest height. Press up and forward until your arms are nearly straight, then return under control. Targets the upper chest with a fixed, beginner-friendly path.",
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
    "cue": "Press the independent handles forward, squeezing your chest.",
    "description": "Sit in the plate-loaded chest press with your back flat and grip the handles at chest height. Press forward until your arms are nearly straight, squeezing your chest, then return slowly. Each arm moves independently, so a weaker side can't coast.",
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
    "cue": "Lean into the straps and press yourself back up.",
    "description": "Hold the TRX handles and lean forward with straight arms so your bodyweight loads them, body in a straight line. Lower your chest between the handles by bending your elbows, then press back up. Walk your feet forward to make it harder, back to make it easier.",
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
    "cue": "Open your arms wide, then hug them back together.",
    "description": "Hold the TRX handles and lean forward with arms out wide and elbows slightly bent. Open your arms wider to lower your chest, then squeeze them back together to press up. Keep your body rigid and the elbow bend fixed — a tough stability challenge.",
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
    "cue": "Press the kettlebells up from the floor, elbows lightly touching down.",
    "description": "Lie on the floor with a kettlebell in each hand at chest level, elbows resting on the ground. Press the bells up until your arms are straight, then lower until your elbows lightly touch the floor. The floor limits your range, protecting your shoulders.",
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
    "cue": "Press one kettlebell up while bracing your core against the tilt.",
    "description": "Lie on a bench with a kettlebell in one hand at chest level. Press it straight up until your arm is locked, then lower under control while bracing your core to stop your torso twisting. Pressing one side forces your core and shoulder to stabilize hard.",
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
    "cue": "Press the dumbbells up, letting your elbows lightly touch the floor.",
    "description": "Lie on the floor with a dumbbell in each hand at chest level, knees bent. Press them up until your arms are straight, then lower until your elbows lightly touch down and press again. The floor caps the range, making it shoulder-friendly and great for lockout power.",
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
    "cue": "Lower one dumbbell back over your head in an arc, then pull it back over your chest.",
    "description": "Lie across or along a bench holding one dumbbell over your chest with both hands, arms nearly straight. Lower it back behind your head in an arc until you feel a stretch across your chest and ribs, then pull it back over your chest. Keep your arms only slightly bent and let the stretch, not your elbows, drive it.",
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
    "cue": "Press one dumbbell while keeping your torso from rotating.",
    "description": "Lie on a bench with a dumbbell in one hand at chest level, the other arm out for balance. Press it up until your arm is straight, then lower slowly while keeping your shoulders square. Working one arm forces your core to fight the twist.",
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
    "cue": "Press one dumbbell up while the other stays at your chest, then switch.",
    "description": "Lie on a bench with a dumbbell in each hand at chest level. Press one up while holding the other at your chest, lower it, then press the other. Holding one side loaded the whole time keeps constant tension on the chest and tests your core.",
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
    "cue": "Hang with palms facing away and pull your chest toward the bar.",
    "description": "Hang from a bar with an overhand grip a bit wider than your shoulders, arms straight. Pull your elbows down and back to bring your chest toward the bar, then lower under control to a full hang. Drive your elbows down rather than just yanking with your arms — that's how the back does the work.",
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
    "cue": "Palms facing you, pull your chest to the bar.",
    "description": "Hang from a bar with an underhand (palms-facing-you) grip about shoulder-width. Pull your chest up to the bar, then lower under control to straight arms. The underhand grip brings the biceps in more, making it usually a little easier than a pull-up.",
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
    "cue": "Palms facing each other, pull your chest up to the bar.",
    "description": "Grip the parallel handles so your palms face each other and hang with straight arms. Pull your chest toward the handles, then lower under control. The neutral grip is the most shoulder-friendly pull-up and hits the back and biceps evenly.",
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
    "cue": "Grip well outside your shoulders and pull your chest up.",
    "description": "Hang from a bar with an overhand grip noticeably wider than your shoulders. Pull your chest toward the bar, driving your elbows down and out, then lower under control. The wide grip shifts more work onto the outer lats for that V-taper — and makes it harder.",
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
    "cue": "Grip the bar in line with your body and pull up to one side, then the other.",
    "description": "Stand under the bar and grip it with your hands together, one in front of the other, so your body is side-on to the bar. Pull up so your head passes one side of the bar, lower, then pull up to the other side. It hammers the lats and forces your core to resist twisting.",
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
    "cue": "Pull up toward one hand while the other arm stays straight along the bar.",
    "description": "Take a wide overhand grip. Pull yourself up and over toward one hand while the other arm stays straight, sliding along the bar, then lower and alternate sides. Most of your weight goes through the bending arm — a stepping stone to the one-arm pull-up.",
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
    "cue": "Hang, then pull your shoulders down without bending your elbows.",
    "description": "Hang from the bar with straight arms. Without bending your elbows, pull your shoulder blades down and together to lift your body an inch or two, then relax back to a hang. It teaches the shoulder-blade movement that starts every good pull-up.",
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
    "cue": "Start at the top and lower yourself as slowly as you can.",
    "description": "Jump or step up so your chin is over the bar, then lower yourself as slowly as possible — aim for three to five seconds — until your arms are straight. Reset and repeat. Slow lowering builds the strength you need for full pull-ups.",
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
    "cue": "Hang under a bar and pull your chest up to it, body straight.",
    "description": "Set a bar at about hip height, lie under it, and grip it a bit wider than your shoulders with your body straight and heels on the floor. Pull your chest up to the bar, squeezing your shoulder blades, then lower under control. The more horizontal your body, the harder it is.",
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
    "cue": "Feet raised on a bench, pull your chest to the bar.",
    "description": "Set up an inverted row but rest your feet on a bench so your body is level. Pull your chest to the bar, squeezing your shoulder blades, then lower slowly. Raising your feet loads more of your bodyweight onto your back.",
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
    "cue": "Loop a towel around a post and row your body toward it.",
    "description": "Loop a sturdy towel around a solid post or door handle, hold both ends, and lean back with straight arms and feet planted. Pull your body toward the anchor by driving your elbows back, then lower slowly. A no-equipment back builder — the more you lean back, the harder it gets.",
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
    "cue": "Lie face-down and lift your arms, chest, and legs off the floor.",
    "description": "Lie face-down with your arms stretched out in front. Squeeze your lower back and glutes to lift your arms, chest, and legs off the floor at the same time, hold for a second, then lower. Keep your neck neutral — look at the floor, not forward.",
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
    "cue": "Lie face-down and lift your arms into Y, T, then W shapes.",
    "description": "Lie face-down and raise your arms off the floor in three positions — overhead into a Y, straight out into a T, then bent back into a W. Squeeze your shoulder blades in each. It strengthens the mid-back and rear shoulders and improves posture. Keep the movements small and controlled.",
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
    "cue": "Lie face-down and lift your chest up using your lower back.",
    "description": "Lie face-down with your hands by your head or crossed on your chest. Lift your chest off the floor by squeezing your lower back and glutes, then lower slowly. Don't crank into a big backbend — a small, controlled lift is plenty.",
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
    "cue": "Face-down, sweep your arms from your sides to overhead, hovering off the floor.",
    "description": "Lie face-down with arms at your sides, palms down, and lift them slightly off the floor. Sweep them overhead in a wide arc like a snow angel, keeping them hovering the whole time, then sweep back. Great for the mid-back and shoulder health.",
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
    "cue": "Sit with legs out, then lift your hips into a straight line.",
    "description": "Sit with your legs straight in front and hands on the floor behind you, fingers pointing forward. Press through your hands and heels to lift your hips until your body forms a straight line, and hold. Squeeze your glutes and don't let your hips sag.",
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
    "cue": "On all fours, extend the opposite arm and leg and hold steady.",
    "description": "Start on all fours. Reach one arm straight forward and the opposite leg straight back until they're level with your body, then hold while keeping your hips square and core braced. Builds mid-back and core stability. Switch sides each set.",
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
    "cue": "Brace on a bench and row the dumbbell to your hip.",
    "description": "Put one knee and hand on a bench with a flat back, holding a dumbbell in the other hand hanging down. Row it up to your hip by driving your elbow back, squeezing your back, then lower slowly. Keep your torso still — don't twist to lift the weight.",
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
    "cue": "Lie chest-down on an incline and row both dumbbells to your hips.",
    "description": "Lie chest-down on an incline bench holding a dumbbell in each hand hanging toward the floor. Row them up to your hips, squeezing your shoulder blades, then lower slowly. The chest support removes your lower back and momentum so the back does all the work.",
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
    "cue": "Hinge forward and row both dumbbells to your hips.",
    "description": "Hinge forward at the hips with a flat back, holding a dumbbell in each hand hanging down. Row them up to your hips by driving your elbows back, then lower slowly. Keep your back flat and core tight throughout — don't round or stand up as you pull.",
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
    "cue": "Dumbbells on the floor between your feet, row them up one at a time.",
    "description": "Stand over two dumbbells set on the floor between your feet, hinge down with a flat back, and grab both. Row one up to your hip while the other rests, then alternate. The floor reset each rep keeps your form honest and builds explosive pulling power.",
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
    "cue": "Row the dumbbell up, then set it fully down each rep.",
    "description": "Set up a bent-over row but let the dumbbell come to a complete stop on the floor between each rep. Pull it up to your hip, then lower it all the way down and pause before the next. Killing the momentum makes your back start each rep from scratch.",
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
    "description": "Stand holding a dumbbell in each hand in front of your thighs, feet hip-width, knees slightly bent. Dip a few inches by pushing your hips back, then explosively stand and use that momentum to pull both dumbbells up to chest height, elbows leading high and out. Lower under control. Don't turn it into a slow biceps curl — the power comes from your hips, not your arms.",
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
    "cue": "Hold dumbbells at your sides and shrug your shoulders straight up.",
    "description": "Stand tall holding a dumbbell in each hand at your sides. Shrug your shoulders straight up toward your ears, squeeze at the top, then lower slowly. Don't roll your shoulders — just lift straight up and down to build the traps.",
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
    "cue": "Row one heavy dumbbell with a little body english for max reps.",
    "description": "Brace one hand on a bench and row a heavy dumbbell in the other hand, using a slight controlled swing of your hips to move big weight for high reps. Pull to your hip, then lower under control. A brutal back and grip builder — keep your spine safe, not sloppy.",
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
    "cue": "Chest on the incline, row the dumbbells up and back.",
    "description": "Lie chest-down on an incline bench with a dumbbell in each hand hanging down. Row them up and slightly back toward your hips, squeezing your shoulder blades, then lower slowly. The supported position isolates the mid-back cleanly.",
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
    "cue": "Hinge forward with a flat back and row the bar to your belly.",
    "description": "Stand holding a barbell with an overhand grip, hinge forward until your torso is around 45 degrees with a flat back. Row the bar up to your lower ribs or belly by driving your elbows back, then lower under control. Keep your back flat and don't jerk upright to lift.",
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
    "cue": "From a flat-back position, row the bar off the floor to your chest each rep.",
    "description": "Hinge over a barbell on the floor with your torso nearly parallel to the ground and back flat. Explosively row the bar to your lower chest, then set it back down fully between reps. Starting from a dead stop each rep builds serious pulling power.",
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
    "cue": "Straddle the bar, hinge over, and row the handle to your chest.",
    "description": "Straddle a landmine-anchored barbell with a V-handle around the loaded end, hinge forward with a flat back. Row the handle up to your chest by driving your elbows back, then lower slowly. The angle lets you load heavy while keeping the mid-back working.",
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
    "cue": "Row an underhand-grip bar to your belly with a more upright torso.",
    "description": "Hold a barbell with an underhand grip and hinge to about 45 degrees — more upright than a standard row. Row it to your lower belly, squeezing your back, then lower slowly. The underhand grip and upright angle bring in the lower lats.",
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
    "cue": "Hold the bar in front and shrug your shoulders straight up.",
    "description": "Stand holding a barbell in front of your thighs with an overhand grip. Shrug your shoulders straight up toward your ears, squeeze the traps at the top, then lower slowly. Keep your arms straight and avoid rolling your shoulders.",
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
    "cue": "From knee height in a rack, drive your hips forward to lock out the bar.",
    "description": "Set a barbell on rack pins at about knee height. Grip it, brace, and drive your hips forward to stand tall and lock out, then lower it back to the pins. The short range lets you overload the upper back and lockout of the deadlift. Keep your back flat throughout.",
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
    "cue": "Flat back, drive through the floor, and stand up with the bar close to your body.",
    "description": "Stand with the barbell over your midfoot, hinge down and grip it just outside your legs with a flat back and chest up. Drive through the floor and stand tall, keeping the bar dragging close to your body, then hinge it back down under control. Never round your lower back — brace hard and keep the bar close.",
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
    "cue": "Brace on a bench and row the kettlebell to your hip.",
    "description": "Put one knee and hand on a bench with a flat back, holding a kettlebell in the other hand. Row it up to your hip by driving your elbow back, squeezing your back, then lower slowly. Keep your torso still and square to the floor.",
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
    "cue": "Kettlebells between your feet, row them up one at a time.",
    "description": "Stand over two kettlebells, hinge with a flat back, and grab both handles. Row one up to your hip while the other stays down, then alternate. The alternating pull keeps constant tension on your back and challenges your core.",
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
    "cue": "Pull the bar down to your upper chest, driving your elbows down.",
    "description": "Sit at the pulldown station and grip the bar wider than your shoulders, arms straight overhead. Pull it down to your upper chest by driving your elbows down and back, then let it rise under control. Lead with your elbows and keep your chest tall — don't lean way back.",
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
    "cue": "Pull the close handle to your chest, elbows driving straight down.",
    "description": "Sit at the pulldown with a close or V-grip handle, arms straight overhead. Pull it down to your chest, driving your elbows down toward your sides, then let it rise slowly. The close grip brings in the lower lats and lets you feel a strong squeeze.",
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
    "cue": "Wide grip, pull the bar to your chest driving your elbows down.",
    "description": "Grip the pulldown bar well wider than your shoulders, arms straight overhead. Pull it down to your upper chest, driving your elbows down and out, then let it rise under control. The wide grip emphasizes the outer lats and back width.",
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
    "cue": "Keep your arms straight and push the bar down to your thighs.",
    "description": "Stand facing a high cable with a bar, arms straight out in front. Keeping your arms straight, pull the bar down in an arc to your thighs using your lats, then return slowly. Only your shoulders move — it isolates the lats without the biceps.",
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
    "cue": "Sit tall and pull the handle to your belly, squeezing your back.",
    "description": "Sit at the cable row with your feet braced and a slight bend in your knees, holding the handle with arms straight. Pull it to your belly by driving your elbows back and squeezing your shoulder blades, then return slowly. Keep your torso upright — don't heave with your lower back.",
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
    "cue": "Row the low cable handle to your hip, letting your shoulder stretch forward.",
    "description": "Sit or stand facing a low cable holding a single handle, arm straight and shoulder reaching forward. Pull it to your hip by driving your elbow back and squeezing your back, then return to the stretch. One arm at a time gives a big range and evens out sides.",
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
    "cue": "Pull the rope to your face, hands splitting apart by your ears.",
    "description": "Set a rope on a high pulley and hold both ends with palms in. Pull it toward your face, splitting your hands apart so they finish beside your ears with elbows high, then return slowly. Fantastic for the rear delts, upper back, and shoulder health.",
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
    "cue": "Arms nearly straight, pull the bar down to your thighs with your lats.",
    "description": "Stand facing a high cable with a bar, arms overhead and slightly bent. Pull the bar down in an arc to your thighs using your lats, then return under control. Keeps constant tension on the lats through a big stretch — think of pushing, not pulling, with straight-ish arms.",
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
    "cue": "Pull the bar to your upper chest, elbows driving down.",
    "description": "Sit at the lat pulldown machine, secure your thighs under the pad, and grip the bar wider than your shoulders. Pull it to your upper chest by driving your elbows down, then let it rise under control. A great way to build pull-up strength if you can't do them yet.",
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
    "cue": "Pull the handles to your torso, squeezing your shoulder blades.",
    "description": "Sit at the row machine with your chest against the pad and grip the handles. Pull them toward your torso by driving your elbows back and squeezing your shoulder blades together, then return slowly. The chest pad keeps your lower back safe and out of it.",
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
    "cue": "Chest on the pad, row the handles back and squeeze.",
    "description": "Sit at the chest-supported row with your chest firmly on the pad, holding the handles with arms straight. Row them back by driving your elbows behind you and squeezing your shoulder blades, then return slowly. Pure mid-back work with zero cheating.",
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
    "cue": "Chest on the pad, drive the independent handles back.",
    "description": "Sit at the plate-loaded row with your chest on the pad and grip the handles. Row them back by driving your elbows behind you, squeezing your back, then return slowly. Each arm works on its own, so a weaker side can't hide.",
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
    "cue": "Kneel on the pad and pull yourself up to the bar.",
    "description": "Set the assist weight, kneel or stand on the platform, and grip the handles overhead. Pull yourself up until your chin nears the handles, then lower under control. The machine offsets some of your bodyweight so you can groove real pull-up mechanics.",
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
    "cue": "Push back against the pad using your lower back and glutes.",
    "description": "Sit in the back extension machine with the pad against your upper back. Push back by squeezing your lower back and glutes until your torso is in line with your hips, then return under control. Move smoothly — no jerking into a big backbend.",
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
    "cue": "Anchor the band high and pull the ends down to your chest.",
    "description": "Anchor a band overhead and hold an end in each hand, arms up. Pull them down to your chest by driving your elbows down and back, then let them rise under control. Mimics a lat pulldown anywhere — kneel further back for more tension.",
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
    "cue": "Anchor the band ahead and row the ends to your belly.",
    "description": "Anchor a band in front at chest height and hold both ends with straight arms. Row them to your belly by driving your elbows back and squeezing your shoulder blades, then return slowly. Step back for more resistance.",
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
    "cue": "Hold the band out front and pull it apart across your chest.",
    "description": "Hold a band in front of you at shoulder height with both hands, arms straight. Pull it apart out to your sides until it touches your chest, squeezing your shoulder blades, then return slowly. A simple, powerful fix for rounded posture.",
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
    "cue": "Arms straight, pull the band down to your thighs with your lats.",
    "description": "Anchor a band overhead and hold the ends with straight arms out in front. Keeping your arms straight, pull them down to your thighs using your lats, then return slowly. Isolates the lats with no biceps involved.",
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
    "cue": "Pull the band to your face, hands splitting apart by your ears.",
    "description": "Anchor a band at head height and hold both ends. Pull it toward your face, splitting your hands apart so they finish by your ears with elbows high, then return slowly. Builds the rear delts and upper back and undoes hunching.",
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
    "cue": "Anchor the band ahead and row one end to your hip.",
    "description": "Anchor a band in front at waist height and hold one end with a straight arm. Row it to your hip by driving your elbow back and squeezing your back, then return to the stretch. Working one arm evens out left-right differences.",
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
    "cue": "Lean back on the straps and pull your chest up to your hands.",
    "description": "Hold the TRX handles and lean back with straight arms and a straight body, heels on the floor. Pull your chest up to your hands by driving your elbows back and squeezing your shoulder blades, then lower under control. Walk your feet forward to make it harder.",
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
    "cue": "Lean back on one strap and row your body up while resisting the twist.",
    "description": "Hold a single TRX handle in one hand and lean back with a straight arm and body. Pull your chest up to your hand while keeping your shoulders square, then lower under control. One arm forces your core to fight rotation as your back works.",
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
    "cue": "Hips high in an upside-down V, lower the top of your head toward the floor.",
    "description": "Start in a push-up position, then walk your feet in and lift your hips high so your body makes an upside-down V. Bend your elbows to lower the top of your head toward the floor, then press back up. The steep angle turns a push-up into a shoulder press.",
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
    "cue": "Feet on a bench, hips high, lower your head toward the floor.",
    "description": "Put your feet up on a bench and walk your hands back so your hips stack high over your shoulders in a steep pike. Lower the top of your head toward the floor between your hands, then press up. Raising your feet puts more weight overhead — a big step toward handstand push-ups.",
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
    "cue": "Kick up to the wall and hold a straight, tight handstand.",
    "description": "Face the wall, place your hands a hand's width from it, and kick up so your heels rest against the wall. Hold with straight arms, squeezing your core, glutes, and shoulders to stay rigid. Build your hold time gradually — come down the moment your form sags.",
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
    "cue": "Start in a plank facing away, then walk your feet up the wall toward a handstand.",
    "description": "Begin in a plank with your feet against the base of a wall. Walk your feet up the wall while walking your hands closer, until you're close to a handstand, then reverse back down. It builds serious overhead shoulder strength and control.",
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
    "cue": "Raise the dumbbells out to your sides up to shoulder height.",
    "description": "Stand holding a dumbbell in each hand at your sides, elbows slightly bent. Raise them out to the sides until they reach shoulder height, leading with your elbows, then lower slowly. Keep it strict — no swinging — and imagine pouring water from the dumbbells at the top.",
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
    "cue": "Raise the dumbbells straight in front of you to shoulder height.",
    "description": "Stand holding dumbbells in front of your thighs, palms facing you. Raise one or both straight out in front to shoulder height, then lower slowly. Keep your torso still — don't lean back or swing to lift the weight.",
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
    "cue": "Hinge forward and raise the dumbbells out to your sides.",
    "description": "Hinge forward at the hips with a flat back, holding dumbbells hanging below you. Raise them out to the sides, squeezing your shoulder blades, until your arms are level, then lower slowly. Targets the rear shoulders — use light weight and keep a small elbow bend.",
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
    "cue": "Raise the dumbbells up and slightly forward in a Y shape.",
    "description": "Stand with dumbbells at your sides, palms facing in. Raise them up and slightly forward — about 30 degrees in front of straight-to-the-side — to shoulder height, making a Y, then lower slowly. This shoulder-friendly angle trains the side delts while sparing the joint.",
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
    "cue": "Upright-row the dumbbells, rotate them up, then press overhead.",
    "description": "Hold dumbbells in front of your thighs. Pull them up into a high row, rotate your forearms up so the weights point at the ceiling, then press overhead. Reverse the whole sequence back down. A rotator-cuff and shoulder combo — go light and smooth.",
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
    "cue": "Front raise, out to the sides, then overhead — and reverse.",
    "description": "Raise the dumbbells straight in front to shoulder height, sweep them out to the sides, then press overhead, and reverse the path back down — that's one rep. It hits the front, side, and rear shoulders in a single flowing set. Use very light weights.",
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
    "cue": "Sweep the dumbbells from your thighs out and around to overhead.",
    "description": "Start with dumbbells at your thighs, palms forward. Sweep them out to the sides and up in a big circle until they meet overhead, then reverse back down. The continuous arc keeps constant tension across the whole shoulder — keep it slow and controlled.",
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
    "cue": "Hold a post and lean away, then raise the dumbbell out to the side.",
    "description": "Hold a rack or post with one hand and lean your body away so your working arm hangs across your body. Raise the dumbbell out to the side to shoulder height, then lower slowly. Leaning away increases the stretch and tension at the bottom of the raise.",
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
    "cue": "Chest on the incline, raise the dumbbells up into a Y.",
    "description": "Lie chest-down on an incline bench holding dumbbells hanging toward the floor. Raise them up and out into a Y shape overhead, squeezing your shoulder blades, then lower slowly. The face-down angle nails the rear and lower-trap area with no cheating.",
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
    "cue": "Lateral raise to the side, then rotate up to overhead in an L.",
    "description": "Raise a dumbbell out to the side to shoulder height, then rotate your forearm up so it points at the ceiling in an L shape. Reverse back down. It combines a side raise with an external rotation for healthy, strong shoulders.",
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
    "cue": "Lie side-on over a bench and raise the dumbbell across and up.",
    "description": "Lie on your side over an incline bench holding a dumbbell in the top hand across your body. Raise it up and across in an arc to shoulder height, then lower slowly. An unusual angle that isolates the rear and side shoulder — keep it light.",
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
    "cue": "Sit and hinge forward, then raise the dumbbells out to the sides.",
    "description": "Sit on the edge of a bench and hinge forward so your chest is near your thighs, dumbbells hanging below. Raise them out to the sides, squeezing your shoulder blades, then lower slowly. Sitting braced keeps your lower back out of it and isolates the rear delts.",
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
    "cue": "Press the dumbbells overhead from shoulder height.",
    "description": "Sit on a bench with back support, holding a dumbbell in each hand at shoulder height, palms forward. Press them straight overhead until your arms are nearly locked, then lower to your shoulders. The back support keeps you stable so you can press heavy safely.",
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
    "cue": "Press the dumbbells overhead while keeping your core tight.",
    "description": "Stand holding dumbbells at shoulder height, palms forward, feet hip-width. Brace your core and press them overhead until your arms are nearly straight, then lower to your shoulders. Standing forces your whole body to stabilize — don't lean back to cheat.",
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
    "cue": "Start palms facing you, rotate as you press overhead.",
    "description": "Hold dumbbells at shoulder height with palms facing you. As you press up, rotate your wrists so your palms face forward at the top, then reverse on the way down. The rotation works the front and side shoulders through a bigger range than a normal press.",
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
    "cue": "Dip your knees slightly, then drive the dumbbells overhead.",
    "description": "Hold dumbbells at your shoulders. Dip a few inches by bending your knees, then explosively straighten your legs to help drive the weights overhead, and lower under control. The leg drive lets you press heavier than a strict shoulder press.",
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
    "cue": "Press one dumbbell overhead while bracing against the twist.",
    "description": "Stand holding one dumbbell at shoulder height. Brace your core and press it overhead until your arm is straight, then lower to your shoulder. Pressing one side forces your core to fight rotation — a great anti-twist core and shoulder builder.",
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
    "cue": "Kneel on one knee and press the dumbbell overhead.",
    "description": "Kneel with one knee down and the other foot planted in front, holding a dumbbell at the shoulder of the down-knee side. Press it overhead, then lower under control, keeping your torso tall. The half-kneeling stance kills momentum and exposes any side-to-side weakness.",
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
    "cue": "Press the bar from your shoulders to overhead, then move your head through.",
    "description": "Stand holding a barbell across the front of your shoulders, hands just outside shoulder width. Brace hard and press it straight up, nudging your head back then forward so the bar finishes over your midfoot. Squeeze your glutes so you don't lean back and strain your lower back.",
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
    "cue": "Dip your knees, then drive the bar overhead with your legs.",
    "description": "Hold a barbell on your front shoulders. Dip a few inches at the knees, then explosively stand and use that drive to press the bar overhead, locking out over your midfoot. The leg drive lets you handle more weight than a strict press.",
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
    "cue": "Sit on the floor with legs straight and press the bar overhead.",
    "description": "Sit on the floor with your legs straight out and a barbell at your front shoulders. With no back support, press it overhead, then lower to your shoulders. Removing your legs and back forces your core and shoulders to do everything — start very light.",
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
    "cue": "Press the angled bar up and slightly forward from your shoulder.",
    "description": "Wedge one end of a barbell into a corner or landmine and hold the other end at your shoulder. Press it up and slightly forward until your arm is straight, then lower. The angled path is easy on the shoulder joint, making it a great starting overhead press.",
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
    "cue": "Pull the bar straight up your body, leading with your elbows.",
    "description": "Hold a barbell in front of your thighs with a shoulder-width grip. Pull it straight up close to your body to about chest height, leading with your elbows, then lower slowly. Don't pull it higher than your chest or force your elbows way above your hands — that can pinch the shoulder.",
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
    "cue": "Press the kettlebell overhead; the bell rests on the back of your wrist.",
    "description": "Hold a kettlebell at your shoulder with the bell resting on the back of your forearm. Press it straight overhead until your arm is locked, then lower under control. The offset weight sitting behind your hand makes your shoulder and grip stabilize harder than a dumbbell.",
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
    "cue": "Dip your knees, then drive the kettlebell overhead.",
    "description": "Hold a kettlebell at your shoulder. Dip a few inches at the knees, then explosively stand to help drive the bell overhead, and lower under control. Leg drive helps you press a heavier bell than strict.",
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
    "cue": "Press one kettlebell overhead while keeping your torso square.",
    "description": "Hold a kettlebell at one shoulder, bell resting on your forearm. Brace your core and press it overhead, then lower to your shoulder while keeping your body from leaning. One-arm pressing builds shoulder strength and a rock-solid core.",
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
    "cue": "Balance the kettlebell upside-down and press it overhead.",
    "description": "Grip a kettlebell so the bell sits upside-down above your fist, balanced there. Keeping it from tipping, press it overhead, then lower slowly. Balancing the bell forces a crushing grip and fires up every stabilizer — use a light bell.",
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
    "cue": "Circle the kettlebell around your head, close and controlled.",
    "description": "Hold a kettlebell by the horns upside-down at chest height. Circle it around your head, keeping it close, then reverse direction. It's a mobility and warm-up move that loosens the shoulders and works the stabilizers — keep the circles smooth.",
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
    "cue": "Hike the kettlebell back, snap your hips, and pull it to shoulder height.",
    "description": "Stand over a kettlebell, hinge and hike it back between your legs, then snap your hips forward and pull it up to shoulder height with your elbow high. Let it drop back into the next hinge. The power comes from your hips, not your arm.",
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
    "cue": "Sit on the floor with legs straight and press the kettlebell overhead.",
    "description": "Sit on the floor with your legs straight out and a kettlebell at your shoulder. With no back support, press it overhead, then lower to your shoulder. The seated position exposes any weakness and demands a strong, upright core — start light.",
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
    "cue": "Raise the low cable handle out to the side to shoulder height.",
    "description": "Stand side-on to a low cable and hold the handle in the far hand across your body. Raise your arm out to the side to shoulder height, then lower slowly. The cable keeps tension on the side delt even at the bottom, where dumbbells go slack.",
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
    "cue": "Raise the cable handle straight in front to shoulder height.",
    "description": "Stand facing away from a low cable, holding the handle in front of your thigh. Raise your arm straight out in front to shoulder height, then lower slowly. Constant cable tension makes the front delt work through the whole range.",
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
    "cue": "Pull the high cables across and apart, squeezing your rear delts.",
    "description": "Stand between two high pulleys holding the opposite handle in each hand, arms crossed in front. Pull your hands out and apart in a reverse fly, squeezing your shoulder blades, then return slowly. Great constant-tension work for the often-neglected rear delts.",
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
    "cue": "Pull the low cable bar up your body, elbows leading.",
    "description": "Stand facing a low cable with a bar attached, hands shoulder-width. Pull it straight up close to your body to chest height, leading with your elbows, then lower slowly. Stop at chest height to keep the shoulder happy.",
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
    "cue": "Raise the cables up and out into a Y overhead.",
    "description": "Stand facing two low pulleys holding the opposite handle in each hand, arms down and crossed. Raise both up and out into a Y shape overhead, then lower slowly. Targets the side and lower-trap area with steady cable tension.",
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
    "cue": "Press the handles overhead until your arms are nearly straight.",
    "description": "Sit in the shoulder press machine with your back on the pad and grip the handles at shoulder height. Press up until your arms are nearly straight, then lower under control. A safe, stable way to overhead press without balancing free weights.",
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
    "cue": "Drive your elbows up and out against the pads.",
    "description": "Sit in the lateral raise machine with the pads against the outsides of your upper arms. Raise your arms out to the sides against the pads to shoulder height, then lower slowly. The fixed path makes it easy to feel the side delts and hard to cheat.",
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
    "cue": "Push the handles out and back, squeezing your shoulder blades.",
    "description": "Sit facing into the pec deck and grip the handles with arms out in front. Push them out and back in a reverse fly until your arms are level, squeezing your rear delts and shoulder blades, then return slowly. Ideal for building the rear shoulders.",
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
    "cue": "Stand on the band and press the handles overhead.",
    "description": "Stand on the middle of a resistance band and hold the ends at your shoulders. Press up overhead against the band until your arms are straight, then lower to your shoulders. The band's tension grows as you press, peaking at lockout.",
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
    "cue": "Stand on the band and raise the handles out to your sides.",
    "description": "Stand on the middle of a band and hold an end in each hand at your sides. Raise your arms out to the sides to shoulder height against the band, then lower slowly. The band makes the top of the raise — where side delts work hardest — the toughest part.",
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
    "cue": "Stand on the band and raise the handles straight in front.",
    "description": "Stand on a band holding the ends in front of your thighs. Raise your arms straight out in front to shoulder height against the band, then lower slowly. Keep your torso still so the front delts do the work.",
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
    "cue": "Hold the band in front and pull your hands apart.",
    "description": "Hold a band in front of you at shoulder height with both hands, arms nearly straight. Pull your hands apart out to the sides, squeezing your shoulder blades, then return slowly. A simple, joint-friendly way to hit the rear delts anywhere.",
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
    "cue": "Stand on the band and pull the handles up your body, elbows high.",
    "description": "Stand on the middle of a band holding the ends in front of your thighs. Pull them straight up close to your body to chest height, leading with your elbows, then lower slowly. Stop at chest height to protect the shoulder.",
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
    "cue": "Lean back on the straps and raise your arms up into a Y.",
    "description": "Hold the TRX handles and lean back with straight arms so your bodyweight loads them. Keeping your arms straight, raise them up and out overhead into a Y, then return under control. Walk your feet forward to make it harder. Builds the rear delts and mid-back.",
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
    "cue": "Lean back and pull your arms out to the sides in a T.",
    "description": "Hold the TRX handles and lean back with straight arms. Keeping them straight, pull your hands out to the sides into a T, squeezing your shoulder blades, then return slowly. A bodyweight reverse fly for the rear shoulders — adjust the lean for difficulty.",
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
    "cue": "Press the med ball straight overhead from your chest.",
    "description": "Hold a medicine ball at your chest with both hands. Press it straight overhead until your arms are nearly straight, then lower to your chest. A simple way to train the overhead press pattern with an easy-to-hold weight.",
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
    "cue": "Dip your knees, then drive the med ball overhead.",
    "description": "Hold a medicine ball at your chest. Dip a few inches at the knees, then explosively stand and drive the ball overhead, lowering it back to your chest. The leg drive adds power and lets you move the ball faster for an athletic, explosive feel.",
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
    "cue": "Sit your hips back and down, then stand up through your heels.",
    "description": "Stand with feet shoulder-width, toes slightly out. Push your hips back and bend your knees to lower until your thighs are about parallel to the floor, keeping your chest up and heels down, then stand back up. Don't let your knees cave inward — push them out over your toes.",
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
    "cue": "Squat down, pause two seconds at the bottom, then stand.",
    "description": "Do a bodyweight squat but hold the bottom position for a full two seconds before standing up. Stay tight and upright through the pause. Removing the bounce builds control and strength out of the hardest part of the squat.",
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
    "cue": "Lower for three seconds, then stand smoothly.",
    "description": "Squat down slowly over three seconds, then stand back up at a normal pace. The slow descent keeps your legs under tension longer and sharpens your control. Keep your chest tall and heels planted the whole way down.",
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
    "cue": "Sink to the bottom and pulse up and down in a small range.",
    "description": "Lower into a squat, then bounce up and down through the bottom few inches without standing all the way up, keeping constant tension on your quads. After your pulses, stand up. A brutal burnout that torches the thighs.",
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
    "cue": "Feet staggered, drop your back knee straight down.",
    "description": "Stand with one foot forward and one back in a long stance. Bend both knees to lower your back knee straight down toward the floor, keeping your front heel planted, then push back up. Keep your torso upright and most of the weight on your front leg.",
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
    "cue": "Step forward into a lunge, then step through into the next one.",
    "description": "Step forward with one leg and lower until both knees are bent about 90 degrees, front knee over your ankle. Push through your front heel to stand and step straight into the next lunge with the other leg. Keep your chest tall and take controlled, balanced steps.",
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
    "cue": "Step forward, drop into a lunge, then push back to standing.",
    "description": "Step one foot forward and lower until both knees are bent about 90 degrees, keeping your chest up. Push through your front heel to step back to standing, then repeat. Don't let your front knee cave in or shoot way past your toes.",
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
    "cue": "Step backward and drop into a lunge, then return.",
    "description": "Step one foot straight back and lower until both knees are bent about 90 degrees, front heel planted. Push through your front heel to step back to standing. Stepping back is easier on the knees than forward lunges and keeps you more balanced.",
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
    "cue": "Step one foot back and across behind the other, then lunge down.",
    "description": "From standing, step one foot back and diagonally behind the other, then bend both knees to lower into a curtsy. Push through your front heel to return. Keep your hips square and chest tall — it hits the quads plus the side glutes.",
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
    "cue": "Shift your weight down over one bent leg, the other straight out to the side.",
    "description": "Stand with a very wide stance. Shift your weight over to one side, bending that knee deeply while the other leg stays straight with the toes up, then push back to center and switch sides. Great for leg strength and hip mobility — go only as low as you can control.",
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
    "cue": "Rise onto your toes and lean back, bending your knees forward and down.",
    "description": "Hold something for balance, rise onto the balls of your feet, and lean your torso back as you bend your knees forward and down toward the floor. Push back up to standing. It stretches and blasts the quads hard — go slow and only as far as your knees allow.",
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
    "cue": "Slide down a wall until your thighs are level and hold.",
    "description": "Lean your back against a wall and slide down until your thighs are parallel to the floor, knees bent 90 degrees. Hold that position, keeping your back flat against the wall and weight in your heels. Your quads will be burning — build up your hold time.",
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
    "cue": "Hold a wall sit and lift one foot at a time.",
    "description": "Get into a wall sit with thighs level. Keeping your hips down, slowly lift one foot off the floor, lower it, then the other, like marching. The lifting adds a balance and single-leg challenge on top of the quad burn.",
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
    "cue": "Squat all the way down on one leg with the other extended forward.",
    "description": "Stand on one leg with the other held straight out in front. Sit back and down on the standing leg until you're at the bottom, keeping the free leg off the floor, then drive back up. It demands serious strength, balance, and mobility — hold support to progress toward it.",
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
    "cue": "Hold one foot behind you and squat down on the other leg.",
    "description": "Stand on one leg and grab the other foot behind you. Squat down on the standing leg until your back knee nears the floor, then drive back up. An advanced single-leg squat that hammers the quad and tests balance — use support while you learn it.",
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
    "cue": "Balance on one leg and lower your back knee toward the floor.",
    "description": "Stand on one leg with the other bent behind you. Hinge and squat down to lightly tap your back knee to the floor, keeping your standing shin fairly vertical, then drive back up. A great pistol-squat alternative that's a bit friendlier on the knee.",
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
    "cue": "Dip, swing your arms, and jump onto the box landing soft.",
    "description": "Stand facing a sturdy box. Dip down slightly, swing your arms, and jump up to land softly on top with both feet and bent knees. Stand tall, then step down one foot at a time. Land quietly and always step down — don't jump off the box.",
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
    "cue": "Step onto the box and drive up through that heel.",
    "description": "Stand facing a box. Place one whole foot on it and drive up through that heel to stand tall on the box, then step back down under control. Keep your torso upright and push mostly with the top leg — don't bounce off the bottom foot.",
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
    "cue": "Hold a dumbbell at your chest and squat down between your knees.",
    "description": "Hold one dumbbell vertically against your chest with both hands. Squat down, pushing your knees out and keeping your chest tall, until your elbows tuck between your knees, then stand up. Holding the weight in front helps you stay upright and squat deeper.",
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
    "cue": "Hold dumbbells at your sides and squat down and up.",
    "description": "Stand holding a dumbbell in each hand at your sides, feet shoulder-width. Push your hips back and squat until your thighs are about parallel, keeping your chest up and heels down, then stand. Let the weights hang naturally at your sides.",
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
    "cue": "Rest the dumbbells on your shoulders and squat tall.",
    "description": "Hold a dumbbell on each shoulder, elbows up. Squat straight down keeping your chest and elbows high, then stand up. The front-loaded weight keeps you upright and shifts the emphasis onto the quads.",
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
    "cue": "Heels on a small raise, squat deep with a dumbbell at your chest.",
    "description": "Put your heels on a small plate or wedge and hold a dumbbell at your chest. Squat straight down as deep as you comfortably can, then stand. Raising your heels lets you stay more upright and reach a deeper squat that really targets the quads.",
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
    "cue": "Back foot on a bench, drop straight down on your front leg.",
    "description": "Stand a stride in front of a bench and rest the top of your back foot on it, holding dumbbells at your sides. Lower straight down by bending your front knee until your back knee nears the floor, then drive up through your front heel. Keep your torso tall and weight on the front leg.",
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
    "cue": "Feet staggered, dumbbells at your sides, drop your back knee down.",
    "description": "Stand with one foot forward and one back, holding dumbbells at your sides. Bend both knees to lower your back knee toward the floor, keeping your front heel down, then push back up. Both feet stay planted the whole set — only your knees move.",
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
    "cue": "Hold dumbbells and step forward into lunges across the floor.",
    "description": "Hold a dumbbell in each hand at your sides. Step forward into a lunge until both knees are bent about 90 degrees, then push through your front heel and step straight into the next lunge. Keep your chest tall and steps controlled.",
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
    "cue": "Dumbbells at your sides, step back into a lunge, then return.",
    "description": "Hold dumbbells at your sides and step one foot straight back, lowering until both knees are bent about 90 degrees. Push through your front heel to return to standing. Stepping back keeps you stable and is easier on the knees.",
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
    "cue": "Dumbbells at your sides, step forward and drop into a lunge.",
    "description": "Hold dumbbells at your sides and step one foot forward, lowering until both knees bend about 90 degrees, chest tall. Push through your front heel to step back to standing. Control the step so your front knee stays over your ankle.",
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
    "cue": "Dumbbells at your sides, step onto the box and drive up.",
    "description": "Hold dumbbells at your sides and face a box. Place one whole foot on it and drive up through that heel to stand on top, then step back down under control. Push mostly with the top leg rather than bouncing off the floor.",
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
    "cue": "Dumbbells at your sides, step one foot back and across, then lunge.",
    "description": "Hold dumbbells at your sides. Step one foot back and diagonally behind the other, bending both knees into a curtsy, then push through your front heel to return. Keep your hips square. Works the quads and side glutes.",
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
    "cue": "Wide stance, shift down over one bent leg holding a dumbbell.",
    "description": "Stand very wide holding a dumbbell at your chest. Shift your weight over one side, bending that knee deeply while the other leg stays straight, then push back to center and switch. Go as low as you can control — it builds legs and hip mobility.",
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
    "cue": "Hold a kettlebell at your chest and squat between your knees.",
    "description": "Hold a kettlebell by the horns against your chest. Squat straight down, pushing your knees out and keeping your chest tall, then stand up. The front-held bell keeps you upright and lets you squat deep — a great squat to learn the pattern with.",
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
    "cue": "Kettlebell in the rack position, squat tall.",
    "description": "Hold a kettlebell in the rack position against your chest and shoulder, elbow tucked. Squat straight down keeping your chest up, then stand. The front-rack load keeps you upright and hammers the quads and core.",
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
    "cue": "Hold a kettlebell and lunge forward or back.",
    "description": "Hold a kettlebell at your chest or one at your side. Step into a lunge until both knees are bent about 90 degrees, then push through your front heel to return. Keep your torso tall and control the descent.",
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
    "cue": "Hold a kettlebell, step onto the box, and drive up.",
    "description": "Hold a kettlebell at your chest or side and face a box. Place one whole foot on it and drive up through that heel to stand tall, then step back down under control. Lead with the top leg rather than pushing off the floor.",
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
    "cue": "Two kettlebells in the rack, squat deep and stand.",
    "description": "Hold a kettlebell in the rack position on each shoulder, elbows tucked. Squat straight down keeping your chest and elbows up, then drive back to standing. The double front-rack load is a serious quad and core challenge — keep your torso tall.",
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
    "cue": "Hold a kettlebell and step back into a lunge.",
    "description": "Hold a kettlebell at your chest or side and step one foot straight back, lowering until both knees bend about 90 degrees. Push through your front heel to return. The back step keeps you balanced and knee-friendly.",
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
    "cue": "Bar on your upper back, sit down between your heels, then stand.",
    "description": "Rest a barbell across your upper back, brace, and stand with feet shoulder-width. Push your hips back and bend your knees to squat until your thighs are at least parallel, keeping your chest up and heels down, then drive up. Keep your knees tracking over your toes and your back flat.",
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
    "cue": "Bar on your front shoulders, elbows high, squat tall.",
    "description": "Rest the barbell across your front shoulders with your elbows up and hands lightly supporting it. Squat straight down keeping your elbows and chest high, then stand. The front-loaded position forces an upright torso and targets the quads. Keep those elbows up — if they drop, the bar rolls forward.",
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
    "cue": "Squat back to lightly touch a box, then stand.",
    "description": "Set up a back squat over a box or bench set at about parallel height. Squat back and down until you lightly touch the box, stay tight, then drive up without fully relaxing. The box teaches consistent depth and builds power out of the bottom.",
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
    "cue": "Squat to the bottom, pause two seconds, then drive up.",
    "description": "Do a barbell back squat but hold the bottom for a full two seconds before standing. Stay braced and tight through the pause so you don't sink or shift. It builds strength and control right out of the hardest position.",
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
    "cue": "Hold the bar in the crooks of your elbows and squat tall.",
    "description": "Hold a barbell cradled in the crooks of your elbows against your body. Squat straight down keeping your chest up and elbows in, then stand. The front-cradle position hammers the quads, upper back, and core. Pad the bar — it digs into your arms.",
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
    "cue": "Hold the bar locked out overhead and squat under control.",
    "description": "Hold a barbell locked out overhead with a wide grip, arms straight. Squat straight down while keeping the bar stacked over your midfoot, then stand. It demands full-body mobility and control — start with just the bar or a dowel to learn it.",
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
    "cue": "Bar on your back, feet staggered, drop your back knee down.",
    "description": "Rest a barbell on your upper back and stand with one foot forward, one back. Bend both knees to lower your back knee toward the floor, keeping your front heel planted, then drive back up. The bar adds load to a strict single-leg movement — stay tall and balanced.",
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
    "cue": "Push the platform away through your heels, don't lock your knees hard.",
    "description": "Sit in the leg press with your feet shoulder-width on the platform. Lower it by bending your knees toward your chest until they're about 90 degrees, then press it back up through your heels without slamming your knees straight. Keep your lower back flat against the pad.",
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
    "cue": "Shoulders under the pads, squat down and drive up.",
    "description": "Load into the hack squat machine with your shoulders under the pads and feet on the platform. Bend your knees to lower until your thighs are at least parallel, then drive back up through your heels. The back support lets you load the quads heavily and safely.",
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
    "cue": "Straighten your legs against the pad, then lower slowly.",
    "description": "Sit in the leg extension machine with the pad on your shins, ankles behind it. Straighten your legs to lift the pad, squeezing your quads at the top, then lower slowly. Don't swing or slam it — a controlled squeeze isolates the quads.",
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
    "cue": "Belt on your hips, squat down and drive up hands-free.",
    "description": "Strap the belt around your hips in the belt-squat machine and stand on the platform. Squat down until your thighs are parallel, then drive up through your heels. Loading the hips instead of your back is gentle on the spine while smashing the quads.",
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
    "cue": "Bar on your back in the Smith, squat straight down and up.",
    "description": "Set a Smith machine bar across your upper back and stand with feet slightly forward. Squat straight down until your thighs are parallel, then drive up. The fixed bar path removes the balance element, making it a beginner-friendly way to load squats.",
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
    "cue": "Stand on the band, hold the ends up, and squat against it.",
    "description": "Stand on the middle of a band and hold the ends at your shoulders. Squat down until your thighs are about parallel, then stand up against the band's pull. The band resists most as you stand, making the top of the squat the hardest part.",
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
    "cue": "Stand on the band and lunge against its resistance.",
    "description": "Stand on a band with your front foot and hold the ends at your shoulders. Lunge down until both knees bend about 90 degrees, then push back up against the band. Adds resistance to the lunge with no weights.",
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
    "cue": "Hold the straps for balance and squat down and up.",
    "description": "Hold the TRX handles with light tension, feet shoulder-width. Squat down as deep as you comfortably can, using the straps only for balance (not to pull yourself up), then stand. Great for learning squat depth and form with a little support.",
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
    "cue": "Hold the straps and squat down on one leg, using them for balance.",
    "description": "Hold the TRX handles and stand on one leg with the other out in front. Lower into a single-leg squat, using the straps for just enough support to control the descent, then drive back up. A smart way to build toward a full pistol squat.",
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
    "cue": "Anchor your ankles and lower your body forward as slowly as you can.",
    "description": "Kneel with your ankles anchored under a bench or held by a partner, body upright. Keeping your body straight from knees to head, lower yourself forward toward the floor as slowly as possible using your hamstrings, catching with your hands, then push back up. Brutally hard — control the descent and progress gradually.",
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
    "cue": "Bridge up and drag your heels in and out on sliders.",
    "description": "Lie on your back with your heels on sliders (or towels on a smooth floor) and lift your hips into a bridge. Keeping your hips up, slide your heels out until your legs are nearly straight, then drag them back in, curling with your hamstrings. Don't let your hips drop as your legs extend.",
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
    "cue": "Hold a bridge and walk your feet out and back in.",
    "description": "Lift into a glute bridge with hips high. Keeping your hips up, take small steps to walk your feet out until your legs are nearly straight, then walk them back in. The further your feet get, the harder your hamstrings work to keep your hips lifted.",
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
    "cue": "Balance on one leg and hinge forward, reaching toward the floor.",
    "description": "Stand on one leg with a soft knee. Hinge forward at the hip, letting the free leg extend straight behind you, and reach your hands toward the floor until your body forms a T, then return to standing. Keep your back flat and hips square — you'll feel the standing hamstring stretch and work.",
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
    "cue": "Anchor your ankles, hinge at the hips, then curl your body up.",
    "description": "Kneel with your ankles anchored. Hinge forward at the hips to lower your torso, then curl your body back up by driving your hips forward and contracting your hamstrings. Combining a hinge with a curl makes it a touch more doable than a full Nordic — still advanced.",
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
    "cue": "Heels down, hips up, and hold with your hamstrings engaged.",
    "description": "Lie on your back with your knees bent fairly straight and only your heels on the floor. Lift your hips into a bridge and hold, driving through your heels so your hamstrings — not just your glutes — carry the load. Keep your hips high the whole hold.",
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
    "cue": "Bridge on one heel and lift the other knee without dropping your hips.",
    "description": "Lift into a glute bridge with your heels (not toes) planted for hamstring focus. Hold your hips high and level as you slowly lift one knee toward your chest, lower it, then the other. The single-leg support makes your hamstring work hard to keep you stable.",
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
    "cue": "Hands behind your head, hinge forward with a flat back.",
    "description": "Stand with feet hip-width and hands behind your head. Push your hips straight back and hinge your torso forward with a flat back until you feel a stretch in your hamstrings, then squeeze them and your glutes to stand back up. Bend at the hips, not the waist — keep your back flat.",
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
    "cue": "Push your hips back and lower the dumbbells down your legs.",
    "description": "Stand holding dumbbells in front of your thighs with soft knees. Push your hips back and lower the weights down the front of your legs, keeping your back flat, until you feel a stretch in your hamstrings, then drive your hips forward to stand. Keep the dumbbells close to your legs the whole way.",
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
    "cue": "Balance on one leg and hinge, lowering the dumbbell as the back leg rises.",
    "description": "Stand on one leg holding a dumbbell, soft knee. Hinge at the hip, lowering the weight toward the floor as your free leg extends straight behind you, keeping your hips square, then return to standing. Move slowly — it builds hamstring strength and serious balance.",
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
    "cue": "Keep your legs almost straight and lower the dumbbells down your shins.",
    "description": "Stand holding dumbbells with your knees only slightly bent. Push your hips back and lower the weights down the front of your legs, keeping your legs nearly straight and back flat, until you feel a deep hamstring stretch, then stand. The straighter legs give a bigger stretch than an RDL — don't round your back.",
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
    "cue": "Stagger your feet, most weight on the front leg, and hinge.",
    "description": "Stand with one foot slightly back on its toes for balance while the front foot takes most of the load, holding dumbbells. Hinge your hips back and lower the weights down your front leg, then stand. It trains one hamstring at a time while the back foot keeps you steady.",
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
    "cue": "Hold a dumbbell at your chest and hinge forward with a flat back.",
    "description": "Hold a dumbbell against your upper chest and stand with soft knees. Push your hips back and hinge your torso forward with a flat back until you feel a hamstring stretch, then squeeze your glutes and hamstrings to stand. Keep the movement at the hips, not the lower back.",
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
    "cue": "Squeeze a dumbbell between your feet and curl your heels back.",
    "description": "Sit on the edge of a bench holding a dumbbell squeezed between your feet, legs extended. Bend your knees to curl the dumbbell back under the bench by contracting your hamstrings, then extend slowly. A creative way to isolate the hamstrings with just a dumbbell.",
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
    "cue": "Lie face-down, dumbbell between your feet, curl your heels to your butt.",
    "description": "Lie face-down on a bench with a dumbbell held between your feet, legs straight. Curl your heels up toward your butt by squeezing your hamstrings, then lower slowly. Keep your hips pressed to the bench so it stays a pure hamstring curl.",
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
    "cue": "Wide stance, toes out, hinge and lower the dumbbells between your legs.",
    "description": "Stand wide with toes turned out, holding a dumbbell (or two) between your legs. Push your hips back and lower the weight down between your legs with a flat back, then drive your hips forward to stand. The wide stance brings in the inner thighs alongside the hamstrings.",
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
    "cue": "One foot slightly back for balance, hinge over the front leg.",
    "description": "Stand with one foot a few inches back on its toes and holding dumbbells. Hinge your hips back and lower the weights down your front leg with a flat back, then stand. The stagger loads the front hamstring while the back foot just helps you balance.",
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
    "cue": "Push your hips back and lower the dumbbells, then stand tall.",
    "description": "Hold dumbbells in front of your thighs with soft knees. Practice pushing your hips straight back and letting your torso tip forward with a flat back, lowering the weights to about knee height, then squeeze your glutes to stand. A great way to learn the hinge that underpins all deadlifts.",
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
    "cue": "Push your hips back and lower the bar down your legs, back flat.",
    "description": "Stand holding a barbell at your thighs with soft knees. Push your hips back and slide the bar down the front of your legs, keeping it close and your back flat, until you feel a hamstring stretch around shin height, then drive your hips forward to stand. Keep the bar against your legs and never round your back.",
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
    "cue": "Legs nearly straight, lower the bar down your shins for a deep stretch.",
    "description": "Stand holding a barbell with only a slight knee bend. Push your hips back and lower the bar down the front of your legs, keeping them nearly straight and your back flat, until you feel a deep hamstring stretch, then stand. The straight legs maximize the stretch — go lighter and keep your spine neutral.",
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
    "cue": "Bar on your back, hinge forward with a flat back, then stand.",
    "description": "Rest a barbell across your upper back and stand with soft knees. Push your hips back and hinge your torso forward with a flat back until you feel a hamstring stretch, then squeeze your glutes and hamstrings to stand tall. Go light and keep your back flat — this one demands respect.",
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
    "cue": "Grip the bar wide and hinge, lowering it down your legs.",
    "description": "Hold a barbell with a very wide (snatch) grip at your thighs, soft knees. Push your hips back and lower the bar down your legs with a flat back until you feel a hamstring stretch, then stand. The wide grip makes your upper back work overtime on top of the hamstrings.",
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
    "cue": "Stand on a box to lower the bar even further for a bigger stretch.",
    "description": "Stand on a low box or plate holding a barbell. Hinge your hips back and lower the bar past where the floor normally stops you, chasing a deeper hamstring stretch with a flat back, then stand. Only add the deficit once your regular RDL is solid.",
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
    "cue": "Lie face-down and curl your heels up to your butt.",
    "description": "Lie face-down on the leg curl machine with the pad on the back of your ankles. Curl your heels up toward your butt by squeezing your hamstrings, then lower slowly. Keep your hips pressed into the pad so you don't arch your back to cheat.",
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
    "cue": "Push the pad down and back with your heels.",
    "description": "Sit in the seated leg curl with the pad on the back of your ankles and the thigh pad snug. Curl your heels down and back underneath you by squeezing your hamstrings, then return slowly. Pause at the fully-curled position for an extra squeeze.",
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
    "cue": "Anchor your feet, lower your torso, then curl yourself back up.",
    "description": "Set up in the glute-ham bench with your feet anchored and thighs on the pad. Lower your torso forward until your body is straight, then squeeze your hamstrings and glutes to pull yourself back up. One of the best hamstring builders there is — it's advanced, so ease in.",
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
    "cue": "Hinge down over the pad, then squeeze up to a straight line.",
    "description": "Set up in the 45-degree back extension with the pad at your hips and feet anchored. Hinge forward at the hips to lower your torso, then squeeze your glutes and hamstrings to rise until your body is in a straight line. Don't over-arch at the top — stop at straight.",
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
    "cue": "Face away from the cable, hinge, then drive your hips forward.",
    "description": "Face away from a low cable with a rope passed between your legs, holding the ends. Push your hips back to let the rope pull your hands back, hinging with a flat back, then drive your hips forward to stand tall and squeeze your glutes. It teaches the hinge with constant tension.",
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
    "cue": "Hold the low cable and hinge your hips back, then stand.",
    "description": "Face a low cable holding the handle at your thighs, soft knees. Push your hips back and lower the handle down your legs with a flat back until you feel a hamstring stretch, then stand. The cable keeps steady tension through the whole hinge.",
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
    "cue": "Ankle strap on, curl your heel back toward your butt.",
    "description": "Attach an ankle strap to a low cable, face the machine, and hold on for balance. Curl that heel back toward your butt by squeezing your hamstring, then return under control. Keep your thigh still so the movement comes only from the knee.",
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
    "cue": "Push your hips back and lower the kettlebell down your legs.",
    "description": "Hold a kettlebell in front of your thighs with soft knees. Push your hips back and lower the bell down the front of your legs with a flat back until you feel a hamstring stretch, then drive your hips forward to stand. Keep the bell close to your body throughout.",
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
    "cue": "Balance on one leg and hinge, lowering the kettlebell as your back leg rises.",
    "description": "Stand on one leg holding a kettlebell, soft knee. Hinge at the hip, lowering the bell toward the floor as your free leg lifts straight behind you, keeping your hips square, then return to standing. Slow and controlled — it builds hamstring strength and balance at once.",
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
    "cue": "Stand on the band and hinge your hips back against it.",
    "description": "Stand on the middle of a band holding the ends at your thighs, soft knees. Push your hips back and hinge down against the band's pull with a flat back, then stand and squeeze your glutes. The band resists most as you stand, loading the top of the hinge.",
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
    "cue": "Anchor the band at your ankle and curl your heel to your butt.",
    "description": "Lie face-down with a band looped around one ankle and anchored in front of you. Curl that heel toward your butt against the band by squeezing your hamstring, then lower slowly. Keep your hips pressed down so it stays a clean curl.",
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
    "cue": "Face away from the anchor, hinge, then drive your hips forward.",
    "description": "Anchor a band low behind you and pass the ends between your legs, holding them in front. Push your hips back to hinge with a flat back, then drive your hips forward to stand and squeeze your glutes. A joint-friendly way to drill the hinge with band tension.",
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
    "cue": "Heels in the straps, bridge up, and curl your heels toward your butt.",
    "description": "Lie on your back with your heels in the TRX foot cradles and lift your hips into a bridge. Keeping your hips high, curl your heels in toward your butt, then extend them back out slowly. Don't let your hips sag as your legs straighten — that's where the hamstrings earn it.",
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
    "cue": "Lie on your back and drive your hips up by squeezing your glutes.",
    "description": "Lie on your back with knees bent and feet flat, hip-width apart. Drive through your heels to lift your hips until your body forms a straight line from knees to shoulders, squeezing your glutes hard at the top, then lower slowly. Push with your glutes, not your lower back.",
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
    "cue": "Bridge up driving through one heel, other leg extended.",
    "description": "Lie on your back with one knee bent, foot flat, and the other leg straight out. Drive through the planted heel to lift your hips, squeezing that glute, then lower slowly. Keep your hips level — don't let the raised-leg side dip.",
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
    "cue": "Hold a bridge up top and lift one knee at a time without dropping your hips.",
    "description": "Lift into a glute bridge and hold it. Keeping your hips high and level, slowly lift one knee toward your chest, lower it, then the other — like marching. The challenge is keeping your hips from sagging or twisting as each leg lifts.",
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
    "cue": "Shoulders on the bench, drive your hips up and squeeze.",
    "description": "Sit on the floor with your upper back against a bench, knees bent and feet flat. Drive through your heels to lift your hips until your thighs are level, squeezing your glutes hard, then lower slowly. Tuck your chin and keep your ribs down so your back doesn't arch.",
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
    "cue": "Back on the bench, thrust up on one leg with the other extended.",
    "description": "Rest your upper back on a bench with one foot planted and the other leg extended. Drive through the planted heel to lift your hips level, squeezing that glute, then lower slowly. Keep your hips square — don't let the free-leg side drop.",
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
    "cue": "Soles of your feet together, knees out, and pump your hips up.",
    "description": "Lie on your back, put the soles of your feet together and let your knees fall out wide. Drive your hips up by squeezing your glutes, then lower. The frog position turns your feet out so the glutes do the work with almost no quad or hamstring help.",
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
    "cue": "Feet together, knees wide, lift and hold the bridge.",
    "description": "Lie on your back with the soles of your feet together and knees dropped out wide. Lift your hips by squeezing your glutes and hold briefly at the top, then lower slowly. A great glute activator that isolates them through the frog stance.",
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
    "cue": "On all fours, kick one heel toward the ceiling, knee bent.",
    "description": "Start on all fours. Keeping your knee bent 90 degrees, kick one foot up toward the ceiling by squeezing that glute until your thigh is level with your body, then lower under control. Keep your back flat and hips square — don't twist to lift higher.",
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
    "cue": "On all fours, press one straight leg back and up.",
    "description": "Start on all fours. Extend one leg straight back and lift it to hip height by squeezing your glute, then lower under control. Keep your core braced and your lower back flat so the glute does the work, not your spine.",
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
    "cue": "On all fours, lift one bent knee out to the side.",
    "description": "Start on all fours with knees bent. Lift one knee out to the side, keeping the bend, until your thigh is about level, then lower under control. Keep your torso still — don't rock onto the other side to swing it up. Hits the side glutes.",
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
    "cue": "Lie on your side, knees bent, and open your top knee like a clam.",
    "description": "Lie on your side with your knees bent and stacked, feet together. Keeping your feet touching and hips still, lift your top knee up and open, then lower slowly. Don't let your hips roll back — the movement comes purely from the side glute.",
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
    "cue": "Lie on your side and raise your top straight leg up.",
    "description": "Lie on your side with your legs straight and stacked. Raise the top leg up toward the ceiling, leading with your heel, then lower slowly. Keep your toes pointing forward, not up, so the side glute does the lifting rather than the hip flexor.",
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
    "cue": "Stand tall and lift one straight leg out to the side.",
    "description": "Stand tall holding something for balance. Lift one straight leg out to the side as far as you comfortably can, keeping your torso upright, then lower under control. Don't lean away to swing it higher — small and strict works the side glute best.",
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
    "cue": "Step into a curtsy lunge and hold, squeezing the front glute.",
    "description": "Step one foot back and across behind the other into a curtsy lunge, then hold near the bottom and squeeze the front glute. Keep your chest tall and hips square. The isometric hold builds control and lights up the side and rear glute.",
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
    "cue": "Lie face-down over a bench and lift your straight legs up.",
    "description": "Lie face-down on a bench with your hips at the edge and legs hanging down, holding the bench for support. Lift your straight legs up behind you by squeezing your glutes until level with your body, then lower slowly. Great for the glutes and lower back — keep the movement controlled.",
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
    "cue": "In a plank, lift one straight leg up without arching your back.",
    "description": "Hold a forearm plank with a tight core. Lift one straight leg a few inches by squeezing that glute, hold briefly, then lower and switch. Keep your hips level and back flat — the lift is small; the glute and core work is the point.",
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
    "cue": "Dumbbell on your hips, back on the bench, thrust up and squeeze.",
    "description": "Rest your upper back on a bench with a dumbbell held across your hips, feet flat. Drive through your heels to lift your hips until your thighs are level, squeezing your glutes, then lower slowly. Keep your chin tucked and ribs down to protect your back.",
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
    "cue": "Dumbbell on your hips, bridge up by squeezing your glutes.",
    "description": "Lie on your back with knees bent and a dumbbell held across your hips. Drive through your heels to lift your hips into a straight line, squeezing your glutes, then lower slowly. The weight adds resistance right where the glutes work hardest.",
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
    "cue": "Feet together, knees wide, pump your hips up with a dumbbell on them.",
    "description": "Lie on your back with the soles of your feet together and knees wide, a dumbbell held on your hips. Pump your hips up by squeezing your glutes, then lower. The frog stance plus added weight makes it a glute-only burner.",
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
    "cue": "One foot planted, dumbbell on your hip, thrust up.",
    "description": "Rest your upper back on a bench with a dumbbell on your hips, one foot planted and the other leg extended. Drive through the planted heel to lift your hips level, squeezing that glute, then lower slowly. Keep your hips square throughout.",
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
    "cue": "Stagger your feet, load 90% on the front, and thrust up.",
    "description": "Set up a hip thrust with a dumbbell on your hips, but stagger your feet so one is slightly ahead and takes most of the weight while the other lightly assists for balance. Drive through the front heel to lift your hips. It targets one glute at a time while keeping you stable.",
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
    "cue": "Wide stance, toes out, squat down and drive up through your heels.",
    "description": "Stand with a wide stance and toes turned out, holding a dumbbell between your legs. Squat straight down keeping your chest tall, then drive up through your heels, squeezing your glutes at the top. The wide, turned-out stance emphasizes the glutes and inner thighs.",
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
    "cue": "One heel planted, dumbbell on your hip, bridge up.",
    "description": "Lie on your back with a dumbbell on your hips, one knee bent and foot planted, the other leg straight. Drive through the planted heel to lift your hips, squeezing that glute, then lower slowly. Keep your hips level as you lift.",
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
    "cue": "Kettlebell on your hips, back on the bench, thrust up and squeeze.",
    "description": "Rest your upper back on a bench with a kettlebell held on your hips. Drive through your heels to lift your hips level, squeezing your glutes, then lower slowly. Keep your chin tucked and core braced.",
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
    "cue": "Kettlebell on your hips, bridge up squeezing your glutes.",
    "description": "Lie on your back with knees bent and a kettlebell on your hips. Drive through your heels to lift your hips into a straight line, squeezing your glutes, then lower. The bell adds resistance right at the top of the bridge.",
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
    "cue": "Wide stance, toes out, squat and drive up holding a kettlebell.",
    "description": "Stand wide with toes turned out, holding a kettlebell between your legs. Squat straight down with a tall chest, then drive up through your heels and squeeze your glutes at the top. The stance loads the glutes and inner thighs.",
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
    "cue": "Feet together, knees wide, pump your hips up with a kettlebell on them.",
    "description": "Lie on your back with the soles of your feet together and knees dropped wide, a kettlebell on your hips. Pump your hips up by squeezing your glutes, then lower. Isolates the glutes with the frog stance plus added load.",
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
    "cue": "Bar across your hips, back on the bench, drive your hips up level.",
    "description": "Sit with your upper back against a bench and a padded barbell across your hips, feet flat. Drive through your heels to lift your hips until your thighs are level, squeezing your glutes hard, then lower slowly. Keep your chin tucked and ribs down so you thrust with glutes, not lower back.",
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
    "cue": "Bar on your hips, bridge up squeezing your glutes.",
    "description": "Lie on your back with knees bent and a padded barbell across your hips. Drive through your heels to lift your hips into a straight line, squeezing your glutes, then lower slowly. The floor range is shorter than a hip thrust but lets you load heavy.",
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
    "cue": "Feet together, knees wide, pump your hips up with the bar.",
    "description": "Lie on your back with the soles of your feet together and knees wide, a padded barbell across your hips. Pump your hips up by squeezing your glutes, then lower. The frog stance keeps it glute-focused while the bar adds serious load.",
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
    "cue": "Bar on your hips, thrust up on one leg.",
    "description": "Set up a barbell hip thrust but plant one foot and extend the other leg. Drive through the planted heel to lift your hips level, squeezing that glute, then lower slowly. Balancing the bar on one leg is advanced — keep your hips square and start light.",
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
    "cue": "Stagger your feet, most weight on the front, thrust the bar up.",
    "description": "Set up a barbell hip thrust with a staggered stance — one foot forward taking most of the load, the other lightly assisting. Drive through the front heel to lift your hips, squeezing that glute. It overloads one glute while the back foot keeps you steady.",
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
    "cue": "Pad on your hips, drive your hips forward and squeeze.",
    "description": "Sit in the hip thrust machine with the pad across your hips and feet on the platform. Drive your hips forward and up until your body is level, squeezing your glutes, then return under control. The fixed setup makes it easy to load heavy and safe.",
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
    "cue": "Press one foot back against the pad, squeezing your glute.",
    "description": "Set up in the glute kickback machine with one foot on the pedal and torso supported. Press that foot back and up by squeezing your glute until your leg extends, then return under control. Keep your back flat and let the glute drive the motion.",
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
    "cue": "Push your knees out against the pads.",
    "description": "Sit in the abduction machine with the pads against the outsides of your knees. Push your knees apart against the resistance, squeezing your side glutes, then return slowly. Pause at the widest point for an extra squeeze — don't slam it back.",
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
    "cue": "Bar on your hips in the Smith machine, thrust up level.",
    "description": "Set up a hip thrust under a Smith machine bar resting on your hips, upper back on a bench. Drive through your heels to lift your hips until level, squeezing your glutes, then lower slowly. The fixed bar path lets you push hard without balancing.",
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
    "cue": "Ankle strap on, kick one leg straight back squeezing your glute.",
    "description": "Attach an ankle strap to a low cable, face the machine, and hold on for balance. Kick that leg straight back by squeezing your glute, then return under control. Keep your torso still and don't arch your back to swing it higher.",
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
    "cue": "Ankle strap on, lift one straight leg out to the side.",
    "description": "Attach an ankle strap to a low cable, stand side-on, and hold the machine for balance. Lift the strapped leg out to the side against the cable, then return slowly. Keep your torso upright so the side glute does the work.",
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
    "cue": "Rope on your hips, thrust up against the cable.",
    "description": "Sit on the floor facing away from a low cable with a rope looped over your hips, upper back on a bench. Drive your hips up against the cable's pull until level, squeezing your glutes, then lower slowly. The cable keeps tension even at the top.",
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
    "cue": "On all fours, kick one leg back against the cable.",
    "description": "Attach an ankle strap to a low cable and get on all fours facing away. Kick that leg straight back and up by squeezing your glute, then return under control. Keep your back flat and hips square — the cable adds constant tension.",
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
    "cue": "Band over your hips, thrust up against it and squeeze.",
    "description": "Loop a band over your hips and anchor it low, upper back on a bench, feet flat. Drive through your heels to lift your hips level against the band, squeezing your glutes, then lower slowly. The band resists hardest at the top squeeze.",
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
    "cue": "Band around your knees, bridge up while pushing your knees out.",
    "description": "Lie on your back with a band around your knees, feet flat. Drive your hips up while pushing your knees out against the band, squeezing your glutes, then lower. Pushing out adds side-glute work to the bridge.",
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
    "cue": "Band around your legs, step sideways staying low.",
    "description": "Loop a band around your legs (knees or ankles), sink into a half-squat, and step sideways one foot at a time, keeping tension on the band. Take several steps each way. Stay low and don't let your knees cave in — it's a burner for the side glutes.",
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
    "cue": "Band around your legs, step forward and out at angles.",
    "description": "Loop a band around your legs and sink into a half-squat. Walk forward taking wide, angled steps — out and forward — keeping constant tension on the band, then walk back. Great for the glutes and hip stability. Stay low the whole time.",
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
    "cue": "Band around your knees, open your top knee against it.",
    "description": "Lie on your side with a band around your knees, knees bent and stacked, feet together. Open your top knee against the band, then lower slowly. The band ramps up the side-glute burn compared to the bodyweight version.",
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
    "cue": "Band around your ankles, kick one leg straight back.",
    "description": "Loop a band around your ankles and stand tall holding something for balance. Kick one leg straight back against the band by squeezing your glute, then return under control. Keep your torso upright — don't lean forward to swing it.",
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
    "cue": "Band around your legs, push one leg out to the side.",
    "description": "Loop a band around your legs and stand tall, holding support. Push one straight leg out to the side against the band, then return slowly. Keep your torso still so the side glute does the lifting.",
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
    "cue": "Heels in the straps, drive your hips up and squeeze.",
    "description": "Lie on your back with your heels in the TRX foot cradles, knees bent. Drive through your heels to lift your hips into a straight line, squeezing your glutes, then lower slowly. The unstable straps make your glutes and hamstrings work to stay balanced.",
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
    "cue": "Shoulders on a box, drive your hips up to a full squeeze.",
    "description": "Rest your upper back on a box or sturdy step with feet flat and hips hanging. Drive through your heels to lift your hips until your thighs are level, squeezing your glutes hard, then lower slowly. The elevated shoulders give a bigger range than a floor bridge.",
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
    "cue": "Hold a straight line on your forearms, bracing your abs and glutes.",
    "description": "Rest on your forearms and toes with your elbows under your shoulders, body in a straight line from head to heels. Brace your abs and squeeze your glutes to hold the line, breathing steadily. Don't let your hips sag down or pike up — one flat plank.",
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
    "cue": "Hold a straight line on your hands, arms straight, core tight.",
    "description": "Get into the top of a push-up with your hands under your shoulders, arms straight and body in a straight line. Brace your abs and glutes and hold. Keep your hips level and don't let your lower back sag — think one solid board.",
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
    "cue": "Prop on one forearm and lift your hips into a straight side line.",
    "description": "Lie on your side, prop up on one forearm with your elbow under your shoulder, and stack your feet. Lift your hips so your body forms a straight line from head to feet, and hold. Don't let your hips sink — squeeze your side abs to stay lifted.",
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
    "cue": "In a side plank, lower your hip toward the floor and lift it back up.",
    "description": "Get into a side plank on your forearm. Lower your bottom hip toward the floor, then lift it back up to the straight line, squeezing your side abs. Move slowly and keep your body in one plane — don't rotate forward or back.",
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
    "cue": "In a high plank, tap the opposite shoulder without rocking your hips.",
    "description": "Hold a high plank with your feet a bit wide. Lift one hand to tap the opposite shoulder, then return it and switch, keeping your hips as still as possible. The challenge is resisting the urge to rock side to side — that stillness is the core work.",
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
    "cue": "From a forearm plank, rock your body forward and back on your toes.",
    "description": "Hold a forearm plank, ideally with your feet on sliders. Rock your whole body forward and back a few inches by pushing through your forearms, keeping a straight line the entire time. The sawing motion cranks up the core demand of a normal plank.",
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
    "cue": "On hands and toes with knees hovering an inch off the floor, hold still.",
    "description": "Start on all fours, tuck your toes, and lift your knees just an inch off the floor. Hold with a flat back and braced core, knees hovering. Keep your hips level and don't let your back round or sag — it's a deceptively hard hold.",
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
    "cue": "From a plank, drive one knee to the same-side elbow.",
    "description": "Hold a high plank. Drive one knee forward toward the same-side elbow, squeezing your abs, then return it and switch. Keep your hips low and level rather than piking up as the knee comes in. Works the abs and obliques.",
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
    "cue": "On your back, lower the opposite arm and leg while pressing your low back down.",
    "description": "Lie on your back with your arms pointing up and knees bent 90 degrees over your hips. Slowly lower one arm overhead and the opposite leg toward the floor, then return and switch, keeping your lower back pressed flat to the floor the whole time. If your back arches, don't reach as far.",
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
    "cue": "On all fours, extend the opposite arm and leg, then switch.",
    "description": "Start on all fours. Reach one arm straight forward and the opposite leg straight back until level with your body, then return and switch sides. Keep your hips square and core braced so you don't tip — slow and controlled beats fast and wobbly.",
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
    "cue": "Extend the opposite arm and leg and hold steady and level.",
    "description": "From all fours, reach one arm forward and the opposite leg back until level with your torso, then hold. Keep your hips square and back flat, resisting any tilt. Builds deep core and lower-back stability. Switch sides each set.",
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
    "cue": "In a side plank, drive your top knee toward your chest.",
    "description": "Hold a side plank on your forearm. Drive your top knee in toward your chest, then extend it back out straight, keeping your hips lifted. Adding the moving leg makes your side abs and hip work overtime while you fight to stay balanced.",
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
    "cue": "Curl your shoulders off the floor toward your knees.",
    "description": "Lie on your back with knees bent and feet flat, hands by your head. Curl your upper back and shoulders off the floor toward your knees by squeezing your abs, then lower slowly. Don't yank on your neck — the lift comes from your abs, not your hands.",
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
    "cue": "Curl your knees up toward your chest, lifting your hips off the floor.",
    "description": "Lie on your back with your knees bent over your hips, hands by your sides. Curl your knees toward your chest and lift your hips slightly off the floor by squeezing your lower abs, then lower slowly. Keep it controlled — don't swing your legs to create momentum.",
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
    "cue": "Bring the opposite elbow to knee, pedaling your legs.",
    "description": "Lie on your back with hands by your head and legs lifted. Bring one elbow toward the opposite knee while extending the other leg, then switch sides in a pedaling motion. Rotate through your torso, not just your elbows, and keep it slow enough to feel your obliques working.",
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
    "cue": "Curl all the way up until your torso is upright.",
    "description": "Lie on your back with knees bent and feet flat. Curl your whole torso up until you're sitting upright, then lower slowly with control. Keep your feet down and lead with your chest, not your neck. Anchor your feet if you need to.",
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
    "cue": "Lift your straight legs and torso up at once to touch your toes.",
    "description": "Lie flat with arms overhead and legs straight. Simultaneously lift your torso and legs, reaching your hands toward your toes so your body makes a V, then lower slowly. Keep your legs as straight as you can — bend them slightly if you need to at first.",
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
    "cue": "Sit up and tuck your knees to your chest at the same time.",
    "description": "Lie flat with arms overhead and legs straight. Crunch up while tucking your knees to your chest, bringing your hands to meet your shins, then extend back out and lower. An easier stepping stone toward the full V-up.",
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
    "cue": "Legs up straight, reach your hands toward your toes.",
    "description": "Lie on your back with your legs straight up toward the ceiling. Curl your shoulders off the floor and reach your hands toward your toes, squeezing your upper abs, then lower slowly. Keep your legs vertical and lift from the abs, not your neck.",
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
    "cue": "Legs dropped to one side, crunch straight up.",
    "description": "Lie on your back and drop both bent knees to one side, hands by your head. Crunch your shoulders straight up off the floor, targeting the obliques on the stretched side, then lower slowly. Do all reps on one side, then switch.",
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
    "cue": "Lift your knee to the side and crunch your elbow down to meet it.",
    "description": "Stand with your hands by your head. Lift one knee out to the side while crunching your same-side elbow down toward it, squeezing your oblique, then return to standing. A simple, joint-friendly way to hit the side abs anywhere.",
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
    "cue": "Keep your legs straight and lower them slowly without arching your back.",
    "description": "Lie flat with your legs straight and hands under your lower back or by your sides. Lift your straight legs to vertical, then lower them slowly toward the floor without letting your lower back arch up, and raise again. Stop lowering at the point where your back would lift — that protects your spine.",
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
    "cue": "Legs straight and low, kick them up and down in small alternating beats.",
    "description": "Lie on your back with your legs straight and lifted a few inches off the floor. Kick them up and down in small, quick alternating beats, keeping your lower back pressed to the floor. Lower the kicks (closer to the floor) to make it harder on the lower abs.",
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
    "cue": "Legs low and straight, cross them over and apart.",
    "description": "Lie on your back with your legs straight and lifted a few inches. Open them apart, then cross one over the other, alternating which is on top, like scissors. Keep your lower back flat to the floor and the movement smooth and controlled.",
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
    "cue": "Pull your knees in to your chest, then extend back out.",
    "description": "Sit leaning back slightly or lie down with your legs extended. Pull your knees in toward your chest by squeezing your abs, then extend your legs back out straight without touching the floor. Keep tension on your abs the whole time.",
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
    "cue": "Press your low back down and hold a shallow banana shape.",
    "description": "Lie on your back and lift your arms overhead and legs off the floor, pressing your lower back firmly into the ground so your body makes a shallow banana shape. Hold it, breathing steadily. If your back lifts, bring your arms or legs higher to make it easier.",
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
    "cue": "Hold the hollow shape and rock gently head-to-toe.",
    "description": "Get into a hollow body hold with your lower back pressed down. Keeping that rigid banana shape, rock your whole body gently back and forth from shoulders to hips. Don't let the rocking break your shape — the tension is the point.",
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
    "cue": "Balance on your sit bones with legs and torso lifted into a V.",
    "description": "Sit and lean back, lifting your legs so your body forms a V balanced on your sit bones, arms reaching forward. Hold with a tall chest and braced core. Bend your knees to make it easier, or straighten your legs to make it harder.",
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
    "cue": "Legs up, rotate them side to side like wipers.",
    "description": "Lie on your back with your arms out wide and legs lifted toward the ceiling. Keeping your legs mostly straight and shoulders down, lower them to one side, then sweep across to the other like windshield wipers. Control the rotation with your obliques — go only as far as you can without your shoulders lifting.",
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
    "cue": "From a crab position, lift your hips and reach one hand overhead.",
    "description": "Sit with your hands behind you and feet flat, then lift your hips into a reverse tabletop. Reach one hand up and over toward the opposite side while pushing your hips high, then return and switch. It works the core while opening the shoulders and hips.",
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
    "cue": "Hang from the bar and curl your knees up to your chest.",
    "description": "Hang from a pull-up bar with straight arms. Curl your knees up toward your chest by squeezing your lower abs, then lower slowly. Avoid swinging — if you're using momentum, slow down and control both directions.",
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
    "cue": "Hang and raise your straight legs up to horizontal.",
    "description": "Hang from a pull-up bar with straight arms and legs. Raise your straight legs up until they're at least horizontal by squeezing your abs, then lower slowly. Keep your legs straight and don't swing — control is everything here.",
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
    "cue": "Hang and bring your toes all the way up to the bar.",
    "description": "Hang from a pull-up bar with straight arms. Raise your straight legs all the way up to touch the bar between your hands, then lower under control. A serious ab and grip challenge — build up with knee and leg raises first.",
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
    "cue": "Hang and curl your knees up toward one side, then the other.",
    "description": "Hang from a pull-up bar. Curl your knees up and toward one side to hit the obliques, lower, then raise toward the other side. Keep the movement controlled with no swinging so your side abs do the work.",
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
    "cue": "Hold a dumbbell on your chest and crunch up.",
    "description": "Lie on your back with knees bent, holding a dumbbell against your chest or over your forehead. Crunch your shoulders off the floor by squeezing your abs, then lower slowly. The added weight makes each rep count — keep it controlled, no yanking.",
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
    "cue": "Hold a dumbbell to your chest and sit all the way up.",
    "description": "Lie on your back with knees bent, holding a dumbbell against your chest. Curl your whole torso up until you're upright, then lower slowly. Anchor your feet if needed and keep the weight snug to your chest throughout.",
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
    "cue": "Hold a dumbbell at one side and bend sideways toward it, then back up.",
    "description": "Stand tall holding a dumbbell in one hand at your side. Bend directly sideways toward the weight, then squeeze your opposite obliques to pull back up straight. Move in a straight side plane — don't lean forward or back. Do all reps, then switch sides.",
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
    "cue": "Lean back with your feet up and twist the dumbbell side to side.",
    "description": "Sit leaning back with your knees bent and feet lifted, holding a dumbbell with both hands. Twist your torso to tap the weight toward the floor on one side, then the other. Rotate from your ribs, not just your arms, and keep your chest tall.",
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
    "cue": "Swing the dumbbell diagonally from high to low across your body.",
    "description": "Hold a dumbbell in both hands up by one shoulder. Rotate your torso and swing it down and across your body to the opposite hip, pivoting your back foot, then control it back up. The chopping motion trains the obliques and rotational power.",
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
    "cue": "Carry a dumbbell in one hand and walk tall without leaning.",
    "description": "Hold a dumbbell in one hand at your side and walk a set distance, standing tall and keeping your torso upright against the pull. Don't lean toward the weight — your core fights to keep you straight. Switch hands and repeat.",
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
    "cue": "Kettlebell locked overhead, hinge sideways and reach for the floor.",
    "description": "Hold a kettlebell locked out overhead with your eyes on it. Push your hips toward the overhead side and hinge sideways, sliding your free hand down your leg toward the floor while keeping the bell up, then return to standing. Move slowly — it builds core strength, shoulder stability, and mobility.",
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
    "cue": "Kettlebell at one side, bend sideways toward it and back up.",
    "description": "Stand holding a kettlebell in one hand at your side. Bend directly sideways toward the bell, then squeeze the opposite obliques to return upright. Keep the motion in a straight side plane. Do all reps, then switch sides.",
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
    "cue": "Lean back, feet up, and twist the kettlebell side to side.",
    "description": "Sit leaning back with knees bent and feet lifted, holding a kettlebell at your chest. Twist your torso to bring the bell toward the floor on one side, then the other. Rotate from your midsection and keep your chest tall.",
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
    "cue": "Carry a kettlebell in one hand and walk tall against the lean.",
    "description": "Hold a kettlebell in one hand at your side and walk a set distance, staying upright and resisting the pull to lean toward it. Your core braces to keep you straight. Switch hands and repeat.",
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
    "cue": "Lean back, feet up, and twist the ball side to side.",
    "description": "Sit leaning back with knees bent and feet lifted, holding a medicine ball at your chest. Twist your torso to tap the ball toward the floor on each side. Rotate through your ribs and keep your chest tall for a strong oblique squeeze.",
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
    "cue": "Sit up and throw the ball at a wall or partner, then catch and repeat.",
    "description": "Lie back holding a medicine ball overhead, feet anchored. Explosively sit up and throw the ball to a wall or partner, catch the rebound, and lower back down under control. The throw adds power and speed to the sit-up. Great for explosive core strength.",
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
    "cue": "Swing the ball diagonally from high to low across your body.",
    "description": "Hold a medicine ball with both hands up by one shoulder. Rotate and swing it down and across to the opposite hip, pivoting your back foot, then bring it back up. Trains the obliques and rotational power with a smooth, controlled chop.",
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
    "cue": "V-up and pass the ball between your hands and feet each rep.",
    "description": "Lie flat holding a medicine ball overhead. Perform a V-up and pass the ball from your hands to between your feet at the top, lower, then V-up again to pass it back to your hands. The hand-off makes an already-tough V-up even harder.",
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
    "cue": "Kneel and roll the wheel out, then pull it back with your abs.",
    "description": "Kneel holding an ab wheel on the floor. Roll it out in front of you, extending your body as far as you can while keeping your back flat and abs braced, then pull it back in. Only roll as far as you can control without your lower back sagging — it's an advanced move.",
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
    "cue": "From standing, roll the wheel all the way out and back.",
    "description": "Stand bent over with an ab wheel on the floor. Roll it out until your body is nearly flat and extended, keeping your back from arching, then pull it back and stand up. The hardest rollout there is — master the kneeling version first.",
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
    "cue": "Kneel and crunch your ribs down toward your knees against the cable.",
    "description": "Kneel facing a high cable with a rope held by your head. Crunch your ribs down toward your knees by rounding your upper back and squeezing your abs, then return under control. Keep your hips still — the movement is your spine curling, not your hips folding.",
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
    "cue": "Pull the cable diagonally from high to low across your body.",
    "description": "Set a cable high and hold the handle with both hands. Rotate and pull it down and across your body to the opposite hip, pivoting your back foot, then control it back up. Constant cable tension makes the obliques work through the whole chop.",
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
    "cue": "Rotate the cable across your body at waist height, arms straight.",
    "description": "Stand side-on to a cable set at waist height, holding the handle with both hands and arms extended. Rotate your torso away from the machine, keeping your arms straight, then return under control. Turn from your midsection, not your arms.",
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
    "cue": "Press the handle straight out and resist the twist toward the machine.",
    "description": "Stand side-on to a cable at chest height, holding the handle at your chest with both hands. Press it straight out in front of you and hold, resisting the cable's pull to rotate you, then bring it back in. Your core works by refusing to twist — that's the whole exercise.",
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
    "cue": "Grip the handles and crunch your ribs toward your hips.",
    "description": "Sit in the ab crunch machine and grip the handles or rest your chest on the pad. Crunch by curling your ribs toward your hips against the resistance, then return slowly. The fixed path makes it easy to feel your abs and load them heavier than bodyweight.",
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
    "cue": "Rotate your torso against the pads, then return under control.",
    "description": "Sit in the rotation machine with the pads against your torso and your lower body locked in place. Rotate your upper body to one side against the resistance, then return slowly. Keep the motion controlled — don't fling it. Do both directions.",
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
    "cue": "Support on your forearms and raise your knees or legs up.",
    "description": "Support yourself on your forearms in the captain's chair with your back against the pad and legs hanging. Raise your knees (easier) or straight legs (harder) up toward your chest by squeezing your abs, then lower slowly. No swinging — control both directions.",
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
    "cue": "Press the band straight out and resist being pulled into a twist.",
    "description": "Anchor a band at chest height, stand side-on, and hold it at your chest with both hands. Press it straight out in front and hold, resisting the band's pull to rotate you, then return. Your core earns it by staying square and refusing to twist.",
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
    "cue": "Pull the band diagonally from high to low across your body.",
    "description": "Anchor a band high and hold it with both hands. Rotate and pull it down and across to the opposite hip, pivoting your back foot, then control it back. The band keeps tension on your obliques throughout the chop.",
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
    "cue": "Hold the band overhead and lower the opposite arm and leg.",
    "description": "Lie on your back holding a band anchored behind your head, arms up, knees over hips. Lower the opposite arm and leg toward the floor while pulling gently against the band and pressing your lower back down, then switch. The band adds tension that helps you keep your core locked.",
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
    "cue": "Feet in the straps, pull your knees toward your chest.",
    "description": "Get into a high plank with your feet in the TRX cradles. Pull your knees in toward your chest by crunching your abs, then extend them back out to a plank. Keep your hips from piking too high — control the roll in and out.",
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
    "cue": "Plank with feet in the straps, tuck your knees under you.",
    "description": "Hold a high plank with your feet in the TRX straps. Tuck your knees in toward your chest, then extend back to a strong plank. The suspended feet force your core to stabilize hard the entire time. Keep your shoulders stacked over your hands.",
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
    "cue": "Plank with feet in the straps, lift your hips into an inverted V.",
    "description": "Hold a high plank with your feet in the TRX cradles. Keeping your legs straight, lift your hips up toward the ceiling into an inverted V, then lower back to plank. Straight legs make it much harder than a knee tuck — an advanced core builder.",
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
    "cue": "Plank with feet in the straps, pull your knees toward one elbow.",
    "description": "Hold a high plank with your feet in the TRX straps. Pull both knees in and toward one elbow to work the obliques, extend back to plank, then tuck toward the other side. Keep your shoulders stable and control the rotation.",
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
    "cue": "Anchor your legs on the decline and sit all the way up.",
    "description": "Sit on a decline bench with your legs hooked under the pads. Lower your torso back, then curl up until you're upright, squeezing your abs. The decline increases the range and load compared to a floor sit-up — control the way down.",
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
    "cue": "On the decline, curl your shoulders up without fully sitting up.",
    "description": "Lie back on a decline bench with your legs anchored, hands by your head. Curl your shoulders and upper back up toward your knees — a shorter range than a sit-up — then lower slowly. Keeps the tension on the abs and off the hip flexors.",
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
    "cue": "Grip the bench overhead and raise your straight legs up.",
    "description": "Lie on a flat bench and grip it behind your head for support, legs hanging off the end. Raise your straight legs up to vertical by squeezing your lower abs, then lower slowly without letting your back arch off the bench. The overhead grip lets you control a longer range.",
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
    "cue": "Grip behind your head and keep your body rigid as you lower it slowly.",
    "description": "Lie on a bench and grip it firmly behind your head. Lift your whole body up onto your shoulders, then lower it slowly as one rigid line — keeping it straight and off the bench — until nearly horizontal, then raise back up. One of the hardest ab moves there is; build up with tucked versions.",
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
    "cue": "Drop to a push-up, jump your feet in, then jump up.",
    "description": "From standing, squat down and place your hands on the floor, kick your feet back into a plank and lower your chest, then jump your feet back to your hands and explode up into a jump with your arms overhead. Move at a steady pace and keep your back flat during the plank part.",
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
    "cue": "Drop to a plank, jump your feet back in, then stand — no push-up or jump.",
    "description": "Squat down and place your hands on the floor, jump your feet back to a plank, then jump them straight back in and stand up. It skips the push-up and jump of a full burpee, making it easier on the body while still spiking your heart rate.",
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
    "cue": "Hands down, kick your feet back to a plank, then jump them in and stand.",
    "description": "From standing, squat and place your hands on the floor, kick both feet back into a plank, then jump them back under you and stand up. Like a burpee without the push-up or jump — a solid low-impact conditioning move.",
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
    "cue": "Squat down, then jump up explosively and land soft.",
    "description": "Sink into a squat, then explode straight up into a jump, reaching tall. Land softly by bending your knees to absorb the impact, then immediately sink into the next rep. Land quietly with your chest up — soft landings protect your knees.",
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
    "cue": "Jump up and pull both knees toward your chest.",
    "description": "From a slight squat, jump straight up and tuck both knees up toward your chest, then extend your legs to land softly with bent knees. Land quietly and reset before the next. High-impact and explosive — build up with regular jump squats first.",
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
    "cue": "Swing your arms and jump as far forward as you can, landing soft.",
    "description": "Stand with feet hip-width, dip down and swing your arms back, then explode forward, jumping as far as you can. Land softly on both feet with bent knees, absorbing the impact. Reset your stance between jumps — quality of landing matters more than distance.",
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
    "cue": "Jump up and spread your arms and legs into a star, then land small.",
    "description": "From a small squat, jump up while spreading your arms and legs out wide into a star shape, then bring them back in to land softly. A fun, full-body cardio burst — land with bent knees to stay light on your feet.",
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
    "cue": "Jump your feet out and arms overhead, then back in.",
    "description": "Stand tall, then jump your feet out wide while raising your arms overhead, and jump back to bring them in. Keep a steady rhythm and stay light on your feet. A classic warm-up and cardio move that gets the whole body moving.",
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
    "cue": "Run in place, driving your knees up to hip height.",
    "description": "Run on the spot, driving each knee up to hip height while pumping your arms, staying on the balls of your feet. Keep your chest tall and core tight. The higher and faster the knees, the harder the cardio hit.",
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
    "cue": "Run in place, kicking your heels up to your butt.",
    "description": "Jog on the spot, kicking your heels up toward your glutes with each step while pumping your arms. Stay on the balls of your feet and keep a quick rhythm. A great warm-up that also raises your heart rate.",
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
    "cue": "In a plank, drive your knees toward your chest one after the other.",
    "description": "Start in a high plank with a strong, flat body. Quickly drive one knee toward your chest, then switch, running your knees in and out. Keep your hips low and shoulders over your hands — don't let your butt pike up. Speed up for more of a cardio burn.",
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
    "cue": "In a plank, jump your feet out and in like a jumping jack.",
    "description": "Hold a forearm or high plank with a tight core. Jump both feet out wide, then back together, keeping your hips level and still. Combines a plank's core work with a cardio kick — don't let your hips bounce as your feet move.",
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
    "cue": "On hands and toes with knees hovering, crawl forward and back.",
    "description": "Get into a bear position — hands under shoulders, knees bent and hovering an inch off the floor. Crawl forward by moving the opposite hand and foot together, keeping your knees low and back flat, then crawl back. It builds full-body strength and coordination.",
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
    "cue": "Hinge to the floor, walk your hands out to a plank, then walk back.",
    "description": "Stand tall, hinge forward to place your hands on the floor, then walk them out until you're in a plank. Walk your feet up toward your hands (or walk hands back), then stand. A great dynamic warm-up for the whole body and hamstrings.",
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
    "cue": "Drop your hands down and kick your feet back flat, then pop back up.",
    "description": "From standing, drop your hands to the floor and kick your feet back so your whole body sprawls flat, hips low, then jump your feet back in and stand. Like a burpee without the push-up or jump — fast and great for conditioning and agility.",
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
    "cue": "Stay low in an athletic stance and shuffle side to side.",
    "description": "Sink into an athletic stance with knees bent and chest up. Push off one foot to shuffle sideways, staying low without crossing your feet, then shuffle back the other way. Keep it quick and light — great for footwork and conditioning.",
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
    "cue": "Bounce on the balls of your feet, turning the rope with your wrists.",
    "description": "Hold the rope handles at your sides and turn it with small wrist circles, jumping just high enough to clear it on the balls of your feet. Keep your jumps low and your elbows close to your body. Start slow and find a steady rhythm.",
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
    "cue": "Shift your weight side to side as you turn the rope.",
    "description": "Jump rope while shifting your weight from one foot to the other in a light boxer's rhythm, barely leaving the floor. It's easier on your legs than double-foot bouncing and lets you keep going longer. Keep the turns coming from your wrists.",
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
    "cue": "Drive your knees up high with each rope turn.",
    "description": "Jump rope while driving each knee up toward hip height, alternating like a run. It cranks up the intensity and works your core and hip flexors on top of the cardio. Start at a manageable pace before speeding up.",
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
    "cue": "Jump higher and spin the rope twice per jump.",
    "description": "Jump rope but pass the rope under your feet twice for each single jump by spinning your wrists faster and jumping a touch higher. Keep your jumps controlled and your arms low. A tricky skill — expect misses while you find the timing.",
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
    "cue": "Squat with the dumbbells on your shoulders, then drive up and press overhead.",
    "description": "Hold a dumbbell on each shoulder and squat down. Drive up out of the squat and use that momentum to press the dumbbells overhead in one smooth motion, then lower them back to your shoulders as you squat again. A full-body burner — keep the squat and press flowing together.",
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
    "cue": "Pull the dumbbells to your shoulders, then press overhead.",
    "description": "Start with dumbbells at your thighs or the floor. Explosively pull them up to your shoulders (the clean) by driving with your hips, then press them overhead (the press), and lower back down. Power comes from your hips and legs, not just your arms.",
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
    "cue": "Drive one dumbbell from the floor to overhead in one motion.",
    "description": "Hinge down and grab one dumbbell between your feet. Explosively extend your hips and pull it straight up and overhead in one smooth motion, punching your hand up to lock it out, then lower and repeat. All the drive comes from your hips — the arm just guides it.",
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
    "cue": "Hike the dumbbell back, then snap your hips to swing it to chest height.",
    "description": "Hold one dumbbell with both hands, hinge and hike it back between your legs, then snap your hips forward to swing it up to about chest height. Let it fall back into the next hinge. The power is a hip snap, not a lift with your arms or shoulders.",
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
    "cue": "Burpee down with the dumbbells, then swing them overhead as you stand.",
    "description": "Hold a dumbbell in each hand, drop into a burpee with your chest to the floor, then jump your feet in and swing both dumbbells from the floor up overhead in one motion as you stand. Brutally full-body — keep your back flat and move with control at speed.",
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
    "cue": "Push-up on the dumbbells, row each side, then clean and press overhead.",
    "description": "In a plank gripping dumbbells, do a push-up, then row one dumbbell and the other, jump your feet in, and clean and press both overhead as you stand. One of the toughest full-body combos there is — go light and nail each piece before speeding up.",
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
    "cue": "Burpee with your hands on the dumbbells, then jump up.",
    "description": "Hold a dumbbell in each hand. Drop them to the floor and use them as handles for a burpee — chest down, feet back in — then stand and jump. The dumbbells raise your hands slightly and add grip and load to the burpee.",
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
    "cue": "Hold heavy dumbbells at your sides and walk tall.",
    "description": "Hold a heavy dumbbell in each hand at your sides and walk a set distance, standing tall with your shoulders back and core braced. Take steady steps and don't let your posture slump. Builds grip, core, and total-body strength.",
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
    "cue": "Hike the bell back, then snap your hips to float it to chest height.",
    "description": "Stand over a kettlebell, hinge and hike it back between your legs, then snap your hips forward powerfully to swing it up to chest height, arms relaxed. Let it fall back into the next hinge. The hips do all the work — don't lift with your arms or squat it up.",
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
    "cue": "Clean the bell to your shoulder, then press it overhead.",
    "description": "Hike the kettlebell back, then pull it up to the rack position on your shoulder (the clean), guiding it around your hand smoothly. Press it overhead, then lower and repeat. Drive with your hips on the clean and keep the bell close so it doesn't bang your wrist.",
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
    "cue": "Swing the bell and punch it straight overhead in one motion.",
    "description": "Hike the kettlebell back and swing it up, but as it rises pull it in close and punch your hand up so the bell rolls around to lock out overhead in one motion. Lower it back into the next swing. Powerful and technical — practice the swing and clean first.",
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
    "cue": "Squat with the bell racked, then drive up and press it overhead.",
    "description": "Hold a kettlebell in the rack position and squat down. Drive up out of the squat and use the momentum to press the bell overhead, then lower it back to the rack as you squat again. Keep the squat and press flowing into one smooth movement.",
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
    "cue": "From lying down, stand up while holding the bell locked overhead the whole time.",
    "description": "Lie on your back holding a kettlebell straight up in one hand. Through a series of steps — roll to your elbow, to your hand, bridge your hips, sweep your leg back to a kneel, then stand — keep the bell locked overhead and your eyes on it the whole time, then reverse it back down. Slow, deliberate, and full-body. Master it light.",
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
    "cue": "Hike the bell and pull it up to your shoulder, guiding it around your hand.",
    "description": "Hike the kettlebell back between your legs, then snap your hips and pull it up to the rack position on your shoulder, letting it roll around your hand rather than flip onto your wrist. Lower it back into the next hike. Keep it close and smooth to avoid banging your forearm.",
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
    "cue": "Pass the bell between your legs in a figure-eight.",
    "description": "Stand in a partial squat and pass the kettlebell between your legs from one hand to the other, weaving it around each leg in a figure-eight pattern. Keep your back flat and chest up. Builds coordination, grip, and core control.",
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
    "cue": "Clean two kettlebells to the rack position at once.",
    "description": "Hold a kettlebell in each hand, hinge and hike them back, then snap your hips to pull both up to the rack position on your shoulders at the same time. Lower them back into the next hinge. Twice the load means twice the hip power and core bracing.",
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
    "cue": "Front squat the bar, then drive up and press it overhead.",
    "description": "Hold a barbell in the front-rack position on your shoulders and squat down. Drive up out of the squat and use that momentum to press the bar overhead, then lower it back to your shoulders as you descend again. A demanding full-body move — keep the squat and press connected.",
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
    "cue": "Pull the bar from the floor to your shoulders, then press overhead.",
    "description": "Start with the barbell on the floor. Explosively pull it up to the front-rack position on your shoulders (the clean) using your hip drive, then press it overhead (the press), and lower it back down. Technical and powerful — learn the clean before loading it heavy.",
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
    "cue": "Flow through several barbell lifts back-to-back without dropping the bar.",
    "description": "Pick a sequence of barbell moves — for example rows, cleans, front squats, presses, and RDLs — and do a set number of reps of each back-to-back without putting the bar down. It's a brutal conditioning finisher. Use a light weight and keep your form sharp as you fatigue.",
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
    "cue": "Explosively pull the bar from the floor to your shoulders.",
    "description": "Set up over a barbell with a flat back. Explosively extend your hips and pull the bar up, dropping under it to catch it in the front-rack position on your shoulders, then stand tall. Lower it and repeat. The pull is all hip power — keep the bar close to your body.",
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
    "cue": "Lift the ball overhead, then slam it hard into the floor.",
    "description": "Hold a medicine ball, reach it overhead, then forcefully slam it straight down into the floor using your whole body, hinging at the hips. Catch or pick it up and repeat. A great stress-reliever that builds power and gets you breathing hard — use a slam-proof ball.",
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
    "cue": "Squat with the ball, then throw it up to a high target as you stand.",
    "description": "Hold a medicine ball at your chest and squat down. Drive up and throw the ball up to a target high on a wall, then catch it on the way down and sink straight into the next squat. Combines a squat, a throw, and a catch into one flowing rep.",
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
    "cue": "Push the ball explosively off your chest to a wall or partner.",
    "description": "Hold a medicine ball at your chest and explosively push it forward to a wall or partner, extending your arms fully. Catch the rebound and repeat. A simple way to build upper-body power and get the heart rate up.",
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
    "cue": "Throw the ball forward from overhead using your whole body.",
    "description": "Hold a medicine ball overhead, take it slightly behind your head, then throw it forward and down to a wall or partner using your abs and whole body. Catch or retrieve it and repeat. Builds explosive core and upper-body power.",
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
    "cue": "Burpee with hands on the ball, then press it overhead.",
    "description": "Hold a medicine ball, place it down for a burpee — chest toward the floor, feet back in — then stand and press the ball overhead. The ball adds an overhead press and a stability challenge to each burpee. Keep your back flat.",
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
    "cue": "Rotate and throw the ball sideways into a wall.",
    "description": "Stand side-on to a wall holding a medicine ball at your waist. Rotate your torso away, then explosively rotate back and throw the ball sideways into the wall, pivoting your back foot. Catch the rebound and repeat, then switch sides. Builds rotational power for the core.",
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
    "cue": "Jump onto or over the box, landing soft, then continue to the other side.",
    "description": "Stand facing a box. Dip and jump up onto it landing softly with bent knees, then step or hop down the other side, and repeat back over. Always land quietly and in control. Step down rather than jumping off to protect your knees and Achilles.",
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
    "cue": "Burpee, then jump onto and over the box.",
    "description": "Do a burpee — chest to floor, feet back in — then instead of a regular jump, leap up onto the box, landing softly, and step or hop down the far side. Repeat back over the box. A brutal cardio and power combo — keep your landings soft and controlled.",
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
    "cue": "Tap one foot on the box and quickly switch feet side to side.",
    "description": "Stand beside a low box and place one foot on top. Quickly switch feet in a hopping motion so the other foot lands on the box as the first comes down, shuffling side to side. Stay light on the balls of your feet and keep a fast rhythm. Great for footwork and cardio.",
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
    "cue": "Feet in the straps, do a push-up then tuck your knees in.",
    "description": "Get into a high plank with your feet in the TRX cradles. Do a push-up, then pull your knees in toward your chest, and extend back out. It turns the burpee into a suspended core and chest challenge. Keep your hips level and shoulders stable throughout.",
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
    "cue": "Feet in the straps, push-up then tuck your knees to your chest.",
    "description": "Hold a high plank with your feet in the TRX straps. Do a push-up, then immediately pull your knees in toward your chest in a crunch, then extend back out. Combining a push-up with a knee tuck hammers the chest and core at once — keep it controlled.",
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
    "cue": "Drive with your legs, then pull, in a hard steady rhythm.",
    "description": "Sit on the rower, strap in, and start each stroke by pushing hard with your legs, then leaning back slightly and pulling the handle to your ribs, then reverse the sequence to return. Push with your legs first — most of the power is your legs, not your arms. Sprint in short, intense intervals.",
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
    "cue": "Push and pull the handles while driving hard with your legs.",
    "description": "Sit on the fan bike and pump the handles back and forth while pedaling hard with your legs, using your whole body. The faster you go, the more the fan fights back. Great for all-out interval sprints — keep your effort high for short bursts and recover between.",
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

/* ───────────────────────────────────────────────────────────────────────────
 * Warm-up + cool-down stretches. Same schema as everything above, distinguished
 * only by `category` ("warmup" / "cooldown"), which is what makes the app treat
 * them as stretches: they hold their own Stack cap, get dealt after the strength
 * cards, and bookend the workout. `hold` is the prefilled prescription (the app
 * reads the leading number as a round count, same as "3 × 10").
 * ─────────────────────────────────────────────────────────────────────────── */
const STRETCHES = [
  {
    "id": "yoga-cat-cow",
    "name": "Cat-Cow",
    "muscleGroup": "Back",
    "secondaryMuscles": ["Core/Abs"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Arch your back as you breathe in, round it as you breathe out.",
    "description": "Start on hands and knees with hands under shoulders and knees under hips. Breathing in, drop your belly and lift your chest and tailbone (cow); breathing out, press the floor away and round your spine toward the ceiling, tucking your chin (cat). Move with your breath rather than racing it — the point is to warm the spine one segment at a time, not to hit the biggest shape.",
    "avoidIf": ["wrist"],
    "icon": "🧘",
    "pattern": "Stretch",
    "force": "Static",
    "focus": ["mobility"],
    "category": "warmup",
    "sports": ["yoga"],
    "hold": "1 × 8 breaths"
  },
  {
    "id": "yoga-downward-dog",
    "name": "Downward-Facing Dog",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": ["Calves", "Shoulders"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Push the floor away and lift your hips up and back into an upside-down V.",
    "description": "From hands and knees, tuck your toes and lift your hips up and back so your body makes an upside-down V. Press through your whole hand, let your head hang between your arms, and pedal your heels toward the floor one at a time. Bend your knees as much as you need — reaching the heels down matters far less than getting a long spine, and rounding your back to force them flat is the usual mistake.",
    "avoidIf": ["wrist", "shoulder"],
    "icon": "🧘",
    "pattern": "Stretch",
    "force": "Static",
    "focus": ["mobility"],
    "category": "warmup",
    "sports": ["yoga"],
    "hold": "3 × 30s"
  },
  {
    "id": "yoga-standing-forward-fold",
    "name": "Standing Forward Fold",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": ["Back"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Hinge from the hips and let your upper body hang heavy.",
    "description": "Stand with feet hip-width apart, put a soft bend in your knees, and fold forward from the hip joints rather than the waist. Let your head, neck and arms hang completely — hold opposite elbows if that helps you switch off. Keep the knees bent enough that your lower back stays long; yanking the legs straight to touch the floor just moves the stretch into your spine.",
    "avoidIf": ["lower-back"],
    "icon": "🧘",
    "pattern": "Stretch",
    "force": "Static",
    "focus": ["mobility"],
    "category": "warmup",
    "sports": ["yoga"],
    "hold": "2 × 45s"
  },
  {
    "id": "yoga-low-lunge",
    "name": "Low Lunge",
    "muscleGroup": "Quads",
    "secondaryMuscles": ["Glutes"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Back knee down, hips sinking forward and down.",
    "description": "Step one foot forward between your hands and lower the back knee to the floor, untucking the back toes. Slide the hips forward until you feel a stretch down the front of the back thigh and hip, then lift your chest and reach your arms overhead. Keep the front knee stacked over the ankle instead of drifting past the toes, and squeeze the back glute to protect your lower back.",
    "avoidIf": ["knee", "hip"],
    "icon": "🧘",
    "pattern": "Stretch",
    "force": "Static",
    "focus": ["mobility"],
    "category": "warmup",
    "sports": ["yoga"],
    "hold": "2 × 45s each side"
  },
  {
    "id": "yoga-high-lunge",
    "name": "High Lunge",
    "muscleGroup": "Quads",
    "secondaryMuscles": ["Glutes", "Core/Abs"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Long stance, back leg straight and lifted, arms overhead.",
    "description": "From a forward fold, step one foot back into a long stance and keep the back leg straight with the heel lifted. Bend the front knee toward 90 degrees, draw your ribs down, and reach both arms overhead alongside your ears. The common error is letting the front knee collapse inward — track it over the middle toes and press the back heel toward the wall behind you.",
    "avoidIf": ["knee"],
    "icon": "🧘",
    "pattern": "Stretch",
    "force": "Static",
    "focus": ["mobility"],
    "category": "warmup",
    "sports": ["yoga"],
    "hold": "2 × 30s each side"
  },
  {
    "id": "yoga-warrior-one",
    "name": "Warrior I",
    "muscleGroup": "Quads",
    "secondaryMuscles": ["Glutes", "Shoulders"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Front knee bent, back foot turned in, hips and chest facing forward.",
    "description": "From a long stance, turn your back foot in about 45 degrees and plant it flat, then bend the front knee over the ankle. Rotate both hip bones to face the front of your mat and reach your arms overhead. Most people leave the back hip trailing open — actively draw it forward, and shorten your stance if that's the only way to square up.",
    "avoidIf": ["knee", "hip"],
    "icon": "🧘",
    "pattern": "Stretch",
    "force": "Static",
    "focus": ["mobility"],
    "category": "warmup",
    "sports": ["yoga"],
    "hold": "2 × 30s each side"
  },
  {
    "id": "yoga-warrior-two",
    "name": "Warrior II",
    "muscleGroup": "Quads",
    "secondaryMuscles": ["Glutes", "Shoulders"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Front knee over ankle, arms reaching front and back, gaze over the front hand.",
    "description": "Take a wide stance, turn the front foot to point straight ahead and the back foot slightly in, then bend the front knee toward 90 degrees. Open your hips and chest to the side and reach your arms out level with the floor, looking over the front fingertips. Keep your torso stacked directly over your hips — leaning out over the front leg is the usual giveaway that the stance is too short.",
    "avoidIf": ["knee", "hip"],
    "icon": "🧘",
    "pattern": "Stretch",
    "force": "Static",
    "focus": ["mobility"],
    "category": "warmup",
    "sports": ["yoga"],
    "hold": "2 × 30s each side"
  },
  {
    "id": "yoga-extended-side-angle",
    "name": "Extended Side Angle",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": ["Quads", "Shoulders"],
    "equipment": ["bodyweight"],
    "difficulty": "Intermediate",
    "cue": "Forearm to thigh, top arm reaching over your ear in one long line.",
    "description": "From Warrior II, lower the front forearm onto the front thigh and reach the top arm up and over your ear, palm facing down. Aim to draw one long line from the back heel through the top fingertips while keeping the chest rotating upward. Don't dump your weight into the front thigh — keep pressing the front foot down so the pose lifts rather than collapses.",
    "avoidIf": ["knee", "shoulder"],
    "icon": "🧘",
    "pattern": "Stretch",
    "force": "Static",
    "focus": ["mobility"],
    "category": "warmup",
    "sports": ["yoga"],
    "hold": "2 × 30s each side"
  },
  {
    "id": "yoga-triangle-pose",
    "name": "Triangle Pose",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": ["Core/Abs"],
    "equipment": ["bodyweight"],
    "difficulty": "Intermediate",
    "cue": "Straight front leg, hinge sideways, top arm to the ceiling.",
    "description": "Stand wide, turn the front foot out, and keep both legs straight with a micro-bend in the front knee. Reach forward over the front leg, then hinge sideways at the hip and lower your bottom hand to your shin or ankle while the top arm points at the ceiling. Reaching for the floor by rounding forward is the classic mistake — think of sliding between two panes of glass so the chest stays open to the side.",
    "avoidIf": ["lower-back", "hip"],
    "icon": "🧘",
    "pattern": "Stretch",
    "force": "Static",
    "focus": ["mobility"],
    "category": "warmup",
    "sports": ["yoga"],
    "hold": "2 × 30s each side"
  },
  {
    "id": "yoga-chair-pose",
    "name": "Chair Pose",
    "muscleGroup": "Quads",
    "secondaryMuscles": ["Glutes", "Shoulders"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Sit your hips back like there's a chair behind you, arms overhead.",
    "description": "Stand with feet together or hip-width, then bend your knees and send your hips back and down as if lowering onto a seat. Keep your weight in your heels — you should still be able to see your toes — and reach your arms up alongside your ears. Let your ribs flare and this becomes a lower-back squeeze instead of a leg warm-up, so draw the front ribs down as you reach.",
    "avoidIf": ["knee"],
    "icon": "🧘",
    "pattern": "Stretch",
    "force": "Static",
    "focus": ["mobility"],
    "category": "warmup",
    "sports": ["yoga"],
    "hold": "3 × 30s"
  },
  {
    "id": "yoga-plank-pose",
    "name": "Plank Pose",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": ["Shoulders", "Chest"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "One straight line from heels to head, hands under shoulders.",
    "description": "From hands and knees, step both feet back so your body forms a straight line from heels to the crown of your head. Push the floor away so your upper back is broad, squeeze your glutes, and draw your belly in without holding your breath. Hips sagging toward the floor or piking up toward the ceiling both mean the core has let go — reset rather than grinding out the time.",
    "avoidIf": ["wrist", "lower-back"],
    "icon": "🧘",
    "pattern": "Stretch",
    "force": "Static",
    "focus": ["mobility"],
    "category": "warmup",
    "sports": ["yoga"],
    "hold": "3 × 30s"
  },
  {
    "id": "yoga-cobra-pose",
    "name": "Cobra Pose",
    "muscleGroup": "Back",
    "secondaryMuscles": ["Chest"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Peel your chest off the floor with your back, not your arms.",
    "description": "Lie face down with hands under your shoulders and elbows tucked to your ribs. Press the tops of your feet down, draw your shoulders back, and lift your chest using your back muscles while your hands stay light. Cranking yourself up with straight arms jams the lower back — keep a bend in the elbows and stop where the lift still feels like it comes from between the shoulder blades.",
    "avoidIf": ["lower-back", "wrist", "pregnancy"],
    "icon": "🧘",
    "pattern": "Stretch",
    "force": "Static",
    "focus": ["mobility"],
    "category": "warmup",
    "sports": ["yoga"],
    "hold": "3 × 20s"
  },
  {
    "id": "yoga-upward-dog",
    "name": "Upward-Facing Dog",
    "muscleGroup": "Chest",
    "secondaryMuscles": ["Back", "Shoulders"],
    "equipment": ["bodyweight"],
    "difficulty": "Intermediate",
    "cue": "Straight arms, thighs lifted off the floor, chest forward and up.",
    "description": "Lie face down with hands beside your lower ribs and the tops of your feet on the floor. Press straight through your arms until your thighs and hips lift clear of the ground, then roll your shoulders back and lift your chest forward rather than just up. Letting the shoulders creep toward your ears is the common fault — press the floor away and lengthen the neck instead.",
    "avoidIf": ["lower-back", "wrist", "shoulder", "pregnancy"],
    "icon": "🧘",
    "pattern": "Stretch",
    "force": "Static",
    "focus": ["mobility"],
    "category": "warmup",
    "sports": ["yoga"],
    "hold": "3 × 20s"
  },
  {
    "id": "yoga-crescent-twist",
    "name": "Crescent Lunge Twist",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": ["Quads", "Back"],
    "equipment": ["bodyweight"],
    "difficulty": "Intermediate",
    "cue": "Lunge low, palms together, rotate the top shoulder toward the ceiling.",
    "description": "Set up in a high lunge, bring your palms together at your chest, and rotate your torso toward the front leg, hooking the opposite elbow outside that thigh. Press your palms into each other and use that leverage to turn a little further with each exhale. Keep your hips square and level — swinging the back hip forward to get more rotation takes the twist out of your spine and puts it in your pelvis.",
    "avoidIf": ["knee", "lower-back", "pregnancy"],
    "icon": "🧘",
    "pattern": "Stretch",
    "force": "Static",
    "focus": ["mobility"],
    "category": "warmup",
    "sports": ["yoga"],
    "hold": "2 × 30s each side"
  },
  {
    "id": "yoga-tree-pose",
    "name": "Tree Pose",
    "muscleGroup": "Glutes",
    "secondaryMuscles": ["Core/Abs", "Calves"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "One foot to the opposite ankle, calf or thigh — never the knee.",
    "description": "Stand tall, shift your weight into one foot, and place the other foot against the inside of that ankle, calf or thigh. Press the foot and the standing leg into each other, then bring your hands to your chest or overhead once you feel steady. Never rest the foot directly on the side of the knee, and pick a spot on the floor to stare at — a wandering gaze is what topples most people.",
    "avoidIf": ["balance", "knee"],
    "icon": "🧘",
    "pattern": "Stretch",
    "force": "Static",
    "focus": ["mobility"],
    "category": "warmup",
    "sports": ["yoga"],
    "hold": "2 × 30s each side"
  },
  {
    "id": "yoga-warrior-three",
    "name": "Warrior III",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": ["Glutes", "Core/Abs"],
    "equipment": ["bodyweight"],
    "difficulty": "Advanced",
    "cue": "Hinge onto one leg until body and back leg make one straight line.",
    "description": "Stand on one leg with a soft knee, then hinge forward at the hip as the other leg lifts behind you until your torso and back leg form one line parallel to the floor. Reach your arms forward, back alongside your body, or hands at your chest for balance. Keep the lifted hip pointing down at the floor — letting it roll open turns the pose into a twist and wrecks the balance.",
    "avoidIf": ["balance", "lower-back"],
    "icon": "🧘",
    "pattern": "Stretch",
    "force": "Static",
    "focus": ["mobility"],
    "category": "warmup",
    "sports": ["yoga"],
    "hold": "2 × 20s each side"
  },
  {
    "id": "yoga-garland-pose",
    "name": "Garland Pose",
    "muscleGroup": "Glutes",
    "secondaryMuscles": ["Quads", "Calves"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Deep squat, elbows inside the knees, chest tall.",
    "description": "Stand with feet a little wider than hips and toes turned slightly out, then squat all the way down until your hips are below your knees. Bring your palms together at your chest and press your elbows lightly against the inside of your knees to open the hips. If your heels lift off the floor, roll up a towel and rest them on it rather than rounding your back to stay down.",
    "avoidIf": ["knee", "hip"],
    "icon": "🧘",
    "pattern": "Stretch",
    "force": "Static",
    "focus": ["mobility"],
    "category": "warmup",
    "sports": ["yoga"],
    "hold": "2 × 45s"
  },
  {
    "id": "yoga-childs-pose",
    "name": "Child's Pose",
    "muscleGroup": "Back",
    "secondaryMuscles": ["Glutes", "Shoulders"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Knees wide, hips back to the heels, forehead down.",
    "description": "Kneel with your big toes touching and knees as wide as is comfortable, then sit your hips back toward your heels and walk your hands forward until your forehead rests on the floor. Let your chest sink between your thighs and breathe into your back ribs. If your hips won't reach your heels, put a cushion between your calves and backside instead of straining to get there.",
    "avoidIf": ["knee"],
    "icon": "🧘",
    "pattern": "Stretch",
    "force": "Static",
    "focus": ["mobility"],
    "category": "cooldown",
    "sports": ["yoga"],
    "hold": "2 × 60s"
  },
  {
    "id": "yoga-pigeon-pose",
    "name": "Pigeon Pose",
    "muscleGroup": "Glutes",
    "secondaryMuscles": ["Quads"],
    "equipment": ["bodyweight"],
    "difficulty": "Intermediate",
    "cue": "Front shin angled across, back leg straight behind you, hips level.",
    "description": "From hands and knees, bring one knee forward behind that wrist and angle the shin across your body, then slide the other leg straight back with the top of the foot down. Keep both hips facing the floor and walk your hands forward to fold over the front leg. Almost everyone lets the back hip roll open — put a cushion under the front hip so the pelvis can stay square instead.",
    "avoidIf": ["knee", "hip"],
    "icon": "🧘",
    "pattern": "Stretch",
    "force": "Static",
    "focus": ["mobility"],
    "category": "cooldown",
    "sports": ["yoga"],
    "hold": "2 × 60s each side"
  },
  {
    "id": "yoga-seated-forward-fold",
    "name": "Seated Forward Fold",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": ["Back", "Calves"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Sit tall with legs straight, then hinge forward from the hips.",
    "description": "Sit with both legs straight out in front, flex your feet, and sit up on the front edge of your sitting bones. Lengthen your spine upward first, then hinge forward from the hips and take hold of your shins, ankles or feet. Bend the knees as much as you need to keep the back long — hunching over to grab your toes stretches your spine rather than your hamstrings.",
    "avoidIf": ["lower-back"],
    "icon": "🧘",
    "pattern": "Stretch",
    "force": "Static",
    "focus": ["mobility"],
    "category": "cooldown",
    "sports": ["yoga"],
    "hold": "2 × 60s"
  },
  {
    "id": "yoga-bound-angle",
    "name": "Bound Angle (Butterfly)",
    "muscleGroup": "Glutes",
    "secondaryMuscles": ["Hamstrings"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Soles of the feet together, knees relaxing out to the sides.",
    "description": "Sit tall and bring the soles of your feet together, letting your knees fall out to the sides. Hold your ankles or feet and, if it's comfortable, hinge forward from the hips over your legs. Don't push the knees down with your hands or bounce them — let gravity do it, and sit on a folded blanket if your lower back keeps rounding.",
    "avoidIf": ["hip", "knee"],
    "icon": "🧘",
    "pattern": "Stretch",
    "force": "Static",
    "focus": ["mobility"],
    "category": "cooldown",
    "sports": ["yoga"],
    "hold": "2 × 60s"
  },
  {
    "id": "yoga-supine-twist",
    "name": "Supine Spinal Twist",
    "muscleGroup": "Back",
    "secondaryMuscles": ["Glutes", "Core/Abs"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Lie down, drop both knees to one side, look the other way.",
    "description": "Lie on your back, draw both knees toward your chest, then let them fall together to one side while you stretch both arms out in a T. Turn your head the opposite way and let your top shoulder settle toward the floor. Chasing the floor with the knees at the cost of lifting the opposite shoulder is the common error — keep both shoulder blades down and take whatever twist that allows.",
    "avoidIf": ["lower-back"],
    "icon": "🧘",
    "pattern": "Stretch",
    "force": "Static",
    "focus": ["mobility"],
    "category": "cooldown",
    "sports": ["yoga"],
    "hold": "2 × 45s each side"
  },
  {
    "id": "yoga-happy-baby",
    "name": "Happy Baby",
    "muscleGroup": "Glutes",
    "secondaryMuscles": ["Hamstrings", "Back"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "On your back, grab the outside of both feet and pull the knees toward the floor.",
    "description": "Lie on your back, bend both knees toward your armpits, and take hold of the outside edges of your feet with your shins roughly vertical. Gently pull down so the knees travel toward the floor either side of your ribs. Keep your head, shoulders and tailbone heavy on the mat — lifting the hips or curling the head up to reach the feet defeats the whole point.",
    "avoidIf": ["hip", "pregnancy"],
    "icon": "🧘",
    "pattern": "Stretch",
    "force": "Static",
    "focus": ["mobility"],
    "category": "cooldown",
    "sports": ["yoga"],
    "hold": "2 × 45s"
  },
  {
    "id": "yoga-bridge-pose",
    "name": "Bridge Pose",
    "muscleGroup": "Glutes",
    "secondaryMuscles": ["Back", "Hamstrings"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Feet flat and close to your hips, press down and lift the hips up.",
    "description": "Lie on your back with your knees bent and feet flat, heels close enough that your fingertips can graze them. Press through your feet, squeeze your glutes, and lift your hips until your body makes a straight ramp from knees to shoulders. Keep your knees tracking over your feet rather than splaying out, and don't force the chin toward the chest — let the neck stay long and still.",
    "avoidIf": ["neck", "lower-back"],
    "icon": "🧘",
    "pattern": "Stretch",
    "force": "Static",
    "focus": ["mobility"],
    "category": "cooldown",
    "sports": ["yoga"],
    "hold": "3 × 30s"
  },
  {
    "id": "yoga-reclined-hamstring",
    "name": "Reclined Hamstring Stretch",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": ["Calves"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "One leg up toward the ceiling, the other pressed into the floor.",
    "description": "Lie on your back with one leg bent or extended along the floor, then raise the other leg toward the ceiling and hold behind the thigh or calf. Draw the leg gently toward you while keeping the knee only slightly bent and the hips flat on the ground. Letting the opposite hip peel off the floor to get the leg higher is the usual cheat — back off and keep both hips grounded.",
    "avoidIf": ["lower-back"],
    "icon": "🧘",
    "pattern": "Stretch",
    "force": "Static",
    "focus": ["mobility"],
    "category": "cooldown",
    "sports": ["yoga"],
    "hold": "2 × 45s each side"
  },
  {
    "id": "yoga-thread-the-needle",
    "name": "Thread the Needle",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": ["Back"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "From hands and knees, slide one arm under the other and rest on your shoulder.",
    "description": "Start on hands and knees, then slide one arm underneath your body and across to the opposite side, lowering that shoulder and the side of your head to the floor. Walk the supporting hand forward or reach it overhead to deepen the rotation. Keep your hips stacked over your knees — letting them drift to one side takes the stretch out of the upper back where you want it.",
    "avoidIf": ["shoulder", "neck"],
    "icon": "🧘",
    "pattern": "Stretch",
    "force": "Static",
    "focus": ["mobility"],
    "category": "cooldown",
    "sports": ["yoga"],
    "hold": "2 × 45s each side"
  },
  {
    "id": "yoga-sphinx-pose",
    "name": "Sphinx Pose",
    "muscleGroup": "Back",
    "secondaryMuscles": ["Chest"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Forearms down under the shoulders, chest lifted, legs relaxed.",
    "description": "Lie face down and prop yourself on your forearms with the elbows directly under your shoulders and forearms parallel. Press the forearms down, draw your chest forward through your upper arms, and let your legs and glutes stay soft. This is a gentle, sustained shape rather than a big backbend — if you feel a pinch in the lower back, slide the elbows further forward.",
    "avoidIf": ["lower-back", "pregnancy"],
    "icon": "🧘",
    "pattern": "Stretch",
    "force": "Static",
    "focus": ["mobility"],
    "category": "cooldown",
    "sports": ["yoga"],
    "hold": "2 × 60s"
  },
  {
    "id": "yoga-legs-up-wall",
    "name": "Legs-Up-the-Wall",
    "muscleGroup": "Calves",
    "secondaryMuscles": ["Hamstrings"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Sit sideways to a wall, swing your legs up it and lie back.",
    "description": "Sit with one hip against a wall, then swing your legs up the wall as you lower your back to the floor so you end up in an L shape. Shuffle your backside as close to the wall as is comfortable, let your arms rest wide, and stay there and breathe. Don't force the hips right against the wall if your hamstrings object — slide back a few inches and let the legs be slightly angled.",
    "avoidIf": [],
    "icon": "🧘",
    "pattern": "Stretch",
    "force": "Static",
    "focus": ["mobility"],
    "category": "cooldown",
    "sports": ["yoga"],
    "hold": "1 × 3 min"
  },
  {
    "id": "yoga-puppy-pose",
    "name": "Puppy Pose",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": ["Back", "Chest"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Hips stay over the knees, hands walk forward, chest melts down.",
    "description": "From hands and knees, keep your hips stacked over your knees and walk your hands forward until your chest and forehead lower toward the floor. Keep your arms active and straight so the stretch lands across the armpits and upper back. The moment your hips sink back toward your heels it turns into Child's Pose — keep the thighs vertical to stay in the shape you want.",
    "avoidIf": ["shoulder", "knee"],
    "icon": "🧘",
    "pattern": "Stretch",
    "force": "Static",
    "focus": ["mobility"],
    "category": "cooldown",
    "sports": ["yoga"],
    "hold": "2 × 45s"
  },
  {
    "id": "yoga-head-to-knee",
    "name": "Head-to-Knee Forward Bend",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": ["Back", "Glutes"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "One leg straight, the other foot to the inner thigh, fold over the straight leg.",
    "description": "Sit with one leg extended and tuck the other foot against the inside of that thigh so the bent knee falls out to the side. Turn your chest to face the straight leg, lengthen up, then hinge forward from the hips over it. Squaring your chest to the extended leg before you fold is what makes this different from a plain forward bend — most people skip it and just lean diagonally.",
    "avoidIf": ["lower-back", "knee"],
    "icon": "🧘",
    "pattern": "Stretch",
    "force": "Static",
    "focus": ["mobility"],
    "category": "cooldown",
    "sports": ["yoga"],
    "hold": "2 × 45s each side"
  },
  {
    "id": "yoga-cow-face-arms",
    "name": "Cow Face Arms",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": ["Triceps"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "One elbow up and one down behind your back, hands reaching for each other.",
    "description": "Sit or stand tall, reach one arm overhead and bend the elbow so the hand drops behind your neck, then bring the other arm behind your back with the palm facing out and reach up. Clasp fingers if they meet; if not, hold a towel between them and walk the hands closer over time. Keep your ribs from flaring forward — the arch usually comes from the lower back rather than the shoulders opening.",
    "avoidIf": ["shoulder"],
    "icon": "🧘",
    "pattern": "Stretch",
    "force": "Static",
    "focus": ["mobility"],
    "category": "cooldown",
    "sports": ["yoga"],
    "hold": "2 × 30s each side"
  },
  {
    "id": "yoga-seated-neck-release",
    "name": "Seated Neck Release",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Ear toward one shoulder while the other hand reaches for the floor.",
    "description": "Sit tall and let one ear drop toward the same-side shoulder while the opposite arm reaches down toward the floor to anchor that shoulder. Rest the same-side hand lightly on your head for a little extra weight — no pulling. Keep the movement to a slow tilt rather than a roll; rolling the head backwards through the range is what tends to aggravate necks.",
    "avoidIf": ["neck"],
    "icon": "🧘",
    "pattern": "Stretch",
    "force": "Static",
    "focus": ["mobility"],
    "category": "cooldown",
    "sports": ["yoga"],
    "hold": "2 × 30s each side"
  },
  {
    "id": "yoga-corpse-pose",
    "name": "Corpse Pose (Savasana)",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Lie flat, arms and legs relaxed and open, and do nothing.",
    "description": "Lie on your back with your legs a comfortable distance apart and let the feet roll outward, arms slightly away from your sides with palms up. Close your eyes and let your whole body get heavy, breathing normally. This is the pose people skip, and it's the one that lets the nervous system come down — give it a genuine few minutes rather than thirty seconds.",
    "avoidIf": [],
    "icon": "🧘",
    "pattern": "Stretch",
    "force": "Static",
    "focus": ["mobility"],
    "category": "cooldown",
    "sports": ["yoga"],
    "hold": "1 × 3 min"
  },
  {
    "id": "fb-leg-swings-front",
    "name": "Front-to-Back Leg Swings",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": ["Glutes", "Quads"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Hold something solid and swing one straight leg forward and back.",
    "description": "Stand side-on to a wall or post and rest a hand on it for balance. Swing the outside leg forward and back in a controlled arc, keeping it fairly straight and your torso upright, and let the range grow over the first few swings. Don't heave the leg with your lower back — if your chest is rocking to launch it, you've gone past a useful range.",
    "avoidIf": ["hip", "lower-back"],
    "icon": "🏈",
    "pattern": "Stretch",
    "force": "Static",
    "focus": ["mobility"],
    "category": "warmup",
    "sports": ["football", "track-field"],
    "hold": "2 × 12 each leg"
  },
  {
    "id": "fb-leg-swings-lateral",
    "name": "Lateral Leg Swings",
    "muscleGroup": "Glutes",
    "secondaryMuscles": ["Quads"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Face a wall and swing one leg across your body and back out.",
    "description": "Face a wall with both hands on it, then swing one leg across the front of your body and back out to the side. Keep your hips facing the wall and your standing leg quiet so the movement happens at the hip joint. This one opens the groin for cutting and lateral movement, so keep the swings smooth — bouncing at the end range is where groin strains come from.",
    "avoidIf": ["hip"],
    "icon": "🏈",
    "pattern": "Stretch",
    "force": "Static",
    "focus": ["mobility"],
    "category": "warmup",
    "sports": ["football"],
    "hold": "2 × 12 each leg"
  },
  {
    "id": "fb-walking-knee-hug",
    "name": "Walking Knee Hug",
    "muscleGroup": "Glutes",
    "secondaryMuscles": ["Hamstrings"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Step, pull one knee to your chest, rise onto the other toe.",
    "description": "Walk forward and on each step draw the trailing knee up, hugging the shin with both hands and pulling it toward your chest. Come up onto the toes of the standing foot and stand tall for a beat before stepping through. Rounding forward to meet the knee is the usual mistake — bring the knee to a tall chest instead of dropping the chest to the knee.",
    "avoidIf": ["hip", "knee", "balance"],
    "icon": "🏈",
    "pattern": "Stretch",
    "force": "Static",
    "focus": ["mobility"],
    "category": "warmup",
    "sports": ["football", "track-field"],
    "hold": "2 × 10 each leg"
  },
  {
    "id": "fb-walking-quad-pull",
    "name": "Walking Quad Pull",
    "muscleGroup": "Quads",
    "secondaryMuscles": ["Glutes"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Step, catch your ankle behind you, and squeeze that glute.",
    "description": "Walking forward, catch one ankle behind you with the same-side hand and pull the heel toward your backside while standing tall. Squeeze the glute of that leg and tuck your hips slightly under to move the stretch into the front of the thigh. Letting the knee flare out to the side or the back arch is what people default to — keep the knees close together and the ribs down.",
    "avoidIf": ["knee", "balance"],
    "icon": "🏈",
    "pattern": "Stretch",
    "force": "Static",
    "focus": ["mobility"],
    "category": "warmup",
    "sports": ["football", "track-field"],
    "hold": "2 × 10 each leg"
  },
  {
    "id": "fb-frankenstein-walk",
    "name": "Frankenstein Walk",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": ["Core/Abs"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Walk forward kicking each straight leg up to the opposite hand.",
    "description": "Walk forward with both arms held straight out in front at shoulder height. On each step, kick one straight leg up toward the opposite hand, keeping the knee long and the standing leg tall. Don't chase the hand with the foot by leaning back — lower the target rather than collapsing the posture, and keep the kick controlled rather than snapped.",
    "avoidIf": ["lower-back", "hip"],
    "icon": "🏈",
    "pattern": "Stretch",
    "force": "Static",
    "focus": ["mobility"],
    "category": "warmup",
    "sports": ["football", "track-field"],
    "hold": "2 × 10 each leg"
  },
  {
    "id": "fb-lunge-with-twist",
    "name": "Walking Lunge with Torso Twist",
    "muscleGroup": "Quads",
    "secondaryMuscles": ["Glutes", "Core/Abs"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Long lunge forward, then rotate your chest over the front leg.",
    "description": "Step forward into a long lunge and drop the back knee toward the floor, then rotate your torso toward the front leg with arms extended or hands at your chest. Rotate back to centre before standing up and stepping through with the other leg. Keep the front knee tracking over the foot as you turn — it tends to wander inward the moment the twist starts.",
    "avoidIf": ["knee", "lower-back"],
    "icon": "🏈",
    "pattern": "Stretch",
    "force": "Static",
    "focus": ["mobility"],
    "category": "warmup",
    "sports": ["football", "baseball"],
    "hold": "2 × 8 each side"
  },
  {
    "id": "fb-neck-isometric",
    "name": "Neck Isometric Holds",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Press your head into your own palm without letting it move.",
    "description": "Place a palm on your forehead and press your head into it just hard enough to feel the neck working, holding steady without any actual movement. Repeat with the hand on the back of the head and on each side. Build pressure gradually over a couple of seconds rather than shoving — this is about waking the neck up before contact, not testing it.",
    "avoidIf": ["neck"],
    "icon": "🏈",
    "pattern": "Stretch",
    "force": "Static",
    "focus": ["mobility"],
    "category": "warmup",
    "sports": ["football"],
    "hold": "2 × 10s each direction"
  },
  {
    "id": "fb-kneeling-hip-flexor",
    "name": "Kneeling Hip Flexor Stretch",
    "muscleGroup": "Quads",
    "secondaryMuscles": ["Glutes"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Half-kneel, tuck your hips under, then push forward.",
    "description": "Kneel on one knee with the other foot planted in front, then tuck your tailbone under so your lower back flattens before you move at all. Keeping that tuck, ease your hips forward until you feel the front of the back thigh and hip. The tuck is what makes it work — sliding forward with an arched back just compresses the spine and you'll feel nothing in the hip.",
    "avoidIf": ["knee"],
    "icon": "🏈",
    "pattern": "Stretch",
    "force": "Static",
    "focus": ["mobility"],
    "category": "cooldown",
    "sports": ["football", "track-field"],
    "hold": "2 × 45s each side"
  },
  {
    "id": "fb-seated-groin-stretch",
    "name": "Seated Groin Stretch",
    "muscleGroup": "Glutes",
    "secondaryMuscles": ["Hamstrings"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Sit with legs wide apart and walk your hands forward.",
    "description": "Sit on the floor with your legs spread as wide as is comfortable and your toes pointing up. Sit up on your sitting bones, then hinge from the hips and walk your hands forward along the floor between your legs. Stop as soon as your lower back starts to round — going further only stretches the spine, and the groin and inner thigh is what you're after here.",
    "avoidIf": ["hip", "lower-back"],
    "icon": "🏈",
    "pattern": "Stretch",
    "force": "Static",
    "focus": ["mobility"],
    "category": "cooldown",
    "sports": ["football"],
    "hold": "2 × 60s"
  },
  {
    "id": "fb-figure-four-glute",
    "name": "Supine Figure-4 Glute Stretch",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Ankle across the opposite knee, then pull that thigh toward you.",
    "description": "Lie on your back with both knees bent, cross one ankle over the opposite thigh just above the knee, then reach through the gap and pull the supporting thigh toward your chest. Keep the crossed knee pressing gently away from you to open the hip. Keep your head and shoulders on the floor — curling up to reach the leg is the usual shortcut and it takes the stretch away.",
    "avoidIf": ["hip", "knee"],
    "icon": "🏈",
    "pattern": "Stretch",
    "force": "Static",
    "focus": ["mobility"],
    "category": "cooldown",
    "sports": ["football", "track-field"],
    "hold": "2 × 45s each side"
  },
  {
    "id": "bb-arm-circles",
    "name": "Arm Circles",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Small circles growing to big ones, forwards then backwards.",
    "description": "Stand tall with your arms out to the sides at shoulder height. Draw small circles with your hands, gradually growing them until your arms are sweeping their full range, then reverse the direction. Keep your shoulders down away from your ears and your ribs from flaring — the point is to get blood into the shoulder before throwing, not to swing as hard as possible.",
    "avoidIf": ["shoulder"],
    "icon": "⚾",
    "pattern": "Stretch",
    "force": "Static",
    "focus": ["mobility"],
    "category": "warmup",
    "sports": ["baseball"],
    "hold": "2 × 20 each direction"
  },
  {
    "id": "bb-band-pull-apart",
    "name": "Shoulder Band Pull-Apart",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": ["Back"],
    "equipment": ["resistance-band"],
    "difficulty": "Beginner",
    "cue": "Arms straight out front, pull the band apart to your chest.",
    "description": "Hold a resistance band with both hands, arms straight out in front at shoulder height and a little tension already in it. Pull your hands apart and out to the sides, squeezing your shoulder blades together, then return under control. Keep the arms straight and the shoulders down — bending the elbows to get further turns it into a row and skips the upper back work throwers need.",
    "avoidIf": ["shoulder"],
    "icon": "⚾",
    "pattern": "Stretch",
    "force": "Static",
    "focus": ["mobility"],
    "category": "warmup",
    "sports": ["baseball"],
    "hold": "2 × 15"
  },
  {
    "id": "bb-open-book",
    "name": "Open-Book Thoracic Rotation",
    "muscleGroup": "Back",
    "secondaryMuscles": ["Chest", "Shoulders"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Lie on your side, knees bent, and open the top arm across like a book cover.",
    "description": "Lie on one side with your knees bent to 90 degrees and stacked, arms straight out in front with palms together. Keeping the knees pinned down, sweep the top arm in a wide arc across your body and open the chest toward the ceiling, following the hand with your eyes. If the knees lift as you rotate you've stopped turning your upper back and started twisting your pelvis — keep them heavy and take a smaller arc.",
    "avoidIf": ["shoulder", "lower-back"],
    "icon": "⚾",
    "pattern": "Stretch",
    "force": "Static",
    "focus": ["mobility"],
    "category": "warmup",
    "sports": ["baseball"],
    "hold": "2 × 10 each side"
  },
  {
    "id": "bb-trunk-twists",
    "name": "Standing Trunk Twists",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": ["Back"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Feet planted, rotate your chest side to side with relaxed arms.",
    "description": "Stand with your feet a little wider than your hips and let your arms hang loose. Rotate your chest and shoulders from side to side, letting your arms swing around your body and your back heel pivot as you turn. Keep the hips relatively quiet and the movement smooth — whipping the torso to make the arms slap around is how people tweak an oblique cold.",
    "avoidIf": ["lower-back"],
    "icon": "⚾",
    "pattern": "Stretch",
    "force": "Static",
    "focus": ["mobility"],
    "category": "warmup",
    "sports": ["baseball"],
    "hold": "2 × 20"
  },
  {
    "id": "bb-wrist-forearm-stretch",
    "name": "Wrist and Forearm Stretch",
    "muscleGroup": "Biceps",
    "secondaryMuscles": [],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Arm out straight, pull the fingers back, then down.",
    "description": "Extend one arm straight in front with the palm facing away, then use the other hand to draw the fingers back toward you until you feel the underside of the forearm. Switch by turning the palm down and pulling the back of the hand toward you for the top of the forearm. Keep the elbow straight throughout — bending it lets the forearm off the hook and you'll feel almost nothing.",
    "avoidIf": ["wrist"],
    "icon": "⚾",
    "pattern": "Stretch",
    "force": "Static",
    "focus": ["mobility"],
    "category": "warmup",
    "sports": ["baseball"],
    "hold": "2 × 30s each way"
  },
  {
    "id": "bb-hip-rotations",
    "name": "Standing Hip Rotations",
    "muscleGroup": "Glutes",
    "secondaryMuscles": ["Quads"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Lift one knee to hip height and draw circles with it.",
    "description": "Hold something for balance, lift one knee to about hip height, then sweep it out to the side and back down in a smooth circle. Do a set opening outward, then reverse so the knee comes up from the side and closes across the body. Keep your torso upright and still — leaning away to get a bigger circle means the hip has stopped doing the work.",
    "avoidIf": ["hip", "balance"],
    "icon": "⚾",
    "pattern": "Stretch",
    "force": "Static",
    "focus": ["mobility"],
    "category": "warmup",
    "sports": ["baseball", "football"],
    "hold": "2 × 10 each direction"
  },
  {
    "id": "bb-sleeper-stretch",
    "name": "Sleeper Stretch",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [],
    "equipment": ["bodyweight"],
    "difficulty": "Intermediate",
    "cue": "Lie on the throwing shoulder, elbow at 90 degrees, rotate the forearm down.",
    "description": "Lie on your side on the throwing-arm shoulder with that upper arm straight out in front and the elbow bent to 90 degrees so the forearm points at the ceiling. Use the top hand to gently rotate the forearm down toward the floor, stopping well short of pain. This is the classic fix for the tight back-of-shoulder throwers develop, and it must be gentle — forcing it is a known way to irritate the joint.",
    "avoidIf": ["shoulder"],
    "icon": "⚾",
    "pattern": "Stretch",
    "force": "Static",
    "focus": ["mobility"],
    "category": "cooldown",
    "sports": ["baseball"],
    "hold": "3 × 30s"
  },
  {
    "id": "bb-cross-body-shoulder",
    "name": "Cross-Body Shoulder Stretch",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": ["Back"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Pull one straight arm across your chest with the other forearm.",
    "description": "Bring one arm straight across your chest at shoulder height and hook the other forearm above its elbow to draw it in closer. Keep the shoulder of the stretching arm pressed down rather than letting it ride up toward your ear. Pulling on the elbow joint itself is the common mistake — hook above it so the pressure goes through the upper arm.",
    "avoidIf": ["shoulder"],
    "icon": "⚾",
    "pattern": "Stretch",
    "force": "Static",
    "focus": ["mobility"],
    "category": "cooldown",
    "sports": ["baseball"],
    "hold": "2 × 30s each side"
  },
  {
    "id": "bb-overhead-lat-stretch",
    "name": "Overhead Lat Stretch",
    "muscleGroup": "Back",
    "secondaryMuscles": ["Shoulders"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Hold a doorframe overhead and sink your hips back and down.",
    "description": "Take hold of a doorframe, squat rack or sturdy shelf at about head height with both hands, then step back and sink your hips down and away until your arms are straight overhead. Let your chest drop between your arms and breathe into your side ribs. Keep the ribs from flaring out at the front — the arch should be felt through the armpits and lats, not the lower back.",
    "avoidIf": ["shoulder"],
    "icon": "⚾",
    "pattern": "Stretch",
    "force": "Static",
    "focus": ["mobility"],
    "category": "cooldown",
    "sports": ["baseball"],
    "hold": "2 × 45s"
  },
  {
    "id": "tf-a-skip",
    "name": "A-Skip",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": ["Calves", "Quads"],
    "equipment": ["bodyweight"],
    "difficulty": "Intermediate",
    "cue": "Skip forward driving one knee up while staying tall on the toes.",
    "description": "Skip forward, driving one knee up to hip height with the toe pulled up toward the shin while the opposite arm swings through. Stay tall on the balls of your feet and keep the contact with the ground short and springy. Reaching the foot out in front on the way down is the usual fault — the foot should strike underneath your hips, not ahead of them.",
    "avoidIf": ["high-impact", "knee"],
    "icon": "🏃",
    "pattern": "Stretch",
    "force": "Explosive",
    "focus": ["mobility"],
    "category": "warmup",
    "sports": ["track-field", "football"],
    "hold": "3 × 20m"
  },
  {
    "id": "tf-b-skip",
    "name": "B-Skip",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": ["Glutes", "Calves"],
    "equipment": ["bodyweight"],
    "difficulty": "Advanced",
    "cue": "A-skip, but sweep the lifted leg out and paw it back underneath you.",
    "description": "Start as an A-skip with the knee driving up, then extend the lower leg forward and actively sweep it back down and under your hips, like pawing at the ground. Keep the posture tall and the arms driving in rhythm. This is the harder cousin of the A-skip and it teaches active hamstring recovery for sprinting — learn the A-skip first, because a lazy B-skip is a hamstring strain waiting to happen.",
    "avoidIf": ["high-impact", "hip"],
    "icon": "🏃",
    "pattern": "Stretch",
    "force": "Explosive",
    "focus": ["mobility"],
    "category": "warmup",
    "sports": ["track-field"],
    "hold": "3 × 20m"
  },
  {
    "id": "tf-high-knees",
    "name": "High-Knee Run Drill",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": ["Quads", "Calves"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Quick steps driving each knee up to hip height.",
    "description": "Run on the spot or move slowly forward, driving each knee up toward hip height as fast as you can cycle them. Stay on the balls of your feet, keep your chest tall, and pump the arms in time with the legs. Leaning back to get the knees higher is the common error — keep a slight forward lean from the ankles and accept a lower knee if you have to.",
    "avoidIf": ["high-impact", "knee"],
    "icon": "🏃",
    "pattern": "Stretch",
    "force": "Explosive",
    "focus": ["mobility"],
    "category": "warmup",
    "sports": ["track-field", "football"],
    "hold": "3 × 30s"
  },
  {
    "id": "tf-butt-kicks",
    "name": "Heel-Flick Drill",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": ["Quads"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Quick steps flicking each heel up to your backside.",
    "description": "Jog slowly forward or on the spot, flicking each heel up to touch your backside as quickly as you can. Keep the thighs roughly vertical so the movement happens at the knee, and stay light on the balls of your feet. If your knees are drifting forward and the heels are landing at the back of your thigh, slow down and shorten the range until the pattern is clean.",
    "avoidIf": ["high-impact", "knee"],
    "icon": "🏃",
    "pattern": "Stretch",
    "force": "Explosive",
    "focus": ["mobility"],
    "category": "warmup",
    "sports": ["track-field", "football"],
    "hold": "3 × 30s"
  },
  {
    "id": "tf-ankle-pogo-hops",
    "name": "Ankle Pogo Hops",
    "muscleGroup": "Calves",
    "secondaryMuscles": [],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Small fast hops off the ankles with the knees almost locked.",
    "description": "Stand tall and hop on the spot using only your ankles, keeping the knees nearly straight and the toes pulled up as you leave the ground. Aim for quick, quiet, springy contacts rather than height. Bending the knees to jump higher turns this into a squat jump and loses the whole point, which is stiffness through the ankle and Achilles before you sprint.",
    "avoidIf": ["high-impact"],
    "icon": "🏃",
    "pattern": "Stretch",
    "force": "Explosive",
    "focus": ["mobility"],
    "category": "warmup",
    "sports": ["track-field"],
    "hold": "3 × 20"
  },
  {
    "id": "tf-straight-leg-march",
    "name": "Straight-Leg March",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": ["Glutes", "Calves"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "March forward kicking a straight leg up and pulling it straight back down.",
    "description": "March forward on the balls of your feet, kicking one straight leg up in front of you and then actively pulling it back down to strike the ground underneath your hips. Keep the toe pulled up toward the shin and the torso tall. The pull back down is the whole exercise — letting the leg just drop makes it a hamstring stretch instead of the active warm-up it should be.",
    "avoidIf": ["hip", "lower-back"],
    "icon": "🏃",
    "pattern": "Stretch",
    "force": "Static",
    "focus": ["mobility"],
    "category": "warmup",
    "sports": ["track-field"],
    "hold": "3 × 20m"
  },
  {
    "id": "tf-standing-calf-stretch",
    "name": "Standing Calf Stretch",
    "muscleGroup": "Calves",
    "secondaryMuscles": [],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Hands on a wall, one leg back with the heel pressed down.",
    "description": "Stand facing a wall with both hands on it, step one foot well back and press that heel into the floor with the leg straight. Then do it again with that back knee slightly bent, which shifts the stretch from the big calf muscle to the deeper one nearer the Achilles. Keep the back toes pointing straight at the wall — letting the foot turn out is what makes people feel it in the ankle rather than the calf.",
    "avoidIf": [],
    "icon": "🏃",
    "pattern": "Stretch",
    "force": "Static",
    "focus": ["mobility"],
    "category": "cooldown",
    "sports": ["track-field", "football"],
    "hold": "2 × 45s each side"
  },
  {
    "id": "tf-seated-hamstring-stretch",
    "name": "Seated Hamstring Stretch",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": ["Calves"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "One leg straight, the other tucked in, fold over the straight leg.",
    "description": "Sit with one leg straight out and the other bent so its sole rests against the inside of the straight thigh. Sit up tall, then hinge from the hips over the straight leg and hold wherever you reach comfortably. Keep the toes of the straight leg pointing up and the back long — rounding over to reach the foot moves the stretch into your lower back, which is exactly what a runner doesn't need.",
    "avoidIf": ["lower-back"],
    "icon": "🏃",
    "pattern": "Stretch",
    "force": "Static",
    "focus": ["mobility"],
    "category": "cooldown",
    "sports": ["track-field"],
    "hold": "2 × 45s each side"
  },
  {
    "id": "tf-standing-it-band",
    "name": "Standing IT Band Stretch",
    "muscleGroup": "Glutes",
    "secondaryMuscles": ["Hamstrings"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Cross one leg behind the other and lean away over the back hip.",
    "description": "Stand and cross one foot behind the other, then push that back hip out to the side and lean your torso the opposite way, reaching the same-side arm overhead. You should feel a long line down the outside of the back leg and hip. Keep both feet flat on the floor — coming up onto the outside edge of a foot is the usual compensation and it kills the stretch.",
    "avoidIf": ["hip", "balance"],
    "icon": "🏃",
    "pattern": "Stretch",
    "force": "Static",
    "focus": ["mobility"],
    "category": "cooldown",
    "sports": ["track-field", "football"],
    "hold": "2 × 45s each side"
  }
];

/* ───────────────────────────────────────────────────────────────────────────
 * STRETCH TYPES — the discipline a stretch belongs to.
 *
 * Added 2026-09-02. `category` already said WHEN a stretch belongs (warmup /
 * cooldown); this says WHAT KIND it is, which is what a person actually picks
 * by. "I want a yoga session" and "I want to warm up" are different requests
 * and the old data could express neither.
 *
 * Why it matters beyond taste: before this, every stretch was dealt at the end
 * of every session no matter what you picked, and many carry a leg muscle group
 * (13 Hamstrings, 12 Glutes, 8 Quads). Finish a chest session and the tail of
 * the deck is hamstring and glute cards — which reads, correctly, as "the leg
 * exercises are leaking into the other categories". They were never training
 * moves. They were unlabelled, unrequested stretches.
 * ─────────────────────────────────────────────────────────────────────────── */
const STRETCH_TYPES = [
  { "id": "yoga",    "label": "Yoga",            "blurb": "Named poses and flows" },
  { "id": "dynamic", "label": "Dynamic warm-up", "blurb": "Moving prep before you train" },
  { "id": "static",  "label": "Static stretch",  "blurb": "Held stretches to cool down" }
];

/* One table rather than a field on sixty-one objects, so the whole
 * classification is reviewable at a glance and stays internally consistent.
 * Anything unlisted falls back to "static", the safe default: a held stretch is
 * never wrong to offer as a cool-down. */
const STRETCH_TYPE_BY_ID = {
  "yoga-cat-cow": "yoga",
  "yoga-downward-dog": "yoga",
  "yoga-standing-forward-fold": "yoga",
  "yoga-low-lunge": "yoga",
  "yoga-high-lunge": "yoga",
  "yoga-warrior-one": "yoga",
  "yoga-warrior-two": "yoga",
  "yoga-extended-side-angle": "yoga",
  "yoga-triangle-pose": "yoga",
  "yoga-chair-pose": "yoga",
  "yoga-plank-pose": "yoga",
  "yoga-cobra-pose": "yoga",
  "yoga-upward-dog": "yoga",
  "yoga-crescent-twist": "yoga",
  "yoga-tree-pose": "yoga",
  "yoga-warrior-three": "yoga",
  "yoga-garland-pose": "yoga",
  "yoga-childs-pose": "yoga",
  "yoga-pigeon-pose": "yoga",
  "yoga-seated-forward-fold": "yoga",
  "yoga-bound-angle": "yoga",
  "yoga-supine-twist": "yoga",
  "yoga-happy-baby": "yoga",
  "yoga-bridge-pose": "yoga",
  "yoga-reclined-hamstring": "static",
  "yoga-thread-the-needle": "yoga",
  "yoga-sphinx-pose": "yoga",
  "yoga-legs-up-wall": "yoga",
  "yoga-puppy-pose": "yoga",
  "yoga-head-to-knee": "yoga",
  "yoga-cow-face-arms": "yoga",
  "yoga-seated-neck-release": "static",
  "yoga-corpse-pose": "yoga",
  "fb-leg-swings-front": "dynamic",
  "fb-leg-swings-lateral": "dynamic",
  "fb-walking-knee-hug": "dynamic",
  "fb-walking-quad-pull": "dynamic",
  "fb-frankenstein-walk": "dynamic",
  "fb-lunge-with-twist": "dynamic",
  "fb-neck-isometric": "static",
  "fb-kneeling-hip-flexor": "static",
  "fb-seated-groin-stretch": "static",
  "fb-figure-four-glute": "static",
  "bb-arm-circles": "dynamic",
  "bb-band-pull-apart": "dynamic",
  "bb-open-book": "dynamic",
  "bb-trunk-twists": "dynamic",
  "bb-wrist-forearm-stretch": "static",
  "bb-hip-rotations": "dynamic",
  "bb-sleeper-stretch": "static",
  "bb-cross-body-shoulder": "static",
  "bb-overhead-lat-stretch": "static",
  "tf-a-skip": "dynamic",
  "tf-b-skip": "dynamic",
  "tf-high-knees": "dynamic",
  "tf-butt-kicks": "dynamic",
  "tf-ankle-pogo-hops": "dynamic",
  "tf-straight-leg-march": "dynamic",
  "tf-standing-calf-stretch": "static",
  "tf-seated-hamstring-stretch": "static",
  "tf-standing-it-band": "static"
};

STRETCHES.forEach(function (st) {
  st.stretchType = STRETCH_TYPE_BY_ID[st.id] || "static";
});

// One library, one schema. Stretches live in EXERCISES like everything else — the app
// tells them apart by `category`, never by which array they came from.
EXERCISES.push.apply(EXERCISES, STRETCHES);

/* New beginner + bodyweight-only training moves, added 2026-09-02.
 *
 * Chosen from a MEASURED gap, not a guess: counting the library by group showed a
 * beginner with no equipment had ZERO triceps options, one for shoulders, two for
 * biceps and three for hamstrings. Those four groups are what this fills. Every
 * move here is Beginner and bodyweight-only, because that was the hole.
 *
 * Several are self-resisted or isometric. That is deliberate: biceps and triceps
 * genuinely need resistance, and pretending a floor move trains them would be worse
 * than offering an honest isometric you can load as hard as you like.
 */
const BEGINNER_BODYWEIGHT = [
  {
    "id": "knee-close-grip-push-up",
    "name": "Close-Grip Push-Up (Knees)",
    "muscleGroup": "Triceps",
    "secondaryMuscles": ["Chest", "Shoulders"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Hands under your shoulders, elbows brushing your ribs.",
    "description": "Kneel with your hands under your shoulders, narrower than a normal push-up, and keep a straight line from knees to head. Lower until your chest is just off the floor, elbows tracking back along your ribs rather than flaring out. Push up. The narrow hands are what move the work from chest to triceps — if your elbows drift wide, it becomes a push-up again.",
    "avoidIf": ["wrist", "shoulder"],
    "icon": "💪",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": ["strength"],
    "homeFriendly": true,
    "aliases": ["Kneeling Close-Grip Push-Up", "Triceps Push-Up"],
    "category": "strength"
  },
  {
    "id": "tabletop-dip",
    "name": "Tabletop Dip",
    "muscleGroup": "Triceps",
    "secondaryMuscles": ["Shoulders", "Glutes"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Fingers pointing at your heels, hips stay lifted.",
    "description": "Sit with knees bent and feet flat, hands behind you with fingers pointing toward your heels. Press your hips up into a tabletop, then bend your elbows straight back to lower a few inches and press back up. Keep the hips high the whole time — letting them sag turns it into a rest. Straighten your legs to make it harder.",
    "avoidIf": ["wrist", "shoulder"],
    "icon": "🪑",
    "mechanic": "Compound",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": false,
    "focus": ["strength"],
    "homeFriendly": true,
    "aliases": ["Floor Dip", "Crab Dip"],
    "category": "strength"
  },
  {
    "id": "wall-triceps-press",
    "name": "Wall Triceps Press",
    "muscleGroup": "Triceps",
    "secondaryMuscles": ["Shoulders"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Forearms on the wall, press through your palms only.",
    "description": "Stand a forearm's length from a wall and place your forearms flat on it, elbows at shoulder height. Let your body lean in, then press through your palms until your arms straighten, keeping your elbows where they are. The elbows staying put is the whole exercise — if they slide out, your chest takes over. Step further back to add load.",
    "avoidIf": ["wrist", "shoulder"],
    "icon": "🧱",
    "mechanic": "Isolation",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": ["strength"],
    "homeFriendly": true,
    "aliases": ["Standing Wall Extension"],
    "category": "strength"
  },
  {
    "id": "self-resisted-triceps-extension",
    "name": "Self-Resisted Triceps Extension",
    "muscleGroup": "Triceps",
    "secondaryMuscles": [],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Push one hand down while the other resists it.",
    "description": "Hold your right hand behind your head with the elbow pointing up, and press your left hand against your right forearm. Straighten the right arm while the left resists, taking about three seconds. Reverse and lower under the same resistance. You set the load, so it works with no gear at all — go hard enough that the last rep is genuinely difficult.",
    "avoidIf": ["shoulder", "wrist"],
    "icon": "🤜",
    "mechanic": "Isolation",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": true,
    "focus": ["strength"],
    "homeFriendly": true,
    "aliases": ["Manual Resistance Triceps"],
    "category": "strength"
  },
  {
    "id": "bear-crawl-shoulder-tap",
    "name": "Bear Crawl Shoulder Tap",
    "muscleGroup": "Triceps",
    "secondaryMuscles": ["Shoulders", "Core/Abs"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Knees an inch off the floor, hips dead still.",
    "description": "Set up on hands and knees with your knees hovering an inch off the floor, back flat. Lift one hand and tap the opposite shoulder, then swap. The arm on the floor is holding you up single-handed, which is where the triceps work comes from. Keep your hips from rocking — widen your feet if they do.",
    "avoidIf": ["wrist", "shoulder"],
    "icon": "🐻",
    "mechanic": "Compound",
    "pattern": "Core",
    "force": "Static",
    "unilateral": true,
    "focus": ["strength", "endurance"],
    "homeFriendly": true,
    "aliases": ["Bear Hold Shoulder Tap"],
    "category": "strength"
  },
  {
    "id": "wall-slide",
    "name": "Wall Slide",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": ["Back"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Wrists stay touching the wall the whole way up.",
    "description": "Stand with your back to a wall, arms bent in a goalpost with the backs of your hands and wrists touching it. Slide your arms overhead, keeping contact, then come back down. Most people lose the wall near the top — go only as high as you can hold it. It builds overhead range and the small upward rotators nothing else reaches.",
    "avoidIf": ["shoulder"],
    "icon": "🙌",
    "mechanic": "Isolation",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": false,
    "focus": ["mobility", "strength"],
    "homeFriendly": true,
    "aliases": ["Wall Overhead Slide"],
    "category": "strength"
  },
  {
    "id": "wall-angel",
    "name": "Wall Angel",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": ["Back", "Core/Abs"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Flatten your lower back into the wall before you move.",
    "description": "Stand with your heels a few inches from a wall, and press your lower back, upper back and head into it. Raise your arms into a goalpost and sweep them up and down like making a snow angel, keeping five points of contact. It looks easy and is not — the lower back peeling off the wall is the usual failure, so shorten the range before you let that happen.",
    "avoidIf": ["shoulder", "neck"],
    "icon": "👼",
    "mechanic": "Isolation",
    "pattern": "Vertical Push",
    "force": "Static",
    "unilateral": false,
    "focus": ["mobility"],
    "homeFriendly": true,
    "aliases": ["Standing Snow Angel"],
    "category": "strength"
  },
  {
    "id": "prone-y-raise",
    "name": "Prone Y-Raise",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": ["Back"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Thumbs up, arms in a Y, lift from the shoulder blades.",
    "description": "Lie face down with your arms out in a Y and thumbs pointing at the ceiling. Lift your hands a few inches off the floor by squeezing your shoulder blades down and together, hold a second, and lower. Keep your forehead down and your neck long. Tiny range, and it hits the lower traps, which are the part that stops your shoulders rounding forward.",
    "avoidIf": ["shoulder", "lower-back"],
    "icon": "🔱",
    "mechanic": "Isolation",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": ["strength", "mobility"],
    "homeFriendly": true,
    "aliases": ["Prone Y", "Lower Trap Raise"],
    "category": "strength"
  },
  {
    "id": "prone-t-raise",
    "name": "Prone T-Raise",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": ["Back"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Arms straight out sideways, squeeze the blades together.",
    "description": "Lie face down with your arms straight out to the sides in a T, thumbs up. Lift your hands off the floor by pinching your shoulder blades together, pause, and lower slowly. Do not throw your head back to help. It builds the rear delts and mid-traps, which almost nothing in a home workout trains directly.",
    "avoidIf": ["shoulder", "lower-back"],
    "icon": "✝️",
    "mechanic": "Isolation",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": ["strength"],
    "homeFriendly": true,
    "aliases": ["Prone T", "Rear Delt Raise (Floor)"],
    "category": "strength"
  },
  {
    "id": "scapular-push-up",
    "name": "Scapular Push-Up",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": ["Chest", "Core/Abs"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Arms stay locked — only your shoulder blades move.",
    "description": "Get into a push-up position (knees down is fine) with your arms straight and keep them straight the whole time. Let your chest sink between your shoulder blades, then push the floor away so your upper back rounds up. That small squeeze-and-push is the entire rep. It trains serratus, which is what keeps your shoulder stable when you press overhead.",
    "avoidIf": ["wrist", "shoulder"],
    "icon": "🔻",
    "mechanic": "Isolation",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": ["strength", "mobility"],
    "homeFriendly": true,
    "aliases": ["Scap Push-Up", "Serratus Push-Up"],
    "category": "strength"
  },
  {
    "id": "seated-isometric-biceps-press",
    "name": "Seated Isometric Biceps Press",
    "muscleGroup": "Biceps",
    "secondaryMuscles": [],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Sit, hands palm-up under your thighs, pull hard.",
    "description": "Sit on a chair and slide both hands palm-up under your thighs, elbows tucked at your ribs. Pull up hard, as if curling your legs off the floor, and hold for fifteen to twenty seconds while breathing normally. Nothing moves, so there is nothing to get wrong, and you can load the biceps as hard as you like with no equipment and nowhere to be",
    "avoidIf": ["wrist"],
    "icon": "🤝",
    "mechanic": "Isolation",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": true,
    "focus": ["strength"],
    "homeFriendly": true,
    "aliases": ["Isometric Curl Hold", "Chair Biceps Hold"],
    "category": "strength"
  },
  {
    "id": "towel-isometric-curl",
    "name": "Towel Isometric Curl",
    "muscleGroup": "Biceps",
    "secondaryMuscles": ["Back"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Stand on the towel and pull up against your own foot.",
    "description": "Loop a towel under one foot and hold both ends with that side's hand, palm up, elbow at your ribs. Pull up hard as if curling, while your leg holds the towel still. Hold the effort for ten to twenty seconds rather than counting reps. Nothing moves, which is the point — it lets you load a biceps hard with no weight in the house.",
    "avoidIf": ["wrist"],
    "icon": "🧺",
    "mechanic": "Isolation",
    "pattern": "Vertical Pull",
    "force": "Static",
    "unilateral": true,
    "focus": ["strength"],
    "homeFriendly": true,
    "aliases": ["Towel Curl Hold"],
    "category": "strength"
  },
  {
    "id": "doorway-biceps-curl",
    "name": "Doorway Biceps Curl",
    "muscleGroup": "Biceps",
    "secondaryMuscles": ["Back"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Lean back holding the frame, pull yourself upright.",
    "description": "Stand facing an open doorway, grip the frame at about waist height with palms up, and walk your feet forward so you are leaning back with straight arms. Pull yourself upright by bending your elbows, then lower slowly. Move your feet closer to make it easier, further to make it harder. Check the frame is solid before you trust it.",
    "avoidIf": ["wrist", "shoulder"],
    "icon": "🚪",
    "mechanic": "Compound",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": ["strength"],
    "homeFriendly": true,
    "aliases": ["Door Frame Curl"],
    "category": "strength"
  },
  {
    "id": "standing-leg-curl",
    "name": "Standing Leg Curl",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": ["Glutes"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Heel to your backside, thigh stays pointing down.",
    "description": "Stand tall, hold something for balance if you need it, and bend one knee to bring your heel toward your backside. Keep the thigh vertical so the movement is all at the knee, squeeze at the top, and lower slowly. Simple and safe, and one of the very few hamstring moves that needs no equipment or floor space at all.",
    "avoidIf": ["knee"],
    "icon": "🦵",
    "mechanic": "Isolation",
    "pattern": "Hinge",
    "force": "Pull",
    "unilateral": true,
    "focus": ["strength"],
    "homeFriendly": true,
    "aliases": ["Standing Hamstring Curl"],
    "category": "strength"
  },
  {
    "id": "bodyweight-single-leg-rdl",
    "name": "Single-Leg Romanian Deadlift",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": ["Glutes", "Core/Abs"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Hinge at the hip; your back leg and your back make one line.",
    "description": "Stand on one leg with a soft knee. Hinge forward at the hip, letting the other leg travel straight back so your body makes one long line from heel to head. Go as far as you can keep your back flat, then stand up by driving the hip forward. Touch a wall with one hand if you wobble — balance should not be the thing that limits you.",
    "avoidIf": ["lower-back", "balance"],
    "icon": "⚖️",
    "mechanic": "Compound",
    "pattern": "Hinge",
    "force": "Pull",
    "unilateral": true,
    "focus": ["strength", "mobility"],
    "homeFriendly": true,
    "aliases": ["SLRDL", "Single-Leg Hinge"],
    "category": "strength"
  },
  {
    "id": "towel-slider-leg-curl",
    "name": "Towel Slider Leg Curl",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": ["Glutes", "Core/Abs"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Hips stay up while your heels slide out and back.",
    "description": "Lie on your back on a smooth floor with a towel under each heel, knees bent, and press your hips up into a bridge. Slide your heels away until your legs are nearly straight, then drag them back in — keeping the hips lifted throughout. The hamstrings work hardest holding the bridge as the legs extend, so the moment your hips drop, stop.",
    "avoidIf": ["knee", "lower-back"],
    "icon": "🧻",
    "mechanic": "Compound",
    "pattern": "Hinge",
    "force": "Pull",
    "unilateral": false,
    "focus": ["strength"],
    "homeFriendly": true,
    "aliases": ["Slider Hamstring Curl", "Towel Curl"],
    "category": "strength"
  },
  {
    "id": "counter-push-up",
    "name": "Counter Push-Up",
    "muscleGroup": "Chest",
    "secondaryMuscles": ["Triceps", "Shoulders"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Hands on the counter, body in one straight line.",
    "description": "Put your hands on a kitchen counter slightly wider than your shoulders and walk your feet back until your body is a straight line. Lower your chest to the counter and press away. The higher the surface, the easier it is, which makes this the gentlest push-up there is and a good place to start if a knee push-up is still too much.",
    "avoidIf": ["wrist", "shoulder"],
    "icon": "🍳",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": ["strength"],
    "homeFriendly": true,
    "aliases": ["Countertop Push-Up", "Standing Incline Push-Up"],
    "category": "strength"
  },
  {
    "id": "floor-chest-squeeze",
    "name": "Floor Chest Squeeze",
    "muscleGroup": "Chest",
    "secondaryMuscles": ["Shoulders"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Press your palms together hard and hold.",
    "description": "Stand or sit tall, press your palms together in front of your chest, and push one hand against the other as hard as you can. Hold for ten to twenty seconds, breathing normally. There is no movement and no equipment, and it still loads the chest — useful on days when getting on the floor is the barrier rather than the effort.",
    "avoidIf": ["wrist"],
    "icon": "🙏",
    "mechanic": "Isolation",
    "pattern": "Horizontal Push",
    "force": "Static",
    "unilateral": false,
    "focus": ["strength"],
    "homeFriendly": true,
    "aliases": ["Isometric Chest Press", "Prayer Press"],
    "category": "strength"
  }
];
EXERCISES.push.apply(EXERCISES, BEGINNER_BODYWEIGHT);

/* More stretches, added 2026-09-02, weighted toward what was thin.
 * The library was yoga-warm-up heavy; this adds static cool-down holds and dynamic
 * prep drills, plus enough extra yoga that a yoga-only session is a real session
 * rather than six poses and a shrug. */
const STRETCHES_MORE = [
  {
    "id": "yoga-seated-spinal-twist",
    "name": "Seated Spinal Twist",
    "muscleGroup": "Back",
    "secondaryMuscles": ["Glutes", "Core/Abs"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Sit tall first, then turn — height before rotation.",
    "description": "Sit with your legs out, bend the right knee and cross it over the left thigh. Hug that knee with your left arm and place your right hand behind you. Lengthen up through the spine as you breathe in, and turn a little further as you breathe out. Never crank on it — the turn should come from your ribs, not your neck.",
    "avoidIf": ["lower-back", "neck"],
    "icon": "🌀",
    "mechanic": "Isolation",
    "pattern": "Stretch",
    "force": "Static",
    "unilateral": false,
    "focus": ["mobility"],
    "homeFriendly": true,
    "aliases": ["Ardha Matsyendrasana", "Half Lord of the Fishes"],
    "category": "cooldown",
    "sports": ["yoga"],
    "hold": "2 × 45s each side",
    "stretchType": "yoga"
  },
  {
    "id": "yoga-camel",
    "name": "Camel Pose",
    "muscleGroup": "Chest",
    "secondaryMuscles": ["Core/Abs", "Quads"],
    "equipment": ["bodyweight"],
    "difficulty": "Intermediate",
    "cue": "Hips stay over your knees as you open the chest.",
    "description": "Kneel with your knees hip-width and your hands on your lower back, fingers pointing down. Press your hips forward and lift your chest toward the ceiling, reaching for your heels only if your hips stay stacked over your knees. It is a strong front-body opener after a day of sitting. Come out by leading with your chest, not your head.",
    "avoidIf": ["lower-back", "neck", "knee"],
    "icon": "🐫",
    "mechanic": "Isolation",
    "pattern": "Stretch",
    "force": "Static",
    "unilateral": false,
    "focus": ["mobility"],
    "homeFriendly": true,
    "aliases": ["Ustrasana"],
    "category": "cooldown",
    "sports": ["yoga"],
    "hold": "2 × 30s",
    "stretchType": "yoga"
  },
  {
    "id": "yoga-bow",
    "name": "Bow Pose",
    "muscleGroup": "Chest",
    "secondaryMuscles": ["Quads", "Back"],
    "equipment": ["bodyweight"],
    "difficulty": "Intermediate",
    "cue": "Kick your feet into your hands to lift your chest.",
    "description": "Lie face down, bend your knees and take hold of your ankles. Rather than pulling with your arms, press your feet back into your hands — that is what lifts your chest and thighs off the floor. Keep your knees roughly hip-width. It opens everything on the front of the body at once.",
    "avoidIf": ["lower-back", "knee", "shoulder"],
    "icon": "🏹",
    "mechanic": "Isolation",
    "pattern": "Stretch",
    "force": "Static",
    "unilateral": false,
    "focus": ["mobility"],
    "homeFriendly": true,
    "aliases": ["Dhanurasana"],
    "category": "cooldown",
    "sports": ["yoga"],
    "hold": "2 × 20s",
    "stretchType": "yoga"
  },
  {
    "id": "yoga-locust",
    "name": "Locust Pose",
    "muscleGroup": "Back",
    "secondaryMuscles": ["Glutes", "Shoulders"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Lift chest and legs together, arms reaching back.",
    "description": "Lie face down with your arms alongside your body, palms down. Lift your chest, arms and legs away from the floor at the same time, reaching your fingertips back toward your heels. Keep looking at the floor so your neck stays long. It is the gentlest of the backbends and the best starting point for them.",
    "avoidIf": ["lower-back", "neck"],
    "icon": "🦗",
    "mechanic": "Isolation",
    "pattern": "Stretch",
    "force": "Static",
    "unilateral": false,
    "focus": ["mobility"],
    "homeFriendly": true,
    "aliases": ["Salabhasana"],
    "category": "warmup",
    "sports": ["yoga"],
    "hold": "3 × 20s",
    "stretchType": "yoga"
  },
  {
    "id": "yoga-boat",
    "name": "Boat Pose",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": ["Quads"],
    "equipment": ["bodyweight"],
    "difficulty": "Intermediate",
    "cue": "Lift your chest — a rounded back means bend the knees.",
    "description": "Sit with your knees bent and feet flat, lean back slightly and lift your feet so your shins are parallel to the floor. Reach your arms forward beside your knees and lift through your chest. Straighten your legs only if your back stays long. The moment your spine rounds you are training slump, not core.",
    "avoidIf": ["lower-back"],
    "icon": "⛵",
    "mechanic": "Isolation",
    "pattern": "Stretch",
    "force": "Static",
    "unilateral": false,
    "focus": ["mobility"],
    "homeFriendly": true,
    "aliases": ["Navasana"],
    "category": "warmup",
    "sports": ["yoga"],
    "hold": "3 × 20s",
    "stretchType": "yoga"
  },
  {
    "id": "yoga-half-moon",
    "name": "Half Moon Pose",
    "muscleGroup": "Glutes",
    "secondaryMuscles": ["Core/Abs", "Hamstrings"],
    "equipment": ["bodyweight"],
    "difficulty": "Advanced",
    "cue": "Stack your top hip over the bottom one.",
    "description": "From a lunge, straighten your front leg and lift the back leg to hip height, turning your chest open to the side with the top arm reaching up. Use a block or a chair under the bottom hand — almost everyone needs one. The work is in stacking the hips rather than in how high the leg gets.",
    "avoidIf": ["balance", "knee", "lower-back"],
    "icon": "🌙",
    "mechanic": "Isolation",
    "pattern": "Stretch",
    "force": "Static",
    "unilateral": false,
    "focus": ["mobility"],
    "homeFriendly": true,
    "aliases": ["Ardha Chandrasana"],
    "category": "warmup",
    "sports": ["yoga"],
    "hold": "2 × 30s each side",
    "stretchType": "yoga"
  },
  {
    "id": "yoga-eagle",
    "name": "Eagle Pose",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": ["Glutes", "Quads"],
    "equipment": ["bodyweight"],
    "difficulty": "Intermediate",
    "cue": "Wrap arms and legs, then sit down an inch.",
    "description": "Cross your right thigh over your left and hook the foot behind the calf if it reaches. Cross your left arm under the right and press the palms toward each other. Sit down slightly and lift your elbows. It wrings out the upper back and outer hips at once, and the balance element wakes up the ankles.",
    "avoidIf": ["balance", "knee", "shoulder"],
    "icon": "🦅",
    "mechanic": "Isolation",
    "pattern": "Stretch",
    "force": "Static",
    "unilateral": false,
    "focus": ["mobility"],
    "homeFriendly": true,
    "aliases": ["Garudasana"],
    "category": "warmup",
    "sports": ["yoga"],
    "hold": "2 × 30s each side",
    "stretchType": "yoga"
  },
  {
    "id": "yoga-wide-legged-forward-fold",
    "name": "Wide-Legged Forward Fold",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": ["Back", "Calves"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Hinge from the hips with a long spine.",
    "description": "Stand with your feet wide and parallel, hands on your hips. Hinge forward from the hips with a flat back and let your hands come to the floor or a block. Let your head hang and shift a little weight into the balls of your feet. It reaches the inner hamstrings that a normal fold misses.",
    "avoidIf": ["lower-back", "hip"],
    "icon": "🔻",
    "mechanic": "Isolation",
    "pattern": "Stretch",
    "force": "Static",
    "unilateral": false,
    "focus": ["mobility"],
    "homeFriendly": true,
    "aliases": ["Prasarita Padottanasana"],
    "category": "cooldown",
    "sports": ["yoga"],
    "hold": "2 × 45s",
    "stretchType": "yoga"
  },
  {
    "id": "yoga-revolved-triangle",
    "name": "Revolved Triangle",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": ["Back", "Core/Abs"],
    "equipment": ["bodyweight"],
    "difficulty": "Advanced",
    "cue": "Square your hips first, then twist.",
    "description": "From a short stance with the front foot forward, place the opposite hand to a block outside the front foot and open the other arm up. Get your hips level before you rotate — most people twist from the lower back instead, which is where it goes wrong. Strong for hamstrings and thoracic rotation together.",
    "avoidIf": ["lower-back", "balance", "hip"],
    "icon": "🔺",
    "mechanic": "Isolation",
    "pattern": "Stretch",
    "force": "Static",
    "unilateral": false,
    "focus": ["mobility"],
    "homeFriendly": true,
    "aliases": ["Parivrtta Trikonasana"],
    "category": "cooldown",
    "sports": ["yoga"],
    "hold": "2 × 30s each side",
    "stretchType": "yoga"
  },
  {
    "id": "yoga-reclined-bound-angle",
    "name": "Reclined Bound Angle",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Soles together, knees heavy, do nothing else.",
    "description": "Lie on your back, bring the soles of your feet together and let your knees fall open. Rest your arms wherever they are comfortable and stay for a few minutes. Put cushions under your knees if the stretch is sharp — it should feel like release rather than effort. One of the few poses that works as an actual rest.",
    "avoidIf": ["hip", "knee"],
    "icon": "🦋",
    "mechanic": "Isolation",
    "pattern": "Stretch",
    "force": "Static",
    "unilateral": false,
    "focus": ["mobility"],
    "homeFriendly": true,
    "aliases": ["Supta Baddha Konasana"],
    "category": "cooldown",
    "sports": ["yoga"],
    "hold": "1 × 2min",
    "stretchType": "yoga"
  },
  {
    "id": "yoga-mountain-breath",
    "name": "Mountain Pose with Breath",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": ["Shoulders"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Stand still and take five slow breaths.",
    "description": "Stand with your feet under your hips, arms at your sides, weight even across both feet. Lengthen up through the crown of your head and take five slow breaths, letting the shoulders settle on each exhale. It is the pose people skip, and it is the one that sets up every other one — and it works as a standalone reset.",
    "avoidIf": [],
    "icon": "⛰️",
    "mechanic": "Isolation",
    "pattern": "Stretch",
    "force": "Static",
    "unilateral": false,
    "focus": ["mobility"],
    "homeFriendly": true,
    "aliases": ["Tadasana"],
    "category": "warmup",
    "sports": ["yoga"],
    "hold": "1 × 1min",
    "stretchType": "yoga"
  },
  {
    "id": "yoga-side-plank-pose",
    "name": "Side Plank Pose",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": ["Shoulders", "Glutes"],
    "equipment": ["bodyweight"],
    "difficulty": "Intermediate",
    "cue": "Stack your shoulder directly over your wrist.",
    "description": "From a plank, roll onto one hand and the outer edge of that foot, stacking your feet and lifting your top arm. Drop the bottom knee to the floor for an easier version. Push the floor away so your bottom shoulder does not sink. It is both a stretch and a genuine strength hold.",
    "avoidIf": ["wrist", "shoulder"],
    "icon": "📐",
    "mechanic": "Isolation",
    "pattern": "Stretch",
    "force": "Static",
    "unilateral": false,
    "focus": ["mobility"],
    "homeFriendly": true,
    "aliases": ["Vasisthasana"],
    "category": "warmup",
    "sports": ["yoga"],
    "hold": "2 × 30s each side",
    "stretchType": "yoga"
  },
  {
    "id": "static-doorway-chest",
    "name": "Doorway Chest Stretch",
    "muscleGroup": "Chest",
    "secondaryMuscles": ["Shoulders"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Forearm on the frame, turn your chest away.",
    "description": "Stand in a doorway and place your forearm on the frame with your elbow at shoulder height. Step through gently with the same-side foot and turn your chest away until you feel it across the front of the shoulder. Move the elbow higher or lower to change where it bites. The best single antidote to a day at a desk.",
    "avoidIf": ["shoulder"],
    "icon": "🚪",
    "mechanic": "Isolation",
    "pattern": "Stretch",
    "force": "Static",
    "unilateral": false,
    "focus": ["mobility"],
    "homeFriendly": true,
    "aliases": ["Pec Stretch", "Door Frame Chest Opener"],
    "category": "cooldown",
    "sports": ["yoga", "football"],
    "hold": "2 × 30s each side",
    "stretchType": "static"
  },
  {
    "id": "static-standing-quad",
    "name": "Standing Quad Stretch",
    "muscleGroup": "Quads",
    "secondaryMuscles": [],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Knees together, push your hip forward.",
    "description": "Stand on one leg, catch the other ankle behind you and draw the heel toward your backside. Keep the knees side by side and push the hip of the stretching leg gently forward. Hold a wall if you need to. Almost everyone lets the knee drift out to the side, which removes most of the stretch.",
    "avoidIf": ["knee", "balance"],
    "icon": "🦵",
    "mechanic": "Isolation",
    "pattern": "Stretch",
    "force": "Static",
    "unilateral": false,
    "focus": ["mobility"],
    "homeFriendly": true,
    "aliases": ["Standing Thigh Stretch"],
    "category": "cooldown",
    "sports": ["football", "track-field"],
    "hold": "2 × 30s each side",
    "stretchType": "static"
  },
  {
    "id": "static-seated-piriformis",
    "name": "Seated Piriformis Stretch",
    "muscleGroup": "Glutes",
    "secondaryMuscles": ["Back"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Ankle on the opposite knee, then lean forward.",
    "description": "Sit on a chair, cross one ankle over the opposite knee so the shin is roughly parallel to the floor, and keep that foot flexed. Sit tall, then hinge forward from the hips until you feel it deep in the backside. Works anywhere there is a chair, which makes it the one deep-hip stretch you will actually do at work.",
    "avoidIf": ["hip", "knee", "lower-back"],
    "icon": "🪑",
    "mechanic": "Isolation",
    "pattern": "Stretch",
    "force": "Static",
    "unilateral": false,
    "focus": ["mobility"],
    "homeFriendly": true,
    "aliases": ["Figure-4 Chair Stretch"],
    "category": "cooldown",
    "sports": ["yoga", "football"],
    "hold": "2 × 45s each side",
    "stretchType": "static"
  },
  {
    "id": "static-upper-trap",
    "name": "Upper Trapezius Stretch",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": ["Back"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Sit on the opposite hand and tilt your ear over.",
    "description": "Sit down and tuck one hand under your thigh to anchor the shoulder. Tilt your head so the opposite ear travels toward that shoulder, and let the weight of your head do the work. Do not pull hard with your other hand. Anchoring the shoulder is what makes it a stretch rather than a shrug.",
    "avoidIf": ["neck", "shoulder"],
    "icon": "🙆",
    "mechanic": "Isolation",
    "pattern": "Stretch",
    "force": "Static",
    "unilateral": false,
    "focus": ["mobility"],
    "homeFriendly": true,
    "aliases": ["Neck Side Stretch", "Trap Stretch"],
    "category": "cooldown",
    "sports": ["yoga"],
    "hold": "2 × 30s each side",
    "stretchType": "static"
  },
  {
    "id": "static-frog",
    "name": "Frog Stretch",
    "muscleGroup": "Glutes",
    "secondaryMuscles": ["Hamstrings"],
    "equipment": ["bodyweight"],
    "difficulty": "Intermediate",
    "cue": "Knees wide, shins parallel, rock back slowly.",
    "description": "Kneel on something soft and take your knees as wide as is comfortable, shins parallel and ankles in line with the knees. Come onto your forearms and rock your hips back slowly, stopping well before anything sharp. It reaches the inner thigh and deep hip better than anything else, and it demands patience.",
    "avoidIf": ["hip", "knee", "lower-back"],
    "icon": "🐸",
    "mechanic": "Isolation",
    "pattern": "Stretch",
    "force": "Static",
    "unilateral": false,
    "focus": ["mobility"],
    "homeFriendly": true,
    "aliases": ["Adductor Rock Back"],
    "category": "cooldown",
    "sports": ["yoga"],
    "hold": "2 × 45s",
    "stretchType": "static"
  },
  {
    "id": "static-kneeling-lat",
    "name": "Kneeling Lat Stretch",
    "muscleGroup": "Back",
    "secondaryMuscles": ["Shoulders"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Hands on a surface, sink your chest toward the floor.",
    "description": "Kneel in front of a chair or sofa and place both hands on it, thumbs up. Sit your hips back toward your heels and let your chest sink between your arms. Breathe into the sides of your ribs. It lengthens the lats, which is usually what limits overhead reach far more than the shoulders do.",
    "avoidIf": ["shoulder", "lower-back"],
    "icon": "🛋️",
    "mechanic": "Isolation",
    "pattern": "Stretch",
    "force": "Static",
    "unilateral": false,
    "focus": ["mobility"],
    "homeFriendly": true,
    "aliases": ["Puppy Stretch on Chair", "Lat Hang Stretch"],
    "category": "cooldown",
    "sports": ["yoga"],
    "hold": "2 × 45s",
    "stretchType": "static"
  },
  {
    "id": "static-standing-side-bend",
    "name": "Standing Side Bend",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": ["Back", "Shoulders"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Reach up and over — do not lean forward.",
    "description": "Stand tall, reach one arm overhead and lean directly to the opposite side, keeping both feet planted. Imagine you are between two panes of glass so you bend sideways rather than forward. It opens the ribs and the side of the waist, which get short from sitting and from carrying things on one side.",
    "avoidIf": ["lower-back"],
    "icon": "🌾",
    "mechanic": "Isolation",
    "pattern": "Stretch",
    "force": "Static",
    "unilateral": false,
    "focus": ["mobility"],
    "homeFriendly": true,
    "aliases": ["Overhead Side Reach"],
    "category": "cooldown",
    "sports": ["yoga", "baseball"],
    "hold": "2 × 30s each side",
    "stretchType": "static"
  },
  {
    "id": "static-prone-quad",
    "name": "Prone Quad Stretch",
    "muscleGroup": "Quads",
    "secondaryMuscles": [],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Lie face down and pull the heel in, hips flat.",
    "description": "Lie face down, bend one knee and reach back for the ankle, or loop a towel around it. Draw the heel toward your backside while keeping both hip bones on the floor. Lying down takes balance out of it entirely, so you can go deeper than the standing version and it suits stiff or nervous knees better.",
    "avoidIf": ["knee", "lower-back"],
    "icon": "🛌",
    "mechanic": "Isolation",
    "pattern": "Stretch",
    "force": "Static",
    "unilateral": false,
    "focus": ["mobility"],
    "homeFriendly": true,
    "aliases": ["Face-Down Quad Stretch"],
    "category": "cooldown",
    "sports": ["football", "track-field"],
    "hold": "2 × 40s each side",
    "stretchType": "static"
  },
  {
    "id": "static-wide-straddle",
    "name": "Seated Wide-Leg Straddle",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": ["Glutes", "Back"],
    "equipment": ["bodyweight"],
    "difficulty": "Intermediate",
    "cue": "Sit on a cushion so your pelvis can tip forward.",
    "description": "Sit with your legs wide and your kneecaps pointing up. Sit on the edge of a cushion so your pelvis tips forward rather than tucking under, then walk your hands forward with a long spine. Stop when your back starts to round. Getting the pelvis to tip is the whole exercise — the depth is beside the point.",
    "avoidIf": ["lower-back", "hip"],
    "icon": "📐",
    "mechanic": "Isolation",
    "pattern": "Stretch",
    "force": "Static",
    "unilateral": false,
    "focus": ["mobility"],
    "homeFriendly": true,
    "aliases": ["Seated Straddle"],
    "category": "cooldown",
    "sports": ["yoga"],
    "hold": "2 × 60s",
    "stretchType": "static"
  },
  {
    "id": "static-wall-calf-soleus",
    "name": "Bent-Knee Calf Stretch",
    "muscleGroup": "Calves",
    "secondaryMuscles": [],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Same wall position, but bend the back knee.",
    "description": "Stand facing a wall with one foot back, then bend that back knee while keeping the heel down. Bending the knee shifts the stretch from the big calf muscle to the soleus underneath it, which is the one that limits ankle movement in a squat. Most people only ever stretch the straight-leg version and miss this entirely.",
    "avoidIf": ["knee"],
    "icon": "🧱",
    "mechanic": "Isolation",
    "pattern": "Stretch",
    "force": "Static",
    "unilateral": false,
    "focus": ["mobility"],
    "homeFriendly": true,
    "aliases": ["Soleus Stretch"],
    "category": "cooldown",
    "sports": ["track-field", "football"],
    "hold": "2 × 40s each side",
    "stretchType": "static"
  },
  {
    "id": "dyn-inchworm",
    "name": "Inchworm Walkout",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": ["Core/Abs", "Shoulders"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Walk your hands out to a plank, walk them back.",
    "description": "Stand tall, hinge forward and put your hands on the floor, bending your knees as much as you need. Walk your hands forward into a plank, pause, then walk them back and stand up. It warms the hamstrings, shoulders and core in one movement, which makes it a good first thing in any session.",
    "avoidIf": ["wrist", "lower-back"],
    "icon": "🐛",
    "mechanic": "Isolation",
    "pattern": "Stretch",
    "force": "Static",
    "unilateral": false,
    "focus": ["mobility"],
    "homeFriendly": true,
    "aliases": ["Walkout", "Hand Walk"],
    "category": "warmup",
    "sports": ["yoga", "track-field"],
    "hold": "2 × 6 reps",
    "stretchType": "dynamic"
  },
  {
    "id": "dyn-worlds-greatest",
    "name": "World's Greatest Stretch",
    "muscleGroup": "Glutes",
    "secondaryMuscles": ["Quads", "Back", "Shoulders"],
    "equipment": ["bodyweight"],
    "difficulty": "Intermediate",
    "cue": "Lunge, drop the elbow inside, then open up and reach.",
    "description": "Step into a deep lunge and lower the same-side elbow toward the inside of your front foot. Then rotate your chest open and reach that arm to the ceiling, following it with your eyes. Step back and swap. It covers hip flexors, glutes, hamstrings and thoracic rotation in a single move, which is where the name comes from.",
    "avoidIf": ["knee", "hip", "lower-back"],
    "icon": "🌍",
    "mechanic": "Isolation",
    "pattern": "Stretch",
    "force": "Static",
    "unilateral": false,
    "focus": ["mobility"],
    "homeFriendly": true,
    "aliases": ["Lunge with Rotation"],
    "category": "warmup",
    "sports": ["football", "track-field", "yoga"],
    "hold": "2 × 5 each side",
    "stretchType": "dynamic"
  },
  {
    "id": "dyn-hip-circles",
    "name": "Standing Hip Circles",
    "muscleGroup": "Glutes",
    "secondaryMuscles": ["Core/Abs"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Draw a big slow circle with your knee.",
    "description": "Stand on one leg, hold something for balance, and lift the other knee to hip height. Draw a slow circle with that knee — out, back, down — then reverse the direction. Keep your torso still so the movement stays in the hip joint. Good ankle and hip prep before anything involving running or lunging.",
    "avoidIf": ["hip", "balance"],
    "icon": "🔄",
    "mechanic": "Isolation",
    "pattern": "Stretch",
    "force": "Static",
    "unilateral": false,
    "focus": ["mobility"],
    "homeFriendly": true,
    "aliases": ["Hip CARs", "Knee Circles"],
    "category": "warmup",
    "sports": ["football", "track-field"],
    "hold": "2 × 8 each way",
    "stretchType": "dynamic"
  },
  {
    "id": "dyn-cossack-rock",
    "name": "Cossack Squat Rock",
    "muscleGroup": "Glutes",
    "secondaryMuscles": ["Quads", "Hamstrings"],
    "equipment": ["bodyweight"],
    "difficulty": "Intermediate",
    "cue": "Sit into one hip, keep the other leg straight.",
    "description": "Stand with your feet very wide and toes slightly out. Shift your weight into one side, bending that knee and sitting your hips back while the other leg stays straight with the toes up. Come back through the middle and go the other way. Hold a doorframe if you need to. It is the best loaded groin stretch there is.",
    "avoidIf": ["knee", "hip", "balance"],
    "icon": "🕺",
    "mechanic": "Isolation",
    "pattern": "Stretch",
    "force": "Static",
    "unilateral": false,
    "focus": ["mobility"],
    "homeFriendly": true,
    "aliases": ["Side Lunge Mobiliser", "Cossack Rock"],
    "category": "warmup",
    "sports": ["football", "track-field"],
    "hold": "2 × 6 each side",
    "stretchType": "dynamic"
  },
  {
    "id": "dyn-quadruped-thoracic",
    "name": "Quadruped Thoracic Rotation",
    "muscleGroup": "Back",
    "secondaryMuscles": ["Shoulders"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Hand behind your head, drive the elbow to the ceiling.",
    "description": "Come onto hands and knees and put one hand behind your head. Bring that elbow down toward the opposite wrist, then rotate it up and open toward the ceiling, following it with your eyes. Keep your hips level and square. It targets the upper back specifically, which is the part that seizes up from sitting.",
    "avoidIf": ["neck", "wrist", "lower-back"],
    "icon": "🌀",
    "mechanic": "Isolation",
    "pattern": "Stretch",
    "force": "Static",
    "unilateral": false,
    "focus": ["mobility"],
    "homeFriendly": true,
    "aliases": ["All-Fours Rotation", "Thread and Reach"],
    "category": "warmup",
    "sports": ["yoga", "baseball"],
    "hold": "2 × 8 each side",
    "stretchType": "dynamic"
  },
  {
    "id": "dyn-leg-cradle-walk",
    "name": "Walking Leg Cradle",
    "muscleGroup": "Glutes",
    "secondaryMuscles": ["Hamstrings"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Hug the shin and lift, then step and swap.",
    "description": "Walking forward, lift one foot and cradle the shin with both hands — one at the ankle, one at the knee — and draw it up toward your chest. Stand tall as you lift rather than crunching down to meet it. Step and swap sides. It opens the outer hip in a way a straight knee hug does not.",
    "avoidIf": ["hip", "knee", "balance"],
    "icon": "🚶",
    "mechanic": "Isolation",
    "pattern": "Stretch",
    "force": "Static",
    "unilateral": false,
    "focus": ["mobility"],
    "homeFriendly": true,
    "aliases": ["Knee Cradle"],
    "category": "warmup",
    "sports": ["football", "track-field"],
    "hold": "2 × 8 each side",
    "stretchType": "dynamic"
  },
  {
    "id": "dyn-ankle-rocks",
    "name": "Kneeling Ankle Rocks",
    "muscleGroup": "Calves",
    "secondaryMuscles": [],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Drive the knee past your toes, heel glued down.",
    "description": "Half-kneel with the front foot flat and a few inches from a wall. Drive that knee forward over the toes toward the wall without letting the heel lift, then rock back. Move the foot back a little each set. Ankle range is what most people are missing when their squat depth is stuck, and it responds quickly.",
    "avoidIf": ["knee"],
    "icon": "🦶",
    "mechanic": "Isolation",
    "pattern": "Stretch",
    "force": "Static",
    "unilateral": false,
    "focus": ["mobility"],
    "homeFriendly": true,
    "aliases": ["Knee-to-Wall Ankle Mobilisation"],
    "category": "warmup",
    "sports": ["track-field", "football"],
    "hold": "2 × 10 each side",
    "stretchType": "dynamic"
  },
  {
    "id": "dyn-scapular-wall-glide",
    "name": "Scapular Wall Glide",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": ["Back"],
    "equipment": ["bodyweight"],
    "difficulty": "Beginner",
    "cue": "Forearms on the wall, slide up and let the blades travel.",
    "description": "Stand facing a wall with your forearms on it, elbows at shoulder height. Slide them up the wall as far as you can while letting your shoulder blades rotate upward, then come back down. Unlike a wall angel this is face-on, so it prepares the shoulder for pressing without straining the front of the joint.",
    "avoidIf": ["shoulder"],
    "icon": "🧗",
    "mechanic": "Isolation",
    "pattern": "Stretch",
    "force": "Static",
    "unilateral": false,
    "focus": ["mobility"],
    "homeFriendly": true,
    "aliases": ["Wall Slide (Facing)"],
    "category": "warmup",
    "sports": ["yoga", "baseball"],
    "hold": "2 × 10 reps",
    "stretchType": "dynamic"
  }
];
EXERCISES.push.apply(EXERCISES, STRETCHES_MORE);

if (typeof module !== "undefined" && module.exports) {
  module.exports = { MUSCLE_GROUPS, EQUIPMENT, CONDITIONS, SPORTS, STRETCH_TYPES, EXERCISES };
}
