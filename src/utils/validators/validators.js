
export const required = (value) => {
    if (value) return undefined
    return 'Field is required'
}

// Field validator creator  

export const maxLenghtCreator = (maxLenght) => (value) => {
    if (value.length > maxLenght)
        return `Max lenght is ${maxLenght} symbols`
    return undefined
}


