
export type FieldValidatorsType  = (value: string) => string | undefined


export const required:FieldValidatorsType = (value) => {
    if (value) return undefined
    return 'Field is required'
}

// Field validator creator  

export const maxLenghtCreator = (maxLenght: number): FieldValidatorsType => (value) => {
    if (value.length > maxLenght)
        return `Max lenght is ${maxLenght} symbols`
    return undefined
}


