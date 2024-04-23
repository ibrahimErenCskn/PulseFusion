
interface CalculateCaloriesProps {
    age: number;
    weight: number;
    height: number;
    gender: string;
    moveType: number;
    activityType: any;
}

export const CalculateCalories = ({ age, weight, height, gender, activityType, moveType }: CalculateCaloriesProps) => {
    let calorie = 0
    const activityIndex = [
        1.2,
        1.375,
        1.55,
    ]
    const moveIndex = [
        0,
        300,
        -300,
    ]

    if (gender === "Male") {
        calorie = ((10 * weight) + (6.25 * height) - (5 * age) + 5) * activityIndex[activityType] - moveIndex[moveType];

    }
    if (gender === "Female") {
        calorie = ((10 * weight) + (6.25 * height) - (5 * age) + 5) * activityIndex[activityType];
    }

    return calorie
}

interface calculateBmiIndexProps {
    height: number
    weight: number
}

export const calculateBmiIndex = ({ height, weight }: calculateBmiIndexProps) => {
    const metreBoy = height / 100;
    const bmi: any = (weight / (metreBoy * metreBoy));
    let bmiName;
    if (bmi < 18.5) {
        bmiName = "underweight"
    } else if (bmi >= 18.5 && bmi < 25) {
        bmiName = "normal";
    } else if (bmi >= 25 && bmi < 30) {
        bmiName = "overweight"
    } else {
        bmiName = "obese"
    }
    return [
        [
            {
                value: bmi,
                color: '#009FFF',
                gradientCenterColor: '#006DFF',
                focused: true,
            },
            { value: bmi > 32 ? 0 : 32 - bmi, color: '#93FCF8', gradientCenterColor: '#3BE9DE' }
        ],
        {
            bmiName: bmiName
        }
    ]
}

interface calculateFitnessProgramProps {
    dayCount: number
    setCount: string
    type: string
}

export const calculateFitnessProgram = ({ dayCount = 6, setCount = '4 x 12', type = "Full Body" }: calculateFitnessProgramProps) => {
    const db = require('../fitnessDb/db.json')
    const areaType = ["abs", "lats", "pectorals", "hamstrings", "triceps", "quads", "biceps", "upper back", "glutes", "delts", "serratus anterior", "forearms", "calves", "traps", "adductors", "spine", "cardiovascular system", "abductors", "levator scapulae"]



    let fitnessProgram = []
    Array.from({ length: dayCount })
}