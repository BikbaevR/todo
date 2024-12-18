export const generateRandomColor = () =>  {
    return `rgb(${Math.floor(Math.random() * 128)}, ${Math.floor(Math.random() * 128)}, ${Math.floor(Math.random() * 128)})`;
}

export const darkenColorComponent = (colorComponent, darkenPercentage) => {
    return Math.floor(colorComponent * (1 - darkenPercentage / 100));
};