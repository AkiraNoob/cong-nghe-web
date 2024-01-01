import { ObjectSchema, array, mixed, number, object, string } from 'yup';
import validateWrapper, { objectValidateOverride } from '../../common/validator';
import { ELessonType, ESelectionAnswerChoiceList } from '../../constant/enum/lesson.enum';
import {
  TLessonSchema,
  TVideoLessonResourse,
  TSelectionLessonResourse,
  TCodescriptLessonResourse,
} from '../../types/schema/lesson.schema.types';
import { TLessonById } from '../../types/api/lesson.types';
const postLessonResultParamsObjectValidate: ObjectSchema<{
  type: ELessonType;
}> = object({
  type: mixed<ELessonType>().oneOf(Object.values(ELessonType)).required(),
});
const postVideoLessonObjectValidate: ObjectSchema<TLessonSchema<TVideoLessonResourse>> = object({
  courseId: string().required().trim(),
  title: string().required(),
  description: string().required(),
  duration: number().required('Duration is required'),
  type: string()
    .oneOf([ELessonType.Video, ELessonType.Selection, ELessonType.CodeScript])
    .required('Type is required')
    .test('is-video', 'Video must be type', (value) => value === ELessonType.Video),
  resource: object({
    file: string().required('Video file is required'),
    duration: string().required('Video duration is required'),
  }).required('Video Resource is required'),
  comments: array().of(string().required()).default([]),
});
const postCodeScriptLessonObjectValidate: ObjectSchema<TLessonSchema<TCodescriptLessonResourse[]>> = object({
  courseId: string().required().trim(),
  title: string().required(),
  description: string().required(),
  duration: number().required('Duration is required'),
  type: string()
    .oneOf([ELessonType.Video, ELessonType.Selection, ELessonType.CodeScript])
    .required('Type is required')
    .test('is-Selection', 'CodeScript must be type', (value) => value === ELessonType.CodeScript),

  resource: array()
    .of(
      object().shape({
        input: string().required('Code input is required'),
        expected: string().required('Expected output is required'),
      }),
    )
    .required('CodeScript Resource is required'),
  comments: array().of(string().required()).default([]),
});

const postSelectionLessonObjectValidate: ObjectSchema<TLessonSchema<TSelectionLessonResourse[]>> = object({
  courseId: string().required().trim(),
  title: string().required(),
  description: string().required(),
  duration: number().required('Duration is required'),
  type: string()
    .oneOf([ELessonType.Video, ELessonType.Selection, ELessonType.CodeScript])
    .required('Type is required')
    .test('is-Selection', 'Selection must be type', (value) => value === ELessonType.Selection),

  resource: array()
    .of(
      object().shape({
        question: string().required('Question is required'),
        answerA: string().required('Answer A is required'),
        answerB: string().required('Answer B is required'),
        answerC: string().required('Answer C is required'),
        answerD: string().required('Answer D is required'),
        correctAnswer: string().oneOf(Object.values(ESelectionAnswerChoiceList)).required('Correct Answer is required'),
      }),
    )
    .required('Selection Resource is required'),
  comments: array().of(string().required()).default([]),
});

const LessonByIdObjectValidate: ObjectSchema<TLessonById> = object({
  lessonId: string().required().trim(),
})
  .noUnknown(true)
  .strict();

const lessonValidator = {
  validateLessonResultQuery: validateWrapper((req) =>
    objectValidateOverride(postLessonResultParamsObjectValidate, req.query),
  ),
  validateVideoLesson: validateWrapper((req) =>
    objectValidateOverride(postVideoLessonObjectValidate, req.body as TLessonSchema<TVideoLessonResourse>),
  ),
  validateCodescriptLesson: validateWrapper((req) =>
    objectValidateOverride(postCodeScriptLessonObjectValidate, req.body as TLessonSchema<TCodescriptLessonResourse[]>),
  ),
  validateSelectionLesson: validateWrapper((req) =>
    objectValidateOverride(postSelectionLessonObjectValidate, req.body as TLessonSchema<TSelectionLessonResourse[]>),
  ),
  validateLessonById: validateWrapper((req) =>
    objectValidateOverride(LessonByIdObjectValidate, req.params as TLessonById),
  ),
};

export default lessonValidator;
