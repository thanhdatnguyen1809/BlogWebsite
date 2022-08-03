const mongoose = require('mongoose');
const marked = require('marked');
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

const BlogSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    title: {type: String, required: true},
    description: {type: String, required: true},
    content: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    markdown: {type: String},
});

BlogSchema.pre('validate', function(next) {
    if(this.content) {
        this.markdown = DOMPurify.sanitize(marked.parse(this.content));
    }


    next();
});

module.exports = mongoose.model('Blog', BlogSchema);