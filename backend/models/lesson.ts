import mongoose from 'mongoose';
import {
  codescriptLessonResourceValidator,
  selectionLessonResourceValidator,
  videoLessonResourceValidator,
} from '../common/models/lessonValidator';
import { ELessonType } from '../constant/enum/lesson.enum';
import {
  TCodescriptLessonResourse,
  TLessonSchema,
  TSelectionLessonResourse,
  TVideoLessonResourse,
} from '../types/schema/lesson.schema.types';

const { Schema } = mongoose;

const lessonSchema = new Schema<TLessonSchema>({
  courseId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000,
  },
  type: {
    type: String,
    required: true,
    enum: Object.values(ELessonType),
  },
  duration: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  comments: {
    type: [String],
    required: true,
    default: [],
  },
  resource: {
    type: Schema.Types.Mixed,
    required: true,
    validate: function (value: TLessonSchema['resource']) {
      const _this = this as unknown as TLessonSchema;

      if (_this.type === ELessonType.CodeScript) {
        return codescriptLessonResourceValidator(value as TCodescriptLessonResourse[]);
      }

      if (_this.type === ELessonType.Video) {
        return videoLessonResourceValidator(value as TVideoLessonResourse);
      }

      if (_this.type === ELessonType.Selection) {
        return selectionLessonResourceValidator(value as TSelectionLessonResourse[]);
      }
    },
  },
});

const LessonModel = mongoose.model<TLessonSchema>('Lessons', lessonSchema, 'Lessons');

export default LessonModel;
