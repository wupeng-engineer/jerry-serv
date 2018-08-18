const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { Mixed, ObjectId } = Schema.Types

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  cover: String,
  desc: String,
  pubdate: Date,
  content: String,
  status: Number,
  openness: String,
  isTop: Boolean,
  password: String,
  type: {
    type: ObjectId,
    ref: 'ArticleType'
  },
  tags: [
    {
      type: ObjectId,
      ref: 'ArticleTag'
    }
  ],
  likeList: [
    {
      name: String,
      id: String
    }
  ],
  commentList: [
    {
      name: String,
      avatar: String,
      id: String,
      content: String
    }
  ],
  clickNum: {
    type: Number,
    default: 0
  },
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  }
})

ArticleSchema.virtual('likeNum').get(function () {
  return this.likeList.length || 0
})

ArticleSchema.virtual('commentNum').get(function () {
  return this.commentList.length || 0
})

ArticleSchema.set('toJSON', { virtuals: true });
ArticleSchema.set('toObject', { virtuals: true });

// ArticleSchema.pre('find', function (next) {
//   console.log('我是pre方法1')
//   console.log(this)
//   next()
// })

mongoose.model('Article', ArticleSchema)
