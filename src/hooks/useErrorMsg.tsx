import { useEffect, useState } from "react";

export function useErrorMsg() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Clear error message after 3 seconds
  useEffect(() => {
    async function handleErrorClear() {
      let timerId: NodeJS.Timeout;

      if (errorMsg) {
        timerId = setTimeout(() => {
          setErrorMsg(null);
        }, 3000);
      }

      return () => clearTimeout(timerId);
    }

    handleErrorClear();
  }, [errorMsg]);

  return {errorMsg, setErrorMsg};
}
