import SelectionQuiz from '~/components/lesson/selection_quiz';

export default function Page() {
  return (
    <div className="p-[20px_10px] lg:p-[40px_90px] max-w-[1440px] w-full mx-auto space-y-[20px] text-textMain">
      <h1 className="text-[48px] font-semibold">Tiêu đề bài tập</h1>
      <p className="text-[#684949] text-[20px] font-normal leading-[140%]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu aliquam lacus. Fusce lobortis eu quam sed
        mollis. Donec at semper lorem. Suspendisse ligula nisi, efficitur a scelerisque vitae, pulvinar a massa. Etiam
        maximus quam odio, quis suscipit urna interdum non. Curabitur aliquet at odio in maximus.
      </p>

      <SelectionQuiz
        questtionList={new Array(12).fill({
          question:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu aliquam lacus. Fusce lobortis eu quam sed mollis. Donec at semper lorem. Suspendisse ligula nisi, efficitur a scelerisque vitae, pulvinar a massa. Etiam maximus quam odio, quis suscipit urna interdum non. Curabitur aliquet at odio in maximus',
          explanation:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu aliquam lacus. Fusce lobortis eu quam sed mollis. Donec at semper lorem. Suspendisse ligula nisi, efficitur a scelerisque vitae, pulvinar a massa. Etiam maximus quam odio, quis suscipit urna interdum non. Curabitur aliquet at odio in maximus',
          answerA: 'Đáp án 1. Đáp án 1. Đáp án 1. Đáp án 1. Đáp án 1. Đáp án 1. Đáp án 1. ',
          answerB: 'Đáp án 1. Đáp án 1. Đáp án 1. Đáp án 1. Đáp án 1. Đáp án 1. Đáp án 1. ',
          answerC: 'Đáp án 1. Đáp án 1. Đáp án 1. Đáp án 1. Đáp án 1. Đáp án 1. Đáp án 1. ',
          answerD: 'Đáp án 1. Đáp án 1. Đáp án 1. Đáp án 1. Đáp án 1. Đáp án 1. Đáp án 1. ',
        })}
        mode="take"
        // checkPoints={new Array(12).fill(0).map((_, index) => ({
        //   choosenAsnwer: ESelectionAnswerChoiceList.A,
        //   isCorrect: index % 2 === 0,
        //   correctAnswer: index % 2 === 0 ? ESelectionAnswerChoiceList.A : ESelectionAnswerChoiceList.C,
        // }))}
      />
    </div>
  );
}
