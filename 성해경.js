import inquirer from "inquirer";
// ESM 방식으로만 동작하는 외부 CLI 라이브러리
// 해당 라이브러리의 .prompt() 메서드는 프로미스를 반환하도록 작성되어있다.
// then() 메서드로 입력 받은 데이터를 전달 할 수 있다.

function exampleOne(array) {
  // Q1. 랜덤으로 배열의 인덱스를 섞는 로직 생성.
  // 단, 마지막 confirm은 항상 마지막 인덱스여야 한다.

  if (!Array.isArray(array)) {
    console.log('prompt의 인자로는 배열만 가능합니다.');
  } else {
    let suffledArray = [];

    // 랜덤숫자 중복방지를 위해 랜덤숫자를 담을 배열 선언
    let randomNumberArray = [];

    // array 중 index.name 이 confirm 인 배열의 인덱스 찾아서 랜덤숫자 배열에 담기.
    randomNumberArray.push(array.findIndex(e => e.name === 'confirm'))

    // confirm 은 배열의 마지막 차례로 가야하니까 array.length-1 자리로 해당 값 넣기.
    // 어차피 confirm 이 하나일거라 생각해서 [0]으로 해놨는데 혹시 두개라면..? if 로 반환시켜 버려야할 듯 확인을 여러번 받을 일이 어딨어!
    // join 으로는 에러 발생
    suffledArray[array.length - 1] = array.filter(element => element.name === 'confirm')[0];

    // console.log(array.filter(element => element.name === 'confirm')[0])

    // array 길이의 마지막은 값이 들어가있으니 -1만큼 반복문 실행
    for (let i = 0; i < (array.length - 1); i++) {

      // 랜덤숫자 생성 ( 랜덤숫자는 0~배열의길이 중 랜덤으로 )
      let randomnumber = Math.floor(Math.random() * (array.length))

      // 만약 랜덤숫자배열에 해당 랜덤숫자가 있다면 ( 중복방지 )
      if (randomNumberArray.includes(randomnumber)) {

        // 반복문 다시 실행해야하니까 -1
        i--;

      } else {

        // 랜덤숫자배열에 해당 랜덤숫자를 넣기 ( 중복방지 )
        randomNumberArray.push(randomnumber)

        // suffleArray[i]번째에 array 랜덤번째 값 삽입
        suffledArray[i] = array[randomnumber]
      }

      // console.log(randomNumberArray)
      // console.log(suffledArray)
    }
    return suffledArray
  }
}

// console.log(exampleOne(['가', '나', '다', '라','ak']))

// Q2. 아래 작성된 .prompt() 는 인자로 배열을 요구,
// 위 작성한 함수를 활용하여 입력 데이터를 실행 시마다, 섞어 출력하도록 하세요.
// 공부법으로 유명한 flash card의 주요 코어 로직임

inquirer
  .prompt(exampleOne([
    {
      type: 'input',
      name: 'name',
      message: "너의 이름은?"
    },
    {
      type: 'list',
      name: 'like food',
      message: "당신이 좋아하는 음식은 무엇입니까?",
      choices: ['바나나우유', '딸기우유', '초코우유', '그냥우유']
    },
    {
      type: 'confirm',
      name: 'confirm',
      message: "확실합니까?"
    },
    {
      type: 'input',
      name: 'age',
      message: "나이가 몇살인가요?"
    },
    {
      type: 'list',
      name: 'like movie',
      message: "당신이 좋아하는 영화는 무엇입니까?",
      choices: ['어바웃타임', '노트북', '너의이름은', '인턴']
    }
  ]))
  .then((answers) => {
    console.log('Answers:', answers)
  })

  // 배열이 아닌 경우, 콘솔 제대로 나오는 지 확인
  // inquirer
  // .prompt(exampleOne('안뇽?'))
  // .then((answers) => {
  //   console.log('Answers:', answers)
  // })