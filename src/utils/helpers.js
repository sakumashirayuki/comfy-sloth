export const formatPrice = (number) => {
    const newNumber = Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(number / 100);
    return newNumber;
}

export const getUniqueValues = (data, type) => {
    let unique = data.map((item)=>item[type]);
    if(unique[0] instanceof Array){ // array in the array
        unique = unique.flat(Infinity);
    }
    return ['all', ...new Set(unique)];
}
