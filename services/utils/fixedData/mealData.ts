interface MealControllerProps {
    mealType: string
}

export const mealController = ({ mealType }: MealControllerProps) => {
    let mealControllerData = [{}]

    if (mealType === "Carbonhidrat") {
        mealControllerData = [
            {

            }
        ]
    }
    else if (mealType === "Protein") {

    }
    else {

    }

    return
}