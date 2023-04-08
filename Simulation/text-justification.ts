function fullJustify(words: string[], maxWidth: number): string[] {
  const result: string[] = [];
  const nextWords: string[] = [];

  const createSentence = (
    wordsArray: string[],
    isLastWords: boolean = false
  ) => {
    if (wordsArray.length === 1) {
      return wordsArray[0].padEnd(maxWidth, " ");
    }

    if (isLastWords) {
      return wordsArray.join(" ").padEnd(maxWidth, " ");
    }

    const spaceCount = wordsArray.length - 1;
    const availableSpaceLength =
      maxWidth - wordsArray.reduce((prev, next) => prev + next.length, 0);
    const evenlySpace = Math.floor(availableSpaceLength / spaceCount);

    let resultSentence = "";

    const spaceArray = Array.from<number>({ length: spaceCount }).fill(
      evenlySpace
    );

    let remainSpace = availableSpaceLength % spaceCount;
    let spaceIndex = 0;

    while (remainSpace > 0) {
      spaceArray[spaceIndex] += 1;
      remainSpace -= 1;
      spaceIndex += 1;
    }

    for (const [index, word] of wordsArray.entries()) {
      if (index < wordsArray.length - 1) {
        const concatedWord = resultSentence + word;
        resultSentence = concatedWord.padEnd(
          concatedWord.length + spaceArray[index],
          " "
        );
      } else {
        resultSentence += word;
      }
    }

    return resultSentence;
  };

  for (const [index, word] of words.entries()) {
    if (
      nextWords.reduce((prev, next) => prev + next.length, 0) +
        nextWords.length +
        word.length <=
      maxWidth
    ) {
      nextWords.push(word);
    } else {
      result.push(createSentence(nextWords));
      nextWords.splice(0, nextWords.length);
      nextWords.push(word);
    }

    if (index === words.length - 1) {
      result.push(createSentence(nextWords, true));
    }
  }

  return result;
}
