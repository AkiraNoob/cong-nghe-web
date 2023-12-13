import mongoose from 'mongoose';
import {
  codescriptUserLessonCheckpointValidator,
  selectionLessonResourceValidator,
  videoUserLessonCheckpointValidator,
} from '../common/models/userLessonValidator';
import { ELessonType, EUserLessonStatus } from '../constant/enum/lesson.enum';
import {
  TUserCodescriptLessonCheckpoint,
  TUserLessonSchema,
  TUserSelectionLessonCheckpoint,
  TUserVideoLessonCheckpoint,
} from '../types/schema/userLessons.schema.types';

const { Schema } = mongoose;

const lessonSchema = new Schema<TUserLessonSchema>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  lessonId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  courseId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  status: {
    type: String,
    enum: EUserLessonStatus,
    default: EUserLessonStatus.Pending,
  },
  type: {
    enum: ELessonType,
    type: String,
    required: true,
  },
  checkpoint: {
    validate: function (value: TUserLessonSchema['checkpoint']) {
      const _this = this as unknown as TUserLessonSchema;

      if (_this.type === ELessonType.CodeScript) {
        return codescriptUserLessonCheckpointValidator(value as TUserCodescriptLessonCheckpoint);
      }

      if (_this.type === ELessonType.Video) {
        return videoUserLessonCheckpointValidator(value as TUserVideoLessonCheckpoint);
      }

      if (_this.type === ELessonType.Selection) {
        return selectionLessonResourceValidator(value as TUserSelectionLessonCheckpoint[]);
      }
    },
  },
});

const UserLessonModel = mongoose.model<TUserLessonSchema>('User_Lesson', lessonSchema, 'User_Lesson');

export default UserLessonModel;
