export const createInputHTML = (isRequired = false, id = '', className = '', type = 'text', placeholder = "") => `<input id=${id} class=${className} type=${type} placeholder=${placeholder} required=${isRequired}/>`;

export const closerHTML = (htmlElemName = 'div', icon = '&#9746;', className = 'closer') => `<${htmlElemName} class="${className}" onclick="${closer()}">${icon}</${htmlElemName}>`;

export const isObjectHasKey = (key, obj) => {
    if (typeof key !== "string" || key.length === '')
        return;
    if (typeof obj !== "object")
        return;
    return key in obj;
};

export const closer = () => closersOnclick();

const closersOnclick = (className = 'closer') => {
    const closers = document.getElementsByClassName(className);
    for (const closer of closers) {
        closer.addEventListener('click', () => {
            console.log(className);
            console.log('fjdkjfkdjfk');
        });
    }
}