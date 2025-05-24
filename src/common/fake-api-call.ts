export default function fakeApi<T = IUnsafeObject>({
  timeoutTime,
  data,
}: {
  timeoutTime?: number;
  data?: T;
}) {
  return new Promise((resolve, reject) => {
    const randomTimeout = timeoutTime || Math.random() * 10000 + 1000;
    setTimeout(() => {
      if (randomTimeout > 7000) {
        return reject(new Error(`Fake API call failed after ${randomTimeout}ms`));
      }
      resolve({
        status: 200,
        message: 'Fake API call successful',
        data,
      });
    }, randomTimeout);
  });
}
