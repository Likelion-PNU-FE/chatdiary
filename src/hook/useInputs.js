import {useCallback, useState} from 'react';

function useInputs(init) {
  const [input, setInput] = useState(init);
  const [isLoading, setIsLoading] = useState(false);

  // change
  const onChange = useCallback(e => {
    const {name, value} = e.target;
    setInput(form => ({...form, [name]: value}));
  }, []);
  const reset = useCallback(() => setInput(init), [init]);

  //input 데이터 그대로 submit함
  const onSubmit = async (submitApi) => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const response = await submitApi(input);
      reset();
      setIsLoading(false);
      return response;
    } catch (e) {
      setIsLoading(false);
      throw e;
    }
  }

  return [input, onChange, onSubmit];
}

export default useInputs;