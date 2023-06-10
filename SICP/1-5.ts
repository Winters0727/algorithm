const p = () => p();

const test = (x: number, y: any) => (x === 0 ? x : y);

test(0, p());

// 정상순서평가 -> test 함수 실행 -> 0을 반환
// 인수우선평가 -> p 함수 실행 -> p 함수 무한 재귀 호출
