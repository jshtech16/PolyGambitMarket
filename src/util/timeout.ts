export const fTimeout = async(asyncFunction: any, milliseconds=5000): Promise<any> => {
  const timeoutPromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve({ timeout: true });
    }, milliseconds);
  });

  const asyncPromise = (async () => {
    try {
      const result = await asyncFunction;
      return { timeout: false, result };
    } catch (error) {
      return({ timeout: true, error });
    }
  })();

  return Promise.race([timeoutPromise, asyncPromise]);
}
