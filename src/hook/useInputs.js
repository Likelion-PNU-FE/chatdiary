import {useCallback, useState} from 'react';

function useInputs(init) {
    const [input, setInput] = useState(init);
    // change
    const onChange = useCallback(e => {
        const {name, value} = e.target;
        setInput(form => ({...form, [name]: value}));
    }, []);
    const reset = useCallback(() => setInput(init), [init]);
    return [input, onChange, reset];
}

export default useInputs;