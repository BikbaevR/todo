export const generateRandomColor = () =>  {
    return `rgb(${Math.floor(Math.random() * 128)}, ${Math.floor(Math.random() * 128)}, ${Math.floor(Math.random() * 128)})`;
}

export const darkenColorComponent = (color, percent = 80) => {

    const match = color.match(/rgb\((\d+), (\d+), (\d+)\)/);
    if (!match) {
        throw new Error("Неверный формат цвета. Ожидается 'rgb(r, g, b)'.");
    }
    let [r, g, b] = match.slice(1, 4).map(Number);

    const darken = (value) => Math.max(0, Math.floor(value * (1 - percent / 100)));

    r = darken(r);
    g = darken(g);
    b = darken(b);

    return `rgb(${r}, ${g}, ${b})`;
};