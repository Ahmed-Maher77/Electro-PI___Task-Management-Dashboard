import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    taskIdCode: {
      type: String,
      default: 'TASK-1001',
    },
    title: {
      type: String,
      required: [true, 'عنوان المهمة مطلوب'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    assigneeName: {
      type: String,
      default: 'غير مسند',
    },
    status: {
      type: String,
      enum: ['todo', 'doing', 'review', 'done'],
      default: 'todo',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    dueDate: {
      type: String,
      default: 'اليوم، 5:00 مساءً',
    },
  },
  {
    timestamps: true,
  }
);

export const Task = mongoose.model('Task', taskSchema);
