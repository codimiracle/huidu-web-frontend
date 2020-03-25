import { Button, Input, List, message, Rate } from 'antd';
import Form, { WrappedFormUtils } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import { NextPageContext } from 'next';
import React from 'react';
import EditorView from '../../../components/editor-view';
import ContentSection from '../../../components/section-view';
import { API } from '../../../configs/api-config';
import { Book, BookPreview } from '../../../types/book';
import { Review } from '../../../types/review';
import { fetchDataByGet, fetchMessageByPost } from '../../../util/network-util';
import { EntityJSON } from '../../../types/api';
import { ElectronicBook } from '../../../types/electronic-book';
import UploadUtil from '../../../util/upload-util';

const EMPTY_IMAGE = '/assets/empty.png';

interface BookPreviewViewProps {
  book: Book
}

function BookPreviewView(props: BookPreviewViewProps) {
  const { book } = props;
  const bookPreview = BookPreview.valueOf(book);
  return (
    <div className="book-reference-view">
      <img src={UploadUtil.absoluteUrl(API.CoverSource, bookPreview.cover) || EMPTY_IMAGE} />
      <div className="body">
        <div><strong>{bookPreview.name}</strong> <span className="help-text">{bookPreview.author}</span></div>
        <p title={bookPreview.description}>{bookPreview.description}</p>
      </div>
      <style jsx>{`
        .book-reference-view {
          display: flex;
        }
        .body {
          display: flex;
          padding-left: 0.5em;
          flex-direction: column;
        }
        p {
          flex: 1;
          
          max-height: 48px;
          word-break: break-all;
        }
        img {
          width: 68px;
          height: 92px;
        }
      `}</style>
    </div>
  )
}

interface ReviewFormProps {
  form: WrappedFormUtils,
  review?: Review
}

interface ReviewFormState {

}

class ReviewForm extends React.Component<ReviewFormProps, ReviewFormState> {
  render() {
    const { form, review } = this.props;
    return (
      <>
        <Form layout="vertical">
          <FormItem label="点评标题">
            {
              form.getFieldDecorator('title', {
                initialValue: review.title || '',
                rules: [
                  { required: true, message: '请输入标题' }
                ]
              })(<Input />)
            }
          </FormItem>
          <FormItem label="著作评分">
            {
              form.getFieldDecorator('rate', {
                initialValue: review.rate || '',
                rules: [
                  { required: true, message: '请给著作打分' }
                ]
              })(
                <Rate allowHalf />
              )
            }
          </FormItem>
          <FormItem label="点评主体">
            {
              form.getFieldDecorator('content', {
                initialValue: review.content && review.content.source || '',
                rules: [
                  { required: true, message: '请输入点评主体内容' }
                ]
              })(<EditorView />)
            }
          </FormItem>
        </Form>
      </>
    )
  }
}

export interface NewReviewProps {
  form: WrappedFormUtils,
  refers: Array<Book>,
};
export interface NewReviewState {
  creating: boolean,
};

class NewReview extends React.Component<NewReviewProps, NewReviewState> {
  static async getInitialProps(context: NextPageContext) {
    const { book_id } = context.query;
    let bookData = await fetchDataByGet<EntityJSON<ElectronicBook>>(API.ElectronicBookEntity, {
      book_id: book_id
    });
    return {
      refers: [bookData.entity]
    }
  }
  constructor(props: NewReviewProps) {
    super(props);
    this.state = {
      creating: false,
    }
  }
  createReview(data: { title: string, type: 'html', content: string, rate: number }) {
    this.setState({ creating: true });
    fetchMessageByPost(API.ReviewCreate, data).then((msg) => {
      if (msg.code == 200) {
        message.success('创建成功！');
        history.back();
      } else {
        message.error(msg.message);
      }
    }).catch((err) => {
      message.error(`创建点评失败：${err}`);
    }).finally(() => {
      this.setState({ creating: false });
    });
  }
  onCreate() {
    const { form } = this.props;
    form.validateFields((errors, values) => {
      if (!errors) {
        this.createReview({
          title: form.getFieldValue('title'),
          rate: form.getFieldValue('rate'),
          content: form.getFieldValue('content'),
          type: 'html'
        });
      }
    });
  }
  render() {
    const { form, refers } = this.props;
    const { creating } = this.state;
    return (
      <>
        <ContentSection
          content={
            <>
              <h1>创建点评</h1>
              <p>
                创建点评的目的通常是对已读书籍的评价或阅后感受。<br />
                对于点评，你可以达到以下目的：
              </p>
              <ul>
                <li>阅后感</li>
                <li>著作评价</li>
              </ul>
              <ReviewForm form={form} />
              <div className="review-form-actions">
                <Button loading={creating} type="primary" size="large" onClick={() => this.onCreate()}>创建</Button> <Button size="large" onClick={() => history.back()}>取消</Button>
              </div>
            </>
          }
          aside={
            <div>
              <h3>点评书籍</h3>
              <List
                renderItem={(item) => (
                  <List.Item>
                    <BookPreviewView book={item} />
                  </List.Item>
                )}
                dataSource={refers}
              />
              <h3>点评状态</h3>
              <div>未保存</div>
            </div>
          }
        />
        <style jsx>{`
          .review-form-actions {
            text-align: right;
          }
        `}</style>
      </>
    )
  }
}
const WrappedNewReview = Form.create({ name: 'review-form' })(NewReview);
export default WrappedNewReview;