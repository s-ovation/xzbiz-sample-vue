/*
 * checkFunctionがtrueを返したらsuccessFunctionを実行します
 * intervalCount の回数だけ再チェックを行います
 * チェック間隔はintervalTimeで指定します
 */

export const intervalCheck = (
  checkFunction: () => boolean,
  successFunction: () => void,
  intervalTime: number,
  intervalCount: number
): void => {
  if (checkFunction()) {
    successFunction();
    return;
  }

  let count = intervalCount;
  const intervalMethod = () => {
    if (checkFunction()) {
      successFunction();
      return;
    }

    count--;
    if (count > 0) {
      setTimeout(() => {
        intervalMethod();
      }, intervalTime);
    }
  };

  setTimeout(() => {
    intervalMethod();
  }, intervalTime);
};
