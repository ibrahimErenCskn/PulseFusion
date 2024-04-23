interface calculateFitnessProgramProps {
    dayCount: number
    setCount: string
    type: string
}

export const calculateFitnessProgram = ({ dayCount = 6, setCount = '4 x 12', type = "Full Body" }: calculateFitnessProgramProps) => {
    let fitnessProgram: Array<any> = []

    if (type === "Full Body") {

        for (let i = 0; i < dayCount; i++) {
            if (i % 2 === 0) {
                fitnessProgram.push({
                    day: i + 1,
                    sets: setCount,
                    type: 1,
                    exercises: [
                        "Squat",
                        "Lunge",
                        "Dumbell Press",
                        "Dumbell Fly",
                        "Dumbell Front Raise",
                        "One Arm Dumblell Row",
                        "Pulldown",
                        "Dumbell Curl",
                        "Cable Pushdown"
                    ]
                })
            }
            else {
                fitnessProgram.push({
                    day: i + 1,
                    type: 2,
                    exercises: [
                        "Koşu Bandı",
                        "Bisiklet",
                        "Crunch",
                        "Leg Raise",
                        "Russian Twist",
                    ]
                })
            }
        }

        return fitnessProgram
    }
    else {
        for (let i = 0; i < dayCount; i++) {
            if (i % 2 === 0) {
                fitnessProgram.push({
                    day: i + 1,
                    sets: setCount,
                    type: 1,
                    exercises: [
                        "Bench Press",
                        "Dumbbell Press",
                        "Dumbbell Fly",
                        "Triceps Pushdown",
                        "Overhead Triceps Extension",
                    ]
                })
            }
            else if (i % 2 === 1 && i % 3 !== 0) {
                fitnessProgram.push({
                    day: i + 1,
                    type: 2,
                    exercises: [
                        "Pull-up",
                        "Barbell Row",
                        "Seated Row",
                        "Bicep Curl",
                        "Hammer Curl",
                    ]
                })
            }
            else if (i % 3 === 0) {
                fitnessProgram.push({
                    day: i + 1,
                    sets: setCount,
                    type: 3,
                    exercises: [
                        "Squat",
                        "Lunge",
                        "Military Press",
                        "Lathraise",
                        "Calf Raise",
                    ]
                })
            }
        }
        return fitnessProgram
    }
}