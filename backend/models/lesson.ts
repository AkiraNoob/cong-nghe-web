import mongoose, { Schema, Document } from 'mongoose';
import {
  codescriptLessonResourceValidator,
  selectionLessonResourceValidator,
  videoLessonResourceValidator,
} from '../common/models/lessonValidator';
import { ELessonType } from '../constant/enum/lesson.enum';
import {
  TLessonResource,
  TCodescriptLessonResourse,
  TLessonSchema,
  TSelectionLessonResourse,
  TVideoLessonResourse,
} from '../types/schema/lesson.schema.types';

const lessonSchema = new Schema<TLessonDocument>({
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
    validate: function (value: TLessonDocument['resource']) {
      const _this = this as unknown as TLessonDocument;

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

// Define the document interface
interface TLessonDocument extends Document, TLessonSchema<TLessonResource> {}

const LessonModel = mongoose.model<TLessonDocument>('Lessons', lessonSchema, 'Lessons');

export default LessonModel;
