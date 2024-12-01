const salesEngineers = ['Michał T.', 'Krzysztof G.', 'Marcin R.', 'Krystian N.', 'Bartosz M.', 'Marcin G.', 'Mariusz Ś']

const salesEngineersSorted = salesEngineers.sort((a, b) => {
    // Extract the last name's first letter
    const lastNameA = a.split(' ')[1][0];
    const lastNameB = b.split(' ')[1][0];

    // Compare alphabetically
    return lastNameA.localeCompare(lastNameB);
});

export default salesEngineersSorted