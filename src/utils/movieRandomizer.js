export const movieRandomizer = (array) => {
    const max = array.length
    const randomNumber = Math.floor(Math.random() * max)
    return randomNumber
}